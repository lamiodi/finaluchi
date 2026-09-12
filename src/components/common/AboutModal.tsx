import React from 'react';
import { X, Sparkles, Scissors, Compass, MapPin, Users, MessageCircle } from 'lucide-react';
import { useAudioStore } from '../../stores/audioStore';
import { BRAND } from '../../data/brand';

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
              Designed for the Moment
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
              alt="Finaluchi Couture design and garment detail"
              className="w-full h-full object-cover object-[center_35%] brightness-90 contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/30 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
              <span className="text-[10px] font-mono-luxury uppercase tracking-widest text-[#C5A880]">Abuja, Nigeria · Creative direction since 2017</span>
              <h3 className="font-sans-luxury text-base sm:text-xl font-bold uppercase tracking-tight text-white mt-0.5">
                Bold Nigerian Occasion Wear with a Distinct Point of View
              </h3>
            </div>
          </div>

          {/* Core Story */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-noir/80">
            <div className="space-y-3">
              <h4 className="font-bold text-noir uppercase tracking-tight text-sm flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#A67C4A]" />
                <span>The Finaluchi Point of View</span>
              </h4>
              <p>
                Finaluchi Couture is an Abuja-based Nigerian fashion brand that designs and produces women&apos;s couture, ready-to-wear, asoebi and event dresses. Its visual signature is bold and glamorous: corsetry, embellishment, sculpted silhouettes, dramatic sleeves and trains.
              </p>
              <p>
                The wider FLC family also includes bridal collections through @flcbridals, menswear through @flcmen and lifestyle or collection pieces through @togetherbyflc.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-noir uppercase tracking-tight text-sm flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#A67C4A]" />
                <span>Creative Direction</span>
              </h4>
              <p>
                Oluchi Irokanulo is publicly listed as Fashion Director and Creative Designer at Finaluchi Couture from 2017, connecting the collections through a clear creative voice.
              </p>
              <p>
                The brand describes itself as “a global fashion brand inspired by the power of togetherness”—an idea reflected across the main line and its specialist collections.
              </p>
            </div>
          </div>

          {/* Three Pillars of Excellence */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 bg-white border border-border rounded-xs space-y-1.5 shadow-xs">
              <div className="w-8 h-8 rounded-xs bg-[#000000] text-[#C5A880] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="font-bold uppercase text-[11px] text-noir tracking-tight">Abuja-Based Design</div>
              <p className="text-[10px] text-muted leading-relaxed">A Nigerian fashion house creating original occasion, ready-to-wear and custom pieces.</p>
            </div>

            <div className="p-4 bg-white border border-border rounded-xs space-y-1.5 shadow-xs">
              <div className="w-8 h-8 rounded-xs bg-[#000000] text-[#C5A880] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div className="font-bold uppercase text-[11px] text-noir tracking-tight">A Full Occasion Wardrobe</div>
              <p className="text-[10px] text-muted leading-relaxed">Women&apos;s couture, bridal, menswear and lifestyle collections across the FLC family.</p>
            </div>

            <div className="p-4 bg-white border border-border rounded-xs space-y-1.5 shadow-xs">
              <div className="w-8 h-8 rounded-xs bg-[#000000] text-[#C5A880] flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="font-bold uppercase text-[11px] text-noir tracking-tight">Direct Order Support</div>
              <p className="text-[10px] text-muted leading-relaxed">Discuss sizing, event dates and custom requirements with the team on WhatsApp.</p>
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
