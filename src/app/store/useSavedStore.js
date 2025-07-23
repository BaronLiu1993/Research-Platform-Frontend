import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSavedStore = create(
  persist(
    (set) => ({
      savedStore: [],
      setSavedStore: (professors) => set({ savedStore: professors }),
      addSavedStore: (point) =>
        
        set((state) => ({
          savedStore: [...state.savedStore, point],
        })),
      removeSavedStore: (point) =>
        set((state) => ({
          savedStore: state.savedStore.filter((p) => p !== point),
        })),
      resetPoints: () => set({ savedStore: [] }),
    }),
    {
      name: "saved-professors-storage",
    }
  )
);
