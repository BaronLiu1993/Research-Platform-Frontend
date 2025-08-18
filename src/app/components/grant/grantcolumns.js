"use client";

import {
  AtSign,
  BanknoteArrowUp,
  LetterText,
  SquareArrowOutUpRight,
  Timer,
  University,
} from "lucide-react";

export const GrantColumns = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          className="text-sm font-main font-light text-gray-400 hover:text-gray-700 flex items-center gap-2 h-8 px-3 rounded hover:bg-gray-50 transition-colors"
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
        <div className="flex items-center min-h-[36px] py-1">
          <span className="text-gray-600 font-semibold font-main text-sm leading-5">
            {action.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "university",
    header: ({ column }) => {
      return (
        <button
          className="text-sm font-light text-gray-400 hover:text-gray-700 flex items-center gap-2 h-8 px-3 -mx-3 rounded hover:bg-gray-50 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <University className="h-4 w-4" />
          University
        </button>
      );
    },
    cell: ({ row }) => {
      const action = row.original;
      return (
        <div className="flex items-center min-h-[36px] py-1">
          <span className="text-white bg-[#337EA9] rounded-xs p-1 font-main text-xs leading-5">
            {action.university}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <button className="text-sm font-light text-gray-400 hover:text-gray-700 flex items-center gap-2 h-8 px-3 -mx-3 rounded hover:bg-gray-50 transition-colors">
          <BanknoteArrowUp className="h-4 w-4" />
          Value
        </button>
      );
    },
    cell: ({ row }) => {
      const action = row.original;
      return (
        <div className="flex items-center min-h-[36px] py-1">
          <span className="text-gray-800 font-mono text-sm bg-gray-50 px-2 py-0.5 rounded border">
            ${action.value}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => {
      return (
        <button className="text-sm font-light text-gray-400 hover:text-gray-700 flex items-center gap-2 h-8 px-3 -mx-3 rounded hover:bg-gray-50 transition-colors">
          <Timer className="h-4 w-4" />
          Due Date
        </button>
      );
    },
    cell: ({ row }) => {
      const action = row.original;
      return (
        <div className="flex items-center min-h-[36px] py-1">
          <span className="text-gray-700 font-main text-sm leading-5">
            {new Date(action.due_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      );
    },
  },
  {
    id: "select",
    header: () => <div className="w-8"></div>,
    cell: ({ row }) => {
      const action = row.original;
      return (
        <div className="flex items-center justify-center min-h-[36px] py-1">
          <a
            href={action.link}
            className="flex items-center justify-center w-7 h-7 rounded hover:bg-gray-100 transition-colors group"
          >
            <span className = "bg-orange-100 gap-2 flex items-center px-3 py-1 text-xs font-medium font-main rounded-xs text-orange-600 hover:bg-orange-200 hover:text-orange-600">
              <span>View</span>
              <SquareArrowOutUpRight className="h-4 w-4 text-orange-600 hover:bg-orange-200 hover:text-orange-600" />
            </span>
          </a>
        </div>
      );
    },
  },
];
