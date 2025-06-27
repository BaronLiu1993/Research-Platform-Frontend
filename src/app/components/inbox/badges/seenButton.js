"use client";
import { Badge } from "@/shadcomponents/ui/badge";
import { Eye, EyeClosed } from "lucide-react";

const options = {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
};

export default function SeenButton({ seenData }) {
  const formattedTime = seenData.opened_email_at
    ? new Date(seenData.opened_email_at).toLocaleString("en-US", options)
    : null;

  return (
    <>
      {seenData.opened_email ? (
        <Badge className="bg-blue-700 font-main rounded-xs flex items-center gap-1">
          <Eye className="w-4 h-4" />
          Opened @ {formattedTime}
        </Badge>
      ) : (
        <Badge className="bg-red-700 font-main rounded-xs flex items-center gap-1">
          <EyeClosed className="w-4 h-4" />
          Not Seen
        </Badge>
      )}
    </>
  );
}
