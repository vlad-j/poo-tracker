import { create } from 'zustand';
import { PACKING_CATEGORIES, PackingCategory } from '../data/sampleData';

interface AppState {
  packingCategories: PackingCategory[];
  togglePackingItem: (categoryName: string, itemId: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  packingCategories: PACKING_CATEGORIES,
  togglePackingItem: (categoryName, itemId) =>
    set((state) => ({
      packingCategories: state.packingCategories.map((cat) =>
        cat.name === categoryName
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, packed: !item.packed } : item
              ),
            }
          : cat
      ),
    })),
  activeTab: 'Home',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
