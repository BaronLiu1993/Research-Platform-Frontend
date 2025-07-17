"use client";

import { SaveReply } from "@/app/actions/reply/saveReply";
import { useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
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
  X,
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
import Snippets from "../../popover/snippets";
import { DialogClose } from "@/shadcomponents/ui/dialog";

import { SendReply } from "@/app/actions/reply/sendReply";
import DeleteFollowUp from "../../button/compose/deleteFollowUp";

export default function ComposeEditor({
  draftData,
  userId,
  professorId,
  threadId,
  fromName,
  fromEmail,
  to,
}) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  console.log(draftData)
  const handleSendFollowUp = async () => {
    await SendReply(
      userId,
      draftData.draft_id,
      draftData.tracking_id
    );
  };

  const handleSaveDraft = async () => {
    const data = {
      fromName,
      fromEmail: "baronliu1993@gmail.com",
      to: "jiexuan.liu@mail.utoronto.ca",
      body: editor?.getHTML(),
      subject,
    };
    await SaveReply(data, userId, professorId, threadId);
  };

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "max-w-[35.9rem] w-full h-full min-h-[300px] p-1 text-[13px]",
      },
    },
    content: draftData.body || "",
  });

  return (
    <div>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex rounded-md border border-gray-100 bg-white p-1 shadow-sm">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`rounded-md p-1 hover:bg-gray-100 font-main text-xs gap-2 mx-1 flex ${
                editor.isActive("bold")
                  ? "hover:bg-[#F1F1EFs] text-blue-400"
                  : ""
              }`}
            >
              <PencilRuler className="w-4 h-4" /> <span>Revise</span>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`rounded-md p-1 hover:bg-gray-100 font-main text-xs gap-2 mx-1 flex ${
                editor.isActive("bold")
                  ? "hover:bg-[#F1F1EFs] text-blue-400"
                  : ""
              }`}
            >
              <Wand2 className="w-4 h-4" /> <span>Generate with AI</span>
            </button>
            <div className="text-gray-200 border-l-1"></div>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`rounded-md p-1 hover:bg-gray-100 ${
                editor.isActive("bold")
                  ? "hover:bg-[#F1F1EFs] text-blue-400"
                  : ""
              }`}
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`rounded-md p-1 hover:bg-gray-100 ${
                editor.isActive("italic")
                  ? "hover:bg-[#F1F1EFs] text-blue-400"
                  : ""
              }`}
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`rounded-md p-1 hover:bg-gray-100 ${
                editor.isActive("strike")
                  ? "hover:bg-[#F1F1EFs] text-blue-400"
                  : ""
              }`}
            >
              <Strikethrough className="w-4 h-4" />
            </button>
            <div className="text-gray-200 border-l-1"></div>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`rounded-md p-1 hover:bg-gray-100 ${
                editor.isActive("orderedList")
                  ? "hover:bg-[#F1F1EFs] text-blue-400"
                  : ""
              }`}
            >
              <ListTodo className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`rounded-md p-1 hover:bg-gray-100 ${
                editor.isActive("bulletList")
                  ? "hover:bg-[#F1F1EFs] text-blue-400"
                  : ""
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </BubbleMenu>
      )}

      <div className="text-sm">
        <DialogClose className="py-2 px-4 flex justify-end items-end w-full">
          <X className="h-4 w-4 text-[#787774]" />
        </DialogClose>
        <div className="flex flex-col">
          <div className="flex gap-2 px-4 py-1">
            <h1 className="text-black">{fromName}</h1>
            <h2 className="text-[#787774]">{fromEmail}</h2>
          </div>
          <input className="px-4 py-1 w-full" value={to} variant="ghost" />
          <input
            onChange={(e) => setSubject(e.target.value)}
            className="px-4 py-1 w-full"
            placeholder="Subject"
            variant="ghost"
            defaultValue={draftData.subject}
          />
        </div>
      </div>
      <EditorContent editor={editor} />
      <div className="font-main p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => handleSaveDraft()}
            className="font-main text-xs rounded-xs text-[#337EA9] font-semibold bg-[#E7F3F8] h-[1.7rem] w-fit px-1"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSendFollowUp()}
            className="font-main text-xs rounded-xs text-[#448361] font-semibold bg-[#EDF3EC] cursor-pointer h-[1.7rem] w-fit px-1"
          >
            Send Email
          </button>
        </div>
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
              <DeleteFollowUp userId = {userId} draftId ={draftData.draft_id}/>
            </TooltipTrigger>
            <TooltipContent className="font-main font-semibold rounded-xs text-[12px] leading-4">
              Delete Draft
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
            <PopoverTrigger asChild>
              <Tooltip>
                <TooltipTrigger className="hover:bg-[#F4EEEE] p-1 rounded-xs cursor-pointer">
                  <CurlyBraces className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent className="font-main font-semibold rounded-xs text-[12px] leading-4">
                  Snippets
                </TooltipContent>
              </Tooltip>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Snippets />
            </PopoverContent>
          </Popover>
          <Tooltip>
            <TooltipTrigger className="hover:bg-red-100 p-1 rounded-xs cursor-pointer"></TooltipTrigger>
            <TooltipContent className="font-main font-semibold rounded-xs text-[12px] leading-4">
              Delete
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
