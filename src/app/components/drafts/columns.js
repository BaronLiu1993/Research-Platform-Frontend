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

const generateColumns = (
  access,
  onRemove,
  pendingDelete,
  handleSelectedRows,
  userName,
  userEmail
) => [
  {
    accessorKey: "checkbox",
    header: ({ column }) => <Checkbox />,
    cell: ({ row }) => {
      const data = row.original;
      console.log(data)
      return (
        <>
          <Checkbox
            onCheckedChange={() =>
              handleSelectedRows({
                id: data.professor_id,
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
        <div className="cursor-pointer flex flex-col w-full py-2.5 group pr-4 hover:bg-gray-50 -mx-3 px-3 rounded-md transition-colors duration-150">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="flex-grow min-w-0">
              <h1 className="text-xs font-medium text-[#37352F] group-hover:text-blue-600 transition-colors">
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
        className="font-main font-semibold text-sm text-[#787774] px-2 py-1 -ml-2  tracking-wider"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        email
        <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-gray-400" />
      </Button>
    ),
    cell: ({ row }) => {
      const data = row.original || {};
      return (
        <div className="cursor-pointer flex flex-col w-full py-2.5 group hover:bg-gray-50 -mx-3 px-3 rounded-md transition-colors duration-150">
          <span className="text-xs font-medium text-[#37352F] group-hover:text-blue-600 transition-colors truncate">
            {data.professor_email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "drafts",
    header: () => <div />,
    cell: ({ row }) => {
      const data = row.original || {};
      return (
        <div className="flex justify-end items-center h-full pr-1">
          <Dialog>
            <DialogTrigger className="flex gap-2 text-xs font-medium bg-orange-400 hover:bg-orange-500 cursor-pointer p-2 rounded-md text-white transition-colors truncate">
              <Pencil className="stroke-1 h-4 w-4" />
              Edit Draft
            </DialogTrigger>
            <DialogContent>
              <DialogTitle></DialogTitle>
              <DraftEditor
                access={access}
                draftId={data.draft_id}
                userName={userName}
                userEmail={userEmail}
              />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
    size: 90,
    enableSorting: false,
  },
  {
    accessorKey: "delete",
    header: () => <div />,
    cell: ({ row }) => {
      const data = row.original || {};
      const isDeleting = pendingDelete.has(data.professor_id);
      return (
        <div className="flex justify-end items-center h-full pr-1">
          <button
            disabled={isDeleting}
            aria-disabled={isDeleting}
            onClick={() => onRemove(data.professor_id)}
          >
            <Trash2Icon className="stroke-1 h-4 w-4 hover:text-red-700 cursor-pointer" />
          </button>
        </div>
      );
    },
    size: 90,
    enableSorting: false,
  },
];

export default generateColumns;
