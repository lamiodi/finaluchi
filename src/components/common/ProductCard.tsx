import React, { useState } from 'react';
import { Heart, ArrowUpRight, Sparkles } from 'lucide-react';
import { Product, ProductColorway } from '../../types';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatPriceWithDisplay } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  priority?: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  priority = false,
  className = '',
}) => {
  const { displayCurrency } = useCurrencyStore();
  const { savedEdits, toggleProductInEdit } = useWishlistStore();
  const { playTactileClick } = useAudioStore();

  const defaultColorway = product.colorways?.find((c) => c.isDefault) || product.colorways?.[0];
  const [activeColorway, setActiveColorway] = useState<ProductColorway | undefined>(defaultColorway);
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = savedEdits.some((e) => e.productIds.includes(product.id));

  const heroImage = activeColorway?.heroImageUrl || defaultColorway?.heroImageUrl || '';
  const secondaryImage =
    activeColorway?.mediaGalleryUrls?.[1] ||
    defaultColorway?.mediaGalleryUrls?.[1] ||
    (activeColorway?.heroImageUrl !== defaultColorway?.heroImageUrl
      ? defaultColorway?.heroImageUrl
      : null);

  // Craft Exclusivity Badge
  const getBadge = () => {
    if (product.availability === 'ATELIER_EDITION') {
      return { label: 'ATELIER EDITION', highlight: true };
    }
    if (product.availability === 'MADE_TO_ORDER') {
      return { label: 'MADE TO ORDER', highlight: false };
    }
    if (product.isFeatured) {
      return { label: 'RUNWAY EDIT', highlight: false };
    }
    return null;
  };

  const badge = getBadge();
  const currentColor = activeColorway?.color || defaultColorway?.color;

  return (
    <div
      className={`group flex flex-col cursor-pointer transition-all duration-300 relative select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        playTactileClick();
        onSelectProduct(product);
      }}
    >
      {/* Editorial Packshot Stage */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F9F8F6] border border-black/[0.05] mb-3 flex items-center justify-center p-3 sm:p-5 transition-shadow duration-500 group-hover:shadow-[0_12px_36px_-10px_rgba(0,0,0,0.08)]">
        
        {/* Primary Product Image */}
        <img
          src={heroImage}
          alt={product.name}
          className={`w-full h-full object-contain transition-all duration-700 ease-out will-change-transform ${
            secondaryImage && isHovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
          }`}
          loading={priority ? 'eager' : 'lazy'}
        />

        {/* Secondary Lookbook / Angle Image (Editorial Fade-in) */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 w-full h-full object-contain p-3 sm:p-5 transition-all duration-700 ease-out ${
              isHovered ? 'scale-105 opacity-100' : 'scale-100 opacity-0 pointer-events-none'
            }`}
            loading="lazy"
          />
        )}

        {/* Top-Left: Exclusivity / Craft Badge */}
        {badge && (
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 pointer-events-none">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 text-[8px] sm:text-[9px] font-mono-luxury font-semibold uppercase tracking-[0.2em] backdrop-blur-md border ${
                badge.highlight
                  ? 'bg-black/90 text-[#DFC7AA] border-[#C5A880]/40 shadow-xs'
                  : 'bg-white/90 text-black/85 border-black/10'
              }`}
            >
              {badge.highlight && <Sparkles className="w-2.5 h-2.5 text-[#C5A880]" />}
              <span>{badge.label}</span>
            </span>
          </div>
        )}

        {/* Top-Right: Wishlist Tactile Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            playTactileClick();
            toggleProductInEdit('edit-default', product.id);
          }}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-20 ${
            isSaved
              ? 'bg-black text-[#C5A880] border border-black shadow-sm scale-105'
              : 'bg-white/80 text-black/60 hover:text-black hover:bg-white border border-black/10 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95'
          }`}
          aria-label={isSaved ? 'Remove from Saved Pieces' : 'Save to Pieces'}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isSaved ? 'fill-current text-[#C5A880]' : ''
            }`}
          />
        </button>

        {/* Desktop Quick-Inspect Floating Pill (Emerges on Hover) */}
        <div className="absolute bottom-3 inset-x-3 hidden sm:flex items-center justify-between px-3.5 py-2 bg-white/95 backdrop-blur-xl border border-black/10 text-noir shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-20 pointer-events-none">
          <span className="text-[10px] font-sans-luxury font-bold uppercase tracking-[0.16em]">
            Explore Piece
          </span>
          <div className="flex items-center gap-1 text-[10px] font-mono-luxury font-semibold text-[#A67C4A]">
            <span>VIEW</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

      </div>

      {/* Product Information Section: Product Name and Price with Color Variant beside it only */}
      <div className="space-y-1 px-0.5">
        
        {/* Product Name */}
        <h3 className="text-xs sm:text-[13.5px] font-sans-luxury font-semibold uppercase text-noir tracking-[0.02em] leading-snug group-hover:text-[#A67C4A] transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Price and Color Variant Beside It */}
        <div className="flex items-center gap-2 pt-0.5 flex-wrap">
          {/* Price */}
          <span className="text-xs sm:text-sm font-mono-luxury text-noir font-bold tracking-tight shrink-0">
            {formatPriceWithDisplay(product.basePriceKobo, displayCurrency)}
          </span>

          {/* Subtle separator */}
          {currentColor && (
            <span className="text-black/30 text-xs select-none">·</span>
          )}

          {/* Color Variant Beside Price */}
          {currentColor && (
            <div
              className="flex items-center gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Swatch circle */}
              <span
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-black/20 shrink-0 shadow-2xs"
                style={{ backgroundColor: currentColor.hexCode || '#000000' }}
                title={currentColor.name}
              />

              {/* Color name */}
              <span className="text-[10px] sm:text-[11px] font-mono-luxury text-neutral-600 uppercase tracking-wider truncate max-w-[120px] sm:max-w-[150px]">
                {currentColor.name}
              </span>

              {/* If product has additional colorways, show clickable swatch dots */}
              {product.colorways && product.colorways.length > 1 && (
                <div className="flex items-center gap-1 ml-1 pl-1.5 border-l border-black/15">
                  {product.colorways.map((cw) => {
                    const isSelected = activeColorway?.id === cw.id;
                    return (
                      <button
                        key={cw.id}
                        onClick={() => {
                          playTactileClick();
                          setActiveColorway(cw);
                        }}
                        onMouseEnter={() => setActiveColorway(cw)}
                        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border transition-all ${
                          isSelected
                            ? 'ring-1.5 ring-black ring-offset-1 scale-125 border-transparent'
                            : 'border-black/25 opacity-60 hover:opacity-100 hover:scale-125'
                        }`}
                        style={{ backgroundColor: cw.color?.hexCode || '#000000' }}
                        title={`Switch to ${cw.color?.name}`}
                        aria-label={`Switch to ${cw.color?.name}`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
