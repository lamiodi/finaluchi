# Upload Batch — 2026-10-05 — COMPLETED

The four staged RTW products, consolidated into one folder and made upload-ready:
**Essence Set · Diza Set · Hasam Set · Amber Dress** (ordered by proposed id).

**Status: PROMOTED 2026-10-05.** All four products are live in
`frontend/src/data/catalog.ts` (entries 11–14) and mirrored in
`backend/src/catalog.ts`. CL-23 Lagos Rose and CL-24 Harmattan Peach were added
to `frontend/src/data/colors.ts`. The nine photos were uploaded to Cloudinary
(see `cloudinary-mapping.csv` for the delivery URLs) via
`backend/scripts/upload-to-cloudinary.mjs` and are committed as repo statics
under `frontend/public/images/products/<slug>/` — the live-serving path, per
the house convention. The duplicate `images/` copy in this folder was removed;
the originals remain in `products/rtw-capsule/<slug>/images/`.

Source briefs in `products/rtw-capsule/<slug>/product.json` are untouched — this
folder is a prepared copy. All nine photos are committed to git.

```
upload-batch/
├── README.md                 ← you are here
├── products.json             ← 4 complete, catalog-shaped product records (DB payload)
└── cloudinary-mapping.csv    ← one row per image; cloudinary_url column now filled
```

## What was completed during preparation

- **Product copy written** (headline / description / atelier notes / editorial quote /
  occasions) for all four, in the live-catalog voice, grounded in the actual garments
  in the staged photos.
- **Colour codes resolved.** Suggested matches from the briefs were adopted:
  Black→CL-01, White→CL-02, Cream→CL-04, Navy→CL-07, Clay Brown→CL-10,
  Rusty/Burnished Brown→CL-14. Two colours were not in the house palette and were
  minted for this batch: **CL-23 Lagos Rose** (Diza's pink) and **CL-24 Harmattan Peach**
  (Essence's peach). Added to `frontend/src/data/colors.ts` in the promotion pass.
  Note: the catalog's `MasterColor.colorFamily` union only admits the four house
  families, so both minted colours are filed under `SAVANNA_SOLSTICE` rather than
  the `PINKS_BLOSSOM`/`PEACHES_EARTHWARM` values proposed here.
- **SKUs follow the patterns the briefs define**: colourway `FC-2P-2026-ESS-PCH`-style,
  variant `FC-DR-2026-AMB-6`-style — no collisions with live SKUs.
- **Collection left null** — the five live RTW pieces carry no `collectionId` either;
  these four match that convention.
- Inventory: 8 per size, all sizes `priceDeltaKobo: 0` (no tier pricing, per briefs).

## Upload step 1 — Cloudinary (images) — DONE

1. Uploaded via `backend/scripts/upload-to-cloudinary.mjs` (signed upload using
   `CLOUDINARY_URL` from `backend/.env`).
2. Public ids follow the suggested convention (`finaluchi/products/<slug>/<file>`),
   mirroring the live site paths (`/images/products/<slug>/<file>`), so swapping
   the base URL later is a find-and-replace.
3. Delivery URLs recorded in the `cloudinary_url` column of the CSV; all nine
   verified `200 image/jpeg` after upload.
4. `.webp` variants were not uploaded — the frontend build generates them.

## Upload step 2 — Supabase (products) — DONE (2026-10-05)

1. ~~Fill in the real DB password in `backend/.env`~~ — done (DATABASE_URL live).
2. ~~Create the `products` table~~ — done via `backend/scripts/sql/001_create_products.sql`
   (applied by `backend/scripts/apply-products-migration.mjs` through the
   transaction pooler `aws-1-eu-central-1.pooler.supabase.com:6543`).
3. ~~Insert the rows from `products.json`~~ — done; all four upserted and
   verified with a SELECT (idempotent runner, safe to re-run).

## Still open (needs the studio, not blocking DB upload)

- Fabric composition / weight / care per product (material is observational, from photos).
  Unconfirmed specs are hidden on the PDP/search by `isPlaceholderSpec` until confirmed.
- Confirm adopted colour shades against the actual garments; confirm CL-23/CL-24 names.
- Essence Set has only one photo — the live convention is 2–4 per product; add shots
  before it goes on the homepage reel (`isFeatured` stays false until then).
