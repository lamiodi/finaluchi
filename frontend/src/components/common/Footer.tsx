import React from 'react';
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { BRAND, ORDER_CLARITY_NOTE, buildWhatsAppUrl } from '../../data/brand';
import { useAudioStore } from '../../stores/audioStore';

interface FooterProps {
  onNavigate: (view: string, payload?: any) => void;
  onOpenAppointments: () => void;
  onOpenContact?: () => void;
  onOpenAbout?: () => void;
}

const SHOP_WOMEN = [
  { label: 'Dinner Dresses & Gowns', pillar: 'DINNER_DRESSES' },
  { label: 'Dresses & Playsuits', pillar: 'DRESSES' },
  { label: '2-Piece & 3-Piece Sets', pillar: '2PIECES' },
  { label: 'Jumpsuits & Kimonos', pillar: 'JUMPSUITS' },
  { label: 'Jackets, Pants & Skirts', pillar: 'JACKETS' },
  { label: 'Bikini, Resort & Tops', pillar: 'BIKINI' },
];

const PROMISES = ['Written invoice', 'Confirmed event & delivery date', 'Measurement approval', 'Alteration & refund terms'];

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

  const link = 'text-left hover:text-[#efebe3] text-[#b2ada4] transition-colors';

  return (
    <footer className="salon-section relative z-10">
      <div className="salon-inner" style={{ paddingBottom: 0 }}>

        {/* House block — the room's wordmark pairing: letterspaced serif
            against the champagne Couture signature. */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 pb-14"
          style={{ borderBottom: '1px solid #ffffff25' }}
        >
          <div className="lg:col-span-5 flex flex-col gap-7">
            <div className="flex items-center gap-5">
              <div
                className="w-14 h-14 bg-white p-1.5 shrink-0 flex items-center justify-center"
                style={{ border: '1px solid #ffffff35' }}
              >
                <picture>
                  <source srcSet="/FINALUCHIlogo.webp" type="image/webp" />
                  <img
                    src="/FINALUCHIlogo.webp"
                    alt="Finaluchi Couture official logo"
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </picture>
              </div>
              <div className="flex items-baseline gap-3">
                <span
                  style={{
                    font: "400 26px/1 'Antic Didone', serif",
                    letterSpacing: '.15em',
                    color: '#efebe3',
                  }}
                >
                  FINALUCHI
                </span>
              </div>
            </div>

            <span className="salon-eyebrow">Abuja, Nigeria · Est. 2016 · Togetherness in Style</span>

            <p style={{ fontSize: 12, lineHeight: 1.9, color: '#b2ada4', maxWidth: 400 }}>
              A Nigerian luxury fashion house built on the power of togetherness — creating bespoke
              couture, haute couture, and ready-to-wear that blends contemporary luxury with
              African influence, with bridal, menswear and lifestyle lines across the FLC family.
            </p>

            <a
              className="salon-text-link"
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                playTactileClick();
                onOpenAbout?.();
              }}
            >
              Meet Finaluchi and its creative direction <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Plan your order — the room's champagne bar. */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="salon-eyebrow">Plan your order</span>
            <p style={{ fontSize: 12, lineHeight: 1.8, color: '#b2ada4' }}>
              Share the piece you like, your event date, preferred size or measurements and any
              custom details. The team can confirm what is possible before you pay.
            </p>
            <a className="salon-solid-bar" style={{ width: '100%', marginTop: 8 }} href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => playTactileClick()}>
              <span>WhatsApp {BRAND.whatsappDisplay}</span>
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Before you pay. */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="salon-eyebrow">Before you pay</span>
            <p style={{ fontSize: 12, lineHeight: 1.8, color: '#b2ada4' }}>{ORDER_CLARITY_NOTE}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
              {PROMISES.map((item) => (
                <span key={item} className="flex items-start gap-2.5" style={{ fontSize: 11, color: '#b2ada4' }}>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#c5a880' }} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Directory. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-12">
          <div className="flex flex-col gap-4">
            <span className="salon-eyebrow">Shop women</span>
            <ul className="space-y-2.5" style={{ fontSize: 12 }}>
              {SHOP_WOMEN.map(({ label, pillar }) => (
                <li key={pillar}>
                  <button className={link} onClick={() => onNavigate('catalog', { pillar })}>{label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="salon-eyebrow">Order support</span>
            <ul className="space-y-2.5" style={{ fontSize: 12 }}>
              <li><button className={link} onClick={onOpenAppointments}>Request a Custom Order</button></li>
              <li><button className={link} onClick={() => onNavigate('tracker')}>Track an Order</button></li>
              <li><button className={link} onClick={() => onNavigate('client')}>Saved Pieces</button></li>
              <li><button className={link} onClick={onOpenContact}>Contact Finaluchi</button></li>
              <li>
                <button className={`${link} inline-flex items-center gap-1.5`} onClick={() => onNavigate('atelier')}>
                  <Sparkles className="w-3 h-3" style={{ color: '#c5a880' }} /> How Custom Orders Work
                </button>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="salon-eyebrow">Based in Abuja</span>
            <p style={{ fontSize: 12, lineHeight: 1.8, color: '#b2ada4' }}>
              Finaluchi Couture is based in Abuja, Nigeria. Studio address, fitting availability,
              delivery timelines and collection arrangements are confirmed directly with the team.
            </p>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="salon-text-link self-start"
            >
              View current work <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Colophon. */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8"
          style={{ borderTop: '1px solid #ffffff25', fontSize: 10, letterSpacing: '.1em', color: '#948c7f' }}
        >
          <p>© {new Date().getFullYear()} Finaluchi Couture. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-6" style={{ textTransform: 'uppercase' }}>
            <span>Creative direction: {BRAND.creativeLead}</span>
            <button className="hover:text-[#efebe3] transition-colors" onClick={onOpenAbout}>About</button>
            <button className="hover:text-[#efebe3] transition-colors" onClick={onOpenContact}>Contact</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
