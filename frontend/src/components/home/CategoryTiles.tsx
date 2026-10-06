import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../../types';
import { CATEGORY_DEPARTMENTS } from '../../data/categoryContent';
import { buildWebPSrcSet, onImageError } from '../../utils/images';

interface CategoryTilesProps {
  products: Product[];
  onSelectPillar: (pillar: string) => void;
}

/**
 * "Shop by category" — one visual tile per garment category, photographed
 * from the live catalog, jumping straight into the pre-filtered shop.
 * The Aloz-style wayfinding the client asked for, in the house's editorial
 * voice: paper ground, serif labels, artifact-tagged figures.
 */
export const CategoryTiles: React.FC<CategoryTilesProps> = ({ products, onSelectPillar }) => {
  return (
    <section className="shop-page" aria-label="Shop by category">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <span className="shop-eyebrow">Finaluchi / The wardrobe, organised</span>
            <h2
              style={{
                marginTop: 10,
                font: "400 clamp(30px, 4.2vw, 48px)/1.1 'Antic Didone', serif",
                color: '#201f1d',
              }}
            >
              Shop by <em style={{ color: '#846548' }}>category.</em>
            </h2>
          </div>
          <p style={{ fontSize: 12, lineHeight: 1.9, color: '#69645e', maxWidth: 380 }}>
            Five silhouettes, one house — every piece in the capsule, sorted the way you
            dress: dresses, jumpsuits, tops, skirts and sets.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {CATEGORY_DEPARTMENTS.map((cat, i) => {
            const count = products.filter(p => p.pillar === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectPillar(cat.id)}
                className="group text-left"
                aria-label={`Shop ${cat.label} — ${count} pieces`}
              >
                <div className="home-editorial-figure aspect-[3/4]">
                  <img
                    src={cat.image}
                    srcSet={buildWebPSrcSet(cat.image)}
                    sizes="(min-width: 1024px) 18vw, (min-width: 768px) 30vw, 46vw"
                    alt={`${cat.label} from the Finaluchi capsule`}
                    loading="lazy"
                    decoding="async"
                    onError={onImageError}
                    className="transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="home-figure-number" style={{ top: 12, right: 12 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="absolute bottom-3 left-3 right-3 z-[1] flex items-end justify-between gap-2"
                  >
                    <span
                      style={{
                        font: "400 clamp(17px, 1.6vw, 21px)/1.15 'Antic Didone', serif",
                        color: '#ffffff',
                      }}
                    >
                      {cat.label}
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="text-white/70 group-hover:text-white transition-colors shrink-0"
                    />
                  </span>
                </div>
                <span
                  className="block mt-2.5"
                  style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: '#846548', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {count} {count === 1 ? 'piece' : 'pieces'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
