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

  // All 13 Client-Approved Haute Couture Lookbook Cards for the StackSpread Scatter Scroll
  const hauteDeptCards: StackSpreadCard[] = [
    // 01. DRESSES
    {
      item: {
        src: '/images/.webp',
        alt: 'Fluid Silk Column Dresses',
        title: 'Silk Column Dresses',
        category: 'Dresses',
        tagline: 'Bias-cut silk and sculpted contours for milestone celebrations',
        onClick: () => handleNavigate('DRESSES'),
      },
      stackOffset: { x: -8, y: -10 },
      stackRotate: -16,
      target: { x: -35, y: -32, rotate: -2, scale: 0.9, w: 16, h: 28 },
      targetSm: { x: -22, y: -44 },
      z: 2,
    },
    // 02. DINNER_DRESSES
    {
      item: {
        src: '/images/.webp',
        alt: 'Grand Soirée & Gala Gowns',
        title: 'Event & Gala Gowns',
        category: 'Dinner Dresses',
        tagline: 'Corsetry, hand-laid embellishments and sweeping trains',
        onClick: () => handleNavigate('DINNER_DRESSES'),
      },
      stackOffset: { x: 12, y: -12 },
      stackRotate: 18,
      target: { x: 35, y: -30, rotate: 2, scale: 0.92, w: 16, h: 29 },
      targetSm: { x: 22, y: -44 },
      z: 3,
    },
    // 03. JACKETS
    {
      item: {
        src: '/images/.webp',
        alt: 'Pagoda Jackets & Blazers',
        title: 'Tailored Jackets',
        category: 'Jackets & Blazers',
        tagline: 'Pagoda shoulders, peplum definition and structured form',
        onClick: () => handleNavigate('JACKETS'),
      },
      stackOffset: { x: -14, y: 2 },
      stackRotate: -6,
      target: { x: -17, y: -34, rotate: 1, scale: 0.88, w: 15, h: 26 },
      targetSm: { x: -22, y: -30 },
      z: 4,
    },
    // 04. 3PIECES
    {
      item: {
        src: '/images/.webp',
        alt: '3-Piece Tailoring',
        title: '3-Piece Sets',
        category: 'Tailoring & Suites',
        tagline: 'Fully canvassed blazers, bustiers and palazzo trousers',
        onClick: () => handleNavigate('3PIECES'),
      },
      stackOffset: { x: 2, y: -8 },
      stackRotate: -2,
      target: { x: 17, y: -34, rotate: -1, scale: 0.88, w: 15, h: 26 },
      targetSm: { x: 22, y: -30 },
      z: 5,
    },
    // 05. 2PIECES
    {
      item: {
        src: '/images/.webp',
        alt: '2-Piece Coordinated Sets',
        title: '2-Piece Ensembles',
        category: 'Coordinated Sets',
        tagline: 'Sunburst pleated skirts, bustiers and cropped tailoring',
        onClick: () => handleNavigate('2PIECES'),
      },
      stackOffset: { x: 16, y: 4 },
      stackRotate: 8,
      target: { x: -38, y: -6, rotate: -3, scale: 0.88, w: 15, h: 26 },
      targetSm: { x: -22, y: -15 },
      z: 6,
    },
    // 06. KIMONO
    {
      item: {
        src: '/images/.webp',
        alt: 'Atelier Kimonos & Robes',
        title: 'Atelier Kimonos',
        category: 'Kimonos & Robes',
        tagline: 'Floor-sweeping liquid silk layers with gilded embroidery',
        onClick: () => handleNavigate('KIMONO'),
      },
      stackOffset: { x: -6, y: 10 },
      stackRotate: 5,
      target: { x: 38, y: -6, rotate: 2, scale: 0.88, w: 15, h: 26 },
      targetSm: { x: 22, y: -15 },
      z: 7,
    },
    // 07. JUMPSUITS
    {
      item: {
        src: '/images/.webp',
        alt: 'Sculptural Jumpsuits',
        title: 'Sculptural Jumpsuits',
        category: 'Jumpsuits',
        tagline: 'One-piece occasion dressing with internal boned corsetry',
        onClick: () => handleNavigate('JUMPSUITS'),
      },
      stackOffset: { x: 6, y: 8 },
      stackRotate: 3,
      target: { x: -37, y: 15, rotate: 1, scale: 0.88, w: 15, h: 26 },
      targetSm: { x: -22, y: 15 },
      z: 8,
    },
    // 08. PANTS
    {
      item: {
        src: '/images/.webp',
        alt: 'Pants & Palazzo',
        title: 'Palazzo Trousers',
        category: 'Pants & Palazzo',
        tagline: 'High-waisted fluid columns designed to elongate the silhouette',
        onClick: () => handleNavigate('PANTS'),
      },
      stackOffset: { x: 18, y: 12 },
      stackRotate: -8,
      target: { x: 37, y: 15, rotate: -2, scale: 0.88, w: 15, h: 26 },
      targetSm: { x: 22, y: 15 },
      z: 9,
    },
    // 09. SHIRTS
    {
      item: {
        src: '/images/.webp',
        alt: 'Architectural Shirting',
        title: 'Architectural Shirts',
        category: 'Shirts',
        tagline: 'Crisp poplin, exaggerated cuffs and sculptural collars',
        onClick: () => handleNavigate('SHIRTS'),
      },
      stackOffset: { x: -10, y: -4 },
      stackRotate: -12,
      target: { x: -32, y: 34, rotate: -2, scale: 0.86, w: 15, h: 26 },
      targetSm: { x: -22, y: 30 },
      z: 10,
    },
    // 10. SKIRTS
    {
      item: {
        src: '/images/.webp',
        alt: 'Sunburst & Pleated Skirts',
        title: 'Sunburst Skirts',
        category: 'Skirts',
        tagline: 'Knife-pleated floor-sweeping movement with clean weighted hems',
        onClick: () => handleNavigate('SKIRTS'),
      },
      stackOffset: { x: 8, y: -6 },
      stackRotate: 12,
      target: { x: -16, y: 36, rotate: 1, scale: 0.86, w: 15, h: 26 },
      targetSm: { x: 22, y: 30 },
      z: 11,
    },
    // 11. TOPS
    {
      item: {
        src: '/images/.webp',
        alt: 'Tops & Sculpted Bustiers',
        title: 'Tops & Bustiers',
        category: 'Tops',
        tagline: 'Internal boned bustiers and asymmetric draped necklines',
        onClick: () => handleNavigate('TOPS'),
      },
      stackOffset: { x: -4, y: 6 },
      stackRotate: -4,
      target: { x: 0, y: 37, rotate: -1, scale: 0.86, w: 15, h: 26 },
      targetSm: { x: -22, y: 44 },
      z: 12,
    },
    // 12. PLAYSUIT
    {
      item: {
        src: '/images/.webp',
        alt: 'Tailored Playsuits',
        title: 'Couture Playsuits',
        category: 'Playsuits',
        tagline: 'Peaked lapels, silk satin and cinched obi sash precision',
        onClick: () => handleNavigate('PLAYSUIT'),
      },
      stackOffset: { x: 10, y: 14 },
      stackRotate: 7,
      target: { x: 16, y: 36, rotate: 2, scale: 0.86, w: 15, h: 26 },
      targetSm: { x: 22, y: 44 },
      z: 13,
    },
    // 13. BIKINI
    {
      item: {
        src: '/images/.webp',
        alt: 'Bikini & Resort',
        title: 'Bikini & Resort',
        category: 'Bikini & Resort',
        tagline: 'Sculpting Italian metallic microfibers and matching silk wraps',
        onClick: () => handleNavigate('BIKINI'),
      },
      stackOffset: { x: 0, y: 0 },
      stackRotate: 0,
      target: { x: 32, y: 34, rotate: -1, scale: 0.86, w: 15, h: 26 },
      targetSm: { x: 0, y: 56 },
      z: 14,
    },
  ];



  // 6 Curated Lookbook Cards for Mobile Viewports:
  // 3 cards scatter UP (above write-up), 3 cards scatter DOWN (below write-up),
  // framing the text write-up cleanly in the middle.
  const mobileDeptCards: StackSpreadCard[] = [
    // 01. DRESSES (UP - Top Left)
    {
      item: {
        src: '/images/.webp',
        alt: 'Fluid Silk Column Dresses',
        title: 'Silk Column Dresses',
        category: 'Dresses',
        tagline: 'Bias-cut silk and sculpted contours',
        onClick: () => handleNavigate('DRESSES'),
      },
      stackOffset: { x: -6, y: -6 },
      stackRotate: -14,
      target: { x: -28, y: -33, rotate: -6, scale: 0.88, w: 27, h: 16 },
      targetSm: { x: -28, y: -33, rotate: -6, scale: 0.88, w: 27, h: 16 },
      z: 2,
    },
    // 02. JACKETS (UP - Top Center)
    {
      item: {
        src: '/images/.webp',
        alt: 'Pagoda Jackets & Blazers',
        title: 'Tailored Jackets',
        category: 'Tailoring',
        tagline: 'Pagoda shoulders and structured form',
        onClick: () => handleNavigate('JACKETS'),
      },
      stackOffset: { x: 0, y: -8 },
      stackRotate: 3,
      target: { x: 0, y: -36, rotate: 1, scale: 0.88, w: 27, h: 16 },
      targetSm: { x: 0, y: -36, rotate: 1, scale: 0.88, w: 27, h: 16 },
      z: 3,
    },
    // 03. 2PIECES (UP - Top Right)
    {
      item: {
        src: '/images/.webp',
        alt: '2-Piece Coordinated Sets',
        title: '2-Piece Ensembles',
        category: 'Coordinated Sets',
        tagline: 'Sunburst pleated skirts and bustiers',
        onClick: () => handleNavigate('2PIECES'),
      },
      stackOffset: { x: 7, y: -5 },
      stackRotate: 16,
      target: { x: 28, y: -33, rotate: 6, scale: 0.88, w: 27, h: 16 },
      targetSm: { x: 28, y: -33, rotate: 6, scale: 0.88, w: 27, h: 16 },
      z: 4,
    },
    // 04. JUMPSUITS (DOWN - Bottom Left)
    {
      item: {
        src: '/images/.webp',
        alt: 'Sculptural Jumpsuits',
        title: 'Sculptural Jumpsuits',
        category: 'Jumpsuits',
        tagline: 'One-piece occasion dressing with corsetry',
        onClick: () => handleNavigate('JUMPSUITS'),
      },
      stackOffset: { x: -7, y: 5 },
      stackRotate: -8,
      target: { x: -28, y: 33, rotate: 4, scale: 0.88, w: 27, h: 16 },
      targetSm: { x: -28, y: 33, rotate: 4, scale: 0.88, w: 27, h: 16 },
      z: 5,
    },
    // 05. KIMONO (DOWN - Bottom Center)
    {
      item: {
        src: '/images/.webp',
        alt: 'Atelier Kimonos & Robes',
        title: 'Atelier Kimonos',
        category: 'Kimonos',
        tagline: 'Liquid silk layers with gilded embroidery',
        onClick: () => handleNavigate('KIMONO'),
      },
      stackOffset: { x: 0, y: 7 },
      stackRotate: -2,
      target: { x: 0, y: 36, rotate: -2, scale: 0.88, w: 27, h: 16 },
      targetSm: { x: 0, y: 36, rotate: -2, scale: 0.88, w: 27, h: 16 },
      z: 6,
    },
    // 06. DINNER_DRESSES / CORSETS (DOWN - Bottom Right)
    {
      item: {
        src: '/images/.webp',
        alt: 'Grand Soirée & Gala Gowns',
        title: 'Gala & Corset Gowns',
        category: 'Corsetry & Gowns',
        tagline: 'Sculpted corsetry and dramatic trains',
        onClick: () => handleNavigate('DINNER_DRESSES'),
      },
      stackOffset: { x: 6, y: 4 },
      stackRotate: 10,
      target: { x: 28, y: 33, rotate: -5, scale: 0.88, w: 27, h: 16 },
      targetSm: { x: 28, y: 33, rotate: -5, scale: 0.88, w: 27, h: 16 },
      z: 7,
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] border-b border-black/10">
      
      {/* =========================================================================
          DESKTOP & LARGE VIEWPORTS: CINEMATIC SCROLL-TO-EXPLORE SCATTER STAGE
          ========================================================================= */}
      <div className="hidden lg:block">
        <StackSpreadStage
          cards={hauteDeptCards}
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
                Atelier Portfolio · 13 Silhouettes
              </span>
              <h2 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-noir uppercase leading-[1.02]">
                Find Your Finaluchi Silhouette
              </h2>
            </div>
          }
          subtitle={
            <div className="mt-4 max-w-2xl mx-auto space-y-5 pointer-events-auto px-4">
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed tracking-normal">
                Explore all 13 client-approved categories, from dresses and coordinated sets to tailoring, kimonos, jumpsuits and resort pieces.
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => handleNavigate('ALL')}
                  className="group inline-flex items-center gap-2.5 px-7 py-3 bg-black text-white text-[11px] font-sans-luxury font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all rounded-xs shadow-sm hover:gap-3.5"
                >
                  <span>Shop All Categories</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform" />
                </button>
              </div>
            </div>
          }
        />
      </div>

      {/* =========================================================================
          MOBILE & TABLET VIEWPORTS (< 1024px): SCATTER UP & DOWN, WRITE-UP IN MIDDLE
          ========================================================================= */}
      <div className="block lg:hidden w-full bg-[#FFFFFF]">
        <StackSpreadStage
          cards={mobileDeptCards}
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
                Atelier Portfolio
              </span>
              <h2 className="font-sans-luxury text-2xl sm:text-3xl font-bold tracking-tight text-noir uppercase leading-[1.08]">
                Find Your Silhouette
              </h2>
            </div>
          }
          subtitle={
            <div className="mt-2.5 max-w-xs mx-auto space-y-3.5 pointer-events-auto px-4">
              <p className="text-[11px] text-neutral-600 font-light leading-relaxed tracking-normal">
                Explore signature couture cuts — fluid gowns, sculpted tailoring, kimonos & occasion separates.
              </p>
              <div className="flex items-center justify-center pt-1">
                <button
                  onClick={() => handleNavigate('ALL')}
                  className="group inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white text-[10px] font-sans-luxury font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all rounded-xs shadow-sm"
                >
                  <span>All Categories</span>
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
