"use client"

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
} from "@/shadcomponents/ui/dialog";
import { Label } from "@/shadcomponents/ui/label";

import { ArrowUpDown, Mail } from "lucide-react";
import { Check } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import { University } from "lucide-react";
import { BrainCircuit } from "lucide-react";
import { Microscope } from "lucide-react";
import { BookmarkIcon } from "lucide-react";
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
    cell: ({ row }) => {
      const data = row.original;
      console.log(data.user_id)
      return (
      <h1>
        <DropdownMenu className="font-sans">
          <DropdownMenuTrigger asChild>
            <BookmarkIcon className="text-gray-500 hover:text-yellow-500 transition-colors cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 font-sans">
            <DropdownMenuLabel>Menu Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <div>
                  Save to Kanban
                </div>
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
      )
    },
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
            <Badge key={i} className="text-xs bg-gray-200 text-gray-700">
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
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Dialog className="font-sans">
          <DialogTrigger asChild>
            <Button variant="outline">View Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] font-sans">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {data.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Research Profile
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right font-semibold">School</Label>
                <Badge className="col-span-3 bg-sky-500">
                  <University />
                  {data.school || "—"}
                </Badge>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right font-semibold">Department</Label>
                <Badge className="col-span-3 bg-purple-500">
                  <BrainCircuit />
                  {data.department || "—"}
                </Badge>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right font-semibold">Faculty</Label>
                <Badge className="col-span-3 bg-green-500">
                  <Microscope />
                  {data.faculty || "—"}
                </Badge>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right font-semibold">Email</Label>
                <div className="col-span-3 underline text-blue-500">
                  {data.email ? <div>{data.email}</div> : "—"}
                </div>
              </div>
              <div className="grid grid-cols-3 items-start gap-4">
                <Label className="text-right font-semibold">
                  Research Interests
                </Label>
                <div className="col-span-3 flex flex-wrap gap-1">
                  {(data.research_interests || []).length ? (
                    data.research_interests.map((interest, i) => (
                      <Badge key={i} className="text-xs">
                        {interest}
                      </Badge>
                    ))
                  ) : (
                    <p>—</p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-2 p-2">
              <Label className="text-right font-semibold">Description</Label>
              <div className="border-2 rounded-md border-gray-100 p-4 font-light">
                {data.bio || "No bio available."}
              </div>
            </div>

            <DialogFooter>
              <Link
                href={`/resume?url=${encodeURIComponent(data.url)}`}
                className="w-full flex justify-end"
              >
                <Button className="">
                  <Check className="w-4 h-4" />
                  Apply
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
    enableSorting: false,
  },
];

export default columns;
