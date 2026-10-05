-- 001_create_products.sql — catalog rows in Supabase (upload-batch step 2).
-- Scalar columns carry what the API queries; `data` holds the full record from
-- products/upload-batch/products.json (colorways, variants, fabric, silhouette)
-- so the shape can evolve without child-table churn, mirroring the jsonb
-- payload approach the runbook prescribes for orders.

create table if not exists public.products (
  id              text primary key,
  slug            text not null,
  name            text not null,
  pillar          text not null,
  category_name   text not null,
  base_price_kobo bigint not null,
  availability    text not null default 'AVAILABLE',
  is_featured     boolean not null default false,
  collection_id   text,
  occasions       jsonb not null default '[]'::jsonb,
  headline        text,
  description     text,
  atelier_notes   text,
  editorial_quote text,
  data            jsonb not null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create unique index if not exists products_slug_key on public.products (slug);

-- Products are public catalog content: readable via the Data API, writable
-- only by the server role (postgres) — never through anon/authenticated.
alter table public.products enable row level security;

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
  on public.products
  for select
  to anon, authenticated
  using (true);
