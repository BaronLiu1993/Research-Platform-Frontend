"use client";

import { DialogTitle } from "@/shadcomponents/ui/composedialog";
import ComposeEditor from "./text/composeEditor";
import { Info, Minimize2, X } from "lucide-react";

export default function Compose({userId, professorId, fromName, fromEmail, to}) {
  return (
    <div>
      <DialogTitle className="hidden"></DialogTitle>
      <div className=" text-sm space-y-2 p-3">
        <div className = "flex items-center text-xs p-1 rounded-xs font-semibold border-1">
            <Info className= "h-4 w-4 text-[#787774]"/>
            <h1 className = "px-1 text-[#787774]">Highlight Text To Open Style Bar</h1>

        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 px-1">
            <h1 className="text-black">Baron Liu</h1>
            <h2 className="text-[#787774]">baronliu1993@gmail.com</h2>
          </div>
          <div className="flex gap-2">
            <X className="h-4 w-4 text-[#787774]" />
            <Minimize2 className="h-4 w-4 text-[#787774]" />
          </div>
        </div>
      </div>
      <ComposeEditor userId={userId} professorId={professorId} fromName={fromEmail} fromEmail ={fromEmail} to = {to}/>
    </div>
  );
}
