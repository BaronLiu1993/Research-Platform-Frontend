import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/shadcomponents/ui/command";
import { Bell, Calendar1, CalendarClock, Plus } from "lucide-react";

export default function Snippets() {
  return (
    <>
      <div>
        <Command className="font-main">
          <CommandInput className = "text-xs" placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Create">
              <CommandItem>
                <Plus />
                <div className="text-xs">
                  <h1 className="font-semibold text-[#37352F]">New Snippet</h1>
                  <h2 className = "text-neutral-500">Create a new snippet</h2>
                </div>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Built-In Snippets">
              <CommandItem>
                <Bell className="fill-yellow-500 text-yellow-500" />
                <div className="text-xs">
                  <h1 className="font-semibold text-[#37352F]">New Snippet</h1>
                  <h2 className = "text-neutral-500">Hi, could we meet at {"{time}"}</h2>
                </div>
              </CommandItem>
              <CommandItem>
                <CalendarClock className="text-green-500" />
                <div className="text-xs">
                  <h1 className="font-semibold text-[#37352F]">
                    Engineering
                  </h1>
                  <h2 className = "text-neutral-500">Hi {"{first_name}"}, I just...</h2>
                </div>
              </CommandItem>
              <CommandItem>
                <CalendarClock className="text-green-500" />
                <div className="text-xs">
                  <h1 className="font-semibold text-[#37352F]">
                    Medical Research
                  </h1>
                  <h2 className = "text-neutral-500">Hi {"{first_name}"}, I just...</h2>
                </div>
              </CommandItem>
              
            </CommandGroup>
            <CommandGroup heading="Your Snippets">
              <div className = "text-neutral-500 text-sm px-4">
                ...
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </>
  );
}
