"use client";

import { AtSign, Clipboard, LayoutPanelLeft, LetterText, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/shadcomponents/ui/checkbox";

export const SavedColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <div className = "flex items-center gap-2 font-semibold">
        
        <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className = ""
      />
      Select All
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          className="text-sm font-main text-[#787774] flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <LetterText className = "h-4 w-4"/>
          Name
        </button>
      );
    },
    cell: ({ row }) => {
      const action = row.original;
      return (
        <div className="flex flex-col text-xs text-[#37352F]">
          <span>{action.name}</span>
          <span>{action.school}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "faculty",
    header: ({ column }) => {
      return (
        <button className="text-xs font-semibold font-main text-[#787774] flex items-center gap-2">
          <AtSign className = "h-4 w-4"/>
          Faculty
        </button>
      );
    },
    cell: ({ row }) => {
      const action = row.original;
      return (
        <div className="flex flex-col text-xs text-[#37352F]">
          <span>{action.faculty}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <button className="text-xs font-semibold font-main text-[#787774] flex items-center gap-2">   
          <LayoutPanelLeft className = "h-4 w-4"/>
          Department
        </button>
      );
    },
    cell: ({ row }) => {
      const action = row.original;
      return (
        <div className="flex flex-col text-xs text-[#37352F]">
          <span>{action.department}</span>
        </div>
      );
    },
  },
];
