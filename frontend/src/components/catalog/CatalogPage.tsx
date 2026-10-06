import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, SlidersHorizontal, X } from 'lucide-react';
import { OccasionType, Product } from '../../types';
import { CATEGORY_DEPARTMENTS, getDepartmentById } from '../../data/categoryContent';
import { getCollectionById } from '../../data/collections';
import { buildWhatsAppUrl } from '../../data/brand';
import { buildWebPSrcSet, onImageError } from '../../utils/images';
import { ShopProductCard } from './ShopProductCard';

interface CatalogPageProps { products: Product[]; initialPillar?: string; initialOccasion?: OccasionType; initialCollection?: string; onSelectProduct: (product: Product) => void; }
const occasions: { value: OccasionType; label: string }[] = [{ value: 'WEDDING', label: 'Wedding' }, { value: 'GALA_BLACK_TIE', label: 'Gala & black tie' }, { value: 'PRIVATE_DINNER', label: 'Private dinner' }, { value: 'VACATION', label: 'Vacation' }, { value: 'RED_CARPET', label: 'Red carpet' }, { value: 'COCKTAIL_SOIREE', label: 'Cocktail soirée' }];
const palettes = [{ value: 'NEUTRALS_MINERAL', label: 'Neutrals & mineral' }, { value: 'IMPERIAL_JEWEL', label: 'Jewel tones' }, { value: 'METALLIC_SATIN', label: 'Metallics' }, { value: 'SAVANNA_SOLSTICE', label: 'Earth tones' }];

export const CatalogPage: React.FC<CatalogPageProps> = ({ products, initialPillar = 'ALL', initialOccasion, initialCollection = 'ALL', onSelectProduct }) => {
  const [pillar, setPillar] = useState(initialPillar);
  const [occasion, setOccasion] = useState<OccasionType | 'ALL'>(initialOccasion || 'ALL');
  const [palette, setPalette] = useState('ALL');
  const [collection, setCollection] = useState(initialCollection);
  const [sort, setSort] = useState('FEATURED');
  const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => { setPillar(initialPillar); setOccasion(initialOccasion || 'ALL'); setCollection(initialCollection); }, [initialPillar, initialOccasion, initialCollection]);
  const department = getDepartmentById(pillar);
  // Collections that actually have pieces in the catalog, in registry order.
  const collections = useMemo(() => {
    const ids = [...new Set(products.map(p => p.collectionId).filter((id): id is string => !!id))];
    return ids.map(id => getCollectionById(id)).filter((c): c is NonNullable<typeof c> => !!c);
  }, [products]);
  const filtered = useMemo(() => products.filter(p => (pillar === 'ALL' || p.pillar === pillar) && (occasion === 'ALL' || p.occasions.includes(occasion)) && (palette === 'ALL' || p.colorways.some(c => c.color.colorFamily === palette)) && (collection === 'ALL' || p.collectionId === collection)).sort((a, b) => {
    if (sort === 'PRICE_ASC') return a.basePriceKobo - b.basePriceKobo;
    if (sort === 'PRICE_DESC') return b.basePriceKobo - a.basePriceKobo;
    if (sort === 'ATELIER') return Number(b.availability === 'ATELIER_EDITION') - Number(a.availability === 'ATELIER_EDITION');
    return Number(!!b.isFeatured) - Number(!!a.isFeatured);
  }), [products, pillar, occasion, palette, collection, sort]);
  const reset = () => { setPillar('ALL'); setOccasion('ALL'); setPalette('ALL'); setCollection('ALL'); };
  const activeFilters = Number(occasion !== 'ALL') + Number(palette !== 'ALL') + Number(collection !== 'ALL');
  const heroImage = department?.image || '/images/products/rossa-dress/rossa-1.jpeg';
  return (
    <div className="shop-page">
      <section className="shop-editorial">
        <div className="shop-editorial-copy">
          <span className="shop-eyebrow">Finaluchi / The wardrobe</span>
          <h1>{department ? department.label : <>Made for<br />your <em>presence.</em></>}</h1>
          <p>{department?.description || 'Expressive silhouettes. Unmistakable details. Discover ready-to-wear and occasion pieces from our Abuja atelier.'}</p>
          <a className="shop-text-link" href="#shop-pieces" onClick={e => { e.preventDefault(); document.getElementById('shop-pieces')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }}>Explore {department ? department.label.toLowerCase() : 'the collection'} <ArrowDown size={16} /></a>
          <div className="shop-editorial-foot"><span>Designed in Abuja</span><span>Worn your way</span></div>
        </div>
        <div className="shop-editorial-image"><img src={heroImage} srcSet={buildWebPSrcSet(heroImage)} sizes="(min-width: 800px) 45vw, 100vw" alt={department?.label || 'The Rossa Dress in the Finaluchi house print'} fetchPriority="high" onError={onImageError} /><span className="shop-image-note">The art of showing up.</span><span className="shop-image-number">F / 01</span></div>
      </section>
      <section className="shop-collection" id="shop-pieces" aria-label="Shop the collection">
        <div className="shop-collection-heading"><div><span className="shop-eyebrow">Considered pieces. Endless possibilities.</span><h2>{department?.label || 'The collection'}</h2></div><span className="shop-result-count" role="status">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</span></div>
        <div className="shop-toolbar">
          <div className="shop-categories" aria-label="Categories"><button aria-pressed={pillar === 'ALL'} onClick={() => setPillar('ALL')}>All pieces <sup>{products.length}</sup></button>{CATEGORY_DEPARTMENTS.map(cat => <button key={cat.id} aria-pressed={pillar === cat.id} onClick={() => setPillar(cat.id)}>{cat.label}<sup>{products.filter(p => p.pillar === cat.id).length}</sup></button>)}</div>
          <div className="shop-tools"><button className="shop-filter-toggle" aria-expanded={filtersOpen} aria-controls="shop-filters" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={15} /> Filters{activeFilters > 0 && ` (${activeFilters})`}</button><label className="shop-sort"><span className="sr-only">Sort pieces</span><select value={sort} onChange={e => setSort(e.target.value)}><option value="FEATURED">House selection</option><option value="PRICE_ASC">Price: low to high</option><option value="PRICE_DESC">Price: high to low</option><option value="ATELIER">Atelier editions</option></select></label></div>
        </div>
        {collections.length > 0 && (
          <div className="shop-categories shop-collection-row" aria-label="Collections">
            <button aria-pressed={collection === 'ALL'} onClick={() => setCollection('ALL')}>All collections <sup>{products.length}</sup></button>
            {collections.map(c => <button key={c.id} aria-pressed={collection === c.id} onClick={() => setCollection(c.id)}>{c.name}<sup>{products.filter(p => p.collectionId === c.id).length}</sup></button>)}
          </div>
        )}
        {filtersOpen && <div id="shop-filters" className="shop-filters"><label>Dress for the occasion<select value={occasion} onChange={e => setOccasion(e.target.value as OccasionType | 'ALL')}><option value="ALL">All occasions</option>{occasions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></label><label>Find your palette<select value={palette} onChange={e => setPalette(e.target.value)}><option value="ALL">All colours</option>{palettes.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}</select></label><button onClick={reset}>Clear filters <X size={15} /></button></div>}
        {activeFilters > 0 && <div className="shop-active-filters">{collection !== 'ALL' && <button onClick={() => setCollection('ALL')}>{getCollectionById(collection)?.name}<X size={13} /></button>}{occasion !== 'ALL' && <button onClick={() => setOccasion('ALL')}>{occasions.find(o => o.value === occasion)?.label}<X size={13} /></button>}{palette !== 'ALL' && <button onClick={() => setPalette('ALL')}>{palettes.find(p => p.value === palette)?.label}<X size={13} /></button>}</div>}
        {filtered.length ? <div className="shop-grid">{filtered.map((product, index) => <ShopProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} priority={index < 3} />)}</div> : <div className="shop-empty"><span className="shop-eyebrow">A different direction</span><h2>Your next piece is still here.</h2><p>No pieces match this combination. Try another colour or occasion.</p><button className="shop-solid-button" onClick={reset}>Explore all pieces <ArrowUpRight size={17} /></button></div>}
        <aside className="shop-concierge"><div><span className="shop-eyebrow">A personal point of view</span><h2>Let’s find your <em>Finaluchi.</em></h2><p>For sizing, styling or something made especially for you, speak with our atelier.</p></div><a className="shop-text-link" href={buildWhatsAppUrl('Hello Finaluchi Couture, I would love some help choosing a piece.')} target="_blank" rel="noopener noreferrer">Talk to the atelier <ArrowUpRight size={18} /></a></aside>
      </section>
    </div>
  );
};
