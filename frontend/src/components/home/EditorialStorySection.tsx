import React from 'react';
import { useAudioStore } from '../../stores/audioStore';
import { ArrowUpRight } from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../../data/brand';
import { onImageError, buildWebPSrcSet } from '../../utils/images';

interface EditorialStorySectionProps {
  onExploreCollection: () => void;
  onExploreAtelier: () => void;
  onNavigatePillar?: (pillar: string) => void;
}

const MILESTONES = [
  { label: '2016 · The Dream', note: 'FLC is founded in Abuja — a dream born from a passion for fashion.' },
  { label: '2020 · BellaNaija', note: 'Featured in a landmark AsoEbi editorial spotlight.' },
  { label: '2022 · Press', note: 'Recognized for red-carpet and milestone occasion dressing.' },
  { label: '2026 · Horizons', note: 'Bridal and couture evening collections debuting through the season.' },
];

const PILLAR_JUMPS = [
  { label: 'Dresses', pillar: 'DRESSES' },
  { label: 'Jumpsuits', pillar: 'JUMPSUITS' },
  { label: 'Tops', pillar: 'TOPS' },
  { label: 'Skirts', pillar: 'SKIRTS' },
  { label: '2-Piece Sets', pillar: '2PIECES' },
];

export const EditorialStorySection: React.FC<EditorialStorySectionProps> = ({
  onExploreCollection,
  onExploreAtelier,
  onNavigatePillar,
}) => {
  const { playTactileClick } = useAudioStore();

  const handleCategoryJump = (pillar: string) => {
    playTactileClick();
    if (onNavigatePillar) {
      onNavigatePillar(pillar);
    } else {
      onExploreCollection();
    }
  };

  const handleCustomOrderWhatsApp = () => {
    playTactileClick();
    const message =
      'Hello Finaluchi Couture, I would like to plan a custom occasion piece. Please share details on measurement confirmation, invoice, delivery timeline and alteration terms.';
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const figureKeyDown =
    (action: () => void) =>
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        action();
      }
    };

  return (
    <section className="shop-page" aria-label="The house">
      <div className="home-editorial">

        {/* Copy column — the shop editorial voice: eyebrow, serif display
            with a bronze italic, measured body, hairline milestones. */}
        <div className="home-editorial-copy">
          <span className="shop-eyebrow" style={{ color: '#7c7164' }}>
            Finaluchi / Editorial heritage · Abuja, Nigeria
          </span>
          <h2>
            Togetherness<br />
            <em>in Style.</em>
          </h2>
          <p>
            Finaluchi Couture (FLC) is a Nigerian luxury fashion house founded in 2016 — a dream
            born from a passion for fashion, built on the power of togetherness and led creatively
            by Fashion Director <strong>Oluchi Irokanulo</strong>. Every piece blends contemporary
            luxury with African influence.
          </p>
          <p style={{ marginTop: 14 }}>
            Our silhouettes balance contemporary elegance with meticulous couture construction:
            internal corsetry, crystal beadwork, sculpted shoulders, and sweeping bridal trains —
            each creation thoughtfully designed and carefully crafted to make the wearer feel
            confident, powerful, feminine, and unapologetically themselves.
          </p>

          <a
            className="shop-text-link"
            style={{ color: '#201f1d', marginTop: 26 }}
            href="#collection"
            onClick={(e) => {
              e.preventDefault();
              playTactileClick();
              onExploreCollection();
            }}
          >
            Explore the collection <ArrowUpRight size={16} />
          </a>

          {/* Heritage milestones — hairline-topped, runway micro-numbered. */}
          <div className="home-milestones">
            {MILESTONES.map(({ label, note }) => (
              <div key={label} className="home-milestone">
                <span>{label}</span>
                <p>{note}</p>
              </div>
            ))}
          </div>

          {/* Consultation — the shop solid bar. */}
          <button
            className="shop-solid-button"
            style={{ marginTop: 30, color: 'white' }}
            onClick={handleCustomOrderWhatsApp}
          >
            <span>Inquire on WhatsApp ({BRAND.whatsappDisplay})</span>
            <ArrowUpRight size={17} />
          </button>
          <span
            className="home-figure-micro"
            style={{ display: 'block', marginTop: 14, textAlign: 'center', width: '100%' }}
          >
            Written invoice · Delivery date agreement · Verified payments
          </span>

          {/* Category quick jumps. */}
          <nav className="home-category-jumps" aria-label="Shop by category">
            {PILLAR_JUMPS.map(({ label, pillar }) => (
              <button key={pillar} onClick={() => handleCategoryJump(pillar)}>
                {label} <span aria-hidden="true">↗</span>
              </button>
            ))}
          </nav>

          <div className="shop-editorial-foot" style={{ paddingTop: 30, marginTop: 0 }}>
            <span>Est. 2016</span>
            <span>Abuja, Nigeria</span>
          </div>
        </div>

        {/* Image column — monumental portrait with the shop page's overlay
            artifacts: italic serif note, corner tag, then the studio floor. */}
        <div className="home-editorial-image">
          <div
            className="home-editorial-figure home-editorial-portrait"
            role="button"
            tabIndex={0}
            aria-label="Explore the collection"
            onClick={() => {
              playTactileClick();
              onExploreCollection();
            }}
            onKeyDown={figureKeyDown(onExploreCollection)}
          >
            <img
              src="/images/campaign/editorial-gold-mini.jpeg"
              srcSet={buildWebPSrcSet('/images/campaign/editorial-gold-mini.jpeg')}
              sizes="(min-width: 1024px) 55vw, 92vw"
              alt="Finaluchi occasion look, photographed on the client"
              onError={onImageError}
            />
            <span className="home-figure-note">Occasion gold, shot on client.</span>
            <span className="home-figure-number">F / 02</span>
          </div>

          <div
            className="home-editorial-figure home-editorial-flatlay"
            role="button"
            tabIndex={0}
            aria-label="Explore the atelier"
            onClick={() => {
              playTactileClick();
              onExploreAtelier();
            }}
            onKeyDown={figureKeyDown(onExploreAtelier)}
          >
            <img
              src="/images/campaign/craft-flatlay.jpeg"
              srcSet={buildWebPSrcSet('/images/campaign/craft-flatlay.jpeg')}
              sizes="(min-width: 1024px) 55vw, 92vw"
              alt="Finaluchi pieces laid out with accessories"
              onError={onImageError}
            />
            <span className="home-figure-number">F / 03</span>
          </div>
          <span className="home-figure-micro">From the studio floor — Abuja atelier</span>
        </div>

      </div>
    </section>
  );
};
