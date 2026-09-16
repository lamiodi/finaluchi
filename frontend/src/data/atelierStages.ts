export interface AtelierStage {
  step: string;
  title: string;
  subtitle: string;
  quote: string;
  leadTailor: string;
  details: string[];
  imageUrl: string;
  audioNoteDuration: string;
  audioTranscript: string;
  macroZoomUrl: string;
}

export const ATELIER_STAGES: AtelierStage[] = [
  {
    step: '01 / 06',
    title: 'SHARE YOUR OCCASION & DATE',
    subtitle: 'Event Timing & Aesthetic Brief',
    quote: 'Tell us what you are dressing for, your event date, and the silhouette that captures your presence.',
    leadTailor: 'Finaluchi Abuja Atelier',
    details: [
      'Share your confirmed event date and occasion type (Asoebi, Gala, Bridal, Dinner)',
      'Provide reference photos or product links from the Finaluchi collection',
      'Specify preferred color palette, modesty requirements, and statement sleeve or train preferences',
    ],
    imageUrl: '/images/fc_editorial_monument.jpg',
    audioNoteDuration: 'Consultation Brief',
    audioTranscript: 'Locking in your event date allows our Abuja atelier to reserve craft bench time and plan guaranteed delivery.',
    macroZoomUrl: '/images/fc_editorial_monument.jpg',
  },
  {
    step: '02 / 06',
    title: 'DESIGN & CORSETRY SPECIFICATION',
    subtitle: 'Ready-to-Wear or Custom Couture',
    quote: 'Choose an existing archival silhouette or collaborate on a bespoke adaptation with custom boning and embellishment.',
    leadTailor: 'Finaluchi Abuja Atelier',
    details: [
      'Confirm whether your piece is standard ready-to-wear sizing or made-to-measure',
      'Agree on neckline curvature, sleeve drama, internal boned corset stays, and train length',
      'Receive an itemised breakdown of fabric, hand-beading, and craftsmanship before committing',
    ],
    imageUrl: '/images/fc_haute_soiree_gown.jpg',
    audioNoteDuration: 'Design Alignment',
    audioTranscript: 'Every custom design detail is documented in writing to ensure perfection between client vision and atelier execution.',
    macroZoomUrl: '/images/fc_haute_soiree_gown.jpg',
  },
  {
    step: '03 / 06',
    title: 'MEASUREMENT VALIDATION',
    subtitle: 'Anatomical Precision for Sculpted Fits',
    quote: 'Accurate measurements are the backbone of Nigerian occasion wear—ensuring corsetry holds effortlessly and silhouettes sculpt naturally.',
    leadTailor: 'Finaluchi Abuja Atelier',
    details: [
      'Follow our comprehensive anatomical measurement guide provided on WhatsApp',
      'Confirm bust apex, underbust, waist, high hip, full hip, and shoulder-to-hem with shoes',
      'Option to schedule an in-person fitting at our Abuja studio or an assisted virtual measurement check',
    ],
    imageUrl: '/images/fc_atelier_craft.jpg',
    audioNoteDuration: 'Fit Validation',
    audioTranscript: 'Never estimate measurements for corseted or bridal couture. We verify all key proportions before fabric cutting.',
    macroZoomUrl: '/images/fc_atelier_craft.jpg',
  },
  {
    step: '04 / 06',
    title: 'WRITTEN INVOICE & TERMS APPROVAL',
    subtitle: 'Transparent Terms & Traceable Payment',
    quote: 'Prior to payment, every order is documented with an official invoice, confirmed delivery schedule, alteration terms, and refund policy.',
    leadTailor: 'Finaluchi Abuja Atelier',
    details: [
      'Receive an official written invoice stating the garment specifications and total cost',
      'Written confirmation of guaranteed delivery date scheduled safely before your event',
      'Explicit alteration terms, adjustment allowances, and cancellation/refund conditions',
      'Traceable payment through verified business channels (Paystack or official corporate bank account)',
    ],
    imageUrl: '/images/fc_editorial_detail.jpg',
    audioNoteDuration: 'Buyer Protection',
    audioTranscript: 'A written invoice and payment through a traceable business account protect your investment and ensure mutual accountability.',
    macroZoomUrl: '/images/fc_editorial_detail.jpg',
  },
  {
    step: '05 / 06',
    title: 'ATELIER PRODUCTION & FITTING MILESTONES',
    subtitle: 'Master Craftsmanship in Motion',
    quote: 'Follow the progress of your piece as our Abuja master artisans cut, bone, sculpt, and hand-embellish your garment.',
    leadTailor: 'Finaluchi Abuja Atelier',
    details: [
      'Receive milestone photo and video updates from the atelier cutting and beading floor',
      'Mid-production fitting review for custom bridal and complex corseted occasion gowns',
      'Formal sign-off on any requested modifications prior to final seam closure',
    ],
    imageUrl: '/images/fc_atelier_craft.jpg',
    audioNoteDuration: 'Craftsmanship Tracking',
    audioTranscript: 'We keep open communication during tailoring so you know exactly where your piece is along the production journey.',
    macroZoomUrl: '/images/fc_atelier_craft.jpg',
  },
  {
    step: '06 / 06',
    title: 'FINAL QUALITY INSPECTION & DISPATCH',
    subtitle: 'Handover & Event-Ready Confidence',
    quote: 'Every finished creation undergoes rigorous quality inspection before being steamed, packed in protective packaging, and delivered.',
    leadTailor: 'Finaluchi Abuja Atelier',
    details: [
      'Thorough inspection of seams, boning reinforcement, beadwork security, and hemline drop',
      'Direct dispatch via tracked courier across Nigeria and worldwide, or scheduled studio pickup in Abuja',
      'Dedicated post-delivery support with an agreed alteration window if fine adjustments are required',
    ],
    imageUrl: '/images/fc_editorial_detail.jpg',
    audioNoteDuration: 'Delivery Assurance',
    audioTranscript: 'We deliver your finished creation with ample time before your event date so you can step out with absolute confidence.',
    macroZoomUrl: '/images/fc_editorial_detail.jpg',
  },
];
