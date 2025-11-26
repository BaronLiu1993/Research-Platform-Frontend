"use client";

import { Badge } from "@/shadcomponents/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shadcomponents/ui/composedialog";
import { Check, Reply } from "lucide-react";
import ReplyEditor from "./reply/replyEditor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";

function formatDate(isoOrDateLike) {
  const d = new Date(isoOrDateLike);
  const date = d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${date} · ${time}`;
}

function getHeader(headers = [], name) {
  return (
    headers.find((h) => (h.name || "").toLowerCase() === name.toLowerCase())
      ?.value || null
  );
}

export default function Thread({
  messageData,
  access,
  userEmail,
  userName,
  professorName,
}) {
  console.log(messageData);

  return (
    <div className="font-main w-full max-w-3xl py-8">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue={messageData[0]?.id}
      >
        {messageData.map((message) => {
          const headers = message.payload?.headers || [];

          const subject = getHeader(headers, "Subject") || "(no subject)";
          const from = getHeader(headers, "From") || "";
          const to = getHeader(headers, "To") || "";
          const dateHeader = getHeader(headers, "Date");
          // Gmail also gives ms since epoch as internalDate
          const formattedDate = dateHeader
            ? dateHeader
            : formatDate(Number(message.internalDate));

          return (
            <AccordionItem key={message.id} value={message.id}>
              <AccordionTrigger className="flex flex-col items-start gap-1">
                <div className="text-xs text-neutral-500 w-full justify-between flex">
                  <div className="text-xs text-neutral-500">{from}</div>
                  <div className="text-xs text-neutral-500">
                    {formattedDate}
                  </div>
                </div>
                <p className="text-sm text-neutral-600 line-clamp-2">
                  {message.snippet}
                </p>
              </AccordionTrigger>

              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p className="text-sm text-neutral-800">{message.snippet}</p>

                {/* Example: Reply dialog using first message in thread */}
                {/* 
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                      aria-label="Reply"
                      title="Reply"
                    >
                      <Reply className="h-4 w-4 stroke-[1.5]" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader />
                    <ReplyEditor
                      subject={subject}
                      access={access}
                      messageId={message.id}
                      professorName={professorName}
                      professorEmail={to}
                      userName={userName}
                      userEmail={userEmail}
                      threadId={message.threadId}
                    />
                  </DialogContent>
                </Dialog>
                */}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
