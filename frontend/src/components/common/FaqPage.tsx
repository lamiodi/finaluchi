import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { FAQ_GROUPS } from '../../data/policies';
import { BRAND, buildWhatsAppUrl } from '../../data/brand';
import { useAudioStore } from '../../stores/audioStore';

interface FaqPageProps {
  onBackHome: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onBackHome }) => {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const { playTactileClick } = useAudioStore();

  return (
    <div className="w-full bg-white min-h-screen text-noir font-sans-luxury pb-24">

      {/* Banner */}
      <div className="bg-noir text-white py-12 sm:py-16 px-4 sm:px-8 lg:px-12 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-3">
          <button
            onClick={onBackHome}
            className="flex items-center gap-1.5 text-[10px] font-mono-luxury text-white/60 hover:text-white uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Finaluchi
          </button>
          <div className="flex items-center gap-2 text-champagne text-xs font-mono-luxury tracking-widest uppercase font-semibold">
            <HelpCircle className="w-4 h-4" />
            <span>Client Questions, Answered</span>
          </div>
          <h1 className="font-sans-luxury text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-white/70 font-light max-w-xl leading-relaxed">
            Everything about ordering, sizing, fittings, production timelines and delivery.
            Anything else, the Abuja concierge team answers personally on WhatsApp.
          </p>
        </div>
      </div>

      {/* Accordion groups */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 space-y-12">
        {FAQ_GROUPS.map((group) => (
          <section key={group.category} className="space-y-4">
            <h2 className="text-sm font-bold tracking-loose-couture uppercase text-black border-b border-black/10 pb-2.5">
              {group.category}
            </h2>

            <div className="divide-y divide-black/10 border border-black/10">
              {group.items.map((item) => {
                const key = `${group.category}:${item.question}`;
                const isOpen = openKey === key;
                return (
                  <div key={key}>
                    <button
                      onClick={() => {
                        playTactileClick();
                        setOpenKey(isOpen ? null : key);
                      }}
                      className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left hover:bg-alabaster-subtle transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-xs sm:text-[13px] font-semibold text-black">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-bronze shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 -mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        <p className="text-xs text-black/70 leading-[1.9] max-w-3xl">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Still curious */}
        <div className="p-6 bg-[#FBF9F5] border border-[#EAE3D2] text-center space-y-3">
          <span className="text-[10px] font-mono-luxury tracking-[0.2em] uppercase text-bronze-deep font-semibold block">
            Still curious?
          </span>
          <p className="text-xs text-black/70 max-w-md mx-auto leading-relaxed">
            Our concierge team typically replies within business hours, Abuja time.
          </p>
          <a
            href={buildWhatsAppUrl('Hello Finaluchi Couture, I have a question about ordering.')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp {BRAND.whatsappDisplay}
          </a>
        </div>
      </div>
    </div>
  );
};
