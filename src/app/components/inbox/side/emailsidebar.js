import { useState, useEffect } from "react";
import Message from "./message";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";
import { Badge } from "@/shadcomponents/ui/badge";
import { Eye, EyeClosed } from "lucide-react";

export default function EmailSidebar({
  threadId,
  email,
  engagementData = {},
  seenData = {},
  access,
}) {
  const [threadData, setThreadData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(email);
  console.log(seenData);
  console.log(engagementData);
  console.log(threadData);
  useEffect(() => {
    const fetchResponseThread = async () => {
      setIsLoading(true); // Start loading

      const mailData = await fetch(
        `http://localhost:8080/inbox/get-full-email-chain/${threadId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const responseData = await mailData.json();

      if (responseData && responseData.messageArray) {
        setThreadData(responseData);
      } else {
        console.error("messageArray is missing in the response.");
      }

      setIsLoading(false);
    };

    if (threadId && access) {
      fetchResponseThread();
    }
  }, [threadId, access]);

  if (isLoading) {
    return (
      <div className="h-[80vh] bg-white overflow-y-auto">
        <div className="p-4">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-[80vh] bg-white overflow-y-auto">
      <div className="space-y-4">
        {threadData?.messageArray?.length > 0 ? (
          threadData.messageArray.map((message, idx) => (
            <Accordion type="single" collapsible key={idx}>
              <AccordionItem value={`item-${idx}`}>
                <AccordionTrigger className="cursor-pointer hover:bg-[#F1F1EF] p-4 underline-none">
                  <div>
                    <div className="space-x-2 flex flex-col gap-2">
                      <span className="text-md flex flex-col font-semibold text-black underline-none">
                        {message.to.address === email ? (
                          <span className="flex flex-col underline-none">
                            <span className="rounded-xs underline-none">
                              Professor Message
                            </span>
                            <span className="font-light underline-none">
                              Subject: {message.subject || "No Subject"}{" "}
                            </span>
                          </span>
                        ) : (
                          <span className="flex flex-col underline-none">
                            <span className="rounded-xs underline-none">
                              Student Message
                            </span>
                            <span className="font-light underline-none">
                              Subject: {message.subject || "No Subject"}{" "}
                            </span>
                          </span>
                        )}
                      </span>
                      <div className="space-x-2 flex items-center gap-2">
                        {!message?.labels?.includes("DRAFT") && (
                          <>
                            {message.to.address != "baronliu1993@gmail.com" && (
                              <Badge className="bg-green-500 text-[10px] rounded-xs underline-none">
                                RECEIVED
                              </Badge>
                            )}

                            {message.to.address != "baronliu1993@gmail.com" && (
                              <div className="flex gap-2 underline-none">
                                <div>
                                  {message.seenData.opened_email ? (
                                    <Badge className="text-[10px] bg-red-500 rounded-xs flex items-center gap-1 underline-none">
                                      <Eye className="w-3 h-3" />
                                      SEEN on{" "}
                                      {new Date(
                                        message.seenData.opened_email_at
                                      ).toLocaleString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "2-digit",
                                        hour12: true,
                                      })}
                                    </Badge>
                                  ) : (
                                    <Badge className="text-[10px] bg-orange-500 rounded-xs flex items-center gap-1 underline-none">
                                      <EyeClosed className="w-3 h-3" />
                                      NOT SEEN
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}
                          </>
                        )}

                        <div className="flex flex-wrap gap-1 underline-none">
                          {message.labels?.map((label, idx) => (
                            <Badge
                              key={idx}
                              className="text-[10px] rounded-xs text-black bg-[#F1F1EF] underline-none"
                            >
                              {label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Message
                    data={message}
                    email={email}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        ) : (
          <div>No messages found</div>
        )}
      </div>
    </div>
  );
}
