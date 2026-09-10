import React, { useState } from 'react';
import { ArrowRight, ChevronRight, X, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { ProductCategory } from '../../types';
import { CATEGORY_DEPARTMENTS, DepartmentCategory, DepartmentPillarGroup } from '../../data/categoryContent';
import { useAudioStore } from '../../stores/audioStore';
import { useCurrencyStore } from '../../stores/currencyStore';
import { formatKoboToNgn } from '../../utils/formatters';

interface OccasionEditsBarProps {
  onSelectCategory?: (category: ProductCategory) => void;
  onSelectOccasion?: (occasion: any) => void;
}

type PillarFilter = 'ALL' | DepartmentPillarGroup;

export const OccasionEditsBar: React.FC<OccasionEditsBarProps> = ({ 
  onSelectCategory, 
  onSelectOccasion 
}) => {
  const { playTactileClick } = useAudioStore();
  const { displayCurrency } = useCurrencyStore();
  
  const [activePillar, setActivePillar] = useState<PillarFilter>('ALL');
  const [inspectedDept, setInspectedDept] = useState<DepartmentCategory | null>(null);

  const handleNavigate = (catId: ProductCategory) => {
    playTactileClick();
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else if (onSelectOccasion) {
      onSelectOccasion(catId);
    }
  };

  const filteredDepartments = CATEGORY_DEPARTMENTS.filter((dept) => {
    if (activePillar === 'ALL') return true;
    return dept.pillarGroup === activePillar;
  });

  // Featured department when in ALL view is Grand Soirée & Gala Gowns (DINNER_DRESSES)
  const featuredDept = activePillar === 'ALL' 
    ? CATEGORY_DEPARTMENTS.find((d) => d.id === 'DINNER_DRESSES') 
    : filteredDepartments[0];

  const gridDepartments = activePillar === 'ALL'
    ? CATEGORY_DEPARTMENTS.filter((d) => d.id !== 'DINNER_DRESSES')
    : filteredDepartments.slice(1);

  return (
    <section className="w-full bg-[#FFFFFF] py-14 sm:py-24 border-b border-black/10">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header with Authority (Craft-Floor: No Banned Kickers) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 sm:mb-12 border-b border-black/10 gap-6">
          <div className="space-y-2">
            <h2 className="font-sans-luxury text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-noir uppercase leading-tight">
              13 COUTURE DEPARTMENTS
            </h2>
            <p className="text-xs sm:text-sm text-black/70 font-light max-w-2xl leading-relaxed">
              Pure mulberry silks, hand-canvassed Italian wools, and ancestral metallic embroidery. Each department is drafted across 48 custom anatomical points inside our Lagos atelier.
            </p>
          </div>

          {/* Minimalist Pillar Filters */}
          <div className="flex items-center flex-wrap gap-2 text-xs font-sans-luxury tracking-wider">
            <button
              onClick={() => {
                playTactileClick();
                setActivePillar('ALL');
                setInspectedDept(null);
              }}
              className={`px-3.5 py-2 text-[11px] uppercase tracking-wider transition-all duration-200 border ${
                activePillar === 'ALL'
                  ? 'bg-black text-white border-black font-semibold'
                  : 'bg-white text-black/70 border-black/15 hover:border-black hover:text-black'
              }`}
            >
              All Departments [13]
            </button>
            <button
              onClick={() => {
                playTactileClick();
                setActivePillar('TAILORING');
                setInspectedDept(null);
              }}
              className={`px-3.5 py-2 text-[11px] uppercase tracking-wider transition-all duration-200 border ${
                activePillar === 'TAILORING'
                  ? 'bg-black text-white border-black font-semibold'
                  : 'bg-white text-black/70 border-black/15 hover:border-black hover:text-black'
              }`}
            >
              Tailoring & Suites [5]
            </button>
            <button
              onClick={() => {
                playTactileClick();
                setActivePillar('SILKS');
                setInspectedDept(null);
              }}
              className={`px-3.5 py-2 text-[11px] uppercase tracking-wider transition-all duration-200 border ${
                activePillar === 'SILKS'
                  ? 'bg-black text-white border-black font-semibold'
                  : 'bg-white text-black/70 border-black/15 hover:border-black hover:text-black'
              }`}
            >
              Silks & Gowns [4]
            </button>
            <button
              onClick={() => {
                playTactileClick();
                setActivePillar('SPECIALTY');
                setInspectedDept(null);
              }}
              className={`px-3.5 py-2 text-[11px] uppercase tracking-wider transition-all duration-200 border ${
                activePillar === 'SPECIALTY'
                  ? 'bg-black text-white border-black font-semibold'
                  : 'bg-white text-black/70 border-black/15 hover:border-black hover:text-black'
              }`}
            >
              Sculpted & Resort [4]
            </button>
          </div>
        </div>

        {/* In-Place Department Inspector (High-Conversion Detail Modal/Drawer) */}
        {inspectedDept && (
          <div className="mb-10 p-6 sm:p-8 bg-[#FAFAFA] border border-black transition-all animate-in fade-in zoom-in-98 duration-300 relative">
            <button 
              onClick={() => setInspectedDept(null)}
              className="absolute top-4 right-4 p-2 text-black/60 hover:text-black hover:bg-black/5 transition-colors"
              aria-label="Close Inspector"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 aspect-[3/4] overflow-hidden bg-black relative border border-black/10">
                <img 
                  src={inspectedDept.image} 
                  alt={inspectedDept.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-black text-white text-[9px] font-mono-luxury px-2 py-1 uppercase tracking-widest border border-white/20">
                  Dept {inspectedDept.index} · {inspectedDept.pillarLabel}
                </div>
              </div>

              <div className="lg:col-span-8 space-y-5">
                <div>
                  <span className="text-[10px] font-mono-luxury text-[#A67C4A] uppercase tracking-[0.25em] font-semibold block mb-1">
                    {inspectedDept.tagline}
                  </span>
                  <h3 className="font-sans-luxury text-2xl sm:text-3xl font-bold uppercase tracking-tight text-noir">
                    {inspectedDept.label}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-black/80 font-light leading-relaxed max-w-2xl">
                  {inspectedDept.description}
                </p>

                {/* 3 Pillars of Craftsmanship & Trust */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-black/10">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono-luxury text-black/50 uppercase tracking-widest block font-medium">
                      Fabric Matrix
                    </span>
                    <p className="text-xs font-sans-luxury text-black font-semibold leading-tight">
                      {inspectedDept.fabricProvenance}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono-luxury text-black/50 uppercase tracking-widest block font-medium">
                      Anatomical Fit
                    </span>
                    <p className="text-xs font-sans-luxury text-black font-semibold leading-tight">
                      {inspectedDept.anatomicalFit}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono-luxury text-black/50 uppercase tracking-widest block font-medium">
                      Couture Guarantee
                    </span>
                    <p className="text-xs font-sans-luxury text-black font-semibold leading-tight">
                      {inspectedDept.conversionHighlight}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/10">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono-luxury text-black/50 uppercase tracking-widest block">
                      Investment Starting Point
                    </span>
                    <span className="text-lg font-mono-luxury font-bold text-noir">
                      From {formatKoboToNgn(inspectedDept.startingPriceKobo)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleNavigate(inspectedDept.id)}
                      className="px-6 py-3 bg-black text-white text-xs font-sans-luxury font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center gap-2"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Balanced Architectural Grid */}
        <div className="space-y-4 sm:space-y-6">
          
          {/* Featured Monumental Hero Department */}
          {featuredDept && (
            <div 
              className="group relative overflow-hidden bg-black text-white h-72 sm:h-96 w-full border border-black/15 hover:border-black cursor-pointer transition-all"
              onClick={() => handleNavigate(featuredDept.id)}
            >
              <img
                src={featuredDept.image}
                alt={featuredDept.label}
                className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-65 scale-100 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/15" />

              <div className="relative z-10 p-5 sm:p-8 flex flex-col justify-between h-full">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono-luxury text-[#DFC7AA] uppercase tracking-[0.25em] font-semibold block">
                      Department {featuredDept.index} · {featuredDept.pillarLabel}
                    </span>
                    <span className="text-[11px] font-mono-luxury text-white/60 tracking-wider">
                      {featuredDept.fabricProvenance}
                    </span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playTactileClick();
                      setInspectedDept(featuredDept);
                    }}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-sm text-[10px] font-mono-luxury uppercase tracking-widest transition-all border border-white/20"
                  >
                    Inspect Specs
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-1.5 max-w-xl">
                    <h3 className="text-xl sm:text-3xl font-sans-luxury font-bold text-white uppercase tracking-tight">
                      {featuredDept.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-light leading-snug line-clamp-2">
                      {featuredDept.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-start sm:self-end">
                    <div className="text-right hidden sm:block">
                      <span className="text-[9px] font-mono-luxury text-white/50 uppercase tracking-widest block">
                        Starting From
                      </span>
                      <span className="text-xs font-mono-luxury text-[#DFC7AA] font-bold">
                        {formatKoboToNgn(featuredDept.startingPriceKobo)}
                      </span>
                    </div>
                    <div className="px-4 py-2.5 bg-white text-black text-xs font-sans-luxury font-bold uppercase tracking-widest flex items-center gap-2 group-hover:bg-neutral-200 transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Symmetrical Grid of Remaining Departments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {gridDepartments.map((dept) => (
              <div
                key={dept.id}
                onClick={() => handleNavigate(dept.id)}
                className="group relative overflow-hidden bg-black text-white h-60 sm:h-72 border border-black/15 hover:border-black cursor-pointer flex flex-col justify-between transition-all"
              >
                {/* Background editorial image */}
                <img
                  src={dept.image}
                  alt={dept.label}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-60 scale-100 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15" />
                
                {/* Top Bar on Card */}
                <div className="relative z-10 p-4 flex items-center justify-between">
                  <span className="text-[9px] font-mono-luxury text-[#DFC7AA] uppercase tracking-widest font-semibold">
                    {dept.index} / 13
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playTactileClick();
                      setInspectedDept(dept);
                    }}
                    className="text-[9px] font-mono-luxury text-white/70 hover:text-white uppercase tracking-wider underline transition-colors"
                  >
                    Quick Specs
                  </button>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 p-4 space-y-2">
                  <div>
                    <span className="text-[9px] font-mono-luxury text-white/60 uppercase tracking-widest block truncate">
                      {dept.tagline}
                    </span>
                    <h3 className="text-sm sm:text-base font-sans-luxury font-bold text-white uppercase tracking-tight leading-tight group-hover:text-[#DFC7AA] transition-colors">
                      {dept.label}
                    </h3>
                  </div>

                  <p className="text-[10px] text-white/75 font-light line-clamp-2 leading-relaxed">
                    {dept.description}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-white/10">
                    <span className="text-[10px] font-mono-luxury text-white/70 font-medium">
                      From {formatKoboToNgn(dept.startingPriceKobo)}
                    </span>
                    <span className="text-[10px] font-sans-luxury font-bold uppercase tracking-widest text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Minimalist Trust & High-Conversion Footnote */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 sm:pt-14 mt-10 sm:mt-14 border-t border-black/10 text-xs">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
            <div>
              <span className="font-sans-luxury font-bold uppercase tracking-wider text-noir block">
                LAGOS ATELIER PROVENANCE
              </span>
              <p className="text-[11px] text-black/60 font-light mt-0.5">
                Every piece is hand-cut and tailored in our Nigerian atelier by master craftspeople using heirloom techniques.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Compass className="w-4 h-4 text-black shrink-0 mt-0.5" />
            <div>
              <span className="font-sans-luxury font-bold uppercase tracking-wider text-noir block">
                48-POINT BESPOKE DRAFT
              </span>
              <p className="text-[11px] text-black/60 font-light mt-0.5">
                Complimentary made-to-measure tailoring ensures an uncompromised fit calibrated to your exact anatomical lines.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-black shrink-0 mt-0.5" />
            <div>
              <span className="font-sans-luxury font-bold uppercase tracking-wider text-noir block">
                COMPLIMENTARY WORLDWIDE DELIVERY
              </span>
              <p className="text-[11px] text-black/60 font-light mt-0.5">
                Shipped via insured DHL Express in our signature silk keepsake box with archival garment bag and hanger.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
