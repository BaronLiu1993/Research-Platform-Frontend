"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/shadcomponents/ui/button";
import { toast } from "sonner";
import { useAppliedStore } from "@/app/store/useAppliedStore";
import { saveToApply } from "../bookmark/saveToApply";
import {
  FilePenLine,
  CheckCircle,
  MoreHorizontal,
  Trash2,
  Repeat,
  Loader2,
} from "lucide-react";

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
  const router = useRouter();
  const appliedStore = useAppliedStore((state) => state.appliedStore);
  const addApplied = useAppliedStore((state) => state.addAppliedStore);
  const removeApplied = useAppliedStore((state) => state.removeAppliedStore);

  const alreadyApplied = appliedStore.includes(professor_id);

  const handleSaveApplication = async () => {
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
      toast.success("Application submitted successfully!");
      return true;
    } catch (error) {
      console.error("Failed to submit application:", error);
      toast.error("Failed to submit application. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleInitialApplyAndRedirect = async (event) => {
    if (event) event.preventDefault();

    if (alreadyApplied) return;

    const success = await handleSaveApplication();
    if (success) {
      addApplied(professor_id);
      router.push(
        applyPageUrl.pathname +
          "?" +
          new URLSearchParams(applyPageUrl.query).toString()
      );
    }
  };

  const handleReapplyAndRedirect = async () => {
    const success = await handleSaveApplication();
    if (success) {
      router.push(
        applyPageUrl.pathname +
          "?" +
          new URLSearchParams(applyPageUrl.query).toString()
      );
    }
  };

  const handleDeleteApplication = async () => {
    setLoading(true); // Show loading state for the delete action
    try {
      // TODO: Implement your backend API call to delete the application
      console.log(`Deleting application for professor ID: ${professor_id}`);
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
      research_interests: professor_research_interests || [],
      professor_email: professor_email || "",
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
        <DropdownMenuContent
          align="end"
          className="w-40 font-sans text-sm shadow-md rounded-md overflow-hidden bg-white border border-gray-100"
        >
          <DropdownMenuItem
            className="cursor-pointer flex items-center gap-2 hover:bg-gray-50 focus:bg-gray-50 data-[state=open]:bg-gray-50 text-gray-700"
            onClick={handleReapplyAndRedirect}
          >
            <Repeat className="h-4 w-4 text-gray-500" />
            Reapply
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
    <Link href={applyPageUrl} passHref>
      <Button
        className={`border cursor-pointer max-h-[1.5rem] transition-transform duration-150
          bg-gray-50 text-orange-400 hover:bg-gray-100
          ${loading ? "scale-95" : "hover:scale-105"}`}
        variant="outline"
        size="sm"
        onClick={handleInitialApplyAndRedirect}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
        ) : (
          <FilePenLine className="w-3 h-3 mr-1" />
        )}
        <span className="text-xs">Apply</span>
      </Button>
    </Link>
  );
}
