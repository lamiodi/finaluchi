// Financial and Luxury Formatters adhering strictly to integer NGN kobo (minor units)

export type SupportedDisplayCurrency = 'NGN' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AED';

// Fixed indicative exchange rates (Section 15.2: purely for client-side estimation)
export const INDICATIVE_RATES: Record<SupportedDisplayCurrency, { rateToNgn: number; symbol: string; prefix: string }> = {
  NGN: { rateToNgn: 1, symbol: '₦', prefix: 'NGN' },
  USD: { rateToNgn: 1600, symbol: '$', prefix: 'USD' },
  GBP: { rateToNgn: 2050, symbol: '£', prefix: 'GBP' },
  EUR: { rateToNgn: 1720, symbol: '€', prefix: 'EUR' },
  CAD: { rateToNgn: 1180, symbol: 'CA$', prefix: 'CAD' },
  AED: { rateToNgn: 435, symbol: 'AED ', prefix: 'AED' },
};

// Fabric/spec fields the atelier hasn't confirmed yet are stored as
// "To be confirmed" — never present an unknown spec to a shopper as fact.
export const isPlaceholderSpec = (value: string | number | null | undefined): boolean =>
  value == null || String(value).trim().toLowerCase() === 'to be confirmed';

/**
 * Format authoritative integer NGN kobo into currency string
 * e.g., 38000000 kobo -> ₦380,000
 */
export function formatKoboToNgn(kobo: number): string {
  const ngnAmount = Math.round(kobo / 100);
  return '₦' + ngnAmount.toLocaleString('en-NG');
}

/**
 * Format authoritative NGN kobo with indicative display currency
 * e.g., formatPriceWithDisplay(38000000, 'USD') -> "₦380,000 (approx. $238 USD)"
 */
export function formatPriceWithDisplay(kobo: number, displayCurrency: SupportedDisplayCurrency = 'NGN'): string {
  const ngnFormatted = formatKoboToNgn(kobo);
  
  if (displayCurrency === 'NGN') {
    return ngnFormatted;
  }
  
  const currInfo = INDICATIVE_RATES[displayCurrency];
  const ngnAmount = kobo / 100;
  const converted = Math.round(ngnAmount / currInfo.rateToNgn);
  
  return `${ngnFormatted} (approx. ${currInfo.symbol}${converted.toLocaleString()} ${displayCurrency})`;
}

/**
 * Generate unique luxury order number
 * e.g. FC-94820
 */
export function generateOrderNumber(): string {
  // Time-based prefix + random suffix: collision-proof across clients and
  // non-guessable (order numbers double as tracking keys and Paystack metadata).
  const time = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.floor(100 + Math.random() * 900);
  return `FC-${time}-${rand}`;
}

/* ------------------------------------------------------------------------
 * International destinations — indicative currency per delivery country.
 * Paystack always charges NGN; this only powers the "≈ in your currency" line.
 * ---------------------------------------------------------------------- */
const EUR_COUNTRIES = new Set(['FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'IE', 'PT', 'AT', 'FI', 'GR', 'LU']);

export function displayCurrencyForCountry(country: string): SupportedDisplayCurrency {
  const c = (country || 'NG').toUpperCase();
  if (c === 'NG') return 'NGN';
  if (c === 'GB') return 'GBP';
  if (c === 'CA') return 'CAD';
  if (c === 'AE') return 'AED';
  if (EUR_COUNTRIES.has(c)) return 'EUR';
  return 'USD';
}

/** Indicative conversion only, e.g. "≈ £118 GBP". */
export function formatIndicative(kobo: number, currency: SupportedDisplayCurrency): string {
  if (currency === 'NGN') return formatKoboToNgn(kobo);
  const info = INDICATIVE_RATES[currency];
  const converted = Math.round(kobo / 100 / info.rateToNgn);
  return `≈ ${info.symbol}${converted.toLocaleString()} ${currency}`;
}

/** Best-guess display currency from the browser time zone (no network call). */
export function detectDisplayCurrency(): SupportedDisplayCurrency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz === 'Africa/Lagos' || !tz) return 'NGN';
    if (tz === 'Europe/London') return 'GBP';
    if (tz === 'Asia/Dubai') return 'AED';
    if (/^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|Regina|St_Johns)/.test(tz)) return 'CAD';
    if (tz.startsWith('America/')) return 'USD';
    if (tz.startsWith('Europe/')) return 'EUR';
    return 'NGN';
  } catch {
    return 'NGN';
  }
}

/**
 * Generate serialized certificate number
 * e.g. FC-HS-2026-000142
 */
export function generateCertificateSerialNumber(prefix = 'FC-AT'): string {
  const num = Math.floor(100 + Math.random() * 900);
  const year = new Date().getFullYear();
  return `${prefix}-${year}-000${num}`;
}
