import React from 'react';
import { X, Trash2, Plus, Minus, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useCartStore, PACKAGING_OPTIONS } from '../../stores/cartStore';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatKoboToNgn, formatPriceWithDisplay } from '../../utils/formatters';
import { useModalA11y } from '../../lib/useModalA11y';
import { webpVariant, onImageError } from '../../utils/images';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onExploreCatalog: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToCheckout,
  onExploreCatalog,
}) => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeFromCart,
    updateQuantity,
    packagingType,
    setPackagingType,
    isGift,
    giftMessage,
    setGiftOptions,
    getSubtotalKobo,
    getPackagingKobo,
    getShippingKobo,
    getTaxKobo,
    getTotalKobo,
  } = useCartStore();

  const { displayCurrency } = useCurrencyStore();
  const { playTactileClick } = useAudioStore();
  const panelRef = useModalA11y<HTMLDivElement>({ onClose: closeDrawer, isOpen: isDrawerOpen });

  if (!isDrawerOpen) return null;

  const subtotal = getSubtotalKobo();
  const packaging = getPackagingKobo();
  const shipping = getShippingKobo('NG');
  const tax = getTaxKobo('NG');
  const total = getTotalKobo('NG');

  return (
    <div className="bag-veil">

      {/* Click outside to close */}
      <div className="flex-1" onClick={closeDrawer} aria-hidden="true" />

      {/* Slide-over drawer — the shop's paper room, narrowed to a rail */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        tabIndex={-1}
        className="bag-drawer shop-page"
      >

        {/* Header */}
        <div className="bag-head">
          <div>
            <span className="shop-eyebrow" style={{ color: '#7c7164' }}>Finaluchi / your selections</span>
            <h2 id="cart-drawer-title" style={{ font: "400 30px/1.15 'Antic Didone', serif", marginTop: 8 }}>
              The bag{' '}
              <i style={{ fontStyle: 'normal', fontSize: 14, color: '#846548' }}>
                {items.reduce((s, i) => s + i.quantity, 0)}{' '}
                {items.length === 1 ? 'piece' : 'pieces'}
              </i>
            </h2>
          </div>
          <button
            onClick={() => {
              playTactileClick();
              closeDrawer();
            }}
            className="bag-head-close"
            aria-label="Close bag"
          >
            <X size={17} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="bag-scroll">

          {items.length === 0 ? (
            <div style={{ padding: '90px 10px', textAlign: 'center' }}>
              <span className="shop-eyebrow" style={{ color: '#7c7164' }}>A different direction</span>
              <h3 style={{ font: "400 32px/1.15 'Antic Didone', serif", margin: '12px 0 0' }}>
                Your bag is <em style={{ color: '#846548', fontStyle: 'italic' }}>empty.</em>
              </h3>
              <p style={{ fontSize: 12, color: '#706961', lineHeight: 1.8, marginTop: 12 }}>
                Ready-to-wear, statement sets and occasion pieces are waiting.
              </p>
              <button
                onClick={() => {
                  playTactileClick();
                  closeDrawer();
                  onExploreCatalog();
                }}
                className="shop-solid-button"
                style={{ marginTop: 26, color: 'white' }}
              >
                <span>Explore the collection</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="bag-item">
                  <img
                    className="bag-item-photo"
                    src={webpVariant(item.colorway.heroImageUrl, 480)}
                    alt={item.product.name}
                    onError={onImageError}
                  />

                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                        <h3 className="bag-item-title">{item.product.name}</h3>
                        <button
                          onClick={() => {
                            playTactileClick();
                            removeFromCart(item.id);
                          }}
                          aria-label={`Remove ${item.product.name} from bag`}
                          style={{ color: '#9a9285', padding: 4, marginTop: 2 }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div style={{ fontSize: 10, letterSpacing: '.08em', color: '#706961', marginTop: 7, lineHeight: 1.7 }}>
                        {item.colorway.color.code} — {item.colorway.color.name}
                        <br />
                        Size {item.size}
                        {item.isMadeToMeasure && (
                          <span style={{ display: 'inline-block', marginLeft: 8, padding: '3px 7px', background: '#201f1d', color: '#faf9f6', fontSize: 8, letterSpacing: '.14em', textTransform: 'uppercase' }}>
                            Bespoke atelier fit
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                      <span className="bag-stepper">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.product.name}`}
                        >
                          <Minus size={12} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.product.name}`}
                        >
                          <Plus size={12} />
                        </button>
                      </span>
                      <span style={{ fontSize: 12 }}>
                        {formatPriceWithDisplay(item.unitPriceKobo * item.quantity, displayCurrency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Packaging */}
              <div style={{ marginTop: 28 }}>
                <span className="shop-eyebrow" style={{ color: '#7c7164' }}>Order packaging</span>
                <div className="bag-pack">
                  {PACKAGING_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        playTactileClick();
                        setPackagingType(opt.id);
                      }}
                      aria-pressed={packagingType === opt.id}
                    >
                      <span style={{ display: 'block', textTransform: 'uppercase', letterSpacing: '.1em' }}>{opt.title}</span>
                      <span style={{ display: 'block', fontSize: 10, opacity: 0.75, marginTop: 3 }}>{opt.subtitle}</span>
                      <span style={{ display: 'block', marginTop: 7, color: packagingType === opt.id ? '#e8dfd0' : '#846548', fontSize: 11 }}>
                        {opt.priceKobo === 0 ? 'Complimentary' : formatKoboToNgn(opt.priceKobo)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gift note */}
              <div style={{ marginTop: 22 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setGiftOptions(e.target.checked, giftMessage)}
                    style={{ accentColor: '#201f1d' }}
                  />
                  This is a gift — add a gift-note request
                </label>
                {isGift && (
                  <label className="order-field" style={{ marginTop: 4 }}>
                    <span>Note for the recipient</span>
                    <textarea
                      aria-label="Gift note for the recipient"
                      value={giftMessage}
                      onChange={(e) => setGiftOptions(true, e.target.value)}
                      rows={2}
                      placeholder="Written by hand at the atelier…"
                    />
                  </label>
                )}
              </div>
            </>
          )}
        </div>

        {/* Ledger + checkout */}
        {items.length > 0 && (
          <div className="bag-ledger">
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
              <span>Local shipping (NG)</span>
              <span style={{ color: '#201f1d' }}>
                {shipping === 0 ? 'Complimentary' : formatKoboToNgn(shipping)}
              </span>
            </div>
            <div className="bag-ledger-row">
              <span>Estimated VAT (7.5%)</span>
              <span style={{ color: '#201f1d' }}>{formatKoboToNgn(tax)}</span>
            </div>
            <div className="bag-ledger-total">
              <span style={{ textTransform: 'uppercase', letterSpacing: '.14em', fontSize: 10 }}>Total</span>
              <span style={{ fontSize: 16 }}>{formatPriceWithDisplay(total, displayCurrency)}</span>
            </div>

            <button
              onClick={() => {
                playTactileClick();
                closeDrawer();
                onProceedToCheckout();
              }}
              className="order-submit"
              style={{ marginTop: 18 }}
            >
              <span>Review delivery &amp; checkout</span>
              <ArrowUpRight size={16} style={{ color: '#e8dfd0' }} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, marginTop: 14, fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: '#8b8378' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheck size={12} style={{ color: '#846548' }} /> Prices charged in NGN
              </span>
              <span>Review delivery details before payment</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
