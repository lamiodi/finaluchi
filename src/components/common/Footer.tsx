import React from 'react';
import { ArrowRight, CheckCircle2, Instagram, MessageCircle, Sparkles } from 'lucide-react';
import { BRAND, ORDER_CLARITY_NOTE, buildWhatsAppUrl } from '../../data/brand';
import { useAudioStore } from '../../stores/audioStore';

interface FooterProps {
  onNavigate: (view: string, payload?: any) => void;
  onOpenAppointments: () => void;
  onOpenContact?: () => void;
  onOpenAbout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAppointments,
  onOpenContact,
  onOpenAbout,
}) => {
  const { playTactileClick } = useAudioStore();

  const whatsappUrl = buildWhatsAppUrl(
    'Hello Finaluchi Couture, I would like help choosing a piece or planning a custom order.'
  );

  return (
    <footer className="bg-[#000000] text-white pt-14 sm:pt-16 pb-12 border-t border-white/15 font-sans-luxury relative z-10">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-white/15">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-white p-1.5 border border-white/40 shadow-xl flex items-center justify-center shrink-0 rounded-xs">
                <img
                  src="/FINALUCHIlogo.jpg"
                  alt="Finaluchi Couture official logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-sans-luxury text-lg sm:text-2xl tracking-[0.22em] font-bold text-white uppercase block">
                  FINALUCHI COUTURE
                </span>
                <p className="text-[9px] sm:text-[10px] tracking-[0.3em] text-[#C5A880] uppercase font-mono-luxury mt-0.5 font-medium">
                  Abuja, Nigeria · Couture & Ready-to-Wear
                </p>
              </div>
            </div>

            <p className="text-xs text-white/80 leading-relaxed max-w-md font-light">
              A Nigerian fashion brand creating bold women&apos;s couture, ready-to-wear, asoebi,
              event and bridal dressing—with menswear and lifestyle lines across the FLC family.
            </p>

            <button
              onClick={onOpenAbout}
              className="hover:text-[#DFC7AA] transition-colors underline underline-offset-4 text-xs text-left"
            >
              Meet Finaluchi and its creative direction ⟶
            </button>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-loose-couture uppercase text-white">
              Plan Your Order
            </h4>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Share the piece you like, your event date, preferred size or measurements and any
              custom details. The team can confirm what is possible before you pay.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => playTactileClick()}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-[#DFC7AA] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp {BRAND.whatsappDisplay}
            </a>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold tracking-loose-couture uppercase text-white">
              Before You Pay
            </h4>
            <p className="text-xs text-white/70 font-light leading-relaxed">{ORDER_CLARITY_NOTE}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-white/80">
              {['Written invoice', 'Confirmed event & delivery date', 'Measurement approval', 'Alteration & refund terms'].map((item) => (
                <span key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 sm:py-12 text-xs">
          <div className="space-y-3">
            <h5 className="font-bold tracking-loose-couture uppercase">Shop Women</h5>
            <ul className="space-y-2 text-white/75">
              <li><button onClick={() => onNavigate('catalog', { pillar: 'DINNER_DRESSES' })} className="hover:text-white text-left">Dinner Dresses & Gowns</button></li>
              <li><button onClick={() => onNavigate('catalog', { pillar: 'DRESSES' })} className="hover:text-white text-left">Dresses & Playsuits</button></li>
              <li><button onClick={() => onNavigate('catalog', { pillar: '2PIECES' })} className="hover:text-white text-left">2-Piece & 3-Piece Sets</button></li>
              <li><button onClick={() => onNavigate('catalog', { pillar: 'JUMPSUITS' })} className="hover:text-white text-left">Jumpsuits & Kimonos</button></li>
              <li><button onClick={() => onNavigate('catalog', { pillar: 'JACKETS' })} className="hover:text-white text-left">Jackets, Pants & Skirts</button></li>
              <li><button onClick={() => onNavigate('catalog', { pillar: 'BIKINI' })} className="hover:text-white text-left">Bikini, Resort & Tops</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold tracking-loose-couture uppercase">Order Support</h5>
            <ul className="space-y-2.5 text-white/75">
              <li><button onClick={onOpenAppointments} className="hover:text-white text-left">Request a Custom Order</button></li>
              <li><button onClick={() => onNavigate('tracker')} className="hover:text-white text-left">Track an Order</button></li>
              <li><button onClick={() => onNavigate('client')} className="hover:text-white text-left">Saved Pieces</button></li>
              <li><button onClick={onOpenContact} className="hover:text-white text-left">Contact Finaluchi</button></li>
              <li><button onClick={() => onNavigate('atelier')} className="hover:text-white flex items-center gap-1.5 text-left"><Sparkles className="w-3 h-3 text-[#C5A880]" /> How Custom Orders Work</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold tracking-loose-couture uppercase">FLC Collections</h5>
            <ul className="space-y-2.5 text-white/75">
              {BRAND.lines.map((line) => (
                <li key={line.handle}>
                  <a href={line.url} target="_blank" rel="noreferrer" className="hover:text-white inline-flex items-center gap-1.5">
                    <Instagram className="w-3 h-3 text-[#C5A880]" /> {line.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold tracking-loose-couture uppercase">Based in Abuja</h5>
            <p className="text-white/75 leading-relaxed font-light">
              Finaluchi Couture is based in Abuja, Nigeria. Studio address, fitting availability,
              delivery timelines and collection arrangements are confirmed directly with the team.
            </p>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#DFC7AA] hover:text-white inline-flex items-center gap-1.5"
            >
              View current work <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <p>© {new Date().getFullYear()} Finaluchi Couture. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-white/70">
            <span>Creative direction: {BRAND.creativeLead}</span>
            <button onClick={onOpenAbout} className="hover:text-white">About</button>
            <button onClick={onOpenContact} className="hover:text-white">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
