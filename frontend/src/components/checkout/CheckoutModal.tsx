import React, { useState } from 'react';
import { X, Lock, ArrowUpRight, AlertCircle } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useOrderStore } from '../../stores/orderStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatKoboToNgn, formatPriceWithDisplay } from '../../utils/formatters';
import { ShippingAddress } from '../../types';
import { toast } from 'sonner';
import { useModalA11y } from '../../lib/useModalA11y';
import { webpVariant, onImageError } from '../../utils/images';

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Nigerian mobile formats: +2348031234567, 2348031234567 or 08031234567.
const NG_PHONE_RE = /^(?:\+?234|0)\d{9,10}$/;
// International: optional + then 7–15 digits (E.164-ish).
const INTL_PHONE_RE = /^\+?[1-9]\d{6,14}$/;

function isValidPhone(raw: string, country: string): boolean {
  const digits = raw.replace(/[\s\-()]/g, '');
  if (!digits) return false;
  return country === 'NG' ? NG_PHONE_RE.test(digits) : INTL_PHONE_RE.test(digits);
}

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
  const panelRef = useModalA11y<HTMLDivElement>({ onClose, isOpen });

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

    if (!EMAIL_RE.test(email.trim())) {
      toast.error('Please enter a valid email address — your order confirmation is sent there.');
      return;
    }

    if (!isValidPhone(phone.trim(), country)) {
      toast.error(
        country === 'NG'
          ? 'Enter a valid Nigerian phone number, e.g. +234 803 000 0000 or 0803 000 0000.'
          : 'Enter your full phone number with the international dialling code, e.g. +1 555 000 0000.'
      );
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
    <div className="order-veil">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        tabIndex={-1}
        className="order-modal shop-page"
      >

        {/* Header */}
        <div className="order-head">
          <div>
            <span className="shop-eyebrow" style={{ color: '#7c7164', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Lock size={11} style={{ color: '#846548' }} /> Finaluchi checkout · prices charged in NGN
            </span>
            <h2 id="checkout-title">
              Delivery <em>details.</em>
            </h2>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className="bag-head-close"
            aria-label="Close checkout"
          >
            <X size={17} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="order-body">

            {/* Left: country-aware address form */}
            <div className="order-form">

              <div>
                <span className="shop-eyebrow" style={{ color: '#7c7164' }}>Delivery destination</span>
                <div className="pdp-sizes" style={{ marginTop: 8 }}>
                  <button
                    type="button"
                    aria-pressed={country === 'NG'}
                    onClick={() => {
                      playTactileClick();
                      setCountry('NG');
                      setState('FCT (Abuja)');
                    }}
                  >
                    Nigeria
                  </button>
                  <button
                    type="button"
                    aria-pressed={country !== 'NG'}
                    onClick={() => {
                      playTactileClick();
                      setCountry('US');
                      setState('New York');
                    }}
                  >
                    International
                  </button>
                </div>
              </div>

              {country !== 'NG' && (
                <label className="order-field">
                  <span>Destination country</span>
                  <select value={country} onChange={(e) => setCountry(e.target.value)}>
                    {INTL_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </label>
              )}

              {/* Contact */}
              <div style={{ marginTop: 30 }}>
                <span className="shop-eyebrow" style={{ color: '#846548' }}>01 — Client contact</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 26px' }}>
                  <label className="order-field">
                    <span>Full legal name *</span>
                    <input
                      type="text"
                      placeholder="e.g. Amara Okafor"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </label>
                  <label className="order-field">
                    <span>Email address *</span>
                    <input
                      type="email"
                      placeholder="client@domain.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </div>
                <label className="order-field">
                  <span>Phone number (with country code) *</span>
                  <input
                    type="tel"
                    placeholder={country === 'NG' ? '+234 803 000 0000' : '+1 (555) 000-0000'}
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}
                  />
                </label>
              </div>

              {/* Address */}
              <div style={{ marginTop: 26 }}>
                <span className="shop-eyebrow" style={{ color: '#846548' }}>02 — Delivery address</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 26px' }}>
                  <label className="order-field">
                    <span>{country === 'NG' ? 'State (36 states + FCT) *' : 'State / province / region *'}</span>
                    {country === 'NG' ? (
                      <select value={state} onChange={(e) => setState(e.target.value)}>
                        {NIGERIAN_STATES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder="e.g. New York / London"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    )}
                  </label>
                  <label className="order-field">
                    <span>Town / city / area *</span>
                    <input
                      type="text"
                      placeholder={country === 'NG' ? 'e.g. Maitama / Gwarinpa' : 'City name'}
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </label>
                </div>
                <label className="order-field">
                  <span>Street address line 1 *</span>
                  <input
                    type="text"
                    placeholder="House number, street name, estate"
                    required
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                  />
                </label>
                {country !== 'NG' && (
                  <label className="order-field">
                    <span>Postal / ZIP code *</span>
                    <input
                      type="text"
                      placeholder="e.g. 10001 or SW1A 1AA"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      style={{ textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}
                    />
                  </label>
                )}
                {country === 'NG' && (
                  <label className="order-field">
                    <span>Landmark / gate instructions (optional)</span>
                    <input
                      type="text"
                      placeholder="e.g. Near civic center, deliver to security post"
                      value={landmarkNotes}
                      onChange={(e) => setLandmarkNotes(e.target.value)}
                    />
                    <i style={{ display: 'block', fontStyle: 'normal', fontSize: 10, color: '#8b8378', marginTop: 6 }}>
                      No postal / ZIP code required for Nigerian addresses.
                    </i>
                  </label>
                )}
              </div>

              {country !== 'NG' && (
                <div className="order-note" style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <AlertCircle size={15} style={{ color: '#846548', flexShrink: 0, marginTop: 2 }} />
                  <span><strong>International order:</strong> confirm destination availability, courier cost, delivery timeline, customs responsibilities and return terms before payment.</span>
                </div>
              )}
            </div>

            {/* Right: order summary */}
            <div className="order-summary">
              <span className="shop-eyebrow" style={{ color: '#7c7164' }}>
                Order summary — {items.length} {items.length === 1 ? 'piece' : 'pieces'}
              </span>

              <div style={{ marginTop: 6 }}>
                {items.map((item) => (
                  <div key={item.id} className="order-summary-item">
                    <img
                      src={webpVariant(item.colorway.heroImageUrl, 480)}
                      alt={item.product.name}
                      onError={onImageError}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ font: "400 16px/1.3 'Antic Didone', serif" }}>{item.product.name}</div>
                      <div style={{ fontSize: 10, color: '#706961', marginTop: 3 }}>
                        {item.colorway.color.name} · {item.size} (×{item.quantity})
                      </div>
                    </div>
                    <span style={{ fontSize: 11, whiteSpace: 'nowrap' }}>
                      {formatKoboToNgn(item.unitPriceKobo * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 22 }}>
                <div className="bag-ledger-row">
                  <span>Subtotal</span>
                  <span style={{ color: '#201f1d' }}>{formatKoboToNgn(subtotal)}</span>
                </div>
                {packaging > 0 && (
                  <div className="bag-ledger-row">
                    <span>Packaging</span>
                    <span style={{ color: '#201f1d' }}>{formatKoboToNgn(packaging)}</span>
                  </div>
                )}
                <div className="bag-ledger-row">
                  <span>Shipping ({country})</span>
                  <span style={{ color: '#201f1d' }}>
                    {shipping === 0 ? 'Complimentary' : formatKoboToNgn(shipping)}
                  </span>
                </div>
                <div className="bag-ledger-row">
                  <span>Estimated VAT (7.5%)</span>
                  <span style={{ color: '#201f1d' }}>{formatKoboToNgn(tax)}</span>
                </div>
                <div className="bag-ledger-total">
                  <span style={{ textTransform: 'uppercase', letterSpacing: '.14em', fontSize: 10 }}>Total billed (NGN)</span>
                  <span style={{ fontSize: 16 }}>{formatKoboToNgn(total)}</span>
                </div>
                {displayCurrency !== 'NGN' && (
                  <div style={{ textAlign: 'right', fontSize: 11, color: '#846548', marginTop: 6 }}>
                    {formatPriceWithDisplay(total, displayCurrency)}
                  </div>
                )}

                <button type="submit" className="order-submit">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <Lock size={12} /> Confirm order &amp; request invoice
                  </span>
                  <ArrowUpRight size={15} />
                </button>

                <p style={{ fontSize: 9, lineHeight: 1.8, letterSpacing: '.06em', color: '#8b8378', marginTop: 14, textTransform: 'uppercase' }}>
                  Your piece specifications, custom sizing and guaranteed completion date are reviewed
                  directly by the Abuja atelier. An itemized written invoice and traceable payment
                  instructions follow confirmation.
                </p>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
