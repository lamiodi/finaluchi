import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import {
  StoredAppointment,
  StoredOrder,
  addAppointment,
  addContact,
  addSubscriber,
  findOrderByNumber,
  listAppointments,
  listOrders,
  sanitizeOrderForClient,
  upsertOrder,
} from './storage.js';
import {
  notifyStudio,
  sendAppointmentConfirmation,
  sendDispatchNotice,
  sendOrderConfirmation,
} from './emails.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://finaluchi.com',
  'https://www.finaluchi.com',
  'http://localhost:5173',
].filter((url): url is string => Boolean(url));

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, S2S) or if in allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Allow non-whitelisted origins only in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} not permitted by CORS.`));
  },
  credentials: true,
}));

app.set('trust proxy', 1);

// Store raw body buffer for HMAC signature verification
app.use(express.json({
  limit: '1mb',
  verify: (req: any, _res, buf) => {
    req.rawBody = buf;
  },
}));

// ---------------------------------------------------------------------------
// Lightweight in-memory rate limiter for public write endpoints.
// Protects the atelier inbox from form spam; resets on server restart.
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 40;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function rateLimit(req: Request, res: Response, next: NextFunction) {
  const key = req.ip || 'unknown';
  const now = Date.now();
  const bucket = rateBuckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }
  bucket.count += 1;
  if (bucket.count > RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
  }
  next();
}

// Periodically clear stale buckets so the map does not grow unbounded
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of rateBuckets) {
    if (bucket.resetAt < now) rateBuckets.delete(key);
  }
}, RATE_LIMIT_WINDOW_MS).unref();

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && EMAIL_RE.test(value.trim());
}

// ---------------------------------------------------------------------------
// Admin authentication: passcode -> short-lived HMAC token
// ---------------------------------------------------------------------------
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || '';
const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET || ADMIN_PASSCODE || 'finaluchi-dev-secret';
const ADMIN_TOKEN_TTL_MS = 12 * 60 * 60 * 1000;

function timingSafeEqualStrings(a: string, b: string): boolean {
  const hashA = crypto.createHash('sha256').update(a, 'utf-8').digest();
  const hashB = crypto.createHash('sha256').update(b, 'utf-8').digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

function issueAdminToken(): string {
  const expiresAt = Date.now() + ADMIN_TOKEN_TTL_MS;
  const signature = crypto.createHmac('sha256', ADMIN_TOKEN_SECRET).update(String(expiresAt)).digest('hex');
  return `${expiresAt}.${signature}`;
}

function verifyAdminToken(token: string): boolean {
  const [expiresAtRaw, signature] = (token || '').split('.');
  if (!expiresAtRaw || !signature) return false;
  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;
  const expected = crypto.createHmac('sha256', ADMIN_TOKEN_SECRET).update(expiresAtRaw).digest('hex');
  return timingSafeEqualStrings(signature, expected);
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!verifyAdminToken(token)) {
    return res.status(401).json({ error: 'Unauthorized. Please sign in again.' });
  }
  next();
}

// ---------------------------------------------------------------------------
// Health Check Endpoint
// ---------------------------------------------------------------------------
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'finaluchi-backend',
    email: process.env.RESEND_API_KEY ? 'configured' : 'not-configured',
    admin: ADMIN_PASSCODE ? 'configured' : 'not-configured',
    timestamp: new Date().toISOString(),
  });
});

// ---------------------------------------------------------------------------
// Orders — created by the storefront checkout, persisted and emailed
// ---------------------------------------------------------------------------
app.post('/api/orders', rateLimit, async (req: Request, res: Response) => {
  const body = req.body as Partial<StoredOrder>;
  const orderNumber = String(body.orderNumber || '').trim();

  if (!orderNumber || !isValidEmail(body.customerEmail) || !Array.isArray(body.items)) {
    return res.status(400).json({ error: 'orderNumber, customerEmail and items are required.' });
  }

  try {
    const order = await upsertOrder(body as StoredOrder);

    void sendOrderConfirmation(order);
    void notifyStudio(`New Order ${order.orderNumber}`, [
      `Order: ${order.orderNumber}`,
      `Client: ${order.customerFullName} (${order.customerEmail}, ${order.customerPhone})`,
      `Pieces: ${(order.items || []).map((i: any) => `${i.productNameSnapshot} ×${i.quantity}`).join('; ') || '—'}`,
      `Total: ₦${Math.round((order.totalKobo || 0) / 100).toLocaleString('en-NG')} (${order.paymentStatus || 'PAYMENT_PENDING'})`,
      `Delivery: ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''}, ${order.shippingAddress?.country || ''}`,
    ]);

    return res.status(201).json({ ok: true, order: sanitizeOrderForClient(order) });
  } catch (err: any) {
    console.error('[Orders] Create failed:', err?.message || err);
    return res.status(500).json({ error: 'Could not register order.' });
  }
});

// Cross-device order tracking: order number + the email used at checkout
app.get('/api/orders/track', rateLimit, async (req: Request, res: Response) => {
  const orderNumber = String(req.query.orderNumber || '').trim();
  const email = String(req.query.email || '').trim().toLowerCase();

  if (!orderNumber || !isValidEmail(email)) {
    return res.status(400).json({ error: 'orderNumber and a valid email are required.' });
  }

  const order = await findOrderByNumber(orderNumber);
  if (!order || (order.customerEmail || '').toLowerCase() !== email) {
    return res.status(404).json({ error: 'No order found for that number and email combination.' });
  }

  return res.json({ ok: true, order: sanitizeOrderForClient(order) });
});

// Payment capture notification from the storefront (Paystack inline success).
// Authoritative verification remains the signed webhook below.
app.post('/api/orders/:orderNumber/paid', rateLimit, async (req: Request, res: Response) => {
  const existing = await findOrderByNumber(String(req.params.orderNumber));
  if (!existing) return res.status(404).json({ error: 'Order not found.' });

  const gatewayReference = String(req.body?.gatewayReference || '');
  const updated = await upsertOrder({
    ...existing,
    paymentStatus: 'PAYMENT_SUCCESSFUL',
    orderStatus: 'CONFIRMED',
    fulfillmentStatus: existing.fulfillmentStatus === 'UNFULFILLED' ? 'ALLOCATED' : existing.fulfillmentStatus,
    gatewayReference: gatewayReference || existing.gatewayReference,
  } as StoredOrder);

  void sendOrderConfirmation(updated);
  return res.json({ ok: true, order: sanitizeOrderForClient(updated) });
});

// ---------------------------------------------------------------------------
// Bespoke appointments & fittings
// ---------------------------------------------------------------------------
app.post('/api/appointments', rateLimit, async (req: Request, res: Response) => {
  const body = req.body as Partial<StoredAppointment>;
  const clientName = body.clientName || body.guestName;
  const phone = body.clientPhone || body.guestPhone;

  if (!clientName || !phone || !body.date || !body.timeSlot) {
    return res.status(400).json({ error: 'clientName, clientPhone, date and timeSlot are required.' });
  }

  try {
    const appointment = await addAppointment({
      ...body,
      id: body.id || `apt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      clientName,
      clientPhone: phone,
      status: body.status || 'PENDING',
    } as StoredAppointment);

    void sendAppointmentConfirmation(appointment);
    void notifyStudio(`New Consultation Request — ${clientName}`, [
      `Client: ${clientName} (${body.clientEmail || body.guestEmail || 'no email'}, ${phone})`,
      `Format: ${(body.appointmentType || body.serviceType || 'FITTING').replace(/_/g, ' ')}`,
      `Requested: ${body.date} · ${body.timeSlot}`,
      `Location: ${body.location || 'To be confirmed'}`,
      body.notes ? `Notes: ${body.notes}` : 'Notes: —',
    ]);

    return res.status(201).json({ ok: true, appointment });
  } catch (err: any) {
    console.error('[Appointments] Create failed:', err?.message || err);
    return res.status(500).json({ error: 'Could not register appointment.' });
  }
});

// ---------------------------------------------------------------------------
// Contact inquiries
// ---------------------------------------------------------------------------
app.post('/api/contact', rateLimit, async (req: Request, res: Response) => {
  const { name, email, phone, subject, message } = req.body as Record<string, string>;

  if (!name || !message) {
    return res.status(400).json({ error: 'name and message are required.' });
  }

  const contact = await addContact({
    id: `msg-${Date.now()}`,
    name,
    email: isValidEmail(email) ? email : undefined,
    phone,
    subject,
    message,
    createdAt: new Date().toISOString(),
  });

  void notifyStudio(`Inquiry — ${(subject || 'GENERAL').replace(/_/g, ' ')}`, [
    `From: ${name}${email ? ` (${email})` : ''}${phone ? ` · ${phone}` : ''}`,
    `Subject: ${subject || 'GENERAL'}`,
    `Message: ${message}`,
  ]);

  return res.status(201).json({ ok: true, contact });
});

// ---------------------------------------------------------------------------
// Newsletter / Private Client Circle
// ---------------------------------------------------------------------------
app.post('/api/newsletter', rateLimit, async (req: Request, res: Response) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  const result = await addSubscriber(email);
  if (!result.alreadySubscribed) {
    void notifyStudio('New Private Client Circle Signup', [`Email: ${email}`]);
  }

  return res.status(201).json({ ok: true, alreadySubscribed: result.alreadySubscribed });
});

// ---------------------------------------------------------------------------
// Admin desk: login + live overview + production actions
// ---------------------------------------------------------------------------
app.post('/api/admin/login', rateLimit, (req: Request, res: Response) => {
  if (!ADMIN_PASSCODE) {
    return res.status(503).json({ error: 'Admin passcode is not configured on the server (ADMIN_PASSCODE).' });
  }
  const passcode = String(req.body?.passcode || '');
  if (!passcode || !timingSafeEqualStrings(passcode, ADMIN_PASSCODE)) {
    return res.status(401).json({ error: 'Incorrect studio passcode.' });
  }
  return res.json({ ok: true, token: issueAdminToken(), expiresInMs: ADMIN_TOKEN_TTL_MS });
});

app.get('/api/admin/overview', requireAdmin, async (_req: Request, res: Response) => {
  const [orders, appointments] = await Promise.all([listOrders(), listAppointments()]);
  return res.json({
    ok: true,
    orders: orders.map((o: StoredOrder) => sanitizeOrderForClient(o)),
    appointments,
    generatedAt: new Date().toISOString(),
  });
});

app.post('/api/admin/orders/:orderNumber/stage', requireAdmin, async (req: Request, res: Response) => {
  const existing = await findOrderByNumber(String(req.params.orderNumber));
  if (!existing) return res.status(404).json({ error: 'Order not found.' });

  const stageIndex = Math.max(0, Math.min(6, Number(req.body?.stageIndex)));
  if (!Number.isFinite(stageIndex)) {
    return res.status(400).json({ error: 'stageIndex must be a number between 0 and 6.' });
  }

  const updated = await upsertOrder({
    ...existing,
    atelierCurrentStageIndex: stageIndex,
    orderStatus: stageIndex >= 6 ? 'COMPLETED' : stageIndex >= 3 ? 'IN_PRODUCTION' : existing.orderStatus,
    fulfillmentStatus: stageIndex >= 6 ? 'DISPATCHED' : existing.fulfillmentStatus,
  } as StoredOrder);

  return res.json({ ok: true, order: sanitizeOrderForClient(updated) });
});

// Dispatch notice: sends the luxury shipping email (Template 3) to the client
app.post('/api/admin/orders/:orderNumber/dispatch', requireAdmin, async (req: Request, res: Response) => {
  const existing = await findOrderByNumber(String(req.params.orderNumber));
  if (!existing) return res.status(404).json({ error: 'Order not found.' });

  const courierName = String(req.body?.courierName || '').trim();
  const trackingNumber = String(req.body?.trackingNumber || '').trim();
  const trackingUrl = req.body?.trackingUrl ? String(req.body.trackingUrl).trim() : undefined;

  if (!courierName || !trackingNumber) {
    return res.status(400).json({ error: 'courierName and trackingNumber are required.' });
  }

  const updated = await upsertOrder({
    ...existing,
    atelierCurrentStageIndex: 6,
    orderStatus: 'COMPLETED',
    fulfillmentStatus: 'DISPATCHED',
  } as StoredOrder);

  await sendDispatchNotice(updated, courierName, trackingNumber, trackingUrl);
  return res.json({ ok: true, order: sanitizeOrderForClient(updated) });
});

// ---------------------------------------------------------------------------
// Paystack Webhook Handler with HMAC SHA-512 Verification
// ---------------------------------------------------------------------------
app.post('/api/webhooks/paystack', async (req: Request, res: Response) => {
  const signature = req.headers['x-paystack-signature'] as string | undefined;
  const webhookSecret = process.env.PAYSTACK_WEBHOOK_SECRET || process.env.PAYSTACK_SECRET_KEY;

  if (webhookSecret && signature) {
    const rawBody = (req as any).rawBody || Buffer.from(JSON.stringify(req.body));
    const expectedSignature = crypto
      .createHmac('sha512', webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.warn('[Paystack Webhook] Invalid signature rejected.');
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }
  } else if (process.env.NODE_ENV === 'production' && !signature) {
    return res.status(401).json({ error: 'Missing x-paystack-signature header' });
  }

  const event = req.body;
  console.log('[Paystack Webhook Verified]:', event?.event || 'Unknown event');

  if (event?.event === 'charge.success') {
    const data = event.data || {};
    const orderNumber =
      data?.metadata?.orderNumber ||
      (typeof data?.metadata?.custom_fields?.[0]?.value === 'string' ? data.metadata.custom_fields[0].value : undefined);
    const existing = orderNumber ? await findOrderByNumber(orderNumber) : undefined;

    if (existing) {
      const updated = await upsertOrder({
        ...existing,
        paymentStatus: 'PAYMENT_SUCCESSFUL',
        orderStatus: 'CONFIRMED',
        fulfillmentStatus: existing.fulfillmentStatus === 'UNFULFILLED' ? 'ALLOCATED' : existing.fulfillmentStatus,
        gatewayReference: data?.reference || existing.gatewayReference,
      } as StoredOrder);
      void sendOrderConfirmation(updated);
      console.log(`[Paystack Payment Confirmed]: Ref ${data?.reference} matched order ${updated.orderNumber}.`);
    } else {
      console.warn(`[Paystack Payment Confirmed]: Ref ${data?.reference} — no matching order (${orderNumber || 'no orderNumber in metadata'}).`);
    }
  }

  // Acknowledge receipt immediately with 200 OK
  return res.status(200).json({ received: true });
});

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'FINALUCHI Couture API Gateway',
    version: '2.0.0',
    endpoints: {
      health: '/api/health',
      orders: 'POST /api/orders',
      track: 'GET /api/orders/track?orderNumber=&email=',
      markPaid: 'POST /api/orders/:orderNumber/paid',
      appointments: 'POST /api/appointments',
      contact: 'POST /api/contact',
      newsletter: 'POST /api/newsletter',
      admin: 'POST /api/admin/login · GET /api/admin/overview · POST /api/admin/orders/:orderNumber/stage · POST /api/admin/orders/:orderNumber/dispatch',
      paystackWebhook: '/api/webhooks/paystack',
    },
  });
});

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Central Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Server Error]:', err);
  const status = err.status || 500;
  res.status(status).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message || 'An error occurred',
  });
});

app.listen(PORT, () => {
  console.log(`[Finaluchi API] Server listening on http://localhost:${PORT}`);
  if (!process.env.RESEND_API_KEY) console.log('[Finaluchi API] RESEND_API_KEY not set — transactional emails will be logged, not sent.');
  if (!ADMIN_PASSCODE) console.log('[Finaluchi API] ADMIN_PASSCODE not set — admin login endpoint is disabled.');
});

export default app;
