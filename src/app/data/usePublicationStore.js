import { create } from 'zustand'

export const usePublicationStore = create((set) => ({
  selectedPublication: '',
  setSelectedPublication: (text) => set({ selectedPublication: text }),
  clearPublication: () => set({ selectedPublication: '' }),
}))