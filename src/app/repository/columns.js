"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/shadcomponents/ui/button";
import Link from "next/link";

export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-sans font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "url",
    header: "Profile URL",
    cell: ({ row }) => (
      <Link
        href={`/resume?url=${encodeURIComponent(row.getValue("url"))}`}
        className="text-purple-600 hover:underline font-medium"
      >
        Connect
      </Link>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "school",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-sans font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        School
      </Button>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-sans font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Department
      </Button>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "faculty",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-sans font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Faculty
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "research_interests",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-sans font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Research Interests
        <ArrowUpDown className="ml-2 h-4 w-4 text-bold" />
      </Button>
    ),
  },
];
