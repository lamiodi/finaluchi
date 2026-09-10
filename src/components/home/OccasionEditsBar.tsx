import React, { useState } from 'react';
import { ArrowRight, X, Sparkles, Compass, CheckCircle2, LayoutGrid, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCategory } from '../../types';
import { CATEGORY_DEPARTMENTS, DepartmentCategory, DepartmentPillarGroup } from '../../data/categoryContent';
import { useAudioStore } from '../../stores/audioStore';
import { formatKoboToNgn } from '../../utils/formatters';

interface OccasionEditsBarProps {
  onSelectCategory?: (category: ProductCategory) => void;
  onSelectOccasion?: (occasion: any) => void;
}

type PillarFilter = 'ALL' | DepartmentPillarGroup;
type ViewLayoutMode = 'BENTO' | 'SLICES';

export const OccasionEditsBar: React.FC<OccasionEditsBarProps> = ({ 
  onSelectCategory, 
  onSelectOccasion 
}) => {
  const { playTactileClick } = useAudioStore();
  
  const [activePillar, setActivePillar] = useState<PillarFilter>('ALL');
  const [layoutMode, setLayoutMode] = useState<ViewLayoutMode>('BENTO');
  const [inspectedDept, setInspectedDept] = useState<DepartmentCategory | null>(null);
  const [hoveredSliceId, setHoveredSliceId] = useState<string | null>('DINNER_DRESSES');

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

  // Calculate distinct Bento card proportions to create an interlocking gapless grid
  const getBentoSpan = (deptId: string, index: number) => {
    if (activePillar === 'ALL') {
      if (deptId === 'DINNER_DRESSES') return 'lg:col-span-2 lg:row-span-2 h-[480px] sm:h-[560px]'; // Monumental Anchor
      if (deptId === '3PIECES' || deptId === 'KIMONO') return 'lg:col-span-2 lg:row-span-1 h-[270px]'; // Wide Panoramic
      if (deptId === 'DRESSES' || deptId === 'PANTS') return 'lg:col-span-1 lg:row-span-2 h-[480px] sm:h-[560px]'; // Tall Silhouettes
      return 'lg:col-span-1 lg:row-span-1 h-[270px]'; // Clean Compact Square
    }
    // Filtered mode spans
    if (index === 0) return 'lg:col-span-2 lg:row-span-2 h-[480px] sm:h-[540px]';
    if (index === 1 && filteredDepartments.length >= 5) return 'lg:col-span-2 lg:row-span-1 h-[260px]';
    return 'lg:col-span-1 lg:row-span-1 h-[260px]';
  };

  return (
    <section className="w-full bg-[#FFFFFF] py-20 sm:py-32 border-b border-black/10 overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* AIDA Stage 1: Attention — Wide Architectural Heading with Inline Capsule */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 mb-10 sm:mb-14 border-b border-black/10 gap-8">
          <div className="space-y-4 max-w-5xl">
            <h2 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-noir uppercase leading-[1.08]">
              13 HAUTE{' '}
              <span 
                className="inline-block w-16 sm:w-24 h-7 sm:h-10 rounded-full align-middle bg-cover bg-[center_20%] mx-2 border border-black/20 shadow-xs" 
                style={{ backgroundImage: "url('/images/fc_haute_soiree_gown.jpg')" }}
                aria-hidden="true"
              />
              DEPARTMENTS
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-2xl leading-relaxed">
              Pure mulberry silks, hand-canvassed Italian wools, and ancestral metallic embroidery. Each department is drafted across 48 custom anatomical points inside our Lagos atelier.
            </p>
          </div>

          {/* Controls: Pillar Filters & Dual View Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Minimalist Pillar Switches */}
            <div className="flex items-center flex-wrap gap-1.5 p-1 bg-[#F5F5F5] border border-black/10 rounded-xs text-xs font-sans-luxury">
              <button
                onClick={() => {
                  playTactileClick();
                  setActivePillar('ALL');
                  setInspectedDept(null);
                }}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider transition-all duration-200 ${
                  activePillar === 'ALL'
                    ? 'bg-black text-white font-semibold shadow-xs'
                    : 'text-black/60 hover:text-black hover:bg-black/5'
                }`}
              >
                All [13]
              </button>
              <button
                onClick={() => {
                  playTactileClick();
                  setActivePillar('TAILORING');
                  setInspectedDept(null);
                }}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider transition-all duration-200 ${
                  activePillar === 'TAILORING'
                    ? 'bg-black text-white font-semibold shadow-xs'
                    : 'text-black/60 hover:text-black hover:bg-black/5'
                }`}
              >
                Tailoring [5]
              </button>
              <button
                onClick={() => {
                  playTactileClick();
                  setActivePillar('SILKS');
                  setInspectedDept(null);
                }}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider transition-all duration-200 ${
                  activePillar === 'SILKS'
                    ? 'bg-black text-white font-semibold shadow-xs'
                    : 'text-black/60 hover:text-black hover:bg-black/5'
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
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider transition-all duration-200 ${
                  activePillar === 'SPECIALTY'
                    ? 'bg-black text-white font-semibold shadow-xs'
                    : 'text-black/60 hover:text-black hover:bg-black/5'
                }`}
              >
                Sculpted & Resort [4]
              </button>
            </div>

            {/* Layout Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 border border-black/15 p-1 rounded-xs">
              <button
                onClick={() => {
                  playTactileClick();
                  setLayoutMode('BENTO');
                }}
                title="Bento Grid Mode"
                className={`p-1.5 rounded-xs transition-colors ${layoutMode === 'BENTO' ? 'bg-black text-white' : 'text-black/60 hover:text-black'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  playTactileClick();
                  setLayoutMode('SLICES');
                }}
                title="Interactive Accordion Slices"
                className={`p-1.5 rounded-xs transition-colors ${layoutMode === 'SLICES' ? 'bg-black text-white' : 'text-black/60 hover:text-black'}`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* In-Place High-Conversion Department Inspector Panel */}
        <AnimatePresence>
          {inspectedDept && (
            <motion.div 
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="mb-12 p-6 sm:p-10 bg-[#FAFAFA] border border-black transition-all relative shadow-sm"
            >
              <button 
                onClick={() => setInspectedDept(null)}
                className="absolute top-5 right-5 p-2 text-black/60 hover:text-black hover:bg-black/5 transition-colors"
                aria-label="Close Inspector"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: High-Impact Editorial Crop */}
                <div className="lg:col-span-5 aspect-[3/4] overflow-hidden bg-black relative border border-black/10">
                  <img 
                    src={inspectedDept.image} 
                    alt={inspectedDept.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md text-white text-[9px] font-mono-luxury px-2.5 py-1 uppercase tracking-widest border border-white/20">
                    Dept {inspectedDept.index} · {inspectedDept.pillarLabel}
                  </div>
                </div>

                {/* Right: Authoritative Couture Copy & Value Pillars */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-[10px] font-mono-luxury text-[#A67C4A] uppercase tracking-[0.25em] font-semibold block mb-1">
                      {inspectedDept.tagline}
                    </span>
                    <h3 className="font-sans-luxury text-3xl sm:text-4xl font-bold uppercase tracking-tight text-noir">
                      {inspectedDept.label}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed max-w-2xl">
                    {inspectedDept.description}
                  </p>

                  {/* 3 Pillars of Craftsmanship & Trust */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-black/10">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono-luxury text-black/45 uppercase tracking-widest block font-medium">
                        Fabric Matrix
                      </span>
                      <p className="text-xs font-sans-luxury text-black font-semibold leading-tight">
                        {inspectedDept.fabricProvenance}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono-luxury text-black/45 uppercase tracking-widest block font-medium">
                        Anatomical Fit
                      </span>
                      <p className="text-xs font-sans-luxury text-black font-semibold leading-tight">
                        {inspectedDept.anatomicalFit}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono-luxury text-black/45 uppercase tracking-widest block font-medium">
                        Couture Standard
                      </span>
                      <p className="text-xs font-sans-luxury text-black font-semibold leading-tight">
                        {inspectedDept.conversionHighlight}
                      </p>
                    </div>
                  </div>

                  {/* Price Anchor & Immediate Conversion Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-6 pt-5 border-t border-black/10">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono-luxury text-black/45 uppercase tracking-widest block">
                        Investment Starting Point
                      </span>
                      <span className="text-xl font-mono-luxury font-bold text-noir">
                        From {formatKoboToNgn(inspectedDept.startingPriceKobo)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleNavigate(inspectedDept.id)}
                        className="px-7 py-3.5 bg-black text-white text-xs font-sans-luxury font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center gap-2"
                      >
                        <span>Explore Collection</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Mode 1: The Gapless Interlocking Bento Grid */}
        {layoutMode === 'BENTO' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-flow-dense gap-4 sm:gap-6">
            {filteredDepartments.map((dept, idx) => {
              const spanClasses = getBentoSpan(dept.id, idx);
              const isMonumental = dept.id === 'DINNER_DRESSES' && activePillar === 'ALL';

              return (
                <div
                  key={dept.id}
                  onClick={() => handleNavigate(dept.id)}
                  className={`group relative overflow-hidden bg-black text-white border border-black/15 hover:border-black cursor-pointer flex flex-col justify-between transition-all duration-500 ${spanClasses}`}
                >
                  {/* Full-bleed editorial image with hover zoom physics */}
                  <img
                    src={dept.image}
                    alt={dept.label}
                    className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-65 scale-100 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Deep filmic contrast gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/15 group-hover:via-black/30 transition-all duration-500" />
                  
                  {/* Top Bar on Card */}
                  <div className="relative z-10 p-5 sm:p-6 flex items-start justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono-luxury text-[#DFC7AA] uppercase tracking-widest font-semibold block">
                        Dept {dept.index}
                      </span>
                      <span className="text-[10px] font-mono-luxury text-white/50 uppercase tracking-wider block">
                        {dept.pillarLabel}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playTactileClick();
                        setInspectedDept(dept);
                      }}
                      className="px-2.5 py-1 bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-sm text-[9px] font-mono-luxury uppercase tracking-widest transition-all border border-white/20"
                    >
                      Inspect Specs
                    </button>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="relative z-10 p-5 sm:p-6 space-y-2.5">
                    <span className="text-[10px] font-mono-luxury text-white/60 uppercase tracking-widest block truncate">
                      {dept.tagline}
                    </span>

                    <h3 className={`font-sans-luxury font-bold text-white uppercase tracking-tight leading-tight group-hover:text-[#DFC7AA] transition-colors ${
                      isMonumental ? 'text-2xl sm:text-4xl' : 'text-base sm:text-xl'
                    }`}>
                      {dept.label}
                    </h3>

                    <p className={`text-white/75 font-light leading-relaxed ${
                      isMonumental ? 'text-xs sm:text-sm line-clamp-3 max-w-xl' : 'text-[11px] line-clamp-2'
                    }`}>
                      {dept.description}
                    </p>

                    <div className="flex items-center justify-between pt-2.5 border-t border-white/15">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono-luxury text-white/50 uppercase tracking-wider block">
                          Investment
                        </span>
                        <span className="text-xs font-mono-luxury text-white font-bold">
                          From {formatKoboToNgn(dept.startingPriceKobo)}
                        </span>
                      </div>

                      <div className="px-3.5 py-1.5 bg-white text-black text-[10px] font-sans-luxury font-bold uppercase tracking-widest flex items-center gap-1.5 group-hover:bg-neutral-200 transition-colors">
                        <span>Explore</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View Mode 2: Interactive Horizontal Accordion / Lookbook Slices */}
        {layoutMode === 'SLICES' && (
          <div className="hidden sm:flex h-[560px] w-full gap-2 overflow-hidden border border-black/15 p-2 bg-[#FAFAFA]">
            {filteredDepartments.map((dept) => {
              const isSelected = hoveredSliceId === dept.id;

              return (
                <div
                  key={dept.id}
                  onMouseEnter={() => setHoveredSliceId(dept.id)}
                  onClick={() => handleNavigate(dept.id)}
                  className={`relative overflow-hidden cursor-pointer transition-all duration-700 ease-out bg-black text-white flex flex-col justify-between border border-black/20 ${
                    isSelected ? 'flex-[4] shadow-md' : 'flex-[1] hover:flex-[1.4] opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={dept.image}
                    alt={dept.label}
                    className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-65 scale-100 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

                  {/* Top Bar */}
                  <div className="relative z-10 p-4 flex items-center justify-between">
                    <span className="text-[10px] font-mono-luxury text-[#DFC7AA] font-bold">
                      {dept.index}
                    </span>
                    {isSelected && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playTactileClick();
                          setInspectedDept(dept);
                        }}
                        className="px-2 py-0.5 bg-white/10 hover:bg-white text-white hover:text-black text-[9px] font-mono-luxury uppercase tracking-widest transition-all"
                      >
                        Specs
                      </button>
                    )}
                  </div>

                  {/* Vertical Spine Title when collapsed */}
                  {!isSelected && (
                    <div className="relative z-10 p-4 pb-8 flex items-center justify-center h-full">
                      <span className="transform -rotate-90 whitespace-nowrap text-xs font-sans-luxury font-bold uppercase tracking-widest text-white/90">
                        {dept.label}
                      </span>
                    </div>
                  )}

                  {/* Expanded Content when selected */}
                  {isSelected && (
                    <div className="relative z-10 p-6 space-y-3 animate-in fade-in duration-300">
                      <span className="text-[10px] font-mono-luxury text-white/60 uppercase tracking-widest block">
                        {dept.tagline}
                      </span>
                      <h3 className="text-2xl font-sans-luxury font-bold uppercase tracking-tight text-white leading-tight">
                        {dept.label}
                      </h3>
                      <p className="text-xs text-white/80 font-light line-clamp-3 leading-relaxed max-w-md">
                        {dept.description}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-white/20">
                        <span className="text-xs font-mono-luxury text-[#DFC7AA] font-bold">
                          From {formatKoboToNgn(dept.startingPriceKobo)}
                        </span>
                        <span className="text-xs font-sans-luxury font-bold uppercase tracking-widest text-white flex items-center gap-1">
                          Explore Collection <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Trust & Provenance Footnote (Minimalist AIDA Action Anchor) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 sm:pt-16 mt-12 sm:mt-16 border-t border-black/10 text-xs">
          <div className="flex items-start gap-3.5">
            <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-sans-luxury font-bold uppercase tracking-wider text-noir block">
                LAGOS ATELIER PROVENANCE
              </span>
              <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                Every piece is hand-cut and tailored in our Nigerian atelier by master craftspeople using heirloom techniques.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Compass className="w-4 h-4 text-black shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-sans-luxury font-bold uppercase tracking-wider text-noir block">
                48-POINT BESPOKE DRAFT
              </span>
              <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                Complimentary made-to-measure tailoring ensures an uncompromised fit calibrated to your exact anatomical lines.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Sparkles className="w-4 h-4 text-black shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-sans-luxury font-bold uppercase tracking-wider text-noir block">
                COMPLIMENTARY WORLDWIDE DELIVERY
              </span>
              <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                Shipped via insured DHL Express in our signature silk keepsake box with archival garment bag and hanger.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
