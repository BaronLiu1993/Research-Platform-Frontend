import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSelectedSnippetStore = create(
  persist(
    (set, get) => ({
      selectedSnippets: [],

      setSelectedSnippets: (vars) => set({ selectedSnippets: vars }),

      addSelectedVariable: (variable) => {
        const current = get().selectedSnippets;
        if (!current.includes(variable)) {
          set({ selectedSnippets: [...current, variable] });
        }
      },

      removeSelectedSnippets: (variable) =>
        set((state) => ({
          selectedSnippets: state.selectedSnippets.filter(
            (v) => v !== variable
          ),
        })),

      clearSelectedVariables: () => set({ selectedSnippets: [] }),
    }),
    {
      name: "selected-variables-store",
    }
  )
);
