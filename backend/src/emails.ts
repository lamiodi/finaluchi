// Transactional email dispatch via the Resend REST API (no SDK dependency).
// If RESEND_API_KEY is not configured, emails are logged instead of sent so the
// atelier can still run locally / in test mode without an email provider.
//
// Templates follow the site's design language (frontend/src/refinements.css):
// the salon-dark room wrapping a paper card (the checkout modal's world),
// Antic Didone's serif voice with bronze italic accents, the Allura Couture
// signature, hairline rules instead of heavy borders, bag-drawer photo rows
// for order items, and the ink-bar call to action. Web fonts are loaded via
// Google Fonts where clients allow them; the stacks fall back to Didot /
// Georgia (serif) and system faces elsewhere. CSS transforms are avoided —
// most email clients strip them.

import { StoredAppointment, StoredOrder } from './storage.js';

const ATELIER_EMAIL = process.env.ATELIER_EMAIL || process.env.RESEND_FROM || '';
const RESEND_FROM = process.env.RESEND_FROM || 'FINALUCHI COUTURE <onboarding@resend.dev>';
const WHATSAPP_DISPLAY = '+234 803 231 2961';
const WHATSAPP_NUMBER = '2348032312961';
const SITE_URL = (process.env.SITE_URL || 'https://www.finaluchi.com').replace(/\/+$/, '');
const INSTAGRAM_URL = 'https://www.instagram.com/finaluchi_couture/';
const INSTAGRAM_HANDLE = '@finaluchi_couture';

/* Design tokens — the paper & salon worlds from src/refinements.css. */
const PAPER = '#faf9f6';
const INK = '#201f1d';
const SALON = '#171715';
const SALON_LINE = '#2e2c29';
const IVORY = '#efebe3';
const CHAMPAGNE = '#c5a880';
const SALON_EYEBROW = '#baa78c';
const BRONZE = '#846548';
const BODY_TEXT = '#69645e';
const MUTED = '#706961';
const LABEL = '#7c7164';
const FAINT = '#948c7f';
const HAIRLINE = '#dcd8d0';
const HAIRLINE_SOFT = '#e4dfd6';
const PANEL = '#f0ede7';
const PHOTO_GROUND = '#e4e1db';
const SERIF = "'Antic Didone', Didot, 'Bodoni MT', 'Playfair Display', Georgia, serif";
const SANS = "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const SCRIPT = "'Allura', 'Segoe Script', 'Brush Script MT', cursive";
const MONO = "'Courier New', Courier, monospace";

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

/* Pattern primitives — eyebrow, serif heading with bronze italic, ink bar. */

function eyebrow(text: string, color: string = LABEL): string {
  return `<span style="font-family: ${SANS}; font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: ${color}; font-weight: 500; display: block;">${text}</span>`;
}

function displayHeading(html: string): string {
  return `<h1 style="font-family: ${SERIF}; font-size: 30px; line-height: 1.16; letter-spacing: -0.02em; color: ${INK}; margin: 14px 0 0 0; font-weight: normal;">${html}</h1>`;
}

/* The order-submit bar: full-width ink block, label only, uppercase tracking —
 * no arrows; the site's solid bars carry none. */
function inkBar(href: string, label: string): string {
  return `<a href="${href}" style="display: block; background-color: ${INK}; color: ${PAPER}; font-family: ${SANS}; font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none; padding: 17px 19px; text-align: center;">${label}</a>`;
}

function bodyParagraph(html: string, extra = ''): string {
  return `<p style="font-family: ${SANS}; font-size: 13px; line-height: 1.85; color: ${BODY_TEXT}; margin: 0 0 14px 0; ${extra}">${html}</p>`;
}

/* The maison's wordmark pairing from the nav and runway header: letterspaced
 * serif FINALUCHI over the Allura Couture signature in champagne. */
function brandHeader(subtitle: string): string {
  return `
  <tr>
    <td align="center" style="background-color: ${SALON}; padding: 38px 20px 30px 20px; border-bottom: 1px solid ${SALON_LINE};">
      <a href="${SITE_URL}" style="text-decoration: none;">
        <span style="font-family: ${SERIF}; font-size: 21px; letter-spacing: 0.2em; color: ${IVORY}; display: block;">FINALUCHI</span>
        <span style="font-family: ${SCRIPT}; font-size: 32px; line-height: 1.1; color: ${CHAMPAGNE}; display: block; margin-top: 2px;">Couture</span>
      </a>
      <span style="font-family: ${SANS}; font-size: 8px; letter-spacing: 0.32em; color: ${SALON_EYEBROW}; text-transform: uppercase; margin-top: 14px; display: block;">${escapeHtml(subtitle)}</span>
    </td>
  </tr>`;
}

function brandFooter(note?: string): string {
  return `
  <tr>
    <td align="center" style="background-color: ${SALON}; padding: 32px 24px 26px 24px; border-top: 1px solid ${SALON_LINE};">
      <span style="font-family: ${SERIF}; font-size: 13px; letter-spacing: 0.2em; color: ${IVORY}; display: inline-block;">FINALUCHI</span>
      <span style="font-family: ${SCRIPT}; font-size: 20px; line-height: 1; color: ${CHAMPAGNE}; display: inline-block; margin-left: 7px;">Couture</span>
      <p style="font-family: ${SANS}; font-size: 8px; letter-spacing: 0.24em; text-transform: uppercase; color: ${SALON_EYEBROW}; margin: 12px 0 16px 0;">Abuja, Nigeria &middot; Atelier ${WHATSAPP_DISPLAY}</p>
      <a href="${INSTAGRAM_URL}" target="_blank" style="display: inline-block; font-family: ${SANS}; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: ${IVORY}; text-decoration: none; border-bottom: 1px solid ${CHAMPAGNE}; padding-bottom: 4px;">Instagram &mdash; ${INSTAGRAM_HANDLE}</a>
      <p style="font-family: ${SANS}; font-size: 11px; line-height: 1.7; color: #b2ada4; margin: 18px 0 14px 0;">
        ${note ? `${escapeHtml(note)}<br>` : ''}
        You are receiving this communication regarding your relationship with finaluchi.com.
      </p>
      <p style="font-family: ${SANS}; font-size: 8px; letter-spacing: 0.16em; text-transform: uppercase; color: ${FAINT}; margin: 0; padding-top: 12px; border-top: 1px solid ${SALON_LINE};">
        &copy; ${new Date().getFullYear()} Finaluchi Couture &middot; All rights reserved
      </p>
    </td>
  </tr>`;
}

function emailShell(innerHtml: string, preheader: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Finaluchi Couture</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Antic+Didone&family=Allura&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: ${SALON}; font-family: ${SANS}; color: ${INK}; -webkit-font-smoothing: antialiased;">
  <span style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${escapeHtml(preheader)}</span>
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${SALON}; padding: 36px 10px;">
    <tr>
      <td align="center">
        ${innerHtml}
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* Paper info panel — the order-note style: tinted ground, hairline border,
 * no coloured edge bars. */
function notePanelOpen(): string {
  return `<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${PANEL}; border: 1px solid ${HAIRLINE};"><tr><td style="padding: 18px 20px;">`;
}

const NOTE_PANEL_CLOSE = `</td></tr></table>`;

/* Ledger row — the bag-ledger vocabulary: muted label, ink value, hairlines.
 * Values are sans (the site's ledger is set in DM Sans, not a typewriter face). */
function ledgerRow(label: string, value: string, bold = false): string {
  return `
  <tr>
    <td style="font-family: ${SANS}; font-size: ${bold ? 12 : 11}px; color: ${MUTED}; padding: 5px 0;">${label}</td>
    <td align="right" style="font-family: ${SANS}; font-size: ${bold ? 13 : 12}px; color: ${INK}; padding: 5px 0; white-space: nowrap; ${bold ? 'font-weight: bold;' : ''}">${value}</td>
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
  const items = (order.items || []).map((item: any) => {
    const name = escapeHtml(item.productNameSnapshot);
    const meta = [
      escapeHtml(item.colorNameSnapshot),
      item.sizeSnapshot ? `Size ${escapeHtml(item.sizeSnapshot)}` : '',
      `Qty ${escapeHtml(item.quantity)}`,
    ].filter(Boolean).join(' &middot; ');
    const imageFile = item.productImageSnapshot
      ? `<img src="${SITE_URL}${escapeHtml(item.productImageSnapshot)}" width="76" alt="${name}" style="display: block; width: 76px; height: auto; border: 1px solid ${HAIRLINE}; background-color: ${PHOTO_GROUND};">`
      : `<div style="width: 76px; height: 96px; background-color: ${PHOTO_GROUND}; border: 1px solid ${HAIRLINE};">&nbsp;</div>`;

    return `
    <tr>
      <td style="padding: 18px 0; border-bottom: 1px solid ${HAIRLINE_SOFT};">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="78" valign="top" style="vertical-align: top;">${imageFile}</td>
            <td valign="top" style="vertical-align: top; padding-left: 18px;">
              <span style="font-family: ${SERIF}; font-size: 17px; line-height: 1.3; color: ${INK}; display: block;">${name}</span>
              <span style="font-family: ${SANS}; font-size: 10px; letter-spacing: 0.1em; color: ${MUTED}; display: block; margin-top: 6px; text-transform: uppercase;">${meta}</span>
            </td>
            <td align="right" valign="top" style="font-family: ${SANS}; font-size: 12px; color: ${INK}; padding-left: 12px; white-space: nowrap;">${formatKobo(item.unitPriceKobo * item.quantity)}</td>
          </tr>
        </table>
      </td>
    </tr>`;
  }).join('');

  const inner = `
  <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: ${PAPER}; border: 1px solid ${HAIRLINE};">
    ${brandHeader('Abuja flagship atelier · Nigeria')}

    <tr>
      <td style="padding: 40px 40px 26px 40px;">
        ${eyebrow('Finaluchi / Order confirmation &amp; atelier receipt')}
        ${displayHeading(`Your order is <em style="color: ${BRONZE};">received.</em>`)}
        <div style="height: 14px; line-height: 14px;">&nbsp;</div>
        ${bodyParagraph(`Dear ${escapeHtml(order.customerFullName)}, thank you for choosing Finaluchi Couture. Your order has been officially received and entered into the master production schedule at our Abuja atelier.`)}
        ${bodyParagraph(`Every creation by our Creative Director, <strong style="color: ${INK};">Oluchi Irokanulo</strong>, is hand-tailored to celebrate individuality and craftsmanship. The registered details of your order follow below.`)}
      </td>
    </tr>

    <tr>
      <td style="padding: 0 40px 30px 40px;">
        ${notePanelOpen()}
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td>
                <span style="font-family: ${SANS}; font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: ${LABEL}; display: block;">Order reference</span>
                <strong style="font-family: ${MONO}; font-size: 15px; color: ${INK}; letter-spacing: 0.04em; display: block; margin-top: 5px;">${escapeHtml(order.orderNumber)}</strong>
              </td>
              <td align="right">
                <span style="font-family: ${SANS}; font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: ${LABEL}; display: block;">Estimated delivery</span>
                <strong style="font-family: ${SANS}; font-size: 12px; color: ${INK}; display: block; margin-top: 6px;">${escapeHtml(order.estimatedDeliveryDate || 'To be confirmed')}</strong>
              </td>
            </tr>
          </table>
        ${NOTE_PANEL_CLOSE}
      </td>
    </tr>

    <tr>
      <td style="padding: 0 40px 8px 40px;">
        ${eyebrow('01 — Your pieces', BRONZE)}
      </td>
    </tr>
    <tr>
      <td style="padding: 6px 40px 22px 40px; border-bottom: 1px solid ${HAIRLINE};">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
          ${items}
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding: 22px 40px 30px 40px;">
        ${eyebrow('02 — The ledger', BRONZE)}
        <div style="height: 8px; line-height: 8px;">&nbsp;</div>
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          ${ledgerRow('Subtotal', formatKobo(order.subtotalKobo))}
          ${ledgerRow('Packaging &amp; keepsake box', (order.packagingType || '').includes('ECO') ? 'Eco-Luxury Carrier' : 'Complimentary')}
          ${ledgerRow('Insured courier delivery', (order.shippingKobo || 0) === 0 ? 'Complimentary' : formatKobo(order.shippingKobo))}
          <tr><td colspan="2" style="border-top: 1px solid ${HAIRLINE}; font-size: 1px; line-height: 1px;">&nbsp;</td></tr>
          ${ledgerRow('TOTAL (NGN)', formatKobo(order.totalKobo), true)}
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding: 0 40px 38px 40px;">
        ${notePanelOpen()}
          ${eyebrow('03 — Personal concierge', BRONZE)}
          <div style="height: 10px; line-height: 10px;">&nbsp;</div>
          <p style="font-family: ${SANS}; font-size: 12px; line-height: 1.8; color: ${BODY_TEXT}; margin: 0 0 18px 0;">
            Have a specific event deadline, bespoke measurement adjustments, or questions about
            fitting? Our private client team in Abuja is available directly on WhatsApp.
          </p>
          ${inkBar(whatsappLink(`Hello Finaluchi, I am inquiring about Order ${order.orderNumber}`), 'Message the atelier')}
        ${NOTE_PANEL_CLOSE}
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

  const detailRow = (label: string, value: string, last = false) => `
    <tr>
      <td style="padding: ${last ? '12px 0 0 0' : '12px 0'}; ${last ? '' : `border-bottom: 1px solid ${HAIRLINE_SOFT};`}">
        <span style="font-family: ${SANS}; font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: ${LABEL}; display: block;">${label}</span>
        <strong style="font-family: ${SANS}; font-size: 13px; color: ${INK}; display: block; margin-top: 5px;">${value}</strong>
      </td>
    </tr>`;

  const prepItems = [
    'If attending an in-person fitting in Abuja, please bring the undergarments or shoes of corresponding heel height planned for your event.',
    'For virtual consultations, our concierge will contact you on WhatsApp prior to the call with the video session link.',
    'If you have reference fabrics, event themes, or specific dates in mind, feel free to share them with us in advance.',
  ];

  const inner = `
  <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: ${PAPER}; border: 1px solid ${HAIRLINE};">
    ${brandHeader('Private client services · Abuja')}

    <tr>
      <td style="padding: 40px 40px 26px 40px;">
        ${eyebrow('Finaluchi / Appointment reservation')}
        ${displayHeading(`Your fitting is <em style="color: ${BRONZE};">reserved.</em>`)}
        <div style="height: 14px; line-height: 14px;">&nbsp;</div>
        ${bodyParagraph(`Dear ${escapeHtml(clientName)}, we are delighted to receive your private bespoke consultation request. Our design team has reserved your session to discuss your occasion wear silhouette, fabric selection, and bespoke tailoring specifications.`)}
      </td>
    </tr>

    <tr>
      <td style="padding: 0 40px 30px 40px;">
        ${notePanelOpen()}
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            ${detailRow('Consultation type', escapeHtml(appointmentType))}
            ${detailRow('Date &amp; reserved window', `${escapeHtml(appointment.date)} &middot; ${escapeHtml(appointment.timeSlot)}`)}
            ${detailRow('Location / channel', escapeHtml(location), true)}
          </table>
        ${NOTE_PANEL_CLOSE}
      </td>
    </tr>

    <tr>
      <td style="padding: 0 40px 8px 40px;">
        ${eyebrow('01 — Preparing for your fitting', BRONZE)}
      </td>
    </tr>
    <tr>
      <td style="padding: 6px 40px 28px 40px;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          ${prepItems.map((item, i) => `
          <tr>
            <td style="padding: 13px 0; ${i < prepItems.length - 1 ? `border-bottom: 1px solid ${HAIRLINE_SOFT};` : ''}">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
                <tr>
                  <td width="34" valign="top" style="font-family: ${SERIF}; font-size: 15px; color: ${BRONZE}; white-space: nowrap;">0${i + 1}</td>
                  <td valign="top" style="font-family: ${SANS}; font-size: 12px; line-height: 1.8; color: ${BODY_TEXT};">${item}</td>
                </tr>
              </table>
            </td>
          </tr>`).join('')}
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding: 0 40px 40px 40px;">
        ${inkBar(whatsappLink(`Hello Finaluchi, I am confirming my fitting request for ${appointment.date}`), 'Confirm details on WhatsApp')}
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
  const trackLink = trackingUrl || `${SITE_URL}/#/tracker`;

  const inner = `
  <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: ${PAPER}; border: 1px solid ${HAIRLINE};">
    ${brandHeader('Handcrafted in Nigeria · Dispatched')}

    <tr>
      <td style="padding: 40px 40px 26px 40px;">
        ${eyebrow('Finaluchi / Signature dispatch notification')}
        ${displayHeading(`Your piece is <em style="color: ${BRONZE};">on its way.</em>`)}
        <div style="height: 14px; line-height: 14px;">&nbsp;</div>
        ${bodyParagraph(`Dear ${escapeHtml(order.customerFullName)}, your Finaluchi piece (${escapeHtml(order.orderNumber)}) has completed all atelier quality checkpoints, final pressing, and has been prepared in our signature keepsake packaging. It is now safely in transit to you.`)}
      </td>
    </tr>

    <tr>
      <td style="padding: 0 40px 24px 40px;">
        ${notePanelOpen()}
          <span style="font-family: ${SANS}; font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: ${LABEL}; display: block;">Courier partner</span>
          <strong style="font-family: ${SANS}; font-size: 13px; color: ${INK}; display: block; margin-top: 5px; padding-bottom: 12px; border-bottom: 1px solid ${HAIRLINE_SOFT};">${escapeHtml(courierName)} (Insured Express Delivery)</strong>
          <div style="height: 14px; line-height: 14px;">&nbsp;</div>
          <span style="font-family: ${SANS}; font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: ${LABEL}; display: block;">Waybill / tracking number</span>
          <strong style="font-family: ${MONO}; font-size: 15px; color: ${INK}; letter-spacing: 0.04em; display: block; margin-top: 5px;">${escapeHtml(trackingNumber)}</strong>
        ${NOTE_PANEL_CLOSE}
      </td>
    </tr>

    <tr>
      <td style="padding: 0 40px 30px 40px;">
        ${bodyParagraph(`<strong style="color: ${INK};">Delivery note:</strong> due to the bespoke nature and value of your garment, our courier requires a signature upon delivery. Please ensure an authorized recipient is available at the provided delivery address.`, 'border-top: 1px solid ' + HAIRLINE + '; padding-top: 18px;')}
      </td>
    </tr>

    <tr>
      <td style="padding: 0 40px 40px 40px;">
        ${inkBar(escapeHtml(trackLink), 'Track delivery status')}
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
  <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: ${PAPER}; border: 1px solid ${HAIRLINE};">
    ${brandHeader('Internal Atelier Notification')}
    <tr>
      <td style="padding: 28px 32px; font-size: 13px; line-height: 1.8; color: ${INK}; font-family: ${SANS};">
        ${lines.map((l) => `<div style="padding: 6px 0; border-bottom: 1px solid ${HAIRLINE_SOFT};">${escapeHtml(l)}</div>`).join('')}
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
