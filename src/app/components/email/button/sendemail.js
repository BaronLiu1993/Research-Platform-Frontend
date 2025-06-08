"use client";
import { useState } from "react";
import { Button } from "@/shadcomponents/ui/button";

export default function SendEmail({
  eventName,
  description,
  student_id,
  professor_id,
}) {
    
  const [error, setError] = useState("");
  //Get time zone from browser frontend'
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //Schedule on Google Calendar the Follow Up
  // Date and Then Send The Email
  const sendDataBody = {
    // for now make the email mine for
    // testing purposes in prod it will send to professor email
    timeZone: timeZone,
    eventName: eventName,
    description: description,
  };
  console.log(sendDataBody)
  //Make it open a dialog box or something to
  // confirm they actually want to submit the email
  const handleSendEmail = async () => {
    try {
      console.log("hired handleSendEmail")

      const initialSendEmail = await fetch(`http://localhost:8080/gmail/gcalendar/send-draft/${student_id}/${professor_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendDataBody),
      });
    } catch (err) {
      console.log(err)
      setError(err);
    }
  };
  return (
    <>
      <Button onClick = {handleSendEmail}>
        Send
      </Button>
    </>
  );
}
