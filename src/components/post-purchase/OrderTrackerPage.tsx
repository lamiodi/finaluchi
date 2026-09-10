import React, { useState } from 'react';
import { 
  CheckCircle2, ShieldCheck, QrCode, Sparkles, Package, 
  Scissors, Truck, UserCheck, Search, Lock 
} from 'lucide-react';
import { useOrderStore } from '../../stores/orderStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatKoboToNgn } from '../../utils/formatters';
import { CertificateModal } from './CertificateModal';
import { toast } from 'sonner';

interface OrderTrackerPageProps {
  initialOrderNumber?: string;
  onExploreCatalog?: () => void;
}

const ATELIER_JOURNEY_STAGES = [
  { stage: '01', title: 'ORDER CONFIRMED & S2S VERIFIED', desc: 'Paystack transaction reconciled; inventory allocated.', icon: CheckCircle2 },
  { stage: '02', title: 'MEASUREMENTS VERIFIED', desc: '48 anatomical points calibrated by Master Pattern Maker Adebayo.', icon: UserCheck },
  { stage: '03', title: 'PATTERN DRAFTING', desc: 'Hand-chalked structural geometry drafted on archival card.', icon: Scissors },
  { stage: '04', title: 'PRECISION CUTTING & SHEARING', desc: 'Single-layer shearing on hand-polished granite surfaces.', icon: Sparkles },
  { stage: '05', title: 'MASTER TAILORING & INTERNAL CORSETRY', desc: 'Bench hand-stitching with enclosed French seams & silk filament thread.', icon: Scissors },
  { stage: '06', title: 'SIGNATURE PACKAGING & NFC PAIRING', desc: 'Steamed, authenticated NFC chip assigned, encased in Champagne Keepsake Box.', icon: Package },
  { stage: '07', title: 'WHITE-GLOVE DISPATCH', desc: 'Handed to courier for delivery to client.', icon: Truck },
];

export const OrderTrackerPage: React.FC<OrderTrackerPageProps> = ({
  initialOrderNumber,
}) => {
  const [searchInput, setSearchInput] = useState(initialOrderNumber || 'FC-94820');
  const [isCertOpen, setIsCertOpen] = useState(false);

  const { orders, getOrderByNumber, getCertificateBySerial } = useOrderStore();
  const { playTactileClick } = useAudioStore();

  const currentOrder = getOrderByNumber(searchInput) || orders[0];
  const certificate = currentOrder?.certificateSerialNumber
    ? getCertificateBySerial(currentOrder.certificateSerialNumber)
    : undefined;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    if (!getOrderByNumber(searchInput)) {
      toast.error(`Order ${searchInput} not found. Please check order number.`);
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen text-[#000000] font-sans-luxury pb-24">
      
      {/* Top Banner */}
      <div className="bg-[#000000] text-[#FFFFFF] py-12 sm:py-16 px-4 sm:px-8 lg:px-12 border-b border-white/10">
        <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#C5A880] text-xs font-mono-luxury tracking-widest uppercase font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>POST-PURCHASE CRAFT JOURNEY</span>
            </div>
            <h1 className="font-sans-luxury text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              Atelier Order Tracker
            </h1>
            <p className="text-xs sm:text-sm text-white/70 font-light max-w-lg leading-relaxed">
              Follow the living creation of your haute couture garment inside our Lagos flagship workshop.
            </p>
          </div>

          {/* Search by Order Number Form */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                placeholder="Order Number (e.g. FC-94820)"
                className="bg-white/10 border border-white/20 px-4 py-3 text-xs text-white font-mono-luxury uppercase focus:outline-none focus:border-[#C5A880] w-full sm:w-64"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#FFFFFF] text-[#000000] text-xs font-bold tracking-widest uppercase hover:bg-neutral-200 transition-all flex items-center justify-center gap-1.5 shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>TRACK</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Order Details & Tracker Stage */}
      {currentOrder ? (
        <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left: 7-Stage Creation Progress Journey */}
            <div className="lg:col-span-8 bg-[#FFFFFF] p-6 sm:p-10 border border-black/10 space-y-8 rounded-none">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
                <div>
                  <span className="text-[10px] font-mono-luxury text-[#C5A880] uppercase tracking-widest block mb-1 font-semibold">
                    AUTHENTICATED CLIENT ORDER
                  </span>
                  <h2 className="font-sans-luxury text-2xl sm:text-3xl font-bold text-[#000000] uppercase tracking-tight">
                    ORDER #{currentOrder.orderNumber}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1.5 bg-[#000000] text-[#FFFFFF] text-xs font-mono-luxury font-semibold uppercase tracking-wider rounded-none">
                    STATUS: {currentOrder.orderStatus.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-black/60 font-mono-luxury">
                    Est. Dispatch: {currentOrder.estimatedDeliveryDate}
                  </span>
                </div>
              </div>

              {/* 7 Stages Stepper */}
              <div className="space-y-6">
                <span className="text-xs font-semibold tracking-loose-couture uppercase text-black block">
                  ATELIER WORKSHOP LIFECYCLE:
                </span>

                <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-black/10">
                  {ATELIER_JOURNEY_STAGES.map((stg, idx) => {
                    const isCompleted = idx < currentOrder.atelierCurrentStageIndex;
                    const isCurrent = idx === currentOrder.atelierCurrentStageIndex;

                    return (
                      <div key={stg.stage} className="relative group">
                        
                        {/* Step Marker Dot */}
                        <div
                          className={`absolute -left-6 top-0.5 w-5 h-5 rounded-none border flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-[#000000] border-[#000000] text-white'
                              : isCurrent
                              ? 'bg-[#C5A880] border-[#000000] text-[#000000] animate-pulse scale-110 shadow-sm'
                              : 'bg-white border-black/20 text-transparent'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 fill-current" />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-none bg-current" />
                          )}
                        </div>

                        {/* Stage Content */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono-luxury font-bold text-[#C5A880] uppercase">
                              STAGE 0{idx + 1}
                            </span>
                            <span className={`text-xs font-semibold tracking-couture uppercase ${isCurrent ? 'text-black font-bold' : isCompleted ? 'text-black/85' : 'text-muted'}`}>
                              {stg.title}
                            </span>
                            {isCurrent && (
                              <span className="px-2 py-0.5 bg-[#000000] text-white text-[9px] font-mono-luxury tracking-couture rounded-none uppercase">
                                IN PROGRESS (ATELIER BENCH 03)
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted font-light leading-relaxed">
                            {stg.desc}
                          </p>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Digital Certificate CTA */}
              {certificate && (
                <div className="p-6 bg-[#000000] text-white rounded-none border border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#C5A880] text-xs font-semibold tracking-couture uppercase">
                      <QrCode className="w-4 h-4" />
                      <span>SERIALIZED DIGITAL CERTIFICATE OF AUTHENTICITY</span>
                    </div>
                    <p className="text-xs text-white/80 font-mono-luxury">
                      Serial: {certificate.serialNumber} • Registered to {certificate.registeredOwner}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      playTactileClick();
                      setIsCertOpen(true);
                    }}
                    className="px-5 py-2.5 bg-white text-black text-xs font-bold tracking-couture uppercase hover:bg-neutral-200 transition-all rounded-none whitespace-nowrap border border-white"
                  >
                    VIEW DIGITAL CERTIFICATE
                  </button>
                </div>
              )}

            </div>

            {/* Right: Order Invoices, Items Snapshot & Shipping Summary */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Order Items Snapshot */}
              <div className="bg-[#FFFFFF] p-6 border border-black/10 rounded-none space-y-4">
                <h3 className="text-xs font-semibold tracking-loose-couture uppercase text-black border-b border-black/10 pb-2">
                  PIECES IN THIS ORDER
                </h3>

                <div className="space-y-4 divide-y divide-black/10">
                  {currentOrder.items.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex gap-3">
                      <img
                        src={item.heroImageUrl}
                        alt={item.productNameSnapshot}
                        className="w-14 h-18 object-cover rounded-none"
                      />
                      <div className="flex-1 space-y-1 text-xs">
                        <h4 className="font-sans-luxury font-semibold text-black line-clamp-1">
                          {item.productNameSnapshot}
                        </h4>
                        <div className="text-[10px] text-muted font-mono-luxury">
                          {item.colorNameSnapshot}
                        </div>
                        <div className="text-[10px] text-muted font-mono-luxury">
                          Size: {item.sizeSnapshot} (Qty: {item.quantity})
                        </div>
                        <div className="text-xs font-mono-luxury font-bold text-black pt-1">
                          {formatKoboToNgn(item.unitPriceKobo * item.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Financial Totals */}
                <div className="pt-4 border-t border-black/10 space-y-1.5 text-xs font-mono-luxury">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal:</span>
                    <span>{formatKoboToNgn(currentOrder.subtotalKobo)}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Packaging ({currentOrder.packagingType}):</span>
                    <span>Complimentary</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Shipping:</span>
                    <span>{currentOrder.shippingKobo === 0 ? 'Complimentary' : formatKoboToNgn(currentOrder.shippingKobo)}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>VAT (7.5%):</span>
                    <span>{formatKoboToNgn(currentOrder.taxKobo)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-black/10">
                    <span>Total Paid (NGN):</span>
                    <span>{formatKoboToNgn(currentOrder.totalKobo)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="bg-[#FFFFFF] p-6 border border-black/10 rounded-none space-y-3 text-xs">
                <h3 className="font-semibold tracking-loose-couture uppercase text-black border-b border-black/10 pb-2">
                  DELIVERY DESTINATION
                </h3>
                <div className="space-y-1 text-muted">
                  <div className="font-medium text-black">{currentOrder.shippingAddress.fullName}</div>
                  <div>{currentOrder.shippingAddress.addressLine1}</div>
                  <div>{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state}</div>
                  <div>Country: {currentOrder.shippingAddress.country}</div>
                  <div className="pt-1 font-mono-luxury text-black">{currentOrder.shippingAddress.phone}</div>
                </div>

                <div className="p-3 bg-[#FAFAFA] border border-black/10 rounded-none text-[11px] font-mono-luxury text-muted flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Paystack Ref: {currentOrder.gatewayReference || 'FC_PSTK_VERIFIED'}</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : null}

      {/* Digital Certificate Modal */}
      {certificate && (
        <CertificateModal
          isOpen={isCertOpen}
          onClose={() => setIsCertOpen(false)}
          certificate={certificate}
        />
      )}

    </div>
  );
};
