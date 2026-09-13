import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCategory } from '../../types';
import { useAudioStore } from '../../stores/audioStore';
import { StackSpreadStage, StackSpreadCard } from '../ui/stack-spread';

interface OccasionEditsBarProps {
  onSelectCategory?: (category: ProductCategory) => void;
  onSelectOccasion?: (occasion: any) => void;
}

const MOBILE_STAGE_TARGETS = [
  { x: -32, y: -1 },
  { x: 0, y: -1 },
  { x: 32, y: -1 },
  { x: -32, y: 1 },
  { x: 0, y: 1 },
  { x: 32, y: 1 },
] as const;

function useDesktopStage() {
  const query = '(min-width: 1024px)';
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isDesktop;
}

export const OccasionEditsBar: React.FC<OccasionEditsBarProps> = ({ 
  onSelectCategory, 
  onSelectOccasion 
}) => {
  const { playTactileClick } = useAudioStore();
  const isDesktopStage = useDesktopStage();

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
        src: '/images/fc_asymmetric_silk_dress.jpg',
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
        src: '/images/fc_haute_soiree_gown.jpg',
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
        src: '/images/fc_tailoring_suite.jpg',
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
        src: '/images/fc_luxury_threepiece.jpg',
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
        src: '/images/fc_bustier_pleated_skirt.jpg',
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
        src: '/images/fc_luxury_kimono.jpg',
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
        src: '/images/fc_luxury_jumpsuit.jpg',
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
        src: '/images/fc_luxury_pants.jpg',
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
        src: '/images/fc_luxury_shirt.jpg',
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
        src: '/images/fc_resort_solstice.jpg',
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
        src: '/images/fc_editorial_detail.jpg',
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
        src: '/images/fc_luxury_playsuit.jpg',
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
        src: '/images/fc_luxury_bikini.jpg',
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
          MOBILE & TABLET VIEWPORTS (< 1024px): SAME SCATTER EXPERIENCE, 6 CARDS
          ========================================================================= */}
      <div className="block lg:hidden w-full bg-[#FFFFFF]">
        <StackSpreadStage
          cards={hauteDeptCards.slice(0, 6)}
          scrollLength={260}
          bgColor="#FFFFFF"
          clusterRotation={true}
          stackScale={0.78}
          cardRadius={4}
          textColor="#000000"
          textFadeStart={0.18}
          showScrollHint={true}
          heading={
            <div className="space-y-2.5 max-w-md mx-auto pointer-events-none px-5">
              <span className="text-[9px] font-mono-luxury uppercase tracking-[0.3em] text-[#8C7A6B] font-medium block">
                Atelier Portfolio
              </span>
              <h2 className="font-sans-luxury text-2xl sm:text-3xl font-bold tracking-tight text-noir uppercase leading-[1.05]">
                Find Your Silhouette
              </h2>
            </div>
          }
          subtitle={
            <div className="mt-3 max-w-sm mx-auto space-y-4 pointer-events-auto px-5">
              <p className="text-[11px] text-neutral-600 font-light leading-relaxed tracking-normal">
                Explore our curated categories — dresses, gowns, tailoring, kimonos, jumpsuits and more.
              </p>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => handleNavigate('ALL')}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-[10px] font-sans-luxury font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all rounded-xs"
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
