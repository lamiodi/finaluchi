import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useAudioStore } from '../../stores/audioStore';
import { ProductCard } from '../common/ProductCard';

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
  const { playTactileClick } = useAudioStore();

  return (
    <section className="w-full bg-[#FFFFFF] py-16 sm:py-24 border-b border-black/[0.08]">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/10 mb-8 sm:mb-12">

          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              <span className="text-[10px] sm:text-xs font-mono-luxury uppercase tracking-[0.26em] text-[#A67C4A] font-semibold">
                Maison Curation · Ready-to-Wear
              </span>
            </div>

            <h2 className="font-sans-luxury text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-noir uppercase">
              The Capsule
            </h2>

            <p className="text-xs sm:text-sm text-black/60 font-light leading-relaxed">
              House prints, hand-mounted rosettes and easy jersey — five ready-to-wear pieces, photographed on the Finaluchi client.
            </p>
          </div>

          {/* View Full Archive Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                playTactileClick();
                onSeeMore();
              }}
              className="group flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 text-xs font-sans-luxury font-bold tracking-[0.15em] text-noir hover:text-[#A67C4A] transition-all uppercase border border-black/15 hover:border-black active:scale-[0.98]"
            >
              <span>Shop the Capsule</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#A67C4A]" />
            </button>
          </div>

        </div>

        {/* Product Grid (2-col on mobile, 5 across on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6 lg:gap-8">
          {products.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              priority={idx < 2}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
