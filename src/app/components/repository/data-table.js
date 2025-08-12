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

import { Beaker, Blocks, Brain, ChevronDown, CircuitBoard, Code, Heart, Microscope, PersonStanding, Settings } from "lucide-react";
import { Badge } from "@/shadcomponents/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import Link from "next/link";
import { Input } from "@/shadcomponents/ui/input";

export function DataTable({
  data,
  userId,
  generateColumns,
  pageNumber,
  search,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnColumnVisibility] = useState({});
  const [query, setQuery] = useState("");
  console.log(data)
  const columns = useMemo(
    () => generateColumns(userId),
    [userId, generateColumns]
  );

  console.log(query);

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
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex gap-6">
            <div className="flex items-center gap-4">
              <Input
                onChange={(e) => setQuery(e.target.value)}
                className="w-[15rem] rounded-xs"
                placeholder="🔎 Search..."
              />
              <Link
                className="text-sm font-semibold text-[#337EA9] bg-[#E7F3F8] p-2 rounded-sm"
                href={`?page=1&search=${encodeURIComponent(query)}`}
              >
                Search Research Topics
              </Link>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Badge className="bg-white border text-gray-500 px-2 py-1">
                  Institution <ChevronDown className="w-3 h-3 ml-1" />
                </Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xs font-main">
                <DropdownMenuItem className="text-xs rounded-xs font-normal text-[#37352F]">
                  <div className="rounded-full bg-[#9065B0] h-2 w-2"></div>
                  University Health Network
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs rounded-xs font-normal text-[#37352F]">
                  <div className="rounded-full bg-[#337EA9] h-2 w-2"></div>
                  University of Toronto
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs rounded-xs font-normal text-[#37352F]">
                  <div className="rounded-full bg-[#D44C47] h-2 w-2"></div>
                  McMaster University
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs rounded-xs font-normal text-[#37352F]">
                  <div className="rounded-full bg-[#CB912F] h-2 w-2"></div>
                  Queen's University
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Badge className="bg-white border text-gray-500 px-2 py-1">
                  Faculty <ChevronDown className="w-3 h-3 ml-1" />
                </Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xs font-main">
                <DropdownMenuItem className="text-xs rounded-xs font-normal text-[#37352F]">
                  <Blocks className = "text-[#D9730D]"/>
                  Applied Science and Engineering
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs rounded-xs font-normal text-[#37352F]">
                  <Code className = "text-[#337EA9]"/>
                  Computer Science
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs rounded-xs font-normal text-[#37352F]">
                  <Heart className = "text-[#D44C47]"/>
                  Health Science
                </DropdownMenuItem>
                
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Badge className="bg-white border text-gray-500 px-2 py-1">
                  Department <ChevronDown className="w-3 h-3 ml-1" />
                </Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xs font-main">
                <DropdownMenuItem className="text-xs rounded-xs font-normal text-[#37352F]">
                  <Settings className = "text-black"/>
                  Mechanical Engineering
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs rounded-xs font-normal text-[#37352F]">
                  <CircuitBoard className = "text-[#CB912F]"/>
                  Computer Engineering
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs rounded-xs font-normal text-[#37352F]">
                  <Microscope className = "text-[#D44C47]"/>
                  Cancer Research
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs rounded-xs font-normal text-[#37352F]">
                  <Beaker className = "text-[#9065B0]"/>
                  Biochemistry
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs rounded-xs font-normal text-[#37352F]">
                  <Brain className = "text-[#C14C8A]"/>
                  Neuroscience
                </DropdownMenuItem>
                
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Table className="text-sm w-[55rem]">
        <TableHeader className="bg-[#F4EEEE]">
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
                      canSort
                        ? "cursor-pointer select-none text-xs "
                        : "text-xs"
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

      <div className="flex justify-end mt-2 gap-4">
        <Link className="text-xs text-[#337EA9] bg-[#E7F3F8] p-2 rounded-xs" href={`?page=${pageNumber - 1}&search=${search}`}>Previous</Link>
        <Link className="text-xs text-[#337EA9] bg-[#E7F3F8] p-2 rounded-xs" href={`?page=${pageNumber + 1}&search=${search}`}>Next</Link>
      </div>
    </div>
  );
}
