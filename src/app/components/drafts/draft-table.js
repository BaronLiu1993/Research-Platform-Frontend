"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SendDrafts } from "@/app/api/email/send/sendDraft";
import { SendDraftsWithAttachments } from "@/app/api/email/send/sendDraftWithAttachments";

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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcomponents/ui/dropdown-menu";

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

import {
  ArrowRightFromLine,
  MailCheck,
  Newspaper,
  Paperclip,
  School,
} from "lucide-react";

export function DraftsTable({
  data = [],
  generateColumns,
  pageNumber = 1,
  access,
  userName,
  userEmail,
  labelId,
  fileExists,
}) {
  const router = useRouter();
  const params = useSearchParams();

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isNavigationLoading, setIsNavigationLoading] = useState(false);
  const [removedIds, setRemovedIds] = useState(() => new Set());
  const [selectedRows, setSelectedRows] = useState([]);
  const [pendingDelete, setPendingDelete] = useState(new Set());
  const [isSending, setIsSending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsNavigationLoading(false);
    setRemovedIds(new Set());
    setSelectedRows([]);
    setPendingDelete(new Set());
  }, [pageNumber]);

  const rows = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];
    if (!removedIds.size) return data;
    return data.filter((r) => !removedIds.has(r.id));
  }, [data, removedIds]);

  const handleSelectedRows = useCallback((prof) => {
    setSelectedRows((prev) => {
      const alreadySelected = prev.some((p) => p.id === prof.id);
      if (alreadySelected) return prev.filter((p) => p.id !== prof.id);

      if (prev.length >= 5) {
        toast.error("You can only select up to 5 professors.");
        return prev;
      }
      return [...prev, prof];
    });
  }, []);

  const onRemove = useCallback(async (id) => {
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

    setSelectedRows((prevSelected) => prevSelected.filter((r) => r.id !== id));

    setPendingDelete((s) => {
      const next = new Set(s);
      next.delete(id);
      return next;
    });
  }, []);

  const columns = useMemo(
    () =>
      generateColumns(
        access,
        onRemove,
        pendingDelete,
        handleSelectedRows,
        userName,
        userEmail,
        selectedRows,
        setIsEditing
      ),
    [
      access,
      onRemove,
      pendingDelete,
      handleSelectedRows,
      userName,
      userEmail,
      selectedRows,
      generateColumns,
      isEditing,
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

  const removeSelectedFromUI = useCallback(() => {
    const idsToRemove = new Set(selectedRows.map((r) => r.id));

    setRemovedIds((prev) => {
      const next = new Set(prev);
      idsToRemove.forEach((id) => next.add(id));
      return next;
    });

    setSelectedRows([]);
    setPendingDelete(new Set());
  }, [selectedRows]);

  const handleSendDrafts = async () => {
    toast.dismiss();

    if (!selectedRows.length) {
      toast.error("Select a Professor!");
      return;
    }

    setIsSending(true);
    const tId = toast.loading("Sending...");

    try {
      const response = await SendDrafts({
        userName,
        userEmail,
        professorData: selectedRows,
        access,
        labelId,
      });

      if (response?.success) {
        toast.success("Sent Emails!", { id: tId });
        removeSelectedFromUI();
      } else {
        toast.error(response?.message || "Failed To Send Drafts", { id: tId });
      }
    } catch {
      toast.error("Failed To Send Drafts", { id: tId });
    } finally {
      setIsSending(false);
    }
  };

  const handleSendDraftsWithAttachments = async ({
    sendResume,
    sendTranscript,
  }) => {
    toast.dismiss();

    if (fileExists?.resumeExists === false && sendResume === true) {
      toast.error("Missing Resume...");
      return;
    }
    if (fileExists?.transcriptExists === false && sendTranscript === true) {
      toast.error("Missing Transcript...");
      return;
    }
    if (!selectedRows.length) {
      toast.error("Select a Professor!");
      return;
    }

    setIsSending(true);
    const tId = toast.loading("Sending...");

    try {
      const response = await SendDraftsWithAttachments({
        userName,
        userEmail,
        professorData: selectedRows,
        access,
        labelId,
        sendResume,
        sendTranscript,
      });

      if (response?.success) {
        toast.success("Sent!", { id: tId });
        removeSelectedFromUI();
      } else {
        toast.error(response?.message || "Failed To Send Drafts", { id: tId });
      }
    } catch {
      toast.error("Failed To Send Drafts", { id: tId });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 md:p-6 rounded-xs">
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <div>
          <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <Input
              placeholder="Find Professors..."
              value={table.getColumn("name")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="w-full rounded-md placeholder:text-xs placeholder:font-medium sm:max-w-xs"
            />

            <div className="flex flex-col w-full gap-2 sm:w-auto sm:flex-row sm:justify-end sm:gap-4">
              <Button
                className="flex w-full items-center justify-center cursor-pointer gap-1.5 text-xs font-medium text-white px-3 py-1.5 rounded-sm bg-[#4584F3] transition-colors hover:bg-[#3574E2] disabled:bg-gray-300 disabled:text-gray-600 disabled:hover:bg-gray-300 sm:w-auto sm:text-sm"
                disabled={selectedRows.length === 0 || isSending}
                onClick={handleSendDrafts}
              >
                <MailCheck className="h-4 w-4" />
                <span>Send Emails</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="flex w-full items-center justify-center cursor-pointer gap-1.5 text-xs font-medium text-white px-3 py-1.5 rounded-sm bg-[#9065B0] transition-colors hover:bg-[#9A6EC0] disabled:bg-gray-300 disabled:text-gray-600 disabled:hover:bg-gray-300 sm:w-auto sm:text-sm"
                    disabled={selectedRows.length === 0 || isSending}
                  >
                    <Paperclip className="h-4 w-4" />
                    <span>Send With Attachments</span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="
                    w-56 font-main
                    [&_[role=menuitem]]:h-auto
                    [&_[role=menuitem]]:items-center
                    [&_[role=menuitem]]:gap-4
                    [&_[role=menuitem]]:overflow-visible
                    [&_[role=menuitem]_svg]:!w-10
                    [&_[role=menuitem]_svg]:!h-10
                  "
                  align="start"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      asChild
                      className="text-xs font-light cursor-pointer focus:bg-gray-100"
                    >
                      <button
                        onClick={() =>
                          handleSendDraftsWithAttachments({
                            sendResume: true,
                            sendTranscript: false,
                          })
                        }
                        className="w-full flex items-center gap-3 p-2 hover:bg-gray-100"
                      >
                        <Newspaper className="p-2 rounded-sm border h-12 w-12 stroke-[1px] text-violet-500 shrink-0" />
                        Only Resume
                      </button>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      asChild
                      className="text-xs hover:bg-gray-100 font-light cursor-pointer"
                    >
                      <button
                        onClick={() =>
                          handleSendDraftsWithAttachments({
                            sendResume: false,
                            sendTranscript: true,
                          })
                        }
                        className="w-full flex items-center gap-3 p-2 hover:bg-gray-100"
                      >
                        <School className="p-2 rounded-sm border h-12 w-12 stroke-[1px] text-blue-500 shrink-0" />
                        Only Transcript
                      </button>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      asChild
                      className="text-xs hover:bg-gray-100 font-light cursor-pointer"
                    >
                      <button
                        onClick={() =>
                          handleSendDraftsWithAttachments({
                            sendResume: true,
                            sendTranscript: true,
                          })
                        }
                        className="w-full flex items-center gap-3 p-2 hover:bg-gray-100"
                      >
                        <ArrowRightFromLine className="p-2 rounded-sm border h-12 w-12 stroke-[1px] text-emerald-500 shrink-0" />
                        Transcript + Resume
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
