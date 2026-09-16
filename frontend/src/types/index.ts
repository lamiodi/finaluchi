// Finaluchi Couture — Production Type System v2.1.0

export type CurrencyCode = 'NGN' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AED';

export type ProductCategory = 
  | 'PANTS'
  | 'JUMPSUITS'
  | 'KIMONO'
  | 'TOPS'
  | 'SHIRTS'
  | '2PIECES'
  | '3PIECES'
  | 'DRESSES'
  | 'SKIRTS'
  | 'PLAYSUIT'
  | 'BIKINI'
  | 'JACKETS'
  | 'DINNER_DRESSES';

export type PillarCategory = ProductCategory;

export interface ProductCategoryItem {
  id: ProductCategory;
  label: string;
  slug: string;
  description: string;
  image: string;
  tagline?: string;
  index?: string;
  fabricProvenance?: string;
  anatomicalFit?: string;
  conversionHighlight?: string;
  startingPriceKobo?: number;
}

export const ATELIER_CATEGORIES: ProductCategoryItem[] = [
  { id: 'PANTS', label: 'Pants & Palazzo', slug: 'pants', index: '01', tagline: 'Architectural Line & Fluid Volume', description: 'Sculptural high-waisted palazzo trousers and fluid wide-leg columns cut from 320 GSM double-faced mulberry silk crepe. Structured with a continuous contour waistband that elongates the silhouette without cinching discomfort.', fabricProvenance: '320 GSM Double-Faced Mulberry Silk Crepe', anatomicalFit: '48-point anatomical rise draft', conversionHighlight: 'Zero-wrinkle travel drape', startingPriceKobo: 22000000, image: '/images/fc_luxury_pants.jpg' },
  { id: 'JUMPSUITS', label: 'Sculptural Jumpsuits', slug: 'jumpsuits', index: '02', tagline: 'Asymmetric Poise & Inbuilt Corsetry', description: 'Singular one-shoulder columns and tailored silhouettes integrated with discreet internal boned corsetry. Designed to deliver red-carpet authority with the effortless movement of a second skin.', fabricProvenance: 'Mulberry Silk & Merino Wool Matrix', anatomicalFit: 'Internal boned bodice', conversionHighlight: 'Black-tie authority without restriction', startingPriceKobo: 36000000, image: '/images/fc_luxury_jumpsuit.jpg' },
  { id: 'KIMONO', label: 'Atelier Kimonos & Robes', slug: 'kimono', index: '03', tagline: 'Hand-Laid Gilded Embroidery & Fluid Robes', description: 'Floor-sweeping liquid silk robes and obi-belted kimonos draped across full-width continuous panels. Embellished with ancestral metallic embroidery hand-laid by master artisans in our Abuja atelier.', fabricProvenance: '100% Heavy Silk Charmeuse', anatomicalFit: 'Full-width seamless panel drape', conversionHighlight: 'Day-to-evening versatility', startingPriceKobo: 28000000, image: '/images/fc_luxury_kimono.jpg' },
  { id: 'TOPS', label: 'Bustiers & Sculpted Tops', slug: 'tops', index: '04', tagline: 'Postural Stays & Draped Cowl Silk', description: 'Internal boned bustiers, architectural asymmetric necklines, and draped cowl tops. Sculpted to enhance posture and frame the clavicle with regal poise.', fabricProvenance: 'Duchess Satin & Memory Stays', anatomicalFit: 'Multi-panel anatomical contouring', conversionHighlight: 'Slip-free support for tailoring', startingPriceKobo: 16000000, image: '/images/fc_bustier_pleated_skirt.jpg' },
  { id: 'SHIRTS', label: 'Architectural Shirts', slug: 'shirts', index: '05', tagline: 'Razor-Sharp Poplin & Exaggerated Cuffs', description: 'Oversized, razor-sharp shirting tailored from 200-ply Egyptian cotton and silk poplin. Engineered with exaggerated French cuffs, hidden mother-of-pearl plackets, and structured stand collars.', fabricProvenance: '200-Ply Egyptian Cotton & Silk Poplin', anatomicalFit: 'Drop-shoulder architectural drape', conversionHighlight: 'Breathable, structured matrix', startingPriceKobo: 14500000, image: '/images/fc_luxury_shirt.jpg' },
  { id: '2PIECES', label: '2-Piece Coordinated Suites', slug: '2pieces', index: '06', tagline: 'Harmonious Proportions & Modular Form', description: 'Precisely calibrated two-piece ensembles — from draped bustiers over sunburst pleated skirts to cropped blazers with palazzo trousers. Engineered for unified harmony or versatile independent styling.', fabricProvenance: 'Hand-Dyed Silk Crepe & Georgette', anatomicalFit: 'Proportion-calibrated separation', conversionHighlight: 'Instant sovereign styling', startingPriceKobo: 31000000, image: '/images/fc_bustier_pleated_skirt.jpg' },
  { id: '3PIECES', label: '3-Piece Sovereign Tailoring', slug: '3pieces', index: '07', tagline: 'The Zenith of Bespoke Power Dressing', description: 'The definitive expression of sovereign luxury. Fully canvassed double-breasted blazers, sculptured waistcoats, and knife-pleated palazzo trousers engineered to command rooms with quiet majesty.', fabricProvenance: 'Super 150s Virgin Wool & Silk Canvas', anatomicalFit: 'Full floating horsehair canvas', conversionHighlight: 'Heirloom investment tailoring', startingPriceKobo: 45000000, image: '/images/fc_luxury_threepiece.jpg' },
  { id: 'DRESSES', label: 'Fluid Silk Column Dresses', slug: 'dresses', index: '08', tagline: 'Bias-Cut Silk & Unbroken Luster', description: 'Sensual bias-cut mulberry silk column dresses and asymmetric gowns that trace natural movement with liquid grace. Featherweight yet completely opaque, falling in unbroken waves of pure luster.', fabricProvenance: '100% Bias-Cut Mulberry Silk', anatomicalFit: 'True 45° bias-cut contouring', conversionHighlight: 'Sensual drape with total ease', startingPriceKobo: 24000000, image: '/images/fc_asymmetric_silk_dress.jpg' },
  { id: 'SKIRTS', label: 'Sunburst & Pleated Skirts', slug: 'skirts', index: '09', tagline: 'Kinetic Sunburst Pleats & Weighted Hems', description: 'High-waisted knife-pleated maxis and architectural column skirts with hand-finished weighted hems. Engineered to flare gracefully with every step and snap cleanly back into place.', fabricProvenance: 'Permanent Sunburst Pleated Georgette', anatomicalFit: 'Contoured high-rise waistband', conversionHighlight: 'Hypnotic movement in motion', startingPriceKobo: 17500000, image: '/images/fc_bustier_pleated_skirt.jpg' },
  { id: 'PLAYSUIT', label: 'Tailored Playsuits', slug: 'playsuit', index: '10', tagline: 'Peaked Lapels & Obi Belt Precision', description: 'Couture playsuits crafted in heavyweight silk satin with notched lapels and cinched obi sashes. Sophisticated resort and daytime cocktail attire tailored with sharp sartorial lines.', fabricProvenance: '280 GSM Heavyweight Silk Satin', anatomicalFit: 'Tailored shorts proportion', conversionHighlight: 'Step-in ease with tailored poise', startingPriceKobo: 19500000, image: '/images/fc_luxury_playsuit.jpg' },
  { id: 'BIKINI', label: 'Couture Swim & Resort', slug: 'bikini', index: '11', tagline: 'Sculpting Metallic Lycra & Matching Sarongs', description: 'Double-lined Italian metallic microfibers and matching silk gauze wraps. Sculpting high-waisted briefs with plunge tops engineered to stay sculpted when wet, resistant to chlorine, sun, and saltwater.', fabricProvenance: 'UPF 50+ Italian Metallic Lycra', anatomicalFit: 'Double-bonded contour seam', conversionHighlight: 'Includes coordinating silk sarong', startingPriceKobo: 12500000, image: '/images/fc_luxury_bikini.jpg' },
  { id: 'JACKETS', label: 'Pagoda Jackets & Blazers', slug: 'jackets', index: '12', tagline: 'Sculptural Shoulders & Peplum Cinch', description: 'Structured pagoda shoulders, cinched peplum waistlines, and hand-molded lapels crafted in Italian virgin wool. Sculptural architecture that defines the feminine silhouette with regal sharpness.', fabricProvenance: 'Italian Super 130s Virgin Wool', anatomicalFit: 'Internal chest canvas & peplum', conversionHighlight: 'Transformative power layer', startingPriceKobo: 29000000, image: '/images/fc_tailoring_suite.jpg' },
  { id: 'DINNER_DRESSES', label: 'Grand Soirée & Gala Gowns', slug: 'dinner-dresses', index: '13', tagline: 'Monolithic Gowns & Detachable Capes', description: 'Monumental evening gowns featuring dramatic detachable organza capes, sculpted bodices, and hand-beaded pavé borders. Every gown is individual couture, numbered and registered in the Abuja atelier archive.', fabricProvenance: 'Silk Crepe Morocain & Crystal Pavé', anatomicalFit: 'Internal corset & floor sweep', conversionHighlight: 'Peerless red-carpet presence', startingPriceKobo: 52000000, image: '/images/fc_haute_soiree_gown.jpg' },
];

export type AvailabilityStatus = 
  | 'AVAILABLE'
  | 'IN_STOCK' 
  | 'MADE_TO_ORDER' 
  | 'ATELIER_EDITION' 
  | 'PRIVATE_ACCESS' 
  | 'ARCHIVED';

export type OccasionType = 
  | 'WEDDING' 
  | 'GALA_BLACK_TIE' 
  | 'PRIVATE_DINNER' 
  | 'VACATION' 
  | 'RED_CARPET' 
  | 'COCKTAIL_SOIREE';

export type PaymentStatus = 
  | 'PAYMENT_PENDING' 
  | 'PAYMENT_AUTHORIZED' 
  | 'PAYMENT_SUCCESSFUL' 
  | 'PAYMENT_FAILED' 
  | 'REFUNDED';

export type OrderStatus = 
  | 'DRAFT' 
  | 'PENDING_PAYMENT' 
  | 'CONFIRMED' 
  | 'IN_PRODUCTION' 
  | 'COMPLETED' 
  | 'CANCELLED';

export type FulfillmentStatus = 
  | 'UNFULFILLED' 
  | 'ALLOCATED' 
  | 'IN_ATELIER_PRODUCTION' 
  | 'PACKED_IN_KEEPSAKE' 
  | 'DISPATCHED' 
  | 'DELIVERED';

export interface MasterColor {
  id?: string;
  slug?: string;
  code: string; // e.g. "CL-01"
  name: string; // e.g. "Noir Onyx"
  pantoneRef: string; // e.g. "19-4008 TCX"
  hexCode: string; // e.g. "#0D0D0D"
  fabricSubstrate: string;
  sheenType: string;
  lusterDescription: string;
  culturalResonance: string;
  colorFamily: 'NEUTRALS_MINERAL' | 'IMPERIAL_JEWEL' | 'METALLIC_SATIN' | 'SAVANNA_SOLSTICE';
  isCorePalette?: boolean;
}

export type ClothColor = MasterColor;

export interface FabricIntelligence {
  material: string;
  composition: string;
  weightGsm: number;
  drapeDescription: string;
  sheenFinish?: string;
  finish?: string;
  careInstructions: string;
  weaveStructure?: string;
  macroZoomUrl?: string;
}

export interface SilhouetteMatrix {
  fit: number; // 0 to 100
  drape: number; // 0 to 100
  weight: number; // 0 to 100
  stretch?: number;
  structure?: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  size?: string;
  sizeLabel?: string;
  colorCode?: string;
  colorwayId?: string;
  inventoryCount?: number;
  stockQuantity?: number;
  reservedHoldCount?: number;
  reservedQuantity?: number;
  priceDeltaKobo?: number;
  isMadeToOrder?: boolean;
}

export interface ProductColorway {
  id: string;
  colorId?: string;
  color: MasterColor;
  sku: string;
  heroImageUrl: string;
  mediaGalleryUrls: string[];
  rotationFrameUrls: string[];
  fabricMacroImageUrl?: string;
  isDefault?: boolean;
  isSoldOut?: boolean;
  isMadeToOrder?: boolean;
  priceDeltaKobo?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  headline: string;
  description: string;
  atelierNotes: string;
  
  pillar: PillarCategory;
  categoryName: string;
  
  basePriceKobo: number; // integer NGN kobo (e.g. 38000000 = ₦380,000)
  
  availability: AvailabilityStatus;
  limitedEditionTotal?: number;
  limitedEditionRemaining?: number;
  
  occasions: OccasionType[];
  colorways: ProductColorway[];
  variants: ProductVariant[];
  
  fabricIntelligence: FabricIntelligence;
  silhouette: SilhouetteMatrix;
  
  isMadeToMeasureAllowed: boolean;
  has360Rotation: boolean;
  
  completeTheLookProductIds?: string[];
  editorialQuote?: string;
  isFeatured?: boolean;
  displayProportion?: 'tall' | 'standard' | 'wide';
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  colorway: ProductColorway;
  size: string;
  quantity: number;
  unitPriceKobo: number;
  isMadeToMeasure: boolean;
  customMeasurements?: Record<string, string>;
  reservedUntil: number;
}

export interface PackagingOption {
  id: 'SIGNATURE_BOX' | 'ECO_LUXURY_CARRIER';
  title: string;
  subtitle: string;
  priceKobo: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  country: string; // "NG" or ISO code
  state: string; // Nigerian state or Intl province
  city: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode?: string; // Optional for Nigeria, required for US/UK/CA
  landmarkNotes?: string;
}

export interface OrderItemSnapshot {
  id: string;
  productId: string;
  productNameSnapshot: string;
  colorNameSnapshot: string;
  sizeSnapshot: string;
  skuSnapshot: string;
  unitPriceKobo: number;
  quantity: number;
  heroImageUrl: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "FC-94820"
  guestAccessToken: string;
  guestTokenHash: string;
  
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  
  items: OrderItemSnapshot[];
  
  subtotalKobo: number;
  shippingKobo: number;
  taxKobo: number;
  discountKobo: number;
  totalKobo: number;
  currency: 'NGN';
  
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  fulfillmentStatus: FulfillmentStatus;
  
  gatewayReference?: string;
  packagingType: string;
  isGift: boolean;
  giftMessage?: string;
  
  atelierCurrentStageIndex: number; // 0 to 6
  createdAt: string;
  estimatedDeliveryDate: string;
  certificateSerialNumber?: string;
}

export interface DigitalCertificate {
  serialNumber: string; // e.g. "FC-HS-2026-000142"
  pieceName: string;
  productName?: string;
  collection: string;
  collectionName?: string;
  colorwayName?: string;
  atelierLocation: string;
  leadArtisan?: string;
  masterTailor: string;
  registeredOwner: string;
  registrationDate: string;
  issueDate?: string;
  editionTotal?: number;
  editionNumber?: number;
  qrCodeDataUrl?: string;
  qrCodeHash?: string;
  verificationUrl?: string;
}

export interface SavedEdit {
  id: string;
  title: string;
  name?: string;
  description?: string;
  isPublic: boolean;
  shareToken: string;
  productIds: string[];
  createdAt: string;
}

export interface Appointment {
  id: string;
  guestName?: string;
  clientName?: string;
  guestEmail?: string;
  clientEmail?: string;
  guestPhone?: string;
  clientPhone?: string;
  serviceType?: string;
  appointmentType?: string;
  locationType?: string;
  location?: string;
  assignedArtisan?: string;
  date: string;
  timeSlot: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED';
  notes?: string;
}

export interface AuditLogEntry {
  id: string;
  actorRole: string;
  actor?: string;
  action: string;
  resourceType: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}
