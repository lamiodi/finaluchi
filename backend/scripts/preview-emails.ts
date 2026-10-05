// Renders the transactional email templates with sample data to HTML files
// for visual review in a browser: npx tsx scripts/preview-emails.ts
// Output: scripts/previews/*.html (gitignored — generated artifacts).
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {
  renderAppointmentEmail,
  renderDispatchEmail,
  renderOrderConfirmationEmail,
} from '../src/emails.js';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, 'previews');
mkdirSync(outDir, { recursive: true });

const order = {
  id: 'ord_sample',
  orderNumber: 'FC-2026-0148',
  customerFullName: 'Adaeze Okonkwo',
  customerEmail: 'adaeze@example.com',
  customerPhone: '+234 803 000 0000',
  shippingAddress: { city: 'Abuja', state: 'FCT', country: 'NG' },
  items: [
    {
      productId: 'prod-dress-02',
      productNameSnapshot: 'Rossa Dress',
      colorNameSnapshot: 'House Leopard',
      sizeSnapshot: '10',
      skuSnapshot: 'FC-DR-2026-LEO-10',
      unitPriceKobo: 6600000,
      quantity: 1,
      productSlugSnapshot: 'rossa-dress',
      productImageSnapshot: '/images/products/rossa-dress/rossa-1.jpeg',
    },
    {
      productId: 'prod-2pc-03',
      productNameSnapshot: 'Boss Set',
      colorNameSnapshot: 'Noir Onyx',
      sizeSnapshot: '14',
      skuSnapshot: 'FC-2P-RC24-BSS-BLK-14',
      unitPriceKobo: 25000000,
      quantity: 1,
      productSlugSnapshot: 'boss-set',
      productImageSnapshot: '/images/products/boss-set/boss-1.jpeg',
    },
  ],
  subtotalKobo: 31600000,
  shippingKobo: 0,
  taxKobo: 2370000,
  discountKobo: 0,
  totalKobo: 33970000,
  currency: 'NGN',
  paymentStatus: 'PAID',
  packagingType: 'SIGNATURE_BOX',
  createdAt: new Date().toISOString(),
  estimatedDeliveryDate: '24 October 2026',
} as any;

const appointment = {
  id: 'apt_sample',
  clientName: 'Adaeze Okonkwo',
  clientEmail: 'adaeze@example.com',
  appointmentType: 'BESPOKE_CONSULTATION',
  date: 'Tuesday, 20 October 2026',
  timeSlot: '11:00 AM – 12:30 PM WAT',
  location: 'Finaluchi Flagship Studio, Abuja, Nigeria',
  status: 'CONFIRMED',
} as any;

const files: Array<[string, { subject: string; html: string }]> = [
  ['order-confirmation.html', renderOrderConfirmationEmail(order)],
  ['appointment.html', renderAppointmentEmail(appointment)],
  ['dispatch.html', renderDispatchEmail(order, 'OME Speedpost', 'OME-884219-NG')],
];

for (const [name, { html }] of files) {
  writeFileSync(join(outDir, name), html);
  console.log('wrote', join(outDir, name));
}
