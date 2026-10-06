import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { MASTER_CATALOG, getProductBySlug } from './data/catalog';
import { OccasionType, Product } from './types';
import { useWishlistStore } from './stores/wishlistStore';
import { PolicyId } from './data/policies';
import { scrollToTop, scrollToElement } from './utils/motion';

// Common Components
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Preloader } from './components/common/Preloader';

// Homepage Components
import { CampaignHero } from './components/home/CampaignHero';
import { ReadyToWearGrid } from './components/home/ReadyToWearGrid';
import { EditorialStorySection } from './components/home/EditorialStorySection';
import { SeparatesShowcase } from './components/home/SeparatesShowcase';
import { OccasionEditsBar } from './components/home/OccasionEditsBar';
import { CategoryTiles } from './components/home/CategoryTiles';
import { DigitalAtelier } from './components/atelier/DigitalAtelier';

// Lazy Loaded Modals, Pages and Views for Instant Initial Paint & Minimal JS Payload
const RunwayModeModal = React.lazy(() => import('./components/runway/RunwayModeModal').then(m => ({ default: m.RunwayModeModal })));
const AdminPage = React.lazy(() => import('./components/admin/AdminPage').then(m => ({ default: m.AdminPage })));
const CatalogPage = React.lazy(() => import('./components/catalog/CatalogPage').then(m => ({ default: m.CatalogPage })));
const ProductDetailPage = React.lazy(() => import('./components/product/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const CartDrawer = React.lazy(() => import('./components/checkout/CartDrawer').then(m => ({ default: m.CartDrawer })));
const CheckoutModal = React.lazy(() => import('./components/checkout/CheckoutModal').then(m => ({ default: m.CheckoutModal })));
const PaystackPaymentModal = React.lazy(() => import('./components/checkout/PaystackPaymentModal').then(m => ({ default: m.PaystackPaymentModal })));
const OrderTrackerPage = React.lazy(() => import('./components/post-purchase/OrderTrackerPage').then(m => ({ default: m.OrderTrackerPage })));
const ClientPortalPage = React.lazy(() => import('./components/client/ClientPortalPage').then(m => ({ default: m.ClientPortalPage })));
const BespokeAppointmentModal = React.lazy(() => import('./components/client/BespokeAppointmentModal').then(m => ({ default: m.BespokeAppointmentModal })));
const ContactModal = React.lazy(() => import('./components/common/ContactModal').then(m => ({ default: m.ContactModal })));
const AboutPage = React.lazy(() => import('./components/common/AboutPage').then(m => ({ default: m.AboutPage })));
const SearchModal = React.lazy(() => import('./components/common/SearchModal').then(m => ({ default: m.SearchModal })));
const LegalPage = React.lazy(() => import('./components/common/LegalPage').then(m => ({ default: m.LegalPage })));
const FaqPage = React.lazy(() => import('./components/common/FaqPage').then(m => ({ default: m.FaqPage })));
import { WelcomeModal } from './components/common/WelcomeModal';

type ViewMode = 'HOME' | 'CATALOG' | 'PRODUCT' | 'TRACKER' | 'CLIENT' | 'ADMIN' | 'LEGAL' | 'FAQ' | 'ABOUT';

interface HashRoute {
  view: ViewMode;
  policy: PolicyId;
  productSlug?: string;
  catalogPillar?: string;
}

// 'DINNER_DRESSES' <-> 'dinner-dresses' keeps pillar URLs readable
const pillarToSlug = (pillar: string): string => pillar.toLowerCase().replace(/_/g, '-');
const slugToPillar = (slug: string): string => slug.toUpperCase().replace(/-/g, '_');

// Hash deep links (shareable, e.g. https://finaluchi.com/#/privacy or #/product/the-rossa-dress)
function hashToRoute(hash: string): HashRoute | null {
  const segments = hash.replace(/^#\/?/, '').toLowerCase().split('/');
  const head = segments[0];
  const tail = segments.length > 1 ? segments[1] : '';
  switch (head) {
    case 'privacy': return { view: 'LEGAL', policy: 'privacy' };
    case 'terms': return { view: 'LEGAL', policy: 'terms' };
    case 'returns': return { view: 'LEGAL', policy: 'returns' };
    case 'shipping': return { view: 'LEGAL', policy: 'shipping' };
    case 'faq': return { view: 'FAQ', policy: 'privacy' };
    case 'about': return { view: 'ABOUT', policy: 'privacy' };
    case 'tracker': return { view: 'TRACKER', policy: 'privacy' };
    case 'admin': return { view: 'ADMIN', policy: 'privacy' };
    case 'client': return { view: 'CLIENT', policy: 'privacy' };
    case 'catalog': return { view: 'CATALOG', policy: 'privacy', catalogPillar: tail ? slugToPillar(tail) : 'ALL' };
    case 'product': return tail ? { view: 'PRODUCT', policy: 'privacy', productSlug: tail } : null;
    default: return null;
  }
}

export const App: React.FC = () => {
  // Routing State — resolved from the URL hash before first paint so a refresh
  // (or a shared link) restores the page it names.
  const [boot] = useState(() => {
    const route = hashToRoute(window.location.hash);
    const product = route?.productSlug ? getProductBySlug(route.productSlug) ?? null : null;
    // A product slug that no longer resolves can't render the PDP — fall back home.
    const view: ViewMode = route && !(route.view === 'PRODUCT' && !product) ? route.view : 'HOME';
    const pillar = route?.catalogPillar ?? 'ALL';
    // An unknown pillar would render an empty grid — degrade to the full catalog.
    const knownPillar = pillar === 'ALL' || MASTER_CATALOG.some((p) => p.pillar === pillar);
    return {
      view,
      product,
      pillar: knownPillar ? pillar : 'ALL',
      policy: route?.policy ?? 'privacy',
    };
  });
  const [currentView, setCurrentView] = useState<ViewMode>(boot.view);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(boot.product);
  const [catalogPillar, setCatalogPillar] = useState<string>(boot.pillar);
  const [catalogOccasion, setCatalogOccasion] = useState<OccasionType | undefined>(undefined);
  // Collection chips are a filter (like occasion/palette), not an address —
  // they stay out of the hash on purpose.
  const [catalogCollection, setCatalogCollection] = useState<string>('ALL');
  const [trackerOrderNumber, setTrackerOrderNumber] = useState<string>('');
  const [legalPolicy, setLegalPolicy] = useState<PolicyId>('privacy');

  // Modal States
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isRunwayOpen, setIsRunwayOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isPaystackOpen, setIsPaystackOpen] = useState<boolean>(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState<boolean>(false);

  // Paystack checkout transaction context
  const [pendingPaymentOrderId, setPendingPaymentOrderId] = useState<string>('');
  const [pendingPaymentTotalKobo, setPendingPaymentTotalKobo] = useState<number>(0);
  const [pendingPaymentEmail, setPendingPaymentEmail] = useState<string>('');

  const { savedEdits } = useWishlistStore();

  const totalSavedCount = savedEdits.reduce((acc, e) => acc + e.productIds.length, 0);

  // Scroll to top on view changes
  useEffect(() => {
    scrollToTop();
  }, [currentView, selectedProduct]);

  // The maison's welcome card — offered once per session, and only when
  // the visitor actually lands on the home stage.
  useEffect(() => {
    if (currentView !== 'HOME') return;
    try {
      if (sessionStorage.getItem('flc-welcome-seen') === '1') return;
    } catch {
      return;
    }
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem('flc-welcome-seen', '1');
      } catch {
        /* private mode — the card simply shows again next visit */
      }
      setIsWelcomeOpen(true);
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [currentView]);

  // Keep the URL hash in sync with the active view without polluting history —
  // every view must be addressable or a refresh drops the visitor back home.
  useEffect(() => {
    const next =
      currentView === 'LEGAL' ? `#/${legalPolicy}` :
      currentView === 'FAQ' ? '#/faq' :
      currentView === 'TRACKER' ? '#/tracker' :
      currentView === 'ADMIN' ? '#/admin' :
      currentView === 'CLIENT' ? '#/client' :
      currentView === 'ABOUT' ? '#/about' :
      currentView === 'CATALOG' ? `#/catalog${catalogPillar !== 'ALL' ? `/${pillarToSlug(catalogPillar)}` : ''}` :
      currentView === 'PRODUCT' && selectedProduct ? `#/product/${selectedProduct.slug}` :
      '#/';
    if (window.location.hash === next) return;
    if (next === '#/' && window.location.hash === '') return;
    history.replaceState(null, '', next === '#/' ? `${window.location.pathname}${window.location.search}` : next);
  }, [currentView, legalPolicy, selectedProduct, catalogPillar]);

  // Back/forward navigation between hash routes
  useEffect(() => {
    const onHashChange = () => {
      // In-page anchors (e.g. the skip link's #main-content) are not routes.
      if (!window.location.hash.startsWith('#/')) return;
      const route = hashToRoute(window.location.hash);
      if (route) {
        setCurrentView(route.view);
        if (route.view === 'LEGAL') setLegalPolicy(route.policy);
      } else {
        setCurrentView('HOME');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Handlers
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('PRODUCT');
  };

  const handleNavigatePillar = (pillar: string) => {
    setCatalogPillar(pillar);
    setCatalogOccasion(undefined);
    setCatalogCollection('ALL');
    setCurrentView('CATALOG');
  };

  const handleNavigateCollection = (collectionId: string) => {
    setCatalogPillar('ALL');
    setCatalogOccasion(undefined);
    setCatalogCollection(collectionId);
    setCurrentView('CATALOG');
  };

  const handlePaymentInitiated = (orderId: string, totalKobo: number, customerEmail: string) => {
    setPendingPaymentOrderId(orderId);
    setPendingPaymentTotalKobo(totalKobo);
    setPendingPaymentEmail(customerEmail);
    setIsCheckoutOpen(false);
    setIsPaystackOpen(true);
  };

  const handlePaymentComplete = (orderNumber: string) => {
    setTrackerOrderNumber(orderNumber);
    setIsPaystackOpen(false);
    setCurrentView('TRACKER');
  };

  const handleOpenPolicy = (policy: PolicyId) => {
    setLegalPolicy(policy);
    setCurrentView('LEGAL');
  };

  const handleFooterNavigate = (view: string, payload?: any) => {
    if (view === 'tracker') {
      if (payload?.querySerial) {
        setTrackerOrderNumber(payload.querySerial);
      }
      setCurrentView('TRACKER');
    } else if (view === 'catalog') {
      setCatalogPillar(payload?.pillar || 'ALL');
      setCurrentView('CATALOG');
    } else if (view === 'atelier') {
      setCurrentView('HOME');
      setTimeout(() => scrollToElement('digital-atelier-section'), 100);
    } else if (view === 'client') {
      setCurrentView('CLIENT');
    } else if (view === 'admin') {
      setCurrentView('ADMIN');
    } else if (view === 'legal') {
      handleOpenPolicy((payload?.policy as PolicyId) || 'privacy');
    } else if (view === 'faq') {
      setCurrentView('FAQ');
    } else {
      setCurrentView('HOME');
    }
  };

  return (
    <div className="min-h-screen bg-white text-noir flex flex-col justify-between selection:bg-noir selection:text-white">

      {/* Keyboard users jump straight past announcement bar + navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[99999] focus:bg-noir focus:text-white focus:px-4 focus:py-2.5 focus:text-[11px] focus:font-mono-luxury focus:uppercase focus:tracking-widest"
      >
        Skip to Content
      </a>

      {/* Maison Introductory Preloader */}
      <Preloader />

      {/* Sonner Toast Notification Center */}
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          style: {
            fontFamily: "'DM Sans', sans-serif",
            borderRadius: '0px',
            border: '1px solid rgba(0, 0, 0, 0.2)',
          }
        }}
      />

      {/* Top Header & Announcement Bar */}
      <div>
        <AnnouncementBar 
          onOpenAppointments={() => setIsAppointmentModalOpen(true)} 
          onOpenContact={() => setIsContactOpen(true)}
          onOpenAbout={() => setCurrentView('ABOUT')}
        />
        
        <Navbar
          onNavigateHome={() => setCurrentView('HOME')}
          onNavigateCatalog={() => handleNavigatePillar('ALL')}
          onNavigatePillar={handleNavigatePillar}
          onNavigateCollection={handleNavigateCollection}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenRunway={() => setIsRunwayOpen(true)}
          onOpenClientPortal={() => setCurrentView('CLIENT')}
          onOpenAppointments={() => setIsAppointmentModalOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenAbout={() => setCurrentView('ABOUT')}
          totalWishlistCount={totalSavedCount}
        />
      </div>

      {/* Dynamic Viewport Stage */}
      <main id="main-content" tabIndex={-1} className="flex-1 overflow-x-clip w-full max-w-full outline-none">
        
        {/* VIEW 1: BALENCIAGA LUXURY EDITORIAL HOMEPAGE */}
        {currentView === 'HOME' && (
          <div className="animate-in fade-in duration-300">
            <CampaignHero
              onShopNow={() => handleNavigatePillar('ALL')}
              onExploreAtelier={() => {
                const el = document.getElementById('digital-atelier-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <OccasionEditsBar onSelectCategory={handleNavigatePillar} onSelectOccasion={handleNavigatePillar} onSelectProduct={handleSelectProduct} />

            <CategoryTiles products={MASTER_CATALOG} onSelectPillar={handleNavigatePillar} />

            <ReadyToWearGrid
              // Home capsule shows photographed pieces only — unphotographed
              // drops stay in the catalog until their photos land (isFeatured).
              products={MASTER_CATALOG.filter((p) => p.isFeatured)}
              onSelectProduct={handleSelectProduct}
              onSeeMore={() => handleNavigatePillar('ALL')}
            />

            <EditorialStorySection
              onExploreCollection={() => handleNavigatePillar('DINNER_DRESSES')}
              onNavigatePillar={handleNavigatePillar}
              onExploreAtelier={() => {
                const el = document.getElementById('digital-atelier-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <SeparatesShowcase
              products={MASTER_CATALOG}
              onSelectProduct={handleSelectProduct}
              onSeeMore={(tab) => handleNavigatePillar(tab || '2PIECES')}
            />

            <div id="digital-atelier-section">
              <DigitalAtelier onBookFitting={() => setIsAppointmentModalOpen(true)} />
            </div>
          </div>
        )}

        {/* VIEW 2: BOTTEGA DYNAMIC MASONRY CATALOG (PLP) */}
        {currentView === 'CATALOG' && (
          <div className="animate-in fade-in duration-300">
            <React.Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-mono-luxury text-xs text-bronze-deep">Loading Catalog...</div>}>
              <CatalogPage
                products={MASTER_CATALOG}
                initialPillar={catalogPillar}
                initialOccasion={catalogOccasion}
                initialCollection={catalogCollection}
                onSelectProduct={handleSelectProduct}
              />
            </React.Suspense>
          </div>
        )}

        {/* VIEW 3: PRODUCT DETAIL INTELLIGENCE (PDP) */}
        {currentView === 'PRODUCT' && selectedProduct && (
          <div className="animate-in fade-in duration-300">
            <React.Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-mono-luxury text-xs text-bronze-deep">Loading Garment Intelligence...</div>}>
              <ProductDetailPage
                key={selectedProduct.id}
                product={selectedProduct}
                allProducts={MASTER_CATALOG}
                onSelectProduct={handleSelectProduct}
                onBackToCatalog={() => handleNavigatePillar(selectedProduct.pillar)}
                onBookAppointment={() => setIsAppointmentModalOpen(true)}
              />
            </React.Suspense>
          </div>
        )}

        {/* VIEW 4: POST-PURCHASE CRAFT JOURNEY TRACKER */}
        {currentView === 'TRACKER' && (
          <div className="animate-in fade-in duration-300">
            <React.Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-mono-luxury text-xs text-bronze-deep">Loading Order Tracker...</div>}>
              <OrderTrackerPage
                initialOrderNumber={trackerOrderNumber}
                onExploreCatalog={() => setCurrentView('CATALOG')}
              />
            </React.Suspense>
          </div>
        )}

        {/* VIEW 5: PRIVATE CLIENT PORTAL & DIGITAL WARDROBE */}
        {currentView === 'CLIENT' && (
          <div className="animate-in fade-in duration-300">
            <React.Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-mono-luxury text-xs text-bronze-deep">Loading Client Portal...</div>}>
              <ClientPortalPage
                products={MASTER_CATALOG}
                onSelectProduct={handleSelectProduct}
                onBookAppointment={() => setIsAppointmentModalOpen(true)}
              />
            </React.Suspense>
          </div>
        )}

        {/* VIEW 6: ATELIER OPERATIONS DESK & CRM */}
        {currentView === 'ADMIN' && (
          <div className="animate-in fade-in duration-300">
            <React.Suspense fallback={<div className="min-h-screen bg-black text-white p-8 flex items-center justify-center font-mono-luxury text-xs">Loading Atelier Ops...</div>}>
              <AdminPage />
            </React.Suspense>
          </div>
        )}

        {/* VIEW 7: LEGAL & COMPLIANCE PAGES (NDPR / Terms / Returns / Shipping) */}
        {currentView === 'LEGAL' && (
          <div className="animate-in fade-in duration-300">
            <React.Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-mono-luxury text-xs text-bronze-deep">Loading Policy...</div>}>
              <LegalPage
                policyId={legalPolicy}
                onSelectPolicy={handleOpenPolicy}
                onOpenFaq={() => setCurrentView('FAQ')}
                onBackHome={() => setCurrentView('HOME')}
              />
            </React.Suspense>
          </div>
        )}

        {/* VIEW 8: FREQUENTLY ASKED QUESTIONS */}
        {currentView === 'FAQ' && (
          <div className="animate-in fade-in duration-300">
            <React.Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-mono-luxury text-xs text-bronze-deep">Loading FAQ...</div>}>
              <FaqPage onBackHome={() => setCurrentView('HOME')} />
            </React.Suspense>
          </div>
        )}

        {/* VIEW 9: THE MAISON — ABOUT THE HOUSE (#/about) */}
        {currentView === 'ABOUT' && (
          <div className="animate-in fade-in duration-300">
            <React.Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-mono-luxury text-xs text-bronze-deep">Loading the Maison...</div>}>
              <AboutPage
                onExploreCollection={() => handleNavigatePillar('ALL')}
                onOpenAppointments={() => setIsAppointmentModalOpen(true)}
              />
            </React.Suspense>
          </div>
        )}

      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleFooterNavigate}
        onOpenAppointments={() => setIsAppointmentModalOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenAbout={() => setCurrentView('ABOUT')}
      />

      {/* Lazy Loaded Drawers & Modals with Suspense */}
      <React.Suspense fallback={null}>
        {/* Slide-over Cart Drawer */}
        <CartDrawer
          onProceedToCheckout={() => setIsCheckoutOpen(true)}
          onExploreCatalog={() => {
            setCatalogPillar('ALL');
            setCurrentView('CATALOG');
          }}
        />

        {/* Fast Guest Checkout Modal */}
        {isCheckoutOpen && (
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            onPaymentInitiated={handlePaymentInitiated}
          />
        )}

        {/* Paystack Payment Modal */}
        {isPaystackOpen && (
          <PaystackPaymentModal
            isOpen={isPaystackOpen}
            onClose={() => setIsPaystackOpen(false)}
            orderId={pendingPaymentOrderId}
            totalKobo={pendingPaymentTotalKobo}
            customerEmail={pendingPaymentEmail}
            onPaymentComplete={handlePaymentComplete}
          />
        )}

        {/* Runway Mode Catwalk Modal */}
        {isRunwayOpen && (
          <RunwayModeModal
            isOpen={isRunwayOpen}
            onClose={() => setIsRunwayOpen(false)}
            products={MASTER_CATALOG}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {/* Live Search Modal */}
        {isSearchOpen && (
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            products={MASTER_CATALOG}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {/* Bespoke Private Appointment Modal */}
        {isAppointmentModalOpen && (
          <BespokeAppointmentModal
            isOpen={isAppointmentModalOpen}
            onClose={() => setIsAppointmentModalOpen(false)}
          />
        )}

        {/* Private Client Concierge / Contact Modal */}
        {isContactOpen && (
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            onOpenAppointments={() => {
              setIsContactOpen(false);
              setIsAppointmentModalOpen(true);
            }}
          />
        )}
      </React.Suspense>

      {/* Maison welcome card — once per session on the home stage */}
      <WelcomeModal
        isOpen={isWelcomeOpen}
        onClose={() => setIsWelcomeOpen(false)}
        onDiscoverCapsule={() => {
          setIsWelcomeOpen(false);
          // Let the card unmount (and release its scroll lock) first.
          window.setTimeout(() => {
            const el = document.getElementById('the-capsule-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else handleNavigatePillar('ALL');
          }, 120);
        }}
        onBookFitting={() => {
          setIsWelcomeOpen(false);
          setIsAppointmentModalOpen(true);
        }}
      />

    </div>
  );
};
