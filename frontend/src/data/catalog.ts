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

  // ————— THE RECALL COLLECTION · 2024/25 AUTUMN DROP —————
  // Photos pending: media folders are public/images/products/<slug>/ — drop
  // <product>-1.jpeg, -2.jpeg … into each and commit+push (Vercel serves
  // images from the repo, not a database). Until then every image reference
  // degrades to the house crest via onImageError.

  // 6. SLOANE DRESS — Dresses, ₦120,000, UK 6–12
  {
    id: 'prod-dress-03',
    name: 'Sloane Dress',
    slug: 'sloane-dress',
    pillar: 'DRESSES',
    categoryName: 'Dresses',
    headline: 'The Sloane — an easy day-to-evening dress with a fluid skirt.',
    description: 'The Sloane keeps the evening simple: a clean neckline, a quietly sculpted waist and a fluid skirt that carries from afternoon errands to dinner reservations. One of five pieces in the Recall Collection, made to be recalled season after season.',
    atelierNotes: 'Ready-to-wear piece produced in limited runs.',
    basePriceKobo: 12000000, // ₦120,000
    availability: 'AVAILABLE',
    occasions: ['PRIVATE_DINNER', 'COCKTAIL_SOIREE', 'WEDDING'],
    displayProportion: 'standard',
    isFeatured: true, // photos landed 2026-10-01
    isMadeToMeasureAllowed: false,
    has360Rotation: false,
    editorialQuote: 'Simple, but never plain — the one you reach for first.',
    fabricIntelligence: {
      material: 'To be confirmed', // TODO(product): confirm with atelier
      composition: 'To be confirmed', // TODO(product)
      weightGsm: 180, // TODO(product): confirm
      drapeDescription: 'Fluid, body-skimming drape',
      finish: 'To be confirmed', // TODO(product)
      careInstructions: 'Dry clean recommended. Cool iron on reverse.',
    },
    silhouette: { fit: 70, drape: 75, weight: 35, structure: 30, stretch: 15 },
    colorways: [
      {
        // TODO(product): placeholder colour — update when photos arrive.
        id: 'cw-dr3-ivory',
        colorId: 'cl-02',
        color: getColorByCode('CL-02'),
        sku: 'FC-DR-RC24-SLN-IVR',
        heroImageUrl: '/images/products/sloane-dress/sloane-1.jpeg',
        mediaGalleryUrls: [
          '/images/products/sloane-dress/sloane-1.jpeg',
          '/images/products/sloane-dress/sloane-2.jpeg',
          '/images/products/sloane-dress/sloane-3.jpeg',
        ],
        rotationFrameUrls: [],
        isDefault: true,
      },
    ],
    variants: [
      { id: 'v-dr3-6', size: '6', sizeLabel: '6', sku: 'FC-DR-RC24-SLN-6', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr3-8', size: '8', sizeLabel: '8', sku: 'FC-DR-RC24-SLN-8', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr3-10', size: '10', sizeLabel: '10', sku: 'FC-DR-RC24-SLN-10', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr3-12', size: '12', sizeLabel: '12', sku: 'FC-DR-RC24-SLN-12', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
    ],
    completeTheLookProductIds: ['prod-2pc-03', 'prod-dress-06'],
    collectionId: 'recall-aw2425',
  },

  // 7. BOSS SET — 2 Pieces, ₦220,000 (UK 6–12) / ₦250,000 (UK 14–18)
  {
    id: 'prod-2pc-03',
    name: 'Boss Set',
    slug: 'boss-set',
    pillar: '2PIECES',
    categoryName: '2pieces',
    headline: 'The Boss — a statement two-piece that runs boardroom to banquet.',
    description: 'The Boss Set answers to its name: a commanding two-piece worn as one look. UK 6–12 is ₦220,000; UK 14–18 is ₦250,000 — the larger cut carries the difference. Part of the Recall Collection\'s 2024/25 Autumn Drop.',
    atelierNotes: 'Ready-to-wear piece produced in limited runs.',
    basePriceKobo: 22000000, // ₦220,000 (UK 6–12); sizes 14–18 add ₦30,000 via variant delta
    availability: 'AVAILABLE',
    occasions: ['GALA_BLACK_TIE', 'RED_CARPET', 'PRIVATE_DINNER'],
    displayProportion: 'standard',
    isFeatured: true, // photos landed 2026-10-01
    isMadeToMeasureAllowed: false,
    has360Rotation: false,
    editorialQuote: 'Walk in like the meeting is already won.',
    fabricIntelligence: {
      material: 'To be confirmed', // TODO(product): confirm with atelier
      composition: 'To be confirmed', // TODO(product)
      weightGsm: 220, // TODO(product): confirm
      drapeDescription: 'Clean structured drape through both pieces',
      finish: 'To be confirmed', // TODO(product)
      careInstructions: 'Dry clean recommended. Cool iron on reverse.',
    },
    silhouette: { fit: 85, drape: 55, weight: 55, structure: 70, stretch: 10 },
    colorways: [
      {
        // TODO(product): placeholder colour — update when photos arrive.
        id: 'cw-2pc3-black',
        colorId: 'cl-01',
        color: getColorByCode('CL-01'),
        sku: 'FC-2P-RC24-BSS-BLK',
        heroImageUrl: '/images/products/boss-set/boss-1.jpeg',
        mediaGalleryUrls: [
          '/images/products/boss-set/boss-1.jpeg',
          '/images/products/boss-set/boss-2.jpeg',
          '/images/products/boss-set/boss-3.jpeg',
        ],
        rotationFrameUrls: [],
        isDefault: true,
      },
    ],
    variants: [
      { id: 'v-2pc3-6', size: '6', sizeLabel: '6', sku: 'FC-2P-RC24-BSS-6', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc3-8', size: '8', sizeLabel: '8', sku: 'FC-2P-RC24-BSS-8', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc3-10', size: '10', sizeLabel: '10', sku: 'FC-2P-RC24-BSS-10', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc3-12', size: '12', sizeLabel: '12', sku: 'FC-2P-RC24-BSS-12', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc3-14', size: '14', sizeLabel: '14', sku: 'FC-2P-RC24-BSS-14', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 3000000, isMadeToOrder: false }, // +₦30,000
      { id: 'v-2pc3-16', size: '16', sizeLabel: '16', sku: 'FC-2P-RC24-BSS-16', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 3000000, isMadeToOrder: false }, // +₦30,000
      { id: 'v-2pc3-18', size: '18', sizeLabel: '18', sku: 'FC-2P-RC24-BSS-18', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 3000000, isMadeToOrder: false }, // +₦30,000
    ],
    completeTheLookProductIds: ['prod-dress-03', 'prod-dress-04'],
    collectionId: 'recall-aw2425',
  },

  // 8. FANTASIA DRESS — Dresses, ₦145,000, UK 6–12
  {
    id: 'prod-dress-04',
    name: 'Fantasia Dress',
    slug: 'fantasia-dress',
    pillar: 'DRESSES',
    categoryName: 'Dresses',
    headline: 'The Fantasia — a party dress with movement in every seam.',
    description: 'Made for the hours after dark, the Fantasia moves the way the night should: fluid through the body, easy at the hem, unbothered by dance floors. The third of five pieces in the Recall Collection.',
    atelierNotes: 'Ready-to-wear piece produced in limited runs.',
    basePriceKobo: 14500000, // ₦145,000
    availability: 'AVAILABLE',
    occasions: ['COCKTAIL_SOIREE', 'WEDDING'],
    displayProportion: 'standard',
    isFeatured: true, // photos landed 2026-10-01
    isMadeToMeasureAllowed: false,
    has360Rotation: false,
    editorialQuote: 'Half dress, half evening — entirely Fantasia.',
    fabricIntelligence: {
      material: 'To be confirmed', // TODO(product): confirm with atelier
      composition: 'To be confirmed', // TODO(product)
      weightGsm: 180, // TODO(product): confirm
      drapeDescription: 'Fluid, body-skimming drape',
      finish: 'To be confirmed', // TODO(product)
      careInstructions: 'Dry clean recommended. Cool iron on reverse.',
    },
    silhouette: { fit: 75, drape: 75, weight: 35, structure: 30, stretch: 15 },
    colorways: [
      {
        // TODO(product): placeholder colour — update when photos arrive.
        id: 'cw-dr4-ivory',
        colorId: 'cl-02',
        color: getColorByCode('CL-02'),
        sku: 'FC-DR-RC24-FNT-IVR',
        heroImageUrl: '/images/products/fantasia-dress/fantasia-1.jpeg',
        mediaGalleryUrls: [
          '/images/products/fantasia-dress/fantasia-1.jpeg',
          '/images/products/fantasia-dress/fantasia-2.jpeg',
          '/images/products/fantasia-dress/fantasia-3.jpeg',
          '/images/products/fantasia-dress/fantasia-4.jpeg',
        ],
        rotationFrameUrls: [],
        isDefault: true,
      },
    ],
    variants: [
      { id: 'v-dr4-6', size: '6', sizeLabel: '6', sku: 'FC-DR-RC24-FNT-6', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr4-8', size: '8', sizeLabel: '8', sku: 'FC-DR-RC24-FNT-8', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr4-10', size: '10', sizeLabel: '10', sku: 'FC-DR-RC24-FNT-10', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr4-12', size: '12', sizeLabel: '12', sku: 'FC-DR-RC24-FNT-12', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
    ],
    completeTheLookProductIds: ['prod-dress-05', 'prod-dress-03'],
    collectionId: 'recall-aw2425',
  },

  // 9. ELIZABETH BRAZER DRESS — Dresses, ₦245,000, UK 6–12
  {
    id: 'prod-dress-05',
    name: 'Elizabeth Brazer Dress',
    slug: 'elizabeth-brazer-dress',
    pillar: 'DRESSES',
    categoryName: 'Dresses',
    headline: 'The Elizabeth — a sculpted bra-top dress with an elongated skirt.',
    description: 'The Elizabeth leads with its bodice: a brazer top cut close and confident, flowing into a long, unbroken skirt. The collection\'s most sculptural piece — ₦245,000 across UK 6–12.',
    atelierNotes: 'Ready-to-wear piece produced in limited runs.',
    basePriceKobo: 24500000, // ₦245,000
    availability: 'AVAILABLE',
    occasions: ['WEDDING', 'COCKTAIL_SOIREE', 'PRIVATE_DINNER'],
    displayProportion: 'standard',
    isFeatured: true, // photos landed 2026-10-01
    isMadeToMeasureAllowed: false,
    has360Rotation: false,
    editorialQuote: 'A bodice with opinions — the Elizabeth speaks first.',
    fabricIntelligence: {
      material: 'To be confirmed', // TODO(product): confirm with atelier
      composition: 'To be confirmed', // TODO(product)
      weightGsm: 220, // TODO(product): confirm
      drapeDescription: 'Sculpted hold through the bodice, fluid skirt',
      finish: 'To be confirmed', // TODO(product)
      careInstructions: 'Dry clean recommended. Cool iron on reverse.',
    },
    silhouette: { fit: 85, drape: 60, weight: 45, structure: 55, stretch: 10 },
    colorways: [
      {
        // TODO(product): placeholder colour — update when photos arrive.
        id: 'cw-dr5-ivory',
        colorId: 'cl-02',
        color: getColorByCode('CL-02'),
        sku: 'FC-DR-RC24-ELZ-IVR',
        heroImageUrl: '/images/products/elizabeth-brazer-dress/elizabeth-1.jpeg',
        mediaGalleryUrls: [
          '/images/products/elizabeth-brazer-dress/elizabeth-1.jpeg',
          '/images/products/elizabeth-brazer-dress/elizabeth-2.jpeg',
          '/images/products/elizabeth-brazer-dress/elizabeth-3.jpeg',
        ],
        rotationFrameUrls: [],
        isDefault: true,
      },
    ],
    variants: [
      { id: 'v-dr5-6', size: '6', sizeLabel: '6', sku: 'FC-DR-RC24-ELZ-6', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr5-8', size: '8', sizeLabel: '8', sku: 'FC-DR-RC24-ELZ-8', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr5-10', size: '10', sizeLabel: '10', sku: 'FC-DR-RC24-ELZ-10', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr5-12', size: '12', sizeLabel: '12', sku: 'FC-DR-RC24-ELZ-12', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
    ],
    completeTheLookProductIds: ['prod-dress-04', 'prod-dress-06'],
    collectionId: 'recall-aw2425',
  },

  // 10. TERESA DRESS — Dresses, ₦105,000, UK 6–12
  {
    id: 'prod-dress-06',
    name: 'Teresa Dress',
    slug: 'teresa-dress',
    pillar: 'DRESSES',
    categoryName: 'Dresses',
    headline: 'The Teresa — the collection\'s lightest dress, made for long evenings.',
    description: 'The Teresa closes the Recall Collection at ₦105,000: the lightest, easiest piece of the five, cut for long evenings and warm rooms. Simple enough to style up, easy enough to live in.',
    atelierNotes: 'Ready-to-wear piece produced in limited runs.',
    basePriceKobo: 10500000, // ₦105,000
    availability: 'AVAILABLE',
    occasions: ['COCKTAIL_SOIREE', 'VACATION'],
    displayProportion: 'standard',
    isFeatured: true, // photos landed 2026-10-01
    isMadeToMeasureAllowed: false,
    has360Rotation: false,
    editorialQuote: 'Light on the body, long on the evening.',
    fabricIntelligence: {
      material: 'To be confirmed', // TODO(product): confirm with atelier
      composition: 'To be confirmed', // TODO(product)
      weightGsm: 160, // TODO(product): confirm
      drapeDescription: 'Light, easy drape with gentle movement',
      finish: 'To be confirmed', // TODO(product)
      careInstructions: 'Dry clean recommended. Cool iron on reverse.',
    },
    silhouette: { fit: 70, drape: 80, weight: 25, structure: 25, stretch: 20 },
    colorways: [
      {
        // TODO(product): placeholder colour — update when photos arrive.
        id: 'cw-dr6-ivory',
        colorId: 'cl-02',
        color: getColorByCode('CL-02'),
        sku: 'FC-DR-RC24-TRS-IVR',
        heroImageUrl: '/images/products/teresa-dress/teresa-1.jpeg',
        mediaGalleryUrls: ['/images/products/teresa-dress/teresa-1.jpeg'],
        rotationFrameUrls: [],
        isDefault: true,
      },
    ],
    variants: [
      { id: 'v-dr6-6', size: '6', sizeLabel: '6', sku: 'FC-DR-RC24-TRS-6', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr6-8', size: '8', sizeLabel: '8', sku: 'FC-DR-RC24-TRS-8', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr6-10', size: '10', sizeLabel: '10', sku: 'FC-DR-RC24-TRS-10', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr6-12', size: '12', sizeLabel: '12', sku: 'FC-DR-RC24-TRS-12', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
    ],
    completeTheLookProductIds: ['prod-dress-03', 'prod-dress-05'],
    collectionId: 'recall-aw2425',
  },

  // 11. ESSENCE SET — 2-Piece Sets, ₦78,900, UK 6–16 (2026 RTW batch — upload-batch 2026-10-05)
  {
    id: 'prod-2pc-04',
    name: 'Essence Set',
    slug: 'essence-set',
    pillar: '2PIECES',
    categoryName: '2pieces',
    headline: 'Oversized collar top with a wave-embroidered hem, matched to easy shorts.',
    description: 'The Essence Set is ease, tailored. An oversized camp-collar top in a soft peach weave carries a single line of wave embroidery along the hem — the atelier\'s signature drawn in one continuous stroke — falling over matching shorts cut long enough for the street and light enough for the heat. Wear it as a set or split it; it answers to both.',
    atelierNotes: 'Ready-to-wear piece produced in limited runs. Wave embroidery is applied by hand-guided machine.',
    basePriceKobo: 7890000, // ₦78,900
    availability: 'AVAILABLE',
    occasions: ['VACATION', 'PRIVATE_DINNER'],
    displayProportion: 'standard',
    isFeatured: false,
    isMadeToMeasureAllowed: false,
    has360Rotation: false,
    editorialQuote: 'One line, drawn all the way to the hem.',
    fabricIntelligence: {
      material: 'Soft-breathable woven',
      composition: 'To be confirmed', // TODO(product): confirm with atelier
      weightGsm: 160, // TODO(product): confirm
      drapeDescription: 'Relaxed and airy; boxy through the top, easy through the short',
      finish: 'Tonal buttons and a single wave-embroidered hem line',
      careInstructions: 'Dry clean recommended. Cool iron on reverse.',
      macroZoomUrl: '/images/products/essence-set/essence-1.jpeg',
    },
    silhouette: { fit: 25, drape: 60, weight: 30, structure: 15, stretch: 5 },
    colorways: [
      {
        id: 'cw-2pc4-peach',
        colorId: 'cl-24',
        color: getColorByCode('CL-24'),
        sku: 'FC-2P-2026-ESS-PCH',
        heroImageUrl: '/images/products/essence-set/essence-1.jpeg',
        mediaGalleryUrls: ['/images/products/essence-set/essence-1.jpeg'],
        rotationFrameUrls: [],
        isDefault: true,
      },
      {
        // TODO(product): shot in peach only — reusing the hero until per-colour photos arrive.
        id: 'cw-2pc4-black',
        colorId: 'cl-01',
        color: getColorByCode('CL-01'),
        sku: 'FC-2P-2026-ESS-BLK',
        heroImageUrl: '/images/products/essence-set/essence-1.jpeg',
        mediaGalleryUrls: ['/images/products/essence-set/essence-1.jpeg'],
        rotationFrameUrls: [],
      },
      {
        // TODO(product): shot in peach only — reusing the hero until per-colour photos arrive.
        id: 'cw-2pc4-white',
        colorId: 'cl-02',
        color: getColorByCode('CL-02'),
        sku: 'FC-2P-2026-ESS-WHT',
        heroImageUrl: '/images/products/essence-set/essence-1.jpeg',
        mediaGalleryUrls: ['/images/products/essence-set/essence-1.jpeg'],
        rotationFrameUrls: [],
      },
      {
        // TODO(product): shot in peach only — reusing the hero until per-colour photos arrive.
        id: 'cw-2pc4-navy',
        colorId: 'cl-07',
        color: getColorByCode('CL-07'),
        sku: 'FC-2P-2026-ESS-NVY',
        heroImageUrl: '/images/products/essence-set/essence-1.jpeg',
        mediaGalleryUrls: ['/images/products/essence-set/essence-1.jpeg'],
        rotationFrameUrls: [],
      },
    ],
    variants: [
      { id: 'v-2pc4-6', size: '6', sizeLabel: '6', sku: 'FC-2P-2026-ESS-6', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc4-8', size: '8', sizeLabel: '8', sku: 'FC-2P-2026-ESS-8', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc4-10', size: '10', sizeLabel: '10', sku: 'FC-2P-2026-ESS-10', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc4-12', size: '12', sizeLabel: '12', sku: 'FC-2P-2026-ESS-12', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc4-14', size: '14', sizeLabel: '14', sku: 'FC-2P-2026-ESS-14', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc4-16', size: '16', sizeLabel: '16', sku: 'FC-2P-2026-ESS-16', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
    ],
    collectionId: 'rtw-2026',
  },

  // 12. DIZA SET — 2-Piece Sets, ₦125,000, UK 6–16 (2026 RTW batch — upload-batch 2026-10-05)
  {
    id: 'prod-2pc-05',
    name: 'Diza Set',
    slug: 'diza-set',
    pillar: '2PIECES',
    categoryName: '2pieces',
    headline: 'Embroidered button-front shirt and column maxi skirt — a two-piece that reads as one line.',
    description: 'The Diza Set pairs a relaxed button-front shirt with drop shoulders and a trail of floral embroidery across the chest, over a full-length column skirt that falls to a side slit. Cut in the house\'s powdery pink and warm cream, it moves from morning flights to evening tables without changing a thing.',
    atelierNotes: 'Ready-to-wear piece produced in limited runs. Floral embroidery is placed by hand on each shirt.',
    basePriceKobo: 12500000, // ₦125,000
    availability: 'AVAILABLE',
    occasions: ['VACATION', 'COCKTAIL_SOIREE', 'PRIVATE_DINNER'],
    displayProportion: 'tall',
    isFeatured: false,
    isMadeToMeasureAllowed: false,
    has360Rotation: false,
    editorialQuote: 'Petal-soft, sharp at the seam.',
    fabricIntelligence: {
      material: 'Lightweight woven with embroidered floral detail',
      composition: 'To be confirmed', // TODO(product): confirm with atelier
      weightGsm: 150, // TODO(product): confirm
      drapeDescription: 'Fluid column through the skirt; relaxed and airy through the shirt',
      finish: 'Matte weave with burgundy line-floral embroidery',
      careInstructions: 'Dry clean recommended. Cool iron on reverse.',
      macroZoomUrl: '/images/products/diza-set/diza-1.jpeg',
    },
    silhouette: { fit: 45, drape: 80, weight: 25, structure: 20, stretch: 5 },
    colorways: [
      {
        id: 'cw-2pc5-pink',
        colorId: 'cl-23',
        color: getColorByCode('CL-23'),
        sku: 'FC-2P-2026-DZA-PNK',
        heroImageUrl: '/images/products/diza-set/diza-1.jpeg',
        mediaGalleryUrls: ['/images/products/diza-set/diza-1.jpeg', '/images/products/diza-set/diza-2.jpeg'],
        rotationFrameUrls: [],
        isDefault: true,
      },
      {
        // TODO(product): shot in pink only — reusing the hero until per-colour photos arrive.
        id: 'cw-2pc5-cream',
        colorId: 'cl-04',
        color: getColorByCode('CL-04'),
        sku: 'FC-2P-2026-DZA-CRM',
        heroImageUrl: '/images/products/diza-set/diza-1.jpeg',
        mediaGalleryUrls: ['/images/products/diza-set/diza-1.jpeg', '/images/products/diza-set/diza-2.jpeg'],
        rotationFrameUrls: [],
      },
      {
        // TODO(product): shot in pink only — reusing the hero until per-colour photos arrive.
        id: 'cw-2pc5-black',
        colorId: 'cl-01',
        color: getColorByCode('CL-01'),
        sku: 'FC-2P-2026-DZA-BLK',
        heroImageUrl: '/images/products/diza-set/diza-1.jpeg',
        mediaGalleryUrls: ['/images/products/diza-set/diza-1.jpeg', '/images/products/diza-set/diza-2.jpeg'],
        rotationFrameUrls: [],
      },
    ],
    variants: [
      { id: 'v-2pc5-6', size: '6', sizeLabel: '6', sku: 'FC-2P-2026-DZA-6', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc5-8', size: '8', sizeLabel: '8', sku: 'FC-2P-2026-DZA-8', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc5-10', size: '10', sizeLabel: '10', sku: 'FC-2P-2026-DZA-10', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc5-12', size: '12', sizeLabel: '12', sku: 'FC-2P-2026-DZA-12', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc5-14', size: '14', sizeLabel: '14', sku: 'FC-2P-2026-DZA-14', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc5-16', size: '16', sizeLabel: '16', sku: 'FC-2P-2026-DZA-16', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
    ],
    collectionId: 'rtw-2026',
  },

  // 13. HASAM SET — 2-Piece Sets, ₦97,900, UK 6–12 (2026 RTW batch — upload-batch 2026-10-05)
  {
    id: 'prod-2pc-06',
    name: 'Hasam Set',
    slug: 'hasam-set',
    pillar: '2PIECES',
    categoryName: '2pieces',
    headline: 'Embroidered asymmetric top over wide-leg palazzo trousers.',
    description: 'The Hasam Set is quiet grandeur: a softly draped top with an asymmetric fall and fine floral embroidery tracing the neckline and hem, worn over wide-leg palazzo trousers that pool at the floor. Grounded in the house\'s terracotta and alabaster, it is made for weddings, long dinners and every room she intends to hold.',
    atelierNotes: 'Ready-to-wear piece produced in limited runs. Hem draping is finished by hand.',
    basePriceKobo: 9790000, // ₦97,900
    availability: 'AVAILABLE',
    occasions: ['WEDDING', 'PRIVATE_DINNER', 'COCKTAIL_SOIREE'],
    displayProportion: 'tall',
    isFeatured: false,
    isMadeToMeasureAllowed: false,
    has360Rotation: false,
    editorialQuote: 'Terracotta warmth, cathedral volume.',
    fabricIntelligence: {
      material: 'Softly draping woven with embroidered trim',
      composition: 'To be confirmed', // TODO(product): confirm with atelier
      weightGsm: 200, // TODO(product): confirm
      drapeDescription: 'Soft asymmetric fall through the top; clean, floor-pooling volume in the palazzo',
      finish: 'Fine floral embroidery tracing the neckline and hem',
      careInstructions: 'Dry clean recommended. Cool iron on reverse.',
      macroZoomUrl: '/images/products/hasam-set/hasam-1.jpeg',
    },
    silhouette: { fit: 55, drape: 75, weight: 35, structure: 30, stretch: 5 },
    colorways: [
      {
        id: 'cw-2pc6-clay',
        colorId: 'cl-10',
        color: getColorByCode('CL-10'),
        sku: 'FC-2P-2026-HSM-CLY',
        heroImageUrl: '/images/products/hasam-set/hasam-1.jpeg',
        mediaGalleryUrls: [
          '/images/products/hasam-set/hasam-1.jpeg',
          '/images/products/hasam-set/hasam-2.jpeg',
          '/images/products/hasam-set/hasam-3.jpeg',
          '/images/products/hasam-set/hasam-4.jpeg',
        ],
        rotationFrameUrls: [],
        isDefault: true,
      },
      {
        // TODO(product): shot in terracotta only — reusing the hero until per-colour photos arrive.
        id: 'cw-2pc6-white',
        colorId: 'cl-02',
        color: getColorByCode('CL-02'),
        sku: 'FC-2P-2026-HSM-WHT',
        heroImageUrl: '/images/products/hasam-set/hasam-1.jpeg',
        mediaGalleryUrls: ['/images/products/hasam-set/hasam-1.jpeg', '/images/products/hasam-set/hasam-2.jpeg'],
        rotationFrameUrls: [],
      },
      {
        // TODO(product): shot in terracotta only — reusing the hero until per-colour photos arrive.
        id: 'cw-2pc6-black',
        colorId: 'cl-01',
        color: getColorByCode('CL-01'),
        sku: 'FC-2P-2026-HSM-BLK',
        heroImageUrl: '/images/products/hasam-set/hasam-1.jpeg',
        mediaGalleryUrls: ['/images/products/hasam-set/hasam-1.jpeg', '/images/products/hasam-set/hasam-2.jpeg'],
        rotationFrameUrls: [],
      },
      {
        // TODO(product): shot in terracotta only — reusing the hero until per-colour photos arrive.
        id: 'cw-2pc6-navy',
        colorId: 'cl-07',
        color: getColorByCode('CL-07'),
        sku: 'FC-2P-2026-HSM-NVY',
        heroImageUrl: '/images/products/hasam-set/hasam-1.jpeg',
        mediaGalleryUrls: ['/images/products/hasam-set/hasam-1.jpeg', '/images/products/hasam-set/hasam-3.jpeg'],
        rotationFrameUrls: [],
      },
      {
        // TODO(product): shot in terracotta only — reusing the hero until per-colour photos arrive.
        // Brief wrote 'crusty brown' — recorded as Burnished Copper (CL-14); confirm the intended shade.
        id: 'cw-2pc6-rust',
        colorId: 'cl-14',
        color: getColorByCode('CL-14'),
        sku: 'FC-2P-2026-HSM-RST',
        heroImageUrl: '/images/products/hasam-set/hasam-1.jpeg',
        mediaGalleryUrls: ['/images/products/hasam-set/hasam-1.jpeg', '/images/products/hasam-set/hasam-4.jpeg'],
        rotationFrameUrls: [],
      },
    ],
    variants: [
      { id: 'v-2pc6-6', size: '6', sizeLabel: '6', sku: 'FC-2P-2026-HSM-6', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc6-8', size: '8', sizeLabel: '8', sku: 'FC-2P-2026-HSM-8', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc6-10', size: '10', sizeLabel: '10', sku: 'FC-2P-2026-HSM-10', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-2pc6-12', size: '12', sizeLabel: '12', sku: 'FC-2P-2026-HSM-12', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
    ],
    collectionId: 'rtw-2026',
  },

  // 14. AMBER DRESS — Dresses, ₦85,000, UK 6–12 (2026 RTW batch — upload-batch 2026-10-05)
  {
    id: 'prod-dress-07',
    name: 'Amber Dress',
    slug: 'amber-dress',
    pillar: 'DRESSES',
    categoryName: 'Dresses',
    headline: 'Satin halter mini with a plunging neckline, contrast banded waist and a voluminous bubble hem.',
    description: 'The Amber Dress is built on contrast: a plunging halter neckline in high-shine satin, a banded waist that cinches before it lets go, and a voluminous bubble-cut mini skirt that catches the light with every turn. Worn in the house\'s signature colour pairings, it is the after-dark answer to the Finaluchi capsule — photographed across the size range because it is made for every version of her.',
    atelierNotes: 'Ready-to-wear piece produced in limited runs. The bubble hem is cut and finished by hand.',
    basePriceKobo: 8500000, // ₦85,000
    availability: 'AVAILABLE',
    occasions: ['COCKTAIL_SOIREE', 'RED_CARPET', 'WEDDING'],
    displayProportion: 'standard',
    isFeatured: false,
    isMadeToMeasureAllowed: false,
    has360Rotation: false,
    editorialQuote: 'High shine, higher drama.',
    fabricIntelligence: {
      material: 'High-shine duchess satin',
      composition: 'To be confirmed', // TODO(product): confirm with atelier
      weightGsm: 220, // TODO(product): confirm
      drapeDescription: 'Liquid through the bodice; structured volume at the bubble hem',
      finish: 'High-sheen satin with contrast colour-blocked waist bands',
      careInstructions: 'Dry clean recommended. Cool iron on reverse.',
      macroZoomUrl: '/images/products/amber-dress/amber-2.jpeg',
    },
    silhouette: { fit: 70, drape: 55, weight: 55, structure: 45, stretch: 0 },
    colorways: [
      {
        id: 'cw-dr7-black',
        colorId: 'cl-01',
        color: getColorByCode('CL-01'),
        sku: 'FC-DR-2026-AMB-BLK',
        heroImageUrl: '/images/products/amber-dress/amber-1.jpeg',
        mediaGalleryUrls: ['/images/products/amber-dress/amber-1.jpeg', '/images/products/amber-dress/amber-2.jpeg'],
        rotationFrameUrls: [],
        isDefault: true,
      },
      {
        // TODO(product): shot in black only — reusing the hero until per-colour photos arrive.
        id: 'cw-dr7-cream',
        colorId: 'cl-04',
        color: getColorByCode('CL-04'),
        sku: 'FC-DR-2026-AMB-CRM',
        heroImageUrl: '/images/products/amber-dress/amber-1.jpeg',
        mediaGalleryUrls: ['/images/products/amber-dress/amber-1.jpeg', '/images/products/amber-dress/amber-2.jpeg'],
        rotationFrameUrls: [],
      },
    ],
    variants: [
      { id: 'v-dr7-6', size: '6', sizeLabel: '6', sku: 'FC-DR-2026-AMB-6', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr7-8', size: '8', sizeLabel: '8', sku: 'FC-DR-2026-AMB-8', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr7-10', size: '10', sizeLabel: '10', sku: 'FC-DR-2026-AMB-10', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
      { id: 'v-dr7-12', size: '12', sizeLabel: '12', sku: 'FC-DR-2026-AMB-12', inventoryCount: 8, stockQuantity: 8, reservedHoldCount: 0, priceDeltaKobo: 0, isMadeToOrder: false },
    ],
    collectionId: 'rtw-2026',
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return MASTER_PRODUCTS.find((p) => p.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return MASTER_PRODUCTS.find((p) => p.id === id);
};

export const MASTER_CATALOG = MASTER_PRODUCTS;
