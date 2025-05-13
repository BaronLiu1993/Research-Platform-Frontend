"use client";

import { Button } from "@/shadcomponents/ui/button";
import { Badge } from "@/shadcomponents/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcomponents/ui/dialog"
import { Label } from "@/shadcomponents/ui/label"

import { ArrowUpDown } from "lucide-react";
import { Check } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

import { saveToKanban } from "@/app/repository/savetokanban";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/shadcomponents/ui/dropdown-menu";

const columns = [
  {
    accessorKey: "interactivemenu",
    header: "",
    cell: ({ row }) => (
      <h1>
        <DropdownMenu className="font-sans">
          <DropdownMenuTrigger asChild>
            <EllipsisVertical className="h-4 w-4 text-gray-500" />
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
                <Link
                  href={row.getValue("url")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Professor
                </Link>
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
    cell: ({ row }) => {
      const interests = row.getValue("research_interests") || [];
      if (!interests.length) return null;

      return (
        <div className="flex flex-col flex-wrap gap-1">
          {interests.map((interest, i) => (
            <Badge key={i} className="text-xs">
              {interest}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "url",
    header: "",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">View Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {row.getValue("name")}
            </DialogTitle>
            <DialogDescription>
              {row.getValue("bio")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>


              <div></div>


            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label></Label>
            </div>
          </div>
          <DialogFooter>
            <Link
              href={`/resume?url=${encodeURIComponent(row.getValue("url"))}`}
              className=" font-medium w-[10rem] flex flex-col space-y-2 cursor-pointer"
            >
              <Button variant="outline">
                <Check />
                Learn More
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    enableSorting: false,
  },
];

export default columns;
