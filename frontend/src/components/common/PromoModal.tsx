import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useAudioStore } from '../../stores/audioStore';
import { useModalA11y } from '../../lib/useModalA11y';

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreCollection: () => void;
}

export const PromoModal: React.FC<PromoModalProps> = ({ isOpen, onClose, onExploreCollection }) => {
  const [visible, setVisible] = useState(false);
  const { playTactileClick } = useAudioStore();
  const panelRef = useModalA11y<HTMLDivElement>({ onClose, isOpen });

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setVisible(true), 400);
      return () => clearTimeout(t);
    }
    setVisible(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleExplore = () => {
    playTactileClick();
    onExploreCollection();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-noir/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-title"
        tabIndex={-1}
        className={`bg-white text-noir border border-black/20 max-w-md w-full p-8 sm:p-10 relative shadow-2xl transition-all duration-300 outline-none ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            playTactileClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-muted hover:text-noir transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center mb-6">
          <img
            src="/FINALUCHIlogo.webp"
            alt="Finaluchi Couture"
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </div>

        <span className="text-[10px] font-mono-luxury text-champagne uppercase tracking-[0.3em] font-semibold text-center block mb-1">
          FINALUCHI COUTURE · ABUJA
        </span>

        <h3 id="promo-title" className="font-sans-luxury text-2xl font-bold tracking-tight text-noir uppercase text-center leading-tight">
          Find Your Occasion Look
        </h3>

        <p className="text-xs sm:text-sm text-black/70 font-light text-center mt-3 leading-relaxed">
          Explore women&apos;s ready-to-wear and couture, or speak with the team about an asoebi,
          bridal or made-for-your-event piece.
        </p>

        <button
          onClick={handleExplore}
          className="mt-8 w-full py-4 bg-noir text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-neutral-900 border border-noir transition-all"
        >
          Explore the New Collection
        </button>

        <p className="text-[10px] text-muted font-mono-luxury uppercase tracking-widest text-center mt-4">
          Confirm availability, delivery date and order terms before payment
        </p>
      </div>
    </div>
  );
};
