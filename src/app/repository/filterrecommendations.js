import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shadcomponents/ui/dropdown-menu";
import { Button } from "@/shadcomponents/ui/button";
import {
  ArrowDownToDot,
  ChevronDown,
  CloudLightning,
  Expand,
  Filter,
  Heart,
  Pencil,
  School,
  Search,
} from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function FilterRecommendations() {
  return (
    <div className="font-noto w-full flex mt-6 gap-1 justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center w-[1.2rem] gap-1 h-fit px-3 cursor-pointer text-xs text-neutral-400 rounded-xs"
          >
            <Search className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-44 bg-white shadow-md border border-neutral-200 rounded-md p-1"
        >
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <School className="w-4 h-4 text-neutral-500" />
            University
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <Heart className="w-4 h-4 text-neutral-500" />
            Interests
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <Pencil className="w-4 h-4 text-neutral-500" />
            Faculty
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center w-[1.2rem] gap-1 h-fit px-3 cursor-pointer text-xs text-neutral-400 rounded-xs"
          >
            <Filter className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-44 bg-white shadow-md border border-neutral-200 rounded-md p-1"
        >
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <School className="w-4 h-4 text-neutral-500" />
            University
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <Heart className="w-4 h-4 text-neutral-500" />
            Interests
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <Pencil className="w-4 h-4 text-neutral-500" />
            Faculty
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-[1.2rem] items-center gap-1 h-fit px-3 cursor-pointer text-xs text-neutral-400 rounded-xs"
          >
            <ArrowDownToDot className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-44 bg-white shadow-md border border-neutral-200 rounded-md p-1"
        >
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <School className="w-4 h-4 text-neutral-500" />
            University
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <Heart className="w-4 h-4 text-neutral-500" />
            Interests
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <Pencil className="w-4 h-4 text-neutral-500" />
            Faculty
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-[1.2rem] items-center gap-1 h-fit px-3 cursor-pointer text-xs text-neutral-400 rounded-xs"
          >
            <Expand className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-44 bg-white shadow-md border border-neutral-200 rounded-md p-1"
        >
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <School className="w-4 h-4 text-neutral-500" />
            University
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <Heart className="w-4 h-4 text-neutral-500" />
            Interests
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <Pencil className="w-4 h-4 text-neutral-500" />
            Faculty
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-[1.2rem] items-center gap-1 h-fit px-3 cursor-pointer text-xs text-neutral-400 rounded-xs"
          >
            <CloudLightning className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-44 bg-white shadow-md border border-neutral-200 rounded-md p-1"
        >
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <School className="w-4 h-4 text-neutral-500" />
            University
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <Heart className="w-4 h-4 text-neutral-500" />
            Interests
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <Pencil className="w-4 h-4 text-neutral-500" />
            Faculty
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center gap-1 h-fit px-1 bg-blue-500 hover:bg-blue-600 cursor-pointer text-xs text-white rounded-xs">
            <h1 className = "font-semibold">New</h1>
            <Separator orientation="vertical" />
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-44 bg-white shadow-md border border-neutral-200 rounded-md p-1"
        >
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <School className="w-4 h-4 text-neutral-500" />
            University
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <Heart className="w-4 h-4 text-neutral-500" />
            Interests
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-xs text-neutral-700 hover:bg-neutral-100 cursor-pointer">
            <Pencil className="w-4 h-4 text-neutral-500" />
            Faculty
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
