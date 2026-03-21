"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RemoveFromSaved } from "@/app/api/save/removeFromSaved";

import { Button } from "@/shadcomponents/ui/button";
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
import { Mail } from "lucide-react";
import { featureFlags } from "@/lib/featureFlags";

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

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isNavigationLoading, setIsNavigationLoading] = useState(false);

  const [removedIds, setRemovedIds] = useState(() => new Set());

  const [selectedRows, setSelectedRows] = useState([]);
  const [allDataSelectedRows, setAllDataSelectedRows] = useState([]);
  const [pendingDelete, setPendingDelete] = useState(new Set());
  const [isEditing, setIsEditing] = useState(false);

  const isSelectionLimitReached = allDataSelectedRows.length >= 5;

  useEffect(() => {
    setIsNavigationLoading(false);
    setRemovedIds(new Set());
    setSelectedRows([]);
    setAllDataSelectedRows([]);
    setPendingDelete(new Set());
  }, [pageNumber]);

  const rows = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];
    if (!removedIds.size) return data;

    return data.filter((r) => !removedIds.has(r.professor_id));
  }, [data, removedIds]);

  const handleSelectedAllRowData = useCallback((profObj) => {
    setAllDataSelectedRows((prev) => {
      const alreadySelected = prev.some((item) => item.id === profObj.id);
      if (alreadySelected) return prev.filter((item) => item.id !== profObj.id);

      if (prev.length >= 5) {
        toast.error("You Can Only Select Up To 5 Professors");
        return prev;
      }
      return [...prev, profObj];
    });
  }, []);

  const handleSelectedRows = useCallback((profId) => {
    setSelectedRows((prev) => {
      const alreadySelected = prev.includes(profId);
      if (alreadySelected) return prev.filter((id) => id !== profId);
      if (prev.length >= 5) return prev;
      return [...prev, profId];
    });
  }, []);

  const onRemove = useCallback(
    async (id) => {
      setPendingDelete((s) => {
        const next = new Set(s);
        next.add(id);
        return next;
      });

      setRemovedIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });

      setSelectedRows((prev) => prev.filter((pid) => pid !== id));
      setAllDataSelectedRows((prev) => prev.filter((obj) => obj.id !== id));

      try {
        await RemoveFromSaved({ access, id });
        toast.success("Deleted From Workspace");
      } catch (e) {
        setRemovedIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        toast.error("Failed to Remove");
      } finally {
        setPendingDelete((s) => {
          const next = new Set(s);
          next.delete(id);
          return next;
        });
      }
    },
    [access]
  );

  const columns = useMemo(
    () =>
      generateColumns(
        access,
        onRemove,
        pendingDelete,
        handleSelectedRows,
        handleSelectedAllRowData,
        allDataSelectedRows
      ),
    [
      access,
      generateColumns,
      onRemove,
      pendingDelete,
      handleSelectedRows,
      handleSelectedAllRowData,
      allDataSelectedRows,
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
    <div className="w-full max-w-screen-xl mx-auto p-3 sm:p-4 md:p-6 rounded-xs">
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-3 sm:py-4 px-3 sm:px-4">
            <Input
              placeholder="Find Professors..."
              value={table.getColumn("name")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="w-full sm:max-w-xs placeholder:text-xs placeholder:font-medium rounded-md"
            />

            {featureFlags.emailFlow && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="flex w-full items-center justify-center cursor-pointer gap-1.5 text-xs font-medium text-white px-3 py-1.5 rounded-sm bg-[#4584F3] transition-colors hover:bg-[#3574E2] disabled:bg-gray-300 disabled:text-gray-600 disabled:hover:bg-gray-300 sm:w-auto sm:text-sm"
                    disabled={selectedRows.length === 0 || isEditing}
                    onClick={() => setIsEditing(true)}
                  >
                    <Mail className="h-4 w-4" />
                    <span>Draft Emails</span>
                  </Button>
                </DialogTrigger>

                <DialogContent className="w-[95vw] max-w-2xl sm:w-full">
                  <DialogTitle></DialogTitle>
                  <EmailEditor
                    access={access}
                    userEmail={userEmail}
                    userName={userName}
                    selectedProfessors={selectedRows}
                    fullSelectedProfessors={allDataSelectedRows}
                    handleIsEditing={setIsEditing}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <Table className="text-xs sm:text-sm min-w-full rounded-xs">
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
                        "text-[11px] sm:text-xs whitespace-nowrap " +
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
                    <div className="flex flex-col sm:flex-row items-start justify-between w-full p-3 rounded-md gap-3">
                      <div className="flex items-start gap-3 w-full">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex flex-col gap-1 w-full">
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
                    <TableCell
                      key={cell.id}
                      className="px-2 py-2 align-middle text-xs sm:text-sm"
                    >
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
                  className="text-center font-main font-medium text-xs py-6"
                >
                  No Results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-row justify-between gap-2 mt-3 sm:justify-end sm:gap-3">
        <button
          type="button"
          onClick={() => goToPage(Math.max(1, Number(pageNumber) - 1))}
          disabled={isNavigationLoading || Number(pageNumber) <= 1}
          className={`text-sm font-medium cursor-pointer text-white px-3 py-1.5 rounded-sm transition-colors
      ${
        isNavigationLoading || Number(pageNumber) <= 1
          ? "bg-gray-300"
          : "bg-[#4584F3] hover:bg-[#3574E2]"
      }
    `}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() => goToPage(Number(pageNumber) + 1)}
          disabled={isNavigationLoading}
          className={`text-sm cursor-pointer font-medium text-white px-3 py-1.5 rounded-sm transition-colors
      ${isNavigationLoading ? "bg-gray-300" : "bg-[#4584F3] hover:bg-[#3574E2]"}
    `}
        >
          Next
        </button>
      </div>
    </div>
  );
}
