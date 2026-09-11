import React, { useState } from 'react';
import { ArrowRight, X, Sparkles, Compass, CheckCircle2, LayoutGrid, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCategory } from '../../types';
import { CATEGORY_DEPARTMENTS, DepartmentCategory, DepartmentPillarGroup } from '../../data/categoryContent';
import { useAudioStore } from '../../stores/audioStore';
import { formatKoboToNgn } from '../../utils/formatters';
import { StackSpreadStage, StackSpreadCard } from '../ui/stack-spread';

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

  // Calculate distinct Bento card proportions for gapless interlocking grid
  const getBentoSpan = (deptId: string, index: number) => {
    if (activePillar === 'ALL') {
      if (deptId === 'DINNER_DRESSES') return 'lg:col-span-2 lg:row-span-2 h-[480px] sm:h-[560px]';
      if (deptId === '3PIECES' || deptId === 'KIMONO') return 'lg:col-span-2 lg:row-span-1 h-[270px]';
      if (deptId === 'DRESSES' || deptId === 'PANTS') return 'lg:col-span-1 lg:row-span-2 h-[480px] sm:h-[560px]';
      return 'lg:col-span-1 lg:row-span-1 h-[270px]';
    }
    if (index === 0) return 'lg:col-span-2 lg:row-span-2 h-[480px] sm:h-[540px]';
    if (index === 1 && filteredDepartments.length >= 5) return 'lg:col-span-2 lg:row-span-1 h-[260px]';
    return 'lg:col-span-1 lg:row-span-1 h-[260px]';
  };

  // Curated lookbook cards for the dynamic StackSpread scatter scroll
  const hauteDeptCards: StackSpreadCard[] = [
    {
      item: {
        src: '/images/fc_asymmetric_silk_dress.jpg',
        alt: 'Fluid Silk Column Dresses',
        title: 'Silk Column Dresses',
        category: 'Silks & Gowns',
        tagline: 'Bias-cut mulberry silk with unbroken luster',
        onClick: () => handleNavigate('DRESSES'),
      },
      stackOffset: { x: -8, y: -10 },
      stackRotate: -16,
      target: { x: -22, y: -30, rotate: -2, scale: 0.88, w: 18, h: 26 },
      targetSm: { x: -22, y: -38 },
      z: 2,
    },
    {
      item: {
        src: '/images/fc_haute_soiree_gown.jpg',
        alt: 'Grand Soirée & Gala Gowns',
        title: 'Grand Soirée Gowns',
        category: 'Silks & Gowns',
        tagline: 'Monumental gowns with detachable organza capes',
        onClick: () => handleNavigate('DINNER_DRESSES'),
      },
      stackOffset: { x: 12, y: -12 },
      stackRotate: 18,
      target: { x: 30, y: -28, rotate: 3, scale: 0.92, w: 20, h: 30 },
      targetSm: { x: 22, y: -38 },
      z: 3,
    },
    {
      item: {
        src: '/images/fc_tailoring_suite.jpg',
        alt: 'Pagoda Jackets & Blazers',
        title: 'Pagoda Blazers',
        category: 'Tailoring & Suites',
        tagline: 'Sculptured hourglass peplum in Italian virgin wool',
        onClick: () => handleNavigate('JACKETS'),
      },
      stackOffset: { x: -14, y: 2 },
      stackRotate: -6,
      target: { x: -35, y: -2, rotate: -1, scale: 0.9, w: 17, h: 28 },
      targetSm: { x: -22, y: -18 },
      z: 4,
    },
    {
      item: {
        src: '/images/fc_luxury_threepiece.jpg',
        alt: '3-Piece Sovereign Tailoring',
        title: '3-Piece Tailoring',
        category: 'Tailoring & Suites',
        tagline: 'Canvassed blazers & knife-pleated palazzo trousers',
        onClick: () => handleNavigate('3PIECES'),
      },
      stackOffset: { x: 2, y: -8 },
      stackRotate: -2,
      target: { x: 8, y: -32, rotate: 1, scale: 0.84, w: 22, h: 28 },
      targetSm: { x: 22, y: -18 },
      z: 5,
    },
    {
      item: {
        src: '/images/fc_luxury_kimono.jpg',
        alt: 'Atelier Kimonos & Robes',
        title: 'Atelier Kimonos',
        category: 'Silks & Gowns',
        tagline: 'Ancestral bullion gilt thread hand-laid in Lagos',
        onClick: () => handleNavigate('KIMONO'),
      },
      stackOffset: { x: 16, y: 4 },
      stackRotate: 8,
      target: { x: 36, y: 8, rotate: 2, scale: 0.88, w: 19, h: 29 },
      targetSm: { x: -22, y: 22 },
      z: 6,
    },
    {
      item: {
        src: '/images/fc_luxury_jumpsuit.jpg',
        alt: 'Sculptural Jumpsuits',
        title: 'Sculptural Jumpsuits',
        category: 'Sculpted & Resort',
        tagline: 'Internal boned corsetry with sovereign poise',
        onClick: () => handleNavigate('JUMPSUITS'),
      },
      stackOffset: { x: -6, y: 10 },
      stackRotate: 5,
      target: { x: -25, y: 32, rotate: -3, scale: 0.88, w: 21, h: 27 },
      targetSm: { x: 22, y: 22 },
      z: 7,
    },
    {
      item: {
        src: '/images/fc_luxury_pants.jpg',
        alt: 'Pants & Palazzo',
        title: 'Palazzo Trousers',
        category: 'Tailoring & Suites',
        tagline: '320 GSM double-faced mulberry silk crepe',
        onClick: () => handleNavigate('PANTS'),
      },
      stackOffset: { x: 6, y: 8 },
      stackRotate: 3,
      target: { x: 4, y: 34, rotate: 1, scale: 0.84, w: 19, h: 25 },
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
      target: { x: 30, y: 34, rotate: -2, scale: 0.88, w: 18, h: 24 },
      targetSm: { x: 22, y: 42 },
      z: 9,
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] border-b border-black/10">
      
      {/* =========================================================================
          AWWWARDS-LEVEL STACK-SPREAD CINEMATIC SCROLL CHAPTER
          ========================================================================= */}
      <StackSpreadStage
        cards={hauteDeptCards}
        scrollLength={280}
        bgColor="#FFFFFF"
        clusterRotation={true}
        stackScale={0.82}
        cardRadius={4}
        textColor="#000000"
        textFadeStart={0.22}
        showScrollHint={true}
        heading={
          <div className="space-y-4 max-w-5xl mx-auto pointer-events-none">
            <h2 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-noir uppercase leading-[1.08]">
              13 HAUTE DEPARTMENTS.
            </h2>
          </div>
        }
        subtitle={
          <p className="mt-4 w-full max-w-2xl mx-auto text-xs sm:text-sm text-neutral-600 font-light leading-relaxed tracking-normal">
            Pure mulberry silks, hand-canvassed Italian wools, and ancestral metallic embroidery. Each department is drafted across 48 custom anatomical points inside our Lagos atelier.
          </p>
        }
      />

      {/* =========================================================================
          INTERACTIVE ARCHITECTURAL EXPLORER & PILLAR FILTER SUITE
          ========================================================================= */}
      <section className="w-full bg-[#FFFFFF] py-16 sm:py-24 overflow-hidden border-t border-black/10">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
          
          {/* Controls: Pillar Filters & Dual View Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-black/10 gap-4">
            <div>
              <span className="text-[10px] font-mono-luxury uppercase tracking-widest text-neutral-400 block mb-1">
                Department Archives
              </span>
              <h3 className="font-sans-luxury text-xl sm:text-2xl font-bold tracking-tight text-noir uppercase">
                Explore The Complete Atelier Portfolio
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Pillar Switches */}
              <div className="flex items-center flex-wrap gap-1 p-1 bg-[#F5F5F5] border border-black/10 rounded-xs text-xs font-sans-luxury">
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

          {/* View Mode 1: Mathematically Interlocking Gapless Bento Grid */}
          {layoutMode === 'BENTO' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-3 sm:gap-4 grid-flow-dense">
              {filteredDepartments.map((dept, index) => {
                const spanClass = getBentoSpan(dept.id, index);

                return (
                  <motion.div
                    key={dept.id}
                    layoutId={`bento-card-${dept.id}`}
                    onClick={() => handleNavigate(dept.id)}
                    className={`relative overflow-hidden group cursor-pointer border border-black/10 bg-[#FAFAFA] rounded-xs shadow-xs hover:border-black transition-all duration-300 flex flex-col justify-between ${spanClass}`}
                  >
                    {/* Background Artwork */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <img
                        src={dept.image}
                        alt={dept.label}
                        className="w-full h-full object-cover object-[center_25%] transition-transform duration-700 ease-out group-hover:scale-105 contrast-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 group-hover:via-black/25 transition-colors duration-300" />
                    </div>

                    {/* Top Status Header */}
                    <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-[#DFC7AA] text-[10px] font-mono-luxury uppercase tracking-widest border border-white/10 rounded-xs">
                        Dept {dept.index}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playTactileClick();
                          setInspectedDept(dept);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 bg-white/90 hover:bg-white text-black text-[10px] font-mono-luxury uppercase tracking-wider rounded-xs flex items-center gap-1 shadow-xs"
                      >
                        <span>Specifications</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Bottom Editorial Copy & Conversion Anchor */}
                    <div className="relative z-10 p-4 sm:p-6 text-white space-y-2">
                      <span className="text-[10px] font-mono-luxury text-white/70 uppercase tracking-widest block">
                        {dept.tagline}
                      </span>
                      <h3 className="text-lg sm:text-xl font-sans-luxury font-bold uppercase tracking-tight leading-tight group-hover:text-[#DFC7AA] transition-colors">
                        {dept.label}
                      </h3>
                      
                      <p className="text-xs text-white/80 font-light line-clamp-2 leading-relaxed">
                        {dept.description}
                      </p>

                      <div className="pt-2 flex items-center justify-between border-t border-white/15 text-[11px] font-sans-luxury">
                        <span className="font-mono-luxury text-[#DFC7AA] font-semibold">
                          From {formatKoboToNgn(dept.startingPriceKobo)}
                        </span>
                        <span className="uppercase tracking-wider text-white/90 group-hover:text-white flex items-center gap-1">
                          Acquire <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
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

      {/* =========================================================================
          SPECIFICATIONS MODAL FOR INSPECTED DEPARTMENT
          ========================================================================= */}
      <AnimatePresence>
        {inspectedDept && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white max-w-xl w-full p-6 sm:p-8 border border-black/20 shadow-2xl relative"
            >
              <button
                onClick={() => setInspectedDept(null)}
                className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-black" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono-luxury uppercase tracking-widest text-neutral-400 block mb-1">
                    {inspectedDept.pillarLabel} · Department {inspectedDept.index}
                  </span>
                  <h3 className="font-sans-luxury text-2xl font-bold uppercase text-noir">
                    {inspectedDept.label}
                  </h3>
                  <p className="text-xs text-neutral-500 italic mt-1">
                    {inspectedDept.tagline}
                  </p>
                </div>

                <div className="aspect-[16/9] w-full overflow-hidden border border-black/10">
                  <img
                    src={inspectedDept.image}
                    alt={inspectedDept.label}
                    className="w-full h-full object-cover object-[center_30%]"
                  />
                </div>

                <div className="space-y-3 text-xs text-neutral-700 leading-relaxed font-light">
                  <p>{inspectedDept.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-black/10 font-mono-luxury text-[11px]">
                    <div className="p-3 bg-neutral-50 border border-black/5">
                      <span className="text-[9px] uppercase tracking-widest text-neutral-400 block mb-1">
                        Fabric Provenance
                      </span>
                      <span className="text-neutral-900 font-semibold block">
                        {inspectedDept.fabricProvenance}
                      </span>
                    </div>
                    <div className="p-3 bg-neutral-50 border border-black/5">
                      <span className="text-[9px] uppercase tracking-widest text-neutral-400 block mb-1">
                        Anatomical Fit
                      </span>
                      <span className="text-neutral-900 font-semibold block">
                        {inspectedDept.anatomicalFit}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">
                      Starting Investment
                    </span>
                    <span className="font-mono-luxury text-base font-bold text-black">
                      {formatKoboToNgn(inspectedDept.startingPriceKobo)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      const id = inspectedDept.id;
                      setInspectedDept(null);
                      handleNavigate(id);
                    }}
                    className="px-6 py-2.5 bg-black text-white text-xs font-sans-luxury uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors"
                  >
                    View Department Collection ⟶
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
