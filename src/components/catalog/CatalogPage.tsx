import React, { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, ArrowUpDown, Check, Heart, X, ArrowRight } from 'lucide-react';
import { OccasionType, Product } from '../../types';
import { CATEGORY_DEPARTMENTS, getDepartmentById } from '../../data/categoryContent';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatPriceWithDisplay } from '../../utils/formatters';

interface CatalogPageProps {
  products: Product[];
  initialPillar?: string;
  initialOccasion?: OccasionType;
  onSelectProduct: (product: Product) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  products,
  initialPillar = 'ALL',
  initialOccasion,
  onSelectProduct,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<string>(initialPillar);
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType | 'ALL'>(initialOccasion || 'ALL');
  const [selectedColorFamily, setSelectedColorFamily] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'NEWEST' | 'PRICE_ASC' | 'PRICE_DESC' | 'EXCLUSIVITY'>('NEWEST');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [activeSpecimenIndex, setActiveSpecimenIndex] = useState<number>(0);

  const { displayCurrency } = useCurrencyStore();
  const { savedEdits, toggleProductInEdit } = useWishlistStore();
  const { playTactileClick } = useAudioStore();

  // Reset active specimen when category changes
  useEffect(() => {
    setActiveSpecimenIndex(0);
  }, [selectedPillar]);

  const isSaved = (productId: string) => {
    return savedEdits.some((e) => e.productIds.includes(productId));
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category / Pillar Filter
      if (selectedPillar !== 'ALL' && product.pillar !== selectedPillar) {
        return false;
      }
      // Occasion Filter
      if (selectedOccasion !== 'ALL' && !product.occasions.includes(selectedOccasion)) {
        return false;
      }
      // Color Family Filter
      if (selectedColorFamily !== 'ALL') {
        const hasColorFamily = product.colorways.some((cw) => cw.color.colorFamily === selectedColorFamily);
        if (!hasColorFamily) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'PRICE_ASC') return a.basePriceKobo - b.basePriceKobo;
      if (sortBy === 'PRICE_DESC') return b.basePriceKobo - a.basePriceKobo;
      if (sortBy === 'EXCLUSIVITY') {
        return (a.availability === 'ATELIER_EDITION' ? -1 : 1);
      }
      return 0;
    });
  }, [products, selectedPillar, selectedOccasion, selectedColorFamily, sortBy]);

  const activeDept = selectedPillar !== 'ALL' ? getDepartmentById(selectedPillar) : null;

  // Curate visual example images for the active category
  const specimenImages = useMemo(() => {
    if (!activeDept) return [];
    const list: string[] = [];
    if (activeDept.image) list.push(activeDept.image);
    if (activeDept.galleryImages && activeDept.galleryImages.length > 0) {
      activeDept.galleryImages.forEach((img) => {
        if (!list.includes(img)) list.push(img);
      });
    }
    // Also include product hero or media images for this category if available
    filteredProducts.forEach((p) => {
      p.colorways.forEach((cw) => {
        if (cw.heroImageUrl && !list.includes(cw.heroImageUrl)) list.push(cw.heroImageUrl);
        cw.mediaGalleryUrls?.forEach((url) => {
          if (url && !list.includes(url)) list.push(url);
        });
      });
    });
    // Fallbacks if fewer than 4 images
    const craftFallbacks = [
      '/images/fc_tailored_coat.jpg',
      '/images/fc_atelier_craft.jpg',
      '/images/fc_editorial_detail.jpg',
      '/images/fc_editorial_monument.jpg',
    ];
    craftFallbacks.forEach((fb) => {
      if (list.length < 4 && !list.includes(fb)) {
        list.push(fb);
      }
    });
    return list;
  }, [activeDept, filteredProducts]);

  const activeSpecimenUrl = specimenImages[activeSpecimenIndex] || activeDept?.image || '/images/fc_luxury_threepiece.jpg';

  const getSpecimenLabel = (idx: number) => {
    switch (idx) {
      case 0: return 'Flagship Silhouette';
      case 1: return 'Atelier Form & Cut';
      case 2: return 'Artisan Craftsmanship';
      case 3: return 'Macro Fabric & Stays';
      default: return `Lookbook Specimen 0${idx + 1}`;
    }
  };

  const getItemCount = (pillarId: string) => {
    if (pillarId === 'ALL') return products.length;
    return products.filter((p) => p.pillar === pillarId).length;
  };

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen pb-24 text-[#000000] font-sans-luxury">
      
      {/* Top Banner & Editorial Header with Dynamic Category Intelligence */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-8 border-b border-black/10">
        <div className="mb-8">
          
          {activeDept ? (
            <div className="w-full">
              {/* Haute Couture Atelier Dossier — Architectural Split with Visual Examples */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start text-left">
                
                {/* Left Column (lg:col-span-7): Editorial Intelligence, Narrative & Specs */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Eyebrow & Provenance Badge */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center px-2.5 py-1 bg-black text-white text-[10px] font-mono-luxury uppercase tracking-widest rounded-xs">
                      DEPARTMENT {activeDept.index}
                    </span>
                    <span className="text-[11px] font-mono-luxury text-[#A67C4A] uppercase tracking-[0.25em] font-semibold">
                      {activeDept.pillarLabel}
                    </span>
                    <span className="text-black/25">·</span>
                    <span className="text-[10px] font-mono-luxury text-neutral-500 uppercase tracking-wider">
                      {activeDept.pillarGroup} PILLAR
                    </span>
                  </div>

                  {/* 2-Line Headline & Tagline */}
                  <div className="space-y-2">
                    <h1 className="font-sans-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#000000] uppercase leading-[1.06]">
                      {activeDept.label}{' '}
                      <span className="text-xl sm:text-2xl font-mono-luxury text-black/40 font-light align-baseline">
                        [{filteredProducts.length}]
                      </span>
                    </h1>
                    <p className="text-xs sm:text-sm font-sans-luxury italic text-[#A67C4A] tracking-normal font-normal">
                      {activeDept.tagline}
                    </p>
                  </div>

                  {/* Editorial Narrative */}
                  <p className="text-xs sm:text-sm text-black/80 font-light leading-relaxed max-w-2xl">
                    {activeDept.description}
                  </p>

                  {/* 3-Pillar Architectural Specification Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-black/10">
                    
                    {/* Spec 1: Fabric & Craft */}
                    <div className="p-3.5 bg-[#FAFAFA] border border-black/10 rounded-xs space-y-1.5 hover:border-black transition-colors">
                      <span className="text-[9px] font-mono-luxury text-[#A67C4A] uppercase tracking-widest block font-semibold">
                        FABRIC & CRAFT
                      </span>
                      <p className="text-xs font-sans-luxury text-black font-medium leading-snug">
                        {activeDept.fabricProvenance}
                      </p>
                    </div>

                    {/* Spec 2: Fit & Silhouette */}
                    <div className="p-3.5 bg-[#FAFAFA] border border-black/10 rounded-xs space-y-1.5 hover:border-black transition-colors">
                      <span className="text-[9px] font-mono-luxury text-[#A67C4A] uppercase tracking-widest block font-semibold">
                        FIT & SILHOUETTE
                      </span>
                      <p className="text-xs font-sans-luxury text-black font-medium leading-snug">
                        {activeDept.anatomicalFit}
                      </p>
                    </div>

                    {/* Spec 3: Occasion */}
                    <div className="p-3.5 bg-[#FAFAFA] border border-black/10 rounded-xs space-y-1.5 hover:border-black transition-colors">
                      <span className="text-[9px] font-mono-luxury text-[#A67C4A] uppercase tracking-widest block font-semibold">
                        OCCASION
                      </span>
                      <p className="text-xs font-sans-luxury text-black font-medium leading-snug">
                        {activeDept.conversionHighlight}
                      </p>
                    </div>

                  </div>

                  {/* Action Bridge: WhatsApp Bespoke Concierge & Reset */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={`https://api.whatsapp.com/send/?phone=2348032312961&text=${encodeURIComponent(
                        `Hello Finaluchi Couture. I am reviewing Department ${activeDept.index} · ${activeDept.label} on your website. I would like to inquire about custom creation, availability and measurement consultation.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playTactileClick()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-[11px] font-sans-luxury font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all rounded-xs shadow-xs"
                    >
                      <span>Inquire Bespoke for {activeDept.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => {
                        playTactileClick();
                        setSelectedPillar('ALL');
                      }}
                      className="px-4 py-2.5 bg-white text-black/70 hover:text-black text-[11px] font-sans-luxury font-medium uppercase tracking-wider border border-black/15 hover:border-black transition-all rounded-xs"
                    >
                      View All Categories
                    </button>
                  </div>

                </div>

                {/* Right Column (lg:col-span-5): Lookbook Visual Examples Gallery */}
                <div className="lg:col-span-5 w-full flex flex-col items-center">
                  
                  {/* Primary Stage Image */}
                  <div className="relative w-full aspect-[4/5] max-w-[420px] mx-auto bg-[#F5F5F3] border border-black/10 rounded-xs overflow-hidden group shadow-sm">
                    <img
                      src={activeSpecimenUrl}
                      alt={`${activeDept.label} Lookbook Specimen ${activeSpecimenIndex + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Top Status Indicators */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md text-white text-[9px] font-mono-luxury tracking-widest uppercase rounded-xs">
                        SPECIMEN 0{activeSpecimenIndex + 1} / 0{specimenImages.length}
                      </span>
                      <span className="px-2 py-0.5 bg-white/95 backdrop-blur-md text-black text-[9px] font-sans-luxury font-semibold tracking-wider uppercase rounded-xs shadow-xs">
                        Abuja Atelier
                      </span>
                    </div>

                    {/* Scrim Caption: Bottom */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-3.5 px-4 text-white">
                      <span className="text-[9px] font-mono-luxury text-white/70 uppercase tracking-widest block">
                        {getSpecimenLabel(activeSpecimenIndex)}
                      </span>
                      <p className="font-sans-luxury text-xs font-bold uppercase tracking-wider mt-0.5">
                        {activeDept.label} · Archive Specimen
                      </p>
                    </div>
                  </div>

                  {/* Thumbnail Selector: Visual Examples Strip */}
                  <div className="w-full max-w-[420px] mx-auto mt-3">
                    <div className="flex items-center justify-between pb-1.5 px-0.5">
                      <span className="text-[10px] font-mono-luxury uppercase tracking-wider text-black/60">
                        Category Visual Examples [{specimenImages.length}]
                      </span>
                      <span className="text-[9px] font-mono-luxury uppercase text-[#A67C4A]">
                        Click to inspect
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {specimenImages.slice(0, 4).map((imgUrl, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            playTactileClick();
                            setActiveSpecimenIndex(idx);
                          }}
                          className={`relative aspect-[3/4] w-full rounded-xs overflow-hidden border transition-all ${
                            activeSpecimenIndex === idx
                              ? 'border-black ring-1 ring-black shadow-xs scale-[1.02]'
                              : 'border-black/10 opacity-70 hover:opacity-100 hover:border-black/40'
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`Visual Example 0${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 right-1 px-1 bg-black/75 text-white text-[8px] font-mono-luxury leading-none py-0.5 rounded-2xs">
                            0{idx + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-3xl mx-auto">
              <h1 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#000000] uppercase">
                SHOP WOMEN&apos;S COLLECTION{' '}
                <span className="text-xl sm:text-2xl font-mono-luxury text-black/40 font-light">
                  [{filteredProducts.length}]
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-black/70 max-w-2xl font-light leading-relaxed mx-auto">
                Explore Finaluchi Couture&apos;s 13 product categories across ready-to-wear, statement tailoring and occasion dressing. For custom work, share your event date and measurements with the Abuja team.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono-luxury text-black/60 pt-2 uppercase tracking-widest">
                <span>· Designed in Abuja</span>
                <span>· Ready-to-Wear & Custom Options</span>
                <span>· WhatsApp Order Support</span>
              </div>
            </div>
          )}

        </div>

        {/* Action & Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-black/10">
          
          {/* Category Quick Filter Tabs with Counts & Responsive Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs font-sans-luxury tracking-wider scrollbar-none">
            <button
              onClick={() => {
                playTactileClick();
                setSelectedPillar('ALL');
              }}
              className={`px-3.5 py-2 text-[11px] uppercase tracking-wider whitespace-nowrap transition-all duration-200 border shrink-0 ${
                selectedPillar === 'ALL'
                  ? 'bg-[#000000] text-[#FFFFFF] border-[#000000] font-semibold'
                  : 'bg-[#FFFFFF] text-black/70 border-black/15 hover:border-black hover:text-[#000000]'
              }`}
            >
              All [{getItemCount('ALL')}]
            </button>
            {CATEGORY_DEPARTMENTS.map((cat) => {
              const count = getItemCount(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playTactileClick();
                    setSelectedPillar(cat.id);
                  }}
                  className={`px-3.5 py-2 text-[11px] uppercase tracking-wider whitespace-nowrap transition-all duration-200 border shrink-0 ${
                    selectedPillar === cat.id
                      ? 'bg-[#000000] text-[#FFFFFF] border-[#000000] font-semibold'
                      : 'bg-[#FFFFFF] text-black/70 border-black/15 hover:border-black hover:text-[#000000]'
                  }`}
                >
                  {cat.label} [{count}]
                </button>
              );
            })}
          </div>

          {/* Right: Filter Drawer Toggle & Sort Dropdown */}
          <div className="flex items-center gap-3 relative">
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => {
                playTactileClick();
                setIsFilterDrawerOpen(!isFilterDrawerOpen);
              }}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all border ${
                isFilterDrawerOpen || selectedOccasion !== 'ALL' || selectedColorFamily !== 'ALL'
                  ? 'bg-[#000000] text-[#FFFFFF] border-[#000000]'
                  : 'bg-[#FFFFFF] text-[#000000] border-black/15 hover:border-black'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>FILTERS {selectedOccasion !== 'ALL' || selectedColorFamily !== 'ALL' ? '• (Active)' : ''}</span>
            </button>

            {/* Sort Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => {
                  playTactileClick();
                  setIsSortDropdownOpen(!isSortDropdownOpen);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#FFFFFF] border border-black/15 hover:border-black text-[#000000] text-xs font-semibold tracking-widest uppercase transition-all"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>SORT: {sortBy.replace('_', ' ')}</span>
              </button>

              {/* Sort Modal Popover */}
              {isSortDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-[#FFFFFF] border border-black/20 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="text-[10px] font-mono-luxury text-black/50 px-3 py-2 uppercase tracking-widest border-b border-black/10">
                    Sort Order
                  </div>
                  <div className="space-y-1 pt-1 text-xs">
                    {[
                      { id: 'NEWEST', label: 'Newest Arrivals' },
                      { id: 'PRICE_ASC', label: 'Price: Low to High' },
                      { id: 'PRICE_DESC', label: 'Price: High to Low' },
                      { id: 'EXCLUSIVITY', label: 'Atelier Editions First' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          playTactileClick();
                          setSortBy(opt.id as any);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 flex items-center justify-between transition-colors ${
                          sortBy === opt.id ? 'bg-[#000000] text-[#FFFFFF] font-semibold' : 'hover:bg-black/5 text-[#000000]'
                        }`}
                      >
                        <span className="tracking-wide">
                          {opt.label}
                        </span>
                        {sortBy === opt.id && <Check className="w-3.5 h-3.5 text-[#C5A880]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Collapsible Filter Bar */}
        {isFilterDrawerOpen && (
          <div className="mt-6 p-6 bg-[#FFFFFF] border border-black/15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-top-2 duration-200 shadow-sm">
            
            {/* Occasion Filter */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono-luxury text-[#C5A880] uppercase tracking-[0.2em] font-semibold block">
                SHOP BY OCCASION
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {['ALL', 'WEDDING', 'GALA_BLACK_TIE', 'PRIVATE_DINNER', 'VACATION', 'RED_CARPET'].map((occ) => (
                  <button
                    key={occ}
                    onClick={() => {
                      playTactileClick();
                      setSelectedOccasion(occ as any);
                    }}
                    className={`px-3 py-1.5 text-[11px] uppercase tracking-wider transition-colors border ${
                      selectedOccasion === occ
                        ? 'bg-[#000000] text-[#FFFFFF] border-[#000000] font-semibold'
                        : 'bg-[#FFFFFF] text-black/70 border-black/15 hover:border-black hover:text-[#000000]'
                    }`}
                  >
                    {occ === 'ALL' ? 'All Occasions' : occ.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Family Filter */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono-luxury text-[#C5A880] uppercase tracking-[0.2em] font-semibold block">
                COLOUR PALETTE
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {['ALL', 'NEUTRALS_MINERAL', 'IMPERIAL_JEWEL', 'METALLIC_SATIN', 'SAVANNA_SOLSTICE'].map((fam) => (
                  <button
                    key={fam}
                    onClick={() => {
                      playTactileClick();
                      setSelectedColorFamily(fam);
                    }}
                    className={`px-3 py-1.5 text-[11px] uppercase tracking-wider transition-colors border ${
                      selectedColorFamily === fam
                        ? 'bg-[#000000] text-[#FFFFFF] border-[#000000] font-semibold'
                        : 'bg-[#FFFFFF] text-black/70 border-black/15 hover:border-black hover:text-[#000000]'
                    }`}
                  >
                    {fam === 'ALL' ? 'All Palettes' : fam.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters Action */}
            <div className="flex items-end justify-start md:justify-end">
              <button
                onClick={() => {
                  playTactileClick();
                  setSelectedPillar('ALL');
                  setSelectedOccasion('ALL');
                  setSelectedColorFamily('ALL');
                  setSortBy('NEWEST');
                }}
                className="px-5 py-2.5 bg-[#FFFFFF] border border-[#000000] text-xs text-[#000000] font-semibold tracking-widest uppercase hover:bg-[#000000] hover:text-[#FFFFFF] transition-all flex items-center gap-2"
              >
                <X className="w-3.5 h-3.5" />
                <span>RESET ALL FILTERS</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Dynamic Editorial Masonry Grid */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14">
        
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <h3 className="font-sans-luxury text-2xl sm:text-3xl text-[#000000] uppercase font-semibold">No pieces match these filters.</h3>
            <p className="text-xs sm:text-sm text-black/60 font-light max-w-md mx-auto">Try selecting a different occasion or resetting your color palette filters to view our full collection.</p>
            <button
              onClick={() => {
                setSelectedPillar('ALL');
                setSelectedOccasion('ALL');
                setSelectedColorFamily('ALL');
              }}
              className="px-6 py-3 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-widest font-semibold border border-transparent hover:bg-[#FFFFFF] hover:text-[#000000] hover:border-[#000000] transition-all"
            >
              SHOW ALL CREATIONS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product, idx) => {
              const defaultColorway = product.colorways.find((c) => c.isDefault) || product.colorways[0];
              const secondaryImage = defaultColorway.mediaGalleryUrls[1] || defaultColorway.heroImageUrl;
              const saved = isSaved(product.id);
              const isHeroCard = idx % 7 === 0 && idx !== 0;

              return (
                <div
                  key={product.id}
                  onClick={() => {
                    playTactileClick();
                    onSelectProduct(product);
                  }}
                  className={`group flex flex-col cursor-pointer bg-[#FFFFFF] border border-black/10 hover:border-[#000000] transition-all duration-300 p-4 sm:p-5 ${
                    isHeroCard ? 'sm:col-span-2 sm:row-span-2' : ''
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAFAFA] mb-4">
                    <img
                      src={defaultColorway.heroImageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {secondaryImage && secondaryImage !== defaultColorway.heroImageUrl && (
                      <img
                        src={secondaryImage}
                        alt={`${product.name} angle`}
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                        loading="lazy"
                      />
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      {product.availability === 'ATELIER_EDITION' && (
                        <span className="px-2.5 py-1 bg-[#000000] text-[#FFFFFF] text-[9px] font-mono-luxury tracking-[0.2em] uppercase border border-white/20">
                          ATELIER EDITION
                        </span>
                      )}
                      {product.availability === 'MADE_TO_ORDER' && (
                        <span className="px-2.5 py-1 bg-[#000000]/90 text-[#FFFFFF] text-[9px] font-semibold tracking-widest uppercase border border-white/20">
                          MADE TO ORDER
                        </span>
                      )}
                      {product.availability === 'PRIVATE_ACCESS' && (
                        <span className="px-2.5 py-1 bg-[#000000] text-[#FFFFFF] text-[9px] font-mono-luxury tracking-[0.2em] uppercase border border-white/20">
                          PRIVATE ACCESS
                        </span>
                      )}
                    </div>

                    {/* Wishlist Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playTactileClick();
                        toggleProductInEdit('edit-default', product.id);
                      }}
                      className={`absolute top-3 right-3 p-2.5 rounded-none backdrop-blur-md transition-all z-10 border ${
                        saved
                          ? 'bg-[#000000] text-[#FFFFFF] border-[#000000]'
                          : 'bg-white/90 text-black border-black/10 hover:bg-[#000000] hover:text-[#FFFFFF] opacity-0 group-hover:opacity-100'
                      }`}
                      aria-label="Save to Wishlist"
                    >
                      <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                    </button>

                    {/* Color Swatch Previews */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      {product.colorways.slice(0, 4).map((cw) => (
                        <span
                          key={cw.id}
                          className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                          style={{ backgroundColor: cw.color.hexCode }}
                          title={cw.color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-col flex-1 justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-mono-luxury text-black/60 tracking-[0.18em] uppercase block mb-1">
                        {product.categoryName} • {product.fabricIntelligence.material.split('&')[0]}
                      </span>
                      <h3 className="font-sans-luxury text-sm sm:text-base font-semibold text-[#000000] tracking-tight group-hover:text-[#C5A880] transition-colors line-clamp-1 uppercase">
                        {product.name}
                      </h3>
                      {isHeroCard && (
                        <p className="text-xs text-black/65 font-light line-clamp-2 mt-2 leading-relaxed">
                          {product.headline}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-mono-luxury font-bold text-[#000000]">
                        {formatPriceWithDisplay(product.basePriceKobo, displayCurrency)}
                      </span>
                      <span className="text-[11px] font-semibold text-black/70 tracking-widest uppercase group-hover:text-[#000000] group-hover:translate-x-0.5 transition-all flex items-center gap-1">
                        DISCOVER <span className="text-xs">⟶</span>
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
