import React from 'react';
import { Sparkles, CheckCircle2, MessageCircle, X } from 'lucide-react';
import { BRAND, ORDER_CLARITY_NOTE, buildWhatsAppUrl } from '../../data/brand';
import { useAudioStore } from '../../stores/audioStore';
import { formatKoboToNgn } from '../../utils/formatters';

interface PaystackPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  totalKobo: number;
  customerEmail: string;
}

export const PaystackPaymentModal: React.FC<PaystackPaymentModalProps> = ({
  isOpen,
  onClose,
  orderId,
  totalKobo,
  customerEmail,
}) => {
  const { playTactileClick } = useAudioStore();

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

  return (
    <div className="fixed inset-0 z-[800] flex items-center justify-center p-4 bg-[#000000]/80 backdrop-blur-md animate-in fade-in duration-200 font-sans-luxury">
      <div className="bg-[#FFFFFF] text-[#000000] w-full max-w-md border border-black/20 shadow-2xl overflow-hidden">
        <div className="bg-[#000000] text-[#FFFFFF] p-5 flex items-center justify-between border-b border-white/10">
          <div>
            <span className="font-semibold tracking-widest uppercase text-xs text-white">
              Confirm Your Finaluchi Order
            </span>
            <p className="text-[10px] text-white/60 font-mono-luxury mt-1">
              Direct support from {BRAND.location}
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
          <div className="bg-[#FAFAFA] p-4 border border-black/10 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono-luxury text-black/50 uppercase block">Order Total</span>
              <span className="text-xl font-mono-luxury font-bold text-noir">{formatKoboToNgn(totalKobo)}</span>
            </div>
            <div className="text-right text-[11px] text-black/55 font-mono-luxury break-all">
              {customerEmail}
            </div>
          </div>

          <div className="p-4 bg-[#FBF9F5] border border-[#C5A880]/40 text-[#2B2319] flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
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
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A67C4A] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-black/55 leading-relaxed">{ORDER_CLARITY_NOTE}</p>

          <button
            onClick={handleContinueOnWhatsApp}
            className="w-full py-4 bg-[#000000] text-[#FFFFFF] text-xs font-bold tracking-[0.2em] uppercase hover:bg-neutral-900 border border-[#000000] transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Continue to WhatsApp Concierge
          </button>

          <p className="text-[10px] text-center text-black/50 font-mono-luxury">
            Verified business line: {BRAND.whatsappDisplay}
          </p>
        </div>
      </div>
    </div>
  );
};
