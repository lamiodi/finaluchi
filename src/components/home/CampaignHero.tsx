import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
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
        
        {/* Top Bar: Collection Provenance */}
        <div className="w-full flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-[10px] sm:text-xs font-mono-luxury uppercase tracking-[0.25em] text-white/90 font-medium">
            {slide.collectionCode} · {slide.season}
          </span>

          <span className="hidden sm:block text-[10px] sm:text-xs font-mono-luxury uppercase tracking-[0.25em] text-white/60">
            Abuja Atelier · Est. 2017
          </span>
        </div>

        {/* Middle/Bottom Main Editorial Cards */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          
          {/* Left Column: Bold Haute Typography & Actions */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            
            {/* Category Subtitle */}
            <span className="text-xs font-mono-luxury tracking-[0.25em] text-[#C5A880] uppercase font-semibold block">
              {slide.category}
            </span>

            {/* Main Headline */}
            <h1 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[0.92] drop-shadow-md">
              DRESS<br />
              THE MOMENT
            </h1>

            {/* Minimalist Editorial Caption */}
            <div className="space-y-1 max-w-lg">
              <p className="text-xs sm:text-sm font-light text-white/85 leading-relaxed font-sans-luxury">
                <span className="font-semibold text-white uppercase tracking-wider">{slide.lookTitle}</span> — {slide.craftsmanship}.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => {
                  playTactileClick();
                  onShopNow();
                }}
                className="px-7 sm:px-9 py-3.5 bg-white text-black text-xs font-bold tracking-loose-couture rounded-xs uppercase hover:bg-black hover:text-white hover:border hover:border-white transition-all btn-luxury shadow-2xl flex items-center gap-2"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {onExploreAtelier && (
                <button
                  onClick={() => {
                    playTactileClick();
                    onExploreAtelier();
                  }}
                  className="px-6 sm:px-8 py-3.5 bg-black/50 backdrop-blur-md text-white text-xs font-semibold tracking-loose-couture rounded-xs uppercase hover:bg-white hover:text-black border border-white/30 transition-all btn-luxury"
                >
                  Custom Order
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Minimalist Look Controls */}
          <div className="lg:col-span-5 flex flex-col items-end text-right space-y-4 ml-auto w-full max-w-sm sm:max-w-none">
            
            {/* Minimal Look Title & Season Indicator */}
            <div className="hidden sm:block text-right space-y-0.5">
              <span className="text-[10px] font-mono-luxury tracking-widest text-[#DFC7AA] uppercase font-semibold">
                {slide.collectionCode}
              </span>
              <div className="text-sm font-sans-luxury font-bold text-white uppercase tracking-wider">
                {slide.season}
              </div>
            </div>

            {/* Slide Arrows & Progress Counter */}
            <div className="flex items-center gap-3 justify-end w-full">
              <button
                onClick={() => {
                  playTactileClick();
                  prevSlide();
                }}
                className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                aria-label="Previous couture look"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono-luxury tracking-widest text-white font-medium">
                0{currentSlide + 1} <span className="text-white/30">/</span> 0{slides.length}
              </span>

              <button
                onClick={() => {
                  playTactileClick();
                  nextSlide();
                }}
                className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                aria-label="Next couture look"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Sleek Minimalist Thumbnails */}
            <div className="flex items-center justify-end gap-2 p-1.5 rounded-xs bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
              {slides.map((s, idx) => (
                <button
                  key={`thumb-${s.id}`}
                  onClick={() => {
                    playTactileClick();
                    setCurrentSlide(idx);
                  }}
                  className={`relative w-10 h-14 sm:w-12 sm:h-16 rounded-xs overflow-hidden transition-all duration-300 flex-shrink-0 group ${
                    idx === currentSlide
                      ? 'ring-1.5 ring-white scale-105 shadow-md'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                  aria-label={`Select ${s.lookTitle}`}
                >
                  <img
                    src={s.imageUrl}
                    alt={s.lookTitle}
                    className="w-full h-full object-cover object-top"
                  />
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
