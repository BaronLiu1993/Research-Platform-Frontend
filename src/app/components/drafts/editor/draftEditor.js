"use client";

import "tippy.js/dist/tippy.css";

import { useEffect, useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  CheckCheck,
  Italic,
  List,
  ListTodo,
  Strikethrough,
  X,
} from "lucide-react";

import { DialogClose } from "@/shadcomponents/ui/dialog";
import { Badge } from "@/shadcomponents/ui/badge";
import { toast } from "sonner";

export default function DraftEditor({
  access,
  draftId,
  userName,
  userEmail,
  professorEmail,
}) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  const getEmailDrafts = async () => {
    try {
      const draftRes = await fetch(
        `${API_BASE}/email/get-singular-draft?draftId=${draftId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${access}` },
        }
      );
      if (draftRes.ok) {
        const draftData = await draftRes.json();
        return { data: draftData, success: true };
      } else {
        return { message: "Server Error", success: false };
      }
    } catch (err) {
      return { message: "Internal Server Error", success: false };
    }
  };

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

  useEffect(() => {
    const handleEmailDraft = async () => {
      const response = await getEmailDrafts();
      if (response.sucess) {
        setSubject(response.data.subject);
        setBody(response.data.html);
        if (editor) {
          editor.commands.setContent(response.data.html);
        }
      }
    };
    handleEmailDraft();
  }, [access, draftId, editor]);
  const saveDraft = async () => {
    try {
      if (editor) {
        const saveRes = await fetch(
          `${API_BASE}/email/update-draft?draftId=${draftId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${access}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: professorEmail,
              fromEmail: userEmail,
              fromName: userName,
              subject,
              body: editor.getHTML(),
            }),
          }
        );
        if (saveRes.ok) {
          toast.success("Updated Successfully!");
          return { message: "Sucess!", sucess: true };
        }
      }
    } catch {
      toast.error("Failed to Update!");
      return { message: "Internal Server Error", sucess: false };
    }
  };

  return (
    <div>
      <div className="text-sm">
        <div className="flex justify-between mx-4">
          <Badge className="text-[#9F6B53] bg-[#F4EEEE] rounded-xs">
            Draft Messages
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
          onClick={saveDraft}
          className="text-sm cursor-pointer font-main font-medium flex items-center gap-1 text-white bg-[#529CCA] px-3 py-1.5 hover:bg-[#3574E2] transition-colors rounded-sm"
        >
          <CheckCheck className="h-4 w-4" />
          Save Draft
        </DialogClose>
      </div>
    </div>
  );
}
