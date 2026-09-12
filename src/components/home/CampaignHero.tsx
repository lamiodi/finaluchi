import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAudioStore } from '../../stores/audioStore';

interface CampaignHeroProps {
  onShopNow: () => void;
  onExploreAtelier?: () => void;
}

interface HeroSlide {
  id: string;
  collectionCode: string;
  season: string;
  category: string;
  lookTitle: string;
  fabricPurity: string;
  craftsmanship: string;
  imageUrl: string;
  // Precise object-position per image so head, neckline, drape, and hem/train are fully shown
  objectPositionDesktop: string;
  objectPositionMobile: string;
  accentColor: string;
  pillar: string;
}

export const CampaignHero: React.FC<CampaignHeroProps> = ({ onShopNow, onExploreAtelier }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { playTactileClick } = useAudioStore();

  const slides: HeroSlide[] = [
    {
      id: 'look-01',
      collectionCode: 'FLC OCCASION',
      season: 'EVENT DRESSING',
      category: 'DINNER DRESSES & GOWNS',
      lookTitle: 'Statement Evening Gown',
      fabricPurity: 'A sculpted silhouette for high-impact entrances',
      craftsmanship: 'Corset structure, dramatic volume and a sweeping train',
      imageUrl: '/images/fc_haute_soiree_gown.jpg',
      objectPositionDesktop: 'center 6%',
      objectPositionMobile: 'center 4%',
      accentColor: '#0A3D2E',
      pillar: 'DINNER_DRESSES',
    },
    {
      id: 'look-02',
      collectionCode: 'FLC TAILORING',
      season: 'COORDINATED SETS',
      category: '2PIECES, 3PIECES & JACKETS',
      lookTitle: 'Three-Piece Tailored Set',
      fabricPurity: 'A complete look with styling flexibility',
      craftsmanship: 'Defined shoulders, a tailored waist and wide-leg balance',
      imageUrl: '/images/fc_luxury_threepiece.jpg',
      objectPositionDesktop: 'center 5%',
      objectPositionMobile: 'center 3%',
      accentColor: '#162820',
      pillar: '2PIECES',
    },
    {
      id: 'look-03',
      collectionCode: 'TOGETHER BY FLC',
      season: 'COLLECTION PIECES',
      category: 'KIMONO, JUMPSUITS & SILKS',
      lookTitle: 'Embellished Kimono Layer',
      fabricPurity: 'An expressive layer for day-to-evening dressing',
      craftsmanship: 'Flowing sleeves, a defined waist and statement detail',
      imageUrl: '/images/fc_luxury_kimono.jpg',
      objectPositionDesktop: 'center 6%',
      objectPositionMobile: 'center 4%',
      accentColor: '#2B2212',
      pillar: 'KIMONO',
    },
    {
      id: 'look-04',
      collectionCode: 'FLC READY-TO-WEAR',
      season: 'OCCASION EDIT',
      category: 'ASYMMETRIC SILK DRAPES',
      lookTitle: 'Asymmetric Draped Gown',
      fabricPurity: 'Fluid occasion dressing with a bold point of view',
      craftsmanship: 'One-shoulder movement and a floor-sweeping finish',
      imageUrl: '/images/fc_asymmetric_silk_dress.jpg',
      objectPositionDesktop: 'center 6%',
      objectPositionMobile: 'center 3%',
      accentColor: '#3D2817',
      pillar: 'DINNER_DRESSES',
    },
    {
      id: 'look-05',
      collectionCode: 'FLC BRIDALS',
      season: 'BRIDAL COLLECTIONS',
      category: 'CAPE GOWNS & CORSETRY',
      lookTitle: 'Sculpted Bridal Ballgown',
      fabricPurity: 'Traditional and white-wedding dressing with presence',
      craftsmanship: 'Structured corsetry, dimensional layers and a dramatic cape',
      imageUrl: '/images/fc_organza_cape_gown.jpg',
      objectPositionDesktop: 'center 8%',
      objectPositionMobile: 'center 5%',
      accentColor: '#4A3414',
      pillar: 'GOWNS',
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section 
      className="relative w-full h-[82vh] sm:h-[88vh] min-h-[620px] max-h-[960px] bg-[#000000] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Couture Campaign Hero"
    >
      {/* Dynamic Background Atmosphere (Blur Ambient Fill for Ultra-Wide Displays) */}
      {slides.map((s, idx) => (
        <div
          key={`ambient-${s.id}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out pointer-events-none ${
            idx === currentSlide ? 'opacity-30' : 'opacity-0'
          }`}
        >
          <img
            src={s.imageUrl}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover blur-2xl scale-110 filter brightness-40"
          />
        </div>
      ))}

      {/* Main Campaign Stage: Responsive Framing so the entire garment silhouette & drape is visible */}
      <div className="absolute inset-0 flex items-center justify-center">
        {slides.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              idx === currentSlide 
                ? 'opacity-100 scale-100 pointer-events-auto' 
                : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            {/* High-Fidelity Model Image:
                1. Custom per-slide object-position keeps head, neckline, torso, drape, and hem in perfect view
                2. contrast-[1.04] & saturate-[1.06] make silk satin, gold embroidery, and wool crepe textures pop crisply
                3. No milky white veil washing out the cloth colors
            */}
            <img
              src={s.imageUrl}
              alt={s.lookTitle}
              className="w-full h-full object-cover sm:object-cover brightness-[1.01] contrast-[1.04] saturate-[1.06]"
              style={{
                objectPosition: window.innerWidth < 640 ? s.objectPositionMobile : s.objectPositionDesktop,
              }}
              loading={idx === 0 ? 'eager' : 'lazy'}
            />

            {/* High-End Editorial Edge Vignettes (Preserving garment center clarity 100%) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/45 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/45 pointer-events-none hidden sm:block" />
          </div>
        ))}
      </div>

      {/* Content Overlay Grid */}
      <div className="relative z-10 max-w-[1680px] h-full mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-between py-6 sm:py-10">
        
        {/* Top Bar: Collection Badge & Provenance */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white shadow-lg">
            <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono-luxury uppercase tracking-widest text-white font-medium">
              {slide.collectionCode} · {slide.season}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-[11px] font-mono-luxury uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
            <span>Designed in Abuja, Nigeria</span>
          </div>
        </div>

        {/* Middle/Bottom Main Editorial Cards */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          
          {/* Left Column: Bold Haute Typography & Actions */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            
            {/* Category Subtitle */}
            <div className="flex items-center gap-2 text-champagne text-xs font-mono-luxury tracking-loose-couture uppercase font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{slide.category}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[0.92] drop-shadow-md">
              DRESS<br />
              THE MOMENT
            </h1>

            {/* Active Garment Spotlight Card */}
            <div className="max-w-md p-4 rounded-xs bg-black/80 backdrop-blur-md border border-white/20 text-white space-y-1.5 shadow-2xl">
              <div className="text-xs sm:text-sm font-sans-luxury font-semibold text-white tracking-wide flex items-center justify-between">
                <span>{slide.lookTitle}</span>
                <span className="text-[10px] font-mono-luxury text-champagne uppercase tracking-widest font-semibold">
                  Look 0{currentSlide + 1}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-white/85 font-light leading-relaxed">
                {slide.fabricPurity} — {slide.craftsmanship}.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <button
                onClick={() => {
                  playTactileClick();
                  onShopNow();
                }}
                className="px-7 sm:px-9 py-3.5 bg-white text-black text-xs font-bold tracking-loose-couture rounded-xs uppercase hover:bg-black hover:text-white hover:border hover:border-white transition-all btn-luxury shadow-2xl flex items-center gap-2"
              >
                <span>Shop Women&apos;s Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {onExploreAtelier && (
                <button
                  onClick={() => {
                    playTactileClick();
                    onExploreAtelier();
                  }}
                  className="px-6 sm:px-8 py-3.5 bg-black/60 backdrop-blur-md text-white text-xs font-semibold tracking-loose-couture rounded-xs uppercase hover:bg-white hover:text-black border border-white/35 transition-all btn-luxury"
                >
                  Start a Custom Order
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Collection Specs + Look Navigator & Interactive Thumbnails */}
          <div className="lg:col-span-5 flex flex-col items-end text-right space-y-4 sm:space-y-5 ml-auto w-full max-w-sm sm:max-w-none">
            
            {/* VOL. 04 / ROYAL INDIGO / 2PIECES, 3PIECES & JACKETS Spec Block
                Moved to the bottom by 20% (translate-y-[20%]) and strictly right-aligned on mobile & desktop */}
            <div className="w-full flex flex-col items-end text-right translate-y-[20%] mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 rounded-xs bg-noir/65 backdrop-blur-md border border-white/20 text-right space-y-1 shadow-xl inline-block max-w-[280px] sm:max-w-none">
                <div className="font-sans-luxury text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-none drop-shadow-md">
                  {slide.collectionCode}
                </div>
                <div className="text-[10px] sm:text-xs font-mono-luxury tracking-loose-couture text-champagne uppercase font-semibold drop-shadow-sm pt-0.5">
                  {slide.season}
                </div>
                <div className="text-[9px] sm:text-[11px] font-sans-luxury tracking-loose-couture text-white/85 uppercase drop-shadow-sm">
                  {slide.category}
                </div>
              </div>
            </div>

            {/* Slide Arrows & Progress Counter */}
            <div className="flex items-center gap-3 justify-end w-full pt-2">
              <button
                onClick={() => {
                  playTactileClick();
                  prevSlide();
                }}
                className="p-2.5 rounded-full bg-noir/60 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-noir transition-all shadow-md"
                aria-label="Previous couture look"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono-luxury tracking-widest text-white/90 font-medium">
                0{currentSlide + 1} <span className="text-white/40">/</span> 0{slides.length}
              </span>

              <button
                onClick={() => {
                  playTactileClick();
                  nextSlide();
                }}
                className="p-2.5 rounded-full bg-noir/60 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-noir transition-all shadow-md"
                aria-label="Next couture look"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Thumbnail Strip */}
            <div className="flex items-center justify-end gap-2 p-2 rounded-xs bg-noir/60 backdrop-blur-md border border-white/15 shadow-xl overflow-x-auto max-w-full">
              {slides.map((s, idx) => (
                <button
                  key={`thumb-${s.id}`}
                  onClick={() => {
                    playTactileClick();
                    setCurrentSlide(idx);
                  }}
                  className={`relative w-12 h-16 sm:w-14 sm:h-20 rounded-xs overflow-hidden transition-all duration-300 flex-shrink-0 group ${
                    idx === currentSlide
                      ? 'ring-2 ring-champagne scale-105 shadow-md'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Select ${s.lookTitle}`}
                >
                  <img
                    src={s.imageUrl}
                    alt={s.lookTitle}
                    className="w-full h-full object-cover object-top brightness-[1.02]"
                  />
                  {idx === currentSlide && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-champagne" />
                  )}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Bottom Bar: Timeline Progress Bar */}
        <div className="w-full flex items-center justify-center gap-2 pt-2">
          {slides.map((_, i) => (
            <button
              key={`dot-${i}`}
              onClick={() => {
                playTactileClick();
                setCurrentSlide(i);
              }}
              className={`h-1 transition-all duration-500 rounded-full ${
                i === currentSlide
                  ? 'w-10 bg-champagne'
                  : 'w-3 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to look ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
