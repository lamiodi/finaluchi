import React, { useState } from 'react';
import { X, Lock, CreditCard, AlertCircle } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useOrderStore } from '../../stores/orderStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatKoboToNgn, formatPriceWithDisplay } from '../../utils/formatters';
import { ShippingAddress } from '../../types';
import { toast } from 'sonner';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentInitiated: (orderId: string, totalKobo: number, customerEmail: string) => void;
}

const NIGERIAN_STATES = [
  'FCT (Abuja)', 'Lagos', 'Rivers', 'Oyo', 'Anambra', 'Delta', 'Enugu', 'Kano',
  'Kaduna', 'Ogun', 'Edo', 'Akwa Ibom', 'Imo', 'Abia', 'Cross River',
  'Ondo', 'Osun', 'Ekiti', 'Kwara', 'Plateau', 'Bayelsa', 'Benue', 'Borno',
  'Bauchi', 'Gombe', 'Jigawa', 'Kebbi', 'Kogi', 'Katsina', 'Nasarawa', 'Niger',
  'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'Adamawa', 'Ebonyi'
];

const INTL_COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'GH', name: 'Ghana' },
  { code: 'IT', name: 'Italy' },
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onPaymentInitiated,
}) => {
  const {
    items,
    packagingType,
    isGift,
    giftMessage,
    getSubtotalKobo,
    getPackagingKobo,
    getShippingKobo,
    getTaxKobo,
    getTotalKobo,
  } = useCartStore();

  const { displayCurrency } = useCurrencyStore();
  const { createOrder } = useOrderStore();
  const { playTactileClick } = useAudioStore();

  // Form State
  const [country, setCountry] = useState<'NG' | string>('NG');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('FCT (Abuja)');
  const [city, setCity] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [landmarkNotes, setLandmarkNotes] = useState('');

  if (!isOpen || items.length === 0) return null;

  const subtotal = getSubtotalKobo();
  const packaging = getPackagingKobo();
  const shipping = getShippingKobo(country);
  const tax = getTaxKobo(country);
  const total = getTotalKobo(country);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !phone.trim() || !city.trim() || !addressLine1.trim()) {
      toast.error('Please complete all required delivery details.');
      return;
    }

    if (country !== 'NG' && !postalCode.trim() && country !== 'AE') {
      toast.error('Postal / ZIP Code is required for international delivery.');
      return;
    }

    playTactileClick();

    const shippingAddress: ShippingAddress = {
      fullName,
      email,
      phone,
      country,
      state,
      city,
      addressLine1,
      postalCode: country === 'NG' ? undefined : postalCode,
      landmarkNotes,
    };

    // Initialize Order Intent
    const newOrder = createOrder(shippingAddress, packagingType, isGift, giftMessage);
    
    // Trigger Paystack Gateway Modal
    onPaymentInitiated(newOrder.orderNumber, total, email);
  };

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-[#000000]/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FFFFFF] text-[#000000] w-full max-w-4xl border border-black/20 shadow-2xl overflow-hidden my-8 font-sans-luxury">
        
        {/* Header */}
        <div className="p-6 bg-[#000000] text-[#FFFFFF] border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#C5A880] text-xs font-mono-luxury tracking-widest uppercase">
              <Lock className="w-3.5 h-3.5" />
              <span>FINALUCHI CHECKOUT • PRICES CHARGED IN NGN</span>
            </div>
            <h2 className="font-sans-luxury text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase mt-1">
              Delivery Details
            </h2>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className="p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 bg-[#FFFFFF]">
            
            {/* Left: Country-Aware Address Form */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Destination Country Toggle */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold tracking-widest uppercase text-[#000000] block">
                  DELIVERY DESTINATION COUNTRY:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      playTactileClick();
                      setCountry('NG');
                      setState('FCT (Abuja)');
                    }}
                    className={`py-3 px-4 text-xs font-semibold tracking-wider uppercase border transition-all ${
                      country === 'NG'
                        ? 'bg-[#000000] text-[#FFFFFF] border-[#000000]'
                        : 'bg-[#FFFFFF] text-black/70 border-black/15 hover:border-[#000000]'
                    }`}
                  >
                    NIGERIA DELIVERY
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playTactileClick();
                      setCountry('US');
                      setState('New York');
                    }}
                    className={`py-3 px-4 text-xs font-semibold tracking-wider uppercase border transition-all ${
                      country !== 'NG'
                        ? 'bg-[#000000] text-[#FFFFFF] border-[#000000]'
                        : 'bg-[#FFFFFF] text-black/70 border-black/15 hover:border-[#000000]'
                    }`}
                  >
                    INTERNATIONAL DELIVERY
                  </button>
                </div>
              </div>

              {/* International Country Selector */}
              {country !== 'NG' && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono-luxury text-black/60 uppercase">Select Destination Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs focus:outline-none focus:border-[#000000]"
                  >
                    {INTL_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Contact Information */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold tracking-widest uppercase text-[#C5A880] border-b border-black/10 pb-1.5">
                  1. CLIENT CONTACT INFORMATION
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] font-mono-luxury text-black/60 uppercase block mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Amara Okafor"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs focus:outline-none focus:border-[#000000]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono-luxury text-black/60 uppercase block mb-1">Email Address *</label>
                    <input
                      type="email"
                      placeholder="client@domain.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs focus:outline-none focus:border-[#000000]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono-luxury text-black/60 uppercase block mb-1">Phone Number (with country code) *</label>
                  <input
                    type="tel"
                    placeholder={country === 'NG' ? '+234 803 000 0000' : '+1 (555) 000-0000'}
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs focus:outline-none focus:border-[#000000] font-mono-luxury"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold tracking-widest uppercase text-[#C5A880] border-b border-black/10 pb-1.5">
                  2. DELIVERY ADDRESS
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] font-mono-luxury text-black/60 uppercase block mb-1">
                      {country === 'NG' ? 'State (36 States + FCT) *' : 'State / Province / Region *'}
                    </label>
                    {country === 'NG' ? (
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs focus:outline-none focus:border-[#000000]"
                      >
                        {NIGERIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder="e.g. New York / London"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs focus:outline-none focus:border-[#000000]"
                      />
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-mono-luxury text-black/60 uppercase block mb-1">Town / City / Area *</label>
                    <input
                      type="text"
                      placeholder={country === 'NG' ? 'e.g. Maitama / Gwarinpa' : 'City name'}
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs focus:outline-none focus:border-[#000000]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono-luxury text-black/60 uppercase block mb-1">Street Address Line 1 *</label>
                  <input
                    type="text"
                    placeholder="House number, street name, estate"
                    required
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs focus:outline-none focus:border-[#000000]"
                  />
                </div>

                {country !== 'NG' && (
                  <div>
                    <label className="text-[10px] font-mono-luxury text-black/60 uppercase block mb-1">
                      Postal / ZIP Code *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 10001 or SW1A 1AA"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs focus:outline-none focus:border-[#000000] font-mono-luxury uppercase"
                    />
                  </div>
                )}

                {country === 'NG' && (
                  <div>
                    <label className="text-[10px] font-mono-luxury text-black/60 uppercase block mb-1">
                      Landmark / Gate Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near civic center, deliver to security post"
                      value={landmarkNotes}
                      onChange={(e) => setLandmarkNotes(e.target.value)}
                      className="w-full p-3 bg-[#FFFFFF] border border-black/20 text-xs focus:outline-none focus:border-[#000000]"
                    />
                    <span className="text-[10px] text-black/50 font-mono-luxury mt-1 block">
                      ✓ No Postal / ZIP code required for Nigerian addresses.
                    </span>
                  </div>
                )}
              </div>

              {/* International DDU Disclaimer */}
              {country !== 'NG' && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-black/80">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    <strong>International order:</strong> Confirm destination availability, courier cost, delivery timeline, customs responsibilities and return terms before payment.
                  </p>
                </div>
              )}

            </div>

            {/* Right: Order Summary & Paystack Action */}
            <div className="lg:col-span-5 bg-[#FFFFFF] p-6 border border-black/15 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="text-xs font-bold tracking-widest uppercase text-[#000000] border-b border-black/10 pb-2">
                  ORDER SUMMARY ({items.length} PIECES)
                </h4>

                {/* Items preview list */}
                <div className="space-y-3 max-h-52 overflow-y-auto divide-y divide-black/10 text-xs">
                  {items.map((item) => (
                    <div key={item.id} className="pt-2.5 first:pt-0 flex justify-between items-center gap-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.colorway.heroImageUrl}
                          alt={item.product.name}
                          className="w-9 h-11 object-cover border border-black/10"
                        />
                        <div className="line-clamp-1">
                          <div className="font-semibold text-[#000000] uppercase text-[11px]">{item.product.name}</div>
                          <div className="text-[10px] text-black/60 font-mono-luxury">
                            {item.colorway.color.name} • {item.size} (×{item.quantity})
                          </div>
                        </div>
                      </div>
                      <span className="font-mono-luxury font-bold text-[#000000] shrink-0">
                        {formatKoboToNgn(item.unitPriceKobo * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Ledger Calculations */}
                <div className="pt-4 border-t border-black/10 space-y-2 text-xs font-mono-luxury">
                  <div className="flex justify-between text-black/60">
                    <span>SUBTOTAL:</span>
                    <span className="text-[#000000] font-semibold">{formatKoboToNgn(subtotal)}</span>
                  </div>
                  {packaging > 0 && (
                    <div className="flex justify-between text-black/60">
                      <span>PACKAGING:</span>
                      <span className="text-[#000000] font-semibold">{formatKoboToNgn(packaging)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-black/60">
                    <span>SHIPPING ({country}):</span>
                    <span className="text-[#000000] font-semibold">
                      {shipping === 0 ? 'Complimentary' : formatKoboToNgn(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-black/60">
                    <span>ESTIMATED VAT (7.5%):</span>
                    <span className="text-[#000000] font-semibold">{formatKoboToNgn(tax)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#000000] pt-2.5 border-t border-black/10">
                    <span>TOTAL BILLED (NGN):</span>
                    <span className="text-[#000000]">{formatKoboToNgn(total)}</span>
                  </div>
                  {displayCurrency !== 'NGN' && (
                    <div className="text-right text-[11px] text-[#C5A880] font-bold">
                      {formatPriceWithDisplay(total, displayCurrency)}
                    </div>
                  )}
                </div>

              </div>

              {/* Paystack Submit Button */}
              <div className="space-y-3 pt-4 border-t border-black/10">
                <button
                  type="submit"
                  className="w-full py-4.5 bg-[#000000] text-[#FFFFFF] text-xs font-bold tracking-[0.25em] uppercase hover:bg-neutral-900 border border-[#000000] transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4 text-white" />
                  <span>PAY WITH PAYSTACK • {formatKoboToNgn(total)}</span>
                </button>

                <div className="p-3 bg-[#FAFAFA] border border-black/10 text-[10px] text-black/75 font-mono-luxury space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-black uppercase">
                    <Lock className="w-3 h-3 text-[#C5A880]" />
                    <span>Traceable Business Transaction:</span>
                  </div>
                  <p>All payments are securely handled through Paystack to our verified business entity. An itemized digital invoice and order tracking number are generated upon authorization.</p>
                </div>

                <p className="text-[10px] text-center text-black/60 font-mono-luxury">
                  Review the final amount, delivery timeline and order terms before authorising payment.
                </p>
              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
