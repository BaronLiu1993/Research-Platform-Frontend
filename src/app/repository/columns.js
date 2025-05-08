"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/shadcomponents/ui/button";
import { Badge } from "@/shadcomponents/ui/badge";
import { Check } from "lucide-react";
import { Briefcase } from 'lucide-react';
import Link from "next/link";

const columns = [
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
  {
    accessorKey: "url",
    header: "Apply",
    cell: ({ row }) => (
      <Link
        href={`/resume?url=${encodeURIComponent(row.getValue("url"))}`}
        className="text-purple-600 hover:underline font-medium"
      >
        <Badge className = "bg-purple-400">
            <Check />
            Connect
        </Badge>
      </Link>
    ),
    enableSorting: false,
  },
];


export default columns;