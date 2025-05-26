"use client";

import { Button } from "@/shadcomponents/ui/button";
import { FileCheck, FileUser } from "lucide-react";
import { toast } from "sonner";
import { saveToApply } from "../bookmark/saveToApply";
import { useAppliedStore } from "@/app/store/useAppliedStore";
import { useState } from "react";

export default function ApplyButton({
  professor_id,
  professor_name,
  professor_url,
  professor_research_interests,
  professor_school,
  professor_faculty,
  professor_department,
  user_id,
}) {
  const [loading, setLoading] = useState(false);
  const appliedStore = useAppliedStore((state) => state.appliedStore);
  const addApplied = useAppliedStore((state) => state.addAppliedStore);

  const alreadyApplied = appliedStore.includes(professor_id);

  const handleToggle = async () => {
    if (alreadyApplied) return;

    setLoading(true);
    try {
      await saveToApply(
        professor_id,
        professor_name,
        professor_url,
        professor_research_interests,
        professor_school,
        professor_faculty,
        professor_department,
        user_id
      );
      addApplied(professor_id);
      toast.success("Applied to Professor.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className={`border cursor-pointer max-h-[1.5rem] transition-transform duration-150 ${
        alreadyApplied
          ? "bg-orange-100 text-orange-600"
          : "bg-gray-50 text-orange-400"
      } ${loading ? "scale-95" : "hover:scale-105"}`}
      variant="outline"
      size="sm"
      onClick={handleToggle}
      disabled={loading || alreadyApplied}
    >
      {alreadyApplied ? (
        <FileCheck className="w-3 h-3 mr-1" />
      ) : (
        <FileUser className="w-3 h-3 mr-1" />
      )}
      <span className="text-xs">{alreadyApplied ? "Applied" : "Apply"}</span>
    </Button>
  );
}
