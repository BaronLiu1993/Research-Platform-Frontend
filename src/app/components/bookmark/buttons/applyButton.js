"use client";

//API calls
import { Apply } from "../api/apply";
import { removeFromApply } from "../api/removeFromApply";

//other imports
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/shadcomponents/ui/button";
import { toast } from "sonner";
import { useAppliedStore } from "@/app/store/useAppliedStore";
import {
  FilePenLine,
  CheckCircle,
  Repeat,
  Loader2,
  EllipsisVertical,
  Trash2,
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
  professor_email,
  professor_labs, 
  professor_lab_url,
  user_id,
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const appliedStore = useAppliedStore((state) => state.appliedStore);
  const addApplied = useAppliedStore((state) => state.addAppliedStore);
  const removeApplied = useAppliedStore((state) => state.removeAppliedStore);
  const alreadyApplied = appliedStore.includes(professor_id);

  const applyPageUrl = {
    pathname: `/resume/${encodeURIComponent(professor_name)}`,
    query: {
      research_interests: professor_research_interests,
      professor_email: professor_email,
      professor_name: professor_name,
      professor_id: professor_id,
    },
  };

  const handleSaveApplication = async () => {
    setLoading(true);
    try {
      await Apply(
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
      );
      toast.success("Created A New Application!");
      return true;
    } catch (error) {
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
        applyPageUrl.pathname + "?" + new URLSearchParams(applyPageUrl.query).toString()
      );
    }
  };

  const handleReapplyAndRedirect = async () => {
    const success = await handleSaveApplication();
    if (success) {
      router.push(
        applyPageUrl.pathname + "?" + new URLSearchParams(applyPageUrl.query).toString()
      );
    }
  };

  const handleDeleteApplication = async () => {
    setLoading(true);
    try {
      await removeFromApply(user_id, professor_id)
      removeApplied(professor_id);
      toast.info("Application removed.");
    } catch (error) {
      toast.error("Failed to remove application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (alreadyApplied) {
    return (
      <DropdownMenu className = "rounded-xs">
        <DropdownMenuTrigger asChild>
          <Button
            className={`cursor-pointer max-h-[1.5rem] font-noto rounded-xs
              bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-600`}
            size="sm"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            ) : (
              <CheckCircle className="w-3 h-3 mr-1" />
            )}
            <span className="text-xs">Applied</span>
            <EllipsisVertical className="w-3 h-3 ml-1 text-orange-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-40 font-main text-sm shadow-md rounded-md overflow-hidden bg-white border border-gray-100"
        >
          <DropdownMenuItem
            className="cursor-pointer hover:bg-gray-100 text-xs flex items-center gap-2 focus:bg-gray-50 data-[state=open]:bg-gray-50"
            onClick={handleReapplyAndRedirect}
          >
            <Repeat className="h-4 w-4 text-gray-500" />
            Reapply
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-xs flex items-center gap-2 text-red-600 hover:bg-gray-100 data-[state=open]:bg-red-50"
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
        className={`cursor-pointer max-h-[1.5rem]
          bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-600 rounded-xs`}
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