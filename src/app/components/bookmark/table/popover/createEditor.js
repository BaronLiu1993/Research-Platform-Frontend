"use client";

import "tippy.js/dist/tippy.css";

import { useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";

import Mention from "@tiptap/extension-mention";
import suggestion from "../tiptap/suggestion";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListTodo,
  PencilRuler,
  Strikethrough,
  Wand2,
  PaintRoller,
} from "lucide-react";
import { DialogClose } from "@/shadcomponents/ui/dialog";

export default function CreateEditor({
  userId,
  professorId,
  fromName,
  fromEmail,
  to,
}) {
  const [subject, setSubject] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        suggestion: {
          ...suggestion,
          char: "/",
          ignoreEvents: true,
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose max-w-[35.9rem] w-full h-full min-h-[300px] p-1 text-[14px]",
      },
    },
    content: "",
  });

  return (
    <div className="space-y-2 font-main">
      <div>
        <h1 className="text-[#787774] text-xs font-semibold">New Snippet</h1>
        <div className="space-y-2">
          <h1 className="text-xs text-[#787774]">Name</h1>
          <div className="flex gap-2">
            <PaintRoller className="h-7 w-7 rounded-sm border-1 p-1 text-[#787774]" />
            <input
              className="h-7 rounded-xs border-1 w-full px-2"
              placeholder="/"
            />
          </div>
        </div>
      </div>
      <input
        onChange={(e) => setSubject(e.target.value)}
        className="px-4 py-1 w-full border-1 rounded-xs text-xs font-main font-light"
        placeholder="Subject"
        value={subject}
      />
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex rounded-xs text-[#37352F] border-1 border-gray-100 bg-white p-1 shadow-sm">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`rounded-md p-1 hover:bg-gray-100 font-main text-xs gap-2 mx-1 flex ${
                editor.isActive("bold") ? "text-blue-400" : ""
              }`}
            >
              <PencilRuler className="w-4 h-4" /> <span>Revise</span>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`rounded-md p-1 hover:bg-gray-100 font-main text-xs gap-2 mx-1 flex ${
                editor.isActive("bold") ? "text-blue-400" : ""
              }`}
            >
              <Wand2 className="w-4 h-4" /> <span>Generate with AI</span>
            </button>
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
      <EditorContent editor={editor} className="border-1 rounded-xs" />
      <div className="font-main pt-5 flex justify-between items-center gap-5">
        <DialogClose className="font-main text-xs rounded-xs text-black font-semibold border-1 bg-white h-[1.7rem] w-full">
          Cancel
        </DialogClose>
        <button className="font-main text-xs rounded-xs text-white font-semibold bg-blue-500 h-[1.7rem] w-full">
          Send
        </button>
      </div>
    </div>
  );
}
