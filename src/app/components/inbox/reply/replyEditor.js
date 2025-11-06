"use client";

import "tippy.js/dist/tippy.css";

import { useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  CheckCheck,
  Italic,
  List,
  ListTodo,
  Reply,
  Strikethrough,
  X,
} from "lucide-react";

import { DialogClose } from "@/shadcomponents/ui/dialog";
import { Badge } from "@/shadcomponents/ui/badge";
import { SendReply } from "@/app/api/reply/sendReply";
import { toast } from "sonner";

export default function ReplyEditor({
  access,
  messageId,
  professorName,
  professorEmail,
  userName,
  userEmail,
}) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose prose-p:my-0 max-w-[35.9rem] w-full h-full min-h-[300px] p-2 text-[14px]",
      },
    },
    content: body,
  });

  const sendDraft = async () => {
    try {
      toast.loading("Sending Response...");
      const response = await SendReply({
        userName,
        userEmail,
        professorEmail,
        professorName,
        body: editor.getHTML(),
        subject,
        messageId,
        access,
      });
  
      console.log("API Response:", response);  // Log the response for debugging
  
      if (response.success) {
        toast.success("Sent Response!");
      } else {
        toast.error("Failed to Send! Reason: " + response.message);  // Show the server message
      }
    } catch (error) {
      console.error("Error in sendDraft:", error);  // Log the error for debugging
      toast.error("Failed to Send!");
    }
  };
  

  return (
    <div>
      <div className="text-sm">
        <div className="flex justify-between mx-4">
          <Badge className="text-[#9F6B53] bg-[#F4EEEE] rounded-xs">
            Reply
          </Badge>
          <DialogClose className="text-[#37352F] hover:bg-[#F1F1EF] hover:text-red-500 mx-2">
            <X className="h-6 w-6 p-1 rounded-xs" />
          </DialogClose>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 px-4 py-1">
            <h1 className="text-black">{userName}</h1>
            <h2 className="text-[#787774]">{userEmail}</h2>
          </div>
          <input
            onChange={(e) => setSubject(e.target.value)}
            className="px-4 py-1 w-full"
            placeholder="Subject"
            value={subject}
          />
        </div>
      </div>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex rounded-xs text-[#37352F] border-1 border-gray-100 bg-white p-1 shadow-sm">
            <div className="text-gray-200 border-l-1"></div>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`rounded-md p-1 hover:bg-gray-100 ${
                editor.isActive("bold") ? "text-blue-400" : ""
              }`}
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`rounded-md p-1 hover:bg-gray-100 ${
                editor.isActive("italic") ? "text-blue-400" : ""
              }`}
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`rounded-md p-1 hover:bg-gray-100 ${
                editor.isActive("strike") ? "text-blue-400" : ""
              }`}
            >
              <Strikethrough className="w-4 h-4" />
            </button>
            <div className="text-gray-200 border-l-1"></div>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`rounded-md p-1 hover:bg-gray-100 ${
                editor.isActive("orderedList") ? "text-blue-400" : ""
              }`}
            >
              <ListTodo className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`rounded-md p-1 hover:bg-gray-100 ${
                editor.isActive("bulletList") ? "text-blue-400" : ""
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
      <div className="font-main p-4 flex gap-4 items-center">
        <DialogClose
          onClick={sendDraft}
          className="text-sm cursor-pointer font-main font-medium flex items-center gap-1 text-white bg-[#529CCA] px-3 py-1.5 hover:bg-[#3574E2] transition-colors rounded-sm"
        >
          <Reply className="h-4 w-4" />
          Reply
        </DialogClose>
      </div>
    </div>
  );
}
