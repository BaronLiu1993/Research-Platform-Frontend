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

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcomponents/ui/dialog";

import { Bell, Calendar1, CalendarClock, Plus } from "lucide-react";
import CreateEditor from "./createEditor";

export default function Snippets() {
  return (
    <Command className="font-main w-full max-w-[20rem]">
      <CommandInput
        className="text-xs"
        placeholder="Type a command or search..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Create">
          <CommandItem>
            <Dialog>
              <DialogTrigger className = "flex items-center gap-2">
                <Plus />
                <div className="text-xs justify-start items-start flex flex-col">
                  <h1 className="text-[#37352F]">New Snippet</h1>
                  <h2 className="text-[#787774] font-light">
                    Create a new snippet
                  </h2>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle></DialogTitle>
                <DialogContent className = "rounded-xs">
                    <CreateEditor />
                </DialogContent>
              </DialogContent>
            </Dialog>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Built-In Snippets">
          <CommandItem>
            <Bell className="fill-yellow-500 text-yellow-500" />
            <div className="text-xs">
              <h1 className="font-semibold text-[#37352F]">New Snippet</h1>
              <h2 className="text-neutral-500">
                Hi, could we meet at {"{time}"}
              </h2>
            </div>
          </CommandItem>
          <CommandItem>
            <CalendarClock className="text-green-500" />
            <div className="text-xs">
              <h1 className="font-semibold text-[#37352F]">Engineering</h1>
              <h2 className="text-neutral-500">
                Hi {"{first_name}"}, I just...
              </h2>
            </div>
          </CommandItem>
          <CommandItem>
            <CalendarClock className="text-green-500" />
            <div className="text-xs">
              <h1 className="font-semibold text-[#37352F]">Medical Research</h1>
              <h2 className="text-neutral-500">
                Hi {"{first_name}"}, I just...
              </h2>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
