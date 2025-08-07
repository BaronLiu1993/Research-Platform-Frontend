"use client";

import { DialogTitle } from "@/shadcomponents/ui/composedialog";
import ComposeEditor from "./snippet/composeEditor";

export default function Compose({userId, professorId, fromName, fromEmail, to, draftData}) {
  return (
    <div>
      <DialogTitle className="hidden"></DialogTitle>
      <ComposeEditor draftData = {draftData} userId={userId} professorId={professorId} fromName={fromName} fromEmail ={fromEmail} to = {to}/>
    </div>
  );
}