"use client";

import { Button } from "@/shadcomponents/ui/button";
import { Badge } from "@/shadcomponents/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcomponents/ui/dialog";
import { Label } from "@/shadcomponents/ui/label";
import { ArrowUpDown, University, BrainCircuit, Microscope, PersonStandingIcon } from "lucide-react";
import SaveButton from "../bookmark/buttons/saveButton";
import Link from "next/link";

const InterestPills = ({ items = [] }) => {
  if (!items.length) return null;
  const MAX = 6;
  const shown = items.slice(0, MAX);
  const extra = items.length - shown.length;
  return (
    <div className="mt-2 flex flex-wrap gap-1.5 pl-[calc(28px_+_0.75rem)]">
      {shown.map((interest, i) => (
        <Badge
          key={`${interest}-${i}`}
          variant="outline"
          className="text-xs font-semibold bg-gray-50 text-gray-600 border-slate-200 px-1.5 py-0.5"
          title={interest}
        >
          <span className="truncate max-w-[9rem] inline-block align-middle">{interest}</span>
        </Badge>
      ))}
      {extra > 0 && (
        <Badge variant="secondary" className="text-[11px] bg-slate-100 text-gray-600 border-slate-200 px-2 py-0.5">
          +{extra} more
        </Badge>
      )}
    </div>
  );
};

const generateColumns = (userId, access) => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-inter font-semibold text-sm text-[#787774] px-2 py-1 -ml-2 uppercase tracking-wider"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <PersonStandingIcon className="w-4 h-4 mr-2" />
        Professor
        <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-gray-400" />
      </Button>
    ),
    cell: ({ row }) => {
      const data = row.original || {};
      return (
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer flex flex-col w-full py-2.5 group pr-4 hover:bg-gray-50 -mx-3 px-3 rounded-md transition-colors duration-150">
              <div className="flex items-center space-x-3 min-w-0">
                <Microscope className="bg-slate-100 text-slate-500 h-7 w-7 p-1.5 rounded-md flex-shrink-0" />
                <div className="flex-grow min-w-0">
                  <h1 className="text-sm font-medium text-[#37352F] group-hover:text-blue-600 transition-colors truncate">
                    {data.name || "No name"}
                  </h1>
                  <div className="flex items-center space-x-1.5 text-xs text-[#787774] truncate">
                    <span>{data.department || "N/A Department"}</span>
                    {data.school && <span className="text-[#787774]">@ {data.school}</span>}
                  </div>
                </div>
              </div>
              <InterestPills items={data.research_interests || []} />
            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[640px] font-sans bg-white shadow-xl rounded-lg max-h-[85vh] overflow-hidden">
            <DialogHeader className="pb-3 pt-5 px-6">
              <DialogTitle className="text-lg font-semibold text-gray-900 truncate">
                {data.name || "Professor"}
              </DialogTitle>
              <div className="flex space-x-3 pt-2">
                <SaveButton
                  professor_id={data.id || data.professor_id}
                  professor_email={data.email}
                  professor_name={data.name}
                  professor_url={data.url}
                  professor_research_interests={data.research_interests}
                  professor_school={data.school}
                  professor_faculty={data.faculty}
                  professor_department={data.department}
                  professor_labs={data.labs}
                  professor_lab_url={data.lab_url}
                  user_id={userId}
                  access={access}
                />
              </div>
            </DialogHeader>

            <div className="grid gap-3 py-4 px-6 text-sm overflow-y-auto">
              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1">School</Label>
                <Badge className="bg-sky-50 text-sky-700 font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-start text-left whitespace-normal">
                  <University className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{data.school || "—"}</span>
                </Badge>
              </div>

              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1">Department</Label>
                <Badge className="bg-purple-50 text-purple-700 font-medium text-xs py-1 px-2 border border-purple-200/50 flex items-start text-left whitespace-normal">
                  <BrainCircuit className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{data.department || "—"}</span>
                </Badge>
              </div>

              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1">Faculty</Label>
                <Badge className="bg-green-50 text-green-700 font-medium text-xs py-1 px-2 border border-green-200/50 flex items-start text-left whitespace-normal">
                  <Microscope className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{data.faculty || "—"}</span>
                </Badge>
              </div>

              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1">Profile</Label>
                {data.url ? (
                  <Link href={data.url} target="_blank" className="text-blue-600 underline break-all">
                    {data.url}
                  </Link>
                ) : (
                  <span className="text-gray-400">No URL</span>
                )}
              </div>

              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1">Interests</Label>
                <div className="flex flex-wrap gap-1.5">
                  {(data.research_interests || []).length ? (
                    (data.research_interests || []).slice(0, 20).map((interest, i) => (
                      <Badge
                        key={`${interest}-${i}`}
                        variant="secondary"
                        className="text-xs bg-gray-50 text-gray-700 border-gray-200/80 px-2 py-0.5"
                        title={interest}
                      >
                        <span className="truncate max-w-[10rem] inline-block align-middle">{interest}</span>
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-400 text-xs">—</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1">Lab Affiliation</Label>
                <Badge className="bg-sky-50 text-sky-700 font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-start text-left whitespace-normal">
                  <University className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{data.labs || "No Lab Affiliation"}</span>
                </Badge>
              </div>

              {data.lab_url && (
                <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                  <Label className="text-right font-medium text-gray-500 pt-1">Visit Lab</Label>
                  <Link href={data.lab_url} target="_blank" className="text-blue-600 underline break-all">
                    Lab Website
                  </Link>
                </div>
              )}
            </div>
            <DialogFooter className="pt-4 pb-5 px-6 bg-slate-50/50 rounded-b-lg" />
          </DialogContent>
        </Dialog>
      );
    },
    size: 280,
  },
  {
    accessorKey: "actions",
    header: () => <div />,
    cell: ({ row }) => {
      const data = row.original || {};
      return (
        <div className="flex justify-end items-center h-full pr-1">
          <SaveButton
            professor_id={data.id || data.professor_id}
            professor_name={data.name}
            professor_url={data.url}
            professor_email={data.email}
            professor_research_interests={data.research_interests}
            professor_school={data.school}
            professor_faculty={data.faculty}
            professor_department={data.department}
            professor_labs={data.labs}
            professor_lab_url={data.lab_url}
            user_id={userId}
            access={access}
          />
        </div>
      );
    },
    size: 90,
    enableSorting: false,
  },
];

export default generateColumns;
