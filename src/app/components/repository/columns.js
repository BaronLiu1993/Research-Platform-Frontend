"use client";

import KanbanButton from "./kanbanbutton";
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
  University,
  BrainCircuit,
  Microscope,
  Check,
} from "lucide-react";

import Link from "next/link";

const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-sans font-semibold text-xs text-gray-600 hover:bg-gray-100/80 px-2 py-1 -ml-2 uppercase tracking-wider"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Professor
        <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-gray-400" />
      </Button>
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer flex flex-col w-full py-2.5 group pr-4 hover:bg-slate-50 -mx-3 px-3 rounded-md transition-colors duration-150">
              <div className="flex items-center space-x-3">
                <div>
                  <Microscope className="bg-slate-100 text-slate-500 h-7 w-7 p-1.5 rounded-md" />
                </div>
                <div className="flex-grow min-w-0">
                  <h1 className="font-sans text-md font-medium text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                    {data.name}
                  </h1>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 truncate">
                    <span>{data.department || "N/A Department"}</span>
                    {data.school && (
                      <span className="text-slate-300">&bull;</span>
                    )}
                    {data.school && <span>{data.school}</span>}
                  </div>
                </div>
              </div>
              {(data.research_interests || []).length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 pl-[calc(28px_+_0.75rem)]">
                  {data.research_interests.map((interest, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-xs font-medium bg-slate-100 text-slate-600 border-slate-200 px-1.5 py-0.5"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] font-sans bg-white shadow-xl rounded-lg">
            <DialogHeader className="pb-3 pt-5 px-6">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                {data.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500 pt-0.5">
                Research Profile
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 py-4 px-6 text-sm max-h-[60vh] overflow-y-auto">
              {" "}
              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1">
                  School
                </Label>
                <Badge className="col-span-1 bg-sky-50 text-sky-700 font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-start text-left whitespace-normal">
                  <University className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{data.school || "—"}</span>
                </Badge>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1">
                  Department
                </Label>
                <Badge className="col-span-1 bg-purple-50 text-purple-700 font-medium text-xs py-1 px-2 border border-purple-200/50 flex items-start text-left whitespace-normal">
                  <BrainCircuit className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{data.department || "—"}</span>
                </Badge>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1">
                  Faculty
                </Label>
                <Badge className="col-span-1 bg-green-50 text-green-700 font-medium text-xs py-1 px-2 border border-green-200/50 flex items-start text-left whitespace-normal">
                  <Microscope className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{data.faculty || "—"}</span>
                </Badge>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500">
                  Email
                </Label>
                <div className="col-span-1 text-blue-600 hover:underline text-xs break-all">
                  {data.email ? (
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1">
                  Interests
                </Label>
                <div className="col-span-1 flex flex-wrap gap-1.5">
                  {(data.research_interests || []).length ? (
                    data.research_interests.map((interest, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs font-normal bg-gray-100 text-gray-700 border-gray-200/80 px-2 py-0.5"
                      >
                        {interest}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-400 text-xs">—</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 pb-3 px-6">
              <Label className="font-medium text-gray-600 text-sm">
                Description
              </Label>
              <div className="rounded-md border border-gray-200 p-3 text-xs text-gray-700 bg-gray-50/70 min-h-[70px] max-h-[150px] overflow-y-auto prose prose-xs prose-slate">
                {data.bio ? (
                  <div>{data.bio}</div>
                ) : (
                  <span className="text-gray-400 italic">
                    No bio available.
                  </span>
                )}
              </div>
            </div>

            <DialogFooter className="pt-4 pb-5 px-6 bg-slate-50/50 rounded-b-lg">
              <Link
                href={{
                  pathname: `/resume/${encodeURIComponent(data.name)}`,
                  query: {
                    research_interests: data.research_interests || [],
                    professor_email: data.email,
                    professor_name: data.name,
                    professor_id: data.id,
                  },
                }}
                className="w-full flex justify-end"
              >
                <Button className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-3.5 rounded-md cursor-pointer">
                  <Check className="w-3.5 h-3.5 mr-1.5" />
                  Apply
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
    size: 200,
  },
  {
    accessorKey: "actions",
    header: () => <div></div>,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex justify-end items-center h-full pr-1">
          <KanbanButton
            professor_id={data.professor_id}
            professor_name={data.name}
            professor_url={data.url}
            professor_research_interests={data.research_interests}
            professor_school={data.school}
            professor_faculty={data.faculty}
            professor_department={data.department}
            user_id={data.user_id}
          />
        </div>
      );
    },
    size: 70,
    enableSorting: false,
  },
];

export default columns;
