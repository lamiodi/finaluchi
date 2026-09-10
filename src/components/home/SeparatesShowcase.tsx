import React from 'react';
import { Product } from '../../types';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatPriceWithDisplay } from '../../utils/formatters';

interface SeparatesShowcaseProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSeeMore: (category: string) => void;
}

export const SeparatesShowcase: React.FC<SeparatesShowcaseProps> = ({
  products,
  onSelectProduct,
  onSeeMore,
}) => {
  const { displayCurrency } = useCurrencyStore();
  const { playTactileClick } = useAudioStore();

  const separatesProducts = products.slice(4, 8);

  return (
    <section className="w-full bg-[#FFFFFF] py-14 sm:py-24 border-b border-black/10">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 sm:pb-8 border-b border-black/10 mb-8 sm:mb-10">
          <h2 className="font-sans-luxury text-2xl sm:text-4xl font-bold tracking-tight text-noir uppercase">
            2PIECES, 3PIECES & SEPARATES
          </h2>

          <button
            onClick={() => {
              playTactileClick();
              onSeeMore('2PIECES');
            }}
            className="group flex items-center gap-2 text-xs font-sans-luxury font-semibold tracking-loose-couture text-noir hover:opacity-60 transition-opacity uppercase"
          >
            <span>Explore All</span>
            <span className="transform group-hover:translate-x-1.5 transition-transform">⟶</span>
          </button>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {separatesProducts.map((product) => {
            const defaultColorway = product.colorways.find((c) => c.isDefault) || product.colorways[0];

            return (
              <div
                key={product.id}
                onClick={() => {
                  playTactileClick();
                  onSelectProduct(product);
                }}
                className="group flex flex-col cursor-pointer bg-[#FFFFFF] border border-black/10 hover:border-black p-4 sm:p-5 rounded-xs transition-all duration-300 relative"
              >
                {/* Product Packshot Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAFAFA] mb-4 flex items-center justify-center p-4">
                  <img
                    src={defaultColorway.heroImageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 bg-black text-white text-[9px] font-mono-luxury tracking-couture uppercase rounded-xs">
                      {product.availability === 'ATELIER_EDITION' ? 'Atelier' : 'Couture'}
                    </span>
                  </div>
                </div>

                {/* Typography */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono-luxury text-muted uppercase tracking-wider block">
                    {product.fabricIntelligence.material.split('&')[0]}
                  </span>
                  <h3 className="text-xs sm:text-sm font-sans-luxury font-bold uppercase text-noir tracking-tight leading-snug group-hover:text-[#C5A880] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs sm:text-sm font-mono-luxury text-noir font-bold">
                      {formatPriceWithDisplay(product.basePriceKobo, displayCurrency)}
                    </div>
                    <span className="text-[10px] font-sans-luxury tracking-widest uppercase text-black font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      Discover ⟶
                    </span>
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
