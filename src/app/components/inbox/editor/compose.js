"use client";

import { DialogTitle } from "@/shadcomponents/ui/composedialog";
import ComposeEditor from "./text/composeEditor";
import { Info, Minimize2, X } from "lucide-react";

export default function Compose({userId, professorId, fromName, fromEmail, to, draftData}) {
  return (
    <div>
      <DialogTitle className="hidden"></DialogTitle>
      <ComposeEditor draftData = {draftData} userId={userId} professorId={professorId} fromName={fromEmail} fromEmail ={fromEmail} to = {to}/>
    </div>
  );
}
