"use client";

import "tippy.js/dist/tippy.css";

import { useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListTodo,
  Strikethrough,
  X,
} from "lucide-react";

import {
  DialogClose,
} from "@/shadcomponents/ui/dialog";

import { Badge } from "@/shadcomponents/ui/badge";
import { saveDraft } from "../../api/drafts/saveDraft";

export default function DraftEditor({
  fromName,
  fromEmail,
  to,
  userId,
  professorId,
  draftId,
  body,
  initialSubject,
}) {
  const [subject, setSubject] = useState("");
  const [command, setCommand] = useState("");
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-[35.9rem] w-full h-full min-h-[300px] p-2 text-[13px] [&>*]:my-0 [&>*]:mb-0 [&>*]:mt-0",
      },
    },
    content: body,
  });

  const handleUpdateDraft = async () => {
    const data = {
      fromName: fromName,
      fromEmail: "baronliu1993@gmail.com",
      to: "jiexuan.liu@mail.utoronto.ca",
      body: editor.getHTML(),
      subject: subject,
    };
    await saveDraft(data, draftId, userId);
  };

  return (
    <div>
      <div className="text-sm">
        <div className="flex justify-between px-4">
          <Badge className="text-[#D9730D] bg-[#FAEBDD] rounded-xs">
            Unsent Draft
          </Badge>
          <DialogClose className="text-[#37352F] hover:bg-[#F1F1EF] cursor-pointer hover:text-red-500">
            <X className="h-6 w-6 p-1 rounded-xs" />
          </DialogClose>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 px-4 py-1">
            <h1 className="text-black">{fromName}</h1>
            <h2 className="text-[#787774]">{fromEmail}</h2>
          </div>
          <input className="px-4 py-1 w-full" placeholder="Add Recipient" />
          <input
            onChange={(e) => setSubject(e.target.value)}
            className="px-4 py-1 w-full"
            placeholder="Subject"
            defaultValue={initialSubject}
          />
        </div>
      </div>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex items-center rounded-xs text-[#37352F] border-1 border-gray-100 bg-white p-1 shadow-sm">
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
      <div className="font-main p-4 flex items-center">
        <button
          className="font-main text-xs rounded-xs text-white bg-blue-500 h-[1.7rem] px-1 "
          onClick={handleUpdateDraft}
        >
          Save Draft
        </button>
      </div>
    </div>
  );
}
