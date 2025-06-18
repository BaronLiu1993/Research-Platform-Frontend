import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSelectedVariablesStore = create(
  persist(
    (set, get) => ({
      selectedVariables: [],

      setSelectedVariables: (vars) => set({ selectedVariables: vars }),

      addSelectedVariable: (variable) => {
        const current = get().selectedVariables;
        if (!current.includes(variable)) {
          set({ selectedVariables: [...current, variable] });
        }
      },

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
