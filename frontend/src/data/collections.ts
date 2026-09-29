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
  },
];

export const getCollectionById = (id?: string): Collection | undefined =>
  MASTER_COLLECTIONS.find((c) => c.id === id);
