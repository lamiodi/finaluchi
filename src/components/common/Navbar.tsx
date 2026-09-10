import React, { useState } from 'react';
import {
  ShoppingBag, Search, Sparkles, Menu, X,
  ChevronDown, Heart, User, Calendar
} from 'lucide-react';
import { ATELIER_CATEGORIES } from '../../types';
import { CATEGORY_DEPARTMENTS } from '../../data/categoryContent';
import { useCartStore } from '../../stores/cartStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatKoboToNgn } from '../../utils/formatters';

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateCatalog?: () => void;
  onNavigatePillar: (pillar: string) => void;
  onOpenSearch: () => void;
  onOpenRunway: () => void;
  onOpenClientPortal: () => void;
  onOpenAdmin: () => void;
  onOpenAppointments: () => void;
  onOpenContact?: () => void;
  onOpenAbout?: () => void;
  totalWishlistCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onNavigatePillar,
  onOpenSearch,
  onOpenRunway,
  onOpenClientPortal,
  onOpenAdmin,
  onOpenAppointments,
  onOpenContact,
  onOpenAbout,
  totalWishlistCount,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const { items, openDrawer } = useCartStore();
  const { playTactileClick } = useAudioStore();

  const totalCartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-black/10 font-sans-luxury">
      <div className="relative max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex items-center justify-between">
        
        {/* Left: Clean Minimal Navigation (Decluttered Luxury) */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              playTactileClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="lg:hidden p-1 text-noir hover:text-[#C5A880] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-sans-luxury font-medium uppercase tracking-tight text-noir">
            
            {/* Single Unified Collections Trigger with Multi-Column Category Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
            >
              <button
                onClick={() => {
                  playTactileClick();
                  onNavigatePillar('ALL');
                }}
                className="flex items-center gap-1.5 py-1 text-noir hover:text-[#A67C4A] font-semibold transition-colors uppercase tracking-wider"
              >
                <span>COLLECTIONS</span>
                <ChevronDown className={`w-3.5 h-3.5 transform transition-transform text-muted ${isCategoryDropdownOpen ? 'rotate-180 text-noir' : ''}`} />
              </button>

              {/* Luxury 3-Pillar Department Directory */}
              {isCategoryDropdownOpen && (
                <div 
                  className="absolute left-0 top-full mt-2 w-[720px] bg-white border border-black/15 shadow-2xl rounded-xs p-6 z-50 animate-in fade-in zoom-in-98 duration-200"
                  onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-black/10 mb-5">
                    <span className="text-[10px] font-mono-luxury text-[#A67C4A] uppercase tracking-widest font-semibold">
                      13 Couture Departments · Lagos Atelier
                    </span>
                    <button
                      onClick={() => {
                        playTactileClick();
                        onNavigatePillar('ALL');
                        setIsCategoryDropdownOpen(false);
                      }}
                      className="text-[11px] font-sans-luxury font-bold text-noir hover:underline uppercase tracking-tight"
                    >
                      View All Creations (13) ⟶
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-6 text-xs">
                    {/* Pillar 1: Tailoring */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono-luxury text-black/45 uppercase tracking-widest block font-bold border-b border-black/10 pb-1.5">
                        Tailoring & Suites
                      </span>
                      <div className="space-y-1">
                        {CATEGORY_DEPARTMENTS.filter((d) => d.pillarGroup === 'TAILORING').map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              playTactileClick();
                              onNavigatePillar(cat.id);
                              setIsCategoryDropdownOpen(false);
                            }}
                            className="w-full text-left p-1.5 hover:bg-neutral-100 rounded-xs transition-all flex flex-col group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-sans-luxury font-semibold text-noir text-[11px] group-hover:text-black">
                                <span className="font-mono-luxury text-[9px] text-black/40 mr-1.5">{cat.index}</span>
                                {cat.label}
                              </span>
                              <span className="text-[9px] font-mono-luxury text-black/40">⟶</span>
                            </div>
                            <span className="text-[9px] font-mono-luxury text-black/50 ml-4">
                              {formatKoboToNgn(cat.startingPriceKobo)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pillar 2: Silks & Gowns */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono-luxury text-black/45 uppercase tracking-widest block font-bold border-b border-black/10 pb-1.5">
                        Silks & Gowns
                      </span>
                      <div className="space-y-1">
                        {CATEGORY_DEPARTMENTS.filter((d) => d.pillarGroup === 'SILKS').map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              playTactileClick();
                              onNavigatePillar(cat.id);
                              setIsCategoryDropdownOpen(false);
                            }}
                            className="w-full text-left p-1.5 hover:bg-neutral-100 rounded-xs transition-all flex flex-col group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-sans-luxury font-semibold text-noir text-[11px] group-hover:text-black">
                                <span className="font-mono-luxury text-[9px] text-black/40 mr-1.5">{cat.index}</span>
                                {cat.label}
                              </span>
                              <span className="text-[9px] font-mono-luxury text-black/40">⟶</span>
                            </div>
                            <span className="text-[9px] font-mono-luxury text-black/50 ml-4">
                              {formatKoboToNgn(cat.startingPriceKobo)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pillar 3: Sculpted & Resort */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono-luxury text-black/45 uppercase tracking-widest block font-bold border-b border-black/10 pb-1.5">
                        Sculpted & Resort
                      </span>
                      <div className="space-y-1">
                        {CATEGORY_DEPARTMENTS.filter((d) => d.pillarGroup === 'SPECIALTY').map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              playTactileClick();
                              onNavigatePillar(cat.id);
                              setIsCategoryDropdownOpen(false);
                            }}
                            className="w-full text-left p-1.5 hover:bg-neutral-100 rounded-xs transition-all flex flex-col group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-sans-luxury font-semibold text-noir text-[11px] group-hover:text-black">
                                <span className="font-mono-luxury text-[9px] text-black/40 mr-1.5">{cat.index}</span>
                                {cat.label}
                              </span>
                              <span className="text-[9px] font-mono-luxury text-black/40">⟶</span>
                            </div>
                            <span className="text-[9px] font-mono-luxury text-black/50 ml-4">
                              {formatKoboToNgn(cat.startingPriceKobo)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footnote Bar with Bespoke Trigger */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-black/10 text-[10px]">
                    <span className="text-black/60 font-mono-luxury">
                      Drafted to 48 anatomical points · Pure mulberry silks
                    </span>
                    <button
                      onClick={() => {
                        playTactileClick();
                        setIsCategoryDropdownOpen(false);
                        onOpenAppointments();
                      }}
                      className="font-bold text-black hover:underline uppercase tracking-wider flex items-center gap-1"
                    >
                      <span>Request Bespoke Custom Fitting</span>
                      <span>⟶</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Atelier Craft Navigation */}
            <button
              onClick={() => {
                playTactileClick();
                const el = document.getElementById('digital-atelier-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#A67C4A] transition-colors py-1 text-muted uppercase tracking-wider font-medium"
            >
              ATELIER
            </button>
          </nav>
        </div>

        {/* Center: FINALUCHI Wordmark + Emblem */}
        <div 
          className="cursor-pointer select-none flex items-center justify-center gap-2 group absolute left-1/2 -translate-x-1/2" 
          onClick={() => {
            playTactileClick();
            onNavigateHome();
          }}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white p-0.5 border border-black/10 flex items-center justify-center shrink-0 rounded-xs">
            <img
              src="/FINALUCHIlogo.jpg"
              alt="Finaluchi Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-sans-luxury text-base sm:text-2xl font-bold tracking-[0.16em] sm:tracking-[0.2em] text-noir uppercase group-hover:opacity-80 transition-opacity">
            FINALUCHI
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4 text-noir">
          
          {/* Runway Mode Trigger (desktop only; moved to hamburger on mobile) */}
          <button
            onClick={() => {
              playTactileClick();
              onOpenRunway();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-noir text-white text-xs font-semibold tracking-loose-couture uppercase rounded-xs hover:bg-neutral-800 transition-colors btn-luxury"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" />
            <span>RUNWAY</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => {
              playTactileClick();
              onOpenSearch();
            }}
            className="p-1.5 hover:text-[#C5A880] transition-colors"
            aria-label="Search Collection"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Private Client Portal Trigger (desktop only) */}
          <button
            onClick={() => {
              playTactileClick();
              onOpenClientPortal();
            }}
            className="hidden sm:block p-1.5 hover:text-[#C5A880] transition-colors relative"
            aria-label="Client Portal"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Concierge Bag Trigger */}
          <button
            onClick={() => {
              playTactileClick();
              openDrawer();
            }}
            className="p-1.5 hover:text-[#C5A880] transition-colors relative"
            aria-label="Concierge Bag"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-noir text-white text-[9px] font-mono-luxury font-bold rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Saved / Wishlist (desktop only) */}
          <button
            onClick={() => {
              playTactileClick();
              onOpenClientPortal();
            }}
            className="hidden sm:block p-1.5 hover:text-[#C5A880] transition-colors relative"
            aria-label="Saved Pieces"
          >
            <Heart className="w-4 h-4" />
            {totalWishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-noir text-white text-[8px] font-mono-luxury font-bold rounded-full flex items-center justify-center">
                {totalWishlistCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border px-5 py-6 space-y-6 animate-in slide-in-from-top-2 duration-300 shadow-xl max-h-[85vh] overflow-y-auto">
          
          <div>
            <div className="text-[10px] font-mono-luxury text-[#A67C4A] uppercase tracking-widest font-semibold pb-2 border-b border-border/40 mb-3">
              CLIENT CATEGORIES
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold uppercase tracking-tight text-noir">
              <button
                onClick={() => {
                  playTactileClick();
                  onNavigatePillar('ALL');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-2 px-2.5 bg-neutral-100 rounded-xs font-bold col-span-2 flex items-center justify-between"
              >
                <span>ALL CREATIONS</span>
                <span className="text-xs text-muted">⟶</span>
              </button>
              {ATELIER_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    playTactileClick();
                    onNavigatePillar(cat.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-2 px-2.5 hover:bg-neutral-100 rounded-xs transition-colors border border-border/40 flex items-center justify-between"
                >
                  <span className="truncate">{cat.label}</span>
                  <span className="text-[10px] text-muted">⟶</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Quick Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-border">
            {/* Runway Mode on mobile */}
          <button
            onClick={() => {
              playTactileClick();
              onOpenRunway();
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-2.5 bg-noir text-white text-xs font-bold tracking-loose-couture uppercase rounded-xs flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>RUNWAY MODE</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            {/* Client portal */}
            <button
              onClick={() => {
                playTactileClick();
                onOpenClientPortal();
                setIsMobileMenuOpen(false);
              }}
              className="py-2.5 bg-white border border-border text-noir text-xs font-bold tracking-couture uppercase rounded-xs flex items-center justify-center gap-2 hover:bg-noir hover:text-white transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>CLIENT PORTAL</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => {
                playTactileClick();
                onOpenClientPortal();
                setIsMobileMenuOpen(false);
              }}
              className="py-2.5 bg-white border border-border text-noir text-xs font-bold tracking-couture uppercase rounded-xs flex items-center justify-center gap-2 hover:bg-noir hover:text-white transition-colors"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>SAVED ({totalWishlistCount})</span>
            </button>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onOpenAppointments();
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-2.5 bg-noir text-white text-xs font-bold tracking-couture uppercase rounded-xs flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>BESPOKE FITTING</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            {onOpenAbout && (
              <button
                onClick={() => {
                  playTactileClick();
                  onOpenAbout();
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 bg-white border border-border text-noir text-xs font-semibold uppercase tracking-tight rounded-xs hover:bg-neutral-100 transition-colors text-center"
              >
                ABOUT MAISON
              </button>
            )}

            {onOpenContact && (
              <button
                onClick={() => {
                  playTactileClick();
                  onOpenContact();
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 bg-white border border-border text-noir text-xs font-semibold uppercase tracking-tight rounded-xs hover:bg-neutral-100 transition-colors text-center"
              >
                CONTACT CONCIERGE
              </button>
            )}
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onOpenAdmin();
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-1.5 text-[10px] font-mono-luxury text-muted hover:text-noir text-center uppercase tracking-widest pt-1"
          >
            Atelier Operations Desk (CRM)
          </button>
        </div>
        </div>
      )}
    </header>
  );
};
