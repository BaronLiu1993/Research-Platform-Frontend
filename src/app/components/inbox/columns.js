"use client";

import { Button } from "@/shadcomponents/ui/button";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shadcomponents/ui/composedialog";

import { ArrowUpDown, Trash2Icon, Pencil } from "lucide-react";

import { Checkbox } from "@/shadcomponents/ui/checkbox";
import DraftEditor from "./editor/draftEditor";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";

const generateColumns = (
  access,
  onRemove,
  pendingDelete,
  handleSelectedRows,
  userName,
  userEmail,
  selectedRows = []
) => [
  {
    accessorKey: "checkbox",
    header: ({ column }) => <Checkbox />,
    cell: ({ row }) => {
      const data = row.original;
      const isSelected = selectedRows.some((r) => r.id === data.id);

      return (
        <>
          <Checkbox
            checked={isSelected}
            onCheckedChange={() =>
              handleSelectedRows({
                id: data.id,
                professor_id: data.professor_id,
                email: data.professor_email,
                name: data.professor_name,
              })
            }
          />
        </>
      );
    },
    size: 280,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-main font-semibold text-sm text-[#787774] px-2 py-1 -ml-2  tracking-wider"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        name
        <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-gray-400" />
      </Button>
    ),
    cell: ({ row }) => {
      const data = row.original || {};
      return (
        <div className="flex flex-col w-full py-2.5 group pr-4 hover:bg-gray-50 -mx-3 px-3 rounded-md transition-colors duration-150">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="flex-grow min-w-0">
              <h1 className="text-xs font-medium text-[#37352F]">
                {data.professor_name || "No name"}
              </h1>
            </div>
          </div>
        </div>
      );
    },
    size: 280,
  },
  {
    accessorKey: "email",
    size: 140,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-main font-semibold text-sm text-[#787774] px-2 py-1 -ml-2 tracking-wider"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        email
        <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-gray-400" />
      </Button>
    ),
    cell: ({ row }) => {
      const data = row.original || {};
      return (
        <div className="flex flex-col w-full py-2.5 group hover:bg-gray-50 -mx-3 px-3 rounded-md transition-colors duration-150">
          <span className="text-xs font-medium text-[#37352F] truncate">
            {data.professor_email}
          </span>
        </div>
      );
    },
  },
];

export default generateColumns;
