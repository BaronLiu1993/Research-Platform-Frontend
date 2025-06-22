"use client";

import { removeFromSaved } from "../api/removeFromSaved";
import { Save } from "../api/save";

import { Button } from "@/shadcomponents/ui/button";
import { useSavedStore } from "@/app/store/useSavedStore";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SaveButton({
  professor_id,
  professor_name,
  professor_url,
  professor_email,
  professor_research_interests,
  professor_school,
  professor_faculty,
  professor_department,
  professor_labs,
  professor_lab_url,
  user_id,
}) {
  const saved = useSavedStore((state) => state.savedStore);
  const addSaved = useSavedStore((state) => state.addSavedStore);
  const removeSaved = useSavedStore((state) => state.removeSavedStore);

  const [loading, setLoading] = useState(false);
  const isSaved = saved.includes(professor_id);

  const handleToggle = async () => {
    setLoading(true);
    try {
      if (isSaved) {
        removeSaved(professor_id);
        const result = await removeFromSaved(professor_id, user_id);
        toast.success("Professor removed from saved.");
      } else {
        addSaved(professor_id);
        console.log(professor_email)
        await Save(
          professor_id,
          professor_name,
          professor_url,
          professor_email,
          professor_research_interests,
          professor_school,
          professor_faculty,
          professor_department,
          professor_labs,
          professor_lab_url,
          user_id,
          ""
        );

        toast.success("Professor saved.");
      }
    } catch (error) {
      if (isSaved) {
        addSaved(professor_id);
        toast.error("Failed to remove professor.");
      } else {
        removeSaved(professor_id);
        toast.error("Failed to save professor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
}
