import { ToggleGroup, ToggleGroupItem } from "@/shadcomponents/ui/toggle-group";
import { Filter, Heart, Pencil, School } from "lucide-react";

export default function FilterRecommendations() {
  return (
    <>
      <div className="flex items-center bg-white font-inter">
        <ToggleGroup type="multiple" className="flex items-center gap-1">
          <ToggleGroupItem
            value="filters"
            aria-label="More Filters"
            className="py-1 px-2.5 text-xs text-neutral-700 hover:bg-neutral-100 data-[state=on]:bg-blue-50 data-[state=on]:text-blue-400 data-[state=on]:shadow-sm rounded-xs cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1"
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">More Filters</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="university"
            aria-label="Filter by University"
            className="py-1 px-2.5 text-xs text-neutral-700 hover:bg-neutral-100 data-[state=on]:bg-blue-50 data-[state=on]:text-blue-400 data-[state=on]:shadow-sm rounded-xs cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1"
          >
            <School />
            University
          </ToggleGroupItem>
          <ToggleGroupItem
            value="interests"
            aria-label="Filter by Interests"
            className="py-1 px-2.5 text-xs text-neutral-700 hover:bg-neutral-100 data-[state=on]:bg-blue-50 data-[state=on]:text-blue-400 data-[state=on]:shadow-sm rounded-xs cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1"
          >
            <Heart />
            Interests
          </ToggleGroupItem>
          <ToggleGroupItem
            value="faculty"
            aria-label="Filter by Faculty"
            className="py-1 px-2.5 text-xs text-neutral-700 hover:bg-neutral-100 data-[state=on]:bg-blue-50 data-[state=on]:text-blue-400 data-[state=on]:shadow-sm rounded-xs cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1"
          >
            <Pencil />
            Faculty
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </>
  );
}
