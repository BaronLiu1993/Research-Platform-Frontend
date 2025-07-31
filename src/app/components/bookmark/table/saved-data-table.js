"use client";
import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getSelectedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcomponents/ui/table";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/shadcomponents/ui/composedSheet";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/shadcomponents/ui/composedialog";

import { Input } from "@/shadcomponents/ui/input";
import { Button } from "@/shadcomponents/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import ComposeEditor from "./snippet/composeEditor";
import DataPreview from "./preview/dataPreview";
import {
  BookAIcon,
  Bot,
  Clock,
  Cloud,
  Database,
  Download,
  Ellipsis,
  Eye,
  File,
  FileCheck2,
  FileX2,
  FolderOpen,
  Hammer,
  Info,
  Leaf,
  LeafIcon,
  Paperclip,
  Pencil,
  Tag,
  Trash2,
} from "lucide-react";
import { Badge } from "@/shadcomponents/ui/badge";
import DraftList from "./snippet/draftList";
import FollowUpList from "./snippet/followUpList";

import { UploadResume } from "@/app/actions/upload/uploadResume";
import { UploadTranscript } from "@/app/actions/upload/uploadTranscript";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";
import { Label } from "@/shadcomponents/ui/label";

export function SavedDataTable({
  columns,
  data,
  userId,
  draftData,
  parsedCompletedData,
  parsedUserProfile,
  parsedResumeData,
  parsedTranscriptData,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [snippetId, setSnippetId] = useState("");
  const [resume, setResume] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleUploadTranscript = async () => {
    await UploadTranscript(transcript, userId);
  };

  const handleUploadResume = async () => {
    await UploadResume(resume, userId);
  };

  return (
    <div className="px-4">
      <div className="flex flex-col gap-4 py-4">
        <div>
          <div className="font-semibold flex gap-2">
            <BookAIcon className="text-[#787774]" />
            Automate File Uploading
          </div>
          <div className="flex items-center py-2 space-x-2">
            <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-xs text-[10px]">
              <File />
              Upload Email Attachments
            </Badge>
            <div className="rounded-full h-1 w-1 bg-[#37352F]"></div>
            <h2 className="text-xs font-semibold text-[10px] text-[#37352F]">
              By Jie Xuan Liu
            </h2>
          </div>
          <div className="bg-[#FAEBDD] flex gap-2 items-center p-1 w-fit rounded-xs text-[#D9730D]">
            <Info className="h-4 w-4" />
            <span className="text-xs">
              All Your Uploaded Files are Saved On Your Personal Google Drive to
              Ensure Data Privacy
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <Accordion type="multiple">
            <AccordionItem value="upload-resume">
              <AccordionTrigger>
                {parsedResumeData.success ? (
                  <div className="bg-[#EDF3EC] flex gap-2 items-center p-1 w-fit rounded-xs text-[#448361]">
                    <FileCheck2 className="h-4 w-4" />
                    <span className="text-xs">Resume Uploaded</span>
                  </div>
                ) : (
                  <div className="bg-[#FDEBEC] flex gap-2 items-center p-1 w-fit rounded-xs text-[#D44C47]">
                    <FileX2 className="h-4 w-4" />
                    <span className="text-xs">Resume Missing</span>
                  </div>
                )}
              </AccordionTrigger>
              <AccordionContent>
                {parsedResumeData.success ? (
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold">
                        {parsedResumeData.data.name}
                      </h1>
                      <div className="flex gap-4">
                        <a
                          className="text-[#37352F] bg-[#F1F1EF] font-semibold text-xs p-1 gap-2 flex items-center justify-center"
                          target="_blank"
                          href={parsedResumeData.data.webViewLink}
                        >
                          <File className="p-1" />
                          <span>View In Google Drive</span>
                        </a>
                        <a
                          className="text-[#37352F] bg-[#F1F1EF] font-semibold text-xs p-1 gap-2 flex items-center justify-center"
                          target="_blank"
                          href={parsedResumeData.data.webContentLink}
                        >
                          <Download className="p-1" />
                          <span>Download File</span>
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <Label>Update Resume File</Label>
                        <Input
                          onChange={(e) => setResume(e.target.files?.[0])}
                          type="file"
                          className="rounded-xs"
                        />
                      </div>
                      {resume ? (
                        <Button
                          onClick={handleUploadResume}
                          className="text-[#37352F] bg-[#F1F1EF] font-semibold w-fit rounded-xs text-xs"
                        >
                          Upload
                        </Button>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Input
                      onChange={(e) => setResume(e.target.files?.[0])}
                      type="file"
                      className="rounded-xs"
                    />
                    {resume ? (
                      <Button
                        onClick={handleUploadResume}
                        className="text-[#37352F] bg-[#F1F1EF] font-semibold w-fit rounded-xs text-xs"
                      >
                        Upload
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="upload-transcripts">
              <AccordionTrigger>
                {parsedTranscriptData.success ? (
                  <div className="bg-[#EDF3EC] flex gap-2 items-center p-1 w-fit rounded-xs text-[#448361]">
                    <FileCheck2 className="h-4 w-4" />
                    <span className="text-xs">Transcript Uploaded</span>
                  </div>
                ) : (
                  <div className="bg-[#FDEBEC] flex gap-2 items-center p-1 w-fit rounded-xs text-[#D44C47]">
                    <FileX2 className="h-4 w-4" />
                    <span className="text-xs">Transcript Missing</span>
                  </div>
                )}
              </AccordionTrigger>
              <AccordionContent>
                {parsedTranscriptData.success ? (
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold">
                        {parsedTranscriptData.data.name}
                      </h1>
                      <div className="flex gap-4">
                        <a
                          className="text-[#37352F] bg-[#F1F1EF] font-semibold text-xs p-1 gap-2 flex items-center justify-center"
                          target="_blank"
                          href={parsedTranscriptData.data.webViewLink}
                        >
                          <File className="p-1" />
                          <span>View In Google Drive</span>
                        </a>
                        <a
                          className="text-[#37352F] bg-[#F1F1EF] font-semibold text-xs p-1 gap-2 flex items-center justify-center"
                          target="_blank"
                          href={parsedTranscriptData.data.webContentLink}
                        >
                          <Download className="p-1" />
                          <span>Download File</span>
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Update Transcript File</Label>
                      <Input
                        onChange={(e) => setResume(e.target.files?.[0])}
                        type="file"
                        className="rounded-xs"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Input
                      onChange={(e) => setTranscript(e.target.files?.[0])}
                      type="file"
                      className="rounded-xs"
                    />
                    {transcript ? (
                      <Button
                        onClick={handleUploadTranscript}
                        className="text-[#37352F] bg-[#F1F1EF] font-semibold w-fit rounded-xs text-xs"
                      >
                        Upload
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div>
        <div className="font-semibold flex gap-2">
          <Cloud className="text-[#787774]" />
          Saved Professors
        </div>
        <div className="flex items-center py-2 space-x-2">
          <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-xs text-[10px]">
            <Hammer />
            Generate Drafts
          </Badge>
          <div className="rounded-full h-1 w-1 bg-[#37352F]"></div>
          <h2 className="text-xs font-semibold text-[10px] text-[#37352F]">
            By Jie Xuan Liu
          </h2>
        </div>
      </div>
      <div className="flex items-center py-4 gap-6">
        <Input
          placeholder="☰ Filter Professors..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm rounded-xs"
        />
        <Sheet>
          <SheetTrigger>
            <Button className="text-xs rounded-xs bg-[#E7F3F8] text-[#337EA9] hover:bg-[#E7F3F8] cursor-pointer">
              Preview Merge
            </Button>
          </SheetTrigger>

          <SheetContent className="rounded-xs">
            <SheetTitle className="p-2">
              <div className="flex justify-between p-1">
                <SheetClose>
                  <FolderOpen className="text-blue-700 h-6.5 w-6.5 p-1 rounded-xs cursor-pointer hover:bg-[#F1F1EF]" />
                </SheetClose>

                <div className="flex space-x-2 h-6.5">
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant="outline"
                        className="h-6 text-xs bg-white border border-[#F4EEEE] text-black hover:bg-white cursor-pointer"
                      >
                        Begin Mail Merge
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle></DialogTitle>
                      <DialogDescription>
                        <ComposeEditor
                          userId={userId}
                          snippetId={snippetId}
                          setSnippetId={setSnippetId}
                        />
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                  <Database className="h-6.5 w-6.5 p-1 text-[#787774] hover:bg-[#F4EEEE] cursor-pointer" />
                  <Trash2 className="text-[#787774] h-6.5 w-6.5 p-1 hover:bg-red-100 hover:text-red-700 cursor-pointer rounded-xs" />
                  <Tag className="h-6.5 w-6.5 p-1 text-[#787774] hover:bg-[#F4EEEE] cursor-pointer" />
                  <Clock className="h-6.5 w-6.5 p-1 text text-[#787774] hover:bg-[#F4EEEE] cursor-pointer" />
                  <Ellipsis className="h-6.5 w-6.5 p-1 text text-[#787774] hover:bg-[#F4EEEE] cursor-pointer" />
                </div>
              </div>
            </SheetTitle>
            <SheetDescription>
              <DataPreview
                userId={userId}
                rowData={table.getSelectedRowModel().rows}
                parsedUserProfile={parsedUserProfile}
                snippetId={snippetId}
              />
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <Table className="border">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/*Review Drafts and Send Here*/}
        <div>
          <div className="py-6">
            <div className="font-semibold flex gap-2">
              <Paperclip className="text-[#787774]" />
              Reviewed Drafts
            </div>
            <div className="flex items-center py-2 space-x-2">
              <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-xs text-[10px]">
                <Pencil />
                Edit
              </Badge>
              <div className="rounded-full h-1 w-1 bg-[#37352F]"></div>
              <h2 className="text-xs font-semibold text-[10px] text-[#37352F]">
                By Jie Xuan Liu
              </h2>
            </div>
            <div className="bg-[#FAEBDD] flex gap-2 items-center p-1 w-fit rounded-xs text-[#D9730D]">
              <Info className="h-4 w-4" />
              <span className="text-xs">
                {" "}
                Review Your Drafts Before Bulk Sending
              </span>
            </div>
          </div>

          <DraftList
            draftData={draftData}
            parsedUserProfile={parsedUserProfile}
          />
        </div>
        <div>
          <div className="py-6">
            <div className="font-semibold flex gap-2">
              <Bot className="text-[#787774]" />
              Automate Follow Up
            </div>
            <div className="flex items-center py-2 space-x-2">
              <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-xs text-[10px]">
                <Pencil />
                Edit
              </Badge>
              <div className="rounded-full h-1 w-1 bg-[#37352F]"></div>
              <h2 className="text-xs font-semibold text-[10px] text-[#37352F]">
                By Jie Xuan Liu
              </h2>
            </div>
            <div className="bg-[#FAEBDD] flex gap-2 items-center p-1 w-fit rounded-xs text-[#D9730D]">
              <Info className="h-4 w-4" />
              <span className="text-xs"> Review Follow Ups Before Queuing</span>
            </div>
          </div>
          <FollowUpList
            parsedCompletedData={parsedCompletedData}
            parsedUserProfile={parsedUserProfile}
          />
        </div>
      </div>
    </div>
  );
}
