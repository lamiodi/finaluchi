import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Check, Heart, X } from 'lucide-react';
import { OccasionType, Product, ATELIER_CATEGORIES } from '../../types';
import { getDepartmentById, CATEGORY_DEPARTMENTS } from '../../data/categoryContent';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatPriceWithDisplay, formatKoboToNgn } from '../../utils/formatters';

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

  const { displayCurrency } = useCurrencyStore();
  const { savedEdits, toggleProductInEdit } = useWishlistStore();
  const { playTactileClick } = useAudioStore();

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

  const getItemCount = (pillarId: string) => {
    if (pillarId === 'ALL') return products.length;
    return products.filter((p) => p.pillar === pillarId).length;
  };

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen pb-24 text-[#000000] font-sans-luxury">
      
      {/* Top Banner & Editorial Header with Dynamic Category Intelligence */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-8 border-b border-black/10">
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
          
          {activeDept ? (
            <div className="space-y-3 max-w-3xl">
              <span className="text-[10px] font-mono-luxury text-[#A67C4A] uppercase tracking-[0.25em] font-semibold block">
                Department {activeDept.index} · {activeDept.pillarLabel}
              </span>
              <h1 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#000000] uppercase">
                {activeDept.label}{' '}
                <span className="text-xl sm:text-2xl font-mono-luxury text-black/40 font-light">
                  [{filteredProducts.length}]
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-black/80 font-light leading-relaxed max-w-2xl mx-auto">
                {activeDept.description}
              </p>

              {/* Minimalist 3-Pillar Category Intelligence Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-black/10 text-left mt-4 bg-[#FAFAFA] p-4 border border-black/10">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono-luxury text-black/50 uppercase tracking-widest block font-medium">
                    Signature Fabric
                  </span>
                  <p className="text-xs font-sans-luxury text-black font-semibold leading-tight">
                    {activeDept.fabricProvenance}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono-luxury text-black/50 uppercase tracking-widest block font-medium">
                    Anatomical Draft
                  </span>
                  <p className="text-xs font-sans-luxury text-black font-semibold leading-tight">
                    {activeDept.anatomicalFit}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono-luxury text-black/50 uppercase tracking-widest block font-medium">
                    Couture Standard
                  </span>
                  <p className="text-xs font-sans-luxury text-black font-semibold leading-tight">
                    {activeDept.conversionHighlight}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 max-w-3xl">
              <h1 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#000000] uppercase">
                HAUTE COUTURE ARCHIVE{' '}
                <span className="text-xl sm:text-2xl font-mono-luxury text-black/40 font-light">
                  [{filteredProducts.length}]
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-black/70 max-w-2xl font-light leading-relaxed mx-auto">
                13 singular couture departments crafted from virgin wool, pure mulberry silk, and hand-woven ancestral textiles. Hand-drafted to 48 anatomical points inside our Lagos atelier.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono-luxury text-black/60 pt-2 uppercase tracking-widest">
                <span>· 100% Lagos Atelier Handcrafted</span>
                <span>· Complimentary Bespoke Custom Sizing</span>
                <span>· Insured Worldwide Express</span>
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
            {ATELIER_CATEGORIES.map((cat) => {
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
                OCCASION CURATION
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
                FABRIC PALETTE
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
            <h3 className="font-sans-luxury text-2xl sm:text-3xl text-[#000000] uppercase font-semibold">No pieces match this filter criteria.</h3>
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
