// Paystack Inline (popup) integration.
//
// The gateway activates automatically the moment a real public key is present
// in VITE_PAYSTACK_PUBLIC_KEY. Until the Paystack account is created (see
// docs/LAUNCH_RUNBOOK.md) the placeholder value keeps the storefront on the
// WhatsApp concierge flow, so checkout never breaks.

export interface PaystackSetupOptions {
  key: string;
  email: string;
  amount: number; // integer minor units (kobo)
  currency: string;
  ref: string;
  metadata?: Record<string, unknown>;
  onSuccess: (reference: string) => void;
  onCancel: () => void;
}

interface PaystackHandler {
  openIframe: () => void;
}

declare global {
  interface Window {
    PaystackPop?: () => { setup: (options: PaystackSetupOptions) => PaystackHandler };
  }
}

const PAYSTACK_INLINE_SRC = 'https://js.paystack.co/v1/inline.js';
let inlineLoadPromise: Promise<void> | null = null;

/** Returns the configured public key, or undefined while it is unset/placeholder. */
export function getPaystackPublicKey(): string | undefined {
  const key = ((import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string | undefined) || '').trim();
  if (!key || key.includes('your_')) return undefined;
  return key;
}

export function isPaystackConfigured(): boolean {
  return Boolean(getPaystackPublicKey());
}

/** Loads the official Paystack Inline script once; resolves when ready. */
export function loadPaystackInline(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('No window'));
  if (window.PaystackPop) return Promise.resolve();
  if (inlineLoadPromise) return inlineLoadPromise;

  inlineLoadPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = PAYSTACK_INLINE_SRC;
    script.async = true;
    script.onload = () => (window.PaystackPop ? resolve() : reject(new Error('Paystack Inline loaded but unavailable')));
    script.onerror = () => {
      inlineLoadPromise = null;
      reject(new Error('Could not load Paystack Inline. Check your connection and try again.'));
    };
    document.head.appendChild(script);
  });
  return inlineLoadPromise;
}

/**
 * Opens the Paystack checkout popup for an order.
 * `reference` doubles as the order number so the backend can reconcile the
 * transaction without extra state.
 */
export async function openPaystackCheckout(options: {
  email: string;
  amountKobo: number;
  reference: string;
  onSuccess: (reference: string) => void;
  onCancel: () => void;
}): Promise<void> {
  const key = getPaystackPublicKey();
  if (!key) throw new Error('Paystack is not configured.');

  await loadPaystackInline();
  const PaystackPop = window.PaystackPop;
  if (!PaystackPop) throw new Error('Paystack Inline unavailable.');

  PaystackPop().setup({
    key,
    email: options.email,
    amount: options.amountKobo,
    currency: 'NGN',
    ref: options.reference,
    metadata: {
      orderNumber: options.reference,
      custom_fields: [
        {
          display_name: 'Order Number',
          variable_name: 'order_number',
          value: options.reference,
        },
      ],
    },
    onSuccess: options.onSuccess,
    onCancel: options.onCancel,
  }).openIframe();
}
