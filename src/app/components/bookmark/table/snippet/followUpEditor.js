"use client";

import "tippy.js/dist/tippy.css";

import { useEffect, useState } from "react";
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
  X,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shadcomponents/ui/tooltip";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/shadcomponents/ui/dialog";

import { useSelectedVariablesStore } from "@/app/store/useSelectedRowsStore";
import { Badge } from "@/shadcomponents/ui/badge";
import Calendar20 from "@/shadcomponents/ui/calendar-20";

export default function FollowUpEditor({ userId, userName, userEmail }) {
  //Mount the selected variables store
  const setSelectedVariables = useSelectedVariablesStore(
    (s) => s.setSelectedVariables
  );

  useEffect(() => {
    setSelectedVariables([]);
  }, []);

  const [subject, setSubject] = useState("");
  const [open, setOpen] = useState(false);
  const [AIOpenDialog, setAIOpenDialog] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class:
            "prose bg-[#F6F3F9] text-[#9065B0] font-mono text-[14px] rounded-md",
        },
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
          "prose prose-sm max-w-[35.9rem] w-full h-full min-h-[300px] p-2 text-[13px] [&>*]:my-0 [&>*]:mb-0 [&>*]:mt-0",
      },
    },
    content: "",
    onUpdate({ editor }) {
      const mentions = [];

      editor.state.doc.descendants((node) => {
        if (node.type.name === "mention") {
          console.log(node.attrs.id);
          if (node.attrs.id === "{{AIcontext}}") {
            setAIOpenDialog(true);
          }
          mentions.push(node.attrs.id);
        }
      });

      const uniqueMentions = [...new Set(mentions)];

      const normalMentions = uniqueMentions.filter(
        (id) => id !== "{{AIcontext}}"
      );

      useSelectedVariablesStore.getState().setSelectedVariables(normalMentions);
    },
  });

  const handleNavigateCalendar = async () => {
    setCalendar(true);
    if (calendar == true) {
      setCalendar(false);
    }
  };

  return (
    <div>
      <Dialog open={AIOpenDialog} onOpenChange={setAIOpenDialog}>
        <DialogContent className="p-0 rounded-xs">
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <AIcontext />
          </DialogDescription>
        </DialogContent>
      </Dialog>
      {!calendar ? (
        <div className="text-sm">
          <div className="flex justify-between px-4">
            <Badge className="text-[#9F6B53] bg-[#F4EEEE] rounded-xs">
              Follow Up Builder
            </Badge>
            <DialogClose className="text-[#37352F] hover:bg-[#F1F1EF] cursor-pointer hover:text-red-500">
              <X className="h-6 w-6 p-1 rounded-xs" />
            </DialogClose>
          </div>

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
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={`rounded-md p-1 hover:bg-gray-100 ${
                    editor.isActive("orderedList") ? "text-blue-400" : ""
                  }`}
                >
                  <ListTodo className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
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
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger className="hover:bg-[#F4EEEE] p-1 rounded-xs cursor-pointer">
                  <Paperclip className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent className="font-main font-semibold rounded-xs text-[12px] leading-4">
                  Attachments
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      ) : (
        <Calendar20 />
      )}
      <button
        onClick={handleNavigateCalendar}
        className="font-main text-xs rounded-xs text-[#337EA9] cursor-pointer m-4 bg-[#E7F3F8] h-[1.7rem] px-1"
      >
        {!calendar ? <div>Select Date</div> : <div>Return to Editing</div>}
      </button>
    </div>
  );
}
