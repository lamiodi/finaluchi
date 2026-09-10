import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useOrderStore } from '../../stores/orderStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatKoboToNgn } from '../../utils/formatters';
import { toast } from 'sonner';

interface PaystackPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  totalKobo: number;
  customerEmail: string;
  onSuccess: (orderNumber: string, guestAccessToken: string) => void;
}

export const PaystackPaymentModal: React.FC<PaystackPaymentModalProps> = ({
  isOpen,
  onClose,
  orderId,
  totalKobo,
  customerEmail,
  onSuccess,
}) => {
  const [paymentChannel, setPaymentChannel] = useState<'CARD' | 'TRANSFER' | 'USSD' | 'APPLE_PAY'>('CARD');
  const [cardNumber, setCardNumber] = useState('5399 4100 8820 9482');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('824');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');

  const { processPaystackSuccess } = useOrderStore();
  const { playTactileClick, playSuccessChime } = useAudioStore();

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    playTactileClick();

    setProcessingStep('1/3 Initializing Paystack Transaction Reference...');

    setTimeout(() => {
      setProcessingStep('2/3 Executing Server-to-Server HMAC-SHA512 Verification...');
      
      setTimeout(() => {
        setProcessingStep('3/3 Converting Inventory Reservation & Generating Certificate...');
        
        setTimeout(() => {
          setIsProcessing(false);
          const gatewayRef = `FC_PSTK_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
          const confirmedOrder = processPaystackSuccess(orderId, gatewayRef);
          
          playSuccessChime();

          // Confetti celebration
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#C5A880', '#000000', '#FFFFFF', '#0A3D2E'],
          });

          toast.success(`Payment Verified! Order ${confirmedOrder.orderNumber} confirmed.`);
          onSuccess(confirmedOrder.orderNumber, confirmedOrder.guestAccessToken);
        }, 800);
      }, 900);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[800] flex items-center justify-center p-4 bg-[#000000]/80 backdrop-blur-md animate-in fade-in duration-200 font-sans-luxury">
      <div className="bg-[#FFFFFF] text-[#000000] w-full max-w-md border border-black/20 shadow-2xl overflow-hidden">
        
        {/* Paystack Header */}
        <div className="bg-[#000000] text-[#FFFFFF] p-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#FFFFFF] text-[#000000] flex items-center justify-center font-bold text-xs">
              P
            </div>
            <div>
              <span className="font-semibold tracking-widest uppercase text-xs text-white">
                PAYSTACK SECURED GATEWAY
              </span>
              <p className="text-[10px] text-white/60 font-mono-luxury">
                Finaluchi Couture Merchant ID: FC-LAGOS-LIVE
              </p>
            </div>
          </div>

          {!isProcessing && (
            <button
              onClick={() => {
                playTactileClick();
                onClose();
              }}
              className="p-1.5 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 bg-[#FFFFFF]">
          
          {/* Amount & Account */}
          <div className="bg-[#FAFAFA] p-4 border border-black/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono-luxury text-muted uppercase block">Authoritative Total</span>
              <span className="text-xl font-mono-luxury font-bold text-noir">{formatKoboToNgn(totalKobo)}</span>
            </div>
            <div className="text-right text-[11px] text-muted font-mono-luxury">
              <span>{customerEmail}</span>
            </div>
          </div>

          {/* Channel Tabs */}
          <div className="grid grid-cols-4 gap-1 border-b border-border pb-2 text-xs font-semibold">
            {[
              { id: 'CARD', label: 'Card' },
              { id: 'TRANSFER', label: 'Bank Transfer' },
              { id: 'USSD', label: 'USSD' },
              { id: 'APPLE_PAY', label: 'Apple Pay' },
            ].map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  playTactileClick();
                  setPaymentChannel(ch.id as any);
                }}
                className={`py-1.5 text-center transition-colors ${
                  paymentChannel === ch.id
                    ? 'border-b-2 border-noir text-noir font-bold'
                    : 'text-muted hover:text-noir'
                }`}
              >
                {ch.label}
              </button>
            ))}
          </div>

          {/* Processing Screen */}
          {isProcessing ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <Loader2 className="w-10 h-10 text-champagne animate-spin mx-auto" />
              <div className="space-y-1">
                <h4 className="font-sans-luxury text-lg font-semibold text-noir">Authorizing Payment...</h4>
                <p className="text-xs font-mono-luxury text-muted">{processingStep}</p>
              </div>
            </div>
          ) : (
            /* Payment Fields */
            <div className="space-y-4">
              {paymentChannel === 'CARD' && (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] font-mono-luxury text-muted uppercase block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs font-mono-luxury font-medium focus:outline-none focus:border-[#000000]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono-luxury text-black/60 uppercase block mb-1">Valid Thru</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs font-mono-luxury font-medium focus:outline-none focus:border-[#000000]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono-luxury text-black/60 uppercase block mb-1">CVV / CVC</label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs font-mono-luxury font-medium focus:outline-none focus:border-[#000000]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentChannel === 'TRANSFER' && (
                <div className="p-4 bg-[#FAFAFA] border border-black/10 text-xs space-y-2 font-mono-luxury">
                  <div className="text-black/60">Dynamic Virtual Account Created:</div>
                  <div className="font-bold text-sm text-[#000000]">WEMA BANK • 0294820194</div>
                  <div className="text-[11px] text-[#C5A880] font-semibold">Expires in 30 minutes</div>
                </div>
              )}

              {paymentChannel === 'USSD' && (
                <div className="p-4 bg-[#FAFAFA] border border-black/10 text-xs space-y-2 font-mono-luxury text-center">
                  <div className="text-black/60">Dial on your registered line:</div>
                  <div className="font-bold text-base text-[#000000]">*737*50*380000*9482#</div>
                </div>
              )}

              {paymentChannel === 'APPLE_PAY' && (
                <div className="p-4 bg-[#FAFAFA] border border-black/10 text-xs space-y-2 text-center">
                  <p className="text-black/60">Double click side button to confirm payment via Apple Pay.</p>
                </div>
              )}

              {/* Authorize Button */}
              <button
                onClick={handleSimulatePayment}
                className="w-full py-4 bg-[#000000] text-[#FFFFFF] text-xs font-bold tracking-[0.25em] uppercase hover:bg-neutral-900 border border-[#000000] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-white" />
                <span>AUTHORIZE {formatKoboToNgn(totalKobo)}</span>
              </button>
            </div>
          )}

          <div className="flex items-center justify-center gap-3 text-[10px] text-black/50 font-mono-luxury pt-1 border-t border-black/10">
            <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
            <span>PCI-DSS Level 1 Certified • 256-bit AES Encryption</span>
          </div>

        </div>

      </div>
    </div>
  );
};
