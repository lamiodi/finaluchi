import React, { useState } from 'react';
import { ArrowUpRight, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useAudioStore } from '../../stores/audioStore';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { formatPriceWithDisplay } from '../../utils/formatters';
import { buildWebPSrcSet, onImageError } from '../../utils/images';

interface SeparatesShowcaseProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSeeMore: (category: string) => void;
}

/* A salon piece card — the runway room's card face: charcoal photo ground,
 * numbered look tag, champagne keylines, serif caption. */
const SalonPiece: React.FC<{
  product: Product;
  look: number;
  onSelectProduct: (product: Product) => void;
}> = ({ product, look, onSelectProduct }) => {
  const [colorIndex, setColorIndex] = useState(() =>
    Math.max(0, product.colorways.findIndex((c) => c.isDefault)),
  );
  const colorway = product.colorways[colorIndex] || product.colorways[0];
  const { displayCurrency } = useCurrencyStore();
  const { savedEdits, toggleProductInEdit } = useWishlistStore();
  const saved = savedEdits.some((edit) => edit.productIds.includes(product.id));
  const alternate = colorway?.mediaGalleryUrls.find((url) => url !== colorway?.heroImageUrl);

  return (
    <article className="salon-piece">
      <div className="salon-piece-photo">
        <button
          className="salon-piece-image-button"
          onClick={() => onSelectProduct(product)}
          aria-label={`View ${product.name}`}
        >
          <img
            src={colorway?.heroImageUrl}
            srcSet={buildWebPSrcSet(colorway?.heroImageUrl || '')}
            sizes="(min-width: 1100px) 25vw, 48vw"
            alt={product.name}
            loading={look <= 2 ? 'eager' : 'lazy'}
            onError={onImageError}
          />
          {alternate && (
            <img
              className="salon-piece-alternate"
              src={alternate}
              srcSet={buildWebPSrcSet(alternate)}
              sizes="(min-width: 1100px) 25vw, 48vw"
              alt={`${product.name}, another angle`}
              loading="lazy"
              onError={onImageError}
            />
          )}
          <span className="salon-piece-discover">
            Discover the piece <ArrowUpRight size={17} />
          </span>
        </button>
        <span className="salon-piece-tag">
          {product.availability === 'ATELIER_EDITION'
            ? 'Atelier edition'
            : product.availability === 'MADE_TO_ORDER'
              ? 'Made to order'
              : `Finaluchi / Set ${String(look).padStart(2, '0')}`}
        </span>
        <button
          className={`salon-piece-save ${saved ? 'is-saved' : ''}`}
          aria-label={`${saved ? 'Unsave' : 'Save'} ${product.name}`}
          aria-pressed={saved}
          onClick={() => toggleProductInEdit('edit-default', product.id)}
        >
          <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="salon-piece-caption">
        <span className="salon-piece-category">{product.categoryName}</span>
        <div className="salon-piece-title">
          <h3>
            <button onClick={() => onSelectProduct(product)}>{product.name}</button>
          </h3>
          <span>{formatPriceWithDisplay(product.basePriceKobo, displayCurrency)}</span>
        </div>
        <div className="salon-piece-colors">
          <span>{colorway?.color.name}</span>
          <div>
            {product.colorways.map((cw, index) => (
              <button
                key={cw.id}
                aria-label={`${product.name} in ${cw.color.name}`}
                aria-pressed={index === colorIndex}
                onClick={() => setColorIndex(index)}
                title={cw.color.name}
              >
                <i style={{ background: cw.color.hexCode }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export const SeparatesShowcase: React.FC<SeparatesShowcaseProps> = ({
  products,
  onSelectProduct,
  onSeeMore,
}) => {
  const { playTactileClick } = useAudioStore();
  const separatesProducts = products.slice(4, 8);

  return (
    <section className="salon-section" aria-label="Sets and separates">
      <div className="salon-inner">

        {/* Salon heading — champagne eyebrow, serif display with italic,
             piece count and the archive link to the right. */}
        <div className="salon-heading">
          <div>
            <span className="salon-eyebrow">Coordinated ensembles</span>
            <h2>
              Sets &amp; <em>separates.</em>
            </h2>
          </div>
          <div className="salon-heading-side">
            <span className="salon-count" role="status">
              {separatesProducts.length}{' '}
              {separatesProducts.length === 1 ? 'piece' : 'pieces'}
            </span>
            <a
              className="salon-text-link"
              href="#sets"
              onClick={(e) => {
                e.preventDefault();
                playTactileClick();
                onSeeMore('2PIECES');
              }}
            >
              Explore sets <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* Salon grid. */}
        <div className="salon-grid">
          {separatesProducts.map((product) => (
            <SalonPiece
              key={product.id}
              product={product}
              look={separatesProducts.indexOf(product) + 1}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
