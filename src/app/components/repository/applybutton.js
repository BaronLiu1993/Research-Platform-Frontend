"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/shadcomponents/ui/button";
import { toast } from "sonner";
import { useAppliedStore } from "@/app/store/useAppliedStore";
import { saveToApply } from "../bookmark/saveToApply"; 
import { FilePenLine, CheckCircle, MoreHorizontal, Trash2, Repeat, Loader2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcomponents/ui/dropdown-menu";

export default function ApplyButton({
  professor_id,
  professor_name,
  professor_url,
  professor_research_interests,
  professor_school,
  professor_faculty,
  professor_department,
  user_id,
  professor_email, 
}) {
  const [loading, setLoading] = useState(false);
  const appliedStore = useAppliedStore((state) => state.appliedStore);
  const addApplied = useAppliedStore((state) => state.addAppliedStore);
  const removeApplied = useAppliedStore((state) => state.removeAppliedStore); 
  const alreadyApplied = appliedStore.includes(professor_id);
  const handleInitialApply = async (event) => {
    if (event) event.preventDefault();

    if (alreadyApplied) return; 

    setLoading(true);
    try {
      await saveToApply({
        professor_id,
        professor_name,
        professor_url,
        professor_research_interests,
        professor_school,
        professor_faculty,
        professor_department,
        user_id,
        comments: "", 
      });
      addApplied(professor_id); 
      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApplication = async () => {
    setLoading(true); 
    try {
      // TODO: Implement your backend API call to delete the application
      removeApplied(professor_id); 
      toast.info("Application removed.");
    } catch (error) {
      console.error("Failed to delete application:", error);
      toast.error("Failed to remove application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const applyPageUrl = {
    pathname: `/resume/${encodeURIComponent(professor_name)}`,
    query: {
      research_interests: professor_research_interests,
      professor_email: professor_email,
      professor_name: professor_name,
      professor_id: professor_id,
    },
  };

  if (alreadyApplied) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={`border cursor-pointer max-h-[1.5rem] transition-transform duration-150 
              bg-green-100 text-green-600 hover:bg-green-200 
              ${loading ? "scale-95" : "hover:scale-105"}`}
            variant="outline"
            size="sm"
            disabled={loading} 
          >
            {loading ? (
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            ) : (
              <CheckCircle className="w-3 h-3 mr-1" />
            )}
            <span className="text-xs">Applied</span>
            <MoreHorizontal className="w-3 h-3 ml-1 text-green-700" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 font-sans text-sm shadow-md rounded-md overflow-hidden bg-white border border-gray-100">
          <DropdownMenuItem
            className="cursor-pointer flex items-center gap-2 hover:bg-gray-50 focus:bg-gray-50 data-[state=open]:bg-gray-50 text-gray-700"
            onSelect={(e) => {
                e.preventDefault();
            }}
          >
            <Link href={applyPageUrl} className="flex items-center gap-2 w-full py-1.5"
                  onClick={handleInitialApply} 
            >
              <Repeat className="h-4 w-4 text-gray-500" />
              Reapply
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex items-center gap-2 text-red-600 hover:bg-red-50 focus:bg-red-50 data-[state=open]:bg-red-50"
            onClick={handleDeleteApplication}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      className={`border cursor-pointer max-h-[1.5rem] transition-transform duration-150 
        bg-gray-50 text-gray-400 hover:bg-gray-100 
        ${loading ? "scale-95" : "hover:scale-105"}`}
      variant="outline"
      size="sm"
      onClick={handleInitialApply}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
      ) : (
        <FilePenLine className="w-3 h-3 mr-1" />
      )}
      <span className="text-xs">Apply</span>
    </Button>
  );
}