import React from 'react';
import { X, Sparkles, Scissors, Compass, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { useAudioStore } from '../../stores/audioStore';
import { BRAND } from '../../data/brand';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

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
              <span>FINALUCHI COUTURE · ABUJA</span>
            </div>
            <h2 className="font-sans-luxury text-xl sm:text-2xl font-bold tracking-tight text-white uppercase mt-0.5">
              The Finaluchi Heritage & Vision
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
              src="/images/campaign/craft-flatlay.jpeg"
              alt="Finaluchi Couture design and garment detail"
              className="w-full h-full object-cover object-[center_35%] brightness-90 contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/30 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
              <span className="text-[10px] font-mono-luxury uppercase tracking-widest text-[#C5A880]">Abuja, Nigeria · Creative Lead: Oluchi Irokanulo (Since Oct 2017)</span>
              <h3 className="font-sans-luxury text-base sm:text-xl font-bold uppercase tracking-tight text-white mt-0.5">
                Bold Nigerian Occasion Wear with an Architectural Silhouette
              </h3>
            </div>
          </div>

          {/* Core Brand Narrative */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-noir/80">
            <div className="space-y-3">
              <h4 className="font-bold text-noir uppercase tracking-tight text-sm flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#A67C4A]" />
                <span>Original Nigerian Occasion Wear</span>
              </h4>
              <p>
                Finaluchi Couture (FLC) is an established Abuja-based fashion house rather than a clothing reseller. We design and hand-tailor women&apos;s haute couture, ready-to-wear, asoebi, event dresses, and both traditional and white wedding gowns.
              </p>
              <p>
                Our signature aesthetic is unapologetically bold and glamorous: precision corsetry, intricate embellishments, sculpted silhouettes, dramatic sleeves, and sweeping trains built for unforgettable entrance moments.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-noir uppercase tracking-tight text-sm flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#A67C4A]" />
                <span>Creative Direction</span>
              </h4>
              <p>
                Oluchi Irokanulo has served as Fashion Director and Creative Designer at Finaluchi Couture since October 2017, steering the brand&apos;s distinctive structural identity and luxurious drape.
              </p>
              <p>
                Guided by the ethos “a global fashion brand inspired by the power of togetherness,” FLC builds lasting client relationships across Nigeria and the global diaspora.
              </p>
            </div>
          </div>

          {/* Public Track Record & Milestones */}
          <div className="space-y-3 p-4 sm:p-5 bg-[#FAFAFA] border border-black/10 rounded-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-noir">
              <Award className="w-4 h-4 text-[#A67C4A]" />
              <span>Public History & Editorial Features</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="border-l-2 border-[#A67C4A] pl-3 space-y-0.5">
                <span className="text-[10px] font-mono-luxury font-bold text-black uppercase">BellaNaija AsoEbi Feature (2020)</span>
                <p className="text-[11px] text-black/70">Celebrated for statement asoebi and grand reception looks with sculptured bustiers.</p>
              </div>
              <div className="border-l-2 border-[#A67C4A] pl-3 space-y-0.5">
                <span className="text-[10px] font-mono-luxury font-bold text-black uppercase">Legit.ng Fashion Feature (2022)</span>
                <p className="text-[11px] text-black/70">Recognised for distinct tailoring cuts, vibrant textiles, and red-carpet glam.</p>
              </div>
              <div className="border-l-2 border-[#A67C4A] pl-3 space-y-0.5">
                <span className="text-[10px] font-mono-luxury font-bold text-black uppercase">Abuja Fairs & Lekki Pop-up</span>
                <p className="text-[11px] text-black/70">Participated in major Abuja exhibitions and hosted an exclusive Lagos pop-up in Lekki Phase 1.</p>
              </div>
              <div className="border-l-2 border-[#A67C4A] pl-3 space-y-0.5">
                <span className="text-[10px] font-mono-luxury font-bold text-black uppercase">Active Collections (2026)</span>
                <p className="text-[11px] text-black/70">Active releases and bespoke bridal orders showcased continuously on social and digital channels.</p>
              </div>
            </div>
          </div>

          {/* The FLC Brand Family */}
          <div className="space-y-3">
            <h4 className="font-bold text-noir uppercase tracking-tight text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A67C4A]" />
              <span>The FLC Brand Universes</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {BRAND.lines.map((line) => (
                <a
                  key={line.handle}
                  href={line.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white border border-black/10 hover:border-black rounded-xs transition-all group block"
                >
                  <div className="flex items-center justify-between text-[#A67C4A] mb-1">
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-mono-luxury uppercase tracking-wider group-hover:text-black">Visit</span>
                  </div>
                  <div className="font-bold text-[11px] text-black uppercase">{line.name}</div>
                  <div className="text-[10px] font-mono-luxury text-black/60">{line.handle}</div>
                  <p className="text-[10px] text-black/70 mt-1 leading-tight">{line.description}</p>
                </a>
              ))}
            </div>
          </div>

          {/* 5-Point Buyer Protection & Conversion Protocol */}
          <div className="p-5 bg-[#000000] text-white border border-white/20 rounded-xs space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              <ShieldCheck className="w-4 h-4" />
              <span>High-Confidence Ordering Protocol</span>
            </div>
            <p className="text-[11px] text-white/80 leading-relaxed font-light">
              To ensure complete transparency and peace of mind before placing your order, we adhere to a 5-point protection standard:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-[11px]">
              {BRAND.buyerProtectionGuide.map((step) => (
                <div key={step.step} className="p-2.5 bg-white/5 border border-white/10 rounded-xs space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5 uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span>{step.step}. {step.title}</span>
                  </div>
                  <p className="text-[10px] text-white/70 leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
            <div className="text-[10px] font-mono-luxury text-muted">
              {BRAND.positioning}
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
                  Request a Custom Order
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

