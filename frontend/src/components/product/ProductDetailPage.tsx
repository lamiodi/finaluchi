import React, { useState } from 'react';
import {
  Heart, ShoppingBag, Ruler, Plus, Minus,
  RotateCw, Share2, Calendar, ArrowUpRight, MessageCircle
} from 'lucide-react';
import { Product, ProductColorway } from '../../types';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useAudioStore } from '../../stores/audioStore';
import { formatPriceWithDisplay, isPlaceholderSpec } from '../../utils/formatters';
import { onImageError, buildWebPSrcSet, isVideoMedia } from '../../utils/images';
import { SizeGuideModal } from '../common/SizeGuideModal';
import { ShopProductCard } from '../catalog/ShopProductCard';
import { toast } from 'sonner';
import { ORDER_CLARITY_NOTE, buildWhatsAppUrl } from '../../data/brand';
import { getCollectionById } from '../../data/collections';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onBackToCatalog: () => void;
  onBookAppointment: () => void;
}

// Sizes come from the product's own variants (e.g. UK 6–18, S–L);
// the lettered scale is only a fallback for products without variants.
const sizeOptionsFor = (product: Product): string[] => {
  const sizes = (product.variants || [])
    .filter((v) => v.size !== 'MADE_TO_MEASURE' && v.sizeLabel !== 'MADE_TO_MEASURE')
    .map((v) => v.sizeLabel || v.size || '')
    .filter(Boolean);
  return sizes.length > 0 ? sizes : ['XXS', 'XS', 'S', 'M', 'L', 'XL'];
};

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onSelectProduct,
  onBackToCatalog,
  onBookAppointment,
}) => {
  const [selectedColorway, setSelectedColorway] = useState<ProductColorway>(
    product.colorways.find((c) => c.isDefault) || product.colorways[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(() => sizeOptionsFor(product)[0] || 'M');
  const [isMadeToMeasure, setIsMadeToMeasure] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [is360Active, setIs360Active] = useState<boolean>(false);
  const [rotationFrameIndex, setRotationFrameIndex] = useState<number>(0);
  const [isDragging360, setIsDragging360] = useState<boolean>(false);
  const [startX360, setStartX360] = useState<number>(0);

  const { displayCurrency } = useCurrencyStore();
  const { addToCart } = useCartStore();
  const { savedEdits, toggleProductInEdit } = useWishlistStore();
  const { playTactileClick, playSuccessChime } = useAudioStore();

  const isSaved = savedEdits.some((e) => e.productIds.includes(product.id));

  // Price follows the selected size tier — variants may carry priceDeltaKobo
  // (e.g. Boss Set UK 14–18) on top of the base price and colourway delta.
  const selectedVariant = product.variants?.find((v) => (v.sizeLabel || v.size) === selectedSize);
  const displayPriceKobo =
    product.basePriceKobo +
    (selectedColorway.priceDeltaKobo || 0) +
    (isMadeToMeasure ? 0 : selectedVariant?.priceDeltaKobo || 0);
  const collection = getCollectionById(product.collectionId);

  // 360 Rotation Frames
  const frames = selectedColorway.rotationFrameUrls?.length > 0
    ? selectedColorway.rotationFrameUrls
    : [selectedColorway.heroImageUrl];

  const handleMouseDown360 = (e: React.MouseEvent) => {
    setIsDragging360(true);
    setStartX360(e.clientX);
  };

  const handleMouseMove360 = (e: React.MouseEvent) => {
    if (!isDragging360 || frames.length <= 1) return;
    const delta = e.clientX - startX360;
    if (Math.abs(delta) > 20) {
      const step = delta > 0 ? 1 : -1;
      setRotationFrameIndex((prev) => (prev + step + frames.length) % frames.length);
      setStartX360(e.clientX);
    }
  };

  const handleMouseUp360 = () => {
    setIsDragging360(false);
  };

  const handleAddToCart = () => {
    playSuccessChime();
    addToCart(product, selectedColorway, selectedSize, 1, isMadeToMeasure);
    toast.success(`${product.name} (${selectedColorway.color.name}) added to your bag.`);
  };

  const handleWhatsAppInquiry = () => {
    playTactileClick();
    const message = [
      'Hello Finaluchi Couture, I would like to inquire about this piece:',
      product.name,
      `Colour: ${selectedColorway.color.name} (${selectedColorway.color.code})`,
      `Size: ${isMadeToMeasure ? 'Custom / Made to Measure' : selectedSize}`,
      `Listed price: ${formatPriceWithDisplay(displayPriceKobo, displayCurrency)}`,
      '',
      'Before proceeding with payment, please confirm:',
      '1. Itemized written invoice & production schedule',
      '2. Confirmed delivery date for my location',
      '3. Measurement confirmation guidance',
      '4. Alteration allowance & refund policy',
      '5. Traceable business account details',
    ].join('\n');
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const recommendations = allProducts
    .filter((p) => p.id !== product.id && (p.pillar === product.pillar || product.completeTheLookProductIds?.includes(p.id)))
    .slice(0, 4);

  return (
    <div className="shop-page min-h-screen pb-4">

      {/* Breadcrumb */}
      <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
        <button onClick={onBackToCatalog}>Collections</button>
        <span aria-hidden="true">/</span>
        <span>{product.pillar.replace('_', ' ')}</span>
        <span aria-hidden="true">/</span>
        <span className="is-here">{product.name}</span>
      </nav>

      {/* Lookbook + purchase rail */}
      <div className="pdp-split">

        {/* Left: vertical lookbook gallery */}
        <div className="pdp-gallery">

          {product.has360Rotation && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#7c7164' }}>
                <RotateCw size={14} style={{ color: '#846548' }} /> Interactive 360° view
              </span>
              <a
                className="shop-text-link"
                style={{ color: '#201f1d', gap: 10, padding: '6px 0 4px', fontSize: 10 }}
                href="#rotate"
                onClick={(e) => {
                  e.preventDefault();
                  playTactileClick();
                  setIs360Active(!is360Active);
                }}
              >
                {is360Active ? 'Exit 360°' : 'Drag to rotate'} <ArrowUpRight size={13} />
              </a>
            </div>
          )}

          {is360Active ? (
            <div
              className="pdp-360-canvas"
              onMouseDown={handleMouseDown360}
              onMouseMove={handleMouseMove360}
              onMouseUp={handleMouseUp360}
              onMouseLeave={handleMouseUp360}
            >
              <img
                src={frames[rotationFrameIndex] || selectedColorway.heroImageUrl}
                alt={`${product.name} 360 view`}
                onError={onImageError}
              />
              <span className="salon-stage-chip" style={{ background: '#faf9f6e8', color: '#201f1d' }}>
                Angle {String(rotationFrameIndex + 1).padStart(2, '0')} / {String(frames.length).padStart(2, '0')} · Drag horizontally
              </span>
            </div>
          ) : (
            selectedColorway.mediaGalleryUrls.map((mediaUrl, i) => (
              <div key={i} className="pdp-figure">
                {isVideoMedia(mediaUrl) ? (
                  <video
                    src={mediaUrl}
                    controls
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={mediaUrl}
                    srcSet={buildWebPSrcSet(mediaUrl)}
                    sizes="(min-width: 1024px) 55vw, 92vw"
                    alt={`${product.name} — angle ${i + 1}`}
                    onError={onImageError}
                  />
                )}
                <span className="pdp-figure-tag">F / {String(i + 1).padStart(2, '0')}</span>
                {i === 0 && (
                  <span className="pdp-figure-note">{product.name}.</span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Right: sticky purchase rail */}
        <div className="pdp-rail">

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <span className="pdp-label" style={{ margin: 0 }}>
              {product.categoryName} · {selectedColorway.sku}
            </span>
            <span style={{ display: 'inline-flex', gap: 10 }}>
              <button
                onClick={() => {
                  playTactileClick();
                  toggleProductInEdit('edit-default', product.id);
                }}
                aria-pressed={isSaved}
                aria-label={isSaved ? 'Unsave piece' : 'Save piece'}
                style={{
                  width: 40, height: 40, display: 'grid', placeItems: 'center',
                  border: '1px solid #dcd8d0', borderRadius: '50%', color: isSaved ? '#faf9f6' : '#201f1d',
                  background: isSaved ? '#201f1d' : 'transparent',
                }}
              >
                <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success('Piece share link copied to clipboard.');
                }}
                aria-label="Share piece"
                style={{
                  width: 40, height: 40, display: 'grid', placeItems: 'center',
                  border: '1px solid #dcd8d0', borderRadius: '50%', color: '#201f1d',
                }}
              >
                <Share2 size={16} />
              </button>
            </span>
          </div>

          {collection && (
            <span className="pdp-label" style={{ marginTop: 14, color: '#846548' }}>
              {collection.title}
            </span>
          )}

          <h1 className="pdp-title">{product.name}</h1>
          <p style={{ fontSize: 13, lineHeight: 1.9, color: '#69645e', marginTop: 14 }}>
            {product.headline}
          </p>

          <div className="pdp-price">
            {formatPriceWithDisplay(displayPriceKobo, displayCurrency)}
            <span className="pdp-label" style={{ marginTop: 8, fontSize: 8, letterSpacing: '.16em' }}>
              Confirm availability &amp; measurements before payment
            </span>
          </div>

          {/* Colour */}
          <div style={{ marginTop: 30 }}>
            <span className="pdp-label">
              Colour — {selectedColorway.color.name}
              {selectedColorway.isMadeToOrder ? ' · made to order' : ''}
            </span>
            <div className="pdp-swatch-row" role="group" aria-label="Choose colour">
              {product.colorways.map((cw) => (
                <button
                  key={cw.id}
                  onClick={() => {
                    playTactileClick();
                    setSelectedColorway(cw);
                  }}
                  aria-pressed={cw.id === selectedColorway.id}
                  aria-label={`${cw.color.code} — ${cw.color.name}`}
                  title={`${cw.color.code} — ${cw.color.name}`}
                >
                  <i
                    style={{
                      background: cw.color.hexCode,
                      opacity: cw.isSoldOut ? 0.35 : 1,
                    }}
                  />
                </button>
              ))}
            </div>
            <span style={{ display: 'block', fontSize: 10, color: '#8b8378', marginTop: 10 }}>
              {selectedColorway.color.lusterDescription}
            </span>
          </div>

          {/* Size */}
          <div style={{ marginTop: 28 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14 }}>
              <span className="pdp-label">Select size</span>
              <a
                className="shop-text-link"
                style={{ color: '#201f1d', gap: 8, fontSize: 9, padding: '2px 0' }}
                href="#size-guide"
                onClick={(e) => {
                  e.preventDefault();
                  playTactileClick();
                  setIsSizeGuideOpen(true);
                }}
              >
                <Ruler size={12} /> Size guide
              </a>
            </div>
            <div className="pdp-sizes" role="group" aria-label="Choose size">
              {sizeOptionsFor(product).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    playTactileClick();
                    setSelectedSize(s);
                    setIsMadeToMeasure(false);
                  }}
                  aria-pressed={selectedSize === s && !isMadeToMeasure}
                >
                  {s}
                </button>
              ))}
            </div>
            {product.isMadeToMeasureAllowed && (
              <button
                className="pdp-mtm"
                onClick={() => {
                  playTactileClick();
                  setIsMadeToMeasure(true);
                  setSelectedSize('MADE_TO_MEASURE');
                }}
                aria-pressed={isMadeToMeasure}
              >
                <span>Custom / made to measure</span>
                <ArrowUpRight size={15} />
              </button>
            )}
          </div>

          {/* Actions */}
          <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <button
              onClick={handleAddToCart}
              className="shop-solid-button"
              style={{ marginTop: 0, justifyContent: 'center', padding: '18px 20px' }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                <ShoppingBag size={15} /> Add to bag
              </span>
              <span style={{ fontSize: 13 }}>{formatPriceWithDisplay(displayPriceKobo, displayCurrency)}</span>
            </button>

            <a
              className="shop-text-link"
              style={{ color: '#201f1d', justifyContent: 'space-between', width: '100%', padding: '10px 0 8px' }}
              href="#inquire"
              onClick={(e) => {
                e.preventDefault();
                handleWhatsAppInquiry();
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <MessageCircle size={14} /> Ask about this piece on WhatsApp
              </span>
              <ArrowUpRight size={15} />
            </a>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #e4dfd6' }}>
              <span className="pdp-label" style={{ margin: 0 }}>Abuja atelier direct</span>
              <a
                className="shop-text-link"
                style={{ color: '#846548', gap: 8, fontSize: 9, padding: '2px 0' }}
                href="#fitting"
                onClick={(e) => {
                  e.preventDefault();
                  playTactileClick();
                  onBookAppointment();
                }}
              >
                <Calendar size={12} /> Request a fitting <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          {/* Craft & materiality — unconfirmed specs stay hidden, never shown as fact */}
          <div style={{ marginTop: 30, paddingTop: 22, borderTop: '1px solid #dcd8d0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="pdp-label" style={{ margin: 0 }}>Craft &amp; materiality</span>
              <span style={{ fontSize: 10, color: '#8b8378' }}>{product.fabricIntelligence.weightGsm} GSM</span>
            </div>
            {(!isPlaceholderSpec(product.fabricIntelligence.material) || !isPlaceholderSpec(product.fabricIntelligence.composition)) && (
              <div className="pdp-meta" style={{ marginTop: 14 }}>
                {!isPlaceholderSpec(product.fabricIntelligence.material) && (
                  <div>
                    <span className="pdp-label" style={{ fontSize: 8 }}>Material</span>
                    <b>{product.fabricIntelligence.material}</b>
                  </div>
                )}
                {!isPlaceholderSpec(product.fabricIntelligence.composition) && (
                  <div>
                    <span className="pdp-label" style={{ fontSize: 8 }}>Composition</span>
                    <b>{product.fabricIntelligence.composition}</b>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Accordions */}
          <div style={{ marginTop: 26 }}>
            <details className="pdp-accordion" open>
              <summary>
                Design &amp; fit details
                <Plus size={13} className="pdp-acc-plus" />
                <Minus size={13} className="pdp-acc-minus" />
              </summary>
              <div className="pdp-accordion-body">
                <p>{product.description}</p>
                <p style={{ marginTop: 10, color: '#201f1d' }}>{product.atelierNotes}</p>
              </div>
            </details>
            <details className="pdp-accordion">
              <summary>
                Delivery &amp; alterations
                <Plus size={13} className="pdp-acc-plus" />
                <Minus size={13} className="pdp-acc-minus" />
              </summary>
              <div className="pdp-accordion-body">
                <p>{ORDER_CLARITY_NOTE}</p>
                <p style={{ marginTop: 10 }}><strong>Itemized written invoice:</strong> every order is backed by an itemized written invoice stating garment specifications, fabric details, confirmed delivery date, and agreed price.</p>
                <p style={{ marginTop: 8 }}><strong>Delivery timelines:</strong> production timelines and transit dates are agreed in writing before cutting. Nationwide Nigerian delivery is handled via vetted dispatch/couriers; international orders are fulfilled via express DHL/FedEx.</p>
                <p style={{ marginTop: 8 }}><strong>Fittings &amp; alterations:</strong> ready-to-wear pieces may be exchanged within 48 hours in unworn original condition. Custom bespoke garments receive dedicated fitting consultations and complimentary alteration adjustments at our Abuja studio or through guided virtual fitting reviews.</p>
              </div>
            </details>
            <details className="pdp-accordion">
              <summary>
                Care instructions
                <Plus size={13} className="pdp-acc-plus" />
                <Minus size={13} className="pdp-acc-minus" />
              </summary>
              <div className="pdp-accordion-body">
                <p>{product.fabricIntelligence.careInstructions}</p>
              </div>
            </details>
          </div>

        </div>
      </div>

      {/* More pieces */}
      <div className="pdp-recs">
        <div className="shop-collection-heading">
          <div>
            <span className="shop-eyebrow" style={{ color: '#7c7164' }}>Editorial curation</span>
            <h2 style={{ font: "400 43px/1.15 'Antic Didone', serif", marginTop: 9 }}>
              More Finaluchi <em style={{ color: '#846548', fontStyle: 'italic' }}>pieces.</em>
            </h2>
          </div>
          <a
            className="shop-text-link"
            style={{ color: '#201f1d' }}
            href="#collection"
            onClick={(e) => {
              e.preventDefault();
              onBackToCatalog();
            }}
          >
            View the collection <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="pdp-recs-grid" style={{ marginTop: 36 }}>
          {recommendations.map((rec) => (
            <ShopProductCard
              key={rec.id}
              product={rec}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        onSelectMadeToMeasure={() => {
          setIsMadeToMeasure(true);
          setSelectedSize('MADE_TO_MEASURE');
        }}
      />

    </div>
  );
};
