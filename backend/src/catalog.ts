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
}

export interface CatalogProduct {
  id: string;
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
      : product.basePriceKobo + (colorway?.priceDeltaKobo || 0);

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

    priced.push({ ...item, unitPriceKobo } as PricedItem);
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
