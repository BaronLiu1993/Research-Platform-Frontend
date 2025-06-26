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
  Clock,
  Cloud,
  Database,
  Ellipsis,
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

export function SavedDataTable({
  columns,
  data,
  userId,
  draftData,
  parsedUserProfile,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [snippetId, setSnippetId] = useState("");

  console.log(snippetId);
  console.log(draftData);
  console.log(parsedUserProfile);
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
  return (
    <div className="px-4">
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

          <SheetContent>
            <SheetTitle>
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
              <Info className = "h-4 w-4"/>
              <span className = "text-xs"> Review Your Drafts Before Bulk Sending</span>
            </div>
          </div>

          <DraftList draftData={draftData} parsedUserProfile = {parsedUserProfile}/>
        </div>
      </div>
    </div>
  );
}
