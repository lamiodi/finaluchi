# Upload Batch — 2026-10-05

The four staged RTW products, consolidated into one folder and made upload-ready:
**Essence Set · Diza Set · Hasam Set · Amber Dress** (ordered by proposed id).

Source briefs in `products/rtw-capsule/<slug>/product.json` are untouched — this
folder is a prepared copy. All nine photos are committed to git.

```
upload-batch/
├── README.md                 ← you are here
├── products.json             ← 4 complete, catalog-shaped product records (DB payload)
├── cloudinary-mapping.csv    ← one row per image; fill the cloudinary_url column after upload
└── images/                   ← all 9 photos, flat, slug-prefixed filenames
```

## What was completed during preparation

- **Product copy written** (headline / description / atelier notes / editorial quote /
  occasions) for all four, in the live-catalog voice, grounded in the actual garments
  in the staged photos.
- **Colour codes resolved.** Suggested matches from the briefs were adopted:
  Black→CL-01, White→CL-02, Cream→CL-04, Navy→CL-07, Clay Brown→CL-10,
  Rusty/Burnished Brown→CL-14. Two colours were not in the house palette and were
  minted for this batch: **CL-23 Lagos Rose** (Diza's pink) and **CL-24 Harmattan Peach**
  (Essence's peach). They must be added to `frontend/src/data/colors.ts` in the same
  pass that promotes these products.
- **SKUs follow the patterns the briefs define**: colourway `FC-2P-2026-ESS-PCH`-style,
  variant `FC-DR-2026-AMB-6`-style — no collisions with live SKUs.
- **Collection left null** — the five live RTW pieces carry no `collectionId` either;
  these four match that convention.
- Inventory: 8 per size, all sizes `priceDeltaKobo: 0` (no tier pricing, per briefs).

## Upload step 1 — Cloudinary (images)

1. Upload everything in `images/` to Cloudinary (drag the folder's contents in one go).
2. Keep the suggested public ids from `cloudinary-mapping.csv`
   (`finaluchi/products/<slug>/<file>`). They deliberately mirror the live site paths
   (`/images/products/<slug>/<file>`), so swapping the base URL later is a
   find-and-replace.
3. After upload, paste each delivery URL into the `cloudinary_url` column of the CSV.
4. Do not upload or commit `.webp` variants — the frontend build generates them.

## Upload step 2 — Supabase (products)

1. Fill in the real DB password in `backend/.env` (`DATABASE_URL`, placeholder
   `[YOUR-PASSWORD]` — percent-encode special characters). `backend/src/db.ts`
   already loads it.
2. Create the `products` table (no schema exists yet in the Supabase project —
   `docs/LAUNCH_RUNBOOK.md` §3 covers the migration).
3. Insert the rows from `products.json` (one row per product; variants/colourways can
   be JSONB columns or child tables — the record shape matches the live
   `frontend/src/data/catalog.ts` `Product` type either way).

## Still open (needs the studio, not blocking DB upload)

- Fabric composition / weight / care per product (material is observational, from photos).
- Confirm adopted colour shades against the actual garments; confirm CL-23/CL-24 names.
- Essence Set has only one photo — the live convention is 2–4 per product; add shots
  before it goes on the homepage reel.
