import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Gift, ShieldCheck, ArrowRight, Box } from 'lucide-react';
import { useCartStore, PACKAGING_OPTIONS } from '../../stores/cartStore';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatKoboToNgn, formatPriceWithDisplay } from '../../utils/formatters';

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

  if (!isDrawerOpen) return null;

  const subtotal = getSubtotalKobo();
  const packaging = getPackagingKobo();
  const shipping = getShippingKobo('NG');
  const tax = getTaxKobo('NG');
  const total = getTotalKobo('NG');

  return (
    <div className="fixed inset-0 z-[600] flex justify-end bg-[#000000]/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Click outside to close */}
      <div className="flex-1" onClick={closeDrawer} />

      {/* Slide-over Drawer (Haute Couture Specs) */}
      <div className="w-full max-w-lg bg-[#FFFFFF] text-[#000000] h-full flex flex-col justify-between border-l border-black/15 shadow-2xl animate-in slide-in-from-right duration-300 relative z-10 font-sans-luxury">
        
        {/* Header Bar */}
        <div className="p-6 border-b border-black/10 flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
            <h3 className="font-sans-luxury text-lg font-bold tracking-wider text-[#000000] uppercase">
              Your Bag ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          
          <button
            onClick={() => {
              playTactileClick();
              closeDrawer();
            }}
            className="p-2 text-black/60 hover:text-[#000000] transition-colors"
            aria-label="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {items.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-[#C5A880]/40 mx-auto" />
              <div className="space-y-1.5">
                <h4 className="font-sans-luxury text-xl font-bold uppercase text-[#000000]">Your Bag is Empty</h4>
                <p className="text-xs text-black/60 font-light">Explore ready-to-wear, statement sets and occasion pieces.</p>
              </div>
              <button
                onClick={() => {
                  playTactileClick();
                  closeDrawer();
                  onExploreCatalog();
                }}
                className="px-6 py-3 bg-[#000000] text-[#FFFFFF] text-xs font-semibold tracking-widest uppercase border border-transparent hover:bg-[#FFFFFF] hover:text-[#000000] hover:border-[#000000] transition-all"
              >
                EXPLORE COLLECTION
              </button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="p-4 bg-[#FFFFFF] border border-black/10 flex gap-4 transition-all">
                  {/* Thumbnail */}
                  <div className="w-20 h-28 bg-[#FAFAFA] border border-black/10 overflow-hidden shrink-0">
                    <img
                      src={item.colorway.heroImageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-sans-luxury text-sm font-semibold uppercase text-[#000000] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => {
                            playTactileClick();
                            removeFromCart(item.id);
                          }}
                          className="text-black/40 hover:text-red-600 transition-colors p-1"
                          title="Remove Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-black/60 font-mono-luxury mt-1 space-y-0.5">
                        <div>Color: <span className="text-[#000000] font-semibold">{item.colorway.color.code} — {item.colorway.color.name}</span></div>
                        <div>Size: <span className="text-[#000000] font-semibold">{item.size}</span></div>
                        {item.isMadeToMeasure && (
                          <span className="inline-block px-2 py-0.5 bg-[#000000] text-[#FFFFFF] text-[9px] font-semibold uppercase tracking-wider mt-1">
                            Bespoke Atelier Fit
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity & Unit Price */}
                    <div className="flex items-center justify-between pt-3 border-t border-black/10 mt-2">
                      <div className="flex items-center border border-black/20 bg-[#FFFFFF] text-xs">
                        <button
                          onClick={() => {
                            playTactileClick();
                            updateQuantity(item.id, item.quantity - 1);
                          }}
                          className="p-1.5 text-black/60 hover:text-[#000000]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 font-mono-luxury font-bold text-xs text-[#000000]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            playTactileClick();
                            updateQuantity(item.id, item.quantity + 1);
                          }}
                          className="p-1.5 text-black/60 hover:text-[#000000]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-mono-luxury font-bold text-[#000000]">
                        {formatPriceWithDisplay(item.unitPriceKobo * item.quantity, displayCurrency)}
                      </span>
                    </div>

                  </div>
                </div>
              ))}

              {/* Luxury Packaging Options */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#000000]">
                  <Box className="w-4 h-4 text-[#C5A880]" />
                  <span>ORDER PACKAGING</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PACKAGING_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        playTactileClick();
                        setPackagingType(opt.id);
                      }}
                      className={`p-3.5 text-left border text-xs transition-all ${
                        packagingType === opt.id
                          ? 'border-[#000000] bg-[#000000] text-[#FFFFFF]'
                          : 'border-black/15 bg-[#FFFFFF] text-black/70 hover:border-[#000000]'
                      }`}
                    >
                      <div className={`font-semibold uppercase tracking-wide ${packagingType === opt.id ? 'text-[#FFFFFF]' : 'text-[#000000]'}`}>{opt.title}</div>
                      <div className={`text-[10px] mt-0.5 ${packagingType === opt.id ? 'text-white/70' : 'text-black/60'}`}>{opt.subtitle}</div>
                      <div className={`text-[11px] font-mono-luxury mt-1.5 font-bold ${packagingType === opt.id ? 'text-[#C5A880]' : 'text-[#C5A880]'}`}>
                        {opt.priceKobo === 0 ? 'Complimentary' : formatKoboToNgn(opt.priceKobo)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gift Concierge Toggle */}
              <div className="pt-2 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#000000]">
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setGiftOptions(e.target.checked, giftMessage)}
                    className="accent-[#000000] rounded-none"
                  />
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#C5A880]" />
                    This is a gift (add a gift-note request)
                  </span>
                </label>

                {isGift && (
                  <textarea
                    placeholder="Enter a note for the recipient..."
                    value={giftMessage}
                    onChange={(e) => setGiftOptions(true, e.target.value)}
                    className="w-full p-3 text-xs bg-[#FFFFFF] border border-black/20 focus:outline-none focus:border-[#000000]"
                    rows={2}
                  />
                )}
              </div>
            </>
          )}

        </div>

        {/* Footer Totals & Checkout Button */}
        {items.length > 0 && (
          <div className="p-6 bg-[#FFFFFF] border-t border-black/10 space-y-4">
            <div className="space-y-2 text-xs font-mono-luxury">
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
                <span>LOCAL SHIPPING (NG):</span>
                <span className="text-[#000000] font-semibold">
                  {shipping === 0 ? 'Complimentary' : formatKoboToNgn(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-black/60">
                <span>ESTIMATED VAT (7.5%):</span>
                <span className="text-[#000000] font-semibold">{formatKoboToNgn(tax)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#000000] pt-2 border-t border-black/10">
                <span>TOTAL:</span>
                <span className="text-base text-[#000000] font-mono-luxury">{formatPriceWithDisplay(total, displayCurrency)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                playTactileClick();
                closeDrawer();
                onProceedToCheckout();
              }}
              className="w-full py-4.5 bg-[#000000] text-[#FFFFFF] text-xs font-bold tracking-[0.25em] uppercase hover:bg-neutral-900 border border-[#000000] transition-all flex items-center justify-center gap-2"
            >
              <span>REVIEW DELIVERY & CHECKOUT</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] text-black/60 font-mono-luxury">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" /> Prices charged in NGN</span>
              <span>Review delivery details before payment</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
