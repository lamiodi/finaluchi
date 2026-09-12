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
    title: 'START WITH THE OCCASION',
    subtitle: 'Your Event, Date & Direction',
    quote: 'Share what you are dressing for, when you need it and the silhouettes that feel most like you.',
    leadTailor: 'Finaluchi Couture',
    details: [
      'Send the event type and confirmed event date',
      'Share a product link, screenshot or reference from the collection',
      'Note your preferred colour, coverage and statement details',
    ],
    imageUrl: '/images/fc_editorial_monument.jpg',
    audioNoteDuration: 'Step note',
    audioTranscript: 'A clear event date and visual direction help the team recommend the right ordering path and timeline.',
    macroZoomUrl: '/images/fc_editorial_monument.jpg',
  },
  {
    step: '02 / 06',
    title: 'CONFIRM THE DESIGN DIRECTION',
    subtitle: 'Ready-to-Wear or Custom',
    quote: 'Choose an existing piece or discuss how a Finaluchi silhouette can be adapted for your occasion.',
    leadTailor: 'Finaluchi Couture',
    details: [
      'Confirm whether the piece is ready-to-wear or made for your order',
      'Agree the neckline, sleeves, train, embellishment and colour',
      'Request an itemised quote before committing',
    ],
    imageUrl: '/images/fc_haute_soiree_gown.jpg',
    audioNoteDuration: 'Step note',
    audioTranscript: 'Keep the agreed design details together in writing so both sides are working from the same brief.',
    macroZoomUrl: '/images/fc_haute_soiree_gown.jpg',
  },
  {
    step: '03 / 06',
    title: 'MEASUREMENTS & FIT CHECK',
    subtitle: 'Confirm the Correct Fit Route',
    quote: 'Accurate measurements are essential for fitted dresses, corsetry, tailored sets and bridal pieces.',
    leadTailor: 'Finaluchi Couture',
    details: [
      'Use the measurement method supplied by the Finaluchi team',
      'Confirm your chosen size or submit the requested measurements',
      'Ask whether an in-person or remote fitting check is needed',
    ],
    imageUrl: '/images/fc_atelier_craft.jpg',
    audioNoteDuration: 'Step note',
    audioTranscript: 'Do not estimate measurements for a custom piece. Confirm how and when each measurement should be taken.',
    macroZoomUrl: '/images/fc_atelier_craft.jpg',
  },
  {
    step: '04 / 06',
    title: 'INVOICE & TIMELINE APPROVAL',
    subtitle: 'Put the Order Terms in Writing',
    quote: 'Before payment, make sure the full order, cost and delivery expectations are clearly documented.',
    leadTailor: 'Finaluchi Couture',
    details: [
      'Request a written invoice and traceable business payment details',
      'Confirm the production and delivery date against your event',
      'Confirm alteration, cancellation and refund terms',
    ],
    imageUrl: '/images/fc_editorial_detail.jpg',
    audioNoteDuration: 'Step note',
    audioTranscript: 'A clear invoice and timeline protect the order and make follow-up easier throughout production.',
    macroZoomUrl: '/images/fc_editorial_detail.jpg',
  },
  {
    step: '05 / 06',
    title: 'PRODUCTION & FITTING',
    subtitle: 'Track the Agreed Milestones',
    quote: 'For custom work, stay aligned on fittings, progress updates and any approved changes to the original brief.',
    leadTailor: 'Finaluchi Couture',
    details: [
      'Keep your order reference and agreed timeline accessible',
      'Attend or complete fittings at the requested stage',
      'Approve changes in writing, including any change in price or delivery',
    ],
    imageUrl: '/images/fc_atelier_craft.jpg',
    audioNoteDuration: 'Step note',
    audioTranscript: 'Late design changes can affect fit, cost and delivery, so confirm any revision before work continues.',
    macroZoomUrl: '/images/fc_atelier_craft.jpg',
  },
  {
    step: '06 / 06',
    title: 'FINAL CHECK & HANDOVER',
    subtitle: 'Review Before Your Event',
    quote: 'Check the finished piece, fit and delivery details with enough time for any agreed adjustment.',
    leadTailor: 'Finaluchi Couture',
    details: [
      'Inspect the garment as soon as it is received or collected',
      'Report any fit concern within the agreed alteration window',
      'Store your invoice, care guidance and order conversation',
    ],
    imageUrl: '/images/fc_editorial_detail.jpg',
    audioNoteDuration: 'Step note',
    audioTranscript: 'Build a small buffer before the event date whenever possible, especially for bridal and highly fitted pieces.',
    macroZoomUrl: '/images/fc_editorial_detail.jpg',
  },
];
