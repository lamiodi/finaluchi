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
  { id: 'DRESSES', label: 'Dresses', slug: 'dresses', index: '01', tagline: 'The Rossa, in House Leopard', description: 'The Rossa Dress — plunging halter mini in the house leopard with shoulder rosette and asymmetric ruffle hem. UK 6–16.', startingPriceKobo: 6600000, image: '/images/products/rossa-dress/rossa-1.jpeg' },
  { id: 'JUMPSUITS', label: 'Jumpsuits', slug: 'jumpsuits', index: '02', tagline: 'The Cleo Capri', description: 'Plunging halter over a leopard bodice with the wide print sash. Black, red and white. UK 6–14.', startingPriceKobo: 7500000, image: '/images/products/cleo-capri-jumpsuit/cleo-1.jpeg' },
  { id: 'TOPS', label: 'Tops', slug: 'tops', index: '03', tagline: 'The Dahlia Tank', description: 'Fine-rib crop tank with the leopard teardrop at the chest. Cream and caramel nude. S–L.', startingPriceKobo: 3500000, image: '/images/products/dahlia-tank-top/dahlia-4.jpeg' },
  { id: 'SKIRTS', label: 'Skirts', slug: 'skirts', index: '04', tagline: 'The Dahlia, in Full Bloom', description: 'High-rise mini blooming with hand-mounted 3D rosettes in deep house wine. UK 6–18.', startingPriceKobo: 4600000, image: '/images/products/dahlia-skirt/dahlia-1.jpeg' },
  { id: '2PIECES', label: '2 Pieces', slug: '2pieces', index: '05', tagline: 'The Leonie Lounge Set', description: 'Cropped leopard tee with red rib trim over capri leggings with ribbon ankle ties. UK 10–16.', startingPriceKobo: 8000000, image: '/images/products/leonie-capri-lounge-2-piece/leonie-3.jpeg' },
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
