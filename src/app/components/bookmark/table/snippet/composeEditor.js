"use client";

import "tippy.js/dist/tippy.css";

import { useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";

import Mention from "@tiptap/extension-mention";
import suggestion from "../tiptap/suggestion";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  BookText,
  CurlyBraces,
  Italic,
  List,
  ListTodo,
  Paperclip,
  PencilRuler,
  Strikethrough,
  Trash2,
  Wand2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcomponents/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shadcomponents/ui/tooltip";

import Snippets from "../popover/snippets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcomponents/ui/dropdown-menu";

export default function ComposeEditor({
  userId,
  professorId,
  fromName,
  fromEmail,
  to,
}) {
  const [subject, setSubject] = useState("");
  const [open, setOpen] = useState(false);

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
    <div>
      <div className="text-sm">
        <div className="flex flex-col">
          <div className="flex gap-2 px-4 py-1">
            <h1 className="text-black">Baron Liu</h1>
            <h2 className="text-[#787774]">baronliu1993@gmail.com</h2>
          </div>
          <input className="px-4 py-1 w-full" placeholder="Add Recipient" />
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
      <EditorContent editor={editor} />
      <div className="font-main p-4 flex justify-between items-center">
        <button className="font-main text-xs rounded-xs text-white font-semibold bg-blue-500 h-[1.7rem] w-[3rem]">
          Send
        </button>
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger className="hover:bg-[#F4EEEE] p-1 rounded-xs cursor-pointer">
              <BookText className="h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent className="font-main font-semibold rounded-xs text-[12px] leading-4">
              Attachments
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger className="hover:bg-[#F4EEEE] p-1 rounded-xs cursor-pointer">
              <Paperclip className="h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent className="font-main font-semibold rounded-xs text-[12px] leading-4">
              Attachments
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger className="hover:bg-[#F4EEEE] p-1 rounded-xs cursor-pointer">
              <Wand2 className="h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent className="font-main font-semibold rounded-xs text-[12px] leading-4">
              AI Tools
            </TooltipContent>
          </Tooltip>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
              <Tooltip>
                <TooltipTrigger className="hover:bg-[#F4EEEE] p-1 rounded-xs cursor-pointer">
                  <CurlyBraces className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent className="font-main font-semibold rounded-xs text-[12px] leading-4">
                  Snippets
                </TooltipContent>
              </Tooltip>
            </PopoverTrigger>
            <PopoverContent>
              <Snippets />
            </PopoverContent>
          </Popover>
          <Tooltip>
            <TooltipTrigger className="hover:bg-red-100 p-1 rounded-xs cursor-pointer">
              <Trash2 />
            </TooltipTrigger>
            <TooltipContent className="font-main font-semibold rounded-xs text-[12px] leading-4">
              Delete
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
