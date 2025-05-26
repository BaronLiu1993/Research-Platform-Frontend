"use client";

import { useState } from "react";
import Link from "next/link"; // Import Link from Next.js
import { useRouter } from "next/navigation"; // Import useRouter for programmatic navigation
import { Button } from "@/shadcomponents/ui/button";
import { toast } from "sonner";
import { useAppliedStore } from "@/app/store/useAppliedStore";
import { saveToApply } from "../bookmark/saveToApply"; // Your server action for saving
// Lucide Icons
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
  professor_email, // Make sure this prop is passed from parent components
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter
  const appliedStore = useAppliedStore((state) => state.appliedStore);
  const addApplied = useAppliedStore((state) => state.addAppliedStore);
  const removeApplied = useAppliedStore((state) => state.removeAppliedStore); // Assuming you have this action

  const alreadyApplied = appliedStore.includes(professor_id);

  // This function handles the actual saving/re-saving of application data to the backend
  const handleSaveApplication = async () => {
    setLoading(true);
    try {
      await saveToApply({ // Pass as an object as per previous fix
        professor_id,
        professor_name,
        professor_url,
        professor_research_interests,
        professor_school,
        professor_faculty,
        professor_department,
        user_id,
        comments: "", // Assuming comments are part of saveToApply, can be empty
      });
      toast.success("Application submitted successfully!");
      return true; // Indicate success
    } catch (error) {
      console.error("Failed to submit application:", error);
      toast.error("Failed to submit application. Please try again.");
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  // This function is called when the initial "Apply" button is clicked.
  // It triggers the save and then redirects.
  const handleInitialApplyAndRedirect = async (event) => {
    // Prevent the default Link navigation immediately
    if (event) event.preventDefault();

    // If already applied, this button shouldn't be visible/clickable, but as a safeguard
    if (alreadyApplied) return;

    const success = await handleSaveApplication(); // Perform the save action
    if (success) {
      addApplied(professor_id); // Optimistically update Zustand store
      router.push(applyPageUrl.pathname + '?' + new URLSearchParams(applyPageUrl.query).toString()); // Programmatically navigate
    }
  };

  // This function handles "Reapply" from the dropdown.
  // It re-saves the application and then redirects.
  const handleReapplyAndRedirect = async () => {
    const success = await handleSaveApplication(); // Perform the re-save action
    if (success) {
      // No need to add to appliedStore, it's already there
      router.push(applyPageUrl.pathname + '?' + new URLSearchParams(applyPageUrl.query).toString()); // Programmatically navigate
    }
  };

  // This function handles "Delete" from the dropdown.
  const handleDeleteApplication = async () => {
    setLoading(true); // Show loading state for the delete action
    try {
      // TODO: Implement your backend API call to delete the application
      // Example: await deleteApplicationApi(professor_id, user_id);
      console.log(`Deleting application for professor ID: ${professor_id}`);
      removeApplied(professor_id); // Update Zustand store
      toast.info("Application removed.");
    } catch (error) {
      console.error("Failed to delete application:", error);
      toast.error("Failed to remove application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Construct the URL for the application page
  const applyPageUrl = {
    pathname: `/resume/${encodeURIComponent(professor_name)}`,
    query: {
      research_interests: professor_research_interests || [],
      professor_email: professor_email || '', // Ensure it's never undefined
      professor_name: professor_name,
      professor_id: professor_id,
    },
  };

  // Render the "Applied" button with dropdown if already applied
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
            disabled={loading} // Disable if any dropdown action is pending
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
            // Call the reapply handler directly on MenuItem click
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

  // Render the initial "Apply" button (not yet applied)
  return (
    // Wrap the Button in a Link. The Button's onClick will prevent default navigation
    // and handle the save, then router.push will navigate after success.
    <Link href={applyPageUrl} passHref>
      <Button
        className={`border cursor-pointer max-h-[1.5rem] transition-transform duration-150
          bg-gray-50 text-orange-400 hover:bg-gray-100
          ${loading ? "scale-95" : "hover:scale-105"}`}
        variant="outline"
        size="sm"
        onClick={handleInitialApplyAndRedirect} // Call the handler that saves and redirects
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