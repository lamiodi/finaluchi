import React, { useRef, useState } from 'react';
import { AlertCircle, X, CreditCard, ShieldCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAudioStore } from '../../stores/audioStore';
import { useOrderStore } from '../../stores/orderStore';
import { formatKoboToNgn } from '../../utils/formatters';
import { useModalA11y } from '../../lib/useModalA11y';
import { getPaystackPublicKey, isPaystackConfigured, openPaystackCheckout } from '../../lib/paystack';
import { getPaymentGatewayConfig, isApiConfigured, registerOrder, verifyPayment } from '../../lib/api';
import { Order } from '../../types';

interface PaystackPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  totalKobo: number;
  customerEmail: string;
  onPaymentComplete?: (orderNumber: string) => void;
}

export const PaystackPaymentModal: React.FC<PaystackPaymentModalProps> = ({
  isOpen, onClose, orderId, totalKobo, customerEmail, onPaymentComplete,
}) => {
  const { playTactileClick, playSuccessChime } = useAudioStore();
  const { processPaystackSuccess, getOrderByNumber, mergeRemoteOrder } = useOrderStore();
  const [isOpening, setIsOpening] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [pendingReference, setPendingReference] = useState(() => getOrderByNumber(orderId)?.gatewayReference || '');
  const busyRef = useRef(false);
  const busy = isOpening || isVerifying;
  // Release our focus trap while Paystack's own iframe owns focus.
  const panelRef = useModalA11y<HTMLDivElement>({
    onClose: () => { if (!busyRef.current) onClose(); },
    isOpen: isOpen && !isOpening,
  });
  const gatewayReady = isPaystackConfigured() && isApiConfigured;
  const testMode = getPaystackPublicKey()?.startsWith('pk_test_');

  if (!isOpen) return null;

  const settleOrder = (order: Order, reference: string) => {
    // Called only with a successful, matching server-verified order.
    mergeRemoteOrder(order);
    processPaystackSuccess(orderId, reference);
    // Preserve fulfillment progress on repeated verification.
    mergeRemoteOrder(order);
    playSuccessChime();
    toast.success(`Payment confirmed — order ${orderId} is with the atelier.`);
    onPaymentComplete?.(order.orderNumber);
  };

  const confirmPayment = async (reference: string) => {
    setIsVerifying(true);
    try {
      const result = await verifyPayment(reference);
      if (result?.ok && result.order?.orderNumber === orderId && result.order.paymentStatus === 'PAYMENT_SUCCESSFUL') {
        settleOrder(result.order, reference);
      } else {
        setError('Your payment has not been confirmed yet. Use “Check payment status” to retry verification. Do not pay again.');
      }
    } catch {
      setError('We could not check your payment. Check your connection, then use “Check payment status”. Do not pay again.');
    } finally {
      setIsVerifying(false);
      busyRef.current = false;
    }
  };

  const handlePayNow = async () => {
    if (busyRef.current || !gatewayReady) return;
    busyRef.current = true;
    setError('');
    playTactileClick();
    if (pendingReference) {
      await confirmPayment(pendingReference);
      return;
    }
    setIsOpening(true);
    try {
      const config = await getPaymentGatewayConfig();
      if (!config?.configured || config.mode !== (testMode ? 'test' : 'live')) {
        throw new Error('The payment service is not ready for this checkout. Please try again later. You have not been charged.');
      }
      const localOrder = getOrderByNumber(orderId);
      const serverOrder = localOrder ? await registerOrder(localOrder, true) : null;
      if (!serverOrder) throw new Error('We could not register your order. Please check your connection and try again. You have not been charged.');
      if (serverOrder.paymentStatus === 'PAYMENT_SUCCESSFUL') {
        settleOrder(serverOrder, serverOrder.gatewayReference || '');
        setIsOpening(false);
        busyRef.current = false;
        return;
      }
      mergeRemoteOrder(serverOrder);
      await openPaystackCheckout({
        email: serverOrder.customerEmail,
        amountKobo: serverOrder.totalKobo,
        reference: serverOrder.orderNumber,
        customerName: serverOrder.customerFullName,
        customerPhone: serverOrder.customerPhone,
        country: serverOrder.shippingAddress.country,
        onCancel: () => {
          setIsOpening(false);
          busyRef.current = false;
          toast.info('Payment window closed — your order and bag are saved. You can try again.');
        },
        onSuccess: (reference) => {
          // Persist before verification so reload checks this payment.
          mergeRemoteOrder({ ...serverOrder, gatewayReference: reference });
          setPendingReference(reference);
          setIsOpening(false);
          void confirmPayment(reference);
        },
      });
    } catch (err) {
      setIsOpening(false);
      busyRef.current = false;
      setError(err instanceof Error ? err.message : 'Could not open Paystack. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[800] flex items-center justify-center p-4 bg-noir/80 backdrop-blur-md font-sans-luxury">
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="paystack-title" aria-busy={busy}
        tabIndex={-1} className="bg-white text-noir w-full max-w-md border border-black/20 shadow-2xl overflow-y-auto max-h-[92vh] outline-none">
        <div className="bg-noir text-white p-5 flex items-center justify-between">
          <div>
            <h2 id="paystack-title" className="font-semibold tracking-widest uppercase text-sm">Secure payment</h2>
            <p className="text-sm text-white/80 mt-1">Paystack checkout · NGN{testMode ? ' · Test mode' : ''}</p>
          </div>
          <button onClick={onClose} disabled={busy} className="p-3 text-white hover:bg-white/10 disabled:opacity-50"
            aria-label="Close payment"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-5">
          <div className="bg-alabaster-subtle p-4 flex flex-wrap items-center justify-between gap-3">
            <div><span className="text-sm text-black/75 block">Order total</span>
              <span className="text-xl font-mono-luxury font-bold">{formatKoboToNgn(totalKobo)}</span></div>
            <div className="text-sm text-black/75 break-all">{customerEmail}</div>
          </div>
          <div className="flex items-start gap-3 text-sm leading-relaxed">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
            <p>Pay securely by card, bank transfer or another available Paystack method. Your order is confirmed after payment verification.</p>
          </div>
          {testMode && <p className="text-sm text-black/75">Test checkout is active. Use Paystack test payment details.</p>}
          {!gatewayReady && <p role="alert" className="text-sm leading-relaxed text-red-800">Secure payment is temporarily unavailable. Please try again later. Your order is saved and no payment has been taken.</p>}
          {error && <div role="alert" className="flex items-start gap-2 text-sm leading-relaxed text-red-800">
            <AlertCircle className="w-5 h-5 shrink-0" /><p>{error}</p></div>}
          <button onClick={handlePayNow} disabled={busy || !gatewayReady}
            className="w-full py-4 px-3 bg-noir text-white text-sm font-semibold hover:bg-neutral-800 flex items-center justify-center gap-2 disabled:opacity-60">
            {busy ? <><Loader2 className="w-4 h-4 animate-spin" />{isVerifying ? 'Verifying payment…' : 'Opening Paystack…'}</>
              : pendingReference ? 'Check payment status'
              : <><CreditCard className="w-4 h-4" />Pay {formatKoboToNgn(totalKobo)} with Paystack</>}
          </button>
          <p className="text-sm text-center text-black/75 break-all">Order reference: {orderId}</p>
        </div>
      </div>
    </div>
  );
};
