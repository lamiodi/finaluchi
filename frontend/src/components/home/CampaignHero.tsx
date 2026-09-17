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
  craftsmanship: string;
  imageUrl: string;
  objectPositionDesktop: string;
  objectPositionMobile: string;
  pillar: string;
}

export const CampaignHero: React.FC<CampaignHeroProps> = ({ onShopNow, onExploreAtelier }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { playTactileClick } = useAudioStore();

  const slides: HeroSlide[] = [
    {
      id: 'look-01',
      collectionCode: 'OCCASION',
      season: 'EVENT DRESSING',
      category: 'DINNER DRESSES & GOWNS',
      lookTitle: 'Statement Evening Gown',
      craftsmanship: 'Sculpted corsetry with a dramatic train',
      imageUrl: '/images/fc_haute_soiree_gown.webp',
      objectPositionDesktop: 'center 6%',
      objectPositionMobile: 'center 4%',
      pillar: 'DINNER_DRESSES',
    },
    {
      id: 'look-02',
      collectionCode: 'TAILORING',
      season: 'COORDINATED SUITES',
      category: '2-PIECE & 3-PIECE SETS',
      lookTitle: 'Three-Piece Tailored Set',
      craftsmanship: 'Defined shoulders with wide-leg drape',
      imageUrl: '/images/fc_luxury_threepiece.webp',
      objectPositionDesktop: 'center 5%',
      objectPositionMobile: 'center 3%',
      pillar: '2PIECES',
    },
    {
      id: 'look-03',
      collectionCode: 'TOGETHER BY FLC',
      season: 'CAPSULE PIECES',
      category: 'KIMONOS & DRAPES',
      lookTitle: 'Embellished Kimono Layer',
      craftsmanship: 'Flowing silk sleeves and structured waist',
      imageUrl: '/images/fc_luxury_kimono.webp',
      objectPositionDesktop: 'center 6%',
      objectPositionMobile: 'center 4%',
      pillar: 'KIMONO',
    },
    {
      id: 'look-04',
      collectionCode: 'READY-TO-WEAR',
      season: 'RESORT & OCCASION',
      category: 'ASYMMETRIC SILKS',
      lookTitle: 'Asymmetric Draped Gown',
      craftsmanship: 'Fluid silk georgette with floor sweep',
      imageUrl: '/images/fc_asymmetric_silk_dress.webp',
      objectPositionDesktop: 'center 6%',
      objectPositionMobile: 'center 3%',
      pillar: 'DINNER_DRESSES',
    },
    {
      id: 'look-05',
      collectionCode: 'BRIDALS',
      season: 'CEREMONY DRESSING',
      category: 'CAPE GOWNS',
      lookTitle: 'Sculpted Bridal Ballgown',
      craftsmanship: 'Structured corset with dimensional layers',
      imageUrl: '/images/fc_organza_cape_gown.webp',
      objectPositionDesktop: 'center 8%',
      objectPositionMobile: 'center 5%',
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
      className="relative w-full h-[85vh] sm:h-[90vh] min-h-[580px] max-h-[960px] bg-[#000000] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Campaign Showcase"
    >
      {/* Background Ambient Imagery - Render only current ambient layer to conserve network */}
      <div
        key={`ambient-${slide.id}`}
        className="absolute inset-0 transition-opacity duration-1000 ease-out pointer-events-none opacity-25"
      >
        <img
          src={slide.imageUrl}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover blur-2xl scale-110 filter brightness-40"
        />
      </div>

      {/* Main Imagery Stage */}
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
            <img
              src={s.imageUrl}
              alt={s.lookTitle}
              className="w-full h-full object-cover brightness-[1.01] contrast-[1.04]"
              style={{
                objectPosition: typeof window !== 'undefined' && window.innerWidth < 640 ? s.objectPositionMobile : s.objectPositionDesktop,
              }}
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchPriority={idx === 0 ? 'high' : 'auto'}
              decoding="async"
            />

            {/* Subtle Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/35 pointer-events-none hidden sm:block" />
          </div>
        ))}
      </div>

      {/* Editorial Content Overlay */}
      <div className="relative z-10 max-w-[1680px] h-full mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-between py-5 sm:py-8">
        
        {/* Top Provenance Line */}
        <div className="w-full flex items-center justify-between border-b border-white/15 pb-3">
          <span className="text-[10px] sm:text-xs font-mono-luxury uppercase tracking-[0.25em] text-white/90">
            {slide.collectionCode} · {slide.season}
          </span>
          <span className="text-[10px] sm:text-xs font-mono-luxury uppercase tracking-[0.25em] text-white/60 hidden sm:inline">
            Abuja Atelier
          </span>
        </div>

        {/* Hero Central Block */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-4 sm:pb-6">
          
          {/* Left: Wide Heading & Actions */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5 max-w-4xl">
            <span className="text-xs font-mono-luxury tracking-[0.25em] text-[#C5A880] uppercase font-semibold block">
              {slide.category}
            </span>

            <h1 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[0.94]">
              DRESS<br />
              THE MOMENT
            </h1>

            <p className="text-xs sm:text-sm font-light text-white/85 leading-relaxed font-sans-luxury max-w-lg">
              <span className="font-semibold text-white uppercase tracking-wider">{slide.lookTitle}</span> — {slide.craftsmanship}.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  playTactileClick();
                  onShopNow();
                }}
                className="px-7 sm:px-9 py-3.5 bg-white text-black text-xs font-bold tracking-loose-couture rounded-none uppercase hover:bg-neutral-200 transition-all btn-luxury flex items-center gap-2"
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
                  className="px-6 sm:px-8 py-3.5 bg-black/60 backdrop-blur-md text-white text-xs font-semibold tracking-loose-couture rounded-none uppercase hover:bg-white hover:text-black border border-white/30 transition-all btn-luxury"
                >
                  Custom Order
                </button>
              )}
            </div>
          </div>

          {/* Right: Minimalist Controls */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end space-y-3">
            
            {/* Arrows & Counter */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  playTactileClick();
                  prevSlide();
                }}
                className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono-luxury tracking-widest text-white">
                0{currentSlide + 1} <span className="text-white/30">/</span> 0{slides.length}
              </span>

              <button
                onClick={() => {
                  playTactileClick();
                  nextSlide();
                }}
                className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Discreet Preview Chips */}
            <div className="hidden sm:flex items-center gap-2 pt-1">
              {slides.map((s, idx) => (
                <button
                  key={`thumb-${s.id}`}
                  onClick={() => {
                    playTactileClick();
                    setCurrentSlide(idx);
                  }}
                  className={`relative w-10 h-14 overflow-hidden transition-all duration-300 ${
                    idx === currentSlide
                      ? 'ring-1.5 ring-white scale-105'
                      : 'opacity-40 hover:opacity-100'
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

        {/* Bottom Minimalist Progress Indicator */}
        <div className="w-full flex items-center justify-center gap-1.5 pt-1">
          {slides.map((_, i) => (
            <button
              key={`dot-${i}`}
              onClick={() => {
                playTactileClick();
                setCurrentSlide(i);
              }}
              className={`h-0.5 transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
