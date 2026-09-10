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
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `FC-${rand}`;
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
