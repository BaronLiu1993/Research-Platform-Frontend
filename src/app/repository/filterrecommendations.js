import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
  } from "@/shadcomponents/ui/dropdown-menu";
  import { Button } from "@/shadcomponents/ui/button";
  import { ChevronDown, Filter, Heart, Pencil, School, Search } from "lucide-react";
  
  export default function FilterRecommendations() {
    return (
      <div className="font-noto w-full flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button     
              variant="ghost"
              className="flex items-center gap-1 h-fit px-3 cursor-pointer  py-0.5 text-xs text-neutral-700 rounded-xs"
            >
            <Search />
              Toggle Search Query
              <ChevronDown className="w-4 h-4 text-neutral-700" />
            </Button>
          </DropdownMenuTrigger>
  
          <DropdownMenuContent align="start" className="w-44 bg-white shadow-md border border-neutral-200 rounded-md p-1">
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
              className="flex items-center gap-1 h-fit px-3 py-0.5 text-xs cursor-pointer text-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-xs"
            >
              <Filter />
              Filter
              <ChevronDown className="w-4 h-4 text-neutral-700" />
            </Button>
          </DropdownMenuTrigger>
  
          <DropdownMenuContent align="start" className="w-44 bg-white shadow-md border border-neutral-200 rounded-md p-1">
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
  