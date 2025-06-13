"use client";

import { Button } from "@/shadcomponents/ui/button";

export default function ComposeFollowUp({
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
    try {
      const response = await fetch(
        `http://localhost:8080/gmail/create-follow-up-draft/${userId}/${professorId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
    } catch {}
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
