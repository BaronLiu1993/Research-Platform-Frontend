"use client";

import { AtSign, Clipboard, LayoutPanelLeft, LetterText, MoreHorizontal } from "lucide-react";
import { Button } from "@/shadcomponents/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcomponents/ui/dropdown-menu";
import { Checkbox } from "@/shadcomponents/ui/checkbox";
import { ArrowUpDown } from "lucide-react";

export const SavedColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className = ""
      />
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
    id: "actions",
    cell: ({ row }) => {
      const action = row.original;
      return (
        <DropdownMenu className="font-main p-0">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-3 w-3 text-[#787774]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="font-main" align="end">
            <DropdownMenuLabel className="text-xs text-medium text-[#787774]">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="font-main text-xs cursor-pointer"
              onClick={() => navigator.clipboard.writeText(action.lab_url)}
            >
              <Clipboard className="h-3 w-3" />
              <span>Copy Professor Lab Link</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          className="text-xs font-semibold font-main text-[#787774] flex items-center gap-2"
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
