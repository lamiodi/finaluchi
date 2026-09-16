import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useAudioStore } from '../../stores/audioStore';

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreCollection: () => void;
}

export const PromoModal: React.FC<PromoModalProps> = ({ isOpen, onClose, onExploreCollection }) => {
  const [visible, setVisible] = useState(false);
  const { playTactileClick } = useAudioStore();

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
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-[#000000]/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className={`bg-[#FFFFFF] text-[#000000] border border-black/20 max-w-md w-full p-8 sm:p-10 relative shadow-2xl transition-all duration-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            playTactileClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-black/40 hover:text-[#000000] transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center mb-6">
          <img
            src="/FINALUCHIlogo.jpg"
            alt="Finaluchi Couture"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </div>

        <span className="text-[10px] font-mono-luxury text-[#C5A880] uppercase tracking-[0.3em] font-semibold text-center block mb-1">
          FINALUCHI COUTURE · ABUJA
        </span>

        <h3 className="font-sans-luxury text-2xl font-bold tracking-tight text-[#000000] uppercase text-center leading-tight">
          Find Your Occasion Look
        </h3>

        <p className="text-xs sm:text-sm text-black/70 font-light text-center mt-3 leading-relaxed">
          Explore women&apos;s ready-to-wear and couture, or speak with the team about an asoebi,
          bridal or made-for-your-event piece.
        </p>

        <button
          onClick={handleExplore}
          className="mt-8 w-full py-4 bg-[#000000] text-[#FFFFFF] text-xs font-bold tracking-[0.25em] uppercase hover:bg-neutral-900 border border-[#000000] transition-all"
        >
          Explore the New Collection
        </button>

        <p className="text-[10px] text-black/50 font-mono-luxury uppercase tracking-widest text-center mt-4">
          Confirm availability, delivery date and order terms before payment
        </p>
      </div>
    </div>
  );
};
