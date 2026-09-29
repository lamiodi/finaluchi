import React, { useState } from 'react';
import { Sparkles, CheckCircle2, MessageCircle, X, CreditCard, ShieldCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { BRAND, ORDER_CLARITY_NOTE, buildWhatsAppUrl } from '../../data/brand';
import { useAudioStore } from '../../stores/audioStore';
import { useOrderStore } from '../../stores/orderStore';
import { formatKoboToNgn } from '../../utils/formatters';
import { useModalA11y } from '../../lib/useModalA11y';
import { isPaystackConfigured, openPaystackCheckout } from '../../lib/paystack';
import { isApiConfigured, verifyPayment } from '../../lib/api';

interface PaystackPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  totalKobo: number;
  customerEmail: string;
  onPaymentComplete?: (orderNumber: string) => void;
}

export const PaystackPaymentModal: React.FC<PaystackPaymentModalProps> = ({
  isOpen,
  onClose,
  orderId,
  totalKobo,
  customerEmail,
  onPaymentComplete,
}) => {
  const { playTactileClick, playSuccessChime } = useAudioStore();
  const processPaystackSuccess = useOrderStore((s) => s.processPaystackSuccess);
  const panelRef = useModalA11y<HTMLDivElement>({ onClose, isOpen });

  const [isOpening, setIsOpening] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Placeholder keys (no Paystack account yet) keep the storefront on the
  // WhatsApp concierge flow — see docs/LAUNCH_RUNBOOK.md §1.
  const gatewayReady = isPaystackConfigured();

  if (!isOpen) return null;

  const handleContinueOnWhatsApp = () => {
    playTactileClick();
    const message = [
      'Hello Finaluchi Couture, I would like to confirm this website order before payment.',
      `Order reference: ${orderId}`,
      `Listed total: ${formatKoboToNgn(totalKobo)}`,
      `Email: ${customerEmail}`,
      'Please confirm the invoice, availability, delivery date, payment details, alteration terms and return or refund terms.',
    ].join('\n');

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const settleOrder = (reference: string) => {
    const order = processPaystackSuccess(orderId, reference);
    playSuccessChime();
    toast.success(`Payment confirmed — order ${orderId} is with the atelier.`);
    onPaymentComplete?.(order?.orderNumber || orderId);
  };

  const handlePayNow = async () => {
    playTactileClick();
    setIsOpening(true);
    try {
      await openPaystackCheckout({
        email: customerEmail,
        amountKobo: totalKobo,
        reference: orderId,
        onCancel: () => {
          setIsOpening(false);
          toast.info('Payment window closed — your order is saved and still pending.');
        },
        onSuccess: async (reference) => {
          setIsOpening(false);
          setIsVerifying(true);
          try {
            if (!isApiConfigured) {
              // No backend to verify against — record locally; the atelier
              // reconciles manually via the WhatsApp concierge.
              settleOrder(reference);
              return;
            }
            const result = await verifyPayment(reference);
            if (result?.ok) {
              settleOrder(reference);
            } else {
              // Popup succeeded but S2S verification could not confirm (network
              // or gateway lag). Keep the order pending — the signed webhook
              // settles it server-side and the client gets the confirmation email.
              toast.warning(
                'Payment window completed, but we could not confirm it automatically yet. Your order stays pending — the atelier will confirm it shortly (you may also reach us on WhatsApp).'
              );
            }
          } finally {
            setIsVerifying(false);
          }
        },
      });
    } catch (err: any) {
      setIsOpening(false);
      toast.error(err?.message || 'Could not open the payment window. Please try again.');
    }
  };

  const busy = isOpening || isVerifying;

  return (
    <div className="fixed inset-0 z-[800] flex items-center justify-center p-4 bg-noir/80 backdrop-blur-md animate-in fade-in duration-200 font-sans-luxury">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="paystack-title"
        tabIndex={-1}
        className="bg-white text-noir w-full max-w-md border border-black/20 shadow-2xl overflow-y-auto max-h-[92vh] outline-none"
      >
        <div className="bg-noir text-white p-5 flex items-center justify-between border-b border-white/10">
          <div>
            <span id="paystack-title" className="font-semibold tracking-widest uppercase text-xs text-white">
              {gatewayReady ? 'Secure Payment' : 'Confirm Your Finaluchi Order'}
            </span>
            <p className="text-[10px] text-white/60 font-mono-luxury mt-1">
              {gatewayReady ? 'Paystack secured checkout · NGN' : `Direct support from ${BRAND.location}`}
            </p>
          </div>
          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className="p-1.5 text-white/60 hover:text-white transition-colors"
            aria-label="Close order confirmation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-alabaster-subtle p-4 border border-black/10 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono-luxury text-muted uppercase block">Order Total</span>
              <span className="text-xl font-mono-luxury font-bold text-noir">{formatKoboToNgn(totalKobo)}</span>
            </div>
            <div className="text-right text-[11px] text-black/55 font-mono-luxury break-all">
              {customerEmail}
            </div>
          </div>

          {gatewayReady ? (
            <>
              <div className="p-4 bg-[#FBF9F5] border border-champagne/40 text-[#2B2319] flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-noir">Secured by Paystack</h3>
                  <p className="text-[11px] leading-relaxed text-black/75">
                    Card, bank transfer and USSD are charged in Naira. Your order is confirmed only after the payment is verified — you will receive a confirmation email from the atelier.
                  </p>
                </div>
              </div>

              <button
                onClick={handlePayNow}
                disabled={busy}
                className="w-full py-4 bg-noir text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-neutral-900 border border-noir transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {busy ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isVerifying ? 'Verifying payment…' : 'Opening secure checkout…'}
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Pay {formatKoboToNgn(totalKobo)} Now
                  </>
                )}
              </button>

              <button
                onClick={handleContinueOnWhatsApp}
                disabled={busy}
                className="w-full py-3 border border-black/15 text-noir text-[11px] font-semibold tracking-[0.15em] uppercase hover:border-noir transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <MessageCircle className="w-4 h-4" />
                Prefer the concierge? Confirm on WhatsApp
              </button>

              <p className="text-[10px] text-center text-muted font-mono-luxury">
                Reference {orderId} · Verified business line: {BRAND.whatsappDisplay}
              </p>
            </>
          ) : (
            <>
              <div className="p-4 bg-[#FBF9F5] border border-champagne/40 text-[#2B2319] flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-noir">Atelier Concierge Verification</h3>
                  <p className="text-[11px] leading-relaxed text-black/75">
                    Every Finaluchi creation is hand-tailored to order. Continue on WhatsApp to receive your official itemized invoice, review sizing specifications, and complete payment via verified corporate channels.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {['Confirm the item and selected size', 'Confirm production and delivery dates', 'Confirm alterations, returns and refunds'].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-black/70">
                    <CheckCircle2 className="w-3.5 h-3.5 text-bronze shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-black/55 leading-relaxed">{ORDER_CLARITY_NOTE}</p>

              <button
                onClick={handleContinueOnWhatsApp}
                className="w-full py-4 bg-noir text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-neutral-900 border border-noir transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Continue to WhatsApp Concierge
              </button>

              <p className="text-[10px] text-center text-muted font-mono-luxury">
                Verified business line: {BRAND.whatsappDisplay}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
