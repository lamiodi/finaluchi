import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useCartStore } from '../../stores/cartStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatPriceWithDisplay } from '../../utils/formatters';
import { toast } from 'sonner';

interface RunwayModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const RunwayModeModal: React.FC<RunwayModeModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [currentLookIndex, setCurrentLookIndex] = useState(0);
  const { displayCurrency } = useCurrencyStore();
  const { addToCart } = useCartStore();
  const { playTactileClick, playRunwayWhoosh, playSuccessChime } = useAudioStore();

  const runwayLooks = products.filter((p) => p.isFeatured || p.availability === 'ATELIER_EDITION');
  const currentProduct = runwayLooks[currentLookIndex] || products[0];
  const defaultColorway = currentProduct?.colorways[0];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        playRunwayWhoosh();
        setCurrentLookIndex((prev) => (prev + 1) % runwayLooks.length);
      } else if (e.key === 'ArrowLeft') {
        playRunwayWhoosh();
        setCurrentLookIndex((prev) => (prev - 1 + runwayLooks.length) % runwayLooks.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, runwayLooks.length, onClose, playRunwayWhoosh]);

  if (!isOpen || !currentProduct) return null;

  const handleQuickAdd = () => {
    playSuccessChime();
    addToCart(currentProduct, defaultColorway, 'M', 1);
    toast.success(`${currentProduct.name} added to your Concierge Bag.`);
  };

  return (
    <div className="fixed inset-0 z-[800] bg-[#000000] text-white flex flex-col justify-between p-3 sm:p-8 animate-in fade-in duration-300">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between z-20">
        <div className="flex items-center gap-2 sm:gap-3">
          <Sparkles className="w-4 h-4 text-[#C5A880] animate-pulse shrink-0" />
          <span className="font-sans-luxury text-sm sm:text-lg tracking-[0.2em] sm:tracking-[0.25em] text-white uppercase font-bold">
            FINALUCHI RUNWAY
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono-luxury text-[#C5A880] border border-[#C5A880]/40 px-2 py-0.5 rounded-xs">
            AUTUMN / WINTER 2026
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden lg:inline text-xs text-white/50 font-mono-luxury">
            USE ARROW KEYS [← →] OR CLICK TO SWEEP LOOKS • [ESC] TO EXIT
          </span>
          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Exit Runway Mode"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Main Center Catwalk Stage */}
      <div className="relative flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden">
        
        {/* Navigation Arrow Left */}
        <button
          onClick={() => {
            playRunwayWhoosh();
            setCurrentLookIndex((prev) => (prev - 1 + runwayLooks.length) % runwayLooks.length);
          }}
          className="absolute left-1 sm:left-6 z-30 p-2 sm:p-3 rounded-full bg-noir/80 border border-white/20 hover:border-white text-white hover:text-white transition-all btn-luxury"
          aria-label="Previous Look"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Model Lookbook Display */}
        <div className="relative h-full max-h-[82vh] aspect-[3/4.5] bg-noir rounded-xs overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center">
          <img
            src={defaultColorway.heroImageUrl}
            alt={currentProduct.name}
            className="w-full h-full object-cover object-top animate-in zoom-in-95 duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent opacity-80" />
          
          {/* Piece Overlay Card */}
          <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 p-4 sm:p-6 bg-noir/90 backdrop-blur-md border border-white/20 rounded-xs space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono-luxury text-[#C5A880] uppercase">
              <span>LOOK 0{currentLookIndex + 1} OF 0{runwayLooks.length}</span>
              <span>{currentProduct.pillar.replace('_', ' ')}</span>
            </div>

            <h3 className="font-sans-luxury text-base sm:text-2xl font-bold text-white uppercase tracking-tight line-clamp-1 sm:line-clamp-none">
              {currentProduct.name}
            </h3>

            <div className="text-xs sm:text-sm font-mono-luxury text-white/90 font-medium">
              {formatPriceWithDisplay(currentProduct.basePriceKobo, displayCurrency)}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
              <button
                onClick={() => {
                  playTactileClick();
                  onSelectProduct(currentProduct);
                  onClose();
                }}
                className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 bg-white text-noir text-[11px] sm:text-xs font-bold tracking-loose-couture uppercase hover:bg-neutral-200 hover:text-noir transition-all btn-luxury rounded-xs flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>EXPLORE</span>
              </button>

              <button
                onClick={handleQuickAdd}
                className="py-2 sm:py-2.5 px-3 sm:px-5 bg-white/10 hover:bg-white hover:text-noir text-white text-[11px] sm:text-xs font-bold tracking-loose-couture uppercase transition-all btn-luxury rounded-xs flex items-center justify-center gap-1.5 sm:gap-2 border border-white/25"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>QUICK ADD</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrow Right */}
        <button
          onClick={() => {
            playRunwayWhoosh();
            setCurrentLookIndex((prev) => (prev + 1) % runwayLooks.length);
          }}
          className="absolute right-1 sm:right-6 z-30 p-2 sm:p-3 rounded-full bg-noir/80 border border-white/20 hover:border-white text-white hover:text-white transition-all btn-luxury"
          aria-label="Next Look"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-20">
        {runwayLooks.map((look, idx) => (
          <button
            key={look.id}
            onClick={() => {
              playRunwayWhoosh();
              setCurrentLookIndex(idx);
            }}
            className={`w-12 h-16 rounded-xs overflow-hidden border transition-all ${
              idx === currentLookIndex ? 'border-white scale-110 shadow-md ring-2 ring-white/50' : 'border-white/20 opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={look.colorways[0].heroImageUrl}
              alt={look.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

    </div>
  );
};
