"use client";

import "tippy.js/dist/tippy.css";

import { useEffect, useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";

import Mention from "@tiptap/extension-mention";
import suggestion from "../tiptap/suggestion";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListTodo,
  Loader,
  Strikethrough,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/shadcomponents/ui/dialog";

import { useSelectedVariablesStore } from "@/app/store/useSelectedRowsStore";
import { Badge } from "@/shadcomponents/ui/badge";
import AIcontext from "../tiptap/AIcontext";
import { GenerateSnippet } from "@/app/actions/generateSnippet";
import { toast } from "sonner";

export default function ComposeEditor({
  userId,
  setSnippetId,
  userName,
  userEmail,
  handleGenerateDrafts,
  setGenerateView,
}) {
  const setSelectedVariables = useSelectedVariablesStore(
    (s) => s.setSelectedVariables
  );


  useEffect(() => {
    setSelectedVariables([]);
    setAISnippet([]);
  }, []);

  const [subject, setSubject] = useState("");
  const [AIOpenDialog, setAIOpenDialog] = useState(false);

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
          "prose prose-p:my-0 max-w-[35.9rem] w-full h-full min-h-[300px] p-2 text-[14px]",
      },
    },
    content: "",
    onUpdate({ editor }) {
      const mentions = [];

      editor.state.doc.descendants((node) => {
        if (node.type.name === "mention") {
          mentions.push(node.attrs.id);
        }
      });
      useSelectedVariablesStore.getState().setSelectedVariables(mentions);
    },
  });

  const handleSnippetGeneration = async (userId, body, subject) => {
    if (body.trim().length === 0 || subject.trim().length === 0) {
      handleGenerateDrafts();
      toast("Empty Draft");
    } else {
      const response = await GenerateSnippet(userId, body, subject);
      setGenerateView(true);
      setSnippetId(response.snippetId);
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
      <div className="text-sm">
        <div className="flex justify-between px-4">
          <Badge className="text-[#9F6B53] bg-[#F4EEEE] rounded-xs">
            Template Builder
          </Badge>
          <DialogClose className="text-[#37352F] hover:bg-[#F1F1EF] hover:text-red-500">
            <button className="cursor-pointer" onClick={handleGenerateDrafts}>
              <X className="h-6 w-6 p-1 rounded-xs" />
            </button>
          </DialogClose>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 px-4 py-1">
            <h1 className="text-black">{userName}</h1>
            <h2 className="text-[#787774]">{userEmail}</h2>
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
        <DialogClose>
          <button
            onClick={() =>
              handleSnippetGeneration(userId, editor.getHTML(), subject)
            }
            className="text-sm cursor-pointer font-main font-medium flex items-center gap-1 text-white bg-[#4584F3] px-3 py-1.5 hover:bg-[#3574E2] transition-colors rounded-sm"
          >
            <Loader className="h-4 w-4" />
            Generate Snippet
          </button>
        </DialogClose>
      </div>
    </div>
  );
}
