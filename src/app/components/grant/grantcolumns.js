"use client";

import { AtSign, LetterText, SquareArrowOutUpRight, Timer } from "lucide-react";

export const GrantColumns = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          className="text-xs font-main text-[#787774] flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <LetterText className="h-4 w-4" />
          Name
        </button>
      );
    },
    cell: ({ row }) => {
      const action = row.original;
      return (
        <div className="flex flex-col text-xs text-[#37352F]">
          <span>{action.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <button className="text-xs font-semibold font-main text-[#787774] flex items-center gap-2">
          <AtSign className="h-4 w-4" />
          Value
        </button>
      );
    },
    cell: ({ row }) => {
      const action = row.original;
      return (
        <div className="flex flex-col text-xs text-[#37352F]">
          <span>{action.value}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => {
      return (
        <button className="text-xs font-semibold font-main text-[#787774] flex items-center gap-2">
          <Timer className="h-4 w-4" />
          Due Date
        </button>
      );
    },
    cell: ({ row }) => {
      const action = row.original;
      return (
        <div className="flex flex-col text-sm text-black font-bold ">
          <span>
            {new Date(action.due_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      );
    },
  },
  {
    id: "select",
    cell: ({ row }) => {
      const action = row.original;
      return (
        <>
            <a href = {action.link}>
            <SquareArrowOutUpRight className="text-gray-500 p-1 border-1 rounded-xs shadow-sm" />

            </a>
        </>
      );
    },
  },
];
