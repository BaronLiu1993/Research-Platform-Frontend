import { useState, useEffect } from "react";
import Message from "./message";

export default function EmailSidebar({ threadId, userId, email, engagementData, seenData }) {
  const [threadData, setThreadData] = useState([]);

  useEffect(() => {
    const fetchResponseThread = async () => {
      const mailData = await fetch(`http://localhost:8080/gmail/get-full-email-chain/${userId}/${threadId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await mailData.json();
      setThreadData(responseData);
    };

    if (threadId && userId) fetchResponseThread();
  }, [threadId, userId]);

  return (
    <div className="h-[80vh] bg-white">
      <div className="space-y-4">
        {threadData?.messageArray?.map((message, idx) => (
          <div key={idx}>
            <Message data={message} email={email} engagementData = {engagementData} seenData = {seenData}/>
          </div>
        ))}
      </div>
    </div>
  );
}
