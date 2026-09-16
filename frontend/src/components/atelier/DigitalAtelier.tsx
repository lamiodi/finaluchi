import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, ZoomIn, X } from 'lucide-react';
import { ATELIER_STAGES } from '../../data/atelierStages';
import { useAudioStore } from '../../stores/audioStore';

interface DigitalAtelierProps {
  onBookFitting: () => void;
}

export const DigitalAtelier: React.FC<DigitalAtelierProps> = ({ onBookFitting }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isMacroModalOpen, setIsMacroModalOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  
  const { playTactileClick } = useAudioStore();

  const stage = ATELIER_STAGES[activeStageIndex];

  const handleNext = () => {
    playTactileClick();
    setActiveStageIndex((prev) => (prev + 1) % ATELIER_STAGES.length);
    setIsNoteOpen(false);
  };

  const handlePrev = () => {
    playTactileClick();
    setActiveStageIndex((prev) => (prev - 1 + ATELIER_STAGES.length) % ATELIER_STAGES.length);
    setIsNoteOpen(false);
  };

  const toggleNote = () => {
    playTactileClick();
    setIsNoteOpen(!isNoteOpen);
  };

  return (
    <section className="w-full bg-[#000000] text-white py-20 sm:py-28 relative overflow-hidden font-sans-luxury">
      
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_60%)]" />

      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-white/20 mb-8 sm:mb-12">
          <div>
            <span className="text-[10px] sm:text-xs font-mono-luxury text-[#C5A880] uppercase tracking-[0.25em] font-semibold block mb-1">
              Atelier Craftsmanship
            </span>
            <h2 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
              The Bespoke Process
            </h2>
            <p className="text-xs text-white/70 font-light mt-2 max-w-xl">
              From first consultation and measurement confirmation to toile creation and the final fitting.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono-luxury text-white/60 uppercase tracking-widest">
              Step 0{stage.step} of 0{ATELIER_STAGES.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-white/20 hover:border-white hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Previous Stage"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full border border-white/20 hover:border-white hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Next Stage"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Minimalist Navigation Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-12 border-b border-white/10 pb-4">
          {ATELIER_STAGES.map((stg, idx) => (
            <button
              key={stg.step}
              onClick={() => {
                playTactileClick();
                setActiveStageIndex(idx);
                setIsNoteOpen(false);
              }}
              className={`text-left pb-3 transition-all border-b-2 ${
                idx === activeStageIndex
                  ? 'border-white text-white font-medium'
                  : 'border-transparent text-white/40 hover:text-white/80'
              }`}
            >
              <span className="text-[10px] font-mono-luxury block mb-1 text-[#C5A880]">
                0{idx + 1}
              </span>
              <span className="text-xs font-sans-luxury line-clamp-1">
                {stg.title.split('&')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Stage Content Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: Imagery Stage */}
          <div className="lg:col-span-7 relative group overflow-hidden bg-black border border-white/10 shadow-2xl">
            <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden relative">
              <img
                src={stage.imageUrl}
                alt={stage.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Macro Zoom Trigger Button */}
            <button
              onClick={() => {
                playTactileClick();
                setIsMacroModalOpen(true);
              }}
              className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/30 text-white text-[10px] font-mono-luxury tracking-widest uppercase flex items-center gap-1.5 hover:bg-white hover:text-black transition-all"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Inspect Detail</span>
            </button>

            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-[10px] sm:text-xs font-mono-luxury text-white/70">
              {stage.leadTailor} — Abuja Atelier
            </div>
          </div>

          {/* Right: Craft Commentary */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono-luxury text-[#C5A880] uppercase tracking-[0.25em] font-medium block">
                {stage.subtitle}
              </span>
              <h3 className="font-sans-luxury text-2xl sm:text-4xl font-bold text-white leading-tight">
                {stage.title}
              </h3>
            </div>

            {/* Quote */}
            <blockquote className="pl-4 border-l border-[#C5A880] text-xs sm:text-sm text-white/80 italic font-display leading-relaxed">
              &ldquo;{stage.quote}&rdquo;
            </blockquote>

            {/* Details List */}
            <div className="space-y-2.5 pt-2 border-t border-white/10">
              <span className="text-[10px] font-mono-luxury uppercase tracking-wider text-white/50 block">
                Key Considerations
              </span>
              <ul className="space-y-2">
                {stage.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-white/80 font-light">
                    <span className="text-[#C5A880] text-[10px] font-mono-luxury mt-0.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ordering Note Accordion */}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={toggleNote}
                className="flex items-center justify-between w-full py-2 text-xs font-mono-luxury text-white/60 hover:text-white transition-colors uppercase tracking-wider"
              >
                <span>Atelier Commentary</span>
                <span>{isNoteOpen ? '− Close' : '+ Read Notes'}</span>
              </button>
              
              {isNoteOpen && (
                <p className="text-xs text-white/80 pt-2 font-light leading-relaxed animate-in fade-in">
                  {stage.audioTranscript}
                </p>
              )}
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={() => {
                  playTactileClick();
                  onBookFitting();
                }}
                className="w-full py-4 bg-white text-black text-xs font-sans-luxury font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-all flex items-center justify-center"
              >
                <span>Request Custom Consultation</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Macro Detail Zoom Modal */}
      {isMacroModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/90 backdrop-blur-md">
          <div className="bg-noir border border-white/20 max-w-4xl w-full p-6 relative">
            <button
              onClick={() => setIsMacroModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="font-sans-luxury text-xl text-white mb-4 uppercase tracking-couture">
              Garment Detail — {stage.title}
            </h4>
            <div className="aspect-[16/9] w-full overflow-hidden bg-black">
              <img
                src={stage.macroZoomUrl}
                alt="Detail view"
                className="w-full h-full object-cover scale-150 transform hover:scale-175 transition-transform duration-500 cursor-crosshair"
              />
            </div>
            <p className="text-xs text-white/60 mt-3 font-mono-luxury">
              Fabric, texture and finishing specifications confirmed with the Abuja atelier team.
            </p>
          </div>
        </div>
      )}

    </section>
  );
};
