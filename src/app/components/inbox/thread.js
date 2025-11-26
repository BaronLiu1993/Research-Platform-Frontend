"use client";

import { useState } from "react";
import DOMPurify from "dompurify";
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
import { EmailBodyViewer } from "./emailBodyViewer";

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
  const [openId, setOpenId] = useState(messageData[0]?.id ?? null);
  const [bodies, setBodies] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [errorId, setErrorId] = useState(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";

  const handleValueChange = async (value) => {
    setOpenId(value);
    if (!value) return;
    if (bodies[value]) return;

    try {
      setLoadingId(value);
      setErrorId(null);

      const res = await fetch(
        `${API_BASE}/inbox/get-email?messageId=${encodeURIComponent(value)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch message body");
      }

      const data = await res.json();
      console.log(data);
      setBodies((prev) => ({
        ...prev,
        [value]: {
          html: data.html || null,
          text: data.text || null,
        },
      }));
    } catch (err) {
      console.error(err);
      setErrorId(value);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="font-main w-full max-w-3xl py-8">
      <Accordion
        type="single"
        collapsible
        className="w-full p-8"
        value={openId ?? undefined}
        onValueChange={handleValueChange}
      >
        {messageData.map((message) => {
          const headers = message.payload?.headers || [];
          const from = getHeader(headers, "From") || "";
          const dateHeader = getHeader(headers, "Date");
          const formattedDate = dateHeader
            ? dateHeader
            : formatDate(Number(message.internalDate));

          const bodyEntry = bodies[message.id];
          const isLoading = loadingId === message.id;
          const isError = errorId === message.id;

          const rawHtml = bodyEntry?.html ?? null;
          const rawText = bodyEntry?.text ?? null;

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
                  {message.snippet.slice(0, 100)}...
                </p>
              </AccordionTrigger>

              <AccordionContent className="flex flex-col gap-4 text-balance">
                {isLoading && (
                  <p className="text-xs text-neutral-500">Loading…</p>
                )}

                {isError && (
                  <p className="text-xs text-red-500">
                    Failed to load message body.
                  </p>
                )}

                {!isLoading && !isError && (
                  <>
                    <EmailBodyViewer
                      html={rawHtml}
                      text={rawText || message.snippet}
                    />

                    {/* Reply dialog (optional) */}
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
                          subject={getHeader(headers, "Subject")}
                          access={access}
                          messageId={message.id}
                          professorName={professorName}
                          professorEmail={getHeader(headers, "To")}
                          userName={userName}
                          userEmail={userEmail}
                          threadId={message.threadId}
                        />
                      </DialogContent>
                    </Dialog>
                    */}
                  </>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
