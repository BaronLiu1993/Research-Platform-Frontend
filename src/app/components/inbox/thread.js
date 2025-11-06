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

export default function Thread({
  messageData,
  access,
  userEmail,
  userName,
  professorName,
}) {
  return (
    <div className="font-main flex flex-col gap-3 p-10">
      {messageData.map((messages, idx) => {
        const sanitizedHTML = DOMPurify.sanitize(messages.body);
        return (
          <div key={idx} className="border-b-1">
            <h1 className="font-main font-light text-2xl ">
              {messages.subject}
            </h1>
            <div className="flex flex-col">
              <div className="flex justify-between gap-2 items-center">
                <h2 className="font-semibold text-xs">{messages.from}</h2>
                <div className="flex items-center gap-3">
                  <h2 className="font-light text-xs">
                    {new Date(messages.date)
                      .toISOString()
                      .slice(0, 16)
                      .replace("T", " ")}
                  </h2>
                  <Dialog>
                    <DialogTrigger>
                      <Reply className="stroke-1 cursor-pointer hover:text-blue-700" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader></DialogHeader>
                      <ReplyEditor
                        access={access}
                        messageId={messages.messageIdHeader}
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
              <h3 className="font-light text-xs">{messages.to}</h3>
              <div className="my-1">
                {messages.seenData.opened_email ? (
                  <Badge className="rounded-xs text-green-900 bg-green-100">
                    <Check />
                    Seen
                    <span>
                      {new Date(messages.seenData.opened_email_at)
                        .toISOString()
                        .slice(0, 16)
                        .replace("T", " ")}
                    </span>
                  </Badge>
                ) : (
                  <Badge className="rounded-xs text-orange-900 bg-orange-200">
                    <Check />
                    Delivered...
                  </Badge>
                )}
              </div>
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizedHTML,
                  }}
                  className="text-xs py-5"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
