import { ProductCategory } from '../types';

export type DepartmentPillarGroup = 'TAILORING' | 'SILKS' | 'SPECIALTY';

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
  pillarGroup: DepartmentPillarGroup;
  pillarLabel: string;
}

export const CATEGORY_DEPARTMENTS: DepartmentCategory[] = [
  // --- PILLAR 1: TAILORING & SUITES ---
  {
    id: 'PANTS',
    label: 'Pants & Palazzo',
    slug: 'pants',
    index: '01',
    tagline: 'High Waists & Fluid Volume',
    description: 'Explore tailored pants and palazzo silhouettes designed to create a long, confident line. Choose from polished separates and coordinated occasion looks.',
    fabricProvenance: 'Fabric and colour vary by design',
    anatomicalFit: 'Waist, rise and length confirmed before production',
    conversionHighlight: 'Ideal for events, workwear and coordinated sets',
    startingPriceKobo: 22000000, // ₦220,000
    image: '/images/fc_luxury_pants.jpg',
    pillarGroup: 'TAILORING',
    pillarLabel: 'Tailoring & Suites',
  },
  {
    id: 'SHIRTS',
    label: 'Shirts',
    slug: 'shirts',
    index: '02',
    tagline: 'Polished Structure & Statement Detail',
    description: 'Crisp shirts and elevated blouses that work as confident separates or as part of a complete Finaluchi look.',
    fabricProvenance: 'Fabric and finishing vary by design',
    anatomicalFit: 'Shoulder, sleeve and body fit confirmed per order',
    conversionHighlight: 'Easy to pair with skirts, pants and tailored sets',
    startingPriceKobo: 14500000, // ₦145,000
    image: '/images/fc_luxury_shirt.jpg',
    pillarGroup: 'TAILORING',
    pillarLabel: 'Tailoring & Suites',
  },
  {
    id: 'JACKETS',
    label: 'Jackets & Blazers',
    slug: 'jackets',
    index: '03',
    tagline: 'Defined Shoulders & Feminine Tailoring',
    description: 'Statement jackets and blazers shaped with clean shoulders, defined waists and event-ready detail.',
    fabricProvenance: 'Fabric, lining and buttons vary by design',
    anatomicalFit: 'Shoulder and waist fit reviewed for the chosen style',
    conversionHighlight: 'A strong finishing layer for work and occasion looks',
    startingPriceKobo: 29000000, // ₦290,000
    image: '/images/fc_tailoring_suite.jpg',
    pillarGroup: 'TAILORING',
    pillarLabel: 'Tailoring & Suites',
  },
  {
    id: '2PIECES',
    label: '2-Piece Sets',
    slug: '2pieces',
    index: '04',
    tagline: 'Coordinated Looks, More Ways to Wear',
    description: 'Matching tops, skirts and trousers designed to look complete together and work as versatile separates.',
    fabricProvenance: 'Coordinated fabric and colour options by design',
    anatomicalFit: 'Top and bottom sizing confirmed separately',
    conversionHighlight: 'A complete outfit with flexible repeat styling',
    startingPriceKobo: 31000000, // ₦310,000
    image: '/images/fc_bustier_pleated_skirt.jpg',
    pillarGroup: 'TAILORING',
    pillarLabel: 'Tailoring & Suites',
  },
  {
    id: '3PIECES',
    label: '3-Piece Sets',
    slug: '3pieces',
    index: '05',
    tagline: 'Complete Tailoring for a Strong Entrance',
    description: 'Three-piece combinations that bring jackets, structured tops or waistcoats and matching bottoms into one polished look.',
    fabricProvenance: 'Coordinated fabric and finishing by design',
    anatomicalFit: 'Each layer is measured and fitted as a complete look',
    conversionHighlight: 'Designed for events, work and statement dressing',
    startingPriceKobo: 45000000, // ₦450,000
    image: '/images/fc_luxury_threepiece.jpg',
    pillarGroup: 'TAILORING',
    pillarLabel: 'Tailoring & Suites',
  },

  // --- PILLAR 2: SILKS & EVENING GOWNS ---
  {
    id: 'DRESSES',
    label: 'Dresses',
    slug: 'dresses',
    index: '06',
    tagline: 'Fluid Lines & Occasion-Ready Shape',
    description: 'From sleek columns to asymmetric and draped silhouettes, these dresses are designed for dinners, celebrations and elevated everyday moments.',
    fabricProvenance: 'Fabric and finish are listed on each piece',
    anatomicalFit: 'Length and fit can be discussed before ordering',
    conversionHighlight: 'Choose a ready-to-wear size or request custom guidance',
    startingPriceKobo: 24000000, // ₦240,000
    image: '/images/fc_asymmetric_silk_dress.jpg',
    pillarGroup: 'SILKS',
    pillarLabel: 'Silks & Gowns',
  },
  {
    id: 'DINNER_DRESSES',
    label: 'Dinner Dresses & Gowns',
    slug: 'dinner-dresses',
    index: '07',
    tagline: 'Sculpted Bodices & Dramatic Movement',
    description: 'Glamorous evening and event dresses featuring the corsetry, embellishment, sleeves and trains associated with Finaluchi occasion wear.',
    fabricProvenance: 'Fabric and embellishment vary by chosen design',
    anatomicalFit: 'Measurements and event date confirmed for custom gowns',
    conversionHighlight: 'Made for weddings, galas, red carpets and milestone events',
    startingPriceKobo: 52000000, // ₦520,000
    image: '/images/fc_haute_soiree_gown.jpg',
    pillarGroup: 'SILKS',
    pillarLabel: 'Silks & Gowns',
  },
  {
    id: 'KIMONO',
    label: 'Kimonos & Robes',
    slug: 'kimono',
    index: '08',
    tagline: 'Flowing Layers & Bold Embellishment',
    description: 'Long-line kimonos and robes that add movement, colour and statement detail to simple or coordinated outfits.',
    fabricProvenance: 'Fabric and embellishment vary by design',
    anatomicalFit: 'Relaxed drape with adjustable styling where shown',
    conversionHighlight: 'Layer over dresses, sets and occasion separates',
    startingPriceKobo: 28000000, // ₦280,000
    image: '/images/fc_luxury_kimono.jpg',
    pillarGroup: 'SILKS',
    pillarLabel: 'Silks & Gowns',
  },
  {
    id: 'SKIRTS',
    label: 'Sunburst & Pleated Skirts',
    slug: 'skirts',
    index: '09',
    tagline: 'Pleats, Volume & Clean Waistlines',
    description: 'High-waisted skirts ranging from fluid maxis to structured statement shapes for coordinated and mix-and-match dressing.',
    fabricProvenance: 'Fabric and construction vary by design',
    anatomicalFit: 'Waist and finished length confirmed before production',
    conversionHighlight: 'Pair with shirts, bustiers and matching tops',
    startingPriceKobo: 17500000, // ₦175,000
    image: '/images/fc_bustier_pleated_skirt.jpg',
    pillarGroup: 'SILKS',
    pillarLabel: 'Silks & Gowns',
  },

  // --- PILLAR 3: SCULPTED & RESORT ---
  {
    id: 'JUMPSUITS',
    label: 'Jumpsuits',
    slug: 'jumpsuits',
    index: '10',
    tagline: 'One-Piece Dressing with Confident Structure',
    description: 'Tailored, asymmetric and wide-leg jumpsuits designed to deliver a complete occasion look with minimal styling effort.',
    fabricProvenance: 'Fabric and structure vary by design',
    anatomicalFit: 'Torso, waist and trouser length reviewed together',
    conversionHighlight: 'A strong alternative to a dress for events and dinners',
    startingPriceKobo: 36000000, // ₦360,000
    image: '/images/fc_luxury_jumpsuit.jpg',
    pillarGroup: 'SPECIALTY',
    pillarLabel: 'Sculpted & Resort',
  },
  {
    id: 'TOPS',
    label: 'Tops & Bustiers',
    slug: 'tops',
    index: '11',
    tagline: 'Corsetry, Draping & Statement Necklines',
    description: 'Sculpted tops, bustiers and draped pieces designed to pair with high-waisted tailoring and coordinated sets.',
    fabricProvenance: 'Fabric and internal structure vary by design',
    anatomicalFit: 'Bust, waist and support preferences confirmed per order',
    conversionHighlight: 'Build a complete look with skirts, pants or matching pieces',
    startingPriceKobo: 16000000, // ₦160,000
    image: '/images/fc_bustier_pleated_skirt.jpg',
    pillarGroup: 'SPECIALTY',
    pillarLabel: 'Sculpted & Resort',
  },
  {
    id: 'PLAYSUIT',
    label: 'Playsuits',
    slug: 'playsuit',
    index: '12',
    tagline: 'Playful Proportions & Tailored Detail',
    description: 'Short, structured one-piece looks for daytime events, holidays and relaxed celebration dressing.',
    fabricProvenance: 'Fabric, fastening and belt details vary by design',
    anatomicalFit: 'Torso and short length checked for comfortable movement',
    conversionHighlight: 'An easy statement look for warm-weather occasions',
    startingPriceKobo: 19500000, // ₦195,000
    image: '/images/fc_luxury_playsuit.jpg',
    pillarGroup: 'SPECIALTY',
    pillarLabel: 'Sculpted & Resort',
  },
  {
    id: 'BIKINI',
    label: 'Bikini & Resort',
    slug: 'bikini',
    index: '13',
    tagline: 'Statement Swim & Coordinating Layers',
    description: 'Bikinis and resort pieces designed for confident holiday dressing, with coordinating wraps and cover-ups where shown.',
    fabricProvenance: 'Fabric and included pieces are listed per design',
    anatomicalFit: 'Coverage and sizing guidance available before ordering',
    conversionHighlight: 'Coordinate swimwear with wraps and resort separates',
    startingPriceKobo: 12500000, // ₦125,000
    image: '/images/fc_luxury_bikini.jpg',
    pillarGroup: 'SPECIALTY',
    pillarLabel: 'Sculpted & Resort',
  },
];

export const getDepartmentById = (id: string): DepartmentCategory | undefined => {
  return CATEGORY_DEPARTMENTS.find((d) => d.id === id);
};

export const getDepartmentBySlug = (slug: string): DepartmentCategory | undefined => {
  return CATEGORY_DEPARTMENTS.find((d) => d.slug === slug);
};
