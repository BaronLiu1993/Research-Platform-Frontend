"use client";

import { useSavedStore } from "@/app/store/useSavedStore";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Skeleton } from "@/shadcomponents/ui/skeleton";

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

export function DataTable({
  data = [],
  generateColumns,
  pageNumber = 1,
  search = "",
  access,
  savedProfessors,
}) {
  const router = useRouter();
  const params = useSearchParams();

  const setSaved = useSavedStore((state) => state.setSavedStore);

  useEffect(() => {
    setIsSearchLoading(false);
    setIsNavigationLoading(false);
  }, [data]);

  useEffect(() => {
    if (savedProfessors?.data) setSaved(savedProfessors.data);
  }, [savedProfessors, setSaved]);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isNavigationLoading, setIsNavigationLoading] = useState(false);
  const [query, setQuery] = useState(search ?? "");

  const columns = useMemo(
    () => generateColumns(access),
    [access, generateColumns]
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
      setIsSearchLoading(true);
      const next = new URLSearchParams(params?.toString());
      next.set("page", "1");
      next.set("search", query.trim());
      router.push(`?${next.toString()}`);
    },
    [params, query, router]
  );

  const prevPage = Math.max(1, Number(pageNumber) - 1);
  const nextPage = Number(pageNumber) + 1;

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 md:p-6">
      <div className="rounded-lg py-2">
        <div className="flex flex-col gap-3 md:gap-2 pb-2">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-[14rem] md:w-[18rem]"
                placeholder="Search..."
              />
              <button
                type="submit"
                disabled={isSearchLoading}
                className={`text-sm cursor-pointer font-medium text-white px-3 py-1.5 rounded-md transition-colors ${
                  isSearchLoading ? "bg-blue-400" : "bg-[#4584F3] hover:bg-[#3574E2]"
                }`}
              >
                {isSearchLoading ? "🔎 Searching..." : "👋 Search"}
              </button>
            </form>
          </div>
        </div>
      </div>

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
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      className={
                        "text-xs whitespace-nowrap " +
                        (canSort ? "cursor-pointer select-none" : "")
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {sortDir === "asc"
                        ? " 🔼"
                        : sortDir === "desc"
                          ? " 🔽"
                          : ""}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody aria-busy={isLoading}>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, r) => (
                <TableRow key={`skeleton-row-${r}`} className="animate-pulse">
                  <TableCell colSpan={columns.length} className="p-0">
                    <div className="flex items-start justify-between w-full p-3 rounded-md">
                      <div className="flex items-start gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex flex-col gap-1">
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-3 w-64" />
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Skeleton className="h-6 w-32 rounded-full" />
                            <Skeleton className="h-6 w-40 rounded-full" />
                            <Skeleton className="h-6 w-36 rounded-full" />
                          </div>
                        </div>
                      </div>
                      <Skeleton className="h-6 w-16 rounded-md" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-2 py-2 align-middle">
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
                  className="text-center text-xs py-6"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end mt-3 gap-3">
        <Link
          onClick={() => setIsNavigationLoading(true)}
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
          onClick={() => setIsNavigationLoading(true)}
          className="text-sm font-medium text-white bg-[#4584F3] px-3 py-1.5 hover:bg-[#3574E2] transition-colors rounded-md"
          href={`?page=${nextPage}&search=${encodeURIComponent(search ?? "")}`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
