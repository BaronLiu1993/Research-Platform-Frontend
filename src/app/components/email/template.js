"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { socket } from "../websockets/socket";
import { usePointStore } from "@/app/store/usePointStore";
import DialogTemplate from "./dialogtemplates";
import { Button } from "@/shadcomponents/ui/button";

export function Template({ onUpdate, sendEmail, student_data, professor_id }) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [template, setTemplate] = useState("")
  const [events, setEvents] = useState([]);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [isDataSent, setIsDataSent] = useState(false);
  const loadedResumePoints = usePointStore((state) => state.loadedResumePoints);

  const handleTemplate = (data) => {
    setTemplate(data)
  }

  const [input, setInput] = useState({
    student_id: student_data || "",
    professor_id: 2,
    motivation: student_data.student_motivation || "",
    resume_points: "Built a KNN Nearest Neighbours Algorithm",
    template: template,
  });

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onProgress(data) {
      console.log(`Outside: ${data}`)
      if ("publication_data" in data) {
        const pubData = data.publication_data;
        if (pubData.length > 0) {
          onUpdate(pubData);
        }
      } else if ("email_data" in data) {
        const emailData = data.email_data;
        console.log(data)
        sendEmail(emailData);
      } else {
        setEvents((prev) => [...prev, data.message]);
      }
    }

    function onError(data) {
      setEvents((prev) => [...prev, `Error: ${data.error} - ${data.details}`]);
    }

    const handleBeforeUnload = () => {
      socket.disconnect();
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("ai_email_progress", onProgress);
    socket.on("ai_email_error", onError);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("ai_email_progress", onProgress);
      socket.off("ai_email_error", onError);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (messageIndex < events.length) {
      const currentMessage = events[messageIndex];
      const messageText = currentMessage.message || currentMessage;

      if (charIndex < messageText.length) {
        const typingTimer = setTimeout(() => {
          setDisplayedMessage((prev) => prev + messageText.charAt(charIndex));
          setCharIndex((prev) => prev + 1);
        }, 15);
        return () => clearTimeout(typingTimer);
      } else {
        setTypingComplete(true);
        const nextMessageTimer = setTimeout(() => {
          setMessageIndex((prev) => prev + 1);
          setCharIndex(0);
          setDisplayedMessage("");
          setTypingComplete(false);
        }, 400);
        return () => clearTimeout(nextMessageTimer);
      }
    }
  }, [events, messageIndex, charIndex]);

  const sendData = () => {
    if (socket.connected) {
      setEvents([]);
      setDisplayedMessage("");
      setMessageIndex(0);
      setCharIndex(0);
      setTypingComplete(false);
      socket.emit("ai_email_pipeline", input);
      setIsDataSent(true);
    } else {
      console.warn("Socket not connected yet.");
    }
  };

  return (
    <div className="min-h-screen font-main bg-white flex flex-col items-center py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
           What Best Describes You? 
        </h1>
        <p className="text-gray-500 mt-2 text-xs w-[30rem]">
          Choose the profile that best reflects your background. This will help
          us tailor the email’s tone and content based on your familiarity and
          relevance to the research.
        </p>
      </div>

      <div className="w-full max-w-2xl p-6 rounded-lg">
        
        <div className="relative mb-4">
          {!isDataSent ? (
            <DialogTemplate sendTemplate = {handleTemplate}/>
          ) : (
            <div className="min-h-[6rem] min-w-[20rem] bg-gray-100 rounded-md p-4 items-center">
              {messageIndex < events.length && (
                <div
                  className={`text-sm font-mono bg-gray-100 min-h-[3rem] min-w-[20rem] rounded transition-all duration-500 ease-in-out ${
                    typingComplete ? "animate-flashcard" : ""
                  }`}
                  style={{
                    animationFillMode: typingComplete ? "forwards" : "none",
                  }}
                >
                  {displayedMessage}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col justify-end items-end">
            <Button
              onClick={sendData}
              className="cursor-pointer w-fit border px-4 py-2 rounded hover:bg-blue-400 mt-4 bg-blue-500 text-white"
            >
              Send Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
