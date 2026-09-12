export const BRAND = {
  name: 'Finaluchi Couture',
  shortName: 'FLC',
  location: 'Abuja, Nigeria',
  whatsappDisplay: '+234 803 231 2961',
  whatsappNumber: '2348032312961',
  instagramHandle: '@finaluchicouture',
  instagramUrl: 'https://www.instagram.com/finaluchicouture/',
  creativeLead: 'Oluchi Irokanulo',
  creativeLeadRole: 'Fashion Director & Creative Designer',
  creativeLeadSince: '2017',
  positioning: 'A global fashion brand inspired by the power of togetherness.',
  lines: [
    {
      name: 'Finaluchi Couture',
      handle: '@finaluchicouture',
      url: 'https://www.instagram.com/finaluchicouture/',
      description: 'Women\'s couture, ready-to-wear, asoebi and event dressing.',
    },
    {
      name: 'FLC Bridals',
      handle: '@flcbridals',
      url: 'https://www.instagram.com/flcbridals/',
      description: 'Traditional and white wedding dresses for the full bridal moment.',
    },
    {
      name: 'FLC Men',
      handle: '@flcmen',
      url: 'https://www.instagram.com/flcmen/',
      description: 'Menswear designed with the same confident Finaluchi point of view.',
    },
    {
      name: 'Together by FLC',
      handle: '@togetherbyflc',
      url: 'https://www.instagram.com/togetherbyflc/',
      description: 'Lifestyle and collection pieces shaped around togetherness.',
    },
  ],
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const ORDER_CLARITY_NOTE =
  'Before payment, confirm your invoice, measurements, delivery date, alteration terms and return or refund terms in writing.';
