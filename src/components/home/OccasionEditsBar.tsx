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
          <div className="space-y-3 max-w-4xl mx-auto pointer-events-none px-4">
            <span className="text-[10px] sm:text-[11px] font-mono-luxury uppercase tracking-[0.3em] text-[#8C7A6B] font-medium block">
              Atelier Portfolio
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

      {/* =========================================================================
          PROVENANCE & BUYER PROTECTION — MINIMALIST EDITORIAL RIBBON
          ========================================================================= */}
      <div className="w-full bg-[#FFFFFF] py-14 sm:py-20 border-t border-black/10">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            
            {/* Pillar 01 */}
            <div className="space-y-2.5 border-t border-black/10 pt-4 md:border-t-0 md:pt-0">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-mono-luxury text-[#8C7A6B] font-semibold">01</span>
                <span className="text-xs font-sans-luxury font-bold uppercase tracking-wider text-black">
                  Original Abuja Atelier
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Finaluchi Couture designs and crafts original women’s couture, ready-to-wear, asoebi and bridal wear in Abuja, Nigeria—rather than reselling mass-market fashion.
              </p>
            </div>

            {/* Pillar 02 */}
            <div className="space-y-2.5 border-t border-black/10 pt-4 md:border-t-0 md:pt-0">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-mono-luxury text-[#8C7A6B] font-semibold">02</span>
                <span className="text-xs font-sans-luxury font-bold uppercase tracking-wider text-black">
                  Nigerian Occasion Craft
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Signature sculpted corsetry, hand-laid embellishments, architectural sleeve volumes, and dramatic trains engineered for milestone celebrations.
              </p>
            </div>

            {/* Pillar 03 */}
            <div className="space-y-2.5 border-t border-black/10 pt-4 md:border-t-0 md:pt-0">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-mono-luxury text-[#8C7A6B] font-semibold">03</span>
                <span className="text-xs font-sans-luxury font-bold uppercase tracking-wider text-black">
                  Transparent Buying Protocol
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Written invoices, guaranteed delivery dates, measurement sign-off, and clear alteration policies. Traceable payments via corporate accounts and Paystack.
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
