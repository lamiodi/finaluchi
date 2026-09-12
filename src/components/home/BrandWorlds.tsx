import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { useAudioStore } from '../../stores/audioStore';

export const BrandWorlds: React.FC = () => {
  const { playTactileClick } = useAudioStore();

  return (
    <section className="w-full bg-[#000000] text-white border-y border-white/15">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        
        {/* Header Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-8 border-b border-white/15">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[10px] sm:text-[11px] font-mono-luxury uppercase tracking-[0.25em] text-[#C5A880] font-medium block">
              House Portfolio · Abuja
            </span>
            <h2 className="font-sans-luxury text-3xl sm:text-5xl font-bold tracking-tight uppercase leading-[1.02] text-white">
              One House. Every Moment of the Occasion.
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-1.5 lg:ml-auto">
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-xl font-light">
              &ldquo;{BRAND.positioning}&rdquo; From bespoke women&apos;s couture and asoebi to bridal moments, menswear, and lifestyle separates.
            </p>
            <span className="text-[10px] font-mono-luxury text-white/50 block uppercase tracking-wider">
              Specialized collections on Instagram
            </span>
          </div>
        </div>

        {/* 4 Brand Worlds Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-2">
          {BRAND.lines.map((line) => (
            <a
              key={line.handle}
              href={line.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => playTactileClick()}
              className="group py-6 lg:px-6 first:pl-0 border-b sm:border-b-0 lg:border-l first:border-l-0 border-white/15 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] transition-all"
              aria-label={`Open ${line.name} on Instagram (${line.handle})`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold uppercase tracking-wide group-hover:text-[#DFC7AA] transition-colors">
                    {line.name}
                  </h3>
                  <p className="text-xs text-white/65 leading-relaxed max-w-[32ch] font-light">
                    {line.description}
                  </p>
                  <span className="text-[11px] font-mono-luxury uppercase tracking-widest text-[#DFC7AA] block pt-1 font-semibold group-hover:underline underline-offset-4">
                    {line.handle} ⟶
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
