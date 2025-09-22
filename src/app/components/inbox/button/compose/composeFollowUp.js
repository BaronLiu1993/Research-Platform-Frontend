"use client";

import { CreateReply } from "@/app/actions/reply/createReply";
import { Button } from "@/shadcomponents/ui/button";
import { Reply } from "lucide-react";

export default function ComposeFollowUp({
  threadId,
  professorId,
  userEmail,
  userName,
  professorEmail,
  onCreateReply,
  access
}) {
  const data = {
    fromEmail: userEmail,
    fromName: userName,
    to: professorEmail,
    subject: "",
    message: "",
  };

  const handleCreateFollowUp = async () => {
    await CreateReply(data, professorId, threadId, access);
    onCreateReply?.();
  };

  return (
    <>
      <Button
        onClick={handleCreateFollowUp}
        className="flex items-center gap-2 rounded-xs bg-black text-white py-2 px-4 hover:shadow-lg"
      >
        <Reply className="w-4 h-4" /> 
        <span className="text-sm font-medium">Reply</span>
      </Button>
    </>
  );
}
