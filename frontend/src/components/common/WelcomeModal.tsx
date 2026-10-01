import React, { useEffect } from 'react';
import { ArrowUpRight, Calendar, X } from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../../data/brand';
import { onImageError } from '../../utils/images';
import { useModalA11y } from '../../lib/useModalA11y';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Primary CTA — closes the popup and brings the capsule on stage. */
  onDiscoverCapsule: () => void;
  /** Secondary path — hands over to the bespoke appointment modal. */
  onBookFitting: () => void;
}

/* The maison's welcome card — an editorial split that introduces the
 * photographed capsule once per session. Paper world: serif display with
 * a bronze italic, artifact-tagged campaign image, hairline structure,
 * solid-bar CTA. */
export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  onDiscoverCapsule,
  onBookFitting,
}) => {
  const panelRef = useModalA11y<HTMLDivElement>({ onClose, isOpen });

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="welcome-veil">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        tabIndex={-1}
        className="welcome-card shop-page"
      >

        <button onClick={onClose} className="welcome-close" aria-label="Dismiss welcome note">
          <X size={16} />
        </button>

        {/* Campaign face */}
        <div className="welcome-image">
          <img
            src="/images/campaign/editorial-gold-halter.jpeg"
            alt="Finaluchi occasion look, photographed on the client"
            onError={onImageError}
          />
          <span className="welcome-image-tag">F / 01 · Shot on client</span>
          <span className="welcome-image-note">The art of showing up.</span>
        </div>

        {/* Copy face */}
        <div className="welcome-copy">
          <span className="shop-eyebrow" style={{ color: '#7c7164' }}>
            Finaluchi / Abuja atelier
          </span>
          <h2 id="welcome-title">
            The capsule<br />
            <em>has arrived.</em>
          </h2>
          <p>
            Five ready-to-wear pieces — dresses, jumpsuits, tops, skirts and lounge sets —
            photographed on the Finaluchi client and ready to order. Ready-to-wear with an
            atelier conscience: every order confirmed in writing before you pay.
          </p>

          <button
            onClick={onDiscoverCapsule}
            className="shop-solid-button"
            style={{ marginTop: 28, color: 'white' }}
          >
            <span>Discover the capsule</span>
            <ArrowUpRight size={16} />
          </button>

          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a
              className="shop-text-link"
              style={{ color: '#201f1d', gap: 10 }}
              href="#fitting"
              onClick={(e) => {
                e.preventDefault();
                onBookFitting();
              }}
            >
              <Calendar size={13} /> Plan a bespoke fitting instead <ArrowUpRight size={13} />
            </a>
            <a
              className="shop-text-link"
              style={{ color: '#846548', gap: 10, fontSize: 10 }}
              href={buildWhatsAppUrl('Hello Finaluchi Couture, I would like some help choosing a piece.')}
              target="_blank"
              rel="noreferrer"
            >
              Ask the atelier on WhatsApp ({BRAND.whatsappDisplay}) <ArrowUpRight size={12} />
            </a>
          </div>

          <span
            style={{
              display: 'block', marginTop: 'auto', paddingTop: 26, fontSize: 9,
              letterSpacing: '.14em', textTransform: 'uppercase', color: '#9a9285',
            }}
          >
            Considered. Crafted. Yours.
          </span>
        </div>

      </div>
    </div>
  );
};

export default WelcomeModal;
