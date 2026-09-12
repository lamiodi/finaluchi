import React from 'react';
import { ArrowRight, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
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

  // Curated Haute Couture lookbook cards for the dynamic StackSpread scatter scroll
  const hauteDeptCards: StackSpreadCard[] = [
    {
      item: {
        src: '/images/fc_asymmetric_silk_dress.jpg',
        alt: 'Fluid Silk Column Dresses',
        title: 'Silk Column Dresses',
        category: 'Silks & Gowns',
        tagline: 'Elegant silhouettes for weddings, dinners and celebrations',
        onClick: () => handleNavigate('DRESSES'),
      },
      stackOffset: { x: -8, y: -10 },
      stackRotate: -16,
      target: { x: -22, y: -30, rotate: -2, scale: 0.9, w: 17, h: 30 },
      targetSm: { x: -22, y: -38 },
      z: 2,
    },
    {
      item: {
        src: '/images/fc_haute_soiree_gown.jpg',
        alt: 'Grand Soirée & Gala Gowns',
        title: 'Event & Gala Gowns',
        category: 'Silks & Gowns',
        tagline: 'Statement shapes, sculpted bodices and dramatic movement',
        onClick: () => handleNavigate('DINNER_DRESSES'),
      },
      stackOffset: { x: 12, y: -12 },
      stackRotate: 18,
      target: { x: 30, y: -28, rotate: 3, scale: 0.92, w: 18, h: 32 },
      targetSm: { x: 22, y: -38 },
      z: 3,
    },
    {
      item: {
        src: '/images/fc_tailoring_suite.jpg',
        alt: 'Pagoda Jackets & Blazers',
        title: 'Tailored Jackets',
        category: 'Tailoring & Suites',
        tagline: 'Sharp tailoring with a distinctly feminine finish',
        onClick: () => handleNavigate('JACKETS'),
      },
      stackOffset: { x: -14, y: 2 },
      stackRotate: -6,
      target: { x: -35, y: -2, rotate: -1, scale: 0.9, w: 16, h: 28 },
      targetSm: { x: -22, y: -18 },
      z: 4,
    },
    {
      item: {
        src: '/images/fc_luxury_threepiece.jpg',
        alt: '3-Piece Tailoring',
        title: '3-Piece Tailoring',
        category: 'Tailoring & Suites',
        tagline: 'Coordinated layers for work, events and polished dressing',
        onClick: () => handleNavigate('3PIECES'),
      },
      stackOffset: { x: 2, y: -8 },
      stackRotate: -2,
      target: { x: 8, y: -32, rotate: 1, scale: 0.86, w: 17, h: 30 },
      targetSm: { x: 22, y: -18 },
      z: 5,
    },
    {
      item: {
        src: '/images/fc_luxury_kimono.jpg',
        alt: 'Atelier Kimonos & Robes',
        title: 'Atelier Kimonos',
        category: 'Silks & Gowns',
        tagline: 'Flowing layers with bold embellishment and easy movement',
        onClick: () => handleNavigate('KIMONO'),
      },
      stackOffset: { x: 16, y: 4 },
      stackRotate: 8,
      target: { x: 36, y: 8, rotate: 2, scale: 0.88, w: 17, h: 30 },
      targetSm: { x: -22, y: 22 },
      z: 6,
    },
    {
      item: {
        src: '/images/fc_luxury_jumpsuit.jpg',
        alt: 'Sculptural Jumpsuits',
        title: 'Sculptural Jumpsuits',
        category: 'Sculpted & Resort',
        tagline: 'One-piece occasion dressing with confident structure',
        onClick: () => handleNavigate('JUMPSUITS'),
      },
      stackOffset: { x: -6, y: 10 },
      stackRotate: 5,
      target: { x: -25, y: 32, rotate: -3, scale: 0.88, w: 16, h: 28 },
      targetSm: { x: 22, y: 22 },
      z: 7,
    },
    {
      item: {
        src: '/images/fc_luxury_pants.jpg',
        alt: 'Pants & Palazzo',
        title: 'Palazzo Trousers',
        category: 'Tailoring & Suites',
        tagline: 'High-waisted shapes with fluid wide-leg volume',
        onClick: () => handleNavigate('PANTS'),
      },
      stackOffset: { x: 6, y: 8 },
      stackRotate: 3,
      target: { x: 4, y: 34, rotate: 1, scale: 0.85, w: 16, h: 28 },
      targetSm: { x: -22, y: 42 },
      z: 8,
    },
    {
      item: {
        src: '/images/fc_bustier_pleated_skirt.jpg',
        alt: '2-Piece Coordinated Suites',
        title: '2-Piece Ensembles',
        category: 'Tailoring & Suites',
        tagline: 'Sunburst pleated skirts and sculpted bustiers',
        onClick: () => handleNavigate('2PIECES'),
      },
      stackOffset: { x: 18, y: 12 },
      stackRotate: -8,
      target: { x: 30, y: 34, rotate: -2, scale: 0.88, w: 17, h: 30 },
      targetSm: { x: 22, y: 42 },
      z: 9,
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] border-b border-black/10">
      
      {/* =========================================================================
          DEPARTMENT ARCHIVES — CINEMATIC SCROLL-TO-EXPLORE ATELIER PORTFOLIO
          ========================================================================= */}
      <StackSpreadStage
        cards={hauteDeptCards}
        scrollLength={280}
        bgColor="#FFFFFF"
        clusterRotation={true}
        stackScale={0.82}
        cardRadius={6}
        textColor="#000000"
        textFadeStart={0.20}
        showScrollHint={true}
        heading={
          <div className="space-y-3 sm:space-y-4 max-w-5xl mx-auto pointer-events-none px-4">
            <span className="text-[11px] sm:text-xs font-mono-luxury uppercase tracking-[0.28em] text-neutral-400 font-semibold block">
              Department Archives
            </span>
            <h2 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-noir uppercase leading-[1.06]">
              Find Your Finaluchi Silhouette
            </h2>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto my-2" />
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
                className="group inline-flex items-center gap-2.5 px-6 py-2.5 bg-black text-white text-[11px] font-sans-luxury font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all rounded-xs shadow-sm hover:gap-3.5"
              >
                <span>Shop All Categories</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform" />
              </button>
            </div>
          </div>
        }
      />

      {/* =========================================================================
          TRUST & PROVENANCE FOOTNOTE (MINIMALIST LUXURY CONVERSION ANCHOR)
          ========================================================================= */}
      <div className="w-full bg-[#FFFFFF] py-12 sm:py-16 border-t border-black/10">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
            <div className="flex items-start gap-3.5">
              <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-sans-luxury font-bold uppercase tracking-wider text-noir block">
                  ABUJA-BASED FASHION HOUSE
                </span>
                <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                  Finaluchi is a Nigerian design brand creating couture, ready-to-wear and occasion pieces—not simply reselling clothing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Compass className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-sans-luxury font-bold uppercase tracking-wider text-noir block">
                  DESIGNED FOR YOUR MOMENT
                </span>
                <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                  For custom orders, share your event date, measurements, preferred silhouette and finishing details before production begins.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Sparkles className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-sans-luxury font-bold uppercase tracking-wider text-noir block">
                  ORDER WITH CLARITY
                </span>
                <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                  Request a written invoice, confirmed delivery date, alteration terms and return or refund terms before payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
