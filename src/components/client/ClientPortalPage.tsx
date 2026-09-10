import React, { useState } from 'react';
import { 
  User, Sparkles, Calendar, Lock, QrCode, 
  Trash2, Plus, Share2 
} from 'lucide-react';
import { Product } from '../../types';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useOrderStore } from '../../stores/orderStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatPriceWithDisplay } from '../../utils/formatters';
import { useCurrencyStore } from '../../stores/currencyStore';
import { CertificateModal } from '../post-purchase/CertificateModal';
import { toast } from 'sonner';

interface ClientPortalPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onBookAppointment: () => void;
}

export const ClientPortalPage: React.FC<ClientPortalPageProps> = ({
  products,
  onSelectProduct,
  onBookAppointment,
}) => {
  const [activeTab, setActiveTab] = useState<'WARDROBE' | 'EDITS' | 'PASSPORT' | 'APPOINTMENTS'>('WARDROBE');
  const [selectedCertSerial, setSelectedCertSerial] = useState<string | null>(null);

  const { savedEdits, createEdit, removeEdit, getShareableLink } = useWishlistStore();
  const { certificates, appointments, getCertificateBySerial } = useOrderStore();
  const { displayCurrency } = useCurrencyStore();
  const { playTactileClick } = useAudioStore();

  const activeCert = selectedCertSerial ? getCertificateBySerial(selectedCertSerial) : null;

  // Mock encrypted anatomical passport data (Blueprint Section 9.2)
  const measurements = {
    bustCm: 88,
    waistCm: 68,
    highHipCm: 90,
    fullHipCm: 96,
    shoulderWidthCm: 39,
    napeToWaistCm: 41,
    inseamCm: 82,
    armLengthCm: 59,
    lastCalibratedDate: '2026-06-14',
    leadArtisan: 'Master Tailor Adebayo',
  };

  const handleShareEdit = (editId: string) => {
    playTactileClick();
    const url = getShareableLink(editId);
    navigator.clipboard.writeText(url);
    toast.success('Curated Capsule Edit link copied to clipboard.');
  };

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen text-[#000000] font-sans-luxury pb-24">
      
      {/* Top Banner */}
      <div className="bg-[#000000] text-white py-12 sm:py-14 px-4 sm:px-8 lg:px-12 border-b border-white/15">
        <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#C5A880] text-xs font-mono-luxury tracking-[0.25em] uppercase font-semibold">
              <User className="w-4 h-4 text-[#C5A880]" />
              <span>FINALUCHI PRIVATE CLIENT SUITE</span>
            </div>
            <h1 className="font-sans-luxury text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              Client Suite & Digital Wardrobe
            </h1>
            <p className="text-xs text-white/70 font-light max-w-lg leading-relaxed">
              Manage your authenticated couture wardrobe, bespoke anatomical measurements passport, and curated capsule edits.
            </p>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onBookAppointment();
            }}
            className="w-full md:w-auto px-7 py-3.5 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-neutral-200 transition-all rounded-none flex items-center justify-center gap-2 shrink-0 border border-white"
          >
            <Calendar className="w-4 h-4" />
            <span>BOOK PRIVATE ATELIER FITTING</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-black/10 pb-4 mb-8 overflow-x-auto text-xs font-semibold tracking-couture uppercase">
          {[
            { id: 'WARDROBE', label: `Digital Wardrobe (${certificates.length})` },
            { id: 'EDITS', label: `My Curated Edits (${savedEdits.length})` },
            { id: 'PASSPORT', label: 'Bespoke Fit Passport' },
            { id: 'APPOINTMENTS', label: `Atelier Fittings (${appointments.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playTactileClick();
                setActiveTab(tab.id as any);
              }}
              className={`px-4 py-2.5 rounded-none whitespace-nowrap transition-colors border ${
                activeTab === tab.id
                  ? 'bg-[#000000] text-white border-[#000000] font-bold'
                  : 'bg-[#FAFAFA] text-black/70 hover:text-black border-black/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content: DIGITAL WARDROBE (Registered Pieces & Certificates) */}
        {activeTab === 'WARDROBE' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-sans-luxury text-xl font-bold text-black uppercase tracking-tight">
                  Authenticated Wardrobe Archive
                </h3>
                <p className="text-xs text-muted font-light">
                  Garments registered under your name with cryptographic provenance and care certificates.
                </p>
              </div>
            </div>

            {certificates.length === 0 ? (
              <div className="py-16 text-center bg-[#FAFAFA] border border-black/10 rounded-none space-y-2">
                <Sparkles className="w-8 h-8 text-[#C5A880] mx-auto" />
                <h4 className="font-sans-luxury text-base font-semibold uppercase tracking-wide">No Registered Pieces Yet</h4>
                <p className="text-xs text-muted">Complete an order to generate your first Digital Certificate of Authenticity.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.serialNumber}
                    className="bg-[#FFFFFF] border border-black/10 hover:border-black rounded-none p-6 space-y-4 flex flex-col justify-between transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono-luxury text-[#C5A880] uppercase tracking-wider">
                        <span>{cert.collectionName || cert.collection}</span>
                        <span className="font-bold text-black">{cert.serialNumber}</span>
                      </div>
                      <h4 className="font-sans-luxury text-lg font-bold text-black uppercase tracking-tight">
                        {cert.productName || cert.pieceName}
                      </h4>
                      <p className="text-xs text-muted font-mono-luxury">
                        Color: {cert.colorwayName || 'Noir Onyx Silk'} • Commissioned: {cert.issueDate || cert.registrationDate}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                      <span className="text-[11px] font-mono-luxury text-muted">
                        Artisan: {cert.leadArtisan || cert.masterTailor}
                      </span>
                      <button
                        onClick={() => {
                          playTactileClick();
                          setSelectedCertSerial(cert.serialNumber);
                        }}
                        className="px-3.5 py-2 bg-[#000000] text-white text-xs font-semibold tracking-couture uppercase rounded-none hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>VIEW CERTIFICATE</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: SAVED EDITS (Wishlist Capsules) */}
        {activeTab === 'EDITS' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-sans-luxury text-xl font-bold text-black uppercase tracking-tight">
                  Curated Capsule Edits
                </h3>
                <p className="text-xs text-muted font-light">
                  Custom collections organized for weddings, galas, vacations, or seasonal planning.
                </p>
              </div>

              <button
                onClick={() => {
                  const title = prompt('Enter Capsule Name (e.g. December Wedding Guest Edit):');
                  if (title) {
                    createEdit(title, 'Custom curated pieces for upcoming gala occasion.');
                    toast.success(`Capsule "${title}" created.`);
                  }
                }}
                className="px-4 py-2.5 bg-[#000000] text-white text-xs font-semibold tracking-couture uppercase rounded-none hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>CREATE NEW CAPSULE</span>
              </button>
            </div>

            <div className="space-y-8">
              {savedEdits.map((edit) => {
                const editProducts = products.filter((p) => edit.productIds.includes(p.id));

                return (
                  <div key={edit.id} className="bg-[#FFFFFF] border border-black/10 p-6 rounded-none space-y-4">
                    <div className="flex items-center justify-between border-b border-black/10 pb-3">
                      <div>
                        <h4 className="font-sans-luxury text-lg font-bold text-black uppercase tracking-tight">
                          {edit.title || edit.name} ({editProducts.length} Pieces)
                        </h4>
                        <p className="text-xs text-muted font-light">{edit.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleShareEdit(edit.id)}
                          className="px-3 py-1.5 bg-[#FAFAFA] text-black text-xs font-semibold tracking-couture uppercase rounded-none hover:bg-black hover:text-white transition-colors border border-black/10 flex items-center gap-1"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>SHARE EDIT</span>
                        </button>

                        {edit.id !== 'edit-default' && (
                          <button
                            onClick={() => {
                              playTactileClick();
                              removeEdit(edit.id);
                            }}
                            className="p-1.5 text-muted hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {editProducts.length === 0 ? (
                      <p className="text-xs text-muted italic py-4">No pieces saved in this capsule yet.</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {editProducts.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => {
                              playTactileClick();
                              onSelectProduct(p);
                            }}
                            className="group cursor-pointer bg-[#FAFAFA] border border-black/10 hover:border-black rounded-none p-3 transition-colors"
                          >
                            <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-100 rounded-none mb-2">
                              <img
                                src={p.colorways[0].heroImageUrl}
                                alt={p.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <h5 className="font-sans-luxury text-xs font-semibold text-black line-clamp-1 group-hover:text-[#C5A880]">
                              {p.name}
                            </h5>
                            <span className="text-[11px] font-mono-luxury font-semibold text-black block mt-0.5">
                              {formatPriceWithDisplay(p.basePriceKobo, displayCurrency)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Content: FIT PASSPORT (Encrypted Measurements) */}
        {activeTab === 'PASSPORT' && (
          <div className="bg-[#FFFFFF] border border-black/10 p-6 sm:p-8 rounded-none space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-4">
              <div>
                <div className="flex items-center gap-2 text-[#C5A880] text-xs font-mono-luxury tracking-[0.25em] uppercase font-semibold">
                  <Lock className="w-4 h-4 text-[#C5A880]" />
                  <span>256-BIT ENCRYPTED ANATOMICAL PROFILE</span>
                </div>
                <h3 className="font-sans-luxury text-2xl font-bold text-black uppercase tracking-tight">
                  Bespoke Measurements Passport
                </h3>
              </div>

              <span className="text-xs font-mono-luxury text-muted">
                Calibrated by {measurements.leadArtisan} on {measurements.lastCalibratedDate}
              </span>
            </div>

            <p className="text-xs text-muted font-light leading-relaxed max-w-2xl">
              These verified measurements are used to draft individual paper patterns for all Made-to-Measure orders, ensuring sovereign balance without restriction.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono-luxury">
              <div className="p-4 bg-[#FAFAFA] border border-black/10 rounded-none">
                <span className="text-[10px] text-muted uppercase block">Bust Circumference</span>
                <span className="text-lg font-bold text-black">{measurements.bustCm} cm</span>
              </div>
              <div className="p-4 bg-[#FAFAFA] border border-black/10 rounded-none">
                <span className="text-[10px] text-muted uppercase block">Natural Waist</span>
                <span className="text-lg font-bold text-black">{measurements.waistCm} cm</span>
              </div>
              <div className="p-4 bg-[#FAFAFA] border border-black/10 rounded-none">
                <span className="text-[10px] text-muted uppercase block">High Hip</span>
                <span className="text-lg font-bold text-black">{measurements.highHipCm} cm</span>
              </div>
              <div className="p-4 bg-[#FAFAFA] border border-black/10 rounded-none">
                <span className="text-[10px] text-muted uppercase block">Full Hip</span>
                <span className="text-lg font-bold text-black">{measurements.fullHipCm} cm</span>
              </div>
              <div className="p-4 bg-[#FAFAFA] border border-black/10 rounded-none">
                <span className="text-[10px] text-muted uppercase block">Shoulder Width</span>
                <span className="text-lg font-bold text-black">{measurements.shoulderWidthCm} cm</span>
              </div>
              <div className="p-4 bg-[#FAFAFA] border border-black/10 rounded-none">
                <span className="text-[10px] text-muted uppercase block">Nape to Waist</span>
                <span className="text-lg font-bold text-black">{measurements.napeToWaistCm} cm</span>
              </div>
              <div className="p-4 bg-[#FAFAFA] border border-black/10 rounded-none">
                <span className="text-[10px] text-muted uppercase block">Inseam</span>
                <span className="text-lg font-bold text-black">{measurements.inseamCm} cm</span>
              </div>
              <div className="p-4 bg-[#FAFAFA] border border-black/10 rounded-none">
                <span className="text-[10px] text-muted uppercase block">Arm Length</span>
                <span className="text-lg font-bold text-black">{measurements.armLengthCm} cm</span>
              </div>
            </div>

            <div className="p-6 bg-[#000000] text-white rounded-none flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/15">
              <div className="text-xs space-y-1">
                <div className="font-semibold text-[#C5A880] uppercase tracking-couture">Need to Recalibrate?</div>
                <div className="text-white/80 font-light">Book an in-person fitting session at our Lagos Flagship or schedule a virtual video measurement.</div>
              </div>
              <button
                onClick={() => {
                  playTactileClick();
                  onBookAppointment();
                }}
                className="px-5 py-2.5 bg-white text-black text-xs font-bold tracking-couture uppercase rounded-none hover:bg-neutral-200 transition-colors whitespace-nowrap"
              >
                REQUEST RE-MEASUREMENT
              </button>
            </div>
          </div>
        )}

        {/* Tab Content: APPOINTMENTS */}
        {activeTab === 'APPOINTMENTS' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-sans-luxury text-xl font-bold text-black uppercase tracking-tight">
                  Private Atelier Appointments
                </h3>
                <p className="text-xs text-muted font-light">
                  Scheduled private fittings, consultations, and VIP previews.
                </p>
              </div>

              <button
                onClick={() => {
                  playTactileClick();
                  onBookAppointment();
                }}
                className="px-4 py-2.5 bg-[#000000] text-white text-xs font-semibold tracking-couture uppercase rounded-none hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>BOOK NEW SESSION</span>
              </button>
            </div>

            <div className="space-y-4">
              {appointments.map((apt) => (
                <div key={apt.id} className="bg-[#FFFFFF] border border-black/10 p-6 rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono-luxury text-[#C5A880] uppercase font-bold tracking-wider">
                        {(apt.appointmentType || apt.serviceType || 'ATELIER_FITTING').replace(/_/g, ' ')}
                      </span>
                      <span className="px-2 py-0.5 bg-black/5 text-black text-[10px] font-mono-luxury font-semibold uppercase rounded-none border border-black/10">
                        {apt.status}
                      </span>
                    </div>
                    <h4 className="font-sans-luxury text-lg font-bold text-black uppercase tracking-tight">
                      {apt.date} at {apt.timeSlot}
                    </h4>
                    <p className="text-xs text-muted font-mono-luxury">
                      Artisan: {apt.assignedArtisan || 'Master Tailor Adebayo'} • Location: {apt.location || 'Finaluchi Flagship Atelier, Lagos'}
                    </p>
                    {apt.notes && (
                      <p className="text-xs text-black/80 italic pt-1">
                        Notes: "{apt.notes}"
                      </p>
                    )}
                  </div>

                  <span className="text-xs font-mono-luxury text-muted">
                    Ref: {apt.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Certificate Modal */}
      {activeCert && (
        <CertificateModal
          isOpen={!!activeCert}
          onClose={() => setSelectedCertSerial(null)}
          certificate={activeCert}
        />
      )}

    </div>
  );
};
