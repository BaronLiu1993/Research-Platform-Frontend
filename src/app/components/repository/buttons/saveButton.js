"use client";

import { useState } from "react";

import { useSavedStore } from "@/app/store/useSavedStore";
import { RemoveFromSaved } from "@/app/api/save/removeFromSaved";
import { AddToSaved } from "@/app/api/save/addToSaved";

import { Button } from "@/shadcomponents/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";

export default function SaveButton({
  professorData,
  access,
  isRecommendations = false,
}) {
  let id = 0;
  if (isRecommendations) {
    id = professorData.professor_id;
  } else {
    id = professorData.id;
  }

  const saved = useSavedStore((state) => state.savedStore);
  const addSaved = useSavedStore((state) => state.addSavedStore);
  const removeSaved = useSavedStore((state) => state.removeSavedStore);
  const [loading, setLoading] = useState(false);
  const isSaved = saved.includes(id);

  const handleToggle = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);
    try {
      if (isSaved) {
        removeSaved(id);
        await RemoveFromSaved({
          id,
          access,
        });
        toast.success("Professor Removed.");
      } else {
        addSaved(id);
        await AddToSaved({ id, professorData, access });
        toast.success("Professor Saved.");
      }
    } catch (error) {
      if (isSaved) {
        addSaved(id);
        toast.error("Failed to remove professor.");
      } else {
        removeSaved(id);
        toast.error("Failed to save professor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {
        <Button
          className={`cursor-pointer max-h-[1.5rem] rounded-xs mb-2 ${
            isSaved
              ? "bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-600"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-600"
          }`}
          size="sm"
          onClick={handleToggle}
          disabled={loading}
        >
          {isSaved ? (
            <BookmarkCheck className="w-3 h-3 mr-1" />
          ) : (
            <Bookmark className="w-3 h-3 mr-1" />
          )}
          <span className="text-xs">{isSaved ? "Saved" : "Save"}</span>
        </Button>
      }
    </>
  );
}
