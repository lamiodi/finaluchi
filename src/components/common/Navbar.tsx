import React, { useState, useEffect } from 'react';
import {
  ShoppingBag, Search, Sparkles, Menu, X,
  ChevronDown, Heart, User, MessageCircle, ArrowRight,
  ArrowUpRight, PhoneCall
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
  onNavigateCatalog,
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  const { items, openDrawer } = useCartStore();
  const { playTactileClick } = useAudioStore();

  const totalCartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Dynamic Scroll Listener with Passive Throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Active preview image in mega menu
  const activePreviewDept = hoveredPillar
    ? CATEGORY_DEPARTMENTS.find((d) => d.id === hoveredPillar)
    : CATEGORY_DEPARTMENTS[0];

  return (
    <header
      className={`sticky top-0 z-50 font-sans-luxury transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-black/[0.08] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]'
          : 'bg-white border-b border-black/[0.08]'
      }`}
    >
      <div
        className={`max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'py-2.5 sm:py-3' : 'py-3.5 sm:py-4.5'
        }`}
      >
        {/* Left: Mobile Menu Trigger + Search (Mobile) | Desktop Navigation (Desktop) */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-8 flex-1 lg:flex-initial">
          
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => {
              playTactileClick();
              setIsMobileMenuOpen(true);
            }}
            className="lg:hidden p-2 -ml-2 text-noir hover:text-[#A67C4A] transition-colors rounded-full hover:bg-neutral-100"
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
            className="lg:hidden p-2 text-noir hover:text-[#A67C4A] transition-colors rounded-full hover:bg-neutral-100"
            aria-label="Search Collection"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-sans-luxury font-medium uppercase tracking-[0.14em] text-noir">
            
            {/* Desktop Collections Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => {
                setIsCategoryDropdownOpen(false);
                setHoveredPillar(null);
              }}
            >
              <button
                onClick={() => {
                  playTactileClick();
                  if (onNavigateCatalog) onNavigateCatalog();
                  else onNavigatePillar('ALL');
                }}
                className={`group flex items-center gap-1.5 py-1.5 transition-colors ${
                  isCategoryDropdownOpen ? 'text-[#A67C4A] font-bold' : 'text-noir hover:text-[#A67C4A]'
                }`}
              >
                <span>COLLECTIONS</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transform transition-transform duration-200 ${
                    isCategoryDropdownOpen ? 'rotate-180 text-[#A67C4A]' : 'text-neutral-400 group-hover:text-noir'
                  }`}
                />
              </button>

              {/* Architectural Haute Couture Mega-Directory */}
              {isCategoryDropdownOpen && (
                <div
                  className="absolute left-0 top-full mt-1.5 w-[880px] bg-white/98 backdrop-blur-2xl border border-black/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] p-7 z-50 animate-in fade-in zoom-in-98 duration-150 rounded-none"
                >
                  {/* Mega Menu Eyebrow Header */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-black/10 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      <span className="text-[10px] font-mono-luxury text-black/60 uppercase tracking-[0.22em] font-medium">
                        The Maison Archive · Women&apos;s Haute Couture
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        playTactileClick();
                        onNavigatePillar('ALL');
                        setIsCategoryDropdownOpen(false);
                      }}
                      className="text-[11px] font-sans-luxury font-bold text-noir hover:text-[#A67C4A] transition-colors uppercase tracking-wider flex items-center gap-1 group"
                    >
                      <span>Explore All Creations</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#A67C4A]" />
                    </button>
                  </div>

                  {/* 4-Column Layout: 3 Pillar Lists + 1 Visual Editorial Spotlight */}
                  <div className="grid grid-cols-12 gap-6 text-xs">
                    
                    {/* Column 1: Tailoring & Sets (3 cols) */}
                    <div className="col-span-3 space-y-3">
                      <span className="text-[10px] font-mono-luxury text-black/40 uppercase tracking-[0.2em] block font-semibold border-b border-black/10 pb-2">
                        Tailoring & Sets
                      </span>
                      <div className="space-y-0.5">
                        {CATEGORY_DEPARTMENTS.filter((d) => d.pillarGroup === 'TAILORING').map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              playTactileClick();
                              onNavigatePillar(cat.id);
                              setIsCategoryDropdownOpen(false);
                            }}
                            onMouseEnter={() => setHoveredPillar(cat.id)}
                            className="w-full text-left py-1.5 px-2 hover:bg-[#F9F8F6] transition-colors flex items-center justify-between group rounded-none"
                          >
                            <span className="font-sans-luxury text-[12px] text-noir/80 group-hover:text-black group-hover:font-semibold">
                              {cat.label}
                            </span>
                            <span className="text-[10px] text-black/20 group-hover:text-[#A67C4A] group-hover:translate-x-0.5 transition-all">
                              ⟶
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Silks & Gowns (3 cols) */}
                    <div className="col-span-3 space-y-3">
                      <span className="text-[10px] font-mono-luxury text-black/40 uppercase tracking-[0.2em] block font-semibold border-b border-black/10 pb-2">
                        Silks & Gowns
                      </span>
                      <div className="space-y-0.5">
                        {CATEGORY_DEPARTMENTS.filter((d) => d.pillarGroup === 'SILKS').map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              playTactileClick();
                              onNavigatePillar(cat.id);
                              setIsCategoryDropdownOpen(false);
                            }}
                            onMouseEnter={() => setHoveredPillar(cat.id)}
                            className="w-full text-left py-1.5 px-2 hover:bg-[#F9F8F6] transition-colors flex items-center justify-between group rounded-none"
                          >
                            <span className="font-sans-luxury text-[12px] text-noir/80 group-hover:text-black group-hover:font-semibold">
                              {cat.label}
                            </span>
                            <span className="text-[10px] text-black/20 group-hover:text-[#A67C4A] group-hover:translate-x-0.5 transition-all">
                              ⟶
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: Sculpted & Resort (3 cols) */}
                    <div className="col-span-3 space-y-3">
                      <span className="text-[10px] font-mono-luxury text-black/40 uppercase tracking-[0.2em] block font-semibold border-b border-black/10 pb-2">
                        Sculpted & Resort
                      </span>
                      <div className="space-y-0.5">
                        {CATEGORY_DEPARTMENTS.filter((d) => d.pillarGroup === 'SPECIALTY').map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              playTactileClick();
                              onNavigatePillar(cat.id);
                              setIsCategoryDropdownOpen(false);
                            }}
                            onMouseEnter={() => setHoveredPillar(cat.id)}
                            className="w-full text-left py-1.5 px-2 hover:bg-[#F9F8F6] transition-colors flex items-center justify-between group rounded-none"
                          >
                            <span className="font-sans-luxury text-[12px] text-noir/80 group-hover:text-black group-hover:font-semibold">
                              {cat.label}
                            </span>
                            <span className="text-[10px] text-black/20 group-hover:text-[#A67C4A] group-hover:translate-x-0.5 transition-all">
                              ⟶
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Column 4: Editorial Spotlight Card (3 cols) */}
                    <div className="col-span-3">
                      <div className="bg-[#F8F7F5] border border-black/10 p-3 h-full flex flex-col justify-between group">
                        <div className="space-y-2.5">
                          <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-200">
                            <img
                              src={activePreviewDept?.image || '/images/fc_haute_soiree_gown.jpg'}
                              alt={activePreviewDept?.label || 'Haute Couture Preview'}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-xs text-white text-[8px] font-mono-luxury px-1.5 py-0.5 uppercase tracking-widest">
                              Spotlight
                            </div>
                          </div>
                          <div>
                            <span className="text-[9px] font-mono-luxury text-[#A67C4A] uppercase tracking-wider block">
                              {activePreviewDept?.pillarLabel || 'Maison Edit'}
                            </span>
                            <h4 className="font-sans-luxury text-xs font-bold uppercase text-noir tracking-tight">
                              {activePreviewDept?.label || 'Sovereign Collection'}
                            </h4>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            playTactileClick();
                            if (activePreviewDept) onNavigatePillar(activePreviewDept.id);
                            setIsCategoryDropdownOpen(false);
                          }}
                          className="w-full mt-3 py-2 bg-black text-white text-[9px] font-sans-luxury font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1"
                        >
                          <span>Explore Category</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Mega Menu Footer with Bespoke Consultation */}
                  <div className="flex items-center justify-between pt-4 mt-5 border-t border-black/10 text-[11px]">
                    <div className="flex items-center gap-2 text-black/60 font-sans-luxury">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Abuja Flagship Atelier · Custom Bridal & Bespoke Occasion Dressing</span>
                    </div>

                    <button
                      onClick={() => {
                        playTactileClick();
                        setIsCategoryDropdownOpen(false);
                        onOpenAppointments();
                      }}
                      className="font-bold text-noir hover:text-[#A67C4A] transition-colors uppercase tracking-wider flex items-center gap-1.5 group"
                    >
                      <span>Private Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#A67C4A]" />
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
                else onOpenAppointments();
              }}
              className="py-1.5 hover:text-[#A67C4A] transition-colors text-black/75 hover:text-black"
            >
              BESPOKE ORDERS
            </button>

            {/* About Finaluchi (if provided) */}
            {onOpenAbout && (
              <button
                onClick={() => {
                  playTactileClick();
                  onOpenAbout();
                }}
                className="py-1.5 text-black/60 hover:text-black transition-colors"
              >
                MAISON
              </button>
            )}

          </nav>
        </div>

        {/* Center: FINALUCHI Brand Crest & Signature Mark */}
        <div
          className="cursor-pointer select-none flex items-center justify-center gap-2 sm:gap-2.5 group mx-auto px-2"
          onClick={() => {
            playTactileClick();
            onNavigateHome();
          }}
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white p-0.5 border border-black/15 group-hover:border-[#C5A880] transition-colors flex items-center justify-center shrink-0 shadow-2xs">
            <img
              src="/FINALUCHIlogo.jpg"
              alt="Finaluchi Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-sans-luxury text-base sm:text-xl font-bold tracking-[0.24em] sm:tracking-[0.28em] text-noir uppercase group-hover:opacity-80 transition-opacity">
            FINALUCHI
          </span>
        </div>

        {/* Right: Actions Dock */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 lg:gap-3.5 text-noir flex-1 lg:flex-initial">
          
          {/* Runway Mode Trigger (Desktop only) */}
          <button
            onClick={() => {
              playTactileClick();
              onOpenRunway();
            }}
            className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-black text-white text-[10px] font-sans-luxury font-bold tracking-[0.2em] uppercase hover:bg-neutral-900 transition-all rounded-none border border-black/20 shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#DFC7AA] animate-pulse" />
            <Sparkles className="w-3 h-3 text-[#DFC7AA]" />
            <span>RUNWAY</span>
          </button>

          {/* Search Button (Desktop) */}
          <button
            onClick={() => {
              playTactileClick();
              onOpenSearch();
            }}
            className="hidden lg:flex p-2 hover:bg-neutral-100 rounded-full hover:text-[#A67C4A] transition-all"
            aria-label="Search Collection"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Client Portal Trigger */}
          <button
            onClick={() => {
              playTactileClick();
              onOpenClientPortal();
            }}
            className="hidden sm:flex p-2 hover:bg-neutral-100 rounded-full hover:text-[#A67C4A] transition-all relative"
            aria-label="Client Portal"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Saved Pieces / Wishlist */}
          <button
            onClick={() => {
              playTactileClick();
              onOpenClientPortal();
            }}
            className="p-2 hover:bg-neutral-100 rounded-full hover:text-[#A67C4A] transition-all relative"
            aria-label="Saved Pieces"
          >
            <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            {totalWishlistCount > 0 && (
              <span className="absolute 0.5 top-0.5 right-0.5 min-w-[16px] h-4 bg-black text-white text-[8.5px] font-mono-luxury font-bold rounded-full flex items-center justify-center px-1 ring-1 ring-white">
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
            className="p-2 hover:bg-neutral-100 rounded-full hover:text-[#A67C4A] transition-all relative"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            {totalCartCount > 0 && (
              <span className="absolute 0.5 top-0.5 right-0.5 min-w-[16px] h-4 bg-black text-white text-[8.5px] font-mono-luxury font-bold rounded-full flex items-center justify-center px-1 ring-1 ring-white">
                {totalCartCount}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Haute Couture Slide-Over Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Frosted Dark Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-full max-w-[340px] bg-white text-black shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-left duration-300 font-sans-luxury">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-black/10 flex items-center justify-between bg-white">
              <div
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => {
                  playTactileClick();
                  onNavigateHome();
                  setIsMobileMenuOpen(false);
                }}
              >
                <div className="w-6 h-6 bg-white p-0.5 border border-black/15 flex items-center justify-center">
                  <img src="/FINALUCHIlogo.jpg" alt="Finaluchi" className="w-full h-full object-contain" />
                </div>
                <span className="font-sans-luxury text-sm font-bold tracking-[0.24em] text-noir uppercase block">
                  FINALUCHI
                </span>
              </div>

              <button
                onClick={() => {
                  playTactileClick();
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 -mr-2 text-black/60 hover:text-black transition-colors rounded-full hover:bg-neutral-100"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
              
              {/* Primary Nav Links */}
              <nav className="space-y-4">
                
                {/* Collapsible Categories Section */}
                <div>
                  <button
                    onClick={() => {
                      playTactileClick();
                      setIsMobileCategoriesOpen(!isMobileCategoriesOpen);
                    }}
                    className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-[0.16em] text-noir py-1.5"
                  >
                    <span>COLLECTIONS</span>
                    <ChevronDown
                      className={`w-4 h-4 transform transition-transform duration-200 ${
                        isMobileCategoriesOpen ? 'rotate-180 text-[#A67C4A]' : 'text-neutral-400'
                      }`}
                    />
                  </button>

                  {isMobileCategoriesOpen && (
                    <div className="mt-2 ml-2 pl-3 border-l border-black/10 space-y-1.5 text-xs uppercase tracking-wider animate-in fade-in duration-200">
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
                  className="w-full text-left text-sm font-bold uppercase tracking-[0.16em] text-noir py-1.5 hover:text-[#A67C4A] transition-colors flex items-center justify-between"
                >
                  <span>BESPOKE APPOINTMENTS</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                <button
                  onClick={() => {
                    playTactileClick();
                    onOpenRunway();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-[0.16em] text-noir py-1.5 hover:text-[#A67C4A] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                    <span>RUNWAY MODE</span>
                  </span>
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                </button>

                <button
                  onClick={() => {
                    playTactileClick();
                    onOpenClientPortal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-[0.16em] text-noir py-1.5 hover:text-[#A67C4A] transition-colors"
                >
                  <span>SAVED PIECES</span>
                  <span className="text-[10px] font-mono-luxury font-bold bg-black text-white px-2 py-0.5 rounded-full">
                    {totalWishlistCount}
                  </span>
                </button>

                <button
                  onClick={() => {
                    playTactileClick();
                    onOpenClientPortal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-sm font-bold uppercase tracking-[0.16em] text-noir py-1.5 hover:text-[#A67C4A] transition-colors"
                >
                  CLIENT PORTAL & ORDERS
                </button>

                {onOpenAbout && (
                  <button
                    onClick={() => {
                      playTactileClick();
                      onOpenAbout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-xs font-semibold uppercase tracking-widest text-black/65 hover:text-black py-1 transition-colors"
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
                    className="w-full text-left text-xs font-semibold uppercase tracking-widest text-black/65 hover:text-black py-1 transition-colors"
                  >
                    CONTACT & ATELIER
                  </button>
                )}

              </nav>

            </div>

            {/* Pinned Bottom Drawer Concierge Bar */}
            <div className="p-5 border-t border-black/10 space-y-3 bg-[#F9F8F6]">
              <a
                href={buildWhatsAppUrl('Hello Finaluchi Couture, I would like to inquire about ordering a piece.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick()}
                className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#DFC7AA]" />
                <span>WhatsApp VIP Concierge</span>
              </a>

              <div className="flex items-center justify-between text-[9px] font-mono-luxury text-black/50 uppercase tracking-widest pt-1">
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
