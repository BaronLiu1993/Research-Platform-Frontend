"use client";

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  startTransition,
} from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

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
  TableRow,
} from "@/shadcomponents/ui/table";
import { Input } from "@/shadcomponents/ui/input";

export function InboxTable({
  data = [],
  generateColumns,
  access,
  userName,
  userEmail,
  pageNumber,
}) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isNavigationLoading, setIsNavigationLoading] = useState(false);

  const paramsKey = params?.toString() ?? "";
  useEffect(() => {
    if (isNavigationLoading) setIsNavigationLoading(false);
  }, [pathname, paramsKey]);

  const columns = useMemo(() => {
    return generateColumns(access);
  }, [generateColumns, access, userName, userEmail]);

  const pushWithTransition = useCallback(
    (url, options) => {
      startTransition(() => router.push(url, options));
    },
    [router]
  );

  const goToPage = useCallback(
    (page) => {
      if (isNavigationLoading) return;

      setIsNavigationLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      const next = new URLSearchParams(paramsKey);
      next.set("page", String(page));

      pushWithTransition(`?${next.toString()}`, { scroll: true });
    },
    [isNavigationLoading, paramsKey, pushWithTransition]
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

  const nameColumn = table.getColumn("name");
  const nameFilterValue = nameColumn?.getFilterValue() ?? "";

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 md:p-6 rounded-xs">
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <div className="flex items-center gap-4 py-4 px-4">
          <Input
            placeholder="Find Threads..."
            value={nameFilterValue}
            onChange={(event) => nameColumn?.setFilterValue(event.target.value)}
            className="max-w-xs rounded-md placeholder:font-medium placeholder:text-xs"
          />
        </div>

        <Table className="text-sm min-w-full rounded-xs">
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
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-100 hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.14)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]"
                >
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
                  className="text-center font-main font-medium text-xs py-6"
                >
                  No Results
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
              isNavigationLoading
                ? "bg-gray-300"
                : "bg-[#4584F3] hover:bg-[#3574E2]"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
