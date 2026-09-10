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
    title: 'FABRIC SOURCING & FIBER PROVENANCE',
    subtitle: 'Pure Mulberry Silks & Imperial Vat Dyes',
    quote: 'We partner with master weavers across West Africa and artisanal mills in Como to spin heavy, light-refracting silks engineered for sculptural presence.',
    leadTailor: 'Master Weaver Chioma',
    details: [
      'Grade 6A 100% Raw Mulberry Silk & Wild Savanna Linen',
      'Non-toxic ancestral botanical indigofera & malachite vat dyes',
      'High-density 220–340 GSM weight for architectural drape',
    ],
    imageUrl: '/images/fc_editorial_detail.jpg',
    audioNoteDuration: '0:28',
    audioTranscript: 'Every bolt of silk is inspected under natural daylight for fiber alignment before entering the cutting room.',
    macroZoomUrl: '/images/fc_editorial_detail.jpg',
  },
  {
    step: '02 / 06',
    title: 'INITIAL SKETCH & SILHOUETTE ANATOMY',
    subtitle: 'From Charcoal Expression to Structural Form',
    quote: 'Design at Finaluchi begins with gesture. We don’t drape over forms; we sculpt forms that interact dynamically with the human body in motion.',
    leadTailor: 'Creative Director Uche',
    details: [
      'Sculptural waist contours and dramatic asymmetrical hemlines',
      'Integration of traditional royal regalia silhouettes with modern minimalism',
      'Dynamic balance calibrated for high-impact presence and ease of movement',
    ],
    imageUrl: '/images/fc_haute_soiree_gown.jpg',
    audioNoteDuration: '0:34',
    audioTranscript: 'A couture sketch is a blueprint of tension and release. The garment must breathe when walking into a room.',
    macroZoomUrl: '/images/fc_haute_soiree_gown.jpg',
  },
  {
    step: '03 / 06',
    title: 'PATTERN DRAFTING & BESPOKE GEOMETRY',
    subtitle: '48 Custom Measurements & Hand-Chalked Proportions',
    quote: 'Every curve is drafted by hand on heavy archival card, sculpted to contour the individual architecture of the client.',
    leadTailor: 'Master Pattern Maker Adebayo',
    details: [
      '48 individual anatomical measurement calibration points',
      'Zero-waste pattern nesting to honor precious artisanal silks',
      'Hand-chalked balance lines with millimeter precision',
    ],
    imageUrl: '/images/fc_atelier_craft.jpg',
    audioNoteDuration: '0:42',
    audioTranscript: 'We do not use standard commercial blocks. Every pattern drafted here is an original piece of technical geometry.',
    macroZoomUrl: '/images/fc_atelier_craft.jpg',
  },
  {
    step: '04 / 06',
    title: 'PRECISION CUTTING & GRAIN ALIGNMENT',
    subtitle: 'Single-Layer Shearing on Granite Tables',
    quote: 'Silks are settled for 48 hours, then cut singularly on hand-polished granite surfaces to prevent grain distortion.',
    leadTailor: 'Senior Cutter Folake',
    details: [
      'Single-ply shearing with hand-sharpened Japanese carbon steel shears',
      'Strict grain-line alignment ensuring the fabric falls without twisting',
      'Archival labeling for piece serialization and traceability',
    ],
    imageUrl: '/images/fc_atelier_craft.jpg',
    audioNoteDuration: '0:31',
    audioTranscript: 'Cutting silk is like surgery. Once the shear glides, the fabric has made its eternal commitment.',
    macroZoomUrl: '/images/fc_atelier_craft.jpg',
  },
  {
    step: '05 / 06',
    title: 'MASTER TAILORING & CANVASED CORSETRY',
    subtitle: 'Internal Sculptural Architecture & French Seams',
    quote: 'What is inside the garment is as exquisite as what is visible outside. Hand-stitched horsehair canvas and enclosed French seams give eternal shape.',
    leadTailor: 'Tailoring Lead Emeka',
    details: [
      'Internal floating canvasing and double-faced silk wool reinforcement',
      'Hand-rolled hems requiring 14 hours of continuous bench craftsmanship',
      'Stress-point reinforcement utilizing bonded silk filament thread',
    ],
    imageUrl: '/images/fc_editorial_detail.jpg',
    audioNoteDuration: '0:45',
    audioTranscript: 'You can feel the weight distribution immediately. It sits effortlessly on the shoulders without pulling.',
    macroZoomUrl: '/images/fc_editorial_detail.jpg',
  },
  {
    step: '06 / 06',
    title: 'HAND FINISHING, NFC PROVENANCE & PACKAGING',
    subtitle: 'Digital Certificate Verification & Champagne Keepsake Box',
    quote: 'Before dispatch, each piece is pressed with dry steam, embedded with an authenticated NFC token, and signed by the master tailor.',
    leadTailor: 'Atelier Director Kemi',
    details: [
      'Serialized physical NFC token matching cryptographic digital certificate',
      'Hand-signed atelier passport documenting craft hours and master tailor',
      'Signature Champagne Keepsake Box with breathable garment carrier',
    ],
    imageUrl: '/images/fc_editorial_monument.jpg',
    audioNoteDuration: '0:38',
    audioTranscript: 'When the client opens the box, they are not receiving a garment—they are welcoming a masterpiece of African haute couture.',
    macroZoomUrl: '/images/fc_editorial_monument.jpg',
  },
];
