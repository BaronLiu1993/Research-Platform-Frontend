import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shadcomponents/ui/command";

import {
  Bell,
  BookOpenText,
  CalendarClock,
  Heart,
  Hospital,
  Plus,
  Settings,
} from "lucide-react";

export default function Snippets({ parsedSnippetData, onSnippetSelection }) {
  console.log(parsedSnippetData);
  const handleSnippetSend = (subject, body) => {
    console.log("fired")
    onSnippetSelection(subject, body);
  };
  return (
    <Command className="font-main w-full max-w-[20rem]">
      <CommandInput className="text-xs" placeholder="Search Built-In..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Your Snippets">
          {parsedSnippetData.map((data, idx) => (
            <CommandItem
              key={idx}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleSnippetSend(data.snippet_subject, data.snippet_html)}
            >
              <BookOpenText />
              <div className="text-xs justify-start items-start flex flex-col">
                <h1 className="text-[#37352F]">{data.snippet_name}</h1>
                <h2 className="text-[#787774] font-light">
                  {data.snippet_subject.slice(0, 30)}
                </h2>
              </div>
            </CommandItem>
          ))}
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
            <Settings className="text-green-500" />
            <div className="text-xs">
              <h1 className="font-semibold text-[#37352F]">Engineering</h1>
              <h2 className="text-neutral-500">
                Hi {"{first_name}"}, I just...
              </h2>
            </div>
          </CommandItem>
          <CommandItem>
            <Hospital className="text-red-500" />
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
