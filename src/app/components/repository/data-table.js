"use client";

import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { ChevronDown, PersonStanding } from "lucide-react";
import { Badge } from "@/shadcomponents/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import Link from "next/link";

export function DataTable({ data, userId, generateColumns, pageNumber }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnColumnVisibility] = useState({});

  const columns = useMemo(
    () => generateColumns(userId),
    [userId, generateColumns]
  );

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    state: { sorting, columnFilters, columnVisibility },
  });

  return (
    <div className="rounded-md py-2 w-[55rem]">
      <div className="flex flex-col gap-2 pb-2">
        <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-xs text-[10px]">
          <PersonStanding />
          Full Data Repository
        </Badge>
        <div className="flex flex-wrap gap-2 items-center">
          <div>
            <Badge className="bg-white border text-gray-500 py-1">
              Faculty <ChevronDown className="w-3 h-3 ml-1" />
            </Badge>
            <Badge className="bg-white border text-gray-500 px-2 py-1">
              Department <ChevronDown className="w-3 h-3 ml-1" />
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Badge variant="outline" className="text-gray-500 px-2 py-1">
                Columns <ChevronDown className="w-3 h-3 ml-1" />
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(val) => column.toggleVisibility(!!val)}
                    className="capitalize"
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Table className="text-sm w-[55rem]">
        <TableHeader className = "bg-[#F4EEEE]">
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
                      canSort ? "cursor-pointer select-none text-xs " : "text-xs"
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
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-2 py-2 text-md font-semibold"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

      <div className="flex justify-end mt-2">
          <Link>
            Previous
          </Link>
          <Link>
            Next
          </Link>
      </div>
    </div>
  );
}
