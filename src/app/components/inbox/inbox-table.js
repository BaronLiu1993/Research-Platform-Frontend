"use client";

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
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/shadcomponents/ui/table";
import { Input } from "@/shadcomponents/ui/input";
import { toast } from "sonner";
import { Button } from "@/shadcomponents/ui/button";

export function InboxTable({
  data = [],
  generateColumns,
  access,
  userName,
  userEmail,
}) {
  const router = useRouter();
  const params = useSearchParams();

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isNavigationLoading, setIsNavigationLoading] = useState(false);
  const [rows, setRows] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);
  const [pendingDelete, setPendingDelete] = useState(new Set());
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    setIsNavigationLoading(false);
  }, [data]);

  useEffect(() => setRows(data), [data]);

  const handleSelectedRows = useCallback(
    (prof) => {
      const isCurrentlySelected = selectedRows.find((p) => p.id === prof.id);
      setSelectedRows((prev) => {
        const exists = prev.find((p) => p.id === prof.id);

        if (exists) {
          return prev.filter((p) => p.id !== prof.id);
        } else {
          return [...prev, prof];
        }
      });

      if (isCurrentlySelected) {
        toast.success("Deselected Professor");
      } else {
        toast.success("Selected Professor");
      }
    },
    [selectedRows]
  );

  const onRemove = useCallback(
    async (id) => {
      const prev = rows;
      setPendingDelete((s) => new Set(s).add(id));
      setRows((prev) => prev.filter((r) => r.id !== id));

      try {
        setSelectedRows((prevSelected) =>
          prevSelected.filter((r) => r.id !== id)
        );
      } catch (e) {
        setRows(prev);
      } finally {
        setPendingDelete((s) => {
          const next = new Set(s);
          next.delete(id);
          return next;
        });
      }
    },
    [rows, access]
  );

  const columns = useMemo(
    () =>
      generateColumns(
        access,
        onRemove,
        pendingDelete,
        handleSelectedRows,
        userName,
        userEmail,
        selectedRows
      ),
    [
      access,
      onRemove,
      pendingDelete,
      handleSelectedRows,
      userName,
      userEmail,
      selectedRows,
    ]
  );

  const goToPage = useCallback(
    (page) => {
      if (isNavigationLoading) return;

      setIsNavigationLoading(true);

      window.scrollTo({ top: 0, behavior: "smooth" });

      const next = new URLSearchParams(params?.toString());
      next.set("page", String(page));
      router.push(`?${next.toString()}`, { scroll: true });
    },
    [isNavigationLoading, params, router]
  );

  const table = useReactTable({
    data: rows,
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

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 md:p-6 rounded-xs">
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <div>
          <div className="flex items-center gap-4 py-4 px-4">
            <Input
              placeholder="Find Threads..."
              value={table.getColumn("name")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-xs rounded-xs"
            />
           
          </div>
        </div>
        <Table className="text-sm min-w-full rounded-xs">
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
          <TableBody aria-busy={isNavigationLoading}>
            {isNavigationLoading ? (
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
    </div>
  );
}
