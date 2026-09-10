import React from 'react';
import { useAudioStore } from '../../stores/audioStore';

interface EditorialStorySectionProps {
  onExploreCollection: () => void;
  onExploreAtelier: () => void;
  onNavigatePillar?: (pillar: string) => void;
}

export const EditorialStorySection: React.FC<EditorialStorySectionProps> = ({
  onExploreCollection,
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
            New Collections
          </h2>

          <button
            onClick={() => {
              playTactileClick();
              onExploreCollection();
            }}
            className="text-[11px] sm:text-xs font-sans font-medium tracking-[0.15em] text-noir/50 hover:text-noir transition-colors uppercase"
          >
            View All
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
                A stoical elegance, you might call it. Black asymmetric dresses blowing voluminously in the sovereign wind.
              </p>
              <p className="font-sans text-xs sm:text-[13px] text-noir/45 leading-[1.75] font-normal">
                Oversized hybrids of ceremonial regalia and padded outerwear; double-faced wool crepe jackets and liquid mulberry silks tailored singularly on granite tables.
              </p>

              {/* Category Links — quiet, understated */}
              <div className="pt-4 flex flex-wrap gap-x-5 gap-y-2">
                {[
                  { label: 'Gala Gowns', pillar: 'DINNER_DRESSES' },
                  { label: 'Pagoda Jackets', pillar: 'JACKETS' },
                  { label: 'Palazzo Pants', pillar: 'PANTS' },
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

              {/* Testimonial — stripped to essence */}
              <div className="pt-6 mt-2 border-t border-black/[0.06]">
                <p className="text-[13px] italic text-noir/70 leading-relaxed font-light">
                  "The drape of the mulberry silk is peerless."
                </p>
                <span className="text-[10px] font-sans text-noir/30 uppercase tracking-[0.15em] block mt-2">
                  Private Client, Lagos
                </span>
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
