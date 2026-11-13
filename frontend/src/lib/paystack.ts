// Paystack Inline (popup) integration.
//
// Vite maps PAYSTACK_PUBLIC_KEY (or VITE_PAYSTACK_PUBLIC_KEY) to this
// explicitly allowlisted browser value at build time.

export interface PaystackCallbackResponse {
  reference?: string;
  trxref?: string;
  trans?: string;
  transaction?: string;
  status?: string;
  message?: string;
}

export interface PaystackSetupOptions {
  key: string;
  email: string;
  amount: number; // integer minor units (kobo)
  currency: string;
  ref: string;
  metadata?: Record<string, unknown>;
  // Paystack Inline v1 (https://js.paystack.co/v1/inline.js) uses `callback` + `onClose`
  callback?: (response: PaystackCallbackResponse | string) => void;
  onClose?: () => void;
  // Paystack Inline v2 / wrapper compatibility
  onSuccess?: (response: PaystackCallbackResponse | string) => void;
  onCancel?: () => void;
}

interface PaystackHandler {
  openIframe: () => void;
}

type PaystackGlobal = {
  setup?: (options: PaystackSetupOptions) => PaystackHandler;
} & (() => { setup: (options: PaystackSetupOptions) => PaystackHandler });

declare global {
  interface Window {
    PaystackPop?: PaystackGlobal;
  }
}

const PAYSTACK_INLINE_SRC = 'https://js.paystack.co/v1/inline.js';
let inlineLoadPromise: Promise<void> | null = null;

/** Returns the configured public key, or undefined while it is unset/placeholder. */
export function getPaystackPublicKey(): string | undefined {
  const key = ((import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string | undefined) || '').trim();
  if (!/^pk_(test|live)_[a-z0-9]+$/i.test(key) || /^pk_(test|live)_x+$/i.test(key)) return undefined;
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
    const fail = (message: string) => {
      window.clearTimeout(timeout);
      script.remove();
      inlineLoadPromise = null;
      reject(new Error(message));
    };
    const timeout = window.setTimeout(() => fail('Paystack took too long to load. Check your connection and try again.'), 20000);
    script.onload = () => {
      window.clearTimeout(timeout);
      if (window.PaystackPop) resolve();
      else fail('Paystack Inline loaded but unavailable. Please try again.');
    };
    script.onerror = () => fail('Could not load Paystack Inline. Check your connection and try again.');
    document.head.appendChild(script);
  });
  return inlineLoadPromise;
}

/**
 * Opens the Paystack checkout popup for an order.
 * Each attempt gets a unique transaction reference (`<orderNumber>-<stamp>`)
 * because Paystack rejects a reused reference — so a client who closes the
 * popup can retry. The order number travels in metadata, which is what the
 * backend verify endpoint and webhook use to find the order.
 */
export async function openPaystackCheckout(options: {
  email: string;
  amountKobo: number;
  reference: string; // order number
  customerName?: string;
  customerPhone?: string;
  country?: string;
  onSuccess: (reference: string) => void;
  onCancel: () => void;
}): Promise<void> {
  const key = getPaystackPublicKey();
  if (!key) throw new Error('Paystack is not configured.');
  if (!Number.isSafeInteger(options.amountKobo) || options.amountKobo <= 0) {
    throw new Error('The order total is invalid. Please review your order.');
  }

  await loadPaystackInline();
  const PaystackPop = window.PaystackPop;
  if (!PaystackPop) throw new Error('Paystack Inline unavailable.');

  const orderNumber = options.reference;
  const attemptRef = `${orderNumber}-${crypto.randomUUID()}`;

  let settled = false;
  const handleSuccess = (res: PaystackCallbackResponse | string) => {
    if (settled) return;
    settled = true;
    const resolvedRef =
      typeof res === 'string'
        ? res
        : res?.reference || res?.trxref || attemptRef;
    options.onSuccess(resolvedRef);
  };

  const handleClose = () => {
    if (settled) return;
    settled = true;
    options.onCancel();
  };

  const setupOptions: PaystackSetupOptions = {
    key,
    email: options.email,
    amount: Math.round(options.amountKobo),
    currency: 'NGN',
    ref: attemptRef,
    metadata: {
      orderNumber,
      customerName: options.customerName,
      customerPhone: options.customerPhone,
      deliveryCountry: options.country || 'NG',
      custom_fields: [
        {
          display_name: 'Order Number',
          variable_name: 'order_number',
          value: orderNumber,
        },
        {
          display_name: 'Delivery Country',
          variable_name: 'delivery_country',
          value: options.country || 'NG',
        },
      ],
    },
    callback: handleSuccess,
    onClose: handleClose,
    onSuccess: handleSuccess,
    onCancel: handleClose,
  };

  const handler =
    typeof PaystackPop.setup === 'function'
      ? PaystackPop.setup(setupOptions)
      : PaystackPop().setup(setupOptions);

  handler.openIframe();
}
