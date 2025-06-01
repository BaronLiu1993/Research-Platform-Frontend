import { Search } from "lucide-react"

import { Label } from "@/shadcomponents/ui/label"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/shadcomponents/ui/sidebar"

export function SearchForm({ ...props }) {
  return (
    <form {...props}>
      <SidebarGroup className="font-main">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search..."
            className="pl-8 font-main font-light text-xs rounded-xs h-[1.8rem] placeholder:text-neutral-500"
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
}
