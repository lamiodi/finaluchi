import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product, ProductCategory } from '../../types';
import { useAudioStore } from '../../stores/audioStore';
import { useCurrencyStore } from '../../stores/currencyStore';
import { formatPriceWithDisplay } from '../../utils/formatters';
import { MASTER_CATALOG } from '../../data/catalog';
import { getCollectionById } from '../../data/collections';
import { CoverflowReel, type CoverflowReelItem } from '../ui/coverflow-reel';

interface OccasionEditsBarProps {
  onSelectCategory?: (category: ProductCategory) => void;
  onSelectOccasion?: (occasion: any) => void;
  onSelectProduct?: (product: Product) => void;
}

export const OccasionEditsBar: React.FC<OccasionEditsBarProps> = ({
  onSelectCategory,
  onSelectOccasion,
  onSelectProduct
}) => {
  const { playTactileClick } = useAudioStore();
  const { displayCurrency } = useCurrencyStore();

  const handleNavigate = (catId: ProductCategory | 'ALL') => {
    playTactileClick();
    if (onSelectCategory) {
      onSelectCategory(catId as any);
    } else if (onSelectOccasion) {
      onSelectOccasion(catId as any);
    }
  };

  // The home stage only presents a collection once its photography is
  // committed (`photographed` in collections.ts). Until then it shows the
  // clothes that exist: the photographed capsule pieces. Both mappings
  // share one card face so the two presentations read identically the day
  // the drop's photos land.
  const collection = getCollectionById('recall-aw2425');
  const presentCollection = !!collection?.photographed;

  const toReelItem = (p: (typeof MASTER_CATALOG)[number]): CoverflowReelItem => ({
    src: p.colorways[0]?.heroImageUrl,
    alt: `${p.name} — ${p.headline}`,
    label: p.name,
    sublabel: formatPriceWithDisplay(p.basePriceKobo, displayCurrency),
  });

  const collectionProducts = collection
    ? MASTER_CATALOG.filter((p) => p.collectionId === collection.id)
    : [];
  const capsuleProducts = MASTER_CATALOG.filter((p) => p.isFeatured);

  const reelProducts = presentCollection ? collectionProducts : capsuleProducts;
  const reelItems: CoverflowReelItem[] = reelProducts.map(toReelItem);
  const eyebrow = presentCollection
    ? `${collection!.season} · ${reelItems.length} Pieces`
    : `The Capsule · ${reelItems.length} Pieces`;
  const heading = presentCollection ? collection!.name : 'Find Your Finaluchi Piece';
  const description = presentCollection
    ? `${collection!.description} Prices from ₦105,000.`
    : 'Five ready-to-wear pieces — dresses, jumpsuits, tops, skirts and lounge sets — photographed on the Finaluchi client.';
  const ctaLabel = presentCollection ? 'Shop the Collection' : 'Shop the Capsule';

  return (
    <section className="relative w-full overflow-hidden bg-noir text-white">

      {/* Section Header */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-8 sm:pb-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="flex flex-col items-start text-left gap-4 max-w-2xl">
            <span className="text-[10px] sm:text-[11px] font-mono-luxury uppercase tracking-[0.3em] text-champagne font-medium block">
              {eyebrow}
            </span>
            <h2 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[1.02]">
              {heading}
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed tracking-normal">
              {description}
            </p>
          </div>
          <div className="md:pb-1">
            <button
              onClick={() => handleNavigate('ALL')}
              className="btn-luxury group inline-flex items-center gap-2.5 px-7 py-3 bg-white text-noir text-[11px] font-sans-luxury font-semibold uppercase tracking-widest hover:bg-champagne-light transition-all rounded-xs shadow-sm hover:gap-3.5"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Coverflow stage — the active piece faces the viewer at full
          brightness while the rest of the capsule recedes in rotation;
          committing to a piece (active card or caption) opens its page. */}
      <CoverflowReel
        items={reelItems}
        aria-label={`${heading} — ${reelItems.length} pieces`}
        className="pb-10 sm:pb-14"
        onSelect={(i) => {
          const product = reelProducts[i];
          if (!product) return;
          playTactileClick();
          onSelectProduct?.(product);
        }}
      />

    </section>
  );
};
