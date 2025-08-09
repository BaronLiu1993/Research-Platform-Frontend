"use client";

import { CreateReply } from "@/app/actions/reply/createReply";
import { Button } from "@/shadcomponents/ui/button";
import { Reply } from "lucide-react";

export default function ComposeFollowUp({
  threadId,
  userId,
  professorId,
  userEmail,
  userName,
  professorEmail,
  onCreateReply
}) {
  const data = {
    fromEmail: "baronliu1993@gmail.com",
    fromName: userName,
    to: professorEmail,
    subject: "",
    message: "",
  };

  const handleCreateFollowUp = async () => {
    await CreateReply(data, userId, professorId, threadId)
    onCreateReply?.();
  };
  

  return (
    <>
      <Button
        onClick={handleCreateFollowUp}
        className="rounded-sm bg-[#FAEBDD] text-[#CB912F] cursor-pointer hover:bg-[#F5D7B5]"
      >
        <Reply />
        Reply
      </Button>
    </>
  );
}
