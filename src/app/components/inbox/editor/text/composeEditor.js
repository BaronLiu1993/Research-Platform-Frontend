"use client";

import { SaveReply } from "@/app/actions/reply/saveReply";
import { useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListTodo,
  Loader,
  Send,
  Strikethrough,
  X,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shadcomponents/ui/tooltip";
import { DialogClose } from "@/shadcomponents/ui/dialog";

import { SendReply } from "@/app/actions/reply/sendReply";
import DeleteFollowUp from "../../button/compose/deleteFollowUp";
import { toast } from "sonner";

export default function ComposeEditor({
  draftData,
  userId,
  professorId,
  threadId,
  fromName,
  fromEmail,
  to,
  access,
}) {
  const [subject, setSubject] = useState("");
  
  const handleSendFollowUp = async () => {
    try {
      const data = {
        fromName,
        fromEmail,
        to,
        body: editor?.getHTML(),
        subject,
      };
      await SaveReply(data, professorId, threadId, access);
      await SendReply(draftData.draft_id, draftData.tracking_id);
      toast("Reply Sent!");
    } catch {
      toast("Failed to Send!");
    }
  };

  const handleSaveDraft = async () => {
    try {
      const data = {
        fromName,
        fromEmail,
        to,
        body: editor?.getHTML(),
        subject,
      };

      await SaveReply(data, professorId, threadId, access);
      toast("Saved Successfully");
    } catch {
      toast("Failed To Save");
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
    content: draftData.body || "",
  });

  return (
    <div>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex rounded-sm border border-gray-100 bg-white p-1 shadow-sm">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`rounded-md p-1 cursor-pointer hover:bg-gray-100 ${
                editor.isActive("bold")
                  ? "hover:bg-[#F1F1EFs] text-blue-400"
                  : ""
              }`}
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`rounded-md p-1 cursor-pointer hover:bg-gray-100 ${
                editor.isActive("italic")
                  ? "hover:bg-[#F1F1EFs] text-blue-400"
                  : ""
              }`}
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`rounded-md p-1 cursor-pointer hover:bg-gray-100 ${
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
              className={`rounded-md p-1 cursor-pointer hover:bg-gray-100 ${
                editor.isActive("orderedList")
                  ? "hover:bg-[#F1F1EFs] text-blue-400"
                  : ""
              }`}
            >
              <ListTodo className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`rounded-md p-1 cursor-pointer hover:bg-gray-100 ${
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
        <div className="flex justify-end p-2">
          <DialogClose className="p-2 rounded-sm w-fit cursor-pointer hover:bg-gray-100 flex">
            <X className="h-4 w-4 text-[#787774] hover:text-red-500" />
          </DialogClose>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-2 px-4 py-1">
            <h1 className="text-black">{fromName}</h1>
            <h2 className="text-[#787774]">{fromEmail}</h2>
          </div>
          <div className="flex gap-2 px-4 py-1">
            <h1 className="text-black">{to}</h1>
          </div>
          <input
            onChange={(e) => setSubject(e.target.value)}
            defaultValue={draftData.subject || ""}
            className="px-4 py-1 w-full"
            placeholder="Subject"
            variant="ghost"
          />
        </div>
      </div>
      <EditorContent editor={editor} />
      <div className="font-main p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <DialogClose asChild>
            <button
              onClick={handleSaveDraft}
              className="rounded-sm flex items-center gap-2 p-2 text-sm text-[#337EA9] font-semibold bg-[#E7F3F8] cursor-pointer hover:bg-[#D0E7F0]"
            >
              <Loader />
              Save For Later
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              onClick={handleSendFollowUp}
              className="rounded-sm bg-[#EDF3EC] flex items-center gap-2 p-2 font-semibold text-sm text-[#448361] cursor-pointer hover:bg-[#D6E6D4]"
            >
              <Send />
              Send Email Now
            </button>
          </DialogClose>
        </div>
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger className="hover:text-red-500 p-2 cursor-pointer hover:bg-gray-100">
              <DeleteFollowUp userId={userId} draftId={draftData.draft_id} />
            </TooltipTrigger>
            <TooltipContent className="font-main font-semibold rounded-xs text-[12px] leading-4">
              Delete Draft
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
