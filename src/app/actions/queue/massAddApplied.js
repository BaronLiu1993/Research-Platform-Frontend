"use client";

import { useAppliedStore } from "@/app/store/useAppliedStore";
import { useSavedStore } from "@/app/store/useSavedStore";

export const MassAddApplied = async (dynamicIds) => {
  const addApplied = useAppliedStore.getState().addAppliedStore;
  const removeSaved = useSavedStore.getState().removeSavedStore;

  for (const data of dynamicIds) {
    addApplied(data.id);
    removeSaved(data.id);
  }
};
