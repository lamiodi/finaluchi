import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { useAudioStore } from '../../stores/audioStore';

export const BrandWorlds: React.FC = () => {
  const { playTactileClick } = useAudioStore();

  return (
    <section className="w-full bg-[#000000] text-white border-y border-white/15">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-8 border-b border-white/15">
          <h2 className="lg:col-span-7 font-sans-luxury text-3xl sm:text-5xl font-bold tracking-tight uppercase leading-[1.02]">
            One house. Every part of the occasion.
          </h2>
          <p className="lg:col-span-5 text-xs sm:text-sm text-white/70 leading-relaxed max-w-xl lg:ml-auto">
            From women&apos;s couture and ready-to-wear to bridal, menswear and lifestyle pieces,
            explore the Finaluchi line created for your moment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND.lines.map((line) => (
            <a
              key={line.handle}
              href={line.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => playTactileClick()}
              className="group py-6 lg:px-6 first:pl-0 border-b sm:border-b-0 lg:border-l first:border-l-0 border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              aria-label={`Open ${line.name} on Instagram`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold uppercase tracking-wide group-hover:text-[#DFC7AA] transition-colors">
                    {line.name}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed max-w-[30ch]">
                    {line.description}
                  </p>
                  <span className="text-[10px] font-mono-luxury uppercase tracking-widest text-[#DFC7AA] block pt-1">
                    {line.handle}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/45 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
