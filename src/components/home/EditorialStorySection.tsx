import React from 'react';
import { useAudioStore } from '../../stores/audioStore';
import { Sparkles, Award, ShieldCheck, ArrowRight } from 'lucide-react';
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
        <div className="flex items-end justify-between mb-12 sm:mb-16 pb-4 border-b border-black/10">
          <div>
            <span className="text-[10px] sm:text-xs font-mono-luxury uppercase tracking-[0.25em] text-[#A67C4A] font-semibold block mb-1">
              Editorial Heritage · Abuja, Nigeria
            </span>
            <h2 className="font-sans-luxury text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-noir uppercase">
              Designed & Produced for the Nigerian Occasion
            </h2>
          </div>

          <button
            onClick={() => {
              playTactileClick();
              onExploreCollection();
            }}
            className="text-[11px] sm:text-xs font-sans font-semibold tracking-[0.15em] text-noir/60 hover:text-noir transition-colors uppercase flex items-center gap-1.5"
          >
            <span>Explore All 13 Categories</span>
            <span>⟶</span>
          </button>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: Monumental Portrait */}
          <div
            className="lg:col-span-7 overflow-hidden group cursor-pointer relative"
            onClick={() => onExploreCollection()}
          >
            <div className="aspect-[3/4.2] w-full overflow-hidden bg-neutral-100">
              <img
                src="/images/fc_editorial_monument.jpg"
                alt="Finaluchi Couture Monumental Evening Look"
                className="w-full h-full object-cover object-[center_8%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            
            {/* Overlay Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-5 bg-black/85 backdrop-blur-md text-white border border-white/20">
              <div className="flex items-center gap-2 text-[#DFC7AA] text-[10px] font-mono-luxury uppercase tracking-widest font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SIGNATURE OCCASION SILHOUETTES</span>
              </div>
              <p className="text-xs sm:text-sm font-light text-white/90 leading-relaxed">
                Sculpted corsetry, hand-laid embellishments, dramatic architectural sleeves and sweeping trains engineered in our Abuja atelier.
              </p>
            </div>
          </div>

          {/* Right Column: Narrative, Public History & Trust Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full gap-8 lg:gap-10">
            
            {/* Story & Creative Direction */}
            <div className="space-y-5">
              <p className="font-sans text-sm sm:text-[15px] text-noir leading-[1.75] font-normal">
                Finaluchi Couture (FLC) is an authentic Abuja-based Nigerian fashion brand rather than simply a clothing reseller. Led creatively by Fashion Director and Creative Designer <strong className="font-semibold text-black">Oluchi Irokanulo</strong> since October 2017, the house designs and produces original occasion wear for milestone moments.
              </p>
              
              <p className="font-sans text-xs sm:text-[13px] text-noir/65 leading-[1.75] font-normal">
                Our design language balances bold modern glamour with classic couture craft: sculpted internal corsets, intricate crystal beadwork, dramatic sleeves, and floor-sweeping bridal trains—spanning women&apos;s couture, asoebi, event dressing, white and traditional bridal through <span className="font-semibold text-black">@flcbridals</span>, menswear via <span className="font-semibold text-black">@flcmen</span>, and lifestyle pieces through <span className="font-semibold text-black">@togetherbyflc</span>.
              </p>

              {/* Public Track Record Timeline Cards */}
              <div className="pt-2 space-y-2.5">
                <span className="text-[10px] font-mono-luxury uppercase tracking-widest text-[#A67C4A] font-bold block">
                  PUBLIC EDITORIAL HISTORY & POP-UPS
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 bg-[#FAFAFA] border border-black/10 rounded-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-black">
                      <Award className="w-3.5 h-3.5 text-[#A67C4A]" />
                      <span>BellaNaija Feature</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-snug">
                      Celebrated in a landmark 2020 BellaNaija AsoEbi feature for exceptional Nigerian occasion style.
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAFAFA] border border-black/10 rounded-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-black">
                      <Award className="w-3.5 h-3.5 text-[#A67C4A]" />
                      <span>Legit.ng Spotlight</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-snug">
                      Credited in a 2022 Legit.ng fashion feature for high-impact celebrity and red-carpet dressing.
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAFAFA] border border-black/10 rounded-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-black">
                      <Sparkles className="w-3.5 h-3.5 text-[#A67C4A]" />
                      <span>Fairs & Lagos Pop-Up</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-snug">
                      Showcased at premier Abuja trade fairs and hosted an exclusive Lagos pop-up in Lekki Phase 1.
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAFAFA] border border-black/10 rounded-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-black">
                      <Sparkles className="w-3.5 h-3.5 text-[#A67C4A]" />
                      <span>Active Collections 2026</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-snug">
                      Continually releasing new couture, asoebi and bespoke bridal collections through June–July 2026.
                    </p>
                  </div>
                </div>
              </div>

              {/* High-Conversion Buyer Protection Banner */}
              <div className="p-4 bg-black text-white rounded-xs space-y-2 mt-4 border border-black">
                <div className="flex items-center gap-2 text-[#DFC7AA] text-xs font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Transparent Ordering Charter</span>
                </div>
                <p className="text-[11px] text-white/80 leading-relaxed font-light">
                  Before placing your custom order, receive a written invoice, confirmed delivery date, measurement approval, alteration terms and clear refund policy. Pay via traceable corporate channels.
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <button
                    onClick={handleCustomOrderWhatsApp}
                    className="text-xs text-[#DFC7AA] hover:text-white font-bold uppercase tracking-wider flex items-center gap-1 underline underline-offset-4"
                  >
                    <span>Request Custom Quote on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono-luxury text-white/50">{BRAND.whatsappDisplay}</span>
                </div>
              </div>

              {/* Category Quick Jumps */}
              <div className="pt-2 flex flex-wrap gap-x-4 gap-y-2 border-t border-black/10 text-xs">
                {[
                  { label: 'Dinner Dresses & Gowns', pillar: 'DINNER_DRESSES' },
                  { label: '2-Piece Sets', pillar: '2PIECES' },
                  { label: 'Kimonos & Robes', pillar: 'KIMONO' },
                  { label: 'Tailored Jackets', pillar: 'JACKETS' },
                ].map(({ label, pillar }) => (
                  <button
                    key={pillar}
                    onClick={() => handleCategoryJump(pillar)}
                    className="text-[10px] sm:text-[11px] font-mono-luxury font-medium tracking-[0.15em] text-neutral-500 hover:text-black transition-colors uppercase"
                  >
                    {label} ⟶
                  </button>
                ))}
              </div>

            </div>

            {/* Secondary Image */}
            <div
              className="overflow-hidden group cursor-pointer mt-4"
              onClick={() => onExploreAtelier()}
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-100 relative">
                <img
                  src="/images/fc_atelier_craft.jpg"
                  alt="Finaluchi Couture Atelier Craftsmanship in Abuja"
                  className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute bottom-2 left-3 text-[10px] font-mono-luxury text-white/90 bg-black/60 px-2 py-0.5">
                  Abuja Flagship Craft Floor
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
