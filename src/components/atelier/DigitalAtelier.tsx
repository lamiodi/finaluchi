import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Volume2, ZoomIn, X, CheckCircle2 } from 'lucide-react';
import { ATELIER_STAGES } from '../../data/atelierStages';
import { useAudioStore } from '../../stores/audioStore';

interface DigitalAtelierProps {
  onBookFitting: () => void;
}

export const DigitalAtelier: React.FC<DigitalAtelierProps> = ({ onBookFitting }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isMacroModalOpen, setIsMacroModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  const { playTactileClick } = useAudioStore();

  const stage = ATELIER_STAGES[activeStageIndex];

  const handleNext = () => {
    playTactileClick();
    setActiveStageIndex((prev) => (prev + 1) % ATELIER_STAGES.length);
    setIsPlayingAudio(false);
  };

  const handlePrev = () => {
    playTactileClick();
    setActiveStageIndex((prev) => (prev - 1 + ATELIER_STAGES.length) % ATELIER_STAGES.length);
    setIsPlayingAudio(false);
  };

  const toggleAudio = () => {
    playTactileClick();
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <section className="w-full bg-[#000000] text-white py-20 sm:py-28 relative overflow-hidden">
      
      {/* Background ambient subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header (Craft Floor: Heading Leads With Authority) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-white/20 mb-8 sm:mb-12">
          <div>
            <h2 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
              Anatomy of a Finaluchi Piece
            </h2>
            <p className="text-xs text-white/70 font-light mt-2 max-w-xl">
              From hand-drafted anatomical muslins to pure mulberry silk hand-finishing on granite cutting tables.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono-luxury text-champagne uppercase tracking-widest font-semibold">
              STAGE 0{stage.step}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-white/20 hover:border-white hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Previous Atelier Stage"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full border border-white/20 hover:border-white hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Next Atelier Stage"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 6-Stage Interactive Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8 sm:mb-12">
          {ATELIER_STAGES.map((stg, idx) => (
            <button
              key={stg.step}
              onClick={() => {
                playTactileClick();
                setActiveStageIndex(idx);
                setIsPlayingAudio(false);
              }}
              className={`p-3 text-left border rounded-none transition-all ${
                idx === activeStageIndex
                  ? 'border-white bg-white/20 text-white shadow-lg'
                  : 'border-white/15 bg-white/5 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10'
              }`}
            >
              <span className="text-[9px] font-mono-luxury text-[#C5A880] block mb-1 font-semibold">
                STAGE 0{idx + 1}
              </span>
              <span className="text-xs font-sans-luxury font-semibold line-clamp-1">
                {stg.title.split('&')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Stage Content Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Imagery & Macro Zoom Stage */}
          <div className="lg:col-span-7 relative group rounded-none overflow-hidden bg-black/40 border border-white/15 shadow-2xl">
            <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden relative">
              <img
                src={stage.imageUrl}
                alt={stage.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />
            </div>

            {/* Macro Zoom Trigger Button */}
            <button
              onClick={() => {
                playTactileClick();
                setIsMacroModalOpen(true);
              }}
              className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-noir/80 backdrop-blur-md border border-white/40 text-white text-[10px] sm:text-xs font-mono-luxury tracking-couture uppercase flex items-center gap-1.5 hover:bg-white hover:text-noir transition-all btn-luxury rounded-none"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>400% MACRO ZOOM</span>
            </button>

            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-[10px] sm:text-xs font-mono-luxury text-white/70 bg-noir/60 sm:bg-transparent px-2 py-1 sm:p-0 rounded-none backdrop-blur-xs sm:backdrop-blur-none max-w-[55%] truncate">
              {stage.leadTailor} — Lagos Atelier
            </div>
          </div>

          {/* Right: Craftsmanship Commentary & Audio Notes */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-mono-luxury text-[#C5A880] uppercase tracking-loose-couture font-medium">
                {stage.subtitle}
              </span>
              <h3 className="font-sans-luxury text-2xl sm:text-4xl font-bold text-white leading-tight">
                {stage.title}
              </h3>
            </div>

            <blockquote className="p-4 bg-white/5 border-l-2 border-[#C5A880] text-xs sm:text-sm text-white/90 italic font-display leading-relaxed">
              "{stage.quote}"
            </blockquote>

            {/* Stage Technical Detail Checklist */}
            <div className="space-y-2.5 pt-2">
              <span className="text-[11px] font-semibold text-white tracking-loose-couture uppercase block font-sans-luxury">
                TECHNICAL ATELIER SPECIFICATIONS:
              </span>
              <ul className="space-y-2">
                {stage.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-white/85 font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Master Tailor Audio Note (Opt-in) */}
            <div className="p-4 bg-white/5 border border-white/15 rounded-none space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'text-[#C5A880] animate-pulse' : 'text-white/60'}`} />
                  <span className="text-xs font-semibold text-white tracking-couture uppercase">
                    MASTER TAILOR AUDIO NOTE ({stage.audioNoteDuration})
                  </span>
                </div>
                <button
                  onClick={toggleAudio}
                  className="px-3 py-1 bg-white/10 hover:bg-white hover:text-noir text-white text-[11px] tracking-couture uppercase rounded-none transition-colors"
                >
                  {isPlayingAudio ? 'PAUSE COMMENTARY' : 'LISTEN TO TAILOR'}
                </button>
              </div>
              
              {isPlayingAudio && (
                <p className="text-xs text-white/90 pt-2 font-mono-luxury border-t border-white/10 animate-in fade-in">
                  "{stage.audioTranscript}"
                </p>
              )}
            </div>

            {/* Schedule Fitting Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  playTactileClick();
                  onBookFitting();
                }}
                className="w-full py-3.5 bg-white text-noir text-xs font-bold tracking-loose-couture uppercase hover:bg-neutral-200 hover:text-noir transition-all btn-luxury rounded-none flex items-center justify-center gap-2"
              >
                <span>BOOK BESPOKE ATELIER MEASUREMENT SESSION</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Macro Texture Zoom Modal */}
      {isMacroModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/90 backdrop-blur-md">
          <div className="bg-noir border border-white/20 rounded-none max-w-4xl w-full p-6 relative">
            <button
              onClick={() => setIsMacroModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="font-sans-luxury text-xl text-white mb-4 uppercase tracking-couture">
              400% Macro Fiber Density Inspection — {stage.title}
            </h4>
            <div className="aspect-[16/9] w-full overflow-hidden rounded-none bg-black">
              <img
                src={stage.macroZoomUrl}
                alt="Macro texture view"
                className="w-full h-full object-cover scale-150 transform hover:scale-175 transition-transform duration-500 cursor-crosshair"
              />
            </div>
            <p className="text-xs text-white/60 mt-3 font-mono-luxury">
              Inspecting weave tension, optical luster refraction, and organic dye absorption.
            </p>
          </div>
        </div>
      )}

    </section>
  );
};
