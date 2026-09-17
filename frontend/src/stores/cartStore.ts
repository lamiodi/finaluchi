import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, PackagingOption, Product, ProductColorway } from '../types';

export const PACKAGING_OPTIONS: PackagingOption[] = [
  {
    id: 'SIGNATURE_BOX',
    title: 'Signature Couture Keepsake Box',
    subtitle: 'Champagne foil embossed box with archival tissue & ribbon',
    priceKobo: 0, // Complimentary
  },
  {
    id: 'ECO_LUXURY_CARRIER',
    title: 'Eco-Luxury Breathable Garment Carrier',
    subtitle: 'Woven organic linen garment bag with wooden travel hanger',
    priceKobo: 1500000, // ₦15,000
  },
];

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  packagingType: 'SIGNATURE_BOX' | 'ECO_LUXURY_CARRIER';
  isGift: boolean;
  giftMessage: string;
  reservationExpiresAt: number | null; // Unix timestamp
  
  // Actions
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (
    product: Product,
    colorway: ProductColorway,
    size: string,
    quantity?: number,
    isMadeToMeasure?: boolean,
    customMeasurements?: Record<string, string>
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  setPackagingType: (type: 'SIGNATURE_BOX' | 'ECO_LUXURY_CARRIER') => void;
  setGiftOptions: (isGift: boolean, message?: string) => void;
  clearCart: () => void;
  refreshReservation: () => void;

  // Computations (minor units - integer kobo)
  getSubtotalKobo: () => number;
  getPackagingKobo: () => number;
  getShippingKobo: (countryCode?: string) => number;
  getTaxKobo: (countryCode?: string) => number;
  getTotalKobo: (countryCode?: string) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
  items: [],
  isDrawerOpen: false,
  packagingType: 'SIGNATURE_BOX',
  isGift: false,
  giftMessage: '',
  reservationExpiresAt: null,

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),

  addToCart: (product, colorway, size, quantity = 1, isMadeToMeasure = false, customMeasurements) => {
    const existingIndex = get().items.findIndex(
      (item) => item.productId === product.id && item.colorway.id === colorway.id && item.size === size
    );

    const now = Date.now();
    const expiresAt = now + 15 * 60 * 1000; // 15-minute reservation hold

    const unitPriceKobo = product.basePriceKobo + (colorway.priceDeltaKobo || 0);

    if (existingIndex > -1) {
      const updated = [...get().items];
      updated[existingIndex].quantity += quantity;
      set({ items: updated, isDrawerOpen: true, reservationExpiresAt: expiresAt });
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        product,
        colorway,
        size,
        quantity,
        unitPriceKobo,
        isMadeToMeasure,
        customMeasurements,
        reservedUntil: expiresAt,
      };
      set({ items: [...get().items, newItem], isDrawerOpen: true, reservationExpiresAt: expiresAt });
    }
  },

  removeFromCart: (itemId) => {
    const remaining = get().items.filter((item) => item.id !== itemId);
    set({
      items: remaining,
      reservationExpiresAt: remaining.length === 0 ? null : get().reservationExpiresAt,
    });
  },

  updateQuantity: (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      get().removeFromCart(itemId);
      return;
    }
    const updated = get().items.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    set({ items: updated });
  },

  setPackagingType: (type) => set({ packagingType: type }),
  
  setGiftOptions: (isGift, message = '') => set({ isGift, giftMessage: message }),

  clearCart: () => set({ items: [], reservationExpiresAt: null }),

  refreshReservation: () => {
    if (get().items.length > 0) {
      set({ reservationExpiresAt: Date.now() + 15 * 60 * 1000 });
    }
  },

  getSubtotalKobo: () => {
    return get().items.reduce((sum, item) => sum + item.unitPriceKobo * item.quantity, 0);
  },

  getPackagingKobo: () => {
    const opt = PACKAGING_OPTIONS.find((p) => p.id === get().packagingType);
    return opt ? opt.priceKobo : 0;
  },

  getShippingKobo: (countryCode = 'NG') => {
    if (get().items.length === 0) return 0;
    // Section 15.4: Local Nigerian shipping is ₦15,000 (or complimentary over ₦300,000), International is ₦85,000
    const subtotal = get().getSubtotalKobo();
    if (countryCode === 'NG') {
      return subtotal >= 30000000 ? 0 : 1500000; // Free over ₦300k, else ₦15k
    }
    return 8500000; // ₦85,000 International Courier Express
  },

  getTaxKobo: (countryCode = 'NG') => {
    // 7.5% Nigerian VAT for local orders; International orders are DDU (Delivered Duty Unpaid)
    if (countryCode !== 'NG') return 0;
    const subtotal = get().getSubtotalKobo();
    return Math.round(subtotal * 0.075);
  },

  getTotalKobo: (countryCode = 'NG') => {
    return (
      get().getSubtotalKobo() +
      get().getPackagingKobo() +
      get().getShippingKobo(countryCode) +
      get().getTaxKobo(countryCode)
    );
  },
    }),
    {
      name: 'finaluchi_cart_storage',
      partialize: (state) => ({
        items: state.items,
        packagingType: state.packagingType,
        isGift: state.isGift,
        giftMessage: state.giftMessage,
      }),
    }
  )
);

