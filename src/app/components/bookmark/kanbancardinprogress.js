"use client"; 

import Link from "next/link";
import {
  X,
  Calendar,
  Briefcase, // Changed from Wrench for "department" if more fitting, or keep Wrench
  MoreHorizontal, // Changed from EllipsisVertical for a more Notion-like card menu trigger
  Pencil, // Changed from PencilLine for consistency
  ExternalLink,
  Paperclip, // For Resume/CV if it's a file
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel, // Not used in this design
  // DropdownMenuSeparator, // Can be added if more items appear
  DropdownMenuTrigger,
} from "@/shadcomponents/ui/dropdown-menu";

import { Badge } from "@/shadcomponents/ui/badge"; // Assuming this is your shadcn/ui Badge

// Helper for formatting date if needed, e.g., using date-fns
// import { format } from 'date-fns';

export default function KanbanCardInProgress({
  title,
  url,
  school,
  faculty,
  department,
  email,
  research_interests,
  date,
}) {
  const formattedDate = date ? new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }) : "N/A";

  return (
    <div className="rounded-md bg-white w-full p-3.5 font-sans">
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-semibold text-gray-800 text-sm leading-tight break-words">
          {title || "Untitled Application"}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md focus:outline-none">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white shadow-xl border border-gray-200 rounded-md w-48 text-sm">
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:bg-gray-50 cursor-pointer">
              <Pencil className="h-3.5 w-3.5 text-gray-500" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 cursor-pointer">
              <X className="h-3.5 w-3.5" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {school && <p className="text-xs text-gray-500 mb-1.5">{school}</p>}
      {faculty && <p className="text-xs text-gray-500 mb-2">{faculty}</p>}


      <div className="space-y-1.5 text-xs text-gray-600 mb-3">
        {department && (
          <p className="flex items-center">
            <Briefcase className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
            {department}
          </p>
        )}
        <p className="flex items-center">
          <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
          Added: {formattedDate}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <Link 
          href={{
            pathname: `/resume/${title}`,
            query: {research_interests: research_interests, professor_email: email, professor_name: title}
          }}
          className="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md">
          <Paperclip className="h-3 w-3" />
          Apply
        </Link>
        {url && (
          <Link href={url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md">
            <ExternalLink className="h-3 w-3" />
            Professor
          </Link>
        )}
      </div>
    </div>
  );
}