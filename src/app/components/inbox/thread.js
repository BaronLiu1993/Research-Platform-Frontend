"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shadcomponents/ui/composedialog";
import { Reply } from "lucide-react";
import ReplyEditor from "./reply/replyEditor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";
import { EmailBodyViewer } from "./emailBodyViewer";
import { Skeleton } from "@/shadcomponents/ui/skeleton";
import { Badge } from "@/shadcomponents/ui/badge";

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
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
  professorEmail,
  userName,
  professorName,
}) {
  const [openIds, setOpenIds] = useState([]);
  const [bodies, setBodies] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  const handleValueChange = async (value) => {
    setOpenIds(value);

    if (value.length === 0) return;
    const newOpenId = value[value.length - 1];

    if (bodies[newOpenId]) return;

    try {
      setLoadingId(newOpenId);
      setErrorId(null);
      let res = null;

      const currentMessage = messageData.find((msg) => msg.id === newOpenId);
      console.log(currentMessage);
      const fromUser = currentMessage?.payload?.headers
        .find((header) => header.name === "From")
        .value.includes(`<${userEmail}>`);
      console.log(fromUser);
      const queryParams = `messageId=${encodeURIComponent(newOpenId)}&fromUser=${fromUser}`;
      res = await fetch(`${API_BASE}/inbox/get-email?${queryParams}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch message body");
      }

      const data = await res.json();
      setBodies((prev) => ({
        ...prev,
        [newOpenId]: {
          html: data.html || null,
          text: data.text || null,
          seenData: data.seenData || null,
        },
      }));
    } catch (err) {
      setErrorId(newOpenId);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="font-main w-full max-w-3xl py-8">
      <div className="text-xl font-medium px-8">
        {getHeader(messageData[0].payload.headers, "Subject") || "No Subject"}
      </div>
      <Accordion
        type="multiple"
        collapsible
        value={openIds}
        className="w-full p-8"
        onValueChange={handleValueChange}
      >
        {messageData.map((message) => {
          console.log(message);
          const headers = message.payload?.headers || [];
          const from = getHeader(headers, "From") || "";
          const name = from.split("<");
          const formattedDate = formatDate(Number(message.internalDate));

          const bodyEntry = bodies[message.id];
          const isLoading = loadingId === message.id;
          const isError = errorId === message.id;

          const rawHtml = bodyEntry?.html ?? null;
          const rawText = bodyEntry?.text ?? null;
          const rawSeenData = bodyEntry?.seenData ?? null;
          return (
            <AccordionItem key={message.id} value={message.id}>
              <AccordionTrigger className="flex rounded-none border-b-1 cursor-pointer pb-6 flex-col items-start gap-1">
                <div className="text-xs text-neutral-500 w-full justify-between flex">
                  <div className="text-sm text-black flex gap-4">
                    <span>{name[0]}</span>
                    <div>
                      {rawSeenData ? (
                        rawSeenData.opened_email ? (
                          <Badge className="text-[#448361] bg-[#EDF3EC] rounded-xs">
                            Read at {formatDate(rawSeenData.opened_email_at)}
                          </Badge>
                        ) : (
                          <Badge className="text-[#D9730D] bg-[#FAEBDD] rounded-xs">
                            Not Seen
                          </Badge>
                        )
                      ) : null}
                    </div>
                  </div>
                  <div className="text-xs text-neutral-500">
                    {formattedDate}
                  </div>
                </div>
                <p className="text-xs text-neutral-600 line-clamp-2">
                  {message.snippet.slice(0, 100)}...
                </p>
              </AccordionTrigger>

              <AccordionContent className="flex flex-col gap-4 text-balance">
                {isLoading && (
                  <div className="flex flex-col gap-4 p-6">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-10/12" />
                    <Skeleton className="h-4 w-9/12" />
                    <Skeleton className="h-4 w-3/5" />
                    <div className="h-6" />
                    <Skeleton className="h-4 w-10/12" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-9/12" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                )}

                {isError && (
                  <p className="text-xs text-red-500">
                    Failed to load message body.
                  </p>
                )}

                {!isLoading && !isError && (
                  <>
                    <EmailBodyViewer html={rawHtml} text={rawText} />
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className="inline-flex gap-2 border-[1.5px] p-2 cursor-pointer items-center justify-center w-fit rounded-sm text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                          aria-label="Reply"
                          title="Reply"
                        >
                          <Reply className="h-5 w-5 stroke-[1.5]" />
                          <span className="font-medium">Reply</span>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-2xl">
                        <DialogHeader />
                        <ReplyEditor
                          subject={getHeader(headers, "Subject")}
                          access={access}
                          messageId={message.id}
                          professorName={professorName}
                          professorEmail={professorEmail}
                          userName={userName}
                          userEmail={userEmail}
                          threadId={message.threadId}
                        />
                      </DialogContent>
                    </Dialog>
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
