import React, { useState, useEffect } from 'react';
import {
  ShoppingBag, Search, Sparkles, Menu, X,
  ChevronDown, Heart, User, MessageCircle, ArrowRight
} from 'lucide-react';
import { CATEGORY_DEPARTMENTS } from '../../data/categoryContent';
import { useCartStore } from '../../stores/cartStore';
import { useAudioStore } from '../../stores/audioStore';
import { buildWhatsAppUrl } from '../../data/brand';

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateCatalog?: () => void;
  onNavigatePillar: (pillar: string) => void;
  onOpenSearch: () => void;
  onOpenRunway: () => void;
  onOpenClientPortal: () => void;
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
  onOpenAppointments,
  onOpenContact,
  onOpenAbout,
  totalWishlistCount,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const { items, openDrawer } = useCartStore();
  const { playTactileClick } = useAudioStore();

  const totalCartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-black/10 font-sans-luxury">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex items-center justify-between">
        
        {/* Left: Mobile Menu Trigger + Search (Mobile) | Desktop Navigation (Desktop) */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-8 flex-1 lg:flex-initial">
          {/* Mobile Hamburger Button (44px min touch target) */}
          <button
            onClick={() => {
              playTactileClick();
              setIsMobileMenuOpen(true);
            }}
            className="lg:hidden p-2 -ml-2 text-noir hover:text-[#C5A880] transition-colors focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile Search Button */}
          <button
            onClick={() => {
              playTactileClick();
              onOpenSearch();
            }}
            className="lg:hidden p-2 text-noir hover:text-[#C5A880] transition-colors"
            aria-label="Search Collection"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-sans-luxury font-medium uppercase tracking-wider text-noir">
            
            {/* Desktop Collections Dropdown Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  playTactileClick();
                  onNavigatePillar('ALL');
                }}
                className="flex items-center gap-1.5 py-1 text-noir hover:text-[#A67C4A] font-semibold transition-colors"
              >
                <span>COLLECTIONS</span>
                <ChevronDown className={`w-3.5 h-3.5 transform transition-transform duration-200 text-muted ${isCategoryDropdownOpen ? 'rotate-180 text-noir' : ''}`} />
              </button>

              {/* Minimalist Department Directory */}
              {isCategoryDropdownOpen && (
                <div 
                  className="absolute left-0 top-full mt-2 w-[720px] bg-white border border-black/15 shadow-2xl p-7 z-50 animate-in fade-in zoom-in-98 duration-150"
                >
                  <div className="flex items-center justify-between pb-3.5 border-b border-black/10 mb-6">
                    <span className="text-[10px] font-mono-luxury text-black/50 uppercase tracking-[0.2em] font-medium">
                      Women&apos;s Haute Couture & Ready-to-Wear
                    </span>
                    <button
                      onClick={() => {
                        playTactileClick();
                        onNavigatePillar('ALL');
                        setIsCategoryDropdownOpen(false);
                      }}
                      className="text-[11px] font-sans-luxury font-bold text-noir hover:text-[#A67C4A] transition-colors uppercase tracking-tight flex items-center gap-1"
                    >
                      <span>View All Creations</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-8 text-xs">
                    {/* Pillar 1: Tailoring */}
                    <div className="space-y-3.5">
                      <span className="text-[10px] font-mono-luxury text-black/40 uppercase tracking-[0.2em] block font-semibold border-b border-black/10 pb-2">
                        Tailoring & Sets
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
                            className="w-full text-left py-1.5 px-2 hover:bg-neutral-100 transition-colors flex items-center justify-between group"
                          >
                            <span className="font-sans-luxury text-[12px] text-noir/85 group-hover:text-black group-hover:font-semibold">
                              {cat.label}
                            </span>
                            <span className="text-[10px] text-black/30 group-hover:text-black group-hover:translate-x-0.5 transition-all">⟶</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pillar 2: Silks & Gowns */}
                    <div className="space-y-3.5">
                      <span className="text-[10px] font-mono-luxury text-black/40 uppercase tracking-[0.2em] block font-semibold border-b border-black/10 pb-2">
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
                            className="w-full text-left py-1.5 px-2 hover:bg-neutral-100 transition-colors flex items-center justify-between group"
                          >
                            <span className="font-sans-luxury text-[12px] text-noir/85 group-hover:text-black group-hover:font-semibold">
                              {cat.label}
                            </span>
                            <span className="text-[10px] text-black/30 group-hover:text-black group-hover:translate-x-0.5 transition-all">⟶</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pillar 3: Sculpted & Resort */}
                    <div className="space-y-3.5">
                      <span className="text-[10px] font-mono-luxury text-black/40 uppercase tracking-[0.2em] block font-semibold border-b border-black/10 pb-2">
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
                            className="w-full text-left py-1.5 px-2 hover:bg-neutral-100 transition-colors flex items-center justify-between group"
                          >
                            <span className="font-sans-luxury text-[12px] text-noir/85 group-hover:text-black group-hover:font-semibold">
                              {cat.label}
                            </span>
                            <span className="text-[10px] text-black/30 group-hover:text-black group-hover:translate-x-0.5 transition-all">⟶</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footnote with Bespoke Inquiries */}
                  <div className="flex items-center justify-between pt-5 mt-6 border-t border-black/10 text-[11px]">
                    <span className="text-black/55 font-sans-luxury">
                      Abuja Flagship Atelier · Custom Bridal & Occasion Dressing
                    </span>
                    <button
                      onClick={() => {
                        playTactileClick();
                        setIsCategoryDropdownOpen(false);
                        onOpenAppointments();
                      }}
                      className="font-bold text-noir hover:text-[#A67C4A] transition-colors uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <span>Custom Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
              className="hover:text-[#A67C4A] transition-colors py-1 text-black/70 uppercase tracking-wider"
            >
              CUSTOM ORDERS
            </button>
          </nav>
        </div>

        {/* Center: FINALUCHI Brand Mark (Fluidly centered, zero collision on mobile) */}
        <div 
          className="cursor-pointer select-none flex items-center justify-center gap-2 group mx-auto px-2"
          onClick={() => {
            playTactileClick();
            onNavigateHome();
          }}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white p-0.5 border border-black/10 flex items-center justify-center shrink-0">
            <img
              src="/FINALUCHIlogo.jpg"
              alt="Finaluchi Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-sans-luxury text-sm sm:text-xl font-bold tracking-[0.18em] sm:tracking-[0.2em] text-noir uppercase group-hover:opacity-75 transition-opacity truncate max-w-[130px] sm:max-w-none">
            FINALUCHI
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-3 lg:gap-4 text-noir flex-1 lg:flex-initial">
          
          {/* Runway Mode Trigger (desktop only) */}
          <button
            onClick={() => {
              playTactileClick();
              onOpenRunway();
            }}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-noir text-white text-[11px] font-semibold tracking-loose-couture uppercase hover:bg-neutral-800 transition-colors btn-luxury"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>RUNWAY</span>
          </button>

          {/* Search Trigger (desktop only) */}
          <button
            onClick={() => {
              playTactileClick();
              onOpenSearch();
            }}
            className="hidden lg:block p-1.5 hover:text-[#C5A880] transition-colors"
            aria-label="Search Collection"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Client Portal Trigger (desktop only) */}
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

          {/* Saved / Wishlist */}
          <button
            onClick={() => {
              playTactileClick();
              onOpenClientPortal();
            }}
            className="p-1.5 hover:text-[#C5A880] transition-colors relative"
            aria-label="Saved Pieces"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {totalWishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-noir text-white text-[9px] font-mono-luxury font-bold rounded-full flex items-center justify-center">
                {totalWishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Trigger */}
          <button
            onClick={() => {
              playTactileClick();
              openDrawer();
            }}
            className="p-1.5 hover:text-[#C5A880] transition-colors relative"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-noir text-white text-[9px] font-mono-luxury font-bold rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Haute Couture Mobile Slide-Over Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-full max-w-[340px] bg-white text-black shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-left duration-300 font-sans-luxury">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-black/10 flex items-center justify-between">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  playTactileClick();
                  onNavigateHome();
                  setIsMobileMenuOpen(false);
                }}
              >
                <div className="w-6 h-6 bg-white p-0.5 border border-black/10 flex items-center justify-center">
                  <img src="/FINALUCHIlogo.jpg" alt="Finaluchi" className="w-full h-full object-contain" />
                </div>
                <span className="font-sans-luxury text-sm font-bold tracking-[0.2em] text-noir uppercase">
                  FINALUCHI
                </span>
              </div>

              <button
                onClick={() => {
                  playTactileClick();
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 -mr-2 text-black/60 hover:text-black transition-colors"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
              
              {/* Primary Links */}
              <nav className="space-y-4">
                
                {/* Collapsible Categories Section */}
                <div>
                  <button
                    onClick={() => {
                      playTactileClick();
                      setIsMobileCategoriesOpen(!isMobileCategoriesOpen);
                    }}
                    className="w-full flex items-center justify-between text-base font-bold uppercase tracking-wider text-noir py-1"
                  >
                    <span>COLLECTIONS</span>
                    <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${isMobileCategoriesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isMobileCategoriesOpen && (
                    <div className="mt-2.5 ml-2 pl-3 border-l border-black/10 space-y-2 text-xs uppercase tracking-wider animate-in fade-in duration-200">
                      <button
                        onClick={() => {
                          playTactileClick();
                          onNavigatePillar('ALL');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left py-1 text-black font-bold flex items-center justify-between"
                      >
                        <span>All Collections</span>
                        <ArrowRight className="w-3 h-3 text-black/40" />
                      </button>

                      {CATEGORY_DEPARTMENTS.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            playTactileClick();
                            onNavigatePillar(cat.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full text-left py-1 text-black/70 hover:text-black transition-colors flex items-center justify-between"
                        >
                          <span>{cat.label}</span>
                          <span className="text-[10px] text-black/30">⟶</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    playTactileClick();
                    onOpenAppointments();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-base font-bold uppercase tracking-wider text-noir py-1 hover:text-[#A67C4A] transition-colors"
                >
                  CUSTOM ORDERS
                </button>

                <button
                  onClick={() => {
                    playTactileClick();
                    onOpenRunway();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between text-base font-bold uppercase tracking-wider text-noir py-1 hover:text-[#A67C4A] transition-colors"
                >
                  <span>RUNWAY MODE</span>
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                </button>

                <button
                  onClick={() => {
                    playTactileClick();
                    onOpenClientPortal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between text-base font-bold uppercase tracking-wider text-noir py-1 hover:text-[#A67C4A] transition-colors"
                >
                  <span>SAVED PIECES</span>
                  <span className="text-xs font-mono-luxury font-bold bg-black text-white px-2 py-0.5 rounded-full">
                    {totalWishlistCount}
                  </span>
                </button>

                <button
                  onClick={() => {
                    playTactileClick();
                    onOpenClientPortal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-base font-bold uppercase tracking-wider text-noir py-1 hover:text-[#A67C4A] transition-colors"
                >
                  CLIENT PORTAL
                </button>

                {onOpenAbout && (
                  <button
                    onClick={() => {
                      playTactileClick();
                      onOpenAbout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-sm font-semibold uppercase tracking-wider text-black/65 hover:text-black py-1 transition-colors"
                  >
                    ABOUT FINALUCHI
                  </button>
                )}

                {onOpenContact && (
                  <button
                    onClick={() => {
                      playTactileClick();
                      onOpenContact();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-sm font-semibold uppercase tracking-wider text-black/65 hover:text-black py-1 transition-colors"
                  >
                    CONTACT & ATELIER
                  </button>
                )}

              </nav>

            </div>

            {/* Pinned Bottom Drawer Bar */}
            <div className="p-5 border-t border-black/10 space-y-3 bg-[#FAFAFA]">
              <a
                href={buildWhatsAppUrl('Hello Finaluchi Couture, I would like to inquire about ordering a piece.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick()}
                className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>

              <div className="flex items-center justify-between text-[10px] font-mono-luxury text-black/50 uppercase tracking-widest pt-1">
                <span>Abuja Atelier · Nigeria</span>
                <span>Est. 2017</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
