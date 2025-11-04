"use client";

import DOMPurify from "dompurify";
import { Reply } from "lucide-react";

export default function Thread({ messageData }) {
  console.log(messageData);
  return (
    <div className="font-main flex flex-col gap-3 p-10">
      {messageData.map((messages, idx) => {
        const sanitizedHTML = DOMPurify.sanitize(messages.body);

        return (
          <div key={idx} className="border-b-1">
            <h1 className="font-main font-light text-2xl">
              {messages.subject}
            </h1>
            <div>
              <div className="flex justify-between gap-2 items-center">
                <h2 className="font-semibold text-xs">{messages.from}</h2>
                <div className = "flex items-center gap-3">
                  <h2 className="font-light text-xs">{messages.date}</h2>
                  <button>
                    <Reply className= "stroke-1 cursor-pointer hover:text-blue-700"/>
                  </button>
                </div>
              </div>
              <h3 className="font-light text-xs">{messages.to}</h3>
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
