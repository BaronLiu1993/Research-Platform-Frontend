"use client";
import { useRef, useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import {
  AlignCenter,
  Bold,
  CurlyBraces,
  Italic,
  List,
  ListTodo,
  Paperclip,
  PencilRuler,
  Strikethrough,
  Trash2,
  Underline,
  Wand2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shadcomponents/ui/tooltip";

export default function ComposeEditor({
  userId,
  professorId,
  fromName,
  fromEmail,
  to,
}) {
  const saveTimeout = useRef(null);
  const [subject, setSubject] = useState("");
  const saveDraft = useCallback(async (content) => {
    const data = {
        fromName: fromName,
        fromEmail: fromEmail,
        to: to,
        body: content,
        subject: subject
    }
    try {
      const response = await fetch(`http://localhost:8080/gmail/update-follow-up-draft/${userId}/${professorId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("Draft save failed");
      }
    } catch (err) {
      console.error("Error saving draft:", err);
    }
  }, []);

  const handleEditorUpdate = useCallback(
    (editor) => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(() => {
        const content = editor.getHTML();
        saveDraft(content);
      }, 2000);
    },
    [saveDraft]
  );

  const editor = useEditor({
    extensions: [StarterKit, Highlight.configure({ multicolor: true })],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm prose-base prose-slate max-w-none w-full h-full min-h-[300px] leading-tight focus:outline-none font-main text-black px-6 py-4 bg-white border border-gray-200",
      },
    },
    content: "",
    onUpdate: ({ editor }) => handleEditorUpdate(editor),
  });

  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, []);

  return (
    <>
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
                onClick={() => editor.chain().focus().toggleOrderedList().run}
                className={`rounded-md p-1 hover:bg-gray-100 ${
                  editor.isActive("bold")
                    ? "hover:bg-[#F1F1EFs] text-blue-400"
                    : ""
                }`}
              >
                <ListTodo className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`rounded-md p-1 hover:bg-gray-100 ${
                  editor.isActive("bold")
                    ? "hover:bg-[#F1F1EFs] text-blue-400"
                    : ""
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </BubbleMenu>
        )}
        <div className="flex flex-col text-sm font-main px-3">
          <input
            className="p-1 w-full"
            placeholder="Add Recipient"
            variant="ghost"
          />

          <input onChange = {(e) => setSubject(e.target.value)} className="p-1 w-full" placeholder="Subject" variant="ghost" />
        </div>
        <EditorContent editor={editor} />
        <div className="font-main p-4 flex justify-between items-center">
          <button className="font-main text-xs rounded-xs text-white font-semibold bg-blue-500 h-[1.7rem] w-[3rem]">
            Send
          </button>
          <div className="flex gap-2">
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
            <Tooltip>
              <TooltipTrigger className="hover:bg-[#F4EEEE] p-1 rounded-xs cursor-pointer">
                <CurlyBraces className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="font-main font-semibold rounded-xs text-[12px] leading-4">
                Snippets
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="hover:bg-red-100 p-1 rounded-xs cursor-pointer">
                <Trash2 className="h-4 w-4 hover:text-red-500" />
              </TooltipTrigger>
              <TooltipContent className="font-main font-semibold rounded-xs text-[12px] leading-4">
                Delete
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}
