import { create } from "zustand";

export const useSelectedRowsStore = create((set) => ({
  selectedRows: [],
  setSelectedRows: (rows) => set({ selectedRows: rows }),
  clearSelectedRows: () => set({ selectedRows: [] }),
}));
