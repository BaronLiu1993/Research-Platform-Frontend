import { create } from "zustand";

export const useLoadingStore = create((set) => ({
  status: "saved", 
  setStatus: (s) => set({ status: s }),
}));
