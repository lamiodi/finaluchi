import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCategory } from '../../types';
import { useAudioStore } from '../../stores/audioStore';
import { HaloReel, type HaloReelItem } from '../ui/halo-reel';

interface OccasionEditsBarProps {
  onSelectCategory?: (category: ProductCategory) => void;
  onSelectOccasion?: (occasion: any) => void;
}

export const OccasionEditsBar: React.FC<OccasionEditsBarProps> = ({
  onSelectCategory,
  onSelectOccasion
}) => {
  const { playTactileClick } = useAudioStore();

  const handleNavigate = (catId: ProductCategory | 'ALL') => {
    playTactileClick();
    if (onSelectCategory) {
      onSelectCategory(catId as any);
    } else if (onSelectOccasion) {
      onSelectOccasion(catId as any);
    }
  };

  // The five photographed pieces of the live capsule — the reel repeats them
  // around the ring; repeats are marked decorative inside HaloReel.
  const capsuleItems: HaloReelItem[] = [
    {
      src: '/images/products/rossa-dress/rossa-1-640w.webp',
      alt: 'The Rossa Dress — house leopard print with shoulder rosette',
    },
    {
      src: '/images/products/cleo-capri-jumpsuit/cleo-1-640w.webp',
      alt: 'Cleo Capri Jumpsuit — plunging halter with leopard sash',
    },
    {
      src: '/images/products/dahlia-tank-top/dahlia-4-640w.webp',
      alt: 'Dahlia Tank Top — ribbed crop with leopard teardrop',
    },
    {
      src: '/images/products/dahlia-skirt/dahlia-1-640w.webp',
      alt: 'Dahlia Skirt — hand-mounted 3D rosettes in house wine',
    },
    {
      src: '/images/products/leonie-capri-lounge-2-piece/leonie-3-640w.webp',
      alt: 'Leonie Capri Lounge 2 Piece — leopard jersey with red ribbon ties',
    },
  ];

  return (
    <section className="w-full bg-white border-b border-black/10">

      {/* Section Header */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-8 sm:pb-12">
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <span className="text-[10px] sm:text-[11px] font-mono-luxury uppercase tracking-[0.3em] text-taupe font-medium block">
            The Capsule · Five Pieces
          </span>
          <h2 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-noir uppercase leading-[1.02]">
            Find Your Finaluchi Piece
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed tracking-normal">
            Five ready-to-wear pieces — dresses, jumpsuits, tops, skirts and lounge sets — photographed on the Finaluchi client.
          </p>
          <div className="pt-2">
            <button
              onClick={() => handleNavigate('ALL')}
              className="group inline-flex items-center gap-2.5 px-7 py-3 bg-black text-white text-[11px] font-sans-luxury font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all rounded-xs shadow-sm hover:gap-3.5"
            >
              <span>Shop the Capsule</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Halo Reel — five pieces orbiting the house wordmark. Drag, swipe or
          use arrow keys to turn the ring; it also turns on its own. */}
      <HaloReel
        items={capsuleItems}
        aria-label="The Finaluchi capsule — five ready-to-wear pieces"
        cardWidth={150}
        cardHeight={205}
        radiusXRatio={0.58}
        holdDuration={1600}
        stepDuration={800}
        centerLabel={
          // The ring nearly fills a phone-width stage, leaving no room to park
          // the wordmark — it only appears once there is space for it (md+).
          <div className="hidden md:block space-y-3">
            <span className="block font-sans-luxury text-2xl sm:text-4xl font-bold uppercase tracking-[0.06em] text-noir leading-none">
              Finaluchi
            </span>
            <span className="block text-[9px] sm:text-[10px] font-mono-luxury uppercase tracking-[0.34em] text-taupe">
              Ready-to-Wear Capsule
            </span>
          </div>
        }
        className="h-[440px] sm:h-[520px] lg:h-[600px]"
      />

    </section>
  );
};
