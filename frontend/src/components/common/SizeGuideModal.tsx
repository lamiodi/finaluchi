import React, { useState } from 'react';
import { X, Ruler, Sparkles } from 'lucide-react';
import { useAudioStore } from '../../stores/audioStore';
import { useModalA11y } from '../../lib/useModalA11y';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMadeToMeasure?: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectMadeToMeasure,
}) => {
  const [unit, setUnit] = useState<'CM' | 'IN'>('CM');
  const { playTactileClick } = useAudioStore();
  const panelRef = useModalA11y<HTMLDivElement>({ onClose, isOpen });

  if (!isOpen) return null;

  const sizeTableCM = [
    { size: 'XXS', uk: '4', us: '0', bust: '76–80', waist: '58–62', hip: '84–88', shoulder: '36' },
    { size: 'XS', uk: '6', us: '2', bust: '80–84', waist: '62–66', hip: '88–92', shoulder: '37' },
    { size: 'S', uk: '8', us: '4', bust: '84–88', waist: '66–70', hip: '92–96', shoulder: '38' },
    { size: 'M', uk: '10', us: '6', bust: '88–94', waist: '70–76', hip: '96–102', shoulder: '39.5' },
    { size: 'L', uk: '12', us: '8', bust: '94–100', waist: '76–82', hip: '102–108', shoulder: '41' },
    { size: 'XL', uk: '14', us: '10', bust: '100–108', waist: '82–90', hip: '108–116', shoulder: '42.5' },
  ];

  const sizeTableIN = [
    { size: 'XXS', uk: '4', us: '0', bust: '30–31.5', waist: '23–24.5', hip: '33–34.5', shoulder: '14.2' },
    { size: 'XS', uk: '6', us: '2', bust: '31.5–33', waist: '24.5–26', hip: '34.5–36', shoulder: '14.6' },
    { size: 'S', uk: '8', us: '4', bust: '33–34.5', waist: '26–27.5', hip: '36–37.8', shoulder: '15.0' },
    { size: 'M', uk: '10', us: '6', bust: '34.5–37', waist: '27.5–30', hip: '37.8–40.2', shoulder: '15.5' },
    { size: 'L', uk: '12', us: '8', bust: '37–39.5', waist: '30–32.5', hip: '40.2–42.5', shoulder: '16.1' },
    { size: 'XL', uk: '14', us: '10', bust: '39.5–42.5', waist: '32.5–35.5', hip: '42.5–45.5', shoulder: '16.7' },
  ];

  const currentTable = unit === 'CM' ? sizeTableCM : sizeTableIN;

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-3 sm:p-4 bg-noir/80 backdrop-blur-md animate-in fade-in duration-200 font-sans-luxury">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
        tabIndex={-1}
        className="bg-white text-noir w-full max-w-2xl border border-black/20 shadow-2xl p-6 sm:p-10 relative max-h-[92vh] overflow-y-auto outline-none"
      >
        
        {/* Close Button */}
        <button
          onClick={() => {
            playTactileClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-muted hover:text-noir transition-colors"
          aria-label="Close Size Guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 text-champagne mb-1.5">
          <Ruler className="w-4 h-4" />
          <span className="text-[10px] sm:text-[11px] font-mono-luxury tracking-[0.25em] uppercase font-semibold">
            SIZE GUIDANCE
          </span>
        </div>
        <h3 id="size-guide-title" className="font-sans-luxury text-2xl sm:text-3xl font-bold tracking-tight text-noir uppercase mb-2">
          Size & Measurement Guide
        </h3>
        <p className="text-xs sm:text-sm text-black/70 leading-relaxed mb-6 font-light">
          Use this chart as an initial guide only. Confirm the current size chart with the Finaluchi team before ordering, especially for corseted, tailored, bridal or custom pieces.
        </p>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-5">
          <span className="text-xs font-bold tracking-widest uppercase text-noir">
            INTERNATIONAL SIZE CHART
          </span>
          <div className="flex gap-1 border border-black/20 p-0.5 text-xs">
            <button
              onClick={() => {
                playTactileClick();
                setUnit('CM');
              }}
              aria-pressed={unit === 'CM'}
              className={`px-3 py-1 font-semibold transition-colors ${unit === 'CM' ? 'bg-noir text-white' : 'text-black/60 hover:text-noir'}`}
            >
              CM
            </button>
            <button
              onClick={() => {
                playTactileClick();
                setUnit('IN');
              }}
              aria-pressed={unit === 'IN'}
              className={`px-3 py-1 font-semibold transition-colors ${unit === 'IN' ? 'bg-noir text-white' : 'text-black/60 hover:text-noir'}`}
            >
              INCHES
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans-luxury border-collapse">
            <thead>
              <tr className="border-b border-black/15 text-black/60 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-2">Size</th>
                <th className="py-2.5 px-2">UK</th>
                <th className="py-2.5 px-2">US</th>
                <th className="py-2.5 px-2">Bust</th>
                <th className="py-2.5 px-2">Waist</th>
                <th className="py-2.5 px-2">Hip</th>
                <th className="py-2.5 px-2">Shoulder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 font-mono-luxury text-xs">
              {currentTable.map((row) => (
                <tr key={row.size} className="hover:bg-black/5 transition-colors">
                  <td className="py-3 px-2 font-bold font-sans-luxury text-noir">{row.size}</td>
                  <td className="py-3 px-2 text-black/60">{row.uk}</td>
                  <td className="py-3 px-2 text-black/60">{row.us}</td>
                  <td className="py-3 px-2">{row.bust}</td>
                  <td className="py-3 px-2">{row.waist}</td>
                  <td className="py-3 px-2">{row.hip}</td>
                  <td className="py-3 px-2">{row.shoulder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Made-to-Measure Bespoke Option */}
        <div className="mt-8 p-5 bg-alabaster-subtle border border-black/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-noir tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              <span>CUSTOM / MADE-TO-MEASURE FIT</span>
            </div>
            <p className="text-xs text-black/65 font-light">
              Share measurements using the method provided by the Abuja team or request a fitting consultation before production.
            </p>
          </div>
          {onSelectMadeToMeasure && (
            <button
              onClick={() => {
                playTactileClick();
                onSelectMadeToMeasure();
                onClose();
              }}
              className="px-5 py-3 bg-noir text-white text-xs font-bold tracking-widest uppercase whitespace-nowrap hover:bg-neutral-900 border border-noir transition-all"
            >
              CHOOSE CUSTOM FIT
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
