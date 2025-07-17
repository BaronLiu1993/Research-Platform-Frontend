"use client";

import "tippy.js/dist/tippy.css";

import { useEffect, useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";

import Mention from "@tiptap/extension-mention";
import suggestion from "../tiptap/suggestion";
import StarterKit from "@tiptap/starter-kit";
import {
  ALargeSmall,
  Bold,
  BookText,
  CurlyBraces,
  IndentDecrease,
  IndentIncrease,
  Italic,
  Link,
  List,
  ListTodo,
  Paperclip,
  Pencil,
  PencilRuler,
  Strikethrough,
  Trash2,
  Wand2,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/shadcomponents/ui/dialog";

import AIcontext from "../tiptap/AIcontext";
import { Badge } from "@/shadcomponents/ui/badge";
import { saveDraft } from "../../api/saveDraft";
import { AIEditDraft } from "../../api/AIEditDraft";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcomponents/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcomponents/ui/popover";

export default function DraftEditor({
  fromName,
  fromEmail,
  to,
  userId,
  professorId,
  body,
  initialSubject,
}) {
  const [subject, setSubject] = useState("");
  const [AIOpenDialog, setAIOpenDialog] = useState(false);
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
    const response = await saveDraft(data, userId, professorId);
  };

  const handleAIEditDraft = async () => {
    const response = await AIEditDraft(
      userId,
      professorId,
      editor?.state.doc.textBetween(
        editor?.state.selection.from,
        editor?.state.selection.to,
        " "
      ),
      command
    );
    console.log(response);
  };

  console.log(subject);

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
            <h1 className="text-black">Baron Liu</h1>
            <h2 className="text-[#787774]">baronliu1993@gmail.com</h2>
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
            <Select>
              <SelectTrigger className="border-0 shadow-none p-0 m-0 max-h-fit font-main text-xs ">
                <Pencil className="w-4 h-4 text-[#9A6DD7]" />
                <span className="text-[#37352F] font-medium">Revise</span>
              </SelectTrigger>
              <SelectContent className="rounded-xs">
                <SelectItem value="light" className="p-1 hover:bg-gray-100">
                  <button className="flex gap-2 font-main text-xs">
                    <IndentDecrease />
                    Shorten
                  </button>
                </SelectItem>
                <SelectItem value="dark" className="p-1 hover:bg-gray-100">
                  <button className="flex gap-2 font-main text-xs">
                    <IndentIncrease />
                    Lengthen
                  </button>
                </SelectItem>
                <SelectItem value="system" className="p-1 hover:bg-gray-100 ">
                  <button className="flex gap-2 font-main text-xs">
                    <ALargeSmall />
                    Grammar
                  </button>
                </SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger>
                <button
                  onClick={() => handleAIEditDraft(userId, professorId)}
                  className="rounded-md p-1 hover:bg-gray-100 font-main text-xs gap-2 mx-1 flex"
                >
                  <Wand2 className="w-4 h-4 text-[#529CCA]" />
                  <span className="font-medium">Generate</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="rounded-xs flex flex-col gap-2">
                <div className="flex flex-col font-main">
                  <input
                    className="h-[1.7rem] rounded-xs border-1 p-1"
                    placeholder="✏️ How Should I Edit?"
                  />
                </div>
                <div className = "font-main text-xs flex flex-col gap-2 justify-start items-start">
                  <button
                    onClick={() =>
                      handleAIEditDraft(userId, profId, "Make more confident")
                    }
                  >
                    💪 Confident Rewrite
                  </button>

                  <button
                    onClick={() =>
                      handleAIEditDraft(
                        userId,
                        profId,
                        "Explain why this research matters"
                      )
                    }
                  >
                    🎯 Add Research Relevance
                  </button>

                  <button
                    onClick={() =>
                      handleAIEditDraft(
                        userId,
                        profId,
                        "Improve flow and grammar"
                      )
                    }
                  >
                    🧹 Fix Grammar & Flow
                  </button>

                  <button
                    onClick={() =>
                      handleAIEditDraft(
                        userId,
                        profId,
                        "Add availability and commitment"
                      )
                    }
                  >
                    📅 Add Schedule/Availability
                  </button>
                </div>
              </PopoverContent>
            </Popover>

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
      <div className="font-main p-4 flex items-center">
        <button
          className="font-main text-xs rounded-xs text-white bg-blue-500 h-[1.7rem] px-1 "
          onClick={() => handleUpdateDraft()}
        >
          Save Draft
        </button>
      </div>
    </div>
  );
}
