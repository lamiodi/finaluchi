// FINALUCHI COLLECTIONS — named drops that group products in the catalog.
// Products opt in via `collectionId` (see types/index.ts); the collection's
// raw/photo drop folder lives at public/images/collections/<slug>/ while each
// product's final media lives in its own public/images/products/<slug>/ folder.

export interface Collection {
  id: string;
  name: string; // e.g. "The Recall Collection"
  season: string; // e.g. "2024/25 Autumn Drop"
  title: string; // display line, e.g. "The Recall Collection · 2024/25 Autumn Drop"
  slug: string;
  description: string;
  coverImageUrl?: string; // TODO(product): set when the drop's campaign photo lands
  // True only once every piece in the drop has its photos committed to
  // frontend/public/images/products/ (flip it in the same pass that turns the
  // pieces' isFeatured on). Until then the homepage presents the photographed
  // capsule instead — a collection reel of crest placeholders reads as a
  // broken shop.
  photographed?: boolean;
}

export const MASTER_COLLECTIONS: Collection[] = [
  {
    id: 'recall-aw2425',
    name: 'The Recall Collection',
    season: '2024/25 Autumn Drop',
    title: 'The Recall Collection · 2024/25 Autumn Drop',
    slug: 'the-recall-collection-2024-25-autumn-drop',
    description:
      'Five evening pieces released together as the 2024/25 Autumn Drop — the Sloane, the Boss Set, the Fantasia, the Elizabeth and the Teresa.',
    photographed: false, // photos pending — the home reel presents the photographed capsule until they land
  },
];

export const getCollectionById = (id?: string): Collection | undefined =>
  MASTER_COLLECTIONS.find((c) => c.id === id);
