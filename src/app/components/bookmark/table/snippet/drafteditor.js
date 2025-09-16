"use client";

import "tippy.js/dist/tippy.css";
import { useState, useEffect } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
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
import { DialogClose } from "@/shadcomponents/ui/dialog";
import { Badge } from "@/shadcomponents/ui/badge";
import { saveDraft } from "../../api/drafts/saveDraft";
import { toast } from "sonner";

export default function DraftEditor({
  fromName,
  fromEmail,
  to,
  draftId,
  body: initialBody,
  initialSubject,
  access,
}) {
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const editor = useEditor({
    extensions: [StarterKit],
    content: body,
    editorProps: {
      attributes: {
        class:
          "prose prose-p:my-0 max-w-[35.9rem] w-full h-full min-h-[300px] p-2 text-[14px]",
      },
    },
    onUpdate: ({ editor }) => {
      setBody(editor.getHTML());
    },
  });
  useEffect(() => {
    setSubject(initialSubject);
    setBody(initialBody);
    if (editor) {
      editor.commands.setContent(initialBody);
    }
  }, [initialSubject, initialBody, editor]);

  const handleUpdateDraft = async () => {
    try {
      const data = {
        fromName,
        fromEmail,
        to,
        body,
        subject,
      };

      const updatedState = await saveDraft(data, draftId, access);
      setSubject(updatedState.subject);
      setBody(updatedState.body);
      editor?.commands.setContent(updatedState.body);
      toast("Saved Successfully");
    } catch {
      toast("Failed To Save");
    }
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
          <div className="px-4 py-1 w-full">{to}</div>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="px-4 py-1 w-full"
            placeholder="Subject"
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

      <div className = "px-2">
        <EditorContent editor={editor} />
      </div>
      <div className="font-main p-4 flex items-center">
        <DialogClose>
          <button
            className="rounded-sm flex items-center gap-2 p-2 text-sm text-[#337EA9] font-semibold bg-[#E7F3F8] cursor-pointer hover:bg-[#D0E7F0]"
            onClick={handleUpdateDraft}
          >
            <Loader />
            Save Draft
          </button>
        </DialogClose>
      </div>
    </div>
  );
}
