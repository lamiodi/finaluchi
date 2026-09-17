import React from 'react';
import { useAudioStore } from '../../stores/audioStore';
import { ArrowRight } from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../../data/brand';

interface EditorialStorySectionProps {
  onExploreCollection: () => void;
  onExploreAtelier: () => void;
  onNavigatePillar?: (pillar: string) => void;
}

export const EditorialStorySection: React.FC<EditorialStorySectionProps> = ({
  onExploreCollection,
  onExploreAtelier,
  onNavigatePillar,
}) => {
  const { playTactileClick } = useAudioStore();

  const handleCategoryJump = (pillar: string) => {
    playTactileClick();
    if (onNavigatePillar) {
      onNavigatePillar(pillar);
    } else {
      onExploreCollection();
    }
  };

  const handleCustomOrderWhatsApp = () => {
    playTactileClick();
    const message =
      'Hello Finaluchi Couture, I would like to plan a custom occasion piece. Please share details on measurement confirmation, invoice, delivery timeline and alteration terms.';
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="w-full bg-white py-20 sm:py-32 border-b border-black/10">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16 pb-4 border-b border-black/10">
          <div>
            <span className="text-[10px] sm:text-xs font-mono-luxury uppercase tracking-[0.25em] text-[#A67C4A] font-semibold block mb-1">
              Editorial Heritage · Abuja, Nigeria
            </span>
            <h2 className="font-sans-luxury text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-noir uppercase">
              Designed & Tailored for the Nigerian Occasion
            </h2>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onExploreCollection();
            }}
            className="text-xs font-sans font-semibold tracking-wider text-noir/70 hover:text-noir transition-colors uppercase flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Monumental Portrait */}
          <div
            className="lg:col-span-7 group cursor-pointer"
            onClick={() => onExploreCollection()}
          >
            <div className="aspect-[3/4.2] w-full overflow-hidden bg-neutral-100">
              <img
                src="/images/.webp"
                alt="Finaluchi Couture Evening Look"
                className="w-full h-full object-cover object-[center_8%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>
            
            {/* Minimal Editorial Caption */}
            <div className="mt-3.5 flex items-baseline justify-between text-xs font-mono-luxury border-b border-black/10 pb-2">
              <span className="font-semibold text-black uppercase tracking-wider">
                Monumental Evening Silhouette
              </span>
              <span className="text-neutral-500 text-[11px]">
                Hand-cut in Abuja Atelier
              </span>
            </div>
          </div>

          {/* Right Column: Narrative & Heritage */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full gap-8">
            
            <div className="space-y-6">
              <p className="font-sans text-sm sm:text-[15px] text-noir leading-[1.8] font-normal">
                Finaluchi Couture (FLC) is an authentic Abuja-based Nigerian fashion house. Led creatively by Fashion Director <strong className="font-semibold text-black">Oluchi Irokanulo</strong> since October 2017, the house designs and crafts original occasion wear for milestone celebrations.
              </p>
              
              <p className="font-sans text-xs sm:text-[13px] text-noir/70 leading-[1.8] font-normal">
                Our silhouettes balance contemporary elegance with meticulous couture construction: internal corsetry, crystal beadwork, sculpted shoulders, and sweeping bridal trains—spanning women&apos;s couture, asoebi, event dressing, and bridal creations.
              </p>

              {/* Minimalist Typographic Milestones */}
              <div className="pt-4 border-t border-black/10 space-y-4">
                <span className="text-[10px] font-mono-luxury uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold block">
                  Heritage Milestones
                </span>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono-luxury font-bold text-black block tracking-wider">2017 · ATELIER</span>
                    <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                      Founded in Abuja under the creative lead of Oluchi Irokanulo.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono-luxury font-bold text-black block tracking-wider">2020 · BELLANAIJA</span>
                    <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                      Featured in a landmark AsoEbi editorial spotlight.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono-luxury font-bold text-black block tracking-wider">2022 · PRESS</span>
                    <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                      Recognized for red-carpet and milestone occasion dressing.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono-luxury font-bold text-black block tracking-wider">2026 · HORIZONS</span>
                    <p className="text-[11px] text-neutral-600 font-light leading-relaxed">
                      Bridal and couture evening collections debuting through the season.
                    </p>
                  </div>
                </div>
              </div>

              {/* Minimalist Consultation Action */}
              <div className="pt-4 border-t border-black/10 space-y-3">
                <button
                  onClick={handleCustomOrderWhatsApp}
                  className="w-full py-4 bg-black text-white text-xs font-sans-luxury font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all flex items-center justify-center gap-2.5"
                >
                  <span>Inquire on WhatsApp ({BRAND.whatsappDisplay})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <p className="text-[10px] font-mono-luxury text-neutral-500 text-center tracking-wider uppercase">
                  Written invoice • Delivery date agreement • Verified payments
                </p>
              </div>

              {/* Category Quick Jumps */}
              <div className="pt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-black/10 text-xs">
                {[
                  { label: 'Dinner Dresses', pillar: 'DINNER_DRESSES' },
                  { label: '2-Piece Sets', pillar: '2PIECES' },
                  { label: 'Kimonos & Robes', pillar: 'KIMONO' },
                  { label: 'Tailored Jackets', pillar: 'JACKETS' },
                ].map(({ label, pillar }) => (
                  <button
                    key={pillar}
                    onClick={() => handleCategoryJump(pillar)}
                    className="text-[11px] font-mono-luxury font-medium tracking-wider text-neutral-500 hover:text-black transition-colors uppercase"
                  >
                    {label} ⟶
                  </button>
                ))}
              </div>

            </div>

            {/* Secondary Image: Atelier Floor */}
            <div
              className="overflow-hidden group cursor-pointer mt-2"
              onClick={() => onExploreAtelier()}
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                <img
                  src="/images/.webp"
                  alt="Finaluchi Couture Atelier in Abuja"
                  className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-2 text-[10px] font-mono-luxury text-neutral-500 uppercase tracking-widest">
                Abuja Flagship Craft Floor
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
