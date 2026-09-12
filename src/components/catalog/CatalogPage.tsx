import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Check, Heart, X, ArrowRight } from 'lucide-react';
import { OccasionType, Product } from '../../types';
import { CATEGORY_DEPARTMENTS, getDepartmentById } from '../../data/categoryContent';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatPriceWithDisplay } from '../../utils/formatters';
import { buildWhatsAppUrl } from '../../data/brand';

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
      
      {/* Top Banner: Minimalist Editorial Header */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-14 pb-8 border-b border-black/10">
        
        {activeDept ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Category Narrative */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono-luxury uppercase tracking-[0.25em] text-[#A67C4A]">
                <span>{activeDept.pillarLabel}</span>
                <span>·</span>
                <span>{activeDept.pillarGroup}</span>
              </div>

              <h1 className="font-sans-luxury text-3xl sm:text-5xl font-bold tracking-tight text-[#000000] uppercase">
                {activeDept.label}
              </h1>

              {activeDept.tagline && (
                <p className="text-xs sm:text-sm font-display italic text-[#A67C4A] tracking-normal">
                  &ldquo;{activeDept.tagline}&rdquo;
                </p>
              )}

              <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed max-w-2xl">
                {activeDept.description}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={buildWhatsAppUrl(
                    `Hello Finaluchi Couture, I would like to inquire about ordering from the ${activeDept.label} collection.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playTactileClick()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-[11px] font-sans-luxury font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all"
                >
                  <span>Inquire Custom {activeDept.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    playTactileClick();
                    setSelectedPillar('ALL');
                  }}
                  className="px-5 py-3 bg-white text-black/70 hover:text-black text-[11px] font-sans-luxury font-medium uppercase tracking-wider border border-black/15 hover:border-black transition-all"
                >
                  All Collections
                </button>
              </div>
            </div>

            {/* Right Column: Editorial Hero Image */}
            {activeDept.image && (
              <div className="lg:col-span-4 hidden lg:block">
                <div className="aspect-[4/5] w-full max-w-[340px] ml-auto overflow-hidden bg-neutral-100">
                  <img
                    src={activeDept.image}
                    alt={activeDept.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-3 max-w-3xl mx-auto py-4">
            <span className="text-[10px] sm:text-xs font-mono-luxury uppercase tracking-[0.25em] text-neutral-500">
              The Archive
            </span>
            <h1 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#000000] uppercase">
              WOMEN&apos;S COLLECTION
            </h1>
            <p className="text-xs sm:text-sm text-black/70 max-w-xl font-light leading-relaxed">
              Explore ready-to-wear, statement tailoring, and event dressing hand-crafted in our Abuja atelier.
            </p>
          </div>
        )}

        {/* Action & Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 mt-6 border-t border-black/10">
          
          {/* Scrollable Category Filter Pills */}
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

          {/* Right: Filter Trigger & Sort Dropdown */}
          <div className="flex items-center gap-3 relative">
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
              <span>FILTERS {selectedOccasion !== 'ALL' || selectedColorFamily !== 'ALL' ? '•' : ''}</span>
            </button>

            {/* Sort Popover */}
            <div className="relative">
              <button
                onClick={() => {
                  playTactileClick();
                  setIsSortDropdownOpen(!isSortDropdownOpen);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#FFFFFF] border border-black/15 hover:border-black text-[#000000] text-xs font-semibold tracking-widest uppercase transition-all"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>SORT</span>
              </button>

              {isSortDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[#FFFFFF] border border-black/20 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="space-y-1 text-xs">
                    {[
                      { id: 'NEWEST', label: 'Newest Arrivals' },
                      { id: 'PRICE_ASC', label: 'Price: Low to High' },
                      { id: 'PRICE_DESC', label: 'Price: High to Low' },
                      { id: 'EXCLUSIVITY', label: 'Atelier Editions' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          playTactileClick();
                          setSortBy(opt.id as any);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors ${
                          sortBy === opt.id ? 'bg-[#000000] text-[#FFFFFF] font-semibold' : 'hover:bg-neutral-100 text-[#000000]'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {sortBy === opt.id && <Check className="w-3.5 h-3.5 text-[#C5A880]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Collapsible Filter Panel */}
        {isFilterDrawerOpen && (
          <div className="mt-6 p-6 bg-[#FFFFFF] border border-black/15 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-2 duration-200">
            {/* Occasion Filter */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono-luxury text-[#C5A880] uppercase tracking-[0.2em] font-semibold block">
                Occasion
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
                Colour Palette
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

            {/* Reset Action */}
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
                <span>RESET FILTERS</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Product Grid (2-col mobile, 3-4 col desktop) */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14">
        
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <h3 className="font-sans-luxury text-2xl sm:text-3xl text-[#000000] uppercase font-semibold">
              No pieces match these criteria.
            </h3>
            <p className="text-xs sm:text-sm text-black/60 font-light max-w-md mx-auto">
              Reset filters to explore all pieces in our collection.
            </p>
            <button
              onClick={() => {
                setSelectedPillar('ALL');
                setSelectedOccasion('ALL');
                setSelectedColorFamily('ALL');
              }}
              className="px-6 py-3 bg-[#000000] text-[#FFFFFF] text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-all"
            >
              SHOW ALL CREATIONS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const defaultColorway = product.colorways.find((c) => c.isDefault) || product.colorways[0];
              const secondaryImage = defaultColorway.mediaGalleryUrls[1] || defaultColorway.heroImageUrl;
              const saved = isSaved(product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => {
                    playTactileClick();
                    onSelectProduct(product);
                  }}
                  className="group flex flex-col cursor-pointer transition-all relative"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F7F7F7] mb-3.5 flex items-center justify-center p-3 sm:p-4">
                    <img
                      src={defaultColorway.heroImageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-104 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {secondaryImage && secondaryImage !== defaultColorway.heroImageUrl && (
                      <img
                        src={secondaryImage}
                        alt={`${product.name} angle`}
                        className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out p-3 sm:p-4"
                        loading="lazy"
                      />
                    )}

                    {/* Wishlist Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playTactileClick();
                        toggleProductInEdit('edit-default', product.id);
                      }}
                      className={`absolute top-3 right-3 p-1.5 transition-all z-10 ${
                        saved
                          ? 'text-black fill-current'
                          : 'text-black/40 hover:text-black sm:opacity-0 sm:group-hover:opacity-100'
                      }`}
                      aria-label="Save to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono-luxury text-neutral-500 tracking-wider uppercase block">
                      {product.categoryName} • {product.fabricIntelligence.material.split('&')[0]}
                    </span>
                    <h3 className="font-sans-luxury text-xs sm:text-sm font-semibold text-[#000000] tracking-tight group-hover:text-[#A67C4A] transition-colors line-clamp-1 uppercase">
                      {product.name}
                    </h3>
                    <div className="text-xs sm:text-sm font-mono-luxury font-bold text-[#000000] pt-0.5">
                      {formatPriceWithDisplay(product.basePriceKobo, displayCurrency)}
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
