"use client";
import { useState } from "react";

export default function SendEmail({ eventName, description }) {
  const [error, setError] = useState("");
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const sendDataBody = {
    timeZone: timeZone,
    eventName: eventName,
    description: description,
  };
  const handleSendEmail = async () => {
    try {
      const initialSendEmail = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendDataBody),
      });
    } catch (err) {
      setError(err);
    }
  };
  return (
    <>
      <Button>Send</Button>
    </>
  );
}
