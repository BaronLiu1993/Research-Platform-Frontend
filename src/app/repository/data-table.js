"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  VisibilityState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { Info } from "lucide-react";

import { Button } from "@/shadcomponents/ui/button";

import { Badge } from "@/shadcomponents/ui/badge";

import { ChevronDown } from "lucide-react";

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
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcomponents/ui/table";

import { Input } from "@/shadcomponents/ui/input";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="rounded-md">
      <div className="flex items-center p-4">
        <div className="space-y-3">
          <Input
            placeholder="Filter research interests..."
            value={
              table.getColumn("research_interests")?.getFilterValue() ?? ""
            }
            onChange={(event) =>
              table
                .getColumn("research_interests")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm font-sans"
          />
          <div className="flex space-x-2">
            <p className="border-1 p-1 text-xs font-sans rounded-md bg-purple-100 text-purple-500 flex items-center border-purple-200">
              <Info className="w-6 h-6 p-1 text-purple-500" />
              <span>Sorted By:</span>
              <span className="ml-1 text-purple-600 font-bold">
                Research Interests
              </span>
            </p>

            <Badge className="bg-white border-1 border-gray-200 text-gray-400">
              Faculty
              <ChevronDown />
            </Badge>
            <Badge className="bg-white border-1 border-gray-200 text-gray-400">
              Department
              <ChevronDown />
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Badge variant="outline" className="ml-auto font-sans text-gray-400 border-gray-200">
                  Columns
                  <ChevronDown />

                </Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Table className="border-1 rounded-md">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const sortDirection = header.column.getIsSorted();

                return (
                  <TableHead
                    key={header.id}
                    onClick={
                      canSort
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    className={canSort ? "cursor-pointer select-none" : ""}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {sortDirection === "asc"
                      ? " 🔼"
                      : sortDirection === "desc"
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
              <TableRow key={row.id} className="p-4">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-4 py-6 font-sans font-light"
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
                className="h-24 text-center font-sans"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
