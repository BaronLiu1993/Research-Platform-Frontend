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
      removeSavedStore: (id) =>
        set((state) => {
          console.log("Before:", state.savedStore);
          console.log("Removing:", id);
          const next = state.savedStore.filter((p) => p !== id);
          console.log("After:", next);
          return { savedStore: next };
        }),
      resetPoints: () => set({ savedStore: [] }),
    }),
    {
      name: "saved-professors-storage",
    }
  )
);
