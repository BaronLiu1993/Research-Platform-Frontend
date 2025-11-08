"use client";

import "tippy.js/dist/tippy.css";

import { useEffect, useState } from "react";
import HardBreak from "@tiptap/extension-hard-break";
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
    extensions: [
      StarterKit.configure({
        hardBreak: false,
        heading: { levels: [1, 2, 3] },
        blockquote: true,
        code: true,
      }),
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => this.editor.commands.setHardBreak(),
            "Mod-Enter": () => this.editor.commands.splitBlock(), // optional: new paragraph
          };
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: [
          "w-full min-h-[300px] p-3",
          "text-[13px] leading-[1.35] font-sans text-[#202124]",
          "bg-white border border-slate-200 rounded-xs",
          "outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-200",
          "[&p]:m-0",
          "[&p+p]:mt-1",
          "[&p]:leading-[1.35]",
          "[&h1]:m-0 [&h1]:text-[15px] [&h1]:leading-[1.3] [&h1+p]:mt-1",
          "[&h2]:m-0 [&h2]:text-[14px] [&h2]:leading-[1.3] [&h2+p]:mt-1",
          "[&h3]:m-0 [&h3]:text-[13px] [&h3]:leading-[1.3] [&h3+p]:mt-1",
          "[&ul]:m-0 [&ol]:m-0 [&ul]:pl-4 [&ol]:pl-4",
          "[&li]:my-0 [&li>p]:m-0",
          "[&li+li]:mt-1",
          "[&blockquote]:m-0 [&blockquote]:pl-3 [&blockquote]:border-l [&blockquote]:border-slate-200 [&blockquote+p]:mt-1",
          "[&code]:text-[12px] [&code]:bg-slate-100 [&code]:px-1 [&code]:py-0.5 [&code]:rounded",
          "[&img]:my-1 [&table]:my-1",
        ].join(" "),
      },
    },
    content: "",
  });

  useEffect(() => {
    const handleEmailDraft = async () => {
      const response = await getEmailDrafts();
      if (response.success) {
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
            Edit Messages
          </Badge>
          <DialogClose className="text-[#37352F] hover:bg-[#F1F1EF] hover:text-red-500 mx-2">
            <X className="h-6 w-6 p-1 rounded-xs" />
          </DialogClose>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 px-4 py-1">
            <h2 className="text-[#787774]">{professorEmail}</h2>
          </div>
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
