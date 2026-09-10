import React, { useState } from 'react';
import { toast } from 'sonner';
import { ArrowRight, CreditCard, Sparkles, ShieldCheck, Lock } from 'lucide-react';
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
  const [email, setEmail] = useState('');
  const [certQuery, setCertQuery] = useState('');
  const { playSuccessChime, playTactileClick } = useAudioStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please provide a valid email address.');
      return;
    }
    playSuccessChime();
    toast.success('Welcome to the Finaluchi Private Circle. Atelier dispatch preview dispatched to your inbox.');
    setEmail('');
  };

  const handleVerifyCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certQuery.trim()) {
      toast.error('Enter a serial number (e.g., FC-HS-2026-000142).');
      return;
    }
    playTactileClick();
    onNavigate('tracker', { querySerial: certQuery.trim() });
  };

  const handleWhatsApp = () => {
    playTactileClick();
    window.open('https://wa.me/2348035550192?text=Hello%20Finaluchi%20Concierge', '_blank');
  };

  const handleShowTerms = () => {
    playTactileClick();
    toast.info('Finaluchi Terms of Haute Couture: Every garment is cut on granite to 48 anatomical coordinates. Includes complimentary alteration within 30 days of delivery.');
  };

  const handleShowReturns = () => {
    playTactileClick();
    toast.info('Haute Couture Policy: Unaltered ready-to-wear pieces may be returned within 14 days in original garment bag with intact cryptographic seal.');
  };

  return (
    <footer className="bg-[#000000] text-white pt-14 sm:pt-16 pb-12 border-t border-white/15 font-sans-luxury relative z-10">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Top: Brand Manifesto & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-white/15">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-white p-1.5 border border-white/40 shadow-xl flex items-center justify-center shrink-0 rounded-xs">
                <img
                  src="/FINALUCHIlogo.jpg"
                  alt="Finaluchi Couture Official Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-sans-luxury text-lg sm:text-2xl tracking-[0.22em] font-bold text-white uppercase block">
                  FINALUCHI COUTURE
                </span>
                <p className="text-[9px] sm:text-[10px] tracking-[0.3em] text-[#C5A880] uppercase font-mono-luxury mt-0.5 font-medium">
                  Haute Couture & Bespoke Atelier • Lagos
                </p>
              </div>
            </div>
            <p className="text-xs text-white/85 leading-relaxed max-w-md font-light">
              Uniting ancestral African weaving heritage with contemporary architectural draping. Every piece is drafted, cut singularly on granite, and tailored to individual human proportions in our Lagos atelier.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-xs text-white/90 pt-2 font-medium">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#C5A880]" /> 100% Verified Provenance</span>
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-[#C5A880]" /> Paystack Secured Gateway</span>
            </div>
            <div className="pt-1">
              <button 
                onClick={onOpenAbout} 
                className="hover:text-[#C5A880] transition-colors underline underline-offset-4 text-xs font-sans-luxury text-left"
              >
                Read Maison Story & 48-Point Anatomical Craft ⟶
              </button>
            </div>
          </div>

          {/* Center: Private Circle Newsletter */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold tracking-loose-couture uppercase text-white">
              THE PRIVATE CLIENT LIST
            </h4>
            <p className="text-xs text-white/80 font-light leading-relaxed">
              Receive private preview tokens for limited atelier drops, seasonal couture lookbooks, and invitation-only runway salons.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 pt-1">
              <input
                type="email"
                placeholder="Enter client email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border border-white/25 px-3.5 py-2.5 text-xs text-white placeholder:text-white/45 focus:outline-none focus:border-white focus:bg-white/15 transition-all rounded-xs"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-white text-noir text-xs font-bold tracking-couture hover:bg-neutral-200 transition-all flex items-center justify-center gap-1.5 btn-luxury rounded-xs shrink-0"
              >
                <span>JOIN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right: Digital Certificate Quick Verification */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-loose-couture uppercase text-white">
              VERIFY CERTIFICATE / SERIAL
            </h4>
            <p className="text-xs text-white/80 font-light leading-relaxed">
              Audit the cryptographic ownership passport and provenance for any genuine Finaluchi garment.
            </p>
            <form onSubmit={handleVerifyCert} className="flex flex-col sm:flex-row gap-2 pt-1">
              <input
                type="text"
                placeholder="FC-HS-2026-..."
                value={certQuery}
                onChange={(e) => setCertQuery(e.target.value)}
                className="flex-1 bg-white/10 border border-white/25 px-3.5 py-2.5 text-xs text-white placeholder:text-white/45 uppercase font-mono-luxury focus:outline-none focus:border-white focus:bg-white/15 transition-all rounded-xs"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-white/15 hover:bg-white hover:text-noir text-white text-xs tracking-couture transition-all btn-luxury font-bold border border-white/30 rounded-xs shrink-0 flex items-center justify-center"
              >
                VERIFY
              </button>
            </form>
          </div>
        </div>

        {/* Middle: Navigation Pillars & Concierge */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 sm:py-12 text-xs">
          <div className="space-y-3">
            <h5 className="font-bold text-white tracking-loose-couture uppercase text-xs">
              COUTURE DEPARTMENTS
            </h5>
            <ul className="space-y-2 text-white/80">
              <li><button onClick={() => onNavigate('catalog', { pillar: 'DINNER_DRESSES' })} className="hover:text-white hover:translate-x-0.5 transition-all text-left">Dinner Dresses & Gowns</button></li>
              <li><button onClick={() => onNavigate('catalog', { pillar: 'DRESSES' })} className="hover:text-white hover:translate-x-0.5 transition-all text-left">Dresses & Playsuits</button></li>
              <li><button onClick={() => onNavigate('catalog', { pillar: '2PIECES' })} className="hover:text-white hover:translate-x-0.5 transition-all text-left">2pieces & 3pieces</button></li>
              <li><button onClick={() => onNavigate('catalog', { pillar: 'JUMPSUITS' })} className="hover:text-white hover:translate-x-0.5 transition-all text-left">Jumpsuits & Kimono</button></li>
              <li><button onClick={() => onNavigate('catalog', { pillar: 'JACKETS' })} className="hover:text-white hover:translate-x-0.5 transition-all text-left">Jackets, Pants & Skirts</button></li>
              <li><button onClick={() => onNavigate('catalog', { pillar: 'BIKINI' })} className="hover:text-white hover:translate-x-0.5 transition-all text-left">Resort Bikini & Tops</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white tracking-loose-couture uppercase text-xs">
              EXPERIENCES
            </h5>
            <ul className="space-y-2.5 text-white/80">
              <li><button onClick={() => onNavigate('atelier')} className="hover:text-white hover:translate-x-0.5 transition-all flex items-center gap-1.5 text-left"><Sparkles className="w-3 h-3 text-[#C5A880]" /> Digital Atelier</button></li>
              <li><button onClick={onOpenAppointments} className="hover:text-white hover:translate-x-0.5 transition-all text-left">Bespoke Fitting Appointment</button></li>
              <li><button onClick={() => onNavigate('client', { tab: 'wardrobe' })} className="hover:text-white hover:translate-x-0.5 transition-all text-left">My Finaluchi Wardrobe</button></li>
              <li><button onClick={() => onNavigate('client', { tab: 'saved-edits' })} className="hover:text-white hover:translate-x-0.5 transition-all text-left">Saved Edits & Capsules</button></li>
              <li><button onClick={() => onNavigate('admin')} className="hover:text-white hover:translate-x-0.5 transition-all text-left text-white/95 font-medium">Atelier CRM Desk</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white tracking-loose-couture uppercase text-xs">
              CLIENT CONCIERGE
            </h5>
            <ul className="space-y-2.5 text-white/80">
              <li><button onClick={() => onNavigate('tracker')} className="hover:text-white hover:translate-x-0.5 transition-all text-left">Track Atelier Order</button></li>
              <li><button onClick={handleWhatsApp} className="hover:text-white hover:translate-x-0.5 transition-all text-left text-emerald-400">WhatsApp: +234 803 555 0192</button></li>
              <li><button onClick={onOpenContact} className="hover:text-white hover:translate-x-0.5 transition-all text-left text-[#C5A880]">Email: flc.finaluchi@gmail.com</button></li>
              <li><span className="text-white/70">Dispatch: Express Global Courier</span></li>
              <li><button onClick={handleShowReturns} className="hover:text-white transition-colors text-left underline underline-offset-2 text-white/70">Complimentary 14-Day Returns</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white tracking-loose-couture uppercase text-xs">
              FLAGSHIP ATELIERS
            </h5>
            <div className="space-y-2 text-white/80 leading-relaxed font-light">
              <div className="cursor-pointer hover:opacity-90" onClick={onOpenContact}>
                <p className="text-white font-medium">Lagos Flagship Atelier</p>
                <p className="text-white/70">Plot 12, Victoria Island Arts Corridor, Lagos, Nigeria</p>
              </div>
              <div className="pt-1 cursor-pointer hover:opacity-90" onClick={onOpenAppointments}>
                <p className="text-white font-medium">London Private Suite</p>
                <p className="text-white/70">Old Bond Street, Mayfair, London (By Appointment)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Security */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/65">
          <p>© {new Date().getFullYear()} FINALUCHI COUTURE LIMITED. All Rights Reserved. Master Digital Flagship v2.1.0.</p>
          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5 text-[#C5A880]" /> Paystack Exclusive Gateway</span>
            <button onClick={onOpenAbout} className="hover:text-white transition-colors">About Maison</button>
            <button onClick={onOpenContact} className="hover:text-white transition-colors">Contact Concierge</button>
            <button onClick={handleShowTerms} className="hover:text-white transition-colors">Terms of Haute Couture</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
