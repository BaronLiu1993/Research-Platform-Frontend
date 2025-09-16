// DataTable.jsx
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useSavedStore } from "@/app/store/useSavedStore";
import { useAppliedStore } from "@/app/store/useAppliedStore";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcomponents/ui/dropdown-menu";
import { Badge } from "@/shadcomponents/ui/badge";
import { Input } from "@/shadcomponents/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/shadcomponents/ui/table";
import Link from "next/link";
import {
  Beaker,
  Blocks,
  Brain,
  ChevronDown,
  CircuitBoard,
  Code,
  Heart,
  Microscope,
  Settings,
} from "lucide-react";

export function DataTable({
  data = [],
  userId,
  generateColumns,
  pageNumber = 1,
  search = "",
  access,
  savedProfessors,
  appliedProfessors,
}) {
  const router = useRouter();
  const params = useSearchParams();

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [query, setQuery] = useState(search ?? "");

  const columns = useMemo(
    () => generateColumns(userId, access),
    [userId, access, generateColumns]
  );

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    state: { sorting, columnFilters, columnVisibility },
  });

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const next = new URLSearchParams(params?.toString());
      next.set("page", "1");
      next.set("search", query.trim());
      router.push(`?${next.toString()}`);
    },
    [params, query, router]
  );

  const setSaved = useSavedStore((state) => state.setSavedStore);
  const setApplied = useAppliedStore((state) => state.setAppliedStore);

  useEffect(() => {
    if (savedProfessors?.data) setSaved(savedProfessors.data);
    if (appliedProfessors?.data) setApplied(appliedProfessors.data);
  }, [savedProfessors, appliedProfessors, setSaved, setApplied]);

  const prevPage = Math.max(1, Number(pageNumber) - 1);
  const nextPage = Number(pageNumber) + 1;

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 md:p-6">
      {/* Controls */}
      <div className="rounded-lg py-2">
        <div className="flex flex-col gap-3 md:gap-2 pb-2">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-[14rem] md:w-[18rem]"
                placeholder="🔎 Search..."
              />
              <button
                type="submit"
                className="text-sm cursor-pointer font-medium text-white bg-[#4584F3] px-3 py-1.5 hover:bg-[#3574E2] transition-colors rounded-md"
              >
                Search
              </button>
            </form>

            {/* Institution filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center rounded-md bg-white border px-2 py-1 text-gray-600 text-xs">
                  Institution <ChevronDown className="w-3 h-3 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-main">
                <DropdownMenuItem className="text-xs font-normal text-[#37352F]">
                  <span className="rounded-full bg-[#9065B0] h-2 w-2 mr-2" />
                  University Health Network
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs font-normal text-[#37352F]">
                  <span className="rounded-full bg-[#337EA9] h-2 w-2 mr-2" />
                  University of Toronto
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs font-normal text-[#37352F]">
                  <span className="rounded-full bg-[#D44C47] h-2 w-2 mr-2" />
                  McMaster University
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs font-normal text-[#CB912F]">
                  <span className="rounded-full bg-[#CB912F] h-2 w-2 mr-2" />
                  Queen's University
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Faculty filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center rounded-md bg-white border px-2 py-1 text-gray-600 text-xs">
                  Faculty <ChevronDown className="w-3 h-3 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-main">
                <DropdownMenuItem className="text-xs font-normal text-[#37352F]">
                  <Blocks className="text-[#D9730D] w-4 h-4 mr-2" />
                  Applied Science and Engineering
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs font-normal text-[#37352F]">
                  <Code className="text-[#337EA9] w-4 h-4 mr-2" />
                  Computer Science
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs font-normal text-[#37352F]">
                  <Heart className="text-[#D44C47] w-4 h-4 mr-2" />
                  Health Science
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Department filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center rounded-md bg-white border px-2 py-1 text-gray-600 text-xs">
                  Department <ChevronDown className="w-3 h-3 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-main">
                <DropdownMenuItem className="text-xs font-normal text-[#37352F]">
                  <Settings className="w-4 h-4 mr-2" />
                  Mechanical Engineering
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs font-normal text-[#37352F]">
                  <CircuitBoard className="text-[#CB912F] w-4 h-4 mr-2" />
                  Computer Engineering
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs font-normal text-[#37352F]">
                  <Microscope className="text-[#D44C47] w-4 h-4 mr-2" />
                  Cancer Research
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs font-normal text-[#37352F]">
                  <Beaker className="text-[#9065B0] w-4 h-4 mr-2" />
                  Biochemistry
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs font-normal text-[#37352F]">
                  <Brain className="text-[#C14C8A] w-4 h-4 mr-2" />
                  Neuroscience
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <Table className="text-sm min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  return (
                    <TableHead
                      key={header.id}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={
                        "text-xs whitespace-nowrap " + (canSort ? "cursor-pointer select-none" : "")
                      }
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {sortDir === "asc" ? " 🔼" : sortDir === "desc" ? " 🔽" : ""}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-2 py-2 align-middle">
                      <div className="min-w-0 max-w-[28rem] truncate">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center text-xs py-6">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pager */}
      <div className="flex justify-end mt-3 gap-3">
        <Link
          className={`text-sm font-medium text-white px-3 py-1.5 rounded-md transition-colors ${
            Number(pageNumber) <= 1
              ? "bg-gray-300 cursor-not-allowed pointer-events-none"
              : "bg-[#4584F3] hover:bg-[#3574E2]"
          }`}
          href={`?page=${prevPage}&search=${encodeURIComponent(search ?? "")}`}
          aria-disabled={Number(pageNumber) <= 1}
        >
          Previous
        </Link>
        <Link
          className="text-sm font-medium text-white bg-[#4584F3] px-3 py-1.5 hover:bg-[#3574E2] transition-colors rounded-md"
          href={`?page=${nextPage}&search=${encodeURIComponent(search ?? "")}`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}


