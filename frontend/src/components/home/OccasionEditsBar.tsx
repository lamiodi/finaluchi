import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCategory } from '../../types';
import { useAudioStore } from '../../stores/audioStore';
import { useCurrencyStore } from '../../stores/currencyStore';
import { formatPriceWithDisplay } from '../../utils/formatters';
import { MASTER_CATALOG } from '../../data/catalog';
import { getCollectionById } from '../../data/collections';
import { HaloReel, type HaloReelItem } from '../ui/halo-reel';

interface OccasionEditsBarProps {
  onSelectCategory?: (category: ProductCategory) => void;
  onSelectOccasion?: (occasion: any) => void;
}

export const OccasionEditsBar: React.FC<OccasionEditsBarProps> = ({
  onSelectCategory,
  onSelectOccasion
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
  // clothes that exist: the photographed capsule pieces, each card labelled
  // with its name and price. Both mappings share one card face so the two
  // presentations read identically the day the drop's photos land.
  const collection = getCollectionById('recall-aw2425');
  const presentCollection = !!collection?.photographed;

  const toReelItem = (p: (typeof MASTER_CATALOG)[number]): HaloReelItem => ({
    src: p.colorways[0]?.heroImageUrl,
    alt: `${p.name} — ${p.headline}`,
    label: p.name,
    sublabel: formatPriceWithDisplay(p.basePriceKobo, displayCurrency),
  });

  const collectionItems: HaloReelItem[] = collection
    ? MASTER_CATALOG.filter((p) => p.collectionId === collection.id).map(toReelItem)
    : [];
  const capsuleItems: HaloReelItem[] = MASTER_CATALOG.filter((p) => p.isFeatured).map(toReelItem);

  const reelItems = presentCollection ? collectionItems : capsuleItems;
  const eyebrow = presentCollection
    ? `${collection!.season} · ${reelItems.length} Pieces`
    : `The Capsule · ${reelItems.length} Pieces`;
  const heading = presentCollection ? collection!.name : 'Find Your Finaluchi Piece';
  const description = presentCollection
    ? `${collection!.description} Prices from ₦105,000.`
    : 'Five ready-to-wear pieces — dresses, jumpsuits, tops, skirts and lounge sets — photographed on the Finaluchi client.';
  const ctaLabel = presentCollection ? 'Shop the Collection' : 'Shop the Capsule';

  return (
    <section className="w-full bg-white border-b border-black/10">

      {/* Section Header */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-8 sm:pb-12">
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <span className="text-[10px] sm:text-[11px] font-mono-luxury uppercase tracking-[0.3em] text-taupe font-medium block">
            {eyebrow}
          </span>
          <h2 className="font-sans-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-noir uppercase leading-[1.02]">
            {heading}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed tracking-normal">
            {description}
          </p>
          <div className="pt-2">
            <button
              onClick={() => handleNavigate('ALL')}
              className="group inline-flex items-center gap-2.5 px-7 py-3 bg-black text-white text-[11px] font-sans-luxury font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all rounded-xs shadow-sm hover:gap-3.5"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Halo Reel — the pieces orbit the house wordmark, each appearing
          exactly once (maxCards caps the ring at the item count, so no photo
          is ever repeated). Drag, swipe or use arrow keys to turn the ring;
          it also turns on its own. */}
      <HaloReel
        items={reelItems}
        aria-label={`${heading} — ${reelItems.length} pieces`}
        cardWidth={150}
        cardHeight={205}
        centerXRatio={0.5}
        radiusXRatio={0.26}
        radiusYRatio={0.27}
        maxCards={reelItems.length}
        holdDuration={1600}
        stepDuration={800}
        centerLabel={
          // The ring nearly fills a phone-width stage, leaving no room to park
          // the wordmark — it only appears once there is space for it (md+).
          <div className="hidden md:block space-y-3">
            <span className="block font-sans-luxury text-2xl sm:text-4xl font-bold uppercase tracking-[0.06em] text-noir leading-none">
              Finaluchi
            </span>
            <span className="block text-[9px] sm:text-[10px] font-mono-luxury uppercase tracking-[0.34em] text-taupe">
              {presentCollection ? collection!.season : 'Ready-to-Wear Capsule'}
            </span>
          </div>
        }
        className="h-[440px] sm:h-[520px] lg:h-[600px]"
      />

    </section>
  );
};
