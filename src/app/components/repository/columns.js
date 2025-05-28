// columns.js
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
  University,
  BrainCircuit,
  Microscope,
} from "lucide-react";

import KanbanButton from "./kanbanbutton";
import ApplyButton from "./applybutton";
import Link from "next/link";

const generateColumns = (userId) => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-inter font-semibold text-sm text-gray-600 hover:bg-gray-100/80 px-2 py-1 -ml-2 uppercase tracking-wider"
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
            <div className="cursor-pointer flex flex-col w-full py-2.5 group pr-4 hover:bg-gray-50 -mx-3 px-3 rounded-md transition-colors duration-150">
              <div className="flex items-center space-x-3">
                <div>
                  <Microscope className="bg-slate-100 text-slate-500 h-7 w-7 p-1.5 rounded-md" />
                </div>
                <div className="flex-grow min-w-0">
                  <h1 className="text-md font-medium text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                    {data.name}
                  </h1>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-500 truncate">
                    <span>{data.department || "N/A Department"}</span>
                    {data.school && (
                      <span className="text-gray-500">&bull;</span>
                    )}
                    {data.school && <span className = "">@ {data.school}</span>}
                  </div>
                </div>
              </div>
              {(data.research_interests || []).length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 pl-[calc(28px_+_0.75rem)]">
                  {data.research_interests.map((interest, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-xs font-semibold bg-gray-50 text-gray-500 border-slate-200 px-1.5 py-0.5"
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
    
              <div className="flex space-x-4">
                <KanbanButton
                  professor_id={data.id}
                  professor_name={data.name}
                  professor_url={data.url}
                  professor_research_interests={data.research_interests}
                  professor_school={data.school}
                  professor_faculty={data.faculty}
                  professor_department={data.department}
                  professor_labs={data.labs}
                  professor_lab_url={data.lab_url}
                  user_id={userId}
                />

                <ApplyButton
                  professor_id={data.id}
                  professor_name={data.name}
                  professor_url={data.url}
                  professor_research_interests={data.research_interests}
                  professor_school={data.school}
                  professor_faculty={data.faculty}
                  professor_department={data.department}
                  professor_labs={data.labs}
                  professor_lab_url={data.lab_url}
                  user_id={userId}
                  professor_email={data.email}
                />
              </div>
            </DialogHeader>

            <div className="grid gap-3 py-4 px-6 text-sm max-h-[60vh] overflow-y-auto">
              {" "}
              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1 underline">
                  School
                </Label>
                <Badge className="col-span-1 bg-sky-50 text-sky-700 font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-start text-left whitespace-normal">
                  <University className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{data.school || "—"}</span>
                </Badge>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1 underline">
                  Department
                </Label>
                <Badge className="col-span-1 bg-purple-50 text-purple-700 font-medium text-xs py-1 px-2 border border-purple-200/50 flex items-start text-left whitespace-normal">
                  <BrainCircuit className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{data.department || "—"}</span>
                </Badge>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1 underline">
                  Faculty
                </Label>
                <Badge className="col-span-1 bg-green-50 text-green-700 font-medium text-xs py-1 px-2 border border-green-200/50 flex items-start text-left whitespace-normal">
                  <Microscope className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{data.faculty || "—"}</span>
                </Badge>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1 underline">
                  Profile
                </Label>
                <Link
                  href={data.url}
                  target="_blank"
                  className="col-span-1 text-blue-500 underline font-medium text-xs py-1 px-2 flex items-start text-left whitespace-normal"
                >
                  <span className="break-words">{data.url || "No URL"}</span>
                </Link>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1 underline">
                  Interests
                </Label>
                <div className="col-span-1 flex flex-wrap gap-1.5">
                  {(data.research_interests || []).length ? (
                    data.research_interests.map((interest, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs bg-gray-50 text-gray-600 font-semibold border-gray-200/80 px-2 py-0.5"
                      >
                        {interest}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-400 text-xs">—</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1 underline">
                  Lab Affiliation
                </Label>
                <Badge className="col-span-1 bg-sky-50 text-sky-700 font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-start text-left whitespace-normal">
                  <University className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">
                    {data.labs || "No Lab Affiliation"}
                  </span>
                </Badge>
              </div>
              {data.lab_url && (
                <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                  <Label className="text-right font-medium text-gray-500 pt-1 underline">
                    Visit Lab
                  </Label>
                  <Link
                    href={data.lab_url}
                    target="_blank"
                    className="col-span-1 text-blue-500 underline font-medium text-xs py-1 px-2 flex items-start text-left whitespace-normal"
                  >
                    <span className="break-words">
                      {data.lab_url || "No Lab URL"}
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/*<div className="space-y-1.5 pt-2 pb-3 px-6">
              <Label className="font-medium text-gray-600 text-sm underline">
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
            </div>*/}

            <DialogFooter className="pt-4 pb-5 px-6 bg-slate-50/50 rounded-b-lg"></DialogFooter>
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
            professor_id={data.id}
            professor_name={data.name}
            professor_url={data.url}
            professor_research_interests={data.research_interests}
            professor_school={data.school}
            professor_faculty={data.faculty}
            professor_department={data.department}
            professor_labs={data.labs}
            professor_lab_url={data.lab_url}
            user_id={userId}
          />
        </div>
      );
    },
    size: 70,
    enableSorting: false,
  },
];

export default generateColumns;
