import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { MASTER_CATALOG } from './data/catalog';
import { OccasionType, Product } from './types';
import { useWishlistStore } from './stores/wishlistStore';

// Common Components
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { Preloader } from './components/common/Preloader';

// Homepage Components
import { CampaignHero } from './components/home/CampaignHero';
import { ReadyToWearGrid } from './components/home/ReadyToWearGrid';
import { EditorialStorySection } from './components/home/EditorialStorySection';
import { SeparatesShowcase } from './components/home/SeparatesShowcase';
import { OccasionEditsBar } from './components/home/OccasionEditsBar';
import { DigitalAtelier } from './components/atelier/DigitalAtelier';

// Lazy Loaded Heavy Modals and Views for Optimal Production Performance
const RunwayModeModal = React.lazy(() => import('./components/runway/RunwayModeModal').then(m => ({ default: m.RunwayModeModal })));
const AdminPage = React.lazy(() => import('./components/admin/AdminPage').then(m => ({ default: m.AdminPage })));

// Page Views
import { CatalogPage } from './components/catalog/CatalogPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CartDrawer } from './components/checkout/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { PaystackPaymentModal } from './components/checkout/PaystackPaymentModal';
import { OrderTrackerPage } from './components/post-purchase/OrderTrackerPage';
import { ClientPortalPage } from './components/client/ClientPortalPage';
import { BespokeAppointmentModal } from './components/client/BespokeAppointmentModal';
import { ContactModal } from './components/common/ContactModal';
import { AboutModal } from './components/common/AboutModal';
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
            <CatalogPage
              products={MASTER_CATALOG}
              initialPillar={catalogPillar}
              initialOccasion={catalogOccasion}
              onSelectProduct={handleSelectProduct}
            />
          </div>
        )}

        {/* VIEW 3: PRODUCT DETAIL INTELLIGENCE (PDP) */}
        {currentView === 'PRODUCT' && selectedProduct && (
          <div className="animate-in fade-in duration-300">
            <ProductDetailPage
              product={selectedProduct}
              allProducts={MASTER_CATALOG}
              onSelectProduct={handleSelectProduct}
              onBackToCatalog={() => handleNavigatePillar(selectedProduct.pillar)}
              onBookAppointment={() => setIsAppointmentModalOpen(true)}
            />
          </div>
        )}

        {/* VIEW 4: POST-PURCHASE CRAFT JOURNEY TRACKER */}
        {currentView === 'TRACKER' && (
          <div className="animate-in fade-in duration-300">
            <OrderTrackerPage
              initialOrderNumber={trackerOrderNumber}
              onExploreCatalog={() => setCurrentView('CATALOG')}
            />
          </div>
        )}

        {/* VIEW 5: PRIVATE CLIENT PORTAL & DIGITAL WARDROBE */}
        {currentView === 'CLIENT' && (
          <div className="animate-in fade-in duration-300">
            <ClientPortalPage
              products={MASTER_CATALOG}
              onSelectProduct={handleSelectProduct}
              onBookAppointment={() => setIsAppointmentModalOpen(true)}
            />
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

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onExploreCatalog={() => {
          setCatalogPillar('ALL');
          setCurrentView('CATALOG');
        }}
      />

      {/* Fast Guest Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onPaymentInitiated={handlePaymentInitiated}
      />

      {/* Paystack Payment Modal */}
      <PaystackPaymentModal
        isOpen={isPaystackOpen}
        onClose={() => setIsPaystackOpen(false)}
        orderId={pendingPaymentOrderId}
        totalKobo={pendingPaymentTotalKobo}
        customerEmail={pendingPaymentEmail}
      />

      {/* Runway Mode Catwalk Modal */}
      {isRunwayOpen && (
        <React.Suspense fallback={null}>
          <RunwayModeModal
            isOpen={isRunwayOpen}
            onClose={() => setIsRunwayOpen(false)}
            products={MASTER_CATALOG}
            onSelectProduct={handleSelectProduct}
          />
        </React.Suspense>
      )}

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={MASTER_CATALOG}
        onSelectProduct={handleSelectProduct}
      />

      {/* Bespoke Private Appointment Modal */}
      <BespokeAppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />

      {/* Private Client Concierge / Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onOpenAppointments={() => {
          setIsContactOpen(false);
          setIsAppointmentModalOpen(true);
        }}
      />

      {/* Maison Heritage & Craftsmanship / About Modal */}
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

      {/* WhatsApp Floating Concierge Widget */}
      <WhatsAppWidget />

    </div>
  );
};
