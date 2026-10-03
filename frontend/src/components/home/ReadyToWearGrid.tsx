import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../../types';
import { useAudioStore } from '../../stores/audioStore';
import { ShopProductCard } from '../catalog/ShopProductCard';

interface ReadyToWearGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSeeMore: () => void;
}

export const ReadyToWearGrid: React.FC<ReadyToWearGridProps> = ({
  products,
  onSelectProduct,
  onSeeMore,
}) => {
  const { playTactileClick } = useAudioStore();

  return (
    <section id="the-capsule-section" className="shop-page" aria-label="The capsule">
      <div className="shop-collection">

        {/* Collection heading — shop pattern: eyebrow, serif display,
            piece count, and the archive link set to the right. */}
        <div className="shop-collection-heading">
          <div>
            <span className="shop-eyebrow" style={{ color: '#7c7164' }}>
              Maison curation · Ready-to-wear
            </span>
            <h2>The Capsule</h2>
            <p
              className="home-figure-micro"
              style={{ display: 'block', marginTop: 12, maxWidth: 430, lineHeight: 1.8 }}
            >
              House prints, hand-mounted rosettes, easy jersey and the Recall
              Collection's evening pieces — every ready-to-wear piece,
              photographed on the Finaluchi client.
            </p>
          </div>
          <span className="shop-result-count" role="status">
            {products.length} {products.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>

        {/* Piece grid — the shop card itself, five across on the wide page. */}
        <div className="home-capsule-grid" style={{ borderTop: '1px solid #dcd8d0', paddingTop: 38 }}>
          {products.map((product, index) => (
            <ShopProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              priority={index < 2}
            />
          ))}
        </div>

        {/* Archive link — shop text-link with the travelling arrow. */}
        <div style={{ marginTop: 46, display: 'flex', justifyContent: 'center' }}>
          <a
            className="shop-text-link"
            style={{ color: '#201f1d', gap: 14 }}
            href="#shop-pieces"
            onClick={(e) => {
              e.preventDefault();
              playTactileClick();
              onSeeMore();
            }}
          >
            Shop the capsule <ArrowUpRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
};
