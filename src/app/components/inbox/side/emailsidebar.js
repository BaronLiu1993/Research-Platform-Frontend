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
  userId,
  email,
  engagementData,
  seenData,
}) {
  const [threadData, setThreadData] = useState([]);
  useEffect(() => {
    const fetchResponseThread = async () => {
      const mailData = await fetch(
        `http://localhost:8080/inbox/get-full-email-chain/${userId}/${threadId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await mailData.json();
      setThreadData(responseData);
    };

    if (threadId && userId) fetchResponseThread();
  }, [threadId, userId]);
  return (
    <div className="h-[80vh] bg-white overflow-y-auto">
      <div className="space-y-4">
        {threadData?.messageArray?.map((message, idx) => (
          <Accordion
            className="underline-none cursor-pointer"
            type="single"
            collapsible
            key={idx}
          >
            <AccordionItem value={`item-${idx}`}>
              <AccordionTrigger className="underline-none hover:bg-[#F1F1EF] p-4">
                <div>
                  <div className="space-x-2 flex flex-col gap-2">
                    <span className="text-md flex flex-col font-semibold text-black">
                      {email === message.to.address ? (
                        <span className="flex flex-col">
                          <span className="rounded-xs">From Professor</span>
                          <span className = "font-light"> {message.subject || "No Subject"} </span>
                        </span>
                      ) : (
                        <span>
                          <span className="rounded-xs">From Student</span>
                          <span className = "font-light"> {message.subject || "No Subject"} </span>
                        </span>
                      )}{" "}
                    </span>
                    <div className="space-x-2 flex">
                      <div>
                        {email !== message.to.address && (
                          <Badge className="bg-green-500 text-[10px] rounded-xs">
                            RECEIVED
                          </Badge>
                        )}
                      </div>
                      <div>
                        {email !== message.to.address && (
                          <div className="flex gap-2">
                            <div>
                              {seenData.opened_email ? (
                                <div>
                                  <Badge className="text-[10px] bg-red-500 rounded-xs">
                                    <Eye />
                                    SEEN @{" "}
                                    {new Date(
                                      seenData.opened_email_at
                                    ).toLocaleString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      hour: "numeric",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </Badge>
                                </div>
                              ) : (
                                <Badge className="text-[10px] bg-orange-500 rounded-xs">
                                  <EyeClosed />
                                  NOT SEEN
                                </Badge>
                              )}
                            </div>
                            <div>
                              {engagementData.opened ? (
                                <Badge className="text-[10px] bg-green-500 rounded-xs">
                                  ENGAGED WITH MEDIA @{" "}
                                  {engagementData.opened_at}
                                </Badge>
                              ) : (
                                <Badge className="text-[10px] bg-orange-500 rounded-xs">
                                  NO ENGAGEMENT
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      {message.labels?.map((label, idx) => (
                        <div key={idx}>
                          <Badge className="text-[10px] rounded-xs text-[#979A9B] bg-[#F1F1EF]">
                            {label}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Message
                  data={message}
                  email={email}
                  engagementData={engagementData}
                  seenData={seenData}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
