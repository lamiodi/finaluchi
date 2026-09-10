import React from 'react';
import { useCurrencyStore } from '../../stores/currencyStore';
import { SupportedDisplayCurrency } from '../../utils/formatters';
import { useAudioStore } from '../../stores/audioStore';
import { Volume2, VolumeX } from 'lucide-react';

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
  const { isSoundEnabled, toggleSound, playTactileClick } = useAudioStore();

  const currencies: SupportedDisplayCurrency[] = ['NGN', 'USD', 'GBP', 'EUR', 'CAD', 'AED'];

  const handleContactClick = () => {
    playTactileClick();
    if (onOpenContact) {
      onOpenContact();
    } else {
      onOpenAppointments();
    }
  };

  const handleAboutClick = () => {
    playTactileClick();
    if (onOpenAbout) {
      onOpenAbout();
    } else {
      onOpenAppointments();
    }
  };

  return (
    <aside aria-label="Announcement & Client Options" className="w-full bg-[#000000] text-white/95 text-[11px] font-sans-luxury py-2 px-4 sm:px-8 lg:px-12 border-b border-white/15 transition-colors">
      <div className="max-w-[1680px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2">
        
        {/* Left: Language & Currency Selector */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-white/60">EN /</span>
            <select
              value={displayCurrency}
              onChange={(e) => {
                playTactileClick();
                setDisplayCurrency(e.target.value as SupportedDisplayCurrency);
              }}
              className="bg-transparent text-white font-medium hover:text-[#C5A880] cursor-pointer focus:outline-none"
              title="Select display currency"
            >
              {currencies.map((c) => (
                <option key={c} value={c} className="bg-noir text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Sound Toggle Shortcut */}
          <button
            onClick={() => {
              toggleSound();
              playTactileClick();
            }}
            className="sm:hidden flex items-center gap-1 text-white/70 hover:text-white"
            title="Toggle Ambient Audio"
          >
            {isSoundEnabled ? <Volume2 className="w-3 h-3 text-white" /> : <VolumeX className="w-3 h-3" />}
            <span className="text-[10px]">{isSoundEnabled ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>
        </div>

        {/* Center: Template Text */}
        <div className="text-center font-normal text-white/85 text-[10px] sm:text-[11px] tracking-wide py-0.5">
          5% off when subscribing to news • Complimentary global white-glove dispatch
        </div>

        {/* Right: Contact & About Links */}
        <div className="hidden sm:flex items-center gap-4 text-white/70 text-[11px]">
          <button
            onClick={handleContactClick}
            className="hover:text-white transition-colors"
          >
            Contact
          </button>
          <span>•</span>
          <button
            onClick={handleAboutClick}
            className="hover:text-white transition-colors"
          >
            About
          </button>
          <span>•</span>
          <button
            onClick={() => {
              toggleSound();
              playTactileClick();
            }}
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            title="Toggle Ambient Audio"
          >
            {isSoundEnabled ? <Volume2 className="w-3 h-3 text-white" /> : <VolumeX className="w-3 h-3" />}
            <span className="text-[10px]">{isSoundEnabled ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
