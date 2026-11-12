import React, { useState, useEffect } from 'react';
import { X, Lock, ArrowUpRight, AlertCircle, ChevronDown, Loader2 } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useOrderStore } from '../../stores/orderStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatKoboToNgn, formatIndicative } from '../../utils/formatters';
import { ShippingAddress } from '../../types';
import { toast } from 'sonner';
import { useModalA11y } from '../../lib/useModalA11y';
import { webpVariant, onImageError } from '../../utils/images';
import { warmUpApi } from '../../lib/api';
import { DESTINATION_COUNTRIES, getCountryByCode } from '../../data/destinations';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentInitiated: (orderId: string, totalKobo: number, customerEmail: string) => void;
}

const CACHED_ADDRESS_KEY = 'flc_guest_shipping_address';

function loadCachedAddress(): Partial<ShippingAddress> {
  try {
    const raw = localStorage.getItem(CACHED_ADDRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCachedAddress(addr: Partial<ShippingAddress>) {
  try {
    localStorage.setItem(CACHED_ADDRESS_KEY, JSON.stringify(addr));
  } catch {
    // Ignore storage quota limits
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Nigerian mobile formats: +2348031234567, 2348031234567 or 08031234567.
const NG_PHONE_RE = /^(?:\+?234|0)\d{9,10}$/;
// International: optional + then 7–15 digits (E.164-ish).
const INTL_PHONE_RE = /^\+?[1-9]\d{6,14}$/;

function isValidPhone(raw: string, country: string): boolean {
  const digits = raw.replace(/[\s\-()]/g, '');
  if (!digits) return false;
  // If Nigerian format with redundant 0 after country code (e.g. +234 080... or 234080...), normalize it
  const normalized = country === 'NG' ? digits.replace(/^(\+?234)0/, '$1') : digits;
  return country === 'NG' ? NG_PHONE_RE.test(normalized) : INTL_PHONE_RE.test(normalized);
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

  const { displayCurrency, setDisplayCurrency } = useCurrencyStore();
  const { createOrder } = useOrderStore();
  const { playTactileClick } = useAudioStore();
  const panelRef = useModalA11y<HTMLDivElement>({ onClose, isOpen });

  const cached = loadCachedAddress();

  // Form State initialized with cached delivery details to prevent lost inputs
  const [country, setCountry] = useState<string>(cached.country || 'NG');
  const [fullName, setFullName] = useState(cached.fullName || '');
  const [email, setEmail] = useState(cached.email || '');
  const [phone, setPhone] = useState(cached.phone || '');
  const [state, setState] = useState(cached.state || 'FCT (Abuja)');
  const [customState, setCustomState] = useState('');
  const [city, setCity] = useState(cached.city || '');
  const [addressLine1, setAddressLine1] = useState(cached.addressLine1 || '');
  const [postalCode, setPostalCode] = useState(cached.postalCode || '');
  const [landmarkNotes, setLandmarkNotes] = useState(cached.landmarkNotes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentCountry = getCountryByCode(country);

  useEffect(() => {
    if (isOpen) {
      warmUpApi();
    }
  }, [isOpen]);

  if (!isOpen || items.length === 0) return null;

  const subtotal = getSubtotalKobo();
  const packaging = getPackagingKobo();
  const shipping = getShippingKobo(country);
  const tax = getTaxKobo(country);
  const total = getTotalKobo(country);

  const handleCountryChange = (newCode: string) => {
    setCountry(newCode);
    const countryData = getCountryByCode(newCode);
    setState(countryData.states[0] || 'FCT (Abuja)');
    setCustomState('');
    setDisplayCurrency(countryData.currency);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!fullName.trim() || !email.trim() || !phone.trim() || !city.trim() || !addressLine1.trim()) {
      toast.error('Please complete all required delivery details.');
      return;
    }

    const effectiveState = state === 'Other' ? customState.trim() : state.trim();
    if (!effectiveState) {
      toast.error('Please select or specify your delivery state or province.');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!EMAIL_RE.test(cleanEmail)) {
      toast.error('Please enter a valid email address — your order confirmation is sent there.');
      return;
    }

    if (!isValidPhone(phone.trim(), country)) {
      toast.error(
        country === 'NG'
          ? 'Enter a valid Nigerian phone number, e.g. +234 803 000 0000 or 0803 000 0000.'
          : `Enter your full phone number with the international dialling code, e.g. ${currentCountry.dialCode} ...`
      );
      return;
    }

    if (currentCountry.requiresPostalCode && !postalCode.trim()) {
      toast.error(`Postal / ZIP Code is required for delivery to ${currentCountry.name}.`);
      return;
    }

    setIsSubmitting(true);
    playTactileClick();

    const cleanPhone = country === 'NG'
      ? phone.trim().replace(/^(\+?234)0/, '$1')
      : phone.trim();

    const shippingAddress: ShippingAddress = {
      fullName: fullName.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      country,
      state: effectiveState,
      city: city.trim(),
      addressLine1: addressLine1.trim(),
      postalCode: country === 'NG' ? undefined : postalCode.trim(),
      landmarkNotes: landmarkNotes.trim(),
    };

    // Cache the address so accidental modal closures never lose customer inputs
    saveCachedAddress(shippingAddress);

    // Initialize Order Intent
    const newOrder = createOrder(shippingAddress, packagingType, isGift, giftMessage);

    // Trigger Paystack Gateway Modal
    onPaymentInitiated(newOrder.orderNumber, total, cleanEmail);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div
      className="order-veil"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playTactileClick();
          onClose();
        }
      }}
    >
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
                      handleCountryChange('NG');
                    }}
                  >
                    🇳🇬 Nigeria
                  </button>
                  <button
                    type="button"
                    aria-pressed={country !== 'NG'}
                    onClick={() => {
                      playTactileClick();
                      handleCountryChange(country !== 'NG' ? country : 'US');
                    }}
                  >
                    🌍 International
                  </button>
                </div>
              </div>

              {/* Destination country dropdown with flag */}
              <label className="order-field" style={{ marginTop: 18 }}>
                <span>Destination country *</span>
                <div className="order-select-wrap">
                  <select
                    value={country}
                    onChange={(e) => {
                      playTactileClick();
                      handleCountryChange(e.target.value);
                    }}
                    aria-label="Destination country"
                  >
                    {DESTINATION_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag}  {c.name} ({c.dialCode})
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="order-select-chevron" />
                </div>
              </label>

              {/* Contact */}
              <div style={{ marginTop: 28 }}>
                <span className="shop-eyebrow" style={{ color: '#846548' }}>01 — Client contact</span>
                <div className="order-row-2col">
                  <label className="order-field">
                    <span>Full legal name *</span>
                    <input
                      type="text"
                      placeholder="e.g. Amara Okafor"
                      required
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </label>
                  <label className="order-field">
                    <span>Email address *</span>
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
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
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={currentCountry.placeholderPhone}
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
                <div className="order-row-2col">
                  <label className="order-field">
                    <span>{currentCountry.stateLabel} *</span>
                    <div className="order-select-wrap">
                      <select
                        value={state}
                        onChange={(e) => {
                          playTactileClick();
                          setState(e.target.value);
                        }}
                        aria-label={currentCountry.stateLabel}
                      >
                        {currentCountry.states.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                        {country !== 'NG' && <option value="Other">Other / Regional</option>}
                      </select>
                      <ChevronDown size={14} className="order-select-chevron" />
                    </div>
                  </label>
                  <label className="order-field">
                    <span>Town / city / area *</span>
                    <input
                      type="text"
                      autoComplete="address-level2"
                      placeholder={country === 'NG' ? 'e.g. Maitama / Gwarinpa' : 'City / town name'}
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </label>
                </div>

                {state === 'Other' && (
                  <label className="order-field" style={{ marginTop: 14 }}>
                    <span>Specify state / province / county *</span>
                    <input
                      type="text"
                      placeholder="e.g. Regional district or province"
                      required
                      value={customState}
                      onChange={(e) => setCustomState(e.target.value)}
                    />
                  </label>
                )}

                <label className="order-field">
                  <span>Street address line 1 *</span>
                  <input
                    type="text"
                    autoComplete="street-address"
                    placeholder="House number, street name, estate"
                    required
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                  />
                </label>
                {currentCountry.requiresPostalCode && (
                  <label className="order-field">
                    <span>Postal / ZIP code *</span>
                    <input
                      type="text"
                      autoComplete="postal-code"
                      placeholder={country === 'US' ? 'e.g. 10001' : country === 'GB' ? 'e.g. W1K 1DA' : 'e.g. M5V 2T6'}
                      required
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
                      Dispatched directly from the Abuja atelier. No postal / ZIP code required for Nigerian addresses.
                    </i>
                  </label>
                )}
              </div>

              {country !== 'NG' && (
                <div className="order-note" style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <AlertCircle size={15} style={{ color: '#846548', flexShrink: 0, marginTop: 2 }} />
                  <span>
                    <strong>International Delivery ({currentCountry.flag} {currentCountry.name}):</strong> Dispatched directly from our Abuja atelier via DHL Express (5–7 business days). Orders are shipped DDU (Delivered Duty Unpaid); local import duties or clearance fees in {currentCountry.name} are settled upon arrival.
                  </span>
                </div>
              )}
            </div>

            {/* Right: order summary */}
            <div className="order-summary">
              <span className="shop-eyebrow" style={{ color: '#7c7164' }}>
                Order summary — {items.length} {items.length === 1 ? 'piece' : 'pieces'}
              </span>

              <div className="order-summary-scroll" style={{ marginTop: 6 }}>
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
                        {item.isMadeToMeasure && (
                          <span style={{ display: 'inline-block', marginLeft: 6, padding: '2px 6px', background: '#201f1d', color: '#faf9f6', fontSize: 8, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                            Bespoke fit
                          </span>
                        )}
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
                  <span>{country === 'NG' ? 'Flat rate shipping (Nigeria)' : `Flat rate express (${currentCountry.flag} ${currentCountry.name})`}</span>
                  <span style={{ color: '#201f1d' }}>{formatKoboToNgn(shipping)}</span>
                </div>
                {country === 'NG' ? (
                  <div className="bag-ledger-row">
                    <span>Estimated VAT (7.5%)</span>
                    <span style={{ color: '#201f1d' }}>{formatKoboToNgn(tax)}</span>
                  </div>
                ) : (
                  <div className="bag-ledger-row">
                    <span>Export VAT / Duties</span>
                    <span style={{ color: '#7c7164', fontSize: 11 }}>0% (DDU)</span>
                  </div>
                )}
                <div className="bag-ledger-total">
                  <span style={{ textTransform: 'uppercase', letterSpacing: '.14em', fontSize: 10 }}>Total billed (NGN)</span>
                  <span style={{ fontSize: 16 }}>{formatKoboToNgn(total)}</span>
                </div>
                {displayCurrency !== 'NGN' && (
                  <div style={{ textAlign: 'right', fontSize: 11, color: '#846548', marginTop: 6, fontStyle: 'italic' }}>
                    Indicative: {formatIndicative(total, displayCurrency)}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="order-submit"
                  style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'wait' : 'pointer' }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    {isSubmitting ? (
                      <>
                        <Loader2 size={13} className="animate-spin" /> Preparing checkout…
                      </>
                    ) : (
                      <>
                        <Lock size={12} /> Confirm order &amp; request invoice
                      </>
                    )}
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
