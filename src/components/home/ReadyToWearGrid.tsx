import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatPriceWithDisplay } from '../../utils/formatters';

interface ReadyToWearGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSeeMore: () => void;
}

export const ReadyToWearGrid: React.FC<ReadyToWearGridProps> = ({
  products,
  onSelectProduct,
  onSeeMore,
}) => {
  const { displayCurrency } = useCurrencyStore();
  const { savedEdits, toggleProductInEdit } = useWishlistStore();
  const { playTactileClick } = useAudioStore();

  const rtwProducts = products.slice(0, 4);

  const isSaved = (productId: string) => {
    return savedEdits.some((e) => e.productIds.includes(productId));
  };

  return (
    <section className="w-full bg-[#FFFFFF] py-16 sm:py-24 border-b border-black/10">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex items-end justify-between pb-5 border-b border-black/10 mb-8 sm:mb-12">
          <div>
            <span className="text-[10px] sm:text-xs font-mono-luxury uppercase tracking-[0.25em] text-neutral-500 block mb-1">
              Curated Edit
            </span>
            <h2 className="font-sans-luxury text-2xl sm:text-4xl font-bold tracking-tight text-noir uppercase">
              READY-TO-WEAR
            </h2>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onSeeMore();
            }}
            className="group flex items-center gap-1.5 text-xs font-sans-luxury font-semibold tracking-wider text-noir hover:text-[#A67C4A] transition-colors uppercase"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Minimalist 4-Column Product Grid (2-col on mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {rtwProducts.map((product) => {
            const defaultColorway = product.colorways.find((c) => c.isDefault) || product.colorways[0];
            const secondaryImage = defaultColorway.mediaGalleryUrls[1] || defaultColorway.heroImageUrl;
            const saved = isSaved(product.id);

            return (
              <div
                key={product.id}
                onClick={() => {
                  playTactileClick();
                  onSelectProduct(product);
                }}
                className="group flex flex-col cursor-pointer transition-all relative"
              >
                {/* Packshot Stage (Clean, Borderless Studio Framing) */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F7F7F7] mb-3.5 flex items-center justify-center p-3 sm:p-4">
                  {/* Primary Image */}
                  <img
                    src={defaultColorway.heroImageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-104 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Secondary Hover Image */}
                  {secondaryImage && secondaryImage !== defaultColorway.heroImageUrl && (
                    <img
                      src={secondaryImage}
                      alt={`${product.name} alternate view`}
                      className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out p-3 sm:p-4"
                      loading="lazy"
                    />
                  )}

                  {/* Wishlist Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playTactileClick();
                      toggleProductInEdit('edit-default', product.id);
                    }}
                    className={`absolute top-3 right-3 p-1.5 transition-all z-10 ${
                      saved
                        ? 'text-black fill-current'
                        : 'text-black/40 hover:text-black sm:opacity-0 sm:group-hover:opacity-100'
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Typography & Price */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-luxury text-neutral-500 uppercase tracking-wider block">
                    {product.fabricIntelligence.material.split('&')[0]}
                  </span>
                  <h3 className="text-xs sm:text-sm font-sans-luxury font-semibold uppercase text-noir tracking-tight leading-snug group-hover:text-[#A67C4A] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="text-xs sm:text-sm font-mono-luxury text-noir font-bold pt-0.5">
                    {formatPriceWithDisplay(product.basePriceKobo, displayCurrency)}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
