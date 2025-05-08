"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/shadcomponents/ui/button";
import { Badge } from "@/shadcomponents/ui/badge";
import { Check } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shadcomponents/ui/dropdown-menu"

const columns = [
  {
    accessorKey: "interactivemenu",
    header: "",
    cell: ({ row }) => (
      <h1>
        <DropdownMenu className = "font-sans">
          <DropdownMenuTrigger asChild>
            <EllipsisVertical className = "h-4 w-4 text-gray-500"/>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 font-sans">
            <DropdownMenuLabel>Professor Details</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Save To Kanban
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Visit Page
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </h1>
    ),
  },
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
    cell: ({ row }) => <h1>{row.getValue("name")}</h1>,
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
        Interests
        <ArrowUpDown className="ml-2 h-4 w-4 text-bold" />
      </Button>
    ),
  },
  {
    accessorKey: "url",
    header: "",
    cell: ({ row }) => (
      <Link
        href={`/resume?url=${encodeURIComponent(row.getValue("url"))}`}
        className="text-purple-600 hover:underline font-medium flex flex-col space-y-2"
      >
        <Badge className="bg-purple-400">
          <Check />
          Connect
        </Badge>
      </Link>
    ),
    enableSorting: false,
  },
];

export default columns;
