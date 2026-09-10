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
    tagline: 'Architectural Line & Fluid Volume',
    description: 'Sculptural high-waisted palazzo trousers and fluid wide-leg columns cut from 320 GSM double-faced mulberry silk crepe. Structured with a continuous contour waistband that elongates the silhouette without cinching discomfort.',
    fabricProvenance: '320 GSM Double-Faced Mulberry Silk Crepe',
    anatomicalFit: '48-point anatomical rise draft · Continuous waistband',
    conversionHighlight: 'Zero-wrinkle travel drape · Hand-blindstitched hems',
    startingPriceKobo: 22000000, // ₦220,000
    image: '/images/fc_luxury_pants.jpg',
    pillarGroup: 'TAILORING',
    pillarLabel: 'Tailoring & Suites',
  },
  {
    id: 'SHIRTS',
    label: 'Architectural Shirts',
    slug: 'shirts',
    index: '02',
    tagline: 'Razor-Sharp Poplin & Exaggerated Cuffs',
    description: 'Oversized, razor-sharp shirting tailored from 200-ply Egyptian cotton and silk poplin. Engineered with exaggerated French cuffs, hidden mother-of-pearl plackets, and structured stand collars that hold their form all day.',
    fabricProvenance: '200-Ply Egyptian Cotton & Silk Poplin',
    anatomicalFit: 'Drop-shoulder architectural drape · Stand collar retention',
    conversionHighlight: 'Breathable, structured matrix · Impervious to sagging',
    startingPriceKobo: 14500000, // ₦145,000
    image: '/images/fc_luxury_shirt.jpg',
    pillarGroup: 'TAILORING',
    pillarLabel: 'Tailoring & Suites',
  },
  {
    id: 'JACKETS',
    label: 'Pagoda Jackets & Blazers',
    slug: 'jackets',
    index: '03',
    tagline: 'Sculptural Shoulders & Peplum Cinch',
    description: 'Structured pagoda shoulders, cinched peplum waistlines, and hand-molded lapels crafted in Italian virgin wool. Sculptural architecture that defines the feminine silhouette with regal sharpness.',
    fabricProvenance: 'Italian Super 130s Virgin Wool & Pure Cupro Lining',
    anatomicalFit: 'Internal chest canvas · Sculpted hourglass peplum',
    conversionHighlight: 'Transformative power layer · Commands any high-stakes room',
    startingPriceKobo: 29000000, // ₦290,000
    image: '/images/fc_tailoring_suite.jpg',
    pillarGroup: 'TAILORING',
    pillarLabel: 'Tailoring & Suites',
  },
  {
    id: '2PIECES',
    label: '2-Piece Coordinated Suites',
    slug: '2pieces',
    index: '04',
    tagline: 'Harmonious Proportions & Modular Form',
    description: 'Precisely calibrated two-piece ensembles — from draped bustiers over sunburst pleated skirts to cropped blazers with palazzo trousers. Engineered for unified harmony or versatile independent styling.',
    fabricProvenance: 'Hand-Dyed Silk Crepe & Fine Georgette',
    anatomicalFit: 'Proportion-calibrated top & bottom separation',
    conversionHighlight: 'Instant sovereign styling · Infinite multi-season versatility',
    startingPriceKobo: 31000000, // ₦310,000
    image: '/images/fc_bustier_pleated_skirt.jpg',
    pillarGroup: 'TAILORING',
    pillarLabel: 'Tailoring & Suites',
  },
  {
    id: '3PIECES',
    label: '3-Piece Sovereign Tailoring',
    slug: '3pieces',
    index: '05',
    tagline: 'The Zenith of Bespoke Power Dressing',
    description: 'The definitive expression of sovereign luxury. Fully canvassed double-breasted blazers, sculptured waistcoats, and knife-pleated palazzo trousers engineered to command rooms with quiet majesty.',
    fabricProvenance: 'Super 150s Virgin Wool, Mulberry Silk & Horsehair Canvas',
    anatomicalFit: 'Full floating canvas · Tailored across 48 anatomical points',
    conversionHighlight: 'Heirloom investment · Retains razor silhouette across decades',
    startingPriceKobo: 45000000, // ₦450,000
    image: '/images/fc_luxury_threepiece.jpg',
    pillarGroup: 'TAILORING',
    pillarLabel: 'Tailoring & Suites',
  },

  // --- PILLAR 2: SILKS & EVENING GOWNS ---
  {
    id: 'DRESSES',
    label: 'Fluid Silk Column Dresses',
    slug: 'dresses',
    index: '06',
    tagline: 'Bias-Cut Silk & Unbroken Luster',
    description: 'Sensual bias-cut mulberry silk column dresses and asymmetric gowns that trace natural movement with liquid grace. Featherweight yet completely opaque, falling in unbroken waves of pure luster.',
    fabricProvenance: '100% Pure Mulberry Silk Charmeuse',
    anatomicalFit: 'True 45° bias-cut · Seamless contouring without cling',
    conversionHighlight: 'Sensual drape with total ease · Flattering across all heights',
    startingPriceKobo: 24000000, // ₦240,000
    image: '/images/fc_asymmetric_silk_dress.jpg',
    pillarGroup: 'SILKS',
    pillarLabel: 'Silks & Gowns',
  },
  {
    id: 'DINNER_DRESSES',
    label: 'Grand Soirée & Gala Gowns',
    slug: 'dinner-dresses',
    index: '07',
    tagline: 'Monolithic Gowns & Detachable Capes',
    description: 'Monumental evening gowns featuring dramatic detachable organza capes, sculpted bodices, and hand-beaded pavé borders. Every gown is individual couture, numbered and registered in the Lagos atelier archive.',
    fabricProvenance: 'Silk Crepe Morocain, Silk Organza & Micro-Crystal Pavé',
    anatomicalFit: 'Internal corset architecture · Floor-length weighted sweep',
    conversionHighlight: 'Peerless red-carpet presence · Includes private fitting consultation',
    startingPriceKobo: 52000000, // ₦520,000
    image: '/images/fc_haute_soiree_gown.jpg',
    pillarGroup: 'SILKS',
    pillarLabel: 'Silks & Gowns',
  },
  {
    id: 'KIMONO',
    label: 'Atelier Kimonos & Robes',
    slug: 'kimono',
    index: '08',
    tagline: 'Hand-Laid Gilded Embroidery & Fluid Robes',
    description: 'Floor-sweeping liquid silk robes and obi-belted kimonos draped across full-width continuous panels. Embellished with ancestral metallic embroidery hand-laid by master craftswomen in Lagos.',
    fabricProvenance: '100% Heavy Silk Charmeuse & Bullion Gilt Thread',
    anatomicalFit: 'Full-width seamless panel drape · Adjustable obi sash',
    conversionHighlight: 'Day-to-evening versatility · Wear open as cape or belted as gown',
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
    tagline: 'Kinetic Sunburst Pleats & Weighted Hems',
    description: 'High-waisted knife-pleated maxis and architectural column skirts with hand-finished weighted hems. Engineered to flare gracefully with every step and snap cleanly back into place.',
    fabricProvenance: 'Permanent Sunburst Pleated Silk Georgette',
    anatomicalFit: 'Contoured high-rise waistband · Concealed invisible zip',
    conversionHighlight: 'Hypnotic movement in motion · Pairs with knits, shirts or corsets',
    startingPriceKobo: 17500000, // ₦175,000
    image: '/images/fc_bustier_pleated_skirt.jpg',
    pillarGroup: 'SILKS',
    pillarLabel: 'Silks & Gowns',
  },

  // --- PILLAR 3: SCULPTED & RESORT ---
  {
    id: 'JUMPSUITS',
    label: 'Sculptural Jumpsuits',
    slug: 'jumpsuits',
    index: '10',
    tagline: 'Asymmetric Poise & Inbuilt Corsetry',
    description: 'Singular one-shoulder columns and tailored silhouettes integrated with discreet internal boned corsetry. Designed to deliver red-carpet authority with the effortless movement of a second skin.',
    fabricProvenance: 'Mulberry Silk (60%) & Fine Merino Wool (40%) Matrix',
    anatomicalFit: 'Internal boned bodice · Long-line wide leg column',
    conversionHighlight: 'Black-tie authority without restrictive stiffness',
    startingPriceKobo: 36000000, // ₦360,000
    image: '/images/fc_luxury_jumpsuit.jpg',
    pillarGroup: 'SPECIALTY',
    pillarLabel: 'Sculpted & Resort',
  },
  {
    id: 'TOPS',
    label: 'Bustiers & Sculpted Tops',
    slug: 'tops',
    index: '11',
    tagline: 'Postural Stays & Draped Cowl Silk',
    description: 'Internal boned bustiers, architectural asymmetric necklines, and draped cowl tops. Sculpted to enhance posture and frame the clavicle with regal poise.',
    fabricProvenance: 'Duchess Satin, Pure Silk Organza & Flexible Memory Stays',
    anatomicalFit: 'Multi-panel anatomical contouring · Non-slip silicone grip',
    conversionHighlight: 'Slip-free support · Seamless partner for high-waisted tailoring',
    startingPriceKobo: 16000000, // ₦160,000
    image: '/images/fc_bustier_pleated_skirt.jpg',
    pillarGroup: 'SPECIALTY',
    pillarLabel: 'Sculpted & Resort',
  },
  {
    id: 'PLAYSUIT',
    label: 'Tailored Playsuits',
    slug: 'playsuit',
    index: '12',
    tagline: 'Peaked Lapels & Obi Belt Precision',
    description: 'Couture playsuits crafted in heavyweight silk satin with notched lapels and cinched obi sashes. Sophisticated resort and daytime cocktail attire tailored with sharp sartorial lines.',
    fabricProvenance: '280 GSM Heavyweight Silk Satin',
    anatomicalFit: 'Tailored shorts proportion with generous inseam ease',
    conversionHighlight: 'Step-in ease · High-fashion resort presence',
    startingPriceKobo: 19500000, // ₦195,000
    image: '/images/fc_luxury_playsuit.jpg',
    pillarGroup: 'SPECIALTY',
    pillarLabel: 'Sculpted & Resort',
  },
  {
    id: 'BIKINI',
    label: 'Couture Swim & Resort Wraps',
    slug: 'bikini',
    index: '13',
    tagline: 'Sculpting Metallic Lycra & Matching Sarongs',
    description: 'Double-lined Italian metallic microfibers and matching silk gauze wraps. Sculpting high-waisted briefs with plunge tops engineered to stay sculpted when wet, resistant to chlorine, sun, and saltwater.',
    fabricProvenance: 'UPF 50+ Italian Metallic Lycra & Silk Chiffon',
    anatomicalFit: 'Double-bonded contour seam · Non-digging soft elastic',
    conversionHighlight: 'Includes coordinating silk sarong · Chlorine and UV proof',
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
