"use client";

import { Button } from "@/shadcomponents/ui/button";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shadcomponents/ui/composedialog";

import { Trash2Icon, Pencil } from "lucide-react";

import { Checkbox } from "@/shadcomponents/ui/checkbox";
import DraftEditor from "./editor/draftEditor";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
const deleteDraft = async ({ access, draftId }) => {
  const id = toast.loading("Deleting...");

  try {
    const deleteRes = await fetch(
      `${API_BASE}/email/delete-draft?draftId=${draftId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    toast.dismiss(id);

    if (deleteRes.ok) {
      toast.success("Deleted!");
      return { success: true };
    } else {
      toast.error("Failed to Delete!");
      return { success: false };
    }
  } catch (e) {
    toast.dismiss(id);
    toast.error("Failed to Delete!");
    return { success: false };
  }
};

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
    header: ({ column }) => <div></div>,
    cell: ({ row }) => {
      const data = row.original;
      const isSelected = selectedRows.some((r) => r.id === data.id);

      return (
        <>
          <Checkbox
            checked={isSelected}
            className="h-3 w-3 sm:h-4 sm:w-4 cursor-pointer bg-gray-50 border-2 border-gray-700 rounded-xs"
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
                professorEmail={data.professor_email}
                professorName={data.professor_name}
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
      const isDeleting = pendingDelete.has(data.id);
      return (
        <div className="flex justify-end items-center h-full pr-1">
          <button
            disabled={isDeleting}
            aria-disabled={isDeleting}
            onClick={async (e) => {
              e.stopPropagation();
              onRemove(data.id);
              await deleteDraft({ access, draftId: data.draft_id });
            }}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2Icon className="stroke-1 h-4 w-4 hover:text-red-700 cursor-pointer transition-colors" />
          </button>
        </div>
      );
    },
    size: 90,
    enableSorting: false,
  },
];

export default generateColumns;
