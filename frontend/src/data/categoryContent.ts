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
  galleryImages: string[];
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
    description: 'Tailored palazzo trousers and clean fluid columns designed to elongate the silhouette with confident ease. Cut and contoured in our Abuja atelier for events, elevated workwear and coordinated suites.',
    fabricProvenance: 'Double-faced silk crepe & luxury wool matrix',
    anatomicalFit: 'Waist rise and finished inseam confirmed before cutting',
    conversionHighlight: 'Versatile for black-tie galas, events and modular separates',
    startingPriceKobo: 22000000, // ₦220,000
    image: '/images/.webp',
    galleryImages: [
      '/images/.webp',
      '/images/.webp',
      '/images/.webp',
    ],
    pillarGroup: 'TAILORING',
    pillarLabel: 'Tailoring & Suites',
  },
  {
    id: 'SHIRTS',
    label: 'Shirts',
    slug: 'shirts',
    index: '02',
    tagline: 'Architectural Poplin & Statement Cuffs',
    description: 'Crisp, razor-sharp shirting and elevated silk blouses with exaggerated cuffs and sculptural collars. Designed as sovereign standalones or layered under tailored jackets and corsets.',
    fabricProvenance: '200-ply Egyptian cotton & fluid silk poplin',
    anatomicalFit: 'Shoulder width, sleeve length and torso drape confirmed per order',
    conversionHighlight: 'Pairs seamlessly with skirts, palazzo trousers and 3-piece sets',
    startingPriceKobo: 14500000, // ₦145,000
    image: '/images/.webp',
    galleryImages: [
      '/images/.webp',
      '/images/.webp',
      '/images/.webp',
    ],
    pillarGroup: 'TAILORING',
    pillarLabel: 'Tailoring & Suites',
  },
  {
    id: 'JACKETS',
    label: 'Jackets & Blazers',
    slug: 'jackets',
    index: '03',
    tagline: 'Pagoda Shoulders & Peplum Definition',
    description: 'Architectural jackets and structured blazers featuring defined pagoda shoulders, cinched peplum waistlines, and hand-molded lapels. Engineered for an unforgettable silhouette at celebrations and formal functions.',
    fabricProvenance: 'Super 130s virgin wool & silk-faced lapels',
    anatomicalFit: 'Chest canvas, shoulder span and waist suppression reviewed per client',
    conversionHighlight: 'Transformative power layering for weddings and evening receptions',
    startingPriceKobo: 29000000, // ₦290,000
    image: '/images/.webp',
    galleryImages: [
      '/images/.webp',
      '/images/.webp',
      '/images/.webp',
    ],
    pillarGroup: 'TAILORING',
    pillarLabel: 'Tailoring & Suites',
  },
  {
    id: '2PIECES',
    label: '2-Piece Sets',
    slug: '2pieces',
    index: '04',
    tagline: 'Coordinated Harmony & Modular Wear',
    description: 'Matching bustiers, sunburst pleated skirts, cropped blazers and palazzo trousers calibrated for unified occasion elegance or individual repeat styling across events.',
    fabricProvenance: 'Hand-dyed silk crepe, georgette & structured satin',
    anatomicalFit: 'Top and bottom sized independently for a bespoke, tailored fit',
    conversionHighlight: 'Complete occasion entrance with multiple styling options',
    startingPriceKobo: 31000000, // ₦310,000
    image: '/images/.webp',
    galleryImages: [
      '/images/.webp',
      '/images/.webp',
      '/images/.webp',
    ],
    pillarGroup: 'TAILORING',
    pillarLabel: 'Tailoring & Suites',
  },
  {
    id: '3PIECES',
    label: '3-Piece Sets',
    slug: '3pieces',
    index: '05',
    tagline: 'Full Sartorial Majesty & Canvassed Form',
    description: 'The definitive expression of Nigerian luxury tailoring. Fully canvassed blazers, sculpted waistcoats or boned bustiers, and knife-pleated palazzo trousers crafted for commanding presence.',
    fabricProvenance: 'Super 150s virgin wool with full floating chest canvas',
    anatomicalFit: 'Three-layer anatomical measurement protocol for effortless posture',
    conversionHighlight: 'Heirloom investment dressing for high-profile milestone occasions',
    startingPriceKobo: 45000000, // ₦450,000
    image: '/images/.webp',
    galleryImages: [
      '/images/.webp',
      '/images/.webp',
      '/images/.webp',
      '/images/.webp',
    ],
    pillarGroup: 'TAILORING',
    pillarLabel: 'Tailoring & Suites',
  },

  // --- PILLAR 2: SILKS & EVENING GOWNS ---
  {
    id: 'DRESSES',
    label: 'Dresses',
    slug: 'dresses',
    index: '06',
    tagline: 'Bias-Cut Silk & Sculpted Contours',
    description: 'Fluid bias-cut silk column dresses and asymmetric draped gowns that move with liquid grace. Designed for intimate dinners, celebrations and elevated cocktail events.',
    fabricProvenance: '100% heavy mulberry silk satin & crepe morocain',
    anatomicalFit: 'True 45° bias drape aligned to natural movement and height',
    conversionHighlight: 'Available in ready-to-wear sizes or custom-made to your measurements',
    startingPriceKobo: 24000000, // ₦240,000
    image: '/images/.webp',
    galleryImages: [
      '/images/.webp',
      '/images/.webp',
      '/images/.webp',
    ],
    pillarGroup: 'SILKS',
    pillarLabel: 'Silks & Gowns',
  },
  {
    id: 'DINNER_DRESSES',
    label: 'Dinner Dresses & Gowns',
    slug: 'dinner-dresses',
    index: '07',
    tagline: 'Corsetry, Embellishments & Sweeping Trains',
    description: 'Monumental evening and gala gowns featuring Finaluchi’s signature corsetry, hand-laid crystal embellishments, dramatic sculptural sleeves, and sweeping floor trains for weddings, galas and red carpets.',
    fabricProvenance: 'Duchess satin, silk organza & artisan crystal pavé',
    anatomicalFit: 'Internal boned stays, bustier cup sizing and train length calibrated to heel height',
    conversionHighlight: 'Signature high-impact gown for brides, asoebi captains and gala honorees',
    startingPriceKobo: 52000000, // ₦520,000
    image: '/images/.webp',
    galleryImages: [
      '/images/.webp',
      '/images/.webp',
      '/images/.webp',
      '/images/.webp',
    ],
    pillarGroup: 'SILKS',
    pillarLabel: 'Silks & Gowns',
  },
  {
    id: 'KIMONO',
    label: 'Kimonos & Robes',
    slug: 'kimono',
    index: '08',
    tagline: 'Flowing Silk Layers & Gilded Detail',
    description: 'Floor-sweeping liquid silk robes and obi-cinched kimonos embellished with artisanal embroidery crafted in our Abuja atelier. Adds regal movement, colour and texture over dresses or coordinated sets.',
    fabricProvenance: 'Heavyweight silk charmeuse with metallic bullion thread',
    anatomicalFit: 'Continuous panel drape with adjustable sash cinching',
    conversionHighlight: 'Effortlessly transitions from intimate luxury to full evening glamour',
    startingPriceKobo: 28000000, // ₦280,000
    image: '/images/.webp',
    galleryImages: [
      '/images/.webp',
      '/images/.webp',
      '/images/.webp',
    ],
    pillarGroup: 'SILKS',
    pillarLabel: 'Silks & Gowns',
  },
  {
    id: 'SKIRTS',
    label: 'Sunburst & Pleated Skirts',
    slug: 'skirts',
    index: '09',
    tagline: 'Kinetic Pleats & Weighted Clean Hems',
    description: 'High-waisted knife-pleated maxis and sculptural column skirts engineered to flare hypnotically with every stride and snap cleanly back into place.',
    fabricProvenance: 'Permanent sunburst-pleated georgette & weighted silk hems',
    anatomicalFit: 'Contoured high-rise waistband engineered to prevent rolling or slipping',
    conversionHighlight: 'Pairs with architectural shirts, bustiers and tailored jackets',
    startingPriceKobo: 17500000, // ₦175,000
    image: '/images/.webp',
    galleryImages: [
      '/images/.webp',
      '/images/.webp',
      '/images/.webp',
    ],
    pillarGroup: 'SILKS',
    pillarLabel: 'Silks & Gowns',
  },

  // --- PILLAR 3: SCULPTED & RESORT ---
  {
    id: 'JUMPSUITS',
    label: 'Jumpsuits',
    slug: 'jumpsuits',
    index: '10',
    tagline: 'Inbuilt Corsetry & Asymmetric Poise',
    description: 'One-shoulder columns and tailored wide-leg jumpsuits integrated with internal boned corsetry. Delivers red-carpet authority with the comfort and mobility of modern Nigerian occasion wear.',
    fabricProvenance: 'Wool-silk crepe matrix with metallic bullion embroidery',
    anatomicalFit: 'Torso length, bust apex and trouser inseam measured together',
    conversionHighlight: 'Modern, high-glamour alternative to traditional gala dresses',
    startingPriceKobo: 36000000, // ₦360,000
    image: '/images/.webp',
    galleryImages: [
      '/images/.webp',
      '/images/.webp',
      '/images/.webp',
    ],
    pillarGroup: 'SPECIALTY',
    pillarLabel: 'Sculpted & Resort',
  },
  {
    id: 'TOPS',
    label: 'Tops & Bustiers',
    slug: 'tops',
    index: '11',
    tagline: 'Corset Stays & Sculpted Necklines',
    description: 'Internal boned bustiers, draped cowl tops and asymmetric necklines sculpted to frame the clavicle and enhance posture with regal poise.',
    fabricProvenance: 'Duchess satin, structured memory stays & pure silk lining',
    anatomicalFit: 'Multi-panel anatomical contouring for non-slip postural support',
    conversionHighlight: 'Foundation statement piece for high-waisted trousers and maxi skirts',
    startingPriceKobo: 16000000, // ₦160,000
    image: '/images/.webp',
    galleryImages: [
      '/images/.webp',
      '/images/.webp',
      '/images/.webp',
    ],
    pillarGroup: 'SPECIALTY',
    pillarLabel: 'Sculpted & Resort',
  },
  {
    id: 'PLAYSUIT',
    label: 'Playsuits',
    slug: 'playsuit',
    index: '12',
    tagline: 'Peaked Lapels & Obi Belt Precision',
    description: 'Structured couture playsuits crafted in heavyweight silk satin with notched lapels and cinched obi sashes. Sophisticated resort and daytime cocktail attire tailored with sharp sartorial lines.',
    fabricProvenance: '280 GSM heavyweight silk satin with silk crepe lining',
    anatomicalFit: 'Balanced rise-to-torso proportions for fluid sitting and standing comfort',
    conversionHighlight: 'Chic step-in occasion piece for destination weddings and daytime celebrations',
    startingPriceKobo: 19500000, // ₦195,000
    image: '/images/.webp',
    galleryImages: [
      '/images/.webp',
      '/images/.webp',
      '/images/.webp',
    ],
    pillarGroup: 'SPECIALTY',
    pillarLabel: 'Sculpted & Resort',
  },
  {
    id: 'BIKINI',
    label: 'Bikini & Resort',
    slug: 'bikini',
    index: '13',
    tagline: 'Sculpting Metallic Lycra & Matching Sarongs',
    description: 'Double-lined Italian metallic microfibers and matching silk gauze wraps. Sculpting high-waisted briefs with plunge tops engineered to stay sculpted when wet, resistant to chlorine, sun, and saltwater.',
    fabricProvenance: 'UPF 50+ Italian metallic microfiber with coordinating silk wraps',
    anatomicalFit: 'Double-bonded contour seams with supportive underband framing',
    conversionHighlight: 'Luxury resort wardrobe piece for holiday getaways and yacht parties',
    startingPriceKobo: 12500000, // ₦125,000
    image: '/images/.webp',
    galleryImages: [
      '/images/.webp',
      '/images/.webp',
      '/images/.webp',
    ],
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
