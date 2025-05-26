import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppliedStore = create(
  persist(
    (set) => ({
      appliedStore: [],
      setAppliedStore: (professors) => set({ appliedStore: professors }),
      addAppliedStore: (point) =>
        set((state) => ({
          appliedStore: [...state.appliedStore, point],
        })),
      removeAppliedStore: (point) =>
        set((state) => ({
          appliedStore: state.appliedStore.filter((p) => p !== point),
        })),
      resetPoints: () => set({ appliedStore: [] }),
    }),
    {
      name: "applied-professors-storage",
    }
  )
);
