import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, ZoomIn, X, ArrowUpRight } from 'lucide-react';
import { ATELIER_STAGES } from '../../data/atelierStages';
import { useAudioStore } from '../../stores/audioStore';
import { useModalA11y } from '../../lib/useModalA11y';

interface DigitalAtelierProps {
  onBookFitting: () => void;
}

export const DigitalAtelier: React.FC<DigitalAtelierProps> = ({ onBookFitting }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isMacroModalOpen, setIsMacroModalOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  const { playTactileClick } = useAudioStore();
  const macroPanelRef = useModalA11y<HTMLDivElement>({
    onClose: () => setIsMacroModalOpen(false),
    isOpen: isMacroModalOpen,
  });

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
    <section className="salon-section relative overflow-hidden" aria-label="The bespoke process">

      <div className="salon-inner">

        {/* Salon heading — champagne eyebrow, serif display, stage counter
            and the room's circular controls. */}
        <div className="salon-heading">
          <div>
            <span className="salon-eyebrow">Atelier craftsmanship · Abuja</span>
            <h2>
              The bespoke <em>process.</em>
            </h2>
            <p style={{ fontSize: 12, lineHeight: 1.9, color: '#b2ada4', marginTop: 14, maxWidth: 460 }}>
              From first consultation and measurement confirmation to toile creation and
              the final fitting.
            </p>
          </div>
          <div className="salon-heading-side">
            <span className="salon-count" role="status">
              {stage.step}
            </span>
            <div style={{ display: 'flex', gap: 15 }}>
              <button
                onClick={handlePrev}
                aria-label="Previous Stage"
                style={{
                  width: 42, height: 42, display: 'grid', placeItems: 'center',
                  border: '1px solid #ffffff35', borderRadius: '50%', color: '#efebe3',
                }}
              >
                <ChevronLeft size={19} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Stage"
                style={{
                  width: 42, height: 42, display: 'grid', placeItems: 'center',
                  border: '1px solid #ffffff35', borderRadius: '50%', color: '#efebe3',
                }}
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        </div>

        {/* Stage navigation — runway thumbnail strip logic: numbered,
            champagne when current. */}
        <div
          className="salon-grid"
          style={{ gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: '0 24px', borderBottom: '1px solid #ffffff17', paddingBottom: 18, marginBottom: 42 }}
        >
          {ATELIER_STAGES.map((stg, idx) => (
            <button
              key={stg.step}
              onClick={() => {
                playTactileClick();
                setActiveStageIndex(idx);
                setIsNoteOpen(false);
              }}
              aria-pressed={idx === activeStageIndex}
              style={{
                textAlign: 'left',
                paddingBottom: 10,
                borderBottom: idx === activeStageIndex ? '2px solid #cab291' : '2px solid transparent',
                color: idx === activeStageIndex ? '#efebe3' : '#9a9285',
              }}
            >
              <span style={{ display: 'block', fontSize: 9, letterSpacing: '.2em', color: '#baa78c', marginBottom: 6 }}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span style={{ fontSize: 11, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {stg.title.split('&')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Stage presentation — photo salon left, craft commentary right. */}
        <div className="home-editorial" style={{ padding: 0, gridTemplateColumns: '1.35fr 1fr', gap: '5%' }}>

          {/* Imagery stage */}
          <div className="home-editorial-image" style={{ gap: 0 }}>
            <div
              className="home-editorial-figure"
              style={{ aspectRatio: '16 / 10', cursor: 'zoom-in' }}
              role="button"
              tabIndex={0}
              aria-label={`Inspect detail — ${stage.title}`}
              onClick={() => {
                playTactileClick();
                setIsMacroModalOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsMacroModalOpen(true);
                }
              }}
            >
              <img src={stage.imageUrl} alt={stage.title} />
              <span className="salon-stage-chip">
                Finaluchi / Stage {String(activeStageIndex + 1).padStart(2, '0')} · Atelier
              </span>
              <span
                style={{
                  position: 'absolute', bottom: 15, right: 15, zIndex: 2,
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#171715be', color: '#efebe3', padding: '8px 11px',
                  fontSize: 8, letterSpacing: '.2em', textTransform: 'uppercase',
                }}
              >
                <ZoomIn size={13} /> Inspect detail
              </span>
            </div>
            <span className="home-figure-micro" style={{ color: '#948c7f', marginTop: 14 }}>
              {stage.leadTailor} — Abuja Atelier
            </span>
          </div>

          {/* Craft commentary */}
          <div style={{ position: 'relative' }}>
            <span className="salon-ghost-number" aria-hidden="true" style={{ position: 'absolute', right: 0, top: -18 }}>
              {String(activeStageIndex + 1).padStart(2, '0')}
            </span>
            <div style={{ position: 'relative' }}>
              <span className="salon-eyebrow" style={{ display: 'block' }}>
                {stage.subtitle}
              </span>
              <h3
                style={{
                  font: "400 clamp(28px, 3vw, 44px)/1.14 'Antic Didone', serif",
                  letterSpacing: '-.02em',
                  margin: '16px 0 0',
                  color: '#efebe3',
                }}
              >
                {stage.title}
              </h3>
            </div>

            <blockquote
              style={{
                margin: '24px 0 0',
                padding: '2px 0 2px 18px',
                borderLeft: '1px solid #c5a880',
                color: '#cab291',
                fontFamily: "'Antic Didone', serif",
                fontStyle: 'italic',
                fontSize: 19,
                lineHeight: 1.5,
              }}
            >
              &ldquo;{stage.quote}&rdquo;
            </blockquote>

            <div style={{ marginTop: 28, borderTop: '1px solid #ffffff17', paddingTop: 20 }}>
              <span style={{ display: 'block', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: '#948c7f' }}>
                Key considerations
              </span>
              <ul style={{ listStyle: 'none', margin: '14px 0 0', padding: 0 }}>
                {stage.details.map((detail, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex', gap: 12, alignItems: 'baseline',
                      fontSize: 12, lineHeight: 1.8, color: '#b2ada4',
                      paddingBottom: 9, borderBottom: i === stage.details.length - 1 ? 'none' : '1px solid #ffffff12',
                    }}
                  >
                    <span style={{ color: '#c5a880', fontSize: 10 }}>{String(i + 1).padStart(2, '0')}</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ordering note accordion */}
            <div style={{ marginTop: 20, borderTop: '1px solid #ffffff17', paddingTop: 4 }}>
              <button
                onClick={toggleNote}
                aria-expanded={isNoteOpen}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '10px 0', fontSize: 9, letterSpacing: '.2em',
                  textTransform: 'uppercase', color: '#948c7f',
                }}
              >
                <span>Atelier commentary</span>
                <span>{isNoteOpen ? '− Close' : '+ Read notes'}</span>
              </button>
              {isNoteOpen && (
                <p style={{ fontSize: 12, lineHeight: 1.9, color: '#b2ada4', paddingTop: 4 }}>
                  {stage.audioTranscript}
                </p>
              )}
            </div>

            {/* Action — the runway room's champagne bar. */}
            <button
              className="salon-solid-bar"
              style={{ marginTop: 24 }}
              onClick={() => {
                playTactileClick();
                onBookFitting();
              }}
            >
              <span>Request custom consultation</span>
              <ArrowUpRight size={17} />
            </button>

          </div>
        </div>

      </div>

      {/* Macro detail zoom — the salon's inspection room. */}
      {isMacroModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div
            ref={macroPanelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Garment detail — ${stage.title}`}
            tabIndex={-1}
            className="salon-section outline-none"
            style={{ maxWidth: '56rem', width: '100%', padding: 26, position: 'relative' }}
          >
            <button
              onClick={() => setIsMacroModalOpen(false)}
              aria-label="Close Detail View"
              style={{
                position: 'absolute', top: 16, right: 16, width: 42, height: 42,
                display: 'grid', placeItems: 'center', border: '1px solid #ffffff35',
                borderRadius: '50%', color: '#efebe3',
              }}
            >
              <X size={19} />
            </button>
            <span className="salon-eyebrow">Macro inspection</span>
            <h4
              style={{
                font: "400 30px/1.2 'Antic Didone', serif", color: '#efebe3', marginTop: 12,
              }}
            >
              {stage.title}
            </h4>
            <div style={{ aspectRatio: '16 / 9', width: '100%', overflow: 'hidden', background: '#23231f', marginTop: 18 }}>
              <img
                src={stage.macroZoomUrl}
                alt="Detail view"
                className="w-full h-full object-cover scale-150 transform hover:scale-175 transition-transform duration-500 cursor-crosshair"
              />
            </div>
            <p style={{ fontSize: 10, letterSpacing: '.08em', color: '#a19a8e', marginTop: 14 }}>
              Fabric, texture and finishing specifications confirmed with the Abuja atelier team.
            </p>
          </div>
        </div>
      )}

    </section>
  );
};
