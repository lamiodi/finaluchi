import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatPriceWithDisplay } from '../../utils/formatters';
import { useModalA11y } from '../../lib/useModalA11y';
import { webpVariant } from '../../utils/images';

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
  const panelRef = useModalA11y<HTMLDivElement>({ onClose, isOpen });

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
    <div className="fixed inset-0 z-[750] flex items-start justify-center pt-10 sm:pt-20 p-3 sm:p-4 bg-noir/80 backdrop-blur-md animate-in fade-in duration-200 font-sans-luxury">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search the collection"
        tabIndex={-1}
        className="bg-white text-noir w-full max-w-2xl border border-black/20 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col outline-none"
      >
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 bg-white border-b border-black/10 flex items-center gap-3 shrink-0">
          <Search className="w-5 h-5 text-bronze shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search silhouettes, fluid silks, couture tailoring..."
            aria-label="Search the collection"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-xs sm:text-base bg-transparent focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-[-8px] focus-visible:outline-noir/40 placeholder:text-muted font-sans-luxury text-noir"
          />
          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className="p-1.5 text-muted hover:text-noir transition-colors"
            aria-label="Close Search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        {!query && (
          <div className="p-6 space-y-3.5 bg-white">
            <span className="text-[10px] font-mono-luxury text-bronze-deep uppercase tracking-widest font-semibold block">
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
                  className="px-3.5 py-1.5 bg-white border border-black/15 hover:border-noir hover:bg-noir hover:text-white text-noir transition-all text-xs tracking-wide uppercase font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Stream */}
        {query && (
          <div className="max-h-96 overflow-y-auto p-5 space-y-3 divide-y divide-black/10 bg-white">
            <div role="status" className="text-[10px] font-mono-luxury text-muted uppercase tracking-wider pb-1">
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
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${prod.name}`}
                  onClick={() => {
                    playTactileClick();
                    onSelectProduct(prod);
                    onClose();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      playTactileClick();
                      onSelectProduct(prod);
                      onClose();
                    }
                  }}
                  className="pt-3.5 first:pt-0 flex items-center justify-between gap-4 cursor-pointer group hover:bg-black/5 p-3 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={webpVariant(prod.colorways[0].heroImageUrl, 480)}
                      alt={prod.name}
                      className="w-12 h-16 object-cover border border-black/10 shrink-0"
                    />
                    <div>
                      <span className="text-[9px] font-mono-luxury text-bronze-deep uppercase tracking-wider block">
                        {prod.categoryName} • {prod.fabricIntelligence.material.split('&')[0]}
                      </span>
                      <h4 className="font-sans-luxury font-semibold text-sm text-noir group-hover:text-champagne uppercase transition-colors">
                        {prod.name}
                      </h4>
                      <div className="text-xs font-mono-luxury font-bold text-noir mt-0.5">
                        {formatPriceWithDisplay(prod.basePriceKobo, displayCurrency)}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-noir transform group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
