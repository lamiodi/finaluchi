import { create } from 'zustand';
import { SavedEdit } from '../types';

interface WishlistState {
  savedEdits: SavedEdit[];
  activeEditId: string;
  createEdit: (title: string, description?: string) => SavedEdit;
  removeEdit: (editId: string) => void;
  toggleProductInEdit: (editId: string, productId: string) => void;
  isProductSaved: (productId: string) => boolean;
  getEditByShareToken: (token: string) => SavedEdit | undefined;
  getShareableLink: (editId: string) => string;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  savedEdits: [
    {
      id: 'edit-default',
      title: 'Curated Wishlist',
      name: 'Curated Wishlist',
      description: 'Private selections from the current collection.',
      isPublic: true,
      shareToken: 'edit-tok-fc-2026-curated',
      productIds: ['prod-01', 'prod-02'],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'edit-gala',
      title: 'Venice Biennale & Gala 2026',
      name: 'Venice Biennale & Gala 2026',
      description: 'Sculptural silhouettes for international red carpet occasions.',
      isPublic: true,
      shareToken: 'edit-tok-fc-2026-venice',
      productIds: ['prod-01', 'prod-08', 'prod-04'],
      createdAt: new Date().toISOString(),
    }
  ],
  activeEditId: 'edit-default',

  createEdit: (title, description) => {
    const newEdit: SavedEdit = {
      id: `edit-${Date.now()}`,
      title,
      name: title,
      description,
      isPublic: true,
      shareToken: `edit-tok-fc-${Math.random().toString(36).substr(2, 8)}`,
      productIds: [],
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ savedEdits: [newEdit, ...state.savedEdits], activeEditId: newEdit.id }));
    return newEdit;
  },

  removeEdit: (editId) => {
    set((state) => ({
      savedEdits: state.savedEdits.filter((e) => e.id !== editId),
    }));
  },

  toggleProductInEdit: (editId, productId) => {
    set((state) => {
      const updatedEdits = state.savedEdits.map((edit) => {
        if (edit.id === editId) {
          const exists = edit.productIds.includes(productId);
          const newIds = exists
            ? edit.productIds.filter((id) => id !== productId)
            : [...edit.productIds, productId];
          return { ...edit, productIds: newIds };
        }
        return edit;
      });
      return { savedEdits: updatedEdits };
    });
  },

  isProductSaved: (productId) => {
    return get().savedEdits.some((edit) => edit.productIds.includes(productId));
  },

  getEditByShareToken: (token) => {
    return get().savedEdits.find((edit) => edit.shareToken === token);
  },

  getShareableLink: (editId) => {
    const edit = get().savedEdits.find((e) => e.id === editId);
    return edit ? `https://finaluchi.com/edit/${edit.shareToken}` : 'https://finaluchi.com';
  },
}));
