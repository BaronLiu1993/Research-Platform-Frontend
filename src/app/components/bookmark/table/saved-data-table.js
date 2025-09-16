"use client";
import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
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
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/shadcomponents/ui/composedSheet";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogClose,
} from "@/shadcomponents/ui/composedialog";
import { Input } from "@/shadcomponents/ui/input";
import { Button } from "@/shadcomponents/ui/button";
import ComposeEditor from "./snippet/composeEditor";
import DataPreview from "./preview/dataPreview";
import {
  BookAIcon,
  Bot,
  Cloud,
  CloudUpload,
  Download,
  DraftingCompass,
  File,
  FileCheck2,
  FileX2,
  FolderOpen,
  Hammer,
  HammerIcon,
  Info,
  Mail,
  Paperclip,
  Pencil,
  Trash2,
} from "lucide-react";
import { Badge } from "@/shadcomponents/ui/badge";
import DraftList from "./snippet/draftList";
import FollowUpList from "./snippet/followUpList";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcomponents/ui/tabs";

import { UploadResume } from "@/app/actions/upload/uploadResume";
import { UploadTranscript } from "@/app/actions/upload/uploadTranscript";
import { toast } from "sonner";

export function SavedDataTable({
  columns,
  data,
  userId,
  draftData,
  parsedCompletedData,
  parsedUserProfile,
  parsedResumeData,
  parsedTranscriptData,
  access,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [snippetId, setSnippetId] = useState("");
  const [resume, setResume] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [generateView, setGenerateView] = useState(false);
  const [draftsView, setDraftsView] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
  });

  const handleGenerateDrafts = async () => setDraftsView((v) => !v);

  const handleUploadTranscript = async () => {
    try {
      await UploadTranscript(transcript, userId, access);
      toast.success("Uploaded transcript");
      setTranscript(null);
    } catch {
      toast.error("Failed to upload transcript");
    }
  };

  const handleUploadResume = async () => {
    try {
      await UploadResume(resume, userId, access);
      toast.success("Uploaded resume");
      setResume(null);
    } catch {
      toast.error("Failed to upload resume");
    }
  };

  return (
    <div className="px-4 font-main w-full max-w-screen-xl mx-auto">
      <Tabs defaultValue="file-uploads">
        <TabsList className="my-6 grid text-black grid-cols-2 sm:inline-flex gap-2 sm:gap-4 rounded-md">
          <TabsTrigger value="file-uploads" className="rounded-md">
            Check File Uploads
          </TabsTrigger>
          <TabsTrigger value="saved-professors" className="rounded-md">
            Compose Mass Emails
          </TabsTrigger>
          <TabsTrigger value="reviewed-drafts" className="rounded-md">
            Review Mass Drafts
          </TabsTrigger>
          <TabsTrigger value="follow-ups" className="rounded-md">
            Automate Follow Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="file-uploads">
          <div className="flex flex-col gap-4 py-4">
            <div>
              <div className="font-semibold flex items-center gap-2">
                <BookAIcon className="text-[#787774] w-4 h-4" />
                Automate File Uploading
              </div>
              <div className="flex items-center py-2 gap-2">
                <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-md text-[11px]">
                  <File className="w-3.5 h-3.5 mr-1" /> Upload Email Attachments
                </Badge>
                <span className="rounded-full h-1 w-1 bg-[#37352F]" />
                <span className="text-[11px] font-medium text-[#37352F]">
                  By Jie Xuan Liu
                </span>
              </div>
              <div className="bg-[#FAEBDD] flex items-center gap-2 p-2 w-fit rounded-md text-[#D9730D]">
                <Info className="h-4 w-4" />
                <span className="text-xs">
                  All your uploaded files are saved to your Google Drive.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  {parsedResumeData?.success ? (
                    <button className="bg-[#EDF3EC] flex items-center gap-2 px-2 py-1 rounded-md text-[#448361]">
                      <FileCheck2 className="h-4 w-4" />
                      <span className="text-xs">
                        Preview or Modify Uploaded Resume
                      </span>
                    </button>
                  ) : (
                    <button className="bg-[#FDEBEC] flex items-center gap-2 px-2 py-1 rounded-md text-[#D44C47]">
                      <FileX2 className="h-4 w-4" />
                      <span className="text-xs">Resume Missing</span>
                    </button>
                  )}
                </DialogTrigger>

                <DialogContent className="max-w-xl p-4 rounded-xl">
                  {parsedResumeData?.success ? (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <h1 className="font-semibold truncate">
                          {parsedResumeData.data.name}
                        </h1>
                        <div className="flex flex-wrap gap-3">
                          <a
                            className="text-[#37352F] rounded-md hover:bg-[#f1f1efd4] bg-[#F1F1EF] font-semibold text-xs px-2 py-1 inline-flex items-center"
                            target="_blank"
                            href={parsedResumeData.data.webViewLink}
                          >
                            <File className="mr-1 w-4 h-4" /> View in Google
                            Drive
                          </a>
                          <a
                            className="text-[#37352F] hover:bg-[#f1f1efd4] bg-[#F1F1EF] font-semibold text-xs px-2 py-1 rounded-md inline-flex items-center"
                            target="_blank"
                            href={parsedResumeData.data.webContentLink}
                          >
                            <Download className="mr-1 w-4 h-4" /> Download File
                          </a>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {resume ? (
                          <div className="border border-gray-200 rounded-md p-4 flex gap-2">
                            <FileCheck2 className="text-gray-500 w-4 h-4" />
                            <div className="flex justify-between w-full min-w-0">
                              <div className="min-w-0">
                                <h2
                                  className="font-semibold text-sm truncate"
                                  title={resume.name}
                                >
                                  {resume.name}
                                </h2>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <span>
                                    {Math.ceil(resume.size / 1000)} KB
                                  </span>
                                  <span className="bg-gray-300 rounded-full h-1 w-1" />
                                  <span className="text-red-500 font-medium">
                                    Not uploaded
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => setResume(null)}
                                className="p-1 rounded-md hover:bg-[#FDEBEC]"
                              >
                                <Trash2 className="text-gray-500 w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <label
                              htmlFor="resumeInput"
                              className="border-2 border-dashed rounded-lg py-8 px-5 flex flex-col items-center cursor-pointer"
                            >
                              <CloudUpload className="w-6 h-6" />
                              <span className="font-semibold text-sm mt-1">
                                Choose a file or drag and drop
                              </span>
                              <span className="text-gray-400 text-xs">
                                PDF, PNG, JPG
                              </span>
                            </label>
                            <input
                              id="resumeInput"
                              onChange={(e) =>
                                setResume(e.target.files?.[0] ?? null)
                              }
                              type="file"
                              className="hidden"
                            />
                          </div>
                        )}

                        <div className="flex gap-2 py-2">
                          <DialogClose className="text-sm font-medium inline-flex items-center gap-1 text-white bg-[#D44C47] px-3 py-1.5 rounded-md hover:bg-[#B91C1C]">
                            Close
                          </DialogClose>
                          {resume && (
                            <DialogClose asChild>
                              <Button
                                onClick={handleUploadResume}
                                className="text-sm font-medium inline-flex items-center gap-1 text-white bg-[#4DAB9A] px-3 py-1.5 rounded-md hover:bg-[#3B8C7E]"
                              >
                                Upload
                              </Button>
                            </DialogClose>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="resumeInput2"
                        className="border-2 border-dashed rounded-lg py-8 px-5 flex flex-col items-center cursor-pointer"
                      >
                        <CloudUpload className="w-6 h-6" />
                        <span className="font-semibold text-sm mt-1">
                          Choose a file or drag and drop
                        </span>
                        <span className="text-gray-400 text-xs">
                          PDF, PNG, JPG
                        </span>
                      </label>
                      <input
                        id="resumeInput2"
                        onChange={(e) => setResume(e.target.files?.[0] ?? null)}
                        type="file"
                        className="hidden"
                      />
                      {resume && (
                        <Button
                          onClick={handleUploadResume}
                          className="text-[#37352F] bg-[#F1F1EF] font-semibold w-fit rounded-md text-xs"
                        >
                          Upload
                        </Button>
                      )}
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              {/* Transcript */}
              <Dialog>
                <DialogTrigger asChild>
                  {parsedTranscriptData?.success ? (
                    <button className="bg-[#EDF3EC] flex items-center gap-2 px-2 py-1 rounded-md text-[#448361]">
                      <FileCheck2 className="h-4 w-4" />
                      <span className="text-xs">
                        Preview or Modify Uploaded Transcript
                      </span>
                    </button>
                  ) : (
                    <button className="bg-[#FDEBEC] flex items-center gap-2 px-2 py-1 rounded-md text-[#D44C47]">
                      <FileX2 className="h-4 w-4" />
                      <span className="text-xs">Transcript Missing</span>
                    </button>
                  )}
                </DialogTrigger>

                <DialogContent className="max-w-xl p-4 rounded-xl">
                  {parsedTranscriptData?.success ? (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <h1 className="font-semibold truncate">
                          {parsedTranscriptData.data.name}
                        </h1>
                        <div className="flex flex-wrap gap-3">
                          <a
                            className="text-[#37352F] rounded-md hover:bg-[#f1f1efd4] bg-[#F1F1EF] font-semibold text-xs px-2 py-1 inline-flex items-center"
                            target="_blank"
                            href={parsedTranscriptData.data.webViewLink}
                          >
                            <File className="mr-1 w-4 h-4" /> View in Google
                            Drive
                          </a>
                          <a
                            className="text-[#37352F] hover:bg-[#f1f1efd4] bg-[#F1F1EF] font-semibold text-xs px-2 py-1 rounded-md inline-flex items-center"
                            target="_blank"
                            href={parsedTranscriptData.data.webContentLink}
                          >
                            <Download className="mr-1 w-4 h-4" /> Download File
                          </a>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {transcript ? (
                          <div className="border border-gray-200 rounded-md p-4 flex gap-2">
                            <FileCheck2 className="text-gray-500 w-4 h-4" />
                            <div className="flex justify-between w-full min-w-0">
                              <div className="min-w-0">
                                <h2
                                  className="font-semibold text-sm truncate"
                                  title={transcript.name}
                                >
                                  {transcript.name}
                                </h2>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <span>
                                    {Math.ceil(transcript.size / 1000)} KB
                                  </span>
                                  <span className="bg-gray-300 rounded-full h-1 w-1" />
                                  <span className="text-red-500 font-medium">
                                    Not uploaded
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => setTranscript(null)}
                                className="p-1 rounded-md hover:bg-[#FDEBEC]"
                              >
                                <Trash2 className="text-gray-500 w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <label
                              htmlFor="transcriptInput"
                              className="border-2 border-dashed rounded-lg py-8 px-5 flex flex-col items-center cursor-pointer"
                            >
                              <CloudUpload className="w-6 h-6" />
                              <span className="font-semibold text-sm mt-1">
                                Choose a file or drag and drop
                              </span>
                              <span className="text-gray-400 text-xs">
                                PDF, PNG, JPG
                              </span>
                            </label>
                            <input
                              id="transcriptInput"
                              onChange={(e) =>
                                setTranscript(e.target.files?.[0] ?? null)
                              }
                              type="file"
                              className="hidden"
                            />
                          </div>
                        )}

                        <div className="flex gap-2 py-2">
                          <DialogClose className="text-sm font-medium inline-flex items-center gap-1 text-white bg-[#D44C47] px-3 py-1.5 rounded-md hover:bg-[#B91C1C]">
                            Close
                          </DialogClose>
                          {transcript && (
                            <DialogClose asChild>
                              <Button
                                onClick={handleUploadTranscript}
                                className="text-sm font-medium inline-flex items-center gap-1 text-white bg-[#4DAB9A] px-3 py-1.5 rounded-md hover:bg-[#3B8C7E]"
                              >
                                Upload
                              </Button>
                            </DialogClose>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="transcriptInput2"
                        className="border-2 border-dashed rounded-lg py-8 px-5 flex flex-col items-center cursor-pointer"
                      >
                        <CloudUpload className="w-6 h-6" />
                        <span className="font-semibold text-sm mt-1">
                          Choose a file or drag and drop
                        </span>
                        <span className="text-gray-400 text-xs">
                          PDF, PNG, JPG
                        </span>
                      </label>
                      <input
                        id="transcriptInput2"
                        onChange={(e) =>
                          setTranscript(e.target.files?.[0] ?? null)
                        }
                        type="file"
                        className="hidden"
                      />
                      {transcript && (
                        <Button
                          onClick={handleUploadTranscript}
                          className="text-[#37352F] bg-[#F1F1EF] font-semibold w-fit rounded-md text-xs"
                        >
                          Upload
                        </Button>
                      )}
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </TabsContent>

        {/* SAVED PROFESSORS / COMPOSE */}
        <TabsContent value="saved-professors" className="py-4">
          <div>
            <div className="font-semibold flex items-center gap-2">
              <Cloud className="text-[#787774] w-4 h-4" />
              Saved Professors
            </div>
            <div className="flex items-center py-2 gap-2">
              <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-md text-[11px]">
                <Hammer className="w-3.5 h-3.5 mr-1" /> Generate Drafts
              </Badge>
              <span className="rounded-full h-1 w-1 bg-[#37352F]" />
              <span className="text-[11px] font-medium text-[#37352F]">
                By Jie Xuan Liu
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center py-4 gap-3">
            <Input
              placeholder="Find professors..."
              value={table.getColumn("name")?.getFilterValue() ?? ""}
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
              className="max-w-sm"
            />

            <Sheet
              open={isOpen}
              onOpenChange={(open) => {
                if (open && table.getSelectedRowModel().rows.length === 0) {
                  toast("No professor selected");
                } else {
                  setIsOpen(open);
                }
              }}
            >
              <SheetTrigger asChild>
                <Button className="text-sm font-medium inline-flex items-center gap-1 text-white bg-[#529CCA] px-3 py-1.5 hover:bg-[#4179B8] rounded-md">
                  <Mail className="w-4 h-4" /> Begin Mail Merge
                </Button>
              </SheetTrigger>

              <SheetContent className="rounded-xl max-w-[680px]">
                <SheetTitle className="p-2">
                  <div className="flex justify-between items-center p-1">
                    <SheetClose asChild>
                      <button
                        className="p-1.5 rounded-md hover:bg-[#F1F1EF]"
                        aria-label="Close"
                      >
                        <FolderOpen className="text-blue-700 w-6 h-6" />
                      </button>
                    </SheetClose>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          {draftsView && (
                            <Button
                              onClick={handleGenerateDrafts}
                              className="text-sm font-medium inline-flex items-center gap-1 text-white bg-[#4584F3] px-3 py-1.5 hover:bg-[#3574E2] rounded-md"
                            >
                              <DraftingCompass className="w-4 h-4" /> Generate
                              Drafts
                            </Button>
                          )}
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="sr-only">
                              Compose drafts
                            </DialogTitle>
                          </DialogHeader>
                          <ComposeEditor
                            access={access}
                            userId={userId}
                            snippetId={snippetId}
                            setSnippetId={setSnippetId}
                            handleGenerateDrafts={handleGenerateDrafts}
                            setGenerateView={setGenerateView}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </SheetTitle>
                <SheetDescription>
                  <DataPreview
                    access={access}
                    userId={userId}
                    rowData={table.getSelectedRowModel().rows}
                    parsedUserProfile={parsedUserProfile}
                    snippetId={snippetId}
                    generateView={generateView}
                  />
                </SheetDescription>
              </SheetContent>
            </Sheet>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <Table className="text-sm min-w-full">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-xs whitespace-nowrap"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => row.toggleSelected()}
                      className="cursor-pointer"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="px-3 py-2 align-middle"
                        >
                          <div className="min-w-0 max-w-[28rem] truncate">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-xs"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* REVIEWED DRAFTS */}
        <TabsContent value="reviewed-drafts">
          <div className="py-4">
            <div className="font-semibold flex items-center gap-2">
              <Paperclip className="text-[#787774] w-4 h-4" />
              Reviewed Drafts
            </div>
            <div className="flex items-center py-2 gap-2">
              <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-md text-[11px]">
                <Pencil className="w-3.5 h-3.5 mr-1" /> Edit Drafts
              </Badge>
              <span className="rounded-full h-1 w-1 bg-[#37352F]" />
              <span className="text-[11px] font-medium text-[#37352F]">
                By Jie Xuan Liu
              </span>
            </div>
            <div className="bg-[#FAEBDD] flex items-center gap-2 p-2 w-fit rounded-md text-[#D9730D]">
              <Info className="h-4 w-4" />
              <span className="text-xs">
                Edit your drafts by clicking on the professor emails. Review
                before bulk sending.
              </span>
            </div>
          </div>
          <DraftList
            access={access}
            draftData={draftData}
            parsedUserProfile={parsedUserProfile}
          />
        </TabsContent>

        {/* FOLLOW UPS */}
        <TabsContent value="follow-ups">
          <div className="py-4">
            <div className="font-semibold flex items-center gap-2">
              <Bot className="text-[#787774] w-4 h-4" />
              Automate Follow Up
            </div>
            <div className="flex items-center py-2 gap-2">
              <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-md text-[11px]">
                <HammerIcon className="w-3.5 h-3.5 mr-1" /> Generate Follow Up
              </Badge>
              <span className="rounded-full h-1 w-1 bg-[#37352F]" />
              <span className="text-[11px] font-medium text-[#37352F]">
                By Jie Xuan Liu
              </span>
            </div>
            <div className="bg-[#FAEBDD] flex items-center gap-2 p-2 w-fit rounded-md text-[#D9730D]">
              <Info className="h-4 w-4" />
              <span className="text-xs">Review follow-ups before queuing.</span>
            </div>
          </div>
          <FollowUpList
            access={access}
            parsedCompletedData={parsedCompletedData}
            parsedUserProfile={parsedUserProfile}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
