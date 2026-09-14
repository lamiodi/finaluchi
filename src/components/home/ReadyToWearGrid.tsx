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
  const rtwProducts = products.slice(0, 4);

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
          {rtwProducts.map((product, idx) => (
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
