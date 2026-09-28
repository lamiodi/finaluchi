// Legal, policy and FAQ content for Finaluchi Couture.
// Rendered by LegalPage / FaqPage and deep-linkable via #/privacy, #/terms,
// #/returns, #/shipping and #/faq.

export type PolicyId = 'privacy' | 'terms' | 'returns' | 'shipping';

export interface PolicySection {
  heading: string;
  body?: string[];
  bullets?: string[];
}

export interface PolicyDoc {
  id: PolicyId;
  title: string;
  kicker: string;
  updated: string;
  intro: string;
  sections: PolicySection[];
}

const UPDATED = '23 September 2026';
const CONTACT_LINE =
  'Questions about this policy? Contact the Finaluchi Couture studio on WhatsApp at +234 803 231 2961 or through the Contact page on this website.';

export const POLICIES: Record<PolicyId, PolicyDoc> = {
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    kicker: 'Client Data & Confidentiality',
    updated: UPDATED,
    intro:
      'Finaluchi Couture ("Finaluchi", "we", "us") is an Abuja-based Nigerian fashion house. This policy explains what personal information we collect when you browse finaluchi.com, place an order, book a consultation or join our Private Client Circle — and the care we take with it. It is written to comply with the Nigeria Data Protection Act (NDPA) 2023 and the Nigeria Data Protection Regulation (NDPR), and to meet the transparency standards expected by our international clients and payment partners.',
    sections: [
      {
        heading: '1. Information We Collect',
        body: [
          'We collect only the information needed to design, produce and deliver your garments, and to respond to your enquiries:',
        ],
        bullets: [
          'Order information: your name, delivery address, phone number, email, selected pieces, sizes or measurements, packaging preference and gift notes.',
          'Bespoke measurements: body measurements you choose to share for made-to-measure or fitting purposes. These are used solely to produce and fit your garment.',
          'Consultation requests: your name, phone number, preferred date and time, and any occasion notes you volunteer.',
          'Newsletter membership: your email address, if you join the Private Client Circle.',
          'Technical data: standard, minimal browser information (such as device type) needed to keep the website secure and functioning.',
        ],
      },
      {
        heading: '2. How We Use Your Information',
        bullets: [
          'To confirm, produce, package and deliver your orders, and to keep you informed of their progress.',
          'To arrange and conduct fittings and consultations, in person in Abuja or virtually.',
          'To send transactional messages (order confirmations, dispatch notices) about purchases you have made.',
          'To send Private Client Circle emails (collection previews and fitting invitations) — only if you subscribed, and with unsubscribe available on every email.',
          'To meet our legal, accounting and consumer-protection obligations in Nigeria.',
        ],
      },
      {
        heading: '3. Client Measurements Are Treated As Confidential',
        body: [
          'Measurements and bespoke design details you share with our atelier are confidential craftsmanship records. They are never sold, rented or used for advertising, and they are shared only with the artisans producing your garment.',
        ],
      },
      {
        heading: '4. Who We Share Information With',
        bullets: [
          'Delivery couriers (within Nigeria and international express partners such as DHL) receive only the name, address and phone needed to deliver your parcel.',
          'Our payment processor (Paystack, or our corporate bank) receives the details required to process and receipt payments. We never receive or store your full card details.',
          'Our email delivery provider sends transactional and newsletter emails on our behalf.',
          'We do not sell, rent or trade your personal information to anyone, for any reason.',
        ],
      },
      {
        heading: '5. How Long We Keep Information',
        body: [
          'Order and measurement records are retained while your garment is under production and for the period required by Nigerian tax and consumer law afterwards. Newsletter data is kept until you unsubscribe. You may ask us to delete your data at any time (see Your Rights below), subject to records we must legally retain.',
        ],
      },
      {
        heading: '6. Your Rights',
        bullets: [
          'Ask for a copy of the personal information we hold about you.',
          'Ask us to correct inaccurate details, including measurements.',
          'Ask us to delete your personal information where we are not legally required to keep it.',
          'Withdraw consent or unsubscribe from marketing at any time.',
          'Lodge a complaint with the Nigeria Data Protection Commission (NDPC).',
        ],
      },
      {
        heading: '7. Security',
        body: [
          'Orders are transmitted over encrypted connections and stored on access-controlled systems. Only authorised Finaluchi studio staff can view client records. No system is perfectly secure, but we design ours so that a breach would expose the minimum possible information.',
        ],
      },
      {
        heading: '8. Changes to This Policy',
        body: [
          `We may update this policy as our services grow. The version in force is always the one published on this page. Last updated: ${UPDATED}.`,
          CONTACT_LINE,
        ],
      },
    ],
  },

  terms: {
    id: 'terms',
    title: 'Terms of Service & Sale',
    kicker: 'The Contract Between You and the Atelier',
    updated: UPDATED,
    intro:
      'These terms govern your use of finaluchi.com and the sale of Finaluchi Couture garments and bespoke services. By placing an order or submitting a commission request through this website, WhatsApp, or any Finaluchi channel, you agree to these terms.',
    sections: [
      {
        heading: '1. How Orders Are Confirmed',
        body: [
          'Finaluchi operates a concierge-confirmed order model. Submitting your details on this website registers an order request; a binding contract of sale is formed only when the atelier confirms your order — in writing on WhatsApp or by email — with an official invoice stating the agreed pieces, specifications, price and delivery date. This protects both you and the atelier for made-to-order couture.',
        ],
      },
      {
        heading: '2. Pricing & Payment',
        bullets: [
          'All prices are quoted in Nigerian Naira (NGN) and include applicable Nigerian VAT for local orders.',
          'International orders are priced DDU (Delivered Duty Unpaid): you are responsible for local customs duties and import taxes where applicable.',
          'Payment is accepted through the Paystack payment gateway (card, bank transfer, USSD) or directly into our verified corporate bank account — details of which are confirmed on your written invoice.',
          'Never make payment to a personal account or an unverified number claiming to represent Finaluchi.',
        ],
      },
      {
        heading: '3. Production, Fittings & Delivery Times',
        body: [
          'Ready-to-wear pieces are dispatched once your order is confirmed and payment is received. Made-to-measure, bespoke and bridal commissions follow the production schedule agreed on your invoice, which depends on complexity, fabric sourcing and fitting sessions. The delivery date on your written invoice is the authoritative commitment.',
        ],
      },
      {
        heading: '4. Intellectual Property & Design Rights',
        body: [
          'All designs, patterns, embroideries, imagery and content on this website are the property of Finaluchi Couture and are protected by Nigerian and international intellectual property law. Reproducing our designs for commercial purposes, or reselling photographs of our work as your own, is prohibited. Client photographs shared with us may be featured on our channels only with your consent.',
        ],
      },
      {
        heading: '5. Cancellations & Changes',
        body: [
          'You may amend sizes, colours or delivery details free of charge any time before fabric is cut for your order. Cancellation terms before and after production begins are set out in our Returns & Alterations Policy, which forms part of these terms.',
        ],
      },
      {
        heading: '6. Liability',
        body: [
          'Our liability for any order is limited to the amount you paid for that order. We are not liable for indirect losses (for example, event-related costs). Nothing in these terms limits liability that cannot be limited under Nigerian law, including for death or personal injury caused by negligence.',
        ],
      },
      {
        heading: '7. Governing Law',
        body: [
          'These terms are governed by the laws of the Federal Republic of Nigeria. Any dispute will first be addressed directly with our studio so we can make things right; unresolved disputes fall under the jurisdiction of Nigerian courts.',
          CONTACT_LINE,
        ],
      },
    ],
  },

  returns: {
    id: 'returns',
    title: 'Returns, Alterations & Refunds',
    kicker: 'Couture Fairness, In Writing',
    updated: UPDATED,
    intro:
      'Finaluchi pieces are hand-tailored, often to your measurements — so returns work differently here than in mass fashion retail. This policy states exactly what you can expect, and it is reinforced by the written invoice you receive with every confirmed order.',
    sections: [
      {
        heading: '1. Ready-to-Wear Pieces',
        bullets: [
          'Unworn ready-to-wear pieces may be exchanged for a different size within 72 hours of delivery, with original tags attached and packaging intact.',
          'Where an exchange size is unavailable, we offer a store credit or a refund of the item price, excluding original delivery cost.',
          'Please inspect your piece on delivery and report any transit damage or defect within 24 hours so we can resolve it immediately.',
        ],
      },
      {
        heading: '2. Bespoke & Made-to-Measure Creations',
        bullets: [
          'Because bespoke pieces are crafted to your confirmed measurements and specifications, they are final sale and not eligible for return once fabric has been cut.',
          'Every bespoke piece includes complimentary fitting adjustments within 7 days of delivery, so your creation sits exactly as it should.',
          'If a piece does not match the written specifications on your invoice, we will correct or re-make it at our cost — that is the standard we hold ourselves to.',
        ],
      },
      {
        heading: '3. Changes & Cancellations',
        bullets: [
          'Before fabric is cut: order changes and cancellations are free, and any deposit is refunded in full.',
          'After fabric is cut, before production completes: cancellations are refunded minus direct material costs already committed, as itemised by the atelier.',
          'After production completes: bespoke pieces are final sale as above.',
        ],
      },
      {
        heading: '4. Refund Processing',
        body: [
          'Approved refunds are returned via the original payment channel — Paystack refunds typically settle within 5–10 business days; bank transfers within 3–5 business days. You will receive written confirmation when your refund is initiated.',
        ],
      },
      {
        heading: '5. How to Start a Return or Adjustment',
        body: [
          `Message the studio on WhatsApp at +234 803 231 2961 with your order number (e.g. FC-94820) and a photo of the piece. Every request is acknowledged within one business day.`,
        ],
      },
    ],
  },

  shipping: {
    id: 'shipping',
    title: 'Shipping & Delivery Policy',
    kicker: 'From the Abuja Atelier to You',
    updated: UPDATED,
    intro:
      'Every finished Finaluchi piece passes final quality inspection, is pressed, and is wrapped in our signature keepsake packaging before it travels. Delivery windows below are estimates after your order is confirmed and payment received; your written invoice remains the authoritative delivery commitment.',
    sections: [
      {
        heading: '1. Delivery Windows',
        bullets: [
          'Abuja (FCT): 1–2 business days — hand delivery or courier, often same-week for ready-to-wear.',
          'Lagos: 2–3 business days via insured express courier.',
          'Other Nigerian states: 3–5 business days via insured interstate courier.',
          'International (US, UK, Canada, Europe, UAE & more): 5–7 business days via DHL Express or equivalent.',
        ],
      },
      {
        heading: '2. Delivery Fees',
        bullets: [
          'Nigerian delivery is ₦15,000, complimentary on orders of ₦300,000 and above.',
          'International express delivery is a flat ₦85,000, confirmed on your invoice before payment.',
        ],
      },
      {
        heading: '3. Customs & Import Duties (International Orders)',
        body: [
          'International shipments are sent DDU (Delivered Duty Unpaid). Any customs duties, import taxes or handling fees in your destination country are the responsibility of the recipient and are not included in our prices. If you are unsure about your country\'s duties, contact the studio before ordering and we will help you estimate them.',
        ],
      },
      {
        heading: '4. Signature & Safe Delivery',
        body: [
          'Due to the value and bespoke nature of our garments, couriers require a signature upon delivery. Please ensure an authorised recipient is available at the delivery address, or arrange studio collection in Abuja where available.',
        ],
      },
      {
        heading: '5. Tracking Your Delivery',
        body: [
          'Use the Order Tracker on this website with your order number and the email used at checkout to follow your piece through the seven atelier stages. When your creation dispatches, you receive a dispatch notice by email with the courier and waybill number.',
          CONTACT_LINE,
        ],
      },
    ],
  },
};

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  category: string;
  items: FaqItem[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    category: 'Ordering & Payment',
    items: [
      {
        question: 'How do I place an order?',
        answer:
          'Add the pieces you love to your bag and complete the delivery details at checkout — this registers your order request and reserves your selections. The atelier then confirms availability, sizing, delivery date and payment on WhatsApp (or by email) and issues your official written invoice before any payment is taken.',
      },
      {
        question: 'Which payment methods do you accept?',
        answer:
          'Card, bank transfer and USSD through the Paystack payment gateway, or a direct transfer into our verified corporate bank account — the account details are confirmed on your written invoice. We strongly advise against paying into any personal account.',
      },
      {
        question: 'When am I charged?',
        answer:
          'Only after the atelier confirms your order in writing. You will never be charged automatically just for submitting a request through the website.',
      },
      {
        question: 'Can I order from outside Nigeria?',
        answer:
          'Yes — we deliver to the US, UK, Canada, Europe, the UAE and more via DHL Express (5–7 business days). International orders are priced DDU, meaning any local customs duties are settled by the recipient.',
      },
    ],
  },
  {
    category: 'Sizing, Fittings & Measurements',
    items: [
      {
        question: 'What sizes do ready-to-wear pieces come in?',
        answer:
          'Most ready-to-wear pieces are cut in UK 6–16, with each product page stating its exact size range. If you are between sizes or unsure, message the studio — we will compare your measurements to the pattern before you order.',
      },
      {
        question: 'How does made-to-measure work?',
        answer:
          'Select "Made to Measure" on any eligible piece at checkout or request it in your consultation. Our team takes you through measurement confirmation (a simple guide makes it easy, or book an Abuja fitting), and the garment is cut to your body. Every bespoke piece includes complimentary fitting adjustments within 7 days of delivery.',
      },
      {
        question: 'Do I need to visit the Abuja studio?',
        answer:
          'Not necessarily. Virtual consultations cover design, fabric and measurement guidance over a video call. In-person fittings at our Abuja flagship are recommended for bridal and heavily structured corsetry.',
      },
    ],
  },
  {
    category: 'Production & Delivery',
    items: [
      {
        question: 'How long does a custom piece take?',
        answer:
          'Simple customisations of ready-to-wear: about 1–2 weeks. Full bespoke and corseted occasion wear: 3–6 weeks. Bridal couture: 6–12 weeks including fittings. Your confirmed invoice states the guaranteed date for your specific order — always share your event date early so we can plan backwards from it.',
      },
      {
        question: 'How do I track my order?',
        answer:
          'Open the Order Tracker on this website and enter your order number (e.g. FC-94820) together with the email you used at checkout. You will see your piece move through all seven atelier stages — from order received to ready for collection or delivery.',
      },
      {
        question: 'What if my event is very soon?',
        answer:
          'Message the studio on WhatsApp before ordering. Rush production is sometimes possible for an agreed fee, and we will always tell you honestly whether your date is achievable.',
      },
    ],
  },
  {
    category: 'Fabrics & Care',
    items: [
      {
        question: 'Where do you source fabrics?',
        answer:
          'We combine premium sourced fabrics — silks, structured crepes and embellished laces — with indigenous Nigerian textiles, selected per commission. Each product page lists the fabric composition, and bespoke clients approve their fabric before cutting begins.',
      },
      {
        question: 'How should I care for my piece?',
        answer:
          'Each garment ships with its care instructions; as a rule, hand-embellished and corseted pieces are dry-clean only by a specialist, stored on a padded hanger and kept away from direct sunlight. Your keepsake box is designed for archival storage.',
      },
    ],
  },
];
