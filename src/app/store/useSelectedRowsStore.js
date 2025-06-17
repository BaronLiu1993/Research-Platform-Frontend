import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSelectedVariablesStore = create(
  persist(
    (set, get) => ({
      selectedVariables: [],

      setSelectedVariables: (vars) => set({ selectedVariables: vars }),

      addSelectedVariable: (variable) => {
        const current = get().selectedVariables;
        set({ selectedVariables: [...current, variable] });
      },

      // Remove one variable
      removeSelectedVariable: (variable) =>
        set((state) => ({
          selectedVariables: state.selectedVariables.filter(
            (v) => v !== variable
          ),
        })),

      clearSelectedVariables: () => set({ selectedVariables: [] }),
    }),
    {
      name: "selected-variables-store",
    }
  )
);
