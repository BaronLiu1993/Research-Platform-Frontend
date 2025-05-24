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
} from "@/shadcomponents/ui/dialog";
import { Label } from "@/shadcomponents/ui/label";

import {
  ArrowUpDown,
  BookmarkIcon,
  University,
  BrainCircuit,
  Microscope,
  Check,
} from "lucide-react";

import Link from "next/link";

const columns = [
  {
    accessorKey: "interactivemenu",
    header: "",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <BookmarkIcon className="text-gray-500 hover:text-yellow-500 transition-colors" />
            </Button>
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
                  <University className="w-4 h-4 mr-1" />
                  {data.school || "—"}
                </Badge>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right font-semibold">Department</Label>
                <Badge className="col-span-3 bg-purple-500">
                  <BrainCircuit className="w-4 h-4 mr-1" />
                  {data.department || "—"}
                </Badge>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right font-semibold">Faculty</Label>
                <Badge className="col-span-3 bg-green-500">
                  <Microscope className="w-4 h-4 mr-1" />
                  {data.faculty || "—"}
                </Badge>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right font-semibold">Email</Label>
                <div className="col-span-3 underline text-blue-500">
                  {data.email || "—"}
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
              <div className="border-2 rounded-md border-gray-100 p-4 font-extralight text-xs">
                {data.bio || "No bio available."}
              </div>
            </div>

            <DialogFooter>
              <Link
                href={{
                  pathname: `/resume/${data.name}`,
                  query: {
                    research_interests: data.research_interests,
                    professor_email: data.email,
                    professor_name: data.name,
                    professor_id: data.id,
                  },
                }}
                className="w-full flex justify-end"
              >
                <Button>
                  <Check className="w-4 h-4" />
                  Apply
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-sans font-semibold max-w-[15rem]"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer flex items-center space-x-4">
              <div>
                <Microscope className = "bg-gray-200 h-8 w-8 p-1 rounded-full"/>
              </div>
              <div>
                <h1 className="font-sans text-lg font-semibold">
                  {data.department}
                </h1>
                <div className="flex items-end space-x-2">
                  <h3 className="text-sm">{data.name}</h3>
                  <h2 className="text-xs text-gray-500 border-l pl-1 border-gray-300">
                    {data.school}
                  </h2>
                </div>
              </div>
            </div>
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
            {/* Same body here... */}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right font-semibold">School</Label>
                <Badge className="col-span-3 bg-sky-500">
                  <University className="w-4 h-4 mr-1" />
                  {data.school || "—"}
                </Badge>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right font-semibold">Department</Label>
                <Badge className="col-span-3 bg-purple-500">
                  <BrainCircuit className="w-4 h-4 mr-1" />
                  {data.department || "—"}
                </Badge>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right font-semibold">Faculty</Label>
                <Badge className="col-span-3 bg-green-500">
                  <Microscope className="w-4 h-4 mr-1" />
                  {data.faculty || "—"}
                </Badge>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right font-semibold">Email</Label>
                <div className="col-span-3 underline text-blue-500">
                  {data.email || "—"}
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
              <div className="border-2 rounded-md border-gray-100 p-4 font-extralight text-xs">
                {data.bio || "No bio available."}
              </div>
            </div>

            <DialogFooter>
              <Link
                href={{
                  pathname: `/resume/${data.name}`,
                  query: {
                    research_interests: data.research_interests,
                    professor_email: data.email,
                    professor_name: data.name,
                    professor_id: data.id,
                  },
                }}
                className="w-full flex justify-end"
              >
                <Button>
                  <Check className="w-4 h-4" />
                  Apply
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
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
        <ArrowUpDown className="ml-2 h-4 w-4" />
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
];

export default columns;
