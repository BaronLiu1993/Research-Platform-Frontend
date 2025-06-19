import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAISnippetStore = create(
  persist(
    (set, get) => ({
      selectedAISnippets: [],

      setAISnippets: (vars) => set({ selectedAISnippets: vars }),

      addAISnippets: (variable) => {
        const current = get().selectedAISnippets;
        if (!current.includes(variable)) {
          set({ selectedAISnippets: [...current, variable] });
        }
      },

      removeAISnippets: (variable) =>
        set((state) => ({
          selectedAISnippets: state.selectedAISnippets.filter(
            (v) => v !== variable
          ),
        })),

      clearAISnippets: () => set({ selectedAISnippets: [] }),
    }),
    {
      name: "selected-AI-snippet-store",
    }
  )
);
