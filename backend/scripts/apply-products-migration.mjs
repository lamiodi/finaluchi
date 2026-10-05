// Applies backend/scripts/sql/001_create_products.sql, then upserts the four
// upload-batch product records into Supabase. Idempotent — safe to re-run.
//
// Usage: node scripts/apply-products-migration.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import postgres from 'postgres';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlPath = path.join(__dirname, 'sql', '001_create_products.sql');
const productsPath = path.resolve(__dirname, '../../products/upload-batch/products.json');

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl || databaseUrl.includes('[YOUR-PASSWORD]')) {
  console.error('DATABASE_URL is missing or still has the password placeholder in backend/.env');
  process.exit(1);
}

const sql = postgres(databaseUrl, { prepare: false });

const batch = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

await sql.unsafe(fs.readFileSync(sqlPath, 'utf-8'));
console.log('✓ schema applied (products table, slug index, RLS + public read policy)');

for (const p of batch.products) {
  await sql`
    insert into public.products
      (id, slug, name, pillar, category_name, base_price_kobo, availability,
       is_featured, collection_id, occasions, headline, description,
       atelier_notes, editorial_quote, data)
    values
      (${p.id}, ${p.slug}, ${p.name}, ${p.pillar}, ${p.categoryName},
       ${p.basePriceKobo}, ${p.availability}, ${p.isFeatured}, ${p.collectionId},
       ${sql.json(p.occasions)}, ${p.headline}, ${p.description},
       ${p.atelierNotes}, ${p.editorialQuote}, ${sql.json(p)})
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

const rows = await sql`select id, name, base_price_kobo, is_featured from public.products order by id`;
console.log(`\n${rows.length} product row(s) in Supabase:`);
for (const r of rows) console.log(`  ${r.id}  ${r.name}  ${r.base_price_kobo} kobo  featured=${r.is_featured}`);

await sql.end();
