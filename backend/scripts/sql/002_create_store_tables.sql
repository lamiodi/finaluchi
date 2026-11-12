-- 002_create_store_tables.sql — durable atelier persistence in Supabase Postgres.
-- Mirrors the interfaces in backend/src/storage.ts:
--   - public.orders                 (keyed by uppercase order_number)
--   - public.appointments           (keyed by id)
--   - public.contacts               (keyed by id)
--   - public.newsletter_subscribers (keyed by lowercase email)
--
-- Scalar columns support fast lookup, filtering and indexing; `data` (jsonb)
-- stores the full TypeScript object so evolving fields survive without schema churn.

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
);

create index if not exists orders_customer_email_idx on public.orders (lower(customer_email));
create index if not exists orders_created_at_idx on public.orders (created_at desc);

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
);

create index if not exists appointments_created_at_idx on public.appointments (created_at desc);

create table if not exists public.contacts (
  id          text primary key,
  name        text not null,
  email       text,
  phone       text,
  subject     text,
  message     text not null,
  data        jsonb not null,
  created_at  timestamptz not null default now()
);

create index if not exists contacts_created_at_idx on public.contacts (created_at desc);

create table if not exists public.newsletter_subscribers (
  email       text primary key,
  created_at  timestamptz not null default now()
);

-- Enable RLS on all customer-facing tables: no anon/authenticated policies are
-- granted, so only the backend server role (postgres) can read or write PII.
alter table public.orders enable row level security;
alter table public.appointments enable row level security;
alter table public.contacts enable row level security;
alter table public.newsletter_subscribers enable row level security;
