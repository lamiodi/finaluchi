import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { MASTER_CATALOG } from './data/catalog';
import { OccasionType, Product } from './types';
import { useWishlistStore } from './stores/wishlistStore';

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
const AboutModal = React.lazy(() => import('./components/common/AboutModal').then(m => ({ default: m.AboutModal })));
const SearchModal = React.lazy(() => import('./components/common/SearchModal').then(m => ({ default: m.SearchModal })));
import { WhatsAppWidget } from './components/common/WhatsAppWidget';

type ViewMode = 'HOME' | 'CATALOG' | 'PRODUCT' | 'TRACKER' | 'CLIENT' | 'ADMIN';

export const App: React.FC = () => {
  // Routing State
  const [currentView, setCurrentView] = useState<ViewMode>('HOME');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [catalogPillar, setCatalogPillar] = useState<string>('ALL');
  const [catalogOccasion, setCatalogOccasion] = useState<OccasionType | undefined>(undefined);
  const [trackerOrderNumber, setTrackerOrderNumber] = useState<string>('');

  // Modal States
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isRunwayOpen, setIsRunwayOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isPaystackOpen, setIsPaystackOpen] = useState<boolean>(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  // Paystack checkout transaction context
  const [pendingPaymentOrderId, setPendingPaymentOrderId] = useState<string>('');
  const [pendingPaymentTotalKobo, setPendingPaymentTotalKobo] = useState<number>(0);
  const [pendingPaymentEmail, setPendingPaymentEmail] = useState<string>('');

  const { savedEdits } = useWishlistStore();

  const totalSavedCount = savedEdits.reduce((acc, e) => acc + e.productIds.length, 0);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProduct]);

  // Handlers
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('PRODUCT');
  };

  const handleNavigatePillar = (pillar: string) => {
    setCatalogPillar(pillar);
    setCatalogOccasion(undefined);
    setCurrentView('CATALOG');
  };

  const handlePaymentInitiated = (orderId: string, totalKobo: number, customerEmail: string) => {
    setPendingPaymentOrderId(orderId);
    setPendingPaymentTotalKobo(totalKobo);
    setPendingPaymentEmail(customerEmail);
    setIsCheckoutOpen(false);
    setIsPaystackOpen(true);
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
      setTimeout(() => {
        const el = document.getElementById('digital-atelier-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (view === 'client') {
      setCurrentView('CLIENT');
    } else if (view === 'admin') {
      setCurrentView('ADMIN');
    } else {
      setCurrentView('HOME');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#000000] flex flex-col justify-between selection:bg-[#000000] selection:text-[#FFFFFF]">
      
      {/* Maison Introductory Preloader */}
      <Preloader />

      {/* Sonner Toast Notification Center */}
      <Toaster 
        position="top-right" 
        richColors 
        toastOptions={{
          style: {
            fontFamily: 'Plus Jakarta Sans, sans-serif',
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
          onOpenAbout={() => setIsAboutOpen(true)}
        />
        
        <Navbar
          onNavigateHome={() => setCurrentView('HOME')}
          onNavigateCatalog={() => handleNavigatePillar('ALL')}
          onNavigatePillar={handleNavigatePillar}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenRunway={() => setIsRunwayOpen(true)}
          onOpenClientPortal={() => setCurrentView('CLIENT')}
          onOpenAppointments={() => setIsAppointmentModalOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
          totalWishlistCount={totalSavedCount}
        />
      </div>

      {/* Dynamic Viewport Stage */}
      <main className="flex-1 overflow-x-clip w-full max-w-full">
        
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

            <OccasionEditsBar onSelectCategory={handleNavigatePillar} onSelectOccasion={handleNavigatePillar} />

            <ReadyToWearGrid
              products={MASTER_CATALOG}
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
            <React.Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-mono-luxury text-xs text-[#C5A880]">Loading Catalog...</div>}>
              <CatalogPage
                products={MASTER_CATALOG}
                initialPillar={catalogPillar}
                initialOccasion={catalogOccasion}
                onSelectProduct={handleSelectProduct}
              />
            </React.Suspense>
          </div>
        )}

        {/* VIEW 3: PRODUCT DETAIL INTELLIGENCE (PDP) */}
        {currentView === 'PRODUCT' && selectedProduct && (
          <div className="animate-in fade-in duration-300">
            <React.Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-mono-luxury text-xs text-[#C5A880]">Loading Garment Intelligence...</div>}>
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
            <React.Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-mono-luxury text-xs text-[#C5A880]">Loading Order Tracker...</div>}>
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
            <React.Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-mono-luxury text-xs text-[#C5A880]">Loading Client Portal...</div>}>
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

      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleFooterNavigate}
        onOpenAppointments={() => setIsAppointmentModalOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
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

        {/* Maison Heritage & Craftsmanship / About Modal */}
        {isAboutOpen && (
          <AboutModal
            isOpen={isAboutOpen}
            onClose={() => setIsAboutOpen(false)}
            onOpenAppointments={() => {
              setIsAboutOpen(false);
              setIsAppointmentModalOpen(true);
            }}
            onExploreCollections={() => {
              setIsAboutOpen(false);
              handleNavigatePillar('ALL');
            }}
          />
        )}
      </React.Suspense>

      {/* WhatsApp Floating Concierge Widget */}
      <WhatsAppWidget />

    </div>
  );
};
