// Connectivity check for the Supabase client in src/db.ts — proves the exact
// code path the server will use (dotenv + pooler URL + prepare:false).
//
// Usage: npx tsx scripts/db-check.ts

import sql from '../src/db';

const rows = await sql`
  select id, name, base_price_kobo, is_featured
  from public.products
  order by id
`;

console.log(`db.ts client -> DATABASE_URL OK, ${rows.length} product row(s):`);
for (const r of rows) {
  console.log(`  ${r.id}  ${r.name}  ${r.base_price_kobo} kobo  featured=${r.is_featured}`);
}

await sql.end();
