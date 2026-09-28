// Transactional email dispatch via the Resend REST API (no SDK dependency).
// If RESEND_API_KEY is not configured, emails are logged instead of sent so the
// atelier can still run locally / in test mode without an email provider.

import { StoredAppointment, StoredOrder } from './storage.js';

const ATELIER_EMAIL = process.env.ATELIER_EMAIL || process.env.RESEND_FROM || '';
const RESEND_FROM = process.env.RESEND_FROM || 'FINALUCHI COUTURE <onboarding@resend.dev>';
const WHATSAPP_DISPLAY = '+234 803 231 2961';
const WHATSAPP_NUMBER = '2348032312961';
const SITE_URL = process.env.SITE_URL || 'https://finaluchi.com';

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export function getAtelierEmail(): string {
  return ATELIER_EMAIL;
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatKobo(kobo: number | undefined): string {
  return '₦' + Math.round((kobo || 0) / 100).toLocaleString('en-NG');
}

function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function emailShell(innerHtml: string, preheader: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Finaluchi Couture</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FBF9F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #111111; -webkit-font-smoothing: antialiased;">
  <span style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${escapeHtml(preheader)}</span>
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FBF9F5; padding: 40px 10px;">
    <tr>
      <td align="center">
        ${innerHtml}
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function brandHeader(subtitle: string): string {
  return `
  <tr>
    <td align="center" style="background-color: #000000; padding: 36px 20px; border-bottom: 2px solid #C5A880;">
      <a href="${SITE_URL}" style="text-decoration: none;">
        <span style="font-family: Georgia, 'Times New Roman', serif; font-size: 24px; letter-spacing: 0.25em; color: #FFFFFF; text-transform: uppercase; font-weight: bold; display: block;">FINALUCHI COUTURE</span>
      </a>
      <span style="font-size: 9px; letter-spacing: 0.35em; color: #C5A880; text-transform: uppercase; margin-top: 6px; display: block;">${escapeHtml(subtitle)}</span>
    </td>
  </tr>`;
}

function brandFooter(note?: string): string {
  return `
  <tr>
    <td align="center" style="background-color: #111111; padding: 28px 20px; color: #999999; font-size: 11px; line-height: 1.6;">
      <p style="margin: 0 0 6px 0; color: #CCCCCC; font-weight: 600;">FINALUCHI COUTURE FLAGSHIP</p>
      <p style="margin: 0 0 12px 0;">Abuja, Nigeria &middot; WhatsApp: ${WHATSAPP_DISPLAY}</p>
      <p style="margin: 0; color: #777777; font-size: 10px;">
        ${note ? `${escapeHtml(note)}<br>` : ''}
        You are receiving this communication regarding your relationship with finaluchi.com.<br>
        &copy; ${new Date().getFullYear()} Finaluchi Couture. All rights reserved.
      </p>
    </td>
  </tr>`;
}

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipients = Array.isArray(to) ? to.filter(Boolean) : [to].filter(Boolean);
  if (recipients.length === 0) return false;

  if (!apiKey) {
    console.log(`[Email:DEV-ONLY] (no RESEND_API_KEY) To: ${recipients.join(', ')} | Subject: ${subject}`);
    return false;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: recipients,
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`[Email] Resend error ${res.status}: ${body}`);
      return false;
    }
    return true;
  } catch (err: any) {
    console.error('[Email] Dispatch failed:', err?.message || err);
    return false;
  }
}

/* ---------------------------------------------------------------------------
 * Template 1 — Order Confirmation & Atelier Receipt
 * ------------------------------------------------------------------------- */
export function renderOrderConfirmationEmail(order: StoredOrder): { subject: string; html: string } {
  const items = (order.items || []).map((item: any) => `
    <tr style="border-bottom: 1px solid #EEEEEE;">
      <td style="padding: 16px 0;">
        <strong style="font-size: 14px; color: #000000; display: block;">${escapeHtml(item.productNameSnapshot)}</strong>
        <span style="font-size: 12px; color: #666666; display: block; margin-top: 4px;">
          Colour: ${escapeHtml(item.colorNameSnapshot)} &middot; Size: ${escapeHtml(item.sizeSnapshot)}
        </span>
      </td>
      <td align="center" style="font-size: 13px; color: #333333; padding: 16px 0;">${escapeHtml(item.quantity)}</td>
      <td align="right" style="font-size: 14px; color: #000000; font-weight: 600; padding: 16px 0;">${formatKobo(item.unitPriceKobo * item.quantity)}</td>
    </tr>`).join('');

  const inner = `
  <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border: 1px solid #EAE6DF; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
    ${brandHeader('Abuja Flagship Atelier · Nigeria')}

    <tr>
      <td style="padding: 40px 36px 24px 36px;">
        <span style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #C5A880; font-weight: 700; display: block; margin-bottom: 12px;">Order Confirmation &amp; Atelier Receipt</span>
        <h1 style="font-family: Georgia, 'Times New Roman', serif; font-size: 22px; line-height: 1.4; color: #000000; margin: 0 0 16px 0; font-weight: normal;">Dear ${escapeHtml(order.customerFullName)},</h1>
        <p style="font-size: 14px; line-height: 1.7; color: #444444; margin: 0 0 20px 0;">
          Thank you for choosing Finaluchi Couture. It is our distinct honour to craft your selected piece. Your order has been officially received and entered into our master production schedule at our Abuja atelier.
        </p>
        <p style="font-size: 14px; line-height: 1.7; color: #444444; margin: 0;">
          Every creation by our Creative Director, <strong>Oluchi Irokanulo</strong>, is hand-tailored to celebrate individuality and craftsmanship. Below are the registered details of your order.
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding: 0 36px 24px 36px;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8F6F2; border-left: 3px solid #000000; padding: 18px 20px;">
          <tr>
            <td>
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #777777; display: block;">Order Reference</span>
              <strong style="font-size: 16px; color: #000000; letter-spacing: 0.05em; font-family: 'Courier New', monospace;">${escapeHtml(order.orderNumber)}</strong>
            </td>
            <td align="right">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #777777; display: block;">Estimated Delivery</span>
              <strong style="font-size: 13px; color: #000000;">${escapeHtml(order.estimatedDeliveryDate || 'To be confirmed')}</strong>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding: 0 36px 30px 36px;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid #111111;">
              <th align="left" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #000000; padding-bottom: 10px; font-weight: 700;">Garment / Specification</th>
              <th align="center" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #000000; padding-bottom: 10px; font-weight: 700;">Qty</th>
              <th align="right" style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #000000; padding-bottom: 10px; font-weight: 700;">Amount</th>
            </tr>
          </thead>
          <tbody>${items}</tbody>
        </table>

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 16px;">
          <tr>
            <td align="right" style="font-size: 12px; color: #666666; padding: 4px 0;">Subtotal:</td>
            <td align="right" width="120" style="font-size: 13px; color: #111111; padding: 4px 0;">${formatKobo(order.subtotalKobo)}</td>
          </tr>
          <tr>
            <td align="right" style="font-size: 12px; color: #666666; padding: 4px 0;">Packaging &amp; Keepsake Box:</td>
            <td align="right" style="font-size: 13px; color: #111111; padding: 4px 0;">${(order.packagingType || '').includes('ECO') ? 'Eco-Luxury Carrier' : 'Complimentary'}</td>
          </tr>
          <tr>
            <td align="right" style="font-size: 12px; color: #666666; padding: 4px 0;">Insured Courier Delivery:</td>
            <td align="right" style="font-size: 13px; color: #111111; padding: 4px 0;">${(order.shippingKobo || 0) === 0 ? 'Complimentary' : formatKobo(order.shippingKobo)}</td>
          </tr>
          <tr style="border-top: 1px solid #111111;">
            <td align="right" style="font-size: 13px; font-weight: bold; color: #000000; padding: 12px 0;">Total (NGN):</td>
            <td align="right" style="font-size: 16px; font-weight: bold; color: #000000; padding: 12px 0; font-family: 'Courier New', monospace;">${formatKobo(order.totalKobo)}</td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding: 0 36px 36px 36px;">
        <div style="background-color: #FBF9F5; border: 1px solid #EAE3D2; padding: 22px; text-align: center;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #C5A880; font-weight: 700; display: block; margin-bottom: 6px;">Personal Concierge Assistance</span>
          <p style="font-size: 13px; line-height: 1.6; color: #444444; margin: 0 0 16px 0;">
            Have a specific event deadline, bespoke measurement adjustments, or questions about fitting? Our private client team in Abuja is available directly on WhatsApp.
          </p>
          <a href="${whatsappLink(`Hello Finaluchi, I am inquiring about Order ${order.orderNumber}`)}" style="display: inline-block; background-color: #000000; color: #FFFFFF; font-size: 11px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; padding: 12px 28px; border: 1px solid #000000;">Contact Atelier Concierge</a>
        </div>
      </td>
    </tr>

    ${brandFooter('Track your order anytime at finaluchi.com — Order Tracker, using your order number and this email address.')}
  </table>`;

  return {
    subject: `Order Confirmation ${order.orderNumber} — Finaluchi Couture`,
    html: emailShell(inner, `Your Finaluchi order ${order.orderNumber} has been received by our Abuja atelier.`),
  };
}

/* ---------------------------------------------------------------------------
 * Template 2 — Bespoke Appointment & Fitting Confirmation
 * ------------------------------------------------------------------------- */
export function renderAppointmentEmail(appointment: StoredAppointment): { subject: string; html: string } {
  const clientName = appointment.clientName || appointment.guestName || 'Esteemed Client';
  const appointmentType = (appointment.appointmentType || appointment.serviceType || 'ATELIER_FITTING').replace(/_/g, ' ');
  const location = appointment.location || 'Finaluchi Flagship Studio, Abuja, Nigeria';

  const inner = `
  <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border: 1px solid #EAE6DF;">
    ${brandHeader('Private Client Services · Abuja')}

    <tr>
      <td style="padding: 40px 36px 24px 36px;">
        <span style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #C5A880; font-weight: 700; display: block; margin-bottom: 12px;">Appointment Reservation</span>
        <h1 style="font-family: Georgia, 'Times New Roman', serif; font-size: 22px; color: #000000; margin: 0 0 16px 0; font-weight: normal;">Dear ${escapeHtml(clientName)},</h1>
        <p style="font-size: 14px; line-height: 1.7; color: #444444; margin: 0 0 20px 0;">
          We are delighted to receive your private bespoke consultation request with Finaluchi Couture. Our design team has reserved your requested session to discuss your occasion wear silhouette, fabric selection, and bespoke tailoring specifications.
        </p>

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8F6F2; border: 1px solid #EAE3D2; padding: 20px; margin-bottom: 24px;">
          <tr>
            <td style="padding-bottom: 10px;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #777777; display: block;">Consultation Type</span>
              <strong style="font-size: 14px; color: #000000;">${escapeHtml(appointmentType)}</strong>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 10px;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #777777; display: block;">Date &amp; Reserved Window</span>
              <strong style="font-size: 14px; color: #000000;">${escapeHtml(appointment.date)} &middot; ${escapeHtml(appointment.timeSlot)}</strong>
            </td>
          </tr>
          <tr>
            <td>
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #777777; display: block;">Location / Channel</span>
              <strong style="font-size: 14px; color: #000000;">${escapeHtml(location)}</strong>
            </td>
          </tr>
        </table>

        <h2 style="font-family: Georgia, 'Times New Roman', serif; font-size: 16px; color: #000000; margin: 0 0 10px 0;">Preparing For Your Fitting</h2>
        <ul style="font-size: 13px; line-height: 1.8; color: #555555; padding-left: 20px; margin: 0 0 28px 0;">
          <li>If attending an in-person fitting in Abuja, please bring the undergarments or shoes of corresponding heel height planned for your event.</li>
          <li>For virtual consultations, our concierge will contact you on WhatsApp prior to the call with the video session link.</li>
          <li>If you have reference fabrics, event themes, or specific dates in mind, feel free to share them with us in advance.</li>
        </ul>

        <div align="center">
          <a href="${whatsappLink(`Hello Finaluchi, I am confirming my fitting request for ${appointment.date}`)}" style="display: inline-block; background-color: #000000; color: #FFFFFF; font-size: 11px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; padding: 14px 32px;">Confirm Details on WhatsApp</a>
        </div>
      </td>
    </tr>

    ${brandFooter('Need to reschedule? Please notify us at least 24 hours in advance on WhatsApp ' + WHATSAPP_DISPLAY + '.')}
  </table>`;

  return {
    subject: `Consultation Reservation — Finaluchi Couture`,
    html: emailShell(inner, `Your bespoke consultation request for ${appointment.date} has been received.`),
  };
}

/* ---------------------------------------------------------------------------
 * Template 3 — Dispatch / Shipping Notice
 * ------------------------------------------------------------------------- */
export function renderDispatchEmail(
  order: StoredOrder,
  courierName: string,
  trackingNumber: string,
  trackingUrl?: string
): { subject: string; html: string } {
  const trackLink = trackingUrl || 'https://finaluchi.com/#/tracker';

  const inner = `
  <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border: 1px solid #EAE6DF;">
    ${brandHeader('Handcrafted in Nigeria · Dispatched')}

    <tr>
      <td style="padding: 40px 36px;">
        <span style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #C5A880; font-weight: 700; display: block; margin-bottom: 12px;">Signature Dispatch Notification</span>
        <h1 style="font-family: Georgia, 'Times New Roman', serif; font-size: 22px; color: #000000; margin: 0 0 16px 0; font-weight: normal;">Your Piece Is On Its Way</h1>
        <p style="font-size: 14px; line-height: 1.7; color: #444444; margin: 0 0 24px 0;">
          Dear ${escapeHtml(order.customerFullName)}, your Finaluchi piece (${escapeHtml(order.orderNumber)}) has completed all atelier quality checkpoints, final pressing, and has been prepared in our signature keepsake packaging. It is now safely in transit to you.
        </p>

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8F6F2; border-left: 3px solid #C5A880; padding: 20px; margin-bottom: 28px;">
          <tr>
            <td>
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #777777; display: block;">Courier Partner</span>
              <strong style="font-size: 14px; color: #000000; display: block; margin-bottom: 8px;">${escapeHtml(courierName)} (Insured Express Delivery)</strong>

              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #777777; display: block;">Waybill / Tracking Number</span>
              <strong style="font-size: 16px; color: #000000; font-family: 'Courier New', monospace;">${escapeHtml(trackingNumber)}</strong>
            </td>
          </tr>
        </table>

        <p style="font-size: 13px; line-height: 1.6; color: #555555; margin: 0 0 24px 0;">
          <strong>Delivery Note:</strong> Due to the bespoke nature and value of your garment, our courier requires a signature upon delivery. Please ensure an authorized recipient is available at the provided delivery address.
        </p>

        <div align="center">
          <a href="${escapeHtml(trackLink)}" style="display: inline-block; background-color: #000000; color: #FFFFFF; font-size: 11px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; padding: 14px 32px;">Track Delivery Status</a>
        </div>
      </td>
    </tr>

    ${brandFooter()}
  </table>`;

  return {
    subject: `Your Finaluchi Creation ${order.orderNumber} Has Dispatched`,
    html: emailShell(inner, `Order ${order.orderNumber} is on its way — tracking number ${trackingNumber}.`),
  };
}

/* ---------------------------------------------------------------------------
 * Studio notifications (plain, internal)
 * ------------------------------------------------------------------------- */
export async function notifyStudio(subject: string, lines: string[]): Promise<void> {
  if (!ATELIER_EMAIL) return;
  const body = `
  <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border: 1px solid #EAE6DF;">
    ${brandHeader('Internal Atelier Notification')}
    <tr>
      <td style="padding: 28px 32px; font-size: 13px; line-height: 1.8; color: #222222;">
        ${lines.map((l) => `<div style="padding: 4px 0; border-bottom: 1px solid #F0EDE6;">${escapeHtml(l)}</div>`).join('')}
      </td>
    </tr>
    ${brandFooter()}
  </table>`;

  await sendEmail({
    to: ATELIER_EMAIL,
    subject: `[Atelier] ${subject}`,
    html: emailShell(body, subject),
  });
}

/* ---------------------------------------------------------------------------
 * Dispatch helpers used by the API routes
 * ------------------------------------------------------------------------- */
export async function sendOrderConfirmation(order: StoredOrder): Promise<void> {
  if (!order.customerEmail) return;
  const { subject, html } = renderOrderConfirmationEmail(order);
  await sendEmail({ to: order.customerEmail, subject, html });
}

export async function sendAppointmentConfirmation(appointment: StoredAppointment): Promise<void> {
  const email = appointment.clientEmail || appointment.guestEmail;
  if (!email) return;
  const { subject, html } = renderAppointmentEmail(appointment);
  await sendEmail({ to: email, subject, html });
}

export async function sendDispatchNotice(
  order: StoredOrder,
  courierName: string,
  trackingNumber: string,
  trackingUrl?: string
): Promise<void> {
  if (!order.customerEmail) return;
  const { subject, html } = renderDispatchEmail(order, courierName, trackingNumber, trackingUrl);
  await sendEmail({ to: order.customerEmail, subject, html });
}
