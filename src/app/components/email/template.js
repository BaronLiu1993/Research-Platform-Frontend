"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { socket } from "../websockets/socket";
import { usePointStore } from "@/app/store/usePointStore";

import { Button } from "@/shadcomponents/ui/button";
import { Textarea } from "@/shadcomponents/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shadcomponents/ui/dialog";

import { SquarePen, Grid3X3, Lightbulb, RefreshCw } from "lucide-react";
import { emailPrompts } from "./prompts";

export function Template({ onUpdate, sendEmail, student_data, professor_id }) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [events, setEvents] = useState([]);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [isDataSent, setIsDataSent] = useState(false);
  const loadedResumePoints = usePointStore((state) => state.loadedResumePoints);

  console.log(student_data.user_id)
  console.log(professor_id)
  const [input, setInput] = useState({
    student_id: student_data.user_id || "",
    professor_id: 2,
    motivation: student_data.student_motivation || "",
    resume_points: "Experienced in Python, data analysis, and research projects.",
    template: "Hello {professor_name},\n\nI am a student interested in your research on {topic}..."
  });

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onProgress(data) {
      if ("publication_data" in data.message) {
        const pubData = data.message.publication_data;
        if (pubData.length > 0) {
          onUpdate(pubData);
        }
      } else if ("email_data" in data.message) {
        const emailData = data.message.email_data;
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
    <div className="min-h-screen font-sans bg-white flex flex-col items-center py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Hello!{" "}
          <span role="img" aria-label="waving hand">
            👋
          </span>
        </h1>
        <p className="text-gray-500 mt-2">
          Load an Email Template to Get Started
        </p>
      </div>

      <div className="w-full max-w-2xl font-sans bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" className="text-gray-600 flex items-center">
            <SquarePen className="mr-2 h-4 w-4" /> Composing New Email
          </Button>
          <Button variant="ghost" size="icon">
            <Grid3X3 className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        <div className="relative mb-4">
          {!isDataSent ? (
            <Textarea
              placeholder="Loaded Template Here"
              className="w-full p-3 pr-10 min-h-[100px] resize-none border-gray-300 focus-visible:ring-offset-0 focus-visible:ring-transparent"
            />
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

        <div className="flex flex-col gap-2">
          <div className="w-full max-w-2xl">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Suggested Template Choices
            </h2>
            <div className="flex flex-wrap gap-3">
              {" "}
              <Dialog>
                <DialogTrigger asChild>
                  {/* Button with a clean, slightly rounded look, similar to Notion's inline buttons */}
                  <Button
                    variant="outline"
                    className="rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 shadow-sm transition-all duration-200 ease-in-out px-4 py-2 text-sm font-medium"
                  >
                    UofT Template
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white p-6 rounded-lg shadow-xl font-sans max-w-lg mx-auto">
                  <DialogHeader className="border-b border-gray-200 pb-4 mb-4">
                    <DialogTitle className="text-xl font-semibold text-gray-800">
                      Sample Email – UofT Template
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 text-sm mt-1">
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-3 font-mono text-xs rounded-md border border-gray-200 text-gray-800 leading-relaxed overflow-y-auto max-h-60">
                          <p>{emailPrompts["University of Toronto"]}</p>
                        </div>
                        <Button
                          onClick={() =>
                            setInput((prev) => ({
                              ...prev,
                              draft: emailPrompts["University of Toronto"],
                            }))
                          }
                          className="w-full justify-center inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium"
                        >
                          Set Prompt
                        </Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="rounded-full">
                UC Berkeley Template
              </Button>
              <Button variant="outline" className="rounded-full">
                Harvard Template
              </Button>
            </div>
            <div className="flex items-center mt-4 text-sm text-gray-600">
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh Templates
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" /> Suggest
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" /> Insert Your Own
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
