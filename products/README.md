# Product Library

One folder for **all** FINALUCHI products — the pieces live on the site, the
pieces awaiting photos, and the newest briefs — organised into collection
subfolders. Everything here is the master reference for product info, photos
and videos, ready to transfer into a database when one is connected.

This folder is safe to commit: it is plain data and media, not wired into the build.

```
products/
  README.md                         ← you are here
  <collection-folder>/
    <product-slug>/
      product.json                  ← structured product info (DB-ready)
      images/                       ← staging photos (new products only)
      videos/                       ← staging videos (new products only)
```

## Collections

| Folder | Collection | Products |
|---|---|---|
| `rtw-capsule/` | RTW core line (no named collection on the site) | 9 |
| `recall-aw2425/` | The Recall Collection · 2024/25 Autumn Drop (`recall-aw2425`) | 5 |

Collection folder names match the `collectionId` used in the site's registry
(`frontend/src/data/collections.ts`) so the DB import can map them 1:1.

## Inventory — RTW core line (`rtw-capsule/`)

| Folder | Product | Price | Sizes | Colours | Status |
|---|---|---|---|---|---|
| `rossa-dress/` | Rossa Dress | ₦66,000 | 6–16 | house leopard | **LIVE**, photographed |
| `cleo-capri-jumpsuit/` | Cleo Capri Jumpsuit | ₦75,000 | 6–14 | black, red, white | **LIVE**; white not photographed |
| `dahlia-tank-top/` | Dahlia Tank Top | ₦35,000 | S–L | cream, caramel nude | **LIVE**, photographed |
| `dahlia-skirt/` | Dahlia Skirt | ₦46,000 | 6–18 | wine, white, black | **LIVE**; white/black not photographed |
| `leonie-capri-lounge-2-piece/` | Leonie Capri Lounge 2 Piece | ₦80,000 | 10–16 | house leopard | **LIVE**, photographed |
| `essence-set/` | Essence Set | ₦78,900 | 6–16 | peach, black, white, navy blue | **New brief** — photos staged in `images/` |
| `diza-set/` | Diza Set | ₦125,000 | 6–16 | pink, cream, black | **New brief** — photos staged in `images/` |
| `amber-dress/` | Amber Dress | ₦85,000 | 6–12 | black, cream | **New brief** — photos staged in `images/` |
| `hasam-set/` | Hasam Set | ₦97,900 | 6–12 | clay brown, white, black, navy blue, "crusty brown" | **New brief** — photos staged in `images/` |

## Inventory — The Recall Collection (`recall-aw2425/`)

| Folder | Product | Price | Sizes | Status |
|---|---|---|---|---|
| `sloane-dress/` | Sloane Dress | ₦120,000 | 6–12 | **LIVE**, photographed (3 views) |
| `boss-set/` | Boss Set | ₦220,000 · 14–18 +₦30,000 | 6–18 | **LIVE**, photographed (3 views) |
| `fantasia-dress/` | Fantasia Dress | ₦145,000 | 6–12 | **LIVE**, photographed (4 views) |
| `elizabeth-brazer-dress/` | Elizabeth Brazer Dress | ₦245,000 | 6–12 | **LIVE**, photographed (3 views) |
| `teresa-dress/` | Teresa Dress | ₦105,000 | 6–12 | **LIVE**, photographed (1 view) |

## Where the photos actually live

- **Site products (all 10 in the two tables above marked LIVE)**: photography is
  committed to the repo at `frontend/public/images/products/<slug>/` — that is
  what Vercel serves; the site cannot read images from this library. Each live
  product's `product.json` names its live media folder. **Do not duplicate
  those photos here** — one source of truth per asset.
- **New briefs (Essence, Diza, Amber, Hasam)**: drop photos into the product's
  own `images/` folder here: `<short>-1.jpeg`, `<short>-2.jpeg`, … (short names:
  `essence`, `diza`, `amber`, `hasam`). Videos: `<short>-<color>.mp4` or
  `<short>-360.mp4` in `videos/`. Never commit `.webp` variants — the build
  generates them.

## Conventions

- **Folder/slug**: kebab-case product name; must match `slug` in `product.json`.
- **IDs**: live products carry their real catalog `id`; new briefs carry a
  `proposedId` continuing the sequence (`prod-2pc-04/05/06`, `prod-dress-07`).
- **Prices**: naira + kobo in every file (`1 ₦ = 100 k`). Size-tier pricing uses
  `sizePriceDeltasKobo` (see Boss Set).
- **Colours**: every colour records its house palette code from
  `frontend/src/data/colors.ts` (CL-01…CL-22). Staged briefs mark matches as
  `SUGGESTED_MATCH` (confirm) or `NEW_CODE_NEEDED` (peach, pink — mint CL-23+).
- **Status**: `LIVE` = mirrored from the site catalog (source of truth is
  `frontend/src/data/catalog.ts` + `backend/src/catalog.ts`; these JSONs are
  the DB-transfer snapshot, re-mirror after editing the catalog). New briefs
  are `PENDING_PHOTOS` until promoted.

## When the database is connected

`product.json` mirrors the catalog entity shape (`Product` in
`frontend/src/types`, mirrored server-side in `backend/src/catalog.ts`):

- collection folder → `collections` row (from `MASTER_COLLECTIONS`)
- `product.json` → `products` row (+ collection link)
- `colors[]` → `colorways` rows
- `sizes.list` (+ deltas) → `variants` rows (default inventory 8, SKU from `skuPattern`)
- media folders → object storage (S3/Uploadthing/etc.), URLs back into the media fields

For the new briefs, fill the `null` copy/fabric fields in `product.json` first —
the DB import should never have to guess.

## Promoting a product to the live store (before the DB exists)

A product goes live by being added in **two places that must stay in sync**:

1. `frontend/src/data/catalog.ts` — display catalog
2. `backend/src/catalog.ts` — pricing/stock mirror (server recomputes totals from it)

Copy the images into `frontend/public/images/products/<slug>/`, then add the
`Product` entry in both files using the `proposedId`, SKUs, sizes and colours
from `product.json`. Mark `isFeatured: false` until the photography is approved.
