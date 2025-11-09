"use client";

import { Badge } from "@/shadcomponents/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shadcomponents/ui/composedialog";
import DOMPurify from "dompurify";
import { Check, Reply } from "lucide-react";
import ReplyEditor from "./reply/replyEditor";

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

export default function Thread({
  messageData,
  access,
  userEmail,
  userName,
  professorName,
}) {
  return (
    <div className="font-main w-full max-w-3xl py-8">
      <div className="divide-y divide-neutral-200/70 px-10">
        {messageData.map((messages, idx) => {
          const sanitizedHTML = DOMPurify.sanitize(messages.body);

          const seen = messages?.seenData?.opened_email;
          const seenAt = messages?.seenData?.opened_email_at;
          return (
            <article
              key={idx}
              className="group py-6 border-b-2 transition-colors"
            >
              <h1 className="text-[22px] leading-7 font-semibold tracking-tight text-neutral-900">
                {messages.subject}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <div className="flex flex-col text-[12px] text-neutral-600 leading-snug">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="truncate font-medium">
                      {messages.from}
                    </span>
                  </div>

                  <div className="flex min-w-0 items-center gap-2">
                    <span className="truncate">{messages.to}</span>
                    <span className="text-neutral-300">•</span>
                    <span className="whitespace-nowrap">
                      {formatDate(messages.date)}
                    </span>
                  </div>
                </div>

                <div className="ml-auto flex items-center gap-2">
                  {seen ? (
                    <Badge
                      variant="secondary"
                      className="h-6 gap-1 rounded-md border border-green-200/70 bg-green-50 text-[11px] font-medium text-green-800"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Seen
                      <span className="text-green-700/80">
                        {formatDate(seenAt)}
                      </span>
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="h-6 gap-1 rounded-md border-neutral-200 bg-neutral-50 text-[11px] font-medium text-neutral-700"
                    >
                      <Check className="h-3.5 w-3.5 opacity-50" />
                      Delivered…
                    </Badge>
                  )}

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
                        subject={messageData[0].subject}
                        access={access}
                        messageId={messageData[0].messageIdHeader}
                        professorName={professorName}
                        professorEmail={messages.to}
                        userName={userName}
                        userEmail={userEmail}
                        threadId={messages.threadId}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div
                className={[
                  "mt-4 rounded-lg border border-transparent bg-white",
                  "text-[13px] leading-[1.6] text-neutral-800",
                  "[&_*]:max-w-full",
                  "[&>p]:my-2 [&>p]:leading-6",
                  "[&>ul]:my-3 [&>ul]:list-disc [&>ul]:pl-5",
                  "[&>ol]:my-3 [&>ol]:list-decimal [&>ol]:pl-5",
                  "[&>h1]:mt-6 [&>h1]:mb-2 [&>h1]:text-[18px] [&>h1]:font-semibold",
                  "[&>h2]:mt-5 [&>h2]:mb-2 [&>h2]:text-[16px] [&>h2]:font-semibold",
                  "[&>h3]:mt-4 [&>h3]:mb-2 [&>h3]:text-[14px] [&>h3]:font-semibold",
                  "[&>a]:underline [&>a]:decoration-neutral-300 [&>a:hover]:decoration-neutral-500",
                  "[&>blockquote]:border-l-2 [&>blockquote]:border-neutral-200 [&>blockquote]:pl-3 [&>blockquote]:text-neutral-700",
                  "px-4 py-5",
                ].join(" ")}
                dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
              />
            </article>
          );
        })}
      </div>
    </div>
  );
}
