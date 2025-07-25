"use client";

import { DialogTitle } from "@/shadcomponents/ui/composedialog";
import ComposeEditor from "./text/composeEditor";

export default function Compose({userId, professorId, fromName, fromEmail, to, draftData, threadId}) {
  console.log(draftData)
  return (
    <div>
      <DialogTitle className="hidden"></DialogTitle>
      <ComposeEditor draftData = {draftData} userId={userId} professorId={professorId} threadId = {threadId} fromName={fromName} fromEmail ={fromEmail} to = {to}/>
    </div>
  );
}
