"use client";

import { CreateFollowUp } from "@/app/actions/createFollowUp";
import { Button } from "@/shadcomponents/ui/button";

export default function ComposeFollowUp({
  threadId,
  userId,
  professorId,
  userEmail,
  userName,
  professorEmail,
}) {
  const data = {
    fromEmail: "baronliu1993@gmail.com",
    fromName: userName,
    to: "jiexuan.liu@mail.utoronto.ca",
    subject: "",
    message: "",
  };

  const handleCreateFollowUp = async () => {
    console.log(threadId)
    await CreateFollowUp(data, userId, professorId, threadId)
  };

  return (
    <>
      <Button
        onClick={handleCreateFollowUp}
        className="h-6 text-xs bg-white border border-[#F4EEEE] text-black hover:bg-white cursor-pointer"
      >
        Generate Follow Up
      </Button>
    </>
  );
}
