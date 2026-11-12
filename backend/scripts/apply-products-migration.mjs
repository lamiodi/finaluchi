// Applies backend/scripts/sql/001_create_products.sql + 002_create_store_tables.sql,
// then upserts all 14 live product records into Supabase `public.products`.
// Idempotent — safe to re-run anytime.
//
// Usage:
//   npm run db:sync --prefix backend
//   (or: node backend/scripts/apply-products-migration.mjs)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import postgres from 'postgres';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const sql001Path = path.join(__dirname, 'sql', '001_create_products.sql');
const sql002Path = path.join(__dirname, 'sql', '002_create_store_tables.sql');
const productsRoot = path.resolve(__dirname, '../../products');

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl || databaseUrl.includes('[YOUR-PASSWORD]')) {
  console.error('DATABASE_URL is missing or still has the password placeholder in backend/.env');
  process.exit(1);
}

const sql = postgres(databaseUrl, { prepare: false, connect_timeout: 10 });

// Collect all 14 product.json definitions from products/{rtw-capsule,recall-aw2425}/*
function loadAllProductRecords() {
  const collections = ['rtw-capsule', 'recall-aw2425'];
  const records = [];
  for (const col of collections) {
    const colDir = path.join(productsRoot, col);
    if (!fs.existsSync(colDir)) continue;
    for (const entry of fs.readdirSync(colDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const pj = path.join(colDir, entry.name, 'product.json');
      if (!fs.existsSync(pj)) continue;
      const raw = JSON.parse(fs.readFileSync(pj, 'utf-8'));
      records.push({
        id: raw.id || raw.proposedId,
        slug: raw.slug,
        name: raw.name,
        pillar: raw.category?.pillar || raw.pillar,
        categoryName: raw.category?.categoryName || raw.categoryName,
        basePriceKobo: raw.pricing?.basePriceKobo ?? raw.basePriceKobo,
        priceDisplay: raw.pricing?.priceDisplay ?? raw.priceDisplay,
        availability: raw.availability || 'AVAILABLE',
        isFeatured: Boolean(raw.isFeatured),
        collectionId: raw.collection?.id ?? raw.collectionId ?? null,
        occasions: raw.copy?.occasions || raw.occasions || [],
        headline: raw.copy?.headline ?? raw.headline ?? null,
        description: raw.copy?.description ?? raw.description ?? null,
        atelierNotes: raw.copy?.atelierNotes ?? raw.atelierNotes ?? null,
        editorialQuote: raw.copy?.editorialQuote ?? raw.editorialQuote ?? null,
        fullPayload: raw,
      });
    }
  }
  return records;
}

try {
  await sql.unsafe(fs.readFileSync(sql001Path, 'utf-8'));
  console.log('✓ 001_create_products.sql applied (products table + RLS)');

  await sql.unsafe(fs.readFileSync(sql002Path, 'utf-8'));
  console.log('✓ 002_create_store_tables.sql applied (orders, appointments, contacts, newsletter_subscribers + RLS)');

  const allProducts = loadAllProductRecords();

  for (const p of allProducts) {
    await sql`
      insert into public.products
        (id, slug, name, pillar, category_name, base_price_kobo, availability,
         is_featured, collection_id, occasions, headline, description,
         atelier_notes, editorial_quote, data)
      values
        (${p.id}, ${p.slug}, ${p.name}, ${p.pillar}, ${p.categoryName},
         ${p.basePriceKobo}, ${p.availability}, ${p.isFeatured}, ${p.collectionId},
         ${sql.json(p.occasions)}, ${p.headline}, ${p.description},
         ${p.atelierNotes}, ${p.editorialQuote}, ${sql.json(p.fullPayload)})
      on conflict (id) do update set
        slug = excluded.slug,
        name = excluded.name,
        pillar = excluded.pillar,
        category_name = excluded.category_name,
        base_price_kobo = excluded.base_price_kobo,
        availability = excluded.availability,
        is_featured = excluded.is_featured,
        collection_id = excluded.collection_id,
        occasions = excluded.occasions,
        headline = excluded.headline,
        description = excluded.description,
        atelier_notes = excluded.atelier_notes,
        editorial_quote = excluded.editorial_quote,
        data = excluded.data,
        updated_at = now()
    `;
    console.log(`✓ upserted ${p.id} — ${p.name} (${p.priceDisplay})`);
  }

  const rows = await sql`select id, name, base_price_kobo, is_featured, collection_id from public.products order by id`;
  console.log(`\n${rows.length} product row(s) in Supabase:`);
  for (const r of rows) {
    console.log(`  ${r.id}  ${r.name}  ${r.base_price_kobo} kobo  featured=${r.is_featured}  collection=${r.collection_id || 'core'}`);
  }
} catch (err) {
  if (String(err?.message || err).includes('ENOTFOUND') || String(err?.message || err).includes('not found')) {
    console.error('\n⚠ Supabase project appears to be paused due to inactivity.');
    console.error('  1. Open https://supabase.com/dashboard/project/pueovgrhdqjwqusyuppm');
    console.error('  2. Click "Restore project" (takes ~60 seconds)');
    console.error('  3. Re-run: npm run db:sync');
  } else {
    console.error('Migration failed:', err?.message || err);
  }
  process.exitCode = 1;
} finally {
  await sql.end();
}
