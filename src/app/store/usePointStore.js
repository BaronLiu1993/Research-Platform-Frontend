import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePointStore = create(
  persist(
    (set) => ({
      loadedResumePoints: [],
      addResumePoint: (point) =>
        set((state) => ({
          loadedResumePoints: [...state.loadedResumePoints, point],
        })),
      removeResumePoint: (point) =>
        set((state) => ({
          loadedResumePoints: state.loadedResumePoints.filter((p) => p !== point),
        })),
      resetPoints: () => set({ loadedResumePoints: [] }),
    }),
    {
      name: 'resume-points-storage', 
    }
  )
);
