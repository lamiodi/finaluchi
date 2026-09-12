import React from 'react';
import { useAudioStore } from '../../stores/audioStore';

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

  return (
    <section className="w-full bg-white py-20 sm:py-32">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header — clean line, no decoration */}
        <div className="flex items-end justify-between mb-12 sm:mb-16">
          <h2 className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-noir uppercase">
            Made for celebrations
          </h2>

          <button
            onClick={() => {
              playTactileClick();
              onExploreCollection();
            }}
            className="text-[11px] sm:text-xs font-sans font-medium tracking-[0.15em] text-noir/50 hover:text-noir transition-colors uppercase"
          >
            Shop All
          </button>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* Left Column: Monumental Portrait */}
          <div
            className="lg:col-span-7 overflow-hidden group cursor-pointer"
            onClick={() => onExploreCollection()}
          >
            <div className="aspect-[3/4.2] w-full overflow-hidden">
              <img
                src="/images/fc_editorial_monument.jpg"
                alt="Finaluchi Couture Monumental Look"
                className="w-full h-full object-cover object-[center_8%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>

          {/* Right Column: Copy + Secondary Image */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full gap-10 lg:gap-14 lg:pt-8">
            
            {/* Story */}
            <div className="max-w-sm space-y-5">
              <p className="font-sans text-sm sm:text-[15px] text-noir leading-[1.7] font-normal">
                Finaluchi Couture is an Abuja-based Nigerian fashion brand creating women&apos;s couture and ready-to-wear for the moments that matter.
              </p>
              <p className="font-sans text-xs sm:text-[13px] text-noir/45 leading-[1.75] font-normal">
                Explore asoebi, event dresses, traditional and white-wedding looks, plus bold collection pieces shaped with corsets, embellishment, sculpted silhouettes, dramatic sleeves and trains.
              </p>

              {/* Category Links — quiet, understated */}
              <div className="pt-4 flex flex-wrap gap-x-5 gap-y-2">
                {[
                  { label: 'Event Dresses', pillar: 'DINNER_DRESSES' },
                  { label: 'Tailored Jackets', pillar: 'JACKETS' },
                  { label: 'Pants & Palazzo', pillar: 'PANTS' },
                ].map(({ label, pillar }) => (
                  <button
                    key={pillar}
                    onClick={() => handleCategoryJump(pillar)}
                    className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.15em] text-noir/40 hover:text-noir transition-colors uppercase"
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Public creative direction */}
              <div className="pt-6 mt-2 border-t border-black/[0.06]">
                <p className="text-[13px] text-noir/70 leading-relaxed font-light">
                  Creative direction by Oluchi Irokanulo, publicly listed as Finaluchi Couture&apos;s Fashion Director and Creative Designer since 2017.
                </p>
                <button
                  onClick={() => {
                    playTactileClick();
                    onExploreAtelier();
                  }}
                  className="mt-4 text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.15em] text-noir hover:text-[#A67C4A] transition-colors uppercase underline underline-offset-4"
                >
                  Plan a custom look
                </button>
              </div>
            </div>

            {/* Secondary Image — borderless, clean */}
            <div
              className="overflow-hidden group cursor-pointer"
              onClick={() => onExploreCollection()}
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/images/fc_atelier_craft.jpg"
                  alt="Finaluchi Couture Atelier Craftsmanship"
                  className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
