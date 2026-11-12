// Durable persistence for the Finaluchi atelier API.
//
// Primary store: Supabase Postgres (`DATABASE_URL` via src/db.ts) — tables:
//   public.orders, public.appointments, public.contacts, public.newsletter_subscribers
// Fallback store: backend/data/db.json (used automatically when DATABASE_URL is
// unset or if the remote Postgres instance is temporarily paused/unreachable,
// so checkout and tracking never crash).

import fs from 'fs';
import path from 'path';
import { isDatabaseConfigured, sql } from './db.js';

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

const db: DbShape = {
  orders: [],
  appointments: [],
  contacts: [],
  newsletter: [],
};

let fileLoaded = false;
let writeChain: Promise<void> = Promise.resolve();

// Postgres schema bootstrap state
let pgSchemaReady = false;
let pgLastError: string | null = null;
let pgRetryAfter = 0;
const PG_RETRY_COOLDOWN_MS = 30_000;

async function ensurePostgresReady(): Promise<boolean> {
  if (!isDatabaseConfigured || !sql) return false;
  if (pgSchemaReady) return true;
  if (Date.now() < pgRetryAfter) return false;

  try {
    await sql`
      create table if not exists public.orders (
        order_number         text primary key,
        id                   text not null,
        customer_email       text not null,
        customer_full_name   text,
        customer_phone       text,
        total_kobo           bigint not null default 0,
        currency             text not null default 'NGN',
        payment_status       text not null default 'PAYMENT_PENDING',
        order_status         text not null default 'PENDING_PAYMENT',
        fulfillment_status   text not null default 'UNFULFILLED',
        gateway_reference    text,
        atelier_stage_index  integer not null default 0,
        data                 jsonb not null,
        created_at           timestamptz not null default now(),
        updated_at           timestamptz not null default now()
      )
    `;
    await sql`
      create table if not exists public.appointments (
        id                text primary key,
        client_name       text not null,
        client_email      text,
        client_phone      text not null,
        appointment_type  text,
        date              text not null,
        time_slot         text not null,
        status            text not null default 'PENDING',
        data              jsonb not null,
        created_at        timestamptz not null default now(),
        updated_at        timestamptz not null default now()
      )
    `;
    await sql`
      create table if not exists public.contacts (
        id          text primary key,
        name        text not null,
        email       text,
        phone       text,
        subject     text,
        message     text not null,
        data        jsonb not null,
        created_at  timestamptz not null default now()
      )
    `;
    await sql`
      create table if not exists public.newsletter_subscribers (
        email       text primary key,
        created_at  timestamptz not null default now()
      )
    `;
    pgSchemaReady = true;
    pgLastError = null;
    return true;
  } catch (err: any) {
    pgSchemaReady = false;
    pgRetryAfter = Date.now() + PG_RETRY_COOLDOWN_MS;
    const msg = err?.message || String(err);
    if (pgLastError !== msg) {
      pgLastError = msg;
      console.warn(
        `[Storage] Supabase Postgres unreachable (${msg}) — falling back to ${DB_FILE} (will retry in 30s).`
      );
    }
    return false;
  }
}

function handlePgRuntimeError(op: string, err: any): void {
  pgSchemaReady = false;
  pgRetryAfter = Date.now() + PG_RETRY_COOLDOWN_MS;
  pgLastError = err?.message || String(err);
  console.warn(`[Storage] Postgres ${op} failed (${pgLastError}) — using JSON fallback.`);
}

export async function getStorageStatus(): Promise<'postgres' | 'file-fallback'> {
  const ok = await ensurePostgresReady();
  return ok ? 'postgres' : 'file-fallback';
}

async function ensureFileLoaded(): Promise<void> {
  if (fileLoaded) return;
  fileLoaded = true;
  try {
    await fs.promises.mkdir(DATA_DIR, { recursive: true });
    const raw = await fs.promises.readFile(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<DbShape>;
    db.orders = Array.isArray(parsed.orders) ? parsed.orders : [];
    db.appointments = Array.isArray(parsed.appointments) ? parsed.appointments : [];
    db.contacts = Array.isArray(parsed.contacts) ? parsed.contacts : [];
    db.newsletter = Array.isArray(parsed.newsletter) ? parsed.newsletter : [];
  } catch (err: any) {
    if (err?.code === 'ENOENT') return;
    try {
      await fs.promises.rename(DB_FILE, `${DB_FILE}.corrupt-${Date.now()}`);
      console.error('[Storage] db.json unreadable — moved aside as db.corrupt-*.json, starting empty:', err?.message || err);
    } catch {
      console.error('[Storage] Failed to read db.json, starting empty:', err?.message || err);
    }
  }
}

function persistFile(): Promise<void> {
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
  const now = new Date().toISOString();
  const orderNumber = (order.orderNumber || '').toUpperCase();

  if (await ensurePostgresReady() && sql) {
    try {
      const existingRows = await sql<{ data: StoredOrder }[]>`
        select data from public.orders where order_number = ${orderNumber} limit 1
      `;
      const merged: StoredOrder = {
        ...(existingRows[0]?.data || {}),
        ...order,
        orderNumber,
        createdAt: order.createdAt || existingRows[0]?.data?.createdAt || now,
        updatedAt: now,
      };
      await sql`
        insert into public.orders (
          order_number, id, customer_email, customer_full_name, customer_phone,
          total_kobo, currency, payment_status, order_status, fulfillment_status,
          gateway_reference, atelier_stage_index, data, created_at, updated_at
        ) values (
          ${merged.orderNumber},
          ${merged.id || `ord-${Date.now()}`},
          ${(merged.customerEmail || '').toLowerCase()},
          ${merged.customerFullName || null},
          ${merged.customerPhone || null},
          ${merged.totalKobo ?? 0},
          ${merged.currency || 'NGN'},
          ${merged.paymentStatus || 'PAYMENT_PENDING'},
          ${merged.orderStatus || 'PENDING_PAYMENT'},
          ${merged.fulfillmentStatus || 'UNFULFILLED'},
          ${merged.gatewayReference || null},
          ${merged.atelierCurrentStageIndex ?? 0},
          ${sql.json(merged as any)},
          ${merged.createdAt || now},
          ${now}
        )
        on conflict (order_number) do update set
          customer_email = excluded.customer_email,
          customer_full_name = excluded.customer_full_name,
          customer_phone = excluded.customer_phone,
          total_kobo = excluded.total_kobo,
          currency = excluded.currency,
          payment_status = excluded.payment_status,
          order_status = excluded.order_status,
          fulfillment_status = excluded.fulfillment_status,
          gateway_reference = excluded.gateway_reference,
          atelier_stage_index = excluded.atelier_stage_index,
          data = excluded.data,
          updated_at = now()
      `;
      return merged;
    } catch (err) {
      handlePgRuntimeError('upsertOrder', err);
    }
  }

  await ensureFileLoaded();
  const normalized: StoredOrder = {
    ...order,
    orderNumber,
    createdAt: order.createdAt || now,
    updatedAt: now,
  };
  const idx = db.orders.findIndex((o) => o.orderNumber === normalized.orderNumber);
  if (idx >= 0) {
    db.orders[idx] = { ...db.orders[idx], ...normalized };
  } else {
    db.orders.unshift(normalized);
  }
  await persistFile();
  return normalized;
}

export async function findOrderByNumber(orderNumber: string): Promise<StoredOrder | undefined> {
  const target = (orderNumber || '').toUpperCase();
  if (!target) return undefined;

  if (await ensurePostgresReady() && sql) {
    try {
      const rows = await sql<{ data: StoredOrder }[]>`
        select data from public.orders where order_number = ${target} limit 1
      `;
      return rows[0]?.data;
    } catch (err) {
      handlePgRuntimeError('findOrderByNumber', err);
    }
  }

  await ensureFileLoaded();
  return db.orders.find((o) => (o.orderNumber || '').toUpperCase() === target);
}

export async function listOrders(): Promise<StoredOrder[]> {
  if (await ensurePostgresReady() && sql) {
    try {
      const rows = await sql<{ data: StoredOrder }[]>`
        select data from public.orders order by created_at desc
      `;
      return rows.map((r) => r.data);
    } catch (err) {
      handlePgRuntimeError('listOrders', err);
    }
  }

  await ensureFileLoaded();
  return [...db.orders];
}

export async function addAppointment(appointment: StoredAppointment): Promise<StoredAppointment> {
  const now = new Date().toISOString();
  const entry: StoredAppointment = {
    ...appointment,
    createdAt: appointment.createdAt || now,
  };

  if (await ensurePostgresReady() && sql) {
    try {
      await sql`
        insert into public.appointments (
          id, client_name, client_email, client_phone, appointment_type,
          date, time_slot, status, data, created_at, updated_at
        ) values (
          ${entry.id},
          ${entry.clientName || entry.guestName || 'Client'},
          ${entry.clientEmail || entry.guestEmail || null},
          ${entry.clientPhone || entry.guestPhone || ''},
          ${entry.appointmentType || entry.serviceType || null},
          ${entry.date},
          ${entry.timeSlot},
          ${entry.status || 'PENDING'},
          ${sql.json(entry as any)},
          ${entry.createdAt || now},
          ${now}
        )
        on conflict (id) do update set
          status = excluded.status,
          data = excluded.data,
          updated_at = now()
      `;
      return entry;
    } catch (err) {
      handlePgRuntimeError('addAppointment', err);
    }
  }

  await ensureFileLoaded();
  const idx = db.appointments.findIndex((a) => a.id === entry.id);
  if (idx >= 0) {
    db.appointments[idx] = { ...db.appointments[idx], ...entry };
  } else {
    db.appointments.unshift(entry);
  }
  await persistFile();
  return entry;
}

export async function listAppointments(): Promise<StoredAppointment[]> {
  if (await ensurePostgresReady() && sql) {
    try {
      const rows = await sql<{ data: StoredAppointment }[]>`
        select data from public.appointments order by created_at desc
      `;
      return rows.map((r) => r.data);
    } catch (err) {
      handlePgRuntimeError('listAppointments', err);
    }
  }

  await ensureFileLoaded();
  return [...db.appointments];
}

export async function addContact(contact: StoredContact): Promise<StoredContact> {
  if (await ensurePostgresReady() && sql) {
    try {
      await sql`
        insert into public.contacts (
          id, name, email, phone, subject, message, data, created_at
        ) values (
          ${contact.id},
          ${contact.name},
          ${contact.email || null},
          ${contact.phone || null},
          ${contact.subject || null},
          ${contact.message},
          ${sql.json(contact as any)},
          ${contact.createdAt || new Date().toISOString()}
        )
        on conflict (id) do nothing
      `;
      return contact;
    } catch (err) {
      handlePgRuntimeError('addContact', err);
    }
  }

  await ensureFileLoaded();
  db.contacts.unshift(contact);
  await persistFile();
  return contact;
}

export async function addSubscriber(email: string): Promise<{ email: string; createdAt: string; alreadySubscribed: boolean }> {
  const normalized = email.trim().toLowerCase();
  const now = new Date().toISOString();

  if (await ensurePostgresReady() && sql) {
    try {
      const existing = await sql<{ email: string; created_at: string }[]>`
        select email, created_at from public.newsletter_subscribers where email = ${normalized} limit 1
      `;
      if (existing.length > 0) {
        return {
          email: existing[0].email,
          createdAt: existing[0].created_at,
          alreadySubscribed: true,
        };
      }
      await sql`
        insert into public.newsletter_subscribers (email, created_at)
        values (${normalized}, ${now})
        on conflict (email) do nothing
      `;
      return { email: normalized, createdAt: now, alreadySubscribed: false };
    } catch (err) {
      handlePgRuntimeError('addSubscriber', err);
    }
  }

  await ensureFileLoaded();
  const existing = db.newsletter.find((s) => s.email === normalized);
  if (existing) return { ...existing, alreadySubscribed: true };
  const entry = { email: normalized, createdAt: now };
  db.newsletter.unshift(entry);
  await persistFile();
  return { ...entry, alreadySubscribed: false };
}

export function sanitizeOrderForClient(order: StoredOrder): Record<string, unknown> {
  // Never expose guest access tokens or internal notes to the public tracking endpoint.
  const { guestAccessToken, ...safe } = order;
  return safe;
}
