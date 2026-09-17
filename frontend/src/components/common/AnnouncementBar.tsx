import React from 'react';
import { useCurrencyStore } from '../../stores/currencyStore';
import { SupportedDisplayCurrency } from '../../utils/formatters';
import { BRAND, buildWhatsAppUrl } from '../../data/brand';

interface AnnouncementBarProps {
  onOpenAppointments: () => void;
  onOpenContact?: () => void;
  onOpenAbout?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ 
  onOpenAppointments,
  onOpenContact,
  onOpenAbout,
}) => {
  const { displayCurrency, setDisplayCurrency } = useCurrencyStore();

  const currencies: SupportedDisplayCurrency[] = ['NGN', 'USD', 'GBP', 'EUR', 'CAD', 'AED'];

  const handleContactClick = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      onOpenAppointments();
    }
  };

  const handleAboutClick = () => {
    if (onOpenAbout) {
      onOpenAbout();
    } else {
      onOpenAppointments();
    }
  };

  return (
    <aside aria-label="Announcement Bar" className="w-full bg-[#000000] text-white text-[11px] font-sans-luxury py-2 px-4 sm:px-8 lg:px-12 border-b border-white/15">
      <div className="max-w-[1680px] mx-auto flex items-center justify-between gap-2">
        
        {/* Left: Language & Currency Selector */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-white/50 text-[10px] hidden sm:inline">EN /</span>
          <select
            value={displayCurrency}
            onChange={(e) => {
              setDisplayCurrency(e.target.value as SupportedDisplayCurrency);
            }}
            className="bg-transparent text-white font-mono-luxury text-[10px] sm:text-[11px] font-medium hover:text-[#C5A880] cursor-pointer focus:outline-none"
            title="Select display currency"
          >
            {currencies.map((c) => (
              <option key={c} value={c} className="bg-noir text-white">
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Center: Editorial WhatsApp Notice */}
        <a
          href={buildWhatsAppUrl('Hello Finaluchi Couture, I would like help choosing or ordering a piece.')}
          target="_blank"
          rel="noreferrer"
          className="text-center font-normal text-white/80 hover:text-white text-[10px] sm:text-[11px] tracking-wide truncate max-w-[200px] sm:max-w-none transition-colors"
        >
          <span className="hidden sm:inline">Abuja Atelier · Bespoke & Occasion Wear · Order Support </span>
          <span className="sm:hidden">WhatsApp Concierge </span>
          <span className="font-mono-luxury text-white/90">{BRAND.whatsappDisplay}</span>
        </a>

        {/* Right: Actions */}
        <div className="hidden sm:flex items-center gap-3 sm:gap-4 text-white/70 text-[11px] shrink-0">
          <button
            onClick={handleContactClick}
            className="hover:text-white transition-colors"
          >
            Contact
          </button>
          <span className="text-white/30">•</span>
          <button
            onClick={handleAboutClick}
            className="hover:text-white transition-colors"
          >
            About
          </button>
        </div>

      </div>
    </aside>
  );
};
