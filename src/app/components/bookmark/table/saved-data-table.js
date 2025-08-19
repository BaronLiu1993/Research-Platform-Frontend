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
import { DialogDescription } from "@radix-ui/react-dialog";
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
  X,
} from "lucide-react";
import { Badge } from "@/shadcomponents/ui/badge";
import DraftList from "./snippet/draftList";
import FollowUpList from "./snippet/followUpList";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcomponents/ui/tabs"; // Import Tabs components

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

  const handleGenerateDrafts = async () => {
    if (draftsView) {
      setDraftsView(false);
    } else {
      setDraftsView(true);
    }
  };

  const handleUploadTranscript = async () => {
    try {
      await UploadTranscript(transcript, userId, access);
      toast("Uploaded Transcript");
    } catch {
      toast("Failed to Upload");
    }
  };

  const handleUploadResume = async () => {
    try {
      await UploadResume(resume, userId, access);
      toast("Uploaded Resume");
    } catch {
      toast("Failed to Upload");
    }
  };

  return (
    <div className="px-4 font-main">
      <Tabs defaultValue="file-uploads">
        <TabsList className="my-6 flex gap-4">
          <TabsTrigger value="file-uploads" className = "rounded-sm">Check File Uploads</TabsTrigger>
          <TabsTrigger value="saved-professors">Compose Mass Emails</TabsTrigger>
          <TabsTrigger value="reviewed-drafts">Review Mass Drafts</TabsTrigger>
          <TabsTrigger value="follow-ups">Automate Follow Up</TabsTrigger>
        </TabsList>

        <TabsContent value="file-uploads">
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
                  All Your Uploaded Files are Saved On Your Personal Google
                  Drive to Ensure Data Privacy
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  {parsedResumeData.success ? (
                    <div className="bg-[#EDF3EC] flex gap-2 items-center p-1 w-fit rounded-xs text-[#448361] cursor-pointer">
                      <FileCheck2 className="h-4 w-4" />
                      <span className="text-xs">
                        Preview or Modify Uploaded Resume
                      </span>
                    </div>
                  ) : (
                    <div className="bg-[#FDEBEC] flex gap-2 items-center p-1 w-fit rounded-xs text-[#D44C47] cursor-pointer">
                      <FileX2 className="h-4 w-4" />
                      <span className="text-xs">Resume Missing</span>
                    </div>
                  )}
                </DialogTrigger>
                <DialogContent className="max-w-xl p-4">
                  {parsedResumeData.success ? (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <h1 className="font-semibold">
                          {parsedResumeData.data.name}
                        </h1>
                        <div className="flex gap-4">
                          <a
                            className="text-[#37352F] rounded-sm hover:bg-[#f1f1efd4] bg-[#F1F1EF] font-semibold text-xs p-1 gap-1 flex items-center justify-center"
                            target="_blank"
                            href={parsedResumeData.data.webViewLink}
                          >
                            <File className="p-1" />
                            <span>View In Google Drive</span>
                          </a>
                          <a
                            className="text-[#37352F] hover:bg-[#f1f1efd4] bg-[#F1F1EF] font-semibold text-xs p-1 gap-1 rounded-sm flex items-center justify-center"
                            target="_blank"
                            href={parsedResumeData.data.webContentLink}
                          >
                            <Download className="p-1" />
                            <span>Download File</span>
                          </a>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {resume ? (
                          <div className="border-2 border-gray-100 font-main rounded-md p-5 flex gap-2">
                            <FileCheck2 className="stroke-1 text-gray-500" />
                            <div className="flex justify-between w-full">
                              <div>
                                <h1 className="font-semibold text-sm">
                                  {resume.name.slice(0, 40)}...
                                </h1>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-xs text-gray-500">
                                    {Math.ceil(resume.size / 1000)} KB
                                  </span>
                                  <div className="bg-gray-300 rounded-full h-1 w-1"></div>
                                  <span className="font-semibold text-xs text-red-500">
                                    Not Uploaded
                                  </span>
                                </div>
                              </div>
                              <button onClick={() => setResume(null)}>
                                <Trash2 className="text-gray-400 cursor-pointer p-1 rounded-xs stroke-2 h-6 w-6 hover:text-[#D44C47] hover:bg-[#FDEBEC]" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="border-3 border-dashed gap-4 rounded-lg py-10 px-5 font-main flex flex-col items-center cursor-pointer">
                            <div className="flex flex-col items-center">
                              <CloudUpload />
                              <span className="font-semibold text-md">
                                Choose a file or drag and drop it here.
                              </span>
                              <span className="text-gray-400 text-sm">
                                JPEG, PNG and PDF are accepted
                              </span>

                              <Input
                                onChange={(e) => setResume(e.target.files?.[0])}
                                type="file"
                                className="hidden"
                              />
                            </div>
                            <div className="border-1 text-gray-600 font-medium rounded-md text-sm p-1">
                              Browse Here
                            </div>
                          </label>
                        )}

                        <div className="flex gap-2 py-4">
                          <DialogClose className="text-sm font-main font-medium flex items-center gap-1 text-[#f6f6f7] bg-[#D44C47] px-3 py-1.5 rounded-sm cursor-pointer transition-colors hover:bg-[#B91C1C]">
                            Cancel
                          </DialogClose>
                          {resume && (
                            <DialogClose>
                              <Button
                                onClick={handleUploadResume}
                                className="text-sm font-main font-medium flex items-center gap-1 text-[#f6f6f7] bg-[#4DAB9A] px-3 py-1 rounded-sm cursor-pointer transition-colors hover:bg-[#3B8C7E]"
                              >
                                Upload
                              </Button>
                            </DialogClose>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Input
                        onChange={(e) => setResume(e.target.files?.[0])}
                        type="file"
                        className="rounded-xs"
                      />
                      {resume && (
                        <Button
                          onClick={handleUploadResume}
                          className="text-[#37352F] bg-[#F1F1EF] font-semibold w-fit rounded-xs text-xs"
                        >
                          Upload
                        </Button>
                      )}
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  {parsedTranscriptData.success ? (
                    <div className="bg-[#EDF3EC] flex gap-2 items-center p-1 w-fit rounded-xs text-[#448361] cursor-pointer">
                      <FileCheck2 className="h-4 w-4" />
                      <span className="text-xs">
                        Preview or Modify Uploaded Transcript
                      </span>
                    </div>
                  ) : (
                    <div className="bg-[#FDEBEC] flex gap-2 items-center p-1 w-fit rounded-xs text-[#D44C47] cursor-pointer">
                      <FileX2 className="h-4 w-4" />
                      <span className="text-xs">Transcript Missing</span>
                    </div>
                  )}
                </DialogTrigger>

                <DialogContent className="max-w-xl p-4">
                  {parsedTranscriptData.success ? (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <h1 className="font-semibold">
                          {parsedTranscriptData.data.name}
                        </h1>
                        <div className="flex gap-4">
                          <a
                            className="text-[#37352F] rounded-sm hover:bg-[#f1f1efd4] bg-[#F1F1EF] font-semibold text-xs p-1 gap-1 flex items-center justify-center"
                            target="_blank"
                            href={parsedTranscriptData.data.webViewLink}
                          >
                            <File className="p-1" />
                            <span>View In Google Drive</span>
                          </a>
                          <a
                            className="text-[#37352F] hover:bg-[#f1f1efd4] bg-[#F1F1EF] font-semibold text-xs p-1 gap-1 rounded-sm flex items-center justify-center"
                            target="_blank"
                            href={parsedTranscriptData.data.webContentLink}
                          >
                            <Download className="p-1" />
                            <span>Download File</span>
                          </a>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {transcript ? (
                          <div className="border-2 border-gray-100 font-main rounded-md p-5 flex gap-2">
                            <FileCheck2 className="stroke-1 text-gray-500" />
                            <div className="flex justify-between w-full">
                              <div>
                                <h1 className="font-semibold text-sm">
                                  {transcript.name.slice(0, 40)}...
                                </h1>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-xs text-gray-500">
                                    {Math.ceil(transcript.size / 1000)} KB
                                  </span>
                                  <div className="bg-gray-300 rounded-full h-1 w-1"></div>
                                  <span className="font-semibold text-xs text-red-500">
                                    Not Uploaded
                                  </span>
                                </div>
                              </div>
                              <button onClick={() => setTranscript(null)}>
                                <Trash2 className="text-gray-400 cursor-pointer p-1 rounded-xs stroke-2 h-6 w-6 hover:text-[#D44C47] hover:bg-[#FDEBEC]" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="border-3 border-dashed gap-4 rounded-lg py-10 px-5 font-main flex flex-col items-center cursor-pointer">
                            <div className="flex flex-col items-center">
                              <CloudUpload />
                              <span className="font-semibold text-md">
                                Choose a file or drag and drop it here.
                              </span>
                              <span className="text-gray-400 text-sm">
                                JPEG, PNG and PDF are accepted
                              </span>
                              <Input
                                onChange={(e) =>
                                  setTranscript(e.target.files?.[0])
                                }
                                type="file"
                                className="hidden"
                              />
                            </div>
                            <div className="border-1 text-gray-600 font-medium rounded-md text-sm p-1">
                              Browse Here
                            </div>
                          </label>
                        )}

                        <div className="flex gap-2 py-4">
                          <DialogClose className="text-sm font-main font-medium flex items-center gap-1 text-[#f6f6f7] bg-[#D44C47] px-3 py-1.5 rounded-sm cursor-pointer transition-colors hover:bg-[#B91C1C]">
                            Cancel
                          </DialogClose>
                          {transcript && (
                            <DialogClose>
                              <Button
                                onClick={handleUploadTranscript}
                                className="text-sm font-main font-medium flex items-center gap-1 text-[#f6f6f7] bg-[#4DAB9A] px-3 py-1 rounded-sm cursor-pointer transition-colors hover:bg-[#3B8C7E]"
                              >
                                Upload
                              </Button>
                            </DialogClose>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Input
                        onChange={(e) => setTranscript(e.target.files?.[0])}
                        type="file"
                        className="rounded-xs"
                      />
                      {transcript && (
                        <Button
                          onClick={handleUploadTranscript}
                          className="text-[#37352F] bg-[#F1F1EF] font-semibold w-fit rounded-xs text-xs"
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

        <TabsContent value="saved-professors" className = "py-4">
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
              placeholder="Find Professors..."
              value={table.getColumn("name")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm rounded-xs"
            />
            <Sheet
              open={isOpen}
              onOpenChange={(open) => {
                if (table.getSelectedRowModel().rows.length === 0) {
                  toast("No Professor Selected");
                } else {
                  setIsOpen(open);
                }
              }}
            >
              <SheetTrigger asChild>
                <Button className="text-sm cursor-pointer font-medium text-white bg-[#529CCA] px-3 py-1.5 hover:bg-[#4179B8] transition-colors rounded-xs">
                  <Mail />
                  Begin Mail Merge
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
                          {draftsView && (
                            <button
                              onClick={handleGenerateDrafts}
                              className="text-sm cursor-pointer font-main font-medium flex items-center gap-1 text-white bg-[#4584F3] px-3 py-1.5 hover:bg-[#3574E2] transition-colors rounded-sm"
                            >
                              <DraftingCompass />
                              Generate Drafts
                            </button>
                          )}
                        </DialogTrigger>
                        <DialogContent>
                          <DialogTitle></DialogTitle>
                          <DialogDescription>
                            <ComposeEditor
                              access={access}
                              userId={userId}
                              snippetId={snippetId}
                              setSnippetId={setSnippetId}
                              handleGenerateDrafts={handleGenerateDrafts}
                              setGenerateView={setGenerateView}
                            />
                          </DialogDescription>
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
          </div>
        </TabsContent>

        <TabsContent value="reviewed-drafts">
          <div className="py-4">
            <div className="font-semibold flex gap-2">
              <Paperclip className="text-[#787774]" />
              Reviewed Drafts
            </div>
            <div className="flex items-center py-2 space-x-2">
              <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-xs text-[10px]">
                <Pencil />
                Edit Drafts
              </Badge>
              <div className="rounded-full h-1 w-1 bg-[#37352F]"></div>
              <h2 className="text-xs font-semibold text-[10px] text-[#37352F]">
                By Jie Xuan Liu
              </h2>
            </div>
            <div className="bg-[#FAEBDD] flex gap-2 items-center p-1 w-fit rounded-xs text-[#D9730D]">
              <Info className="h-4 w-4" />
              <span className="text-xs">
                Edit Your Drafts By Clicking on the Professors Emails. Review
                Drafts Before Bulk Sending.
              </span>
            </div>
          </div>
          <DraftList
            access={access}
            draftData={draftData}
            parsedUserProfile={parsedUserProfile}
          />
        </TabsContent>

        <TabsContent value="follow-ups">
          <div className="py-4">
            <div className="font-semibold flex gap-2">
              <Bot className="text-[#787774]" />
              Automate Follow Up
            </div>
            <div className="flex items-center py-2 space-x-2">
              <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-xs text-[10px]">
                <HammerIcon />
                Generate Follow Up
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
            access={access}
            parsedCompletedData={parsedCompletedData}
            parsedUserProfile={parsedUserProfile}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
