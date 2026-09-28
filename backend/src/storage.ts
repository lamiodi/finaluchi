// Lightweight JSON-file persistence for the Finaluchi atelier API.
// Orders, appointments, contacts and newsletter signups live in backend/data/db.json.
// Deploy notes: on hosts with an ephemeral filesystem (e.g. Vercel functions) this store
// resets between invocations — point DATA_DIR at a persistent volume, or migrate to
// Supabase/Neon (see DEPLOYMENT.md) before relying on it for production records.

import fs from 'fs';
import path from 'path';

export interface StoredOrder {
  id: string;
  orderNumber: string;
  guestAccessToken?: string;
  customerFullName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: Record<string, unknown>;
  items?: Array<Record<string, unknown>>;
  subtotalKobo?: number;
  shippingKobo?: number;
  taxKobo?: number;
  discountKobo?: number;
  totalKobo?: number;
  currency?: string;
  paymentStatus?: string;
  orderStatus?: string;
  fulfillmentStatus?: string;
  gatewayReference?: string;
  packagingType?: string;
  isGift?: boolean;
  giftMessage?: string;
  atelierCurrentStageIndex?: number;
  createdAt?: string;
  estimatedDeliveryDate?: string;
  certificateSerialNumber?: string;
  updatedAt?: string;
}

export interface StoredAppointment {
  id: string;
  clientName?: string;
  guestName?: string;
  clientEmail?: string;
  guestEmail?: string;
  clientPhone?: string;
  guestPhone?: string;
  appointmentType?: string;
  serviceType?: string;
  location?: string;
  date: string;
  timeSlot: string;
  status: string;
  notes?: string;
  createdAt?: string;
}

export interface StoredContact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
}

export interface StoredSubscriber {
  email: string;
  createdAt: string;
}

interface DbShape {
  orders: StoredOrder[];
  appointments: StoredAppointment[];
  contacts: StoredContact[];
  newsletter: StoredSubscriber[];
}

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const EMPTY_DB: DbShape = {
  orders: [],
  appointments: [],
  contacts: [],
  newsletter: [],
};

const db: DbShape = {
  orders: [],
  appointments: [],
  contacts: [],
  newsletter: [],
};

let loaded = false;
let writeChain: Promise<void> = Promise.resolve();

async function ensureLoaded(): Promise<void> {
  if (loaded) return;
  loaded = true;
  try {
    await fs.promises.mkdir(DATA_DIR, { recursive: true });
    const raw = await fs.promises.readFile(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<DbShape>;
    db.orders = Array.isArray(parsed.orders) ? parsed.orders : [];
    db.appointments = Array.isArray(parsed.appointments) ? parsed.appointments : [];
    db.contacts = Array.isArray(parsed.contacts) ? parsed.contacts : [];
    db.newsletter = Array.isArray(parsed.newsletter) ? parsed.newsletter : [];
  } catch (err: any) {
    if (err?.code !== 'ENOENT') {
      console.error('[Storage] Failed to read db.json, starting empty:', err?.message || err);
    }
  }
}

function persist(): Promise<void> {
  // Serialize writes through a chain so concurrent requests never clobber the file.
  writeChain = writeChain
    .then(async () => {
      const tmp = `${DB_FILE}.${process.pid}.${Date.now()}.tmp`;
      await fs.promises.mkdir(DATA_DIR, { recursive: true });
      await fs.promises.writeFile(tmp, JSON.stringify(db, null, 2), 'utf-8');
      await fs.promises.rename(tmp, DB_FILE);
    })
    .catch((err) => {
      console.error('[Storage] Failed to persist db.json:', err?.message || err);
    });
  return writeChain;
}

export async function upsertOrder(order: StoredOrder): Promise<StoredOrder> {
  await ensureLoaded();
  const normalized: StoredOrder = {
    ...order,
    orderNumber: (order.orderNumber || '').toUpperCase(),
    updatedAt: new Date().toISOString(),
  };
  const idx = db.orders.findIndex((o) => o.orderNumber === normalized.orderNumber);
  if (idx >= 0) {
    db.orders[idx] = { ...db.orders[idx], ...normalized };
  } else {
    db.orders.unshift(normalized);
  }
  await persist();
  return normalized;
}

export async function findOrderByNumber(orderNumber: string): Promise<StoredOrder | undefined> {
  await ensureLoaded();
  const target = (orderNumber || '').toUpperCase();
  return db.orders.find((o) => (o.orderNumber || '').toUpperCase() === target);
}

export async function listOrders(): Promise<StoredOrder[]> {
  await ensureLoaded();
  return [...db.orders];
}

export async function addAppointment(appointment: StoredAppointment): Promise<StoredAppointment> {
  await ensureLoaded();
  const entry = { ...appointment, createdAt: appointment.createdAt || new Date().toISOString() };
  const idx = db.appointments.findIndex((a) => a.id === entry.id);
  if (idx >= 0) {
    db.appointments[idx] = { ...db.appointments[idx], ...entry };
  } else {
    db.appointments.unshift(entry);
  }
  await persist();
  return entry;
}

export async function listAppointments(): Promise<StoredAppointment[]> {
  await ensureLoaded();
  return [...db.appointments];
}

export async function addContact(contact: StoredContact): Promise<StoredContact> {
  await ensureLoaded();
  db.contacts.unshift(contact);
  await persist();
  return contact;
}

export async function addSubscriber(email: string): Promise<{ email: string; createdAt: string; alreadySubscribed: boolean }> {
  await ensureLoaded();
  const normalized = email.trim().toLowerCase();
  const existing = db.newsletter.find((s) => s.email === normalized);
  if (existing) return { ...existing, alreadySubscribed: true };
  const entry = { email: normalized, createdAt: new Date().toISOString() };
  db.newsletter.unshift(entry);
  await persist();
  return { ...entry, alreadySubscribed: false };
}

export function sanitizeOrderForClient(order: StoredOrder): Record<string, unknown> {
  // Never expose guest access tokens or internal notes to the public tracking endpoint.
  const { guestAccessToken, ...safe } = order;
  return safe;
}
