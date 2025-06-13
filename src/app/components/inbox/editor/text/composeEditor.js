"use client";

import { saveDraftToServer } from "@/app/actions/updateFollowUp";
import { useLoadingStore } from "@/app/store/useLoadingStore";
import { useRef, useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  BookText,
  CurlyBraces,
  Italic,
  List,
  ListTodo,
  Minimize2,
  Paperclip,
  PencilRuler,
  Strikethrough,
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
import DeleteFollowUp from "../../button/compose/deleteFollowUp";
import { SaveIndicator } from "./saveindicator";
import Snippets from "../../popover/snippets";

export default function ComposeEditor({
  draftData,
  userId,
  professorId,
  fromName,
  fromEmail,
  to,
}) {
  const saveTimeout = useRef(null);
  const [open, setOpen] = useState(false) 
  const { setStatus } = useLoadingStore.getState();
  const [subject, setSubject] = useState("");

  const saveDraft = useCallback(
    async (content) => {
      const data = {
        fromName,
        fromEmail: "baronliu1993@gmail.com",
        to: "jiexuan.liu@mail.utoronto.ca",
        body: content,
        subject,
      };

      try {
        await saveDraftToServer(data, userId, professorId);
        console.log(`saved draft successfully`);
      } catch (err) {
        console.error("saveDraft error:", err);
      }
    },
    [fromName, professorId, subject, userId]
  );

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "max-w-[35.9rem] w-full h-full min-h-[300px] p-1 text-[13px]",
      },
    },
    content: "",
  });

  useEffect(() => {
    if (!editor) return;

    const handleIdleSave = () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(async () => {
        const content = editor.getHTML();
        setStatus("saving");
        await saveDraft(content);
        setStatus("saved");
      }, 2000);
    };

    editor.on("update", handleIdleSave);

    return () => {
      editor.off("update", handleIdleSave);
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [editor, saveDraft, setStatus]);

  useEffect(() => {
    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (editor && draftData?.draftExists) {
      editor.commands.setContent(draftData.body);
    }
    if (draftData?.subject) {
      setSubject(draftData.subject);
    }
  }, [editor, draftData]);

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
      <div className="flex items-center justify-between text-[#37352F] bg-[#F7F6F3] text-xs px-4 py-2 rounded-xs font-semibold border-1">
        <div className="flex gap-1">
          <SaveIndicator />
        </div>
        <div className="flex gap-2">
          <X className="h-4 w-4 text-[#787774]" />
          <Minimize2 className="h-4 w-4 text-[#787774]" />
        </div>
      </div>
      <div className="text-sm">
        <div className="flex flex-col">
          <div className="flex gap-2 px-4 py-1">
            <h1 className="text-black">Baron Liu</h1>
            <h2 className="text-[#787774]">baronliu1993@gmail.com</h2>
          </div>
          <input
            className="px-4 py-1 w-full"
            placeholder="Add Recipient"
            variant="ghost"
          />
          <input
            onChange={(e) => setSubject(e.target.value)}
            className="px-4 py-1 w-full"
            placeholder="Subject"
            variant="ghost"
            value={subject}
          />
        </div>
      </div>

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
            <PopoverContent className = "p-0">
                <Snippets />
            </PopoverContent>
          </Popover>
          <Tooltip>
            <TooltipTrigger className="hover:bg-red-100 p-1 rounded-xs cursor-pointer">
              <DeleteFollowUp userId={userId} professorId={professorId} />
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
