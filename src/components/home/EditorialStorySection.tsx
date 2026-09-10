import React from 'react';
import { useAudioStore } from '../../stores/audioStore';

interface EditorialStorySectionProps {
  onExploreCollection: () => void;
  onExploreAtelier: () => void;
}

export const EditorialStorySection: React.FC<EditorialStorySectionProps> = ({
  onExploreCollection,
}) => {
  const { playTactileClick } = useAudioStore();

  return (
    <section className="w-full bg-[#FFFFFF] py-14 sm:py-24 border-b border-black/10">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 sm:pb-8 border-b border-black/10 mb-8 sm:mb-10">
          <h2 className="font-sans-luxury text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-noir uppercase leading-[1.08]">
            NEW <span className="inline-block w-14 sm:w-20 h-6 sm:h-8 rounded-full align-middle bg-cover bg-center mx-1.5 border border-black/20 shadow-xs" style={{ backgroundImage: "url('/images/fc_asymmetric_silk_dress.jpg')" }}></span><br />COLLECTIONS & ATELIER
          </h2>

          <button
            onClick={() => {
              playTactileClick();
              onExploreCollection();
            }}
            className="group flex items-center gap-2 text-xs font-sans-luxury font-semibold tracking-loose-couture text-noir hover:opacity-60 transition-opacity self-start sm:self-center uppercase"
          >
            <span>Read Editorial</span>
            <span className="transform group-hover:translate-x-1.5 transition-transform">⟶</span>
          </button>
        </div>

        {/* Asymmetric Editorial Grid (High-Fashion Lookbook Editorial) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: Full-Height Monumental Portrait Image */}
          <div className="lg:col-span-6 overflow-hidden bg-[#FAFAFA] border border-black/10 hover:border-black rounded-xs group cursor-pointer transition-all duration-300" onClick={() => onExploreCollection()}>
            <div className="aspect-[3/4.6] w-full overflow-hidden relative">
              <img
                src="/images/fc_editorial_monument.jpg"
                alt="Finaluchi Couture Monumental Look"
                className="w-full h-full object-cover object-[center_8%] transition-transform duration-700 ease-out group-hover:scale-105 contrast-[1.04]"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/85 backdrop-blur-md text-white text-[10px] font-mono-luxury uppercase tracking-widest rounded-xs border border-white/15">
                Look 09 · Monumental Origami Velvet
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Paragraph (Top) + Secondary Atelier Craft Shot (Bottom) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8 lg:pl-4">
            
            {/* Story Paragraph */}
            <div className="max-w-md space-y-4 pt-2">
              <p className="font-sans-luxury text-sm sm:text-base text-noir leading-relaxed font-normal">
                A stoical elegance, you might call it. Black asymmetric dresses blowing voluminously in the sovereign wind.
              </p>
              <p className="font-sans-luxury text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Oversized hybrids of ceremonial regalia and padded outerwear; double-faced wool crepe jackets and liquid mulberry silks tailored singularly on granite tables. Each silhouette is drafted across 48 custom anatomical points, sculpted for commanding presence without restriction.
              </p>

              {/* Verified Client Dignified Note */}
              <div className="pt-4 border-t border-black/10">
                <blockquote className="text-xs italic text-noir/90 leading-relaxed font-light">
                  "The drape of the mulberry silk is peerless. Tailored with absolute sculptural precision."
                </blockquote>
                <span className="text-[10px] font-mono-luxury text-muted uppercase tracking-widest block mt-1.5 font-medium">
                  — Verified Private Client, Lagos Flagship Suite
                </span>
              </div>
            </div>

            {/* Bottom: Secondary Atelier Cutting Table / Craftsmanship Image */}
            <div className="max-w-sm overflow-hidden bg-[#FAFAFA] border border-black/10 hover:border-black rounded-xs shadow-xs group cursor-pointer transition-all duration-300" onClick={() => onExploreCollection()}>
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src="/images/fc_atelier_craft.jpg"
                  alt="Finaluchi Couture Atelier Craftsmanship"
                  className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover:scale-105 contrast-[1.03]"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/85 backdrop-blur-md text-white text-[10px] font-mono-luxury uppercase tracking-widest rounded-xs border border-white/15">
                  Atelier N°3 · Hand-Cut Silk Pattern Drafting
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
