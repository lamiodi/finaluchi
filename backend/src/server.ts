import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';

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

// Store raw body buffer for HMAC signature verification
app.use(express.json({
  verify: (req: any, _res, buf) => {
    req.rawBody = buf;
  },
}));

// Health Check Endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'finaluchi-backend',
    timestamp: new Date().toISOString(),
  });
});

// Paystack Webhook Handler with HMAC SHA-512 Verification
app.post('/api/webhooks/paystack', (req: Request, res: Response) => {
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
    const data = event.data;
    console.log(`[Paystack Payment Confirmed]: Ref ${data?.reference}, Amount: ₦${((data?.amount || 0) / 100).toLocaleString()}`);
  }

  // Acknowledge receipt immediately with 200 OK
  return res.status(200).json({ received: true });
});

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'FINALUCHI Couture API Gateway',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
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
});

export default app;
