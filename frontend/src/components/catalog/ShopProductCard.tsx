import React, { useState } from 'react';
import { ArrowUpRight, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCurrencyStore } from '../../stores/currencyStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { formatPriceWithDisplay } from '../../utils/formatters';
import { buildWebPSrcSet, onImageError } from '../../utils/images';

export const ShopProductCard: React.FC<{ product: Product; onSelectProduct: (product: Product) => void; priority?: boolean }> = ({ product, onSelectProduct, priority }) => {
  const [colorIndex, setColorIndex] = useState(() => Math.max(0, product.colorways.findIndex(c => c.isDefault)));
  const colorway = product.colorways[colorIndex] || product.colorways[0];
  const { displayCurrency } = useCurrencyStore();
  const { savedEdits, toggleProductInEdit } = useWishlistStore();
  const saved = savedEdits.some(edit => edit.productIds.includes(product.id));
  const alternate = colorway?.mediaGalleryUrls.find(url => url !== colorway.heroImageUrl);
  return (
    <article className="shop-piece">
      <div className="shop-piece-photo">
        <button className="shop-piece-image-button" onClick={() => onSelectProduct(product)} aria-label={`View ${product.name}`}>
          <img src={colorway?.heroImageUrl} srcSet={buildWebPSrcSet(colorway?.heroImageUrl || '')} sizes="(min-width: 1100px) 30vw, 48vw" alt={product.name} loading={priority ? 'eager' : 'lazy'} onError={onImageError} />
          {alternate && <img className="shop-piece-alternate" src={alternate} srcSet={buildWebPSrcSet(alternate)} sizes="(min-width: 1100px) 30vw, 48vw" alt={`${product.name}, another angle`} loading="lazy" onError={onImageError} />}
          <span className="shop-piece-discover">Discover the piece <ArrowUpRight size={17} /></span>
        </button>
        <span className="shop-piece-label">{product.availability === 'ATELIER_EDITION' ? 'Atelier edition' : product.availability === 'MADE_TO_ORDER' ? 'Made to order' : product.isFeatured ? 'The house edit' : product.categoryName}</span>
        <button className={`shop-piece-save ${saved ? 'is-saved' : ''}`} aria-label={`${saved ? 'Unsave' : 'Save'} ${product.name}`} aria-pressed={saved} onClick={() => toggleProductInEdit('edit-default', product.id)}><Heart size={17} fill={saved ? 'currentColor' : 'none'} /></button>
      </div>
      <div className="shop-piece-caption">
        <span className="shop-piece-category">{product.categoryName}</span>
        <div className="shop-piece-title"><h2><button onClick={() => onSelectProduct(product)}>{product.name}</button></h2><span>{formatPriceWithDisplay(product.basePriceKobo, displayCurrency)}</span></div>
        <div className="shop-piece-colors"><span>{colorway?.color.name}</span><div>{product.colorways.map((cw, index) => <button key={cw.id} aria-label={`${product.name} in ${cw.color.name}`} aria-pressed={index === colorIndex} onClick={() => setColorIndex(index)} title={cw.color.name}><i style={{ background: cw.color.hexCode }} /></button>)}</div></div>
      </div>
    </article>
  );
};
