import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatPriceWithDisplay } from '../../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const { displayCurrency } = useCurrencyStore();
  const { playTactileClick } = useAudioStore();

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.headline.toLowerCase().includes(q) ||
        p.fabricIntelligence.material.toLowerCase().includes(q) ||
        p.colorways.some((cw) => cw.color.name.toLowerCase().includes(q) || cw.color.code.toLowerCase().includes(q)) ||
        p.occasions.some((occ) => occ.toLowerCase().includes(q))
      );
    });
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[750] flex items-start justify-center pt-10 sm:pt-20 p-3 sm:p-4 bg-[#000000]/80 backdrop-blur-md animate-in fade-in duration-200 font-sans-luxury">
      <div className="bg-[#FFFFFF] text-[#000000] w-full max-w-2xl border border-black/20 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 bg-[#FFFFFF] border-b border-black/10 flex items-center gap-3 shrink-0">
          <Search className="w-5 h-5 text-[#C5A880] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search silhouettes, fluid silks, couture tailoring..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-xs sm:text-base bg-transparent focus:outline-none placeholder:text-black/40 font-sans-luxury text-[#000000]"
          />
          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className="p-1.5 text-black/50 hover:text-[#000000] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        {!query && (
          <div className="p-6 space-y-3.5 bg-[#FFFFFF]">
            <span className="text-[10px] font-mono-luxury text-[#C5A880] uppercase tracking-widest font-semibold block">
              EXPLORE ATELIER CATEGORIES:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Pants', 'Jumpsuits', 'Kimono', 'Tops', 'Shirts', '2pieces', '3pieces', 'Dresses', 'Skirts', 'Playsuit', 'Bikini', 'Jackets', 'Dinner dresses'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    playTactileClick();
                    setQuery(tag);
                  }}
                  className="px-3.5 py-1.5 bg-[#FFFFFF] border border-black/15 hover:border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] text-[#000000] transition-all text-xs tracking-wide uppercase font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Stream */}
        {query && (
          <div className="max-h-96 overflow-y-auto p-5 space-y-3 divide-y divide-black/10 bg-[#FFFFFF]">
            <div className="text-[10px] font-mono-luxury text-black/50 uppercase tracking-wider pb-1">
              Found {searchResults.length} creations matching "{query}"
            </div>

            {searchResults.length === 0 ? (
              <div className="py-10 text-center text-xs text-black/60 font-light">
                No matching creations found in the atelier archive.
              </div>
            ) : (
              searchResults.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    playTactileClick();
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="pt-3.5 first:pt-0 flex items-center justify-between gap-4 cursor-pointer group hover:bg-black/5 p-3 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={prod.colorways[0].heroImageUrl}
                      alt={prod.name}
                      className="w-12 h-16 object-cover border border-black/10 shrink-0"
                    />
                    <div>
                      <span className="text-[9px] font-mono-luxury text-[#C5A880] uppercase tracking-wider block">
                        {prod.categoryName} • {prod.fabricIntelligence.material.split('&')[0]}
                      </span>
                      <h4 className="font-sans-luxury font-semibold text-sm text-[#000000] group-hover:text-[#C5A880] uppercase transition-colors">
                        {prod.name}
                      </h4>
                      <div className="text-xs font-mono-luxury font-bold text-[#000000] mt-0.5">
                        {formatPriceWithDisplay(prod.basePriceKobo, displayCurrency)}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-black/40 group-hover:text-[#000000] transform group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
