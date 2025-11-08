"use client";

import { useSavedStore } from "@/app/store/useSavedStore";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "react-select";
import { filterOptions } from "../dropdowns/filterOptions";
import { Skeleton } from "@/shadcomponents/ui/skeleton";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Input } from "@/shadcomponents/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/shadcomponents/ui/table";
import { Label } from "@/shadcomponents/ui/label";

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

  const flatOptions = filterOptions.flatMap((group) => group.options);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isNavigationLoading, setIsNavigationLoading] = useState(false);
  const [query, setQuery] = useState(search ?? "");
  const [filters, setFilters] = useState({
    school: [],
    faculty: [],
    department: [],
  });

  const columns = useMemo(
    () => generateColumns(access),
    [access, generateColumns]
  );

  const goToPage = useCallback(
    (page) => {
      if (isNavigationLoading) return;
      setIsNavigationLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      const next = new URLSearchParams(params?.toString());
      next.set("page", String(page));
      next.set("search", search ?? "");
      Object.entries(filters).forEach(([key, val]) => {
        if (Array.isArray(val) && val.length > 0) {
          next.set(key, val.join(","));
        } else {
          next.delete(key);
        }
      });
      router.push(`?${next.toString()}`, { scroll: true });
    },
    [isNavigationLoading, params, router, search, filters]
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
      Object.entries(filters).forEach(([key, val]) => {
        if (Array.isArray(val) && val.length > 0) {
          next.set(key, val.join(","));
        } else {
          next.delete(key);
        }
      });
      router.push(`?${next.toString()}`);
    },
    [params, query, router, filters]
  );

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 md:p-6">
      <div className="rounded-lg py-2">
        <div className="flex flex-col gap-3 justify-center md:gap-2 pb-2">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <div>
              <form
                onSubmit={handleSearch}
                className="flex flex-wrap items-end gap-3 md:gap-4"
              >
                <div className="flex flex-col gap-2">
                  <Label className="text-xs">🔎 Query Research Interests</Label>
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-10 w-[14rem] md:w-[18rem] placeholder:text-xs font-main text-xs font-medium"
                    placeholder="Search..."
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-xs">Filters</Label>
                  <div className="flex items-center">
                    <Select
                      isMulti
                      closeMenuOnSelect={false}
                      isClearable
                      options={filterOptions}
                      name="filters"
                      placeholder="Pick Filters..."
                      value={flatOptions.filter((opt) =>
                        filters[opt.category]?.includes(opt.value)
                      )}
                      onChange={(selected) => {
                        const updated = {
                          school: [],
                          faculty: [],
                          department: [],
                        };
                        selected?.forEach((opt) => {
                          if (
                            opt?.category &&
                            Object.prototype.hasOwnProperty.call(
                              updated,
                              opt.category
                            )
                          ) {
                            updated[opt.category].push(opt.value);
                          }
                        });
                        setFilters(updated);
                      }}
                      className="w-[20rem] text-xs font-medium font-main"
                      classNames={{
                        control: (s) =>
                          `!min-h-10 !h-auto !rounded-md !border !border-slate-200 !bg-white 
                           hover:!border-slate-300 focus:!border-[#4584F3] focus:!ring-2 focus:!ring-[#4584F3]/20`,
                        valueContainer: () =>
                          `!px-2 !py-1 !max-h-10 !overflow-y-auto !flex !flex-wrap gap-1`,
                        multiValue: () =>
                          `!bg-slate-100 !rounded-md !px-2 !py-0.5 !text-[11px]`,
                        multiValueLabel: () => `!text-slate-700 !text-[11px]`,
                        multiValueRemove: () =>
                          `!text-slate-500 hover:!bg-slate-200 hover:!text-slate-800 rounded-sm`,
                        menu: () =>
                          `!rounded-md !border !border-slate-200 !shadow-md !mt-1 !bg-white text-xs overflow-hidden`,
                        option: (state) =>
                          `!py-1.5 !px-3 text-xs cursor-pointer transition-colors
                           ${state.isFocused ? "!bg-slate-100" : ""} 
                           ${state.isSelected ? "!bg-[#4584F3] !text-white" : "!text-slate-700"}`,
                      }}
                    />
                  </div>
                </div>

                <div className="self-end">
                  <button
                    type="submit"
                    disabled={isSearchLoading}
                    className={`h-10 inline-flex items-center justify-center text-sm cursor-pointer font-medium text-white px-4 rounded-md transition-colors
        ${isSearchLoading ? "bg-blue-300" : "bg-[#4584F3] hover:bg-[#3574E2]"}`}
                  >
                    {isSearchLoading ? "Querying..." : "Search"}
                  </button>
                </div>
              </form>
            </div>
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
          <TableBody aria-busy={isSearchLoading || isNavigationLoading}>
            {isSearchLoading || isNavigationLoading ? (
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
                      <div className="min-w-0 truncate">
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
        <button
          type="button"
          onClick={() => goToPage(Math.max(1, Number(pageNumber) - 1))}
          disabled={isNavigationLoading || Number(pageNumber) <= 1}
          className={`text-sm font-medium cursor-pointer text-white px-3 py-1.5 rounded-sm transition-colors
      ${
        isNavigationLoading || Number(pageNumber) <= 1
          ? "bg-gray-300"
          : "bg-[#4584F3] hover:bg-[#3574E2]"
      }`}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() => goToPage(Number(pageNumber) + 1)}
          disabled={isNavigationLoading}
          className={`text-sm cursor-pointer font-medium text-white px-3 py-1.5 rounded-sm transition-colors
      ${
        isNavigationLoading ? "bg-gray-300" : "bg-[#4584F3] hover:bg-[#3574E2]"
      }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
