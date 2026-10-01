import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Product } from '../../types';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatPriceWithDisplay } from '../../utils/formatters';
import { buildWebPSrcSet, onImageError, webpVariant } from '../../utils/images';
import { useModalA11y } from '../../lib/useModalA11y';

interface RunwayModeModalProps { isOpen: boolean; onClose: () => void; products: Product[]; onSelectProduct: (product: Product) => void; }
export const RunwayModeModal: React.FC<RunwayModeModalProps> = ({ isOpen, onClose, products, onSelectProduct }) => {
  const [index, setIndex] = useState(0);
  const { displayCurrency } = useCurrencyStore();
  const { playRunwayWhoosh } = useAudioStore();
  const featured = products.filter(p => p.isFeatured || p.availability === 'ATELIER_EDITION');
  const looks = (featured.length ? featured : products).filter(p => p.colorways.length > 0);
  const activeIndex = looks.length ? index % looks.length : 0;
  const product = looks[activeIndex];
  const colorway = product?.colorways.find(c => c.isDefault) || product?.colorways[0];
  const panelRef = useModalA11y<HTMLDivElement>({ onClose, isOpen });
  useEffect(() => {
    if (!isOpen || looks.length < 2) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      playRunwayWhoosh();
      setIndex(i => (i + (e.key === 'ArrowRight' ? 1 : -1) + looks.length) % looks.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, looks.length, playRunwayWhoosh]);
  if (!isOpen) return null;
  const move = (direction: number) => { playRunwayWhoosh(); setIndex(i => (i + direction + looks.length) % looks.length); };
  return (
    <div ref={panelRef} role="dialog" aria-modal="true" aria-label="Finaluchi Runway" tabIndex={-1} className="runway-room">
      <header className="runway-header"><div><span className="runway-wordmark">FINALUCHI</span><span className="couture-signature">Couture</span></div><span className="runway-header-label">The private runway</span><button onClick={onClose} aria-label="Exit Runway Mode"><X size={21} /></button></header>
      {product && colorway ? <>
        <div className="runway-stage">
          <div className="runway-narrative"><span className="shop-eyebrow">The Finaluchi silhouette</span><h2>A study<br />in <em>presence.</em></h2><p>A closer look at the pieces.<br />A different way to discover.</p><span className="runway-large-number" aria-hidden="true">{String(activeIndex + 1).padStart(2, '0')}</span></div>
          <div className="runway-photo" key={product.id}><img src={colorway.heroImageUrl} srcSet={buildWebPSrcSet(colorway.heroImageUrl)} sizes="(min-width: 900px) 40vw, 90vw" alt={product.name} onError={onImageError} /><span>FINALUCHI / LOOK {String(activeIndex + 1).padStart(2, '0')}</span></div>
          <div className="runway-details" aria-live="polite"><span className="shop-eyebrow">{product.categoryName} / {String(activeIndex + 1).padStart(2, '0')}</span><h3>{product.name}</h3><p>{product.headline}</p><span className="runway-price">{formatPriceWithDisplay(product.basePriceKobo, displayCurrency)}</span><button className="runway-shop-button" onClick={() => { onSelectProduct(product); onClose(); }}>Discover this look <ArrowUpRight size={19} /></button><span className="runway-detail-note">Explore details, colours & your perfect fit</span></div>
        </div>
        <footer className="runway-footer"><div className="runway-controls"><button aria-label="Previous Look" disabled={looks.length < 2} onClick={() => move(-1)}><ChevronLeft size={19} /></button><span>{String(activeIndex + 1).padStart(2, '0')} <i>/ {String(looks.length).padStart(2, '0')}</i></span><button aria-label="Next Look" disabled={looks.length < 2} onClick={() => move(1)}><ChevronRight size={19} /></button></div><div className="runway-thumbnails" aria-label="Choose a runway look">{looks.map((look, i) => <button key={look.id} aria-label={`Show look ${i + 1}: ${look.name}`} aria-pressed={i === activeIndex} onClick={() => setIndex(i)}><img src={webpVariant((look.colorways.find(c => c.isDefault) || look.colorways[0]).heroImageUrl, 480)} alt="" onError={onImageError} /></button>)}</div><span className="runway-key-hint">← → to explore / esc to leave</span></footer>
      </> : <div className="runway-empty"><h2>The next runway is taking shape.</h2><p>Come back soon to discover the collection.</p></div>}
    </div>
  );
};
