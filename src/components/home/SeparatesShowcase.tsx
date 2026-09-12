import React from 'react';
import { ArrowRight } from 'lucide-react';
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
    <section className="w-full bg-[#FFFFFF] py-16 sm:py-24 border-b border-black/10">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex items-end justify-between pb-5 border-b border-black/10 mb-8 sm:mb-12">
          <div>
            <span className="text-[10px] sm:text-xs font-mono-luxury uppercase tracking-[0.25em] text-neutral-500 block mb-1">
              Coordinated Ensembles
            </span>
            <h2 className="font-sans-luxury text-2xl sm:text-4xl font-bold tracking-tight text-noir uppercase">
              SETS & SEPARATES
            </h2>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onSeeMore('2PIECES');
            }}
            className="group flex items-center gap-1.5 text-xs font-sans-luxury font-semibold tracking-wider text-noir hover:text-[#A67C4A] transition-colors uppercase"
          >
            <span>Explore Sets</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Minimalist Product Grid (2-col mobile, 4-col desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {separatesProducts.map((product) => {
            const defaultColorway = product.colorways.find((c) => c.isDefault) || product.colorways[0];

            return (
              <div
                key={product.id}
                onClick={() => {
                  playTactileClick();
                  onSelectProduct(product);
                }}
                className="group flex flex-col cursor-pointer transition-all relative"
              >
                {/* Packshot Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F7F7F7] mb-3.5 flex items-center justify-center p-3 sm:p-4">
                  <img
                    src={defaultColorway.heroImageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-104 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
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
