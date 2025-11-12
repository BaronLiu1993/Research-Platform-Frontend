"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RemoveFromSaved } from "@/app/api/save/removeFromSaved";

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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shadcomponents/ui/composedialog";
import EmailEditor from "./editor/emailEditor";

export function WorkspaceTable({
  data = [],
  generateColumns,
  pageNumber = 1,
  access,
  userName,
  userEmail,
}) {
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    setIsNavigationLoading(false);
  }, [data]);

  useEffect(() => setRows(data), [data]);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isNavigationLoading, setIsNavigationLoading] = useState(false);
  const [rows, setRows] = useState(data);
  const [selectedRows, setSelectedRows] = useState([]);
  const [allDataSelectedRows, setAllDataSelectedRows] = useState([]);
  const [pendingDelete, setPendingDelete] = useState(new Set());
  const isSelectionLimitReached = allDataSelectedRows.length >= 5;

  console.log(selectedRows);
  console.log(allDataSelectedRows);

  const handleSelectedAllRowData = (profObj) => {
    try {
      setAllDataSelectedRows((prev) => {
        const alreadySelected = prev.some((item) => item.id === profObj.id);
        if (alreadySelected) {
          return prev.filter((item) => item.id !== profObj.id);
        } else if (prev.length >= 5) {
          toast.error("You can only select up to 5 professors.");
          return prev;
        } else {
          return [...prev, profObj];
        }
      });
    } catch (error) {}
  };

  const handleSelectedRows = (profId) => {
    try {
      setSelectedRows((prev) => {
        const alreadySelected = prev.includes(profId);

        if (alreadySelected) {
          return prev.filter((id) => id !== profId);
        } else if (prev.length >= 5) {
          return prev;
        } else {
          return [...prev, profId];
        }
      });
    } catch (error) {}
  };

  const onRemove = useCallback(
    async (id) => {
      const prev = rows;
      setPendingDelete((s) => new Set(s).add(id));
      setRows(prev.filter((r) => (r.professor_id === id ? false : true)));
      try {
        await RemoveFromSaved({ access, id });
        toast.success("Removed!");
      } catch (e) {
        setRows(prev);
        toast.error("Failed to remove");
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
        handleSelectedAllRowData,
        isSelectionLimitReached
      ),
    [
      access,
      generateColumns,
      pendingDelete,
      onRemove,
      handleSelectedRows,
      handleSelectedAllRowData,
      isSelectionLimitReached,
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
              placeholder="Find Professors..."
              value={table.getColumn("name")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-xs rounded-xs"
            />
            <Dialog>
              <DialogTrigger className="text-sm cursor-pointer font-medium text-white px-3 py-1.5 rounded-sm bg-none transition-colors bg-[#4584F3] hover:bg-[#3574E2]">
                Draft Emails
              </DialogTrigger>
              <DialogContent>
                <DialogTitle></DialogTitle>
                <EmailEditor
                  access={access}
                  userEmail={userEmail}
                  userName={userName}
                  selectedProfessors={selectedRows}
                  fullSelectedProfessors={allDataSelectedRows}
                />
              </DialogContent>
            </Dialog>
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
