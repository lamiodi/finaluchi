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
  creativeLeadSince: 'October 2017',
  positioning: 'A global fashion brand inspired by the power of togetherness.',
  bio: 'A global fashion brand inspired by the power of togetherness.',
  brandStory:
    'Finaluchi Couture (FLC) is an Abuja-based Nigerian fashion brand dedicated to designing and producing original luxury occasion wear. Led creatively by Oluchi Irokanulo since October 2017, the house crafts women’s couture, ready-to-wear, asoebi, event dresses, and wedding gowns, alongside dedicated menswear, bridal, and lifestyle collections.',
  aestheticSignatures: [
    'Sculpted corsetry & boned stays',
    'Intricate hand embellishments & crystal beading',
    'Sculptural, figure-defining silhouettes',
    'Dramatic statement sleeves & structural shoulders',
    'Monumental sweeping trains & detachable capes',
    'Heirloom traditional & white wedding bridal couture',
  ],
  publicHistory: [
    {
      year: '2020',
      title: 'BellaNaija AsoEbi Feature',
      detail: 'Celebrated for striking Nigerian occasion and asoebi craftsmanship in BellaNaija Style.',
    },
    {
      year: '2022',
      title: 'Legit.ng Fashion Feature',
      detail: 'Credited in national fashion coverage for high-glamour event dressing and tailoring excellence.',
    },
    {
      year: 'Trade & Pop-ups',
      title: 'Abuja Trade Fairs & Lagos Pop-up',
      detail: 'Regular participant in Abuja premier trade fairs and hosted a showcase pop-up around Lekki Phase 1, Lagos.',
    },
    {
      year: 'June–July 2026',
      title: 'Active Couture & Bridal Collections',
      detail: 'Continual social debut of new couture gowns, corseted separates, and custom bridal creations.',
    },
  ],
  lines: [
    {
      name: 'Finaluchi Couture',
      handle: '@finaluchicouture',
      url: 'https://www.instagram.com/finaluchicouture/',
      description: 'Women’s couture, ready-to-wear, asoebi and event dressing.',
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
  buyerProtectionGuide: [
    {
      step: '01',
      title: 'Request a Written Invoice',
      detail: 'Receive an official invoice documenting the exact piece, custom specifications, fabric, and itemised cost.',
    },
    {
      step: '02',
      title: 'Confirmed Delivery Date',
      detail: 'Agree on guaranteed production milestones and final delivery scheduled ahead of your event date.',
    },
    {
      step: '03',
      title: 'Measurement Confirmation',
      detail: 'Review and confirm precision measurements for all fitted, corseted, tailored, and bridal garments.',
    },
    {
      step: '04',
      title: 'Alteration & Refund Terms',
      detail: 'Receive written confirmation of alteration allowances, revision windows, and the order cancellation policy.',
    },
    {
      step: '05',
      title: 'Traceable Payment',
      detail: 'Pay through verified business channels (Paystack gateway or official corporate bank account) for full transaction security.',
    },
  ],
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const ORDER_CLARITY_NOTE =
  'Before placing a custom order, request a written invoice, confirmed delivery date, measurement verification, alteration terms and refund policy. Pay through a traceable business account rather than relying only on unstructured discussions.';
