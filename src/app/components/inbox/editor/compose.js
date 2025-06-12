"use client";

import { DialogTitle } from "@/shadcomponents/ui/composedialog";
import ComposeEditor from "./text/composeEditor";
import { Info, Minimize2, X } from "lucide-react";

export default function Compose() {
  return (
    <div>
      <DialogTitle className="hidden"></DialogTitle>
      <div className=" text-sm space-y-2 border-b-1 p-3">
        <div className = "flex items-center text-xs p-1 rounded-xs font-semibold border-1">
            <Info className= "h-4 w-4 text-[#787774]"/>
            <h1 className = "px-1 text-[#787774]"><span className = "bg-yellow-100">Highlight</span> Text To Open Navbar</h1>

        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 px-1">
            <h1 className="text-black">Baron Liu</h1>
            <h2 className="text-[#787774]">baronliu1993@gmail.com</h2>
          </div>
          <div className="flex">
            <X className="h-4 w-4 text-[#787774]" />
            <Minimize2 className="h-4 w-4 text-[#787774]" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <input className="p-1" placeholder="Add Recipient" variant="ghost" />
          <input className="p-1" placeholder="Subject" variant="ghost" />
        </div>
      </div>
      <ComposeEditor />
    </div>
  );
}
