import React, { useState, useMemo } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { useAudioStore } from '../../stores/audioStore';
import { ProductCard } from '../common/ProductCard';

interface ReadyToWearGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSeeMore: () => void;
}

type FilterTab = 'ALL' | 'TAILORING' | 'SILKS' | 'SETS';

export const ReadyToWearGrid: React.FC<ReadyToWearGridProps> = ({
  products,
  onSelectProduct,
  onSeeMore,
}) => {
  const { playTactileClick } = useAudioStore();
  const [activeTab, setActiveTab] = useState<FilterTab>('ALL');

  // Filtered slice of curated RTW looks
  const displayProducts = useMemo(() => {
    if (activeTab === 'TAILORING') {
      const filtered = products.filter((p) =>
        ['PANTS', 'JACKETS', '3PIECES', 'SHIRTS'].includes(p.pillar)
      );
      return filtered.slice(0, 4);
    }
    if (activeTab === 'SILKS') {
      const filtered = products.filter((p) =>
        ['DRESSES', 'DINNER_DRESSES', 'KIMONO'].includes(p.pillar)
      );
      return filtered.slice(0, 4);
    }
    if (activeTab === 'SETS') {
      const filtered = products.filter((p) =>
        ['2PIECES', '3PIECES', 'PLAYSUIT'].includes(p.pillar)
      );
      return filtered.slice(0, 4);
    }
    return products.slice(0, 4);
  }, [products, activeTab]);

  return (
    <section className="w-full bg-[#FFFFFF] py-16 sm:py-24 border-b border-black/[0.08]">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header: Haute Couture Editorial Staging */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/10 mb-8 sm:mb-12">
          
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              <span className="text-[10px] sm:text-xs font-mono-luxury uppercase tracking-[0.26em] text-[#A67C4A] font-semibold">
                Maison Curation · Ready-to-Wear
              </span>
            </div>

            <h2 className="font-sans-luxury text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-noir uppercase">
              READY-TO-WEAR ARCHIVE
            </h2>

            <p className="text-xs sm:text-sm text-black/60 font-light leading-relaxed">
              Sculptural form, fluid mulberry silks, and sharp architectural tailoring crafted in limited runs at our Abuja atelier.
            </p>
          </div>

          {/* Right: Quick Category Filter Pills + View All */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            
            {/* Minimalist Tab Pills */}
            <div className="flex items-center gap-1 p-1 bg-[#F9F8F6] border border-black/10 text-[10px] font-sans-luxury font-semibold uppercase tracking-wider">
              {[
                { id: 'ALL', label: 'All Curated' },
                { id: 'TAILORING', label: 'Tailoring' },
                { id: 'SILKS', label: 'Silks' },
                { id: 'SETS', label: 'Ensembles' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    playTactileClick();
                    setActiveTab(tab.id as FilterTab);
                  }}
                  className={`px-2.5 py-1.5 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-black text-white shadow-xs'
                      : 'text-black/60 hover:text-black hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View Full Archive Action */}
            <button
              onClick={() => {
                playTactileClick();
                onSeeMore();
              }}
              className="group flex items-center gap-2 px-4 py-2 text-xs font-sans-luxury font-bold tracking-[0.15em] text-noir hover:text-[#A67C4A] transition-all uppercase border border-black/15 hover:border-black"
            >
              <span>View Full Archive</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#A67C4A]" />
            </button>
          </div>

        </div>

        {/* 4-Column Product Grid (2-col on mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              priority={idx < 2}
            />
          ))}
        </div>

        {/* Section Footnote: Maison Assurance */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-black/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-[10px] sm:text-[11px] font-mono-luxury uppercase tracking-[0.2em] text-black/50">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            <span>Complimentary Bespoke Alterations</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
            <span>Signature Keepsake Box Packaging</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
            <span>Worldwide Express VIP Dispatch</span>
          </div>
        </div>

      </div>
    </section>
  );
};
