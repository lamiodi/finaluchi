// Server-side mirror of the storefront catalog (frontend/src/data/catalog.ts).
// This copy is the AUTHORITY for order validation: unit prices, packaging,
// shipping, VAT and stock caps are recomputed here on every POST /api/orders,
// so a tampered client ledger can never reach the payment flow. Keep both
// files in sync whenever the catalog, prices or stock change.

export interface CatalogColorway {
  id: string;
  sku: string;
  priceDeltaKobo: number;
}

export interface CatalogVariant {
  id: string;
  size: string;
  sku: string;
  stockQuantity: number;
  priceDeltaKobo?: number; // size-tiered pricing, e.g. Boss Set UK 14–18 +₦30,000
}

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  basePriceKobo: number;
  colorways: CatalogColorway[];
  variants: CatalogVariant[];
}

export const PACKAGING_PRICE_KOBO: Record<string, number> = {
  SIGNATURE_BOX: 0,
  ECO_LUXURY_CARRIER: 1500000, // ₦15,000
};

const FREE_SHIPPING_THRESHOLD_KOBO = 30000000; // ₦300,000
const LOCAL_SHIPPING_KOBO = 1500000; // ₦15,000
const INTERNATIONAL_SHIPPING_KOBO = 8500000; // ₦85,000
const VAT_RATE_NG = 0.075;
const MAX_UNITS_PER_LINE = 10;

export const SERVER_CATALOG: CatalogProduct[] = [
  {
    id: 'prod-dress-02',
    slug: 'rossa-dress',
    name: 'Rossa Dress',
    basePriceKobo: 6600000,
    colorways: [{ id: 'cw-dr2-leopard', sku: 'FC-DR-2026-LEO', priceDeltaKobo: 0 }],
    variants: ['6', '8', '10', '12', '14', '16'].map((size) => ({
      id: `v-dr2-${size}`,
      size,
      sku: `FC-DR-2026-${size}`,
      stockQuantity: 8,
    })),
  },
  {
    id: 'prod-jump-02',
    slug: 'cleo-capri-jumpsuit',
    name: 'Cleo Capri Jumpsuit',
    basePriceKobo: 7500000,
    colorways: [
      { id: 'cw-jump2-black', sku: 'FC-JS-2026-BLK', priceDeltaKobo: 0 },
      { id: 'cw-jump2-red', sku: 'FC-JS-2026-RED', priceDeltaKobo: 0 },
      { id: 'cw-jump2-white', sku: 'FC-JS-2026-WHT', priceDeltaKobo: 0 },
    ],
    variants: ['6', '8', '10', '12', '14'].map((size) => ({
      id: `v-js2-${size}`,
      size,
      sku: `FC-JS-2026-${size}`,
      stockQuantity: 8,
    })),
  },
  {
    id: 'prod-top-02',
    slug: 'dahlia-tank-top',
    name: 'Dahlia Tank Top',
    basePriceKobo: 3500000,
    colorways: [
      { id: 'cw-top2-white', sku: 'FC-TP-2026-WHT', priceDeltaKobo: 0 },
      { id: 'cw-top2-nude', sku: 'FC-TP-2026-NDE', priceDeltaKobo: 0 },
    ],
    variants: ['S', 'M', 'L'].map((size) => ({
      id: `v-tp2-${size.toLowerCase()}`,
      size,
      sku: `FC-TP-2026-${size}`,
      stockQuantity: 8,
    })),
  },
  {
    id: 'prod-skirt-02',
    slug: 'dahlia-skirt',
    name: 'Dahlia Skirt',
    basePriceKobo: 4600000,
    colorways: [
      { id: 'cw-skirt2-red', sku: 'FC-SK-2026-RED', priceDeltaKobo: 0 },
      { id: 'cw-skirt2-white', sku: 'FC-SK-2026-WHT', priceDeltaKobo: 0 },
      { id: 'cw-skirt2-black', sku: 'FC-SK-2026-BLK', priceDeltaKobo: 0 },
    ],
    variants: ['6', '8', '10', '12', '14', '16', '18'].map((size) => ({
      id: `v-sk2-${size}`,
      size,
      sku: `FC-SK-2026-${size}`,
      stockQuantity: 8,
    })),
  },
  {
    id: 'prod-2pc-02',
    slug: 'leonie-capri-lounge-2-piece',
    name: 'Leonie Capri Lounge 2 Piece',
    basePriceKobo: 8000000,
    colorways: [{ id: 'cw-2pc2-leopard', sku: 'FC-2PC-2026-LEO', priceDeltaKobo: 0 }],
    variants: ['10', '12', '14', '16'].map((size) => ({
      id: `v-2pc2-${size}`,
      size,
      sku: `FC-2PC-2026-${size}`,
      stockQuantity: 8,
    })),
  },

  // ————— THE RECALL COLLECTION · 2024/25 AUTUMN DROP —————
  // Mirror of the frontend catalog entries (photos pending). Keep in sync
  // with frontend/src/data/catalog.ts.
  {
    id: 'prod-dress-03',
    slug: 'sloane-dress',
    name: 'Sloane Dress',
    basePriceKobo: 12000000,
    colorways: [{ id: 'cw-dr3-ivory', sku: 'FC-DR-RC24-SLN-IVR', priceDeltaKobo: 0 }],
    variants: ['6', '8', '10', '12'].map((size) => ({
      id: `v-dr3-${size}`,
      size,
      sku: `FC-DR-RC24-SLN-${size}`,
      stockQuantity: 8,
    })),
  },
  {
    id: 'prod-2pc-03',
    slug: 'boss-set',
    name: 'Boss Set',
    basePriceKobo: 22000000, // ₦220,000 (UK 6–12); 14–18 carry +₦30,000
    colorways: [{ id: 'cw-2pc3-black', sku: 'FC-2P-RC24-BSS-BLK', priceDeltaKobo: 0 }],
    variants: ['6', '8', '10', '12', '14', '16', '18'].map((size) => ({
      id: `v-2pc3-${size}`,
      size,
      sku: `FC-2P-RC24-BSS-${size}`,
      stockQuantity: 8,
      priceDeltaKobo: Number(size) >= 14 ? 3000000 : 0, // +₦30,000 for UK 14–18
    })),
  },
  {
    id: 'prod-dress-04',
    slug: 'fantasia-dress',
    name: 'Fantasia Dress',
    basePriceKobo: 14500000,
    colorways: [{ id: 'cw-dr4-ivory', sku: 'FC-DR-RC24-FNT-IVR', priceDeltaKobo: 0 }],
    variants: ['6', '8', '10', '12'].map((size) => ({
      id: `v-dr4-${size}`,
      size,
      sku: `FC-DR-RC24-FNT-${size}`,
      stockQuantity: 8,
    })),
  },
  {
    id: 'prod-dress-05',
    slug: 'elizabeth-brazer-dress',
    name: 'Elizabeth Brazer Dress',
    basePriceKobo: 24500000,
    colorways: [{ id: 'cw-dr5-ivory', sku: 'FC-DR-RC24-ELZ-IVR', priceDeltaKobo: 0 }],
    variants: ['6', '8', '10', '12'].map((size) => ({
      id: `v-dr5-${size}`,
      size,
      sku: `FC-DR-RC24-ELZ-${size}`,
      stockQuantity: 8,
    })),
  },
  {
    id: 'prod-dress-06',
    slug: 'teresa-dress',
    name: 'Teresa Dress',
    basePriceKobo: 10500000,
    colorways: [{ id: 'cw-dr6-ivory', sku: 'FC-DR-RC24-TRS-IVR', priceDeltaKobo: 0 }],
    variants: ['6', '8', '10', '12'].map((size) => ({
      id: `v-dr6-${size}`,
      size,
      sku: `FC-DR-RC24-TRS-${size}`,
      stockQuantity: 8,
    })),
  },
  // 2026 RTW batch (products/upload-batch, promoted 2026-10-05) — 8 units per
  // size, no size-tier pricing, colourways share the single photographed shot.
  {
    id: 'prod-2pc-04',
    slug: 'essence-set',
    name: 'Essence Set',
    basePriceKobo: 7890000,
    colorways: [
      { id: 'cw-2pc4-peach', sku: 'FC-2P-2026-ESS-PCH', priceDeltaKobo: 0 },
      { id: 'cw-2pc4-black', sku: 'FC-2P-2026-ESS-BLK', priceDeltaKobo: 0 },
      { id: 'cw-2pc4-white', sku: 'FC-2P-2026-ESS-WHT', priceDeltaKobo: 0 },
      { id: 'cw-2pc4-navy', sku: 'FC-2P-2026-ESS-NVY', priceDeltaKobo: 0 },
    ],
    variants: ['6', '8', '10', '12', '14', '16'].map((size) => ({
      id: `v-2pc4-${size}`,
      size,
      sku: `FC-2P-2026-ESS-${size}`,
      stockQuantity: 8,
    })),
  },
  {
    id: 'prod-2pc-05',
    slug: 'diza-set',
    name: 'Diza Set',
    basePriceKobo: 12500000,
    colorways: [
      { id: 'cw-2pc5-pink', sku: 'FC-2P-2026-DZA-PNK', priceDeltaKobo: 0 },
      { id: 'cw-2pc5-cream', sku: 'FC-2P-2026-DZA-CRM', priceDeltaKobo: 0 },
      { id: 'cw-2pc5-black', sku: 'FC-2P-2026-DZA-BLK', priceDeltaKobo: 0 },
    ],
    variants: ['6', '8', '10', '12', '14', '16'].map((size) => ({
      id: `v-2pc5-${size}`,
      size,
      sku: `FC-2P-2026-DZA-${size}`,
      stockQuantity: 8,
    })),
  },
  {
    id: 'prod-2pc-06',
    slug: 'hasam-set',
    name: 'Hasam Set',
    basePriceKobo: 9790000,
    colorways: [
      { id: 'cw-2pc6-clay', sku: 'FC-2P-2026-HSM-CLY', priceDeltaKobo: 0 },
      { id: 'cw-2pc6-white', sku: 'FC-2P-2026-HSM-WHT', priceDeltaKobo: 0 },
      { id: 'cw-2pc6-black', sku: 'FC-2P-2026-HSM-BLK', priceDeltaKobo: 0 },
      { id: 'cw-2pc6-navy', sku: 'FC-2P-2026-HSM-NVY', priceDeltaKobo: 0 },
      { id: 'cw-2pc6-rust', sku: 'FC-2P-2026-HSM-RST', priceDeltaKobo: 0 },
    ],
    variants: ['6', '8', '10', '12'].map((size) => ({
      id: `v-2pc6-${size}`,
      size,
      sku: `FC-2P-2026-HSM-${size}`,
      stockQuantity: 8,
    })),
  },
  {
    id: 'prod-dress-07',
    slug: 'amber-dress',
    name: 'Amber Dress',
    basePriceKobo: 8500000,
    colorways: [
      { id: 'cw-dr7-black', sku: 'FC-DR-2026-AMB-BLK', priceDeltaKobo: 0 },
      { id: 'cw-dr7-cream', sku: 'FC-DR-2026-AMB-CRM', priceDeltaKobo: 0 },
    ],
    variants: ['6', '8', '10', '12'].map((size) => ({
      id: `v-dr7-${size}`,
      size,
      sku: `FC-DR-2026-AMB-${size}`,
      stockQuantity: 8,
    })),
  },
];

export function findCatalogProduct(productId: string): CatalogProduct | undefined {
  return SERVER_CATALOG.find((p) => p.id === productId);
}

export type PricedItem = Record<string, unknown> & {
  productId: string;
  sizeSnapshot: string;
  skuSnapshot: string;
  unitPriceKobo: number;
  quantity: number;
  productSlugSnapshot: string;
  productImageSnapshot: string;
};

export type PriceItemsResult =
  | { ok: true; items: PricedItem[]; subtotalKobo: number }
  | { ok: false; error: string };

/**
 * Validates cart lines against the server catalog: existence, quantity limits,
 * per-variant stock caps and server-authoritative unit prices. Made-to-measure
 * lines keep their bespoke atelier price (custom garments are quoted per client)
 * but still respect the per-line unit cap.
 */
export function priceOrderItems(rawItems: unknown[]): PriceItemsResult {
  const requestedPerVariant = new Map<string, number>();
  const priced: PricedItem[] = [];
  let subtotalKobo = 0;

  for (const raw of rawItems) {
    const item = (raw || {}) as Record<string, unknown>;
    const productId = String(item.productId || '');
    const quantity = Number(item.quantity);
    const product = findCatalogProduct(productId);

    if (!product) return { ok: false, error: `Unknown product "${productId}".` };
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_UNITS_PER_LINE) {
      return { ok: false, error: `Invalid quantity for ${product.name}.` };
    }

    const sizeSnapshot = String(item.sizeSnapshot || '');
    const skuSnapshot = String(item.skuSnapshot || '');
    const colorwaySku = skuSnapshot.includes('-')
      ? skuSnapshot.slice(0, skuSnapshot.lastIndexOf('-'))
      : skuSnapshot;
    const colorway = product.colorways.find((c) => c.sku === colorwaySku);
    const isMadeToMeasure = sizeSnapshot.startsWith('Made to Measure');
    const variant = product.variants.find((v) => v.size === sizeSnapshot);

    if (!isMadeToMeasure && !variant) {
      return { ok: false, error: `Unknown size "${sizeSnapshot}" for ${product.name}.` };
    }

    const unitPriceKobo = isMadeToMeasure
      ? Math.max(0, Math.round(Number(item.unitPriceKobo) || 0))
      : product.basePriceKobo + (colorway?.priceDeltaKobo || 0) + (variant?.priceDeltaKobo || 0);

    if (variant) {
      const alreadyRequested = requestedPerVariant.get(variant.id) || 0;
      if (alreadyRequested + quantity > variant.stockQuantity) {
        return {
          ok: false,
          error: `Only ${variant.stockQuantity} units of ${product.name} (size ${variant.size}) are available per order.`,
        };
      }
      requestedPerVariant.set(variant.id, alreadyRequested + quantity);
    }

    // Media snapshots for receipts/emails: photo files follow the documented
    // `<first-segment>-N.jpeg` naming under public/images/products/<slug>/
    // (products/README.md), with -1 always present on photographed pieces.
    const imagePrefix = product.slug.split('-')[0];
    const productImageSnapshot = `/images/products/${product.slug}/${imagePrefix}-1.jpeg`;

    priced.push({
      ...item,
      unitPriceKobo,
      productSlugSnapshot: product.slug,
      productImageSnapshot,
    } as PricedItem);
    subtotalKobo += unitPriceKobo * quantity;
  }

  return { ok: true, items: priced, subtotalKobo };
}

export interface OrderTotals {
  packagingKobo: number;
  shippingKobo: number;
  taxKobo: number;
  totalKobo: number;
}

export function computeOrderTotals(subtotalKobo: number, packagingType: string, country: string): OrderTotals {
  const packagingKobo = PACKAGING_PRICE_KOBO[packagingType] ?? 0;
  const isNG = (country || 'NG').toUpperCase() === 'NG';
  const shippingKobo = isNG
    ? subtotalKobo >= FREE_SHIPPING_THRESHOLD_KOBO
      ? 0
      : LOCAL_SHIPPING_KOBO
    : INTERNATIONAL_SHIPPING_KOBO;
  const taxKobo = isNG ? Math.round(subtotalKobo * VAT_RATE_NG) : 0;
  return {
    packagingKobo,
    shippingKobo,
    taxKobo,
    totalKobo: subtotalKobo + packagingKobo + shippingKobo + taxKobo,
  };
}
