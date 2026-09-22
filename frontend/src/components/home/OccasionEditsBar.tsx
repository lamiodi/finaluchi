import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCategory } from '../../types';
import { useAudioStore } from '../../stores/audioStore';
import { StackSpreadStage, StackSpreadCard } from '../ui/stack-spread';

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

  // The five photographed pieces of the live capsule.
  const capsuleCards: StackSpreadCard[] = [
    // 01. DRESSES — The Rossa
    {
      item: {
        src: '/images/products/rossa-dress/rossa-1.jpeg',
        alt: 'The Rossa Dress',
        title: 'The Rossa Dress',
        category: 'Dresses',
        tagline: 'House leopard, shoulder rosette, asymmetric hem — sizes 6–16',
        onClick: () => handleNavigate('DRESSES'),
      },
      stackOffset: { x: -8, y: -10 },
      stackRotate: -16,
      target: { x: -35, y: -32, rotate: -2, scale: 0.9, w: 16, h: 28 },
      targetSm: { x: -22, y: -44 },
      z: 2,
    },
    // 02. JUMPSUITS — The Cleo
    {
      item: {
        src: '/images/products/cleo-capri-jumpsuit/cleo-1.jpeg',
        alt: 'Cleo Capri Jumpsuit',
        title: 'Cleo Capri Jumpsuit',
        category: 'Jumpsuits',
        tagline: 'Plunging halter with the leopard sash — sizes 6–14',
        onClick: () => handleNavigate('JUMPSUITS'),
      },
      stackOffset: { x: 12, y: -12 },
      stackRotate: 18,
      target: { x: 35, y: -30, rotate: 2, scale: 0.92, w: 16, h: 29 },
      targetSm: { x: 22, y: -44 },
      z: 3,
    },
    // 03. TOPS — Dahlia Tank
    {
      item: {
        src: '/images/products/dahlia-tank-top/dahlia-4.jpeg',
        alt: 'Dahlia Tank Top',
        title: 'Dahlia Tank Top',
        category: 'Tops',
        tagline: 'Ribbed crop with the leopard teardrop — S–L',
        onClick: () => handleNavigate('TOPS'),
      },
      stackOffset: { x: -14, y: 2 },
      stackRotate: -6,
      target: { x: -17, y: -34, rotate: 1, scale: 0.88, w: 15, h: 26 },
      targetSm: { x: -22, y: 15 },
      z: 4,
    },
    // 04. SKIRTS — Dahlia Skirt
    {
      item: {
        src: '/images/products/dahlia-skirt/dahlia-1.jpeg',
        alt: 'Dahlia Skirt',
        title: 'Dahlia Skirt',
        category: 'Skirts',
        tagline: '3D rosettes in deep house wine — sizes 6–18',
        onClick: () => handleNavigate('SKIRTS'),
      },
      stackOffset: { x: 2, y: -8 },
      stackRotate: -2,
      target: { x: 17, y: -34, rotate: -1, scale: 0.88, w: 15, h: 26 },
      targetSm: { x: 22, y: 15 },
      z: 5,
    },
    // 05. 2PIECES — Leonie
    {
      item: {
        src: '/images/products/leonie-capri-lounge-2-piece/leonie-3.jpeg',
        alt: 'Leonie Capri Lounge 2 Piece',
        title: 'Leonie Lounge Set',
        category: '2 Pieces',
        tagline: 'Leopard jersey with red ribbon ties — sizes 10–16',
        onClick: () => handleNavigate('2PIECES'),
      },
      stackOffset: { x: 16, y: 4 },
      stackRotate: 8,
      target: { x: 0, y: 37, rotate: -1, scale: 0.88, w: 15, h: 26 },
      targetSm: { x: 0, y: 56 },
      z: 6,
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] border-b border-black/10">

      {/* =========================================================================
          DESKTOP & LARGE VIEWPORTS: CINEMATIC SCROLL-TO-EXPLORE SCATTER STAGE
          ========================================================================= */}
      <div className="hidden lg:block">
        <StackSpreadStage
          cards={capsuleCards}
          scrollLength={320}
          bgColor="#FFFFFF"
          clusterRotation={true}
          stackScale={0.82}
          cardRadius={6}
          textColor="#000000"
          textFadeStart={0.20}
          showScrollHint={true}
          heading={
            <div className="space-y-3 max-w-4xl mx-auto pointer-events-none px-4">
              <span className="text-[10px] sm:text-[11px] font-mono-luxury uppercase tracking-[0.3em] text-[#8C7A6B] font-medium block">
                The Capsule · Five Pieces
              </span>
              <h2 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-noir uppercase leading-[1.02]">
                Find Your Finaluchi Piece
              </h2>
            </div>
          }
          subtitle={
            <div className="mt-4 max-w-2xl mx-auto space-y-5 pointer-events-auto px-4">
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed tracking-normal">
                Five ready-to-wear pieces — dresses, jumpsuits, tops, skirts and lounge sets — photographed on the Finaluchi client.
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => handleNavigate('ALL')}
                  className="group inline-flex items-center gap-2.5 px-7 py-3 bg-black text-white text-[11px] font-sans-luxury font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all rounded-xs shadow-sm hover:gap-3.5"
                >
                  <span>Shop the Capsule</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform" />
                </button>
              </div>
            </div>
          }
        />
      </div>

      {/* =========================================================================
          MOBILE & TABLET VIEWPORTS (< 1024px)
          ========================================================================= */}
      <div className="block lg:hidden w-full bg-[#FFFFFF]">
        <StackSpreadStage
          cards={capsuleCards}
          scrollLength={250}
          bgColor="#FFFFFF"
          clusterRotation={true}
          stackScale={0.78}
          cardRadius={6}
          textColor="#000000"
          textFadeStart={0.14}
          showScrollHint={true}
          heading={
            <div className="space-y-2 max-w-xs mx-auto pointer-events-none px-4">
              <span className="text-[10px] font-mono-luxury uppercase tracking-[0.28em] text-[#8C7A6B] font-medium block">
                The Capsule
              </span>
              <h2 className="font-sans-luxury text-2xl sm:text-3xl font-bold tracking-tight text-noir uppercase leading-[1.08]">
                Find Your Piece
              </h2>
            </div>
          }
          subtitle={
            <div className="mt-2.5 max-w-xs mx-auto space-y-3.5 pointer-events-auto px-4">
              <p className="text-[11px] text-neutral-600 font-light leading-relaxed tracking-normal">
                Five ready-to-wear pieces, photographed on the Finaluchi client.
              </p>
              <div className="flex items-center justify-center pt-1">
                <button
                  onClick={() => handleNavigate('ALL')}
                  className="group inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white text-[10px] font-sans-luxury font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all rounded-xs shadow-sm"
                >
                  <span>Shop the Capsule</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          }
        />
      </div>

    </div>
  );
};
