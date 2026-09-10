import React from 'react';
import { X, Sparkles, Award, Scissors, Compass, ShieldCheck, Heart } from 'lucide-react';
import { useAudioStore } from '../../stores/audioStore';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAppointments?: () => void;
  onExploreCollections?: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenAppointments,
  onExploreCollections,
}) => {
  const { playTactileClick } = useAudioStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[850] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-sans-luxury">
      <div className="bg-[#FFFFFF] text-noir w-full max-w-3xl border border-black/15 rounded-xs shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#000000] text-white border-b border-white/10 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-[#C5A880] text-xs font-mono-luxury tracking-loose-couture uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MAISON FINALUCHI COUTURE</span>
            </div>
            <h2 className="font-sans-luxury text-xl sm:text-2xl font-bold tracking-tight text-white uppercase mt-0.5">
              The Architecture of Sovereign Beauty
            </h2>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className="p-1.5 text-white/60 hover:text-white transition-colors"
            aria-label="Close About Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-8 text-xs leading-relaxed text-noir/85">
          
          {/* Hero Banner inside About Modal */}
          <div className="relative rounded-xs overflow-hidden aspect-[16/7] sm:aspect-[21/8] bg-noir">
            <img
              src="/images/fc_atelier_craft.jpg"
              alt="Finaluchi Master Artisans in Lagos Atelier"
              className="w-full h-full object-cover object-[center_35%] brightness-90 contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/30 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
              <span className="text-[10px] font-mono-luxury uppercase tracking-widest text-[#C5A880]">Lagos Flagship Atelier · Founded 2021</span>
              <h3 className="font-sans-luxury text-base sm:text-xl font-bold uppercase tracking-tight text-white mt-0.5">
                Ancestral Craftsmanship Meets Monumental Modernism
              </h3>
            </div>
          </div>

          {/* Core Story */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-noir/80">
            <div className="space-y-3">
              <h4 className="font-bold text-noir uppercase tracking-tight text-sm flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#A67C4A]" />
                <span>The Vision & Provenance</span>
              </h4>
              <p>
                Finaluchi Couture was conceived as an uncompromising tribute to African regal heritage, structural geometry, and contemporary haute couture. Founded in Lagos, the house drafts every garment across 48 distinct anatomical coordinates to guarantee effortless sovereign posture.
              </p>
              <p>
                From hand-loomed raw silk dupioni and 28-momme mulberry silk satin to hand-gilded embroidery and virgin wool crepe, our textile palette is chosen for longevity, sculptural drape, and tactile purity.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-noir uppercase tracking-tight text-sm flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#A67C4A]" />
                <span>The 48-Point Anatomical Cut</span>
              </h4>
              <p>
                Unlike commercial mass tailoring, every Finaluchi pattern is cut individually on chilled granite drafting tables. We balance the tensile weight of multi-layered capes, corsetry boning, and peplum cascades so that weight distributes weightlessly across the human frame.
              </p>
              <p>
                Each creation requires between 40 to 180 hours of meticulous hand-finishing by master tailors in our Victoria Island flagship suite.
              </p>
            </div>
          </div>

          {/* Three Pillars of Excellence */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 bg-white border border-border rounded-xs space-y-1.5 shadow-xs">
              <div className="w-8 h-8 rounded-xs bg-[#000000] text-[#C5A880] flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <div className="font-bold uppercase text-[11px] text-noir tracking-tight">100% Purity Textiles</div>
              <p className="text-[10px] text-muted leading-relaxed">Mulberry silks, virgin wool crepe, metallic brocades, and genuine silk organza.</p>
            </div>

            <div className="p-4 bg-white border border-border rounded-xs space-y-1.5 shadow-xs">
              <div className="w-8 h-8 rounded-xs bg-[#000000] text-[#C5A880] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="font-bold uppercase text-[11px] text-noir tracking-tight">Cryptographic Serial</div>
              <p className="text-[10px] text-muted leading-relaxed">Each piece is assigned an individual serial passport verifying provenance.</p>
            </div>

            <div className="p-4 bg-white border border-border rounded-xs space-y-1.5 shadow-xs">
              <div className="w-8 h-8 rounded-xs bg-[#000000] text-[#C5A880] flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              <div className="font-bold uppercase text-[11px] text-noir tracking-tight">Private Atelier Fittings</div>
              <p className="text-[10px] text-muted leading-relaxed">White-glove bespoke appointments in Lagos, London, or private residences.</p>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
            <div className="text-[10px] font-mono-luxury text-muted">
              Master Digital Flagship • Finaluchi Couture Limited
            </div>

            <div className="flex items-center gap-3">
              {onExploreCollections && (
                <button
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    onClose();
                    onExploreCollections();
                  }}
                  className="px-4 py-2 bg-white border border-noir text-noir text-xs font-bold uppercase tracking-couture rounded-xs hover:bg-neutral-100 transition-colors"
                >
                  Explore Collections
                </button>
              )}

              {onOpenAppointments && (
                <button
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    onClose();
                    onOpenAppointments();
                  }}
                  className="px-5 py-2 bg-noir text-white text-xs font-bold uppercase tracking-couture rounded-xs hover:bg-neutral-800 transition-colors btn-luxury"
                >
                  Book Atelier Fitting
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
