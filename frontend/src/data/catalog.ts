import { Product } from '../types';
import { getColorByCode } from './colors';

// FINALUCHI LIVE CATALOG — photographed pieces, images live in
// public/images/products/<slug>/ (shot files are committed with the catalog).

export const MASTER_PRODUCTS: Product[] = [
  // 1. ROSSA DRESS — Dresses, ₦66,000, UK 6–16
  {
    id: 'prod-dress-02',
    name: 'Rossa Dress',
    slug: 'rossa-dress',
    pillar: 'DRESSES',
    categoryName: 'Dresses',
    headline: 'Halter mini in the house leopard print — shoulder rosette, asymmetric ruffle hem.',
    description: 'A plunging halter neckline, an oversized rosette at the shoulder, and a cascading asymmetric ruffle hem that moves with every step. Cut in the Finaluchi house leopard on a cream ground, the Rossa is photographed across the size range because it is made for every version of her.',
    atelierNotes: 'Ready-to-wear piece produced in limited runs. Rosettes are cut and mounted by hand.',
    basePriceKobo: 6600000, // ₦66,000
    availability: 'AVAILABLE',
    occasions: ['COCKTAIL_SOIREE', 'WEDDING', 'PRIVATE_DINNER'],
    displayProportion: 'standard',
    isFeatured: true,
    isMadeToMeasureAllowed: false,
    has360Rotation: false,
    editorialQuote: 'One print, one rosette, one dress — endlessly worn.',
    fabricIntelligence: {
      material: 'House leopard-print crepe',
      composition: 'To be confirmed', // TODO(product)
      weightGsm: 180, // TODO(product): confirm
      drapeDescription: 'Fluid body-skimming drape with lift at the ruffle hem',
      finish: 'Matte print on a cream ground with black and mauve spots',
      careInstructions: 'Dry clean recommended. Cool iron on reverse.',
      macroZoomUrl: '/images/products/rossa-dress/rossa-3.jpeg',
    },
    silhouette: { fit: 75, drape: 75, weight: 30, structure: 40, stretch: 10 },
    colorways: [
      {
        id: 'cw-dr2-leopard',
        colorId: 'cl-20',
        color: getColorByCode('CL-20'),
        sku: 'FC-DR-2026-LEO',
        heroImageUrl: '/images/products/rossa-dress/rossa-1.jpeg',
        mediaGalleryUrls: [
          '/images/products/rossa-dress/rossa-1.jpeg',
          '/images/products/rossa-dress/rossa-2.jpeg',
          '/images/products/rossa-dress/rossa-4.jpeg',
          '/images/products/rossa-dress/rossa-3.jpeg',
        ],
        rotationFrameUrls: [],
        isDefault: true,
      },
    ],
    variants: [
      { id: 'v-dr2-6', size: '6', sizeLabel: '6', sku: 'FC-DR-2026-6', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr2-8', size: '8', sizeLabel: '8', sku: 'FC-DR-2026-8', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr2-10', size: '10', sizeLabel: '10', sku: 'FC-DR-2026-10', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr2-12', size: '12', sizeLabel: '12', sku: 'FC-DR-2026-12', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr2-14', size: '14', sizeLabel: '14', sku: 'FC-DR-2026-14', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr2-16', size: '16', sizeLabel: '16', sku: 'FC-DR-2026-16', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
    ],
    completeTheLookProductIds: ['prod-jump-02', 'prod-top-02'],
  },

  // 2. CLEO CAPRI JUMPSUIT — Jumpsuits, ₦75,000, UK 6–14
  {
    id: 'prod-jump-02',
    name: 'Cleo Capri Jumpsuit',
    slug: 'cleo-capri-jumpsuit',
    pillar: 'JUMPSUITS',
    categoryName: 'Jumpsuits',
    headline: 'Plunging halter jumpsuit — leopard bodice, solid capri leg, wide print sash.',
    description: 'The Cleo cuts a long line in one move: a plunging halter neckline over a leopard-print bodice, a sleek solid stretch body through the waist, and a cropped capri leg. The wide leopard sash cinches the waist and ties the print story together.',
    atelierNotes: 'Ready-to-wear piece produced in limited runs. Sash is cut from the same house print as the bodice.',
    basePriceKobo: 7500000, // ₦75,000
    availability: 'AVAILABLE',
    occasions: ['VACATION', 'COCKTAIL_SOIREE', 'PRIVATE_DINNER'],
    displayProportion: 'tall',
    isFeatured: true,
    isMadeToMeasureAllowed: false,
    has360Rotation: false,
    editorialQuote: 'One piece, zero effort — the whole look tied at the waist.',
    fabricIntelligence: {
      material: 'Printed stretch crepe with leopard sash',
      composition: 'To be confirmed', // TODO(product)
      weightGsm: 200, // TODO(product): confirm
      drapeDescription: 'Clean fitted drape through the body with ease at the capri leg',
      finish: 'Matte solid body with house leopard bodice and sash',
      careInstructions: 'Dry clean recommended. Cool iron on reverse.',
      macroZoomUrl: '/images/products/cleo-capri-jumpsuit/cleo-3.jpeg',
    },
    silhouette: { fit: 80, drape: 65, weight: 35, structure: 50, stretch: 15 },
    colorways: [
      {
        id: 'cw-jump2-black',
        colorId: 'cl-01',
        color: getColorByCode('CL-01'),
        sku: 'FC-JS-2026-BLK',
        heroImageUrl: '/images/products/cleo-capri-jumpsuit/cleo-3.jpeg',
        mediaGalleryUrls: ['/images/products/cleo-capri-jumpsuit/cleo-3.jpeg', '/images/products/cleo-capri-jumpsuit/cleo-2.jpeg'],
        rotationFrameUrls: [],
        isDefault: true,
      },
      {
        id: 'cw-jump2-red',
        colorId: 'cl-19',
        color: getColorByCode('CL-19'),
        sku: 'FC-JS-2026-RED',
        heroImageUrl: '/images/products/cleo-capri-jumpsuit/cleo-1.jpeg',
        mediaGalleryUrls: ['/images/products/cleo-capri-jumpsuit/cleo-1.jpeg', '/images/products/cleo-capri-jumpsuit/cleo-2.jpeg'],
        rotationFrameUrls: [],
      },
      {
        // TODO(product): white not yet photographed — using the duo shot until photos arrive.
        id: 'cw-jump2-white',
        colorId: 'cl-02',
        color: getColorByCode('CL-02'),
        sku: 'FC-JS-2026-WHT',
        heroImageUrl: '/images/products/cleo-capri-jumpsuit/cleo-1.jpeg',
        mediaGalleryUrls: ['/images/products/cleo-capri-jumpsuit/cleo-1.jpeg'],
        rotationFrameUrls: [],
      },
    ],
    variants: [
      { id: 'v-js2-6', size: '6', sizeLabel: '6', sku: 'FC-JS-2026-6', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-js2-8', size: '8', sizeLabel: '8', sku: 'FC-JS-2026-8', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-js2-10', size: '10', sizeLabel: '10', sku: 'FC-JS-2026-10', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-js2-12', size: '12', sizeLabel: '12', sku: 'FC-JS-2026-12', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-js2-14', size: '14', sizeLabel: '14', sku: 'FC-JS-2026-14', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
    ],
    completeTheLookProductIds: ['prod-top-02', 'prod-skirt-02'],
  },

  // 3. DAHLIA TANK TOP — Tops, ₦35,000, S–L
  {
    id: 'prod-top-02',
    name: 'Dahlia Tank Top',
    slug: 'dahlia-tank-top',
    pillar: 'TOPS',
    categoryName: 'Tops',
    headline: 'Ribbed crop tank with the leopard teardrop at the heart.',
    description: 'A fine-rib stretch tank, cropped at the waist with a clean neckline and wide straps. At the centre chest, the signature teardrop cutout lined in the house leopard. Made to pair with the Dahlia Skirt — worn here in cream and caramel on the same shoot.',
    atelierNotes: 'Ready-to-wear piece produced in limited runs. Leopard appliqué is fused and stitched by hand.',
    basePriceKobo: 3500000, // ₦35,000
    availability: 'AVAILABLE',
    occasions: ['VACATION', 'PRIVATE_DINNER'],
    displayProportion: 'standard',
    isFeatured: true,
    isMadeToMeasureAllowed: false,
    has360Rotation: false,
    editorialQuote: 'The quiet foundation — one leopard detail, cut with intention.',
    fabricIntelligence: {
      material: 'Fine-rib stretch knit with leopard appliqué',
      composition: 'To be confirmed', // TODO(product)
      weightGsm: 180, // TODO(product): confirm
      drapeDescription: 'Body-skimming stretch rib with quick recovery',
      finish: 'Matte rib surface, hand-applied print appliqué',
      careInstructions: 'Hand wash cold. Dry flat. Do not wring.',
      macroZoomUrl: '/images/products/dahlia-tank-top/dahlia-2.jpeg',
    },
    silhouette: { fit: 80, drape: 55, weight: 25, structure: 20, stretch: 30 },
    colorways: [
      {
        id: 'cw-top2-white',
        colorId: 'cl-02',
        color: getColorByCode('CL-02'),
        sku: 'FC-TP-2026-WHT',
        heroImageUrl: '/images/products/dahlia-tank-top/dahlia-1.jpeg',
        mediaGalleryUrls: ['/images/products/dahlia-tank-top/dahlia-1.jpeg', '/images/products/dahlia-tank-top/dahlia-3.jpeg'],
        rotationFrameUrls: [],
        isDefault: true,
      },
      {
        id: 'cw-top2-nude',
        colorId: 'cl-22',
        color: getColorByCode('CL-22'),
        sku: 'FC-TP-2026-NDE',
        heroImageUrl: '/images/products/dahlia-tank-top/dahlia-4.jpeg',
        mediaGalleryUrls: ['/images/products/dahlia-tank-top/dahlia-4.jpeg', '/images/products/dahlia-tank-top/dahlia-2.jpeg'],
        rotationFrameUrls: [],
      },
    ],
    variants: [
      { id: 'v-tp2-s', size: 'S', sizeLabel: 'S', sku: 'FC-TP-2026-S', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-tp2-m', size: 'M', sizeLabel: 'M', sku: 'FC-TP-2026-M', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-tp2-l', size: 'L', sizeLabel: 'L', sku: 'FC-TP-2026-L', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
    ],
    completeTheLookProductIds: ['prod-skirt-02', 'prod-dress-02'],
  },

  // 4. DAHLIA SKIRT — Skirts, ₦46,000, UK 6–18
  {
    id: 'prod-skirt-02',
    name: 'Dahlia Skirt',
    slug: 'dahlia-skirt',
    pillar: 'SKIRTS',
    categoryName: 'Skirts',
    headline: 'The Dahlia — a sculpted mini blooming with 3D rosettes.',
    description: 'A high-rise mini whose surface blooms: row upon row of hand-mounted 3D dahlia petals over a structured base, in the deep house wine. Pair it with the Dahlia Tank for the full look, or let it carry a simple knit on its own.',
    atelierNotes: 'Ready-to-wear piece produced in limited runs. Each rosette is individually mounted — the Dahlia is the most handwork in the capsule.',
    basePriceKobo: 4600000, // ₦46,000
    availability: 'AVAILABLE',
    occasions: ['COCKTAIL_SOIREE', 'WEDDING', 'PRIVATE_DINNER'],
    displayProportion: 'standard',
    isFeatured: true,
    isMadeToMeasureAllowed: false,
    has360Rotation: false,
    editorialQuote: 'Half of the Dahlia language — a skirt in full bloom.',
    fabricIntelligence: {
      material: 'Structured crepe with 3D rosette appliqué',
      composition: 'To be confirmed', // TODO(product)
      weightGsm: 280, // TODO(product): confirm
      drapeDescription: 'Sculptural hold — the petals carry the movement',
      finish: 'Matte wine ground with raised petal relief',
      careInstructions: 'Dry clean only. Store folded with tissue between petals.',
      macroZoomUrl: '/images/products/dahlia-skirt/dahlia-1.jpeg',
    },
    silhouette: { fit: 85, drape: 45, weight: 65, structure: 90, stretch: 5 },
    colorways: [
      {
        id: 'cw-skirt2-red',
        colorId: 'cl-21',
        color: getColorByCode('CL-21'),
        sku: 'FC-SK-2026-RED',
        heroImageUrl: '/images/products/dahlia-skirt/dahlia-1.jpeg',
        mediaGalleryUrls: ['/images/products/dahlia-skirt/dahlia-1.jpeg', '/images/products/dahlia-skirt/dahlia-4.jpeg'],
        rotationFrameUrls: [],
        isDefault: true,
      },
      {
        // TODO(product): white not yet photographed — using the wine shots until photos arrive.
        id: 'cw-skirt2-white',
        colorId: 'cl-02',
        color: getColorByCode('CL-02'),
        sku: 'FC-SK-2026-WHT',
        heroImageUrl: '/images/products/dahlia-skirt/dahlia-1.jpeg',
        mediaGalleryUrls: ['/images/products/dahlia-skirt/dahlia-1.jpeg'],
        rotationFrameUrls: [],
      },
      {
        // TODO(product): black not yet photographed — using the wine shots until photos arrive.
        id: 'cw-skirt2-black',
        colorId: 'cl-01',
        color: getColorByCode('CL-01'),
        sku: 'FC-SK-2026-BLK',
        heroImageUrl: '/images/products/dahlia-skirt/dahlia-1.jpeg',
        mediaGalleryUrls: ['/images/products/dahlia-skirt/dahlia-1.jpeg'],
        rotationFrameUrls: [],
      },
    ],
    variants: [
      { id: 'v-sk2-6', size: '6', sizeLabel: '6', sku: 'FC-SK-2026-6', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-sk2-8', size: '8', sizeLabel: '8', sku: 'FC-SK-2026-8', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-sk2-10', size: '10', sizeLabel: '10', sku: 'FC-SK-2026-10', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-sk2-12', size: '12', sizeLabel: '12', sku: 'FC-SK-2026-12', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-sk2-14', size: '14', sizeLabel: '14', sku: 'FC-SK-2026-14', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-sk2-16', size: '16', sizeLabel: '16', sku: 'FC-SK-2026-16', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-sk2-18', size: '18', sizeLabel: '18', sku: 'FC-SK-2026-18', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
    ],
    completeTheLookProductIds: ['prod-top-02', 'prod-jump-02'],
  },

  // 5. LEONIE CAPRI LOUNGE 2 PIECE — 2 Pieces, ₦80,000, UK 10–16
  {
    id: 'prod-2pc-02',
    name: 'Leonie Capri Lounge 2 Piece',
    slug: 'leonie-capri-lounge-2-piece',
    pillar: '2PIECES',
    categoryName: '2pieces',
    headline: 'Leopard lounge set with red ribbon ties — rest, refined.',
    description: 'The Leonie refuses to look like loungewear: a cropped leopard tee edged in contrast red rib at the neck and cuffs, over high-waist capri leggings finished with red ribbon ties at the ankle. Soft stretch jersey for slow mornings and sunset terraces.',
    atelierNotes: 'Ready-to-wear piece produced in limited runs. Ankle ties are hand-threaded grosgrain ribbon.',
    basePriceKobo: 8000000, // ₦80,000
    availability: 'AVAILABLE',
    occasions: ['VACATION'],
    displayProportion: 'standard',
    isFeatured: true,
    isMadeToMeasureAllowed: false,
    has360Rotation: false,
    editorialQuote: 'Leopard at rest — the house print, softened.',
    fabricIntelligence: {
      material: 'Leopard-print stretch jersey with red ribbon trims',
      composition: 'To be confirmed', // TODO(product)
      weightGsm: 220, // TODO(product): confirm
      drapeDescription: 'Soft stretch drape with a gently gathered tee hem',
      finish: 'Matte print with contrast red rib trims and grosgrain ankle ties',
      careInstructions: 'Machine wash cold. Dry flat. Do not tumble dry.',
      macroZoomUrl: '/images/products/leonie-capri-lounge-2-piece/leonie-2.jpeg',
    },
    silhouette: { fit: 70, drape: 70, weight: 30, structure: 25, stretch: 30 },
    colorways: [
      {
        id: 'cw-2pc2-leopard',
        colorId: 'cl-20',
        color: getColorByCode('CL-20'),
        sku: 'FC-2PC-2026-LEO',
        heroImageUrl: '/images/products/leonie-capri-lounge-2-piece/leonie-3.jpeg',
        mediaGalleryUrls: [
          '/images/products/leonie-capri-lounge-2-piece/leonie-3.jpeg',
          '/images/products/leonie-capri-lounge-2-piece/leonie-1.jpeg',
          '/images/products/leonie-capri-lounge-2-piece/leonie-4.jpeg',
          '/images/products/leonie-capri-lounge-2-piece/leonie-2.jpeg',
        ],
        rotationFrameUrls: [],
        isDefault: true,
      },
    ],
    variants: [
      { id: 'v-2pc2-10', size: '10', sizeLabel: '10', sku: 'FC-2PC-2026-10', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc2-12', size: '12', sizeLabel: '12', sku: 'FC-2PC-2026-12', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc2-14', size: '14', sizeLabel: '14', sku: 'FC-2PC-2026-14', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc2-16', size: '16', sizeLabel: '16', sku: 'FC-2PC-2026-16', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
    ],
    completeTheLookProductIds: ['prod-top-02', 'prod-skirt-02'],
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return MASTER_PRODUCTS.find((p) => p.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return MASTER_PRODUCTS.find((p) => p.id === id);
};

export const MASTER_CATALOG = MASTER_PRODUCTS;
