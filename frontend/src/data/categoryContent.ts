import { ProductCategory } from '../types';

export type DepartmentPillarGroup = 'READY_TO_WEAR';

export interface DepartmentCategory {
  id: ProductCategory;
  label: string;
  slug: string;
  index: string;
  tagline: string;
  description: string;
  fabricProvenance: string;
  anatomicalFit: string;
  conversionHighlight: string;
  startingPriceKobo: number;
  image: string;
  galleryImages: string[];
  pillarGroup: DepartmentPillarGroup;
  pillarLabel: string;
}

// The five photographed categories of the live ready-to-wear capsule.
export const CATEGORY_DEPARTMENTS: DepartmentCategory[] = [
  {
    id: 'DRESSES',
    label: 'Dresses',
    slug: 'dresses',
    index: '01',
    tagline: 'The Rossa, in House Leopard',
    description: 'The Rossa Dress — a plunging halter mini in the house leopard with an oversized shoulder rosette and an asymmetric ruffle hem. Cut across UK sizes 6–16 and photographed on both.',
    fabricProvenance: 'House leopard-print crepe',
    anatomicalFit: 'Sizes UK 6–16',
    conversionHighlight: 'Rosettes cut and mounted by hand',
    startingPriceKobo: 6600000, // ₦66,000
    image: '/images/products/rossa-dress/rossa-1.jpeg',
    galleryImages: [
      '/images/products/rossa-dress/rossa-1.jpeg',
      '/images/products/rossa-dress/rossa-2.jpeg',
      '/images/products/rossa-dress/rossa-3.jpeg',
    ],
    pillarGroup: 'READY_TO_WEAR',
    pillarLabel: 'Ready-to-Wear',
  },
  {
    id: 'JUMPSUITS',
    label: 'Jumpsuits',
    slug: 'jumpsuits',
    index: '02',
    tagline: 'The Cleo Capri',
    description: 'The Cleo Capri Jumpsuit — a plunging halter over a leopard bodice, sleek solid body, cropped capri leg and the wide house-print sash at the waist. Black, red and white, UK 6–14.',
    fabricProvenance: 'Printed stretch crepe with leopard sash',
    anatomicalFit: 'Sizes UK 6–14',
    conversionHighlight: 'One piece, zero effort',
    startingPriceKobo: 7500000, // ₦75,000
    image: '/images/products/cleo-capri-jumpsuit/cleo-1.jpeg',
    galleryImages: [
      '/images/products/cleo-capri-jumpsuit/cleo-1.jpeg',
      '/images/products/cleo-capri-jumpsuit/cleo-2.jpeg',
      '/images/products/cleo-capri-jumpsuit/cleo-3.jpeg',
    ],
    pillarGroup: 'READY_TO_WEAR',
    pillarLabel: 'Ready-to-Wear',
  },
  {
    id: 'TOPS',
    label: 'Tops',
    slug: 'tops',
    index: '03',
    tagline: 'The Dahlia Tank',
    description: 'The Dahlia Tank Top — a fine-rib crop tank with the signature leopard teardrop at the centre chest. Cream and caramel nude, sized S–L, made to pair with the Dahlia Skirt.',
    fabricProvenance: 'Fine-rib stretch knit, hand-applied appliqué',
    anatomicalFit: 'Sizes S–L',
    conversionHighlight: 'Half of the Dahlia set',
    startingPriceKobo: 3500000, // ₦35,000
    image: '/images/products/dahlia-tank-top/dahlia-4.jpeg',
    galleryImages: [
      '/images/products/dahlia-tank-top/dahlia-1.jpeg',
      '/images/products/dahlia-tank-top/dahlia-4.jpeg',
      '/images/products/dahlia-tank-top/dahlia-2.jpeg',
    ],
    pillarGroup: 'READY_TO_WEAR',
    pillarLabel: 'Ready-to-Wear',
  },
  {
    id: 'SKIRTS',
    label: 'Skirts',
    slug: 'skirts',
    index: '04',
    tagline: 'The Dahlia, in Full Bloom',
    description: 'The Dahlia Skirt — a high-rise mini blooming with hand-mounted 3D rosettes over structured crepe, in the deep house wine. Red, white and black, UK 6–18.',
    fabricProvenance: 'Structured crepe with 3D rosette appliqué',
    anatomicalFit: 'Sizes UK 6–18',
    conversionHighlight: 'The most handwork in the capsule',
    startingPriceKobo: 4600000, // ₦46,000
    image: '/images/products/dahlia-skirt/dahlia-1.jpeg',
    galleryImages: [
      '/images/products/dahlia-skirt/dahlia-1.jpeg',
      '/images/products/dahlia-skirt/dahlia-4.jpeg',
    ],
    pillarGroup: 'READY_TO_WEAR',
    pillarLabel: 'Ready-to-Wear',
  },
  {
    id: '2PIECES',
    label: '2 Pieces',
    slug: '2pieces',
    index: '05',
    tagline: 'The Leonie Lounge Set',
    description: 'The Leonie Capri Lounge 2 Piece — a cropped leopard tee edged in contrast red rib over high-waist capri leggings with red ribbon ankle ties. Soft stretch jersey, UK 10–16.',
    fabricProvenance: 'Leopard-print stretch jersey, grosgrain ribbon trims',
    anatomicalFit: 'Sizes UK 10–16',
    conversionHighlight: 'Lounge that refuses to look like loungewear',
    startingPriceKobo: 8000000, // ₦80,000
    image: '/images/products/leonie-capri-lounge-2-piece/leonie-3.jpeg',
    galleryImages: [
      '/images/products/leonie-capri-lounge-2-piece/leonie-3.jpeg',
      '/images/products/leonie-capri-lounge-2-piece/leonie-4.jpeg',
      '/images/products/leonie-capri-lounge-2-piece/leonie-2.jpeg',
    ],
    pillarGroup: 'READY_TO_WEAR',
    pillarLabel: 'Ready-to-Wear',
  },
];

export const getDepartmentById = (id: string): DepartmentCategory | undefined => {
  return CATEGORY_DEPARTMENTS.find((d) => d.id === id);
};

export const getDepartmentBySlug = (slug: string): DepartmentCategory | undefined => {
  return CATEGORY_DEPARTMENTS.find((d) => d.slug === slug);
};
