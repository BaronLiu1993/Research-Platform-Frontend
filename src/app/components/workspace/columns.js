"use client";

import { Badge } from "@/shadcomponents/ui/badge";

import { changeStatus } from "@/app/api/status/changeStatus";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from "@/shadcomponents/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcomponents/ui/dialog";

import { Label } from "@/shadcomponents/ui/label";

import {
  University,
  BrainCircuit,
  Microscope,
  Link2,
  SchoolIcon,
  Mail,
  Trash2Icon,
} from "lucide-react";

import Link from "next/link";
import { toast } from "sonner";
import { Checkbox } from "@/shadcomponents/ui/checkbox";

const handleStatusChange = async ({ access, status, id }) => {
  try {
    const response = await changeStatus({ access, status, id });
    if (response.completed) {
      toast.success("Status Changed!");
    }
  } catch {
    toast.error("Failed to Change");
  }
};

const generateColumns = (
  access,
  onRemove,
  pendingDelete,
  handleSelectedRows,
  handleSelectedAllRowData,
  selectedRows
) => [
  {
    accessorKey: "checkbox",
    header: ({ column }) => <></>,
    cell: ({ row }) => {
      const data = row.original;
      const isSelected = selectedRows.some((r) => r.id === data.professor_id);
      return (
        <>
          <Checkbox
            className="h-4 w-4 cursor-pointer bg-gray-50 border-2 border-gray-700 rounded-xs"
            checked={isSelected}
            onCheckedChange={() => {
              handleSelectedRows(data.professor_id);
              handleSelectedAllRowData({
                id: data.professor_id,
                name: data.name,
                email: data.email,
              });
            }}
          />
        </>
      );
    },
    size: 80,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="font-main font-medium text-xs sm:text-sm text-[#787774] px-2 py-1 -ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        name
      </button>
    ),
    cell: ({ row }) => {
      const data = row.original || {};
      return (
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer flex flex-col w-full py-2.5 group pr-2 sm:pr-4 hover:bg-gray-50 -mx-2 sm:-mx-3 px-2 sm:px-3 rounded-md transition-colors duration-150">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="flex-grow min-w-0">
                  <h1 className="text-xs font-medium text-[#37352F] group-hover:text-blue-600 transition-colors truncate">
                    {data.name || "No name"}
                  </h1>
                </div>
              </div>
            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[640px] font-sans bg-white shadow-xl rounded-lg max-h-[85vh] overflow-hidden">
            <DialogHeader className="pb-3 pt-5 px-6">
              <DialogTitle className="text-lg font-semibold text-gray-900 truncate">
                <div>{data.name || "Professor"}</div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                    {data.url ? (
                      <Link
                        href={data.url}
                        target="_blank"
                        className="bg-sky-50 text-sky-700 rounded-md font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-center text-left whitespace-normal"
                      >
                        <Link2 className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                        Profile
                      </Link>
                    ) : (
                      <span className="text-gray-400">No URL</span>
                    )}
                  </div>
                  {data.lab_url && (
                    <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                      <Link
                        href={data.lab_url}
                        target="_blank"
                        className="bg-green-50 text-green-700 rounded-md font-medium text-xs py-1 px-2 border border-green-200/50 flex items-center text-left whitespace-normal"
                      >
                        <SchoolIcon className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                        Visit Lab
                      </Link>
                    </div>
                  )}
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-3 py-4 px-6 text-sm overflow-y-auto">
              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1">
                  Email
                </Label>
                <Badge className="bg-sky-50 text-sky-700 font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-start text-left whitespace-normal">
                  <Mail className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{data.email || "—"}</span>
                </Badge>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1">
                  School
                </Label>
                <Badge className="bg-sky-50 text-sky-700 font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-start text-left whitespace-normal">
                  <University className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{data.school || "—"}</span>
                </Badge>
              </div>

              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1">
                  Department
                </Label>
                <Badge className="bg-purple-50 text-purple-700 font-medium text-xs py-1 px-2 border border-purple-200/50 flex items-start text-left whitespace-normal">
                  <BrainCircuit className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{data.department || "—"}</span>
                </Badge>
              </div>

              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1">
                  Faculty
                </Label>
                <Badge className="bg-green-50 text-green-700 font-medium text-xs py-1 px-2 border border-green-200/50 flex items-start text-left whitespace-normal">
                  <Microscope className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{data.faculty || "—"}</span>
                </Badge>
              </div>

              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1">
                  Interests
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {(data.research_interests || []).length ? (
                    (data.research_interests || []).map((interest, i) => (
                      <Badge
                        key={`${interest}-${i}`}
                        variant="secondary"
                        className="text-xs bg-gray-50 text-gray-700 border-gray-200/80 px-2 py-0.5"
                        title={interest}
                      >
                        <span className="truncate inline-block align-middle">
                          {interest}
                        </span>
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-400 text-xs">—</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                <Label className="text-right font-medium text-gray-500 pt-1">
                  Lab Affiliation
                </Label>
                <Badge className="bg-sky-50 text-sky-700 font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-start text-left whitespace-normal">
                  <span className="break-words">
                    {data.labs || "No Lab Affiliation"}
                  </span>
                </Badge>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
    size: 220,
  },
  {
    accessorKey: "school",
    header: ({ column }) => (
      <button
        className="font-main font-medium text-xs sm:text-sm text-[#787774] px-2 py-1 -ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        school
      </button>
    ),
    cell: ({ row }) => {
      const data = row.original || {};
      return (
        <div className="hidden sm:block">
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer flex flex-col w-full py-2.5 group pr-4 hover:bg-gray-50 -mx-3 px-3 rounded-md transition-colors duration-150">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center space-x-1.5 text-xs text-[#787774]">
                      {data.school && (
                        <span className="text-xs font-medium text-[#37352F] group-hover:text-blue-600 transition-colors truncate">
                          {data.school}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[640px] font-sans bg-white shadow-xl rounded-lg max-h-[85vh] overflow-hidden">
              <DialogHeader className="pb-3 pt-5 px-6">
                <DialogTitle className="text-lg font-semibold text-gray-900 truncate">
                  <div>{data.name || "Professor"}</div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                      {data.url ? (
                        <Link
                          href={data.url}
                          target="_blank"
                          className="bg-sky-50 text-sky-700 rounded-md font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-center text-left whitespace-normal"
                        >
                          <Link2 className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                          Profile
                        </Link>
                      ) : (
                        <span className="text-gray-400">No URL</span>
                      )}
                    </div>
                    {data.lab_url && (
                      <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                        <Link
                          href={data.lab_url}
                          target="_blank"
                          className="bg-green-50 text-green-700 rounded-md font-medium text-xs py-1 px-2 border border-green-200/50 flex items-center text-left whitespace-normal"
                        >
                          <SchoolIcon className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                          Visit Lab
                        </Link>
                      </div>
                    )}
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-3 py-4 px-6 text-sm overflow-y-auto">
                <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    Email
                  </Label>
                  <Badge className="bg-sky-50 text-sky-700 font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-start text-left whitespace-normal">
                    <Mail className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span className="break-words">{data.email || "—"}</span>
                  </Badge>
                </div>
                <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    School
                  </Label>
                  <Badge className="bg-sky-50 text-sky-700 font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-start text-left whitespace-normal">
                    <University className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span className="break-words">{data.school || "—"}</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    Department
                  </Label>
                  <Badge className="bg-purple-50 text-purple-700 font-medium text-xs py-1 px-2 border border-purple-200/50 flex items-start text-left whitespace-normal">
                    <BrainCircuit className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span className="break-words">
                      {data.department || "—"}
                    </span>
                  </Badge>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    Faculty
                  </Label>
                  <Badge className="bg-green-50 text-green-700 font-medium text-xs py-1 px-2 border border-green-200/50 flex items-start text-left whitespace-normal">
                    <Microscope className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span className="break-words">{data.faculty || "—"}</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    Interests
                  </Label>
                  <div className="flex flex-wrap gap-1.5">
                    {(data.research_interests || []).length ? (
                      (data.research_interests || []).map((interest, i) => (
                        <Badge
                          key={`${interest}-${i}`}
                          variant="secondary"
                          className="text-xs bg-gray-50 text-gray-700 border-gray-200/80 px-2 py-0.5"
                          title={interest}
                        >
                          <span className="truncate inline-block align-middle">
                            {interest}
                          </span>
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-400 text-xs">—</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    Lab Affiliation
                  </Label>
                  <Badge className="bg-sky-50 text-sky-700 font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-start text-left whitespace-normal">
                    <span className="break-words">
                      {data.labs || "No Lab Affiliation"}
                    </span>
                  </Badge>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
    size: 200,
  },
  {
    accessorKey: "email",
    size: 140,
    header: ({ column }) => (
      <button
        className="font-main font-medium text-xs sm:text-sm text-[#787774] px-2 py-1 -ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        email
      </button>
    ),
    cell: ({ row }) => {
      const data = row.original || {};
      return (
        <div className="hidden sm:block">
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer flex flex-col w-full py-2.5 group hover:bg-gray-50 -mx-3 px-3 rounded-md transition-colors duration-150">
                <span className="text-xs font-medium text-[#37352F] group-hover:text-blue-600 transition-colors truncate">
                  {data.email}
                </span>
              </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[640px] font-sans bg-white shadow-xl rounded-lg max-h-[85vh] overflow-hidden">
              <DialogHeader className="pb-3 pt-5 px-6">
                <DialogTitle className="text-lg font-semibold text-gray-900 truncate">
                  <div>{data.name || "Professor"}</div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                      {data.url ? (
                        <Link
                          href={data.url}
                          target="_blank"
                          className="bg-sky-50 text-sky-700 rounded-md font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-center text-left whitespace-normal"
                        >
                          <Link2 className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                          Profile
                        </Link>
                      ) : (
                        <span className="text-gray-400">No URL</span>
                      )}
                    </div>
                    {data.lab_url && (
                      <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                        <Link
                          href={data.lab_url}
                          target="_blank"
                          className="bg-green-50 text-green-700 rounded-md font-medium text-xs py-1 px-2 border border-green-200/50 flex items-center text-left whitespace-normal"
                        >
                          <SchoolIcon className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                          Visit Lab
                        </Link>
                      </div>
                    )}
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-3 py-4 px-6 text-sm overflow-y-auto">
                <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    Email
                  </Label>
                  <Badge className="bg-sky-50 text-sky-700 font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-start text-left whitespace-normal">
                    <Mail className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span className="break-words">{data.email || "—"}</span>
                  </Badge>
                </div>
                <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    School
                  </Label>
                  <Badge className="bg-sky-50 text-sky-700 font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-start text-left whitespace-normal">
                    <University className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span className="break-words">{data.school || "—"}</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    Department
                  </Label>
                  <Badge className="bg-purple-50 text-purple-700 font-medium text-xs py-1 px-2 border border-purple-200/50 flex items-start text-left whitespace-normal">
                    <BrainCircuit className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span className="break-words">
                      {data.department || "—"}
                    </span>
                  </Badge>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    Faculty
                  </Label>
                  <Badge className="bg-green-50 text-green-700 font-medium text-xs py-1 px-2 border border-green-200/50 flex items-start text-left whitespace-normal">
                    <Microscope className="w-3.5 h-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span className="break-words">{data.faculty || "—"}</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    Interests
                  </Label>
                  <div className="flex flex-wrap gap-1.5">
                    {(data.research_interests || []).length ? (
                      (data.research_interests || []).map((interest, i) => (
                        <Badge
                          key={`${interest}-${i}`}
                          variant="secondary"
                          className="text-xs bg-gray-50 text-gray-700 border-gray-200/80 px-2 py-0.5"
                          title={interest}
                        >
                          <span className="truncate inline-block align-middle">
                            {interest}
                          </span>
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-400 text-xs">—</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-start gap-x-4 gap-y-1">
                  <Label className="text-right font-medium text-gray-500 pt-1">
                    Lab Affiliation
                  </Label>
                  <Badge className="bg-sky-50 text-sky-700 font-medium text-xs py-1 px-2 border border-sky-200/50 flex items-start text-left whitespace-normal">
                    <span className="break-words">
                      {data.labs || "No Lab Affiliation"}
                    </span>
                  </Badge>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <button
        className="font-main font-medium text-xs sm:text-sm text-[#787774] px-2 py-1 -ml-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        status
      </button>
    ),
    cell: ({ row }) => {
      const data = row.original || {};
      return (
        <div className="max-w-[110px] sm:max-w-none">
          <Select
            className="font-main rounded-none"
            defaultValue={data.status}
            onValueChange={(next) => {
              handleStatusChange({
                access,
                status: next,
                id: data.professor_id,
              });
            }}
          >
            <SelectTrigger className="w-full sm:w-fit cursor-pointer border-0 rounded-none outline-none ring-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none text-[11px] sm:text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="font-main rounded-none pr-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>

                <SelectItem
                  value="followup"
                  className="py-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <div className="bg-purple-100 text-[13px] w-fit rounded-sm text-xs flex items-center justify-center gap-1 font-semibold text-gray-800 px-1.5 py-0.5">
                    <div className="bg-purple-400 h-2 w-2 rounded-full"></div>
                    <span>Follow Up</span>
                  </div>
                </SelectItem>

                <SelectItem
                  value="first"
                  className="py-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <div className="bg-yellow-100 text-[13px] w-fit rounded-sm text-xs flex items-center justify-center gap-1 font-semibold text-gray-800 px-1.5 py-0.5">
                    <div className="bg-yellow-400 h-2 w-2 rounded-full"></div>
                    <span>1st Email</span>
                  </div>
                </SelectItem>

                <SelectItem
                  value="second"
                  className="py-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <div className="bg-orange-100 text-[13px] w-fit rounded-sm text-xs flex items-center justify-center gap-1 font-semibold text-gray-800 px-1.5 py-0.5">
                    <div className="bg-orange-400 h-2 w-2 rounded-full"></div>
                    <span>2nd Email</span>
                  </div>
                </SelectItem>

                <SelectItem
                  value="third"
                  className="py-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <div className="bg-sky-100 text-[13px] w-fit rounded-sm text-xs flex items-center justify-center gap-1 font-semibold text-gray-800 px-1.5 py-0.5">
                    <div className="bg-sky-400 h-2 w-2 rounded-full"></div>
                    <span>3rd Email</span>
                  </div>
                </SelectItem>
                <SelectItem
                  value="xthemail"
                  className="py-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <div className="bg-gray-100 text-[13px] w-fit rounded-sm text-xs flex items-center justify-center gap-1 font-semibold text-gray-800 px-1.5 py-0.5">
                    <div className="bg-gray-400 h-2 w-2 rounded-full"></div>
                    <span>Xth Email</span>
                  </div>
                </SelectItem>

                <SelectItem
                  value="lost"
                  className="py-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <div className="bg-red-100 text-[13px] w-fit rounded-sm text-xs flex items-center justify-center gap-1 font-semibold text-gray-800 px-1.5 py-0.5">
                    <div className="bg-red-400 h-2 w-2 rounded-full"></div>
                    <span>Lost</span>
                  </div>
                </SelectItem>

                <SelectItem
                  value="won"
                  className="py-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <div className="bg-green-100 text-[13px] w-fit rounded-sm text-xs flex items-center justify-center gap-1 font-semibold text-gray-800 px-1.5 py-0.5">
                    <div className="bg-green-400 h-2 w-2 rounded-full"></div>
                    <span>Won</span>
                  </div>
                </SelectItem>
              </SelectGroup>
              <SelectItem
                value="discovered"
                className="py-0.5 flex items-center gap-2 cursor-pointer"
              >
                <div className="bg-purple-100 text-[13px] w-fit rounded-sm text-xs flex items-center justify-center gap-1 font-semibold text-gray-800 px-1.5 py-0.5">
                  <div className="bg-purple-400 h-2 w-2 rounded-full"></div>
                  <span>Discovered</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    },
    size: 160,
  },
  {
    accessorKey: "actions",
    header: () => <div />,
    cell: ({ row }) => {
      const data = row.original || {};
      const isDeleting = pendingDelete.has(data.professor_id);
      return (
        <div className="flex justify-center sm:justify-end items-center h-full pr-1">
          <button
            disabled={isDeleting}
            aria-disabled={isDeleting}
            onClick={() => onRemove(data.professor_id)}
          >
            <Trash2Icon className="stroke-1 h-4 w-4 hover:text-red-700 cursor-pointer" />
          </button>
        </div>
      );
    },
    size: 70,
    enableSorting: false,
  },
];

export default generateColumns;
