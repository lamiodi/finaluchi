import React from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);

  const scrollToCard = (index: number) => {
    playTactileClick();
    if (!carouselRef.current) return;
    const cards = carouselRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setActiveCardIndex(index);
    }
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const cardElements = Array.from(container.children) as HTMLElement[];
    if (cardElements.length === 0) return;

    const centerPos = scrollLeft + containerWidth / 2;
    let closestIdx = 0;
    let minDiff = Infinity;

    cardElements.forEach((el, idx) => {
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const diff = Math.abs(centerPos - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    if (closestIdx !== activeCardIndex) {
      setActiveCardIndex(closestIdx);
    }
  };

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
          MOBILE & TABLET VIEWPORTS (< 1024px): EDITORIAL TOUCH-OPTIMIZED LOOKBOOK
          ========================================================================= */}
      <div className="block lg:hidden w-full bg-[#FFFFFF]">
        {/* Mobile Header */}
        <div className="px-5 pt-12 pb-6 text-center max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-mono-luxury uppercase tracking-[0.3em] text-[#8C7A6B] font-semibold block">
            Atelier Portfolio · 13 Silhouettes
          </span>
          <h2 className="font-sans-luxury text-2xl sm:text-3xl font-bold tracking-tight text-noir uppercase leading-tight">
            Find Your Finaluchi Silhouette
          </h2>
          <p className="text-xs text-neutral-600 font-light leading-relaxed tracking-normal px-2">
            Explore all 13 client-approved categories, crafted with signature corsetry, architectural tailoring, and refined occasion finishing.
          </p>
          <div className="pt-2 flex items-center justify-center">
            <button
              onClick={() => handleNavigate('ALL')}
              className="group inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white text-[11px] font-sans-luxury font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all rounded-xs shadow-sm"
            >
              <span>Shop All Categories</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Quick Category Jump Pill Bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between pb-2.5 border-b border-black/10 text-[10px] font-mono-luxury text-neutral-500 uppercase tracking-wider">
            <span className="text-black font-semibold">
              {String(activeCardIndex + 1).padStart(2, '0')} / 13
            </span>
            <span className="text-neutral-700 font-medium truncate max-w-[200px]">
              {hauteDeptCards[activeCardIndex]?.item.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 scrollbar-none -mx-4 px-4">
            {hauteDeptCards.map((card, idx) => {
              const isActive = activeCardIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => scrollToCard(idx)}
                  className={`shrink-0 px-3 py-1.5 text-[10px] font-sans-luxury uppercase tracking-wider rounded-xs transition-all border ${
                    isActive
                      ? 'bg-black text-white border-black font-semibold shadow-xs'
                      : 'bg-white text-neutral-600 border-black/10 hover:border-black/30 hover:text-black'
                  }`}
                >
                  <span>{card.item.category || card.item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Swipeable Lookbook Cards Carousel */}
        <div className="relative pt-1 pb-2">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none px-5 pt-1 pb-4 items-stretch"
            style={{ scrollPaddingLeft: '20px', scrollPaddingRight: '20px' }}
          >
            {hauteDeptCards.map((card, idx) => (
              <div
                key={idx}
                onClick={() => card.item.onClick?.()}
                className="w-[84vw] max-w-[340px] shrink-0 snap-center flex flex-col bg-[#FAFAFA] border border-black/10 rounded-xs overflow-hidden shadow-sm relative group cursor-pointer active:scale-[0.99] transition-all"
              >
                {/* Visual Packshot Stage */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={card.item.src}
                    alt={card.item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Top Status Indicators */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2 py-0.5 bg-black/75 backdrop-blur-md text-white text-[9px] font-mono-luxury font-medium tracking-widest rounded-xs">
                      {String(idx + 1).padStart(2, '0')} / 13
                    </span>
                    <span className="px-2 py-0.5 bg-white/95 backdrop-blur-md text-black text-[9px] font-sans-luxury font-semibold tracking-wider uppercase rounded-xs shadow-xs">
                      {card.item.category}
                    </span>
                  </div>

                  {/* Scrim Caption Stage */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pt-16 pb-4 px-4 text-white">
                    <h3 className="font-sans-luxury text-base sm:text-lg font-bold uppercase tracking-tight leading-snug">
                      {card.item.title}
                    </h3>
                    <p className="text-[11px] text-white/80 font-light line-clamp-2 mt-1 leading-relaxed">
                      {card.item.tagline}
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[10px] font-sans-luxury font-semibold uppercase tracking-widest">
                      <span className="text-white/90">Explore Category</span>
                      <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                        ⟶
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stepper Navigation & Dots */}
          <div className="flex items-center justify-between px-5 pt-2 pb-6">
            <div className="flex items-center gap-1.5 overflow-hidden max-w-[200px]">
              {hauteDeptCards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToCard(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeCardIndex === idx
                      ? 'w-5 bg-black'
                      : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToCard(Math.max(0, activeCardIndex - 1))}
                disabled={activeCardIndex === 0}
                className="w-8 h-8 rounded-xs border border-black/10 flex items-center justify-center text-black hover:bg-neutral-100 disabled:opacity-25 disabled:pointer-events-none transition-all"
                aria-label="Previous Category"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToCard(Math.min(hauteDeptCards.length - 1, activeCardIndex + 1))}
                disabled={activeCardIndex === hauteDeptCards.length - 1}
                className="w-8 h-8 rounded-xs border border-black/10 flex items-center justify-center text-black hover:bg-neutral-100 disabled:opacity-25 disabled:pointer-events-none transition-all"
                aria-label="Next Category"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

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
