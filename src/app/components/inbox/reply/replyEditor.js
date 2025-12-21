"use client";

import "tippy.js/dist/tippy.css";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListTodo,
  Reply,
  Strikethrough,
  X,
} from "lucide-react";

import { DialogClose } from "@/shadcomponents/ui/dialog";
import { SendReply } from "@/app/api/reply/sendReply";
import { toast } from "sonner";
import HardBreak from "@tiptap/extension-hard-break";

export default function ReplyEditor({
  access,
  messageId,
  professorName,
  professorEmail,
  userName,
  userEmail,
  threadId,
  subject,
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        hardBreak: false,
        heading: { levels: [1, 2, 3] },
        blockquote: true,
        code: true,
      }),
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => this.editor.commands.setHardBreak(),
            "Mod-Enter": () => this.editor.commands.splitBlock(),
          };
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: [
          "w-full min-h-[300px] p-3",
          "text-[13px] leading-[1.35] font-sans text-[#202124]",
          "bg-white border border-slate-200 rounded-xs",
          "outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-200",
          "[&p]:m-0",
          "[&p+p]:mt-1",
          "[&p]:leading-[1.35]",
          "[&h1]:m-0 [&h1]:text-[15px] [&h1]:leading-[1.3] [&h1+p]:mt-1",
          "[&h2]:m-0 [&h2]:text-[14px] [&h2]:leading-[1.3] [&h2+p]:mt-1",
          "[&h3]:m-0 [&h3]:text-[13px] [&h3]:leading-[1.3] [&h3+p]:mt-1",
          "[&ul]:m-0 [&ol]:m-0 [&ul]:pl-4 [&ol]:pl-4",
          "[&li]:my-0 [&li>p]:m-0",
          "[&li+li]:mt-1",
          "[&blockquote]:m-0 [&blockquote]:pl-3 [&blockquote]:border-l [&blockquote]:border-slate-200 [&blockquote+p]:mt-1",
          "[&code]:text-[12px] [&code]:bg-slate-100 [&code]:px-1 [&code]:py-0.5 [&code]:rounded",
          "[&img]:my-1 [&table]:my-1",
        ].join(" "),
      },
    },
    content: "",
  });

  const sendDraft = async () => {
    try {
      const response = await SendReply({
        userName,
        userEmail,
        professorEmail,
        professorName,
        body: editor.getHTML(),
        subject,
        messageId,
        access,
        threadId,
      });

      if (response.success) {
        toast.success("Sent Response!");
      } else {
        toast.error("Failed to Send!");
      }
    } catch (error) {
      toast.error("Failed to Send!");
    }
  };

  return (
    <div>
      <div className="text-sm">
        <div className="flex justify-between mx-4">
          <div></div>
          <DialogClose className="text-[#37352F] hover:bg-[#F1F1EF] hover:text-red-500 mx-2">
            <X className="h-6 w-6 p-1 rounded-xs" />
          </DialogClose>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 px-4 py-1">
            <h1 className="text-black">{professorName}</h1>

            <h2 className="text-[#787774]">{professorEmail}</h2>
          </div>
          <div className="flex gap-2 px-4 py-1">
            <h1 className="text-black">{userName}</h1>
            <h2 className="text-[#787774]">{userEmail}</h2>
          </div>
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
      <div className="font-main p-4 flex gap-4 items-center">
        <DialogClose
          onClick={sendDraft}
          className="text-sm cursor-pointer font-main font-medium flex items-center gap-1 text-white bg-[#529CCA] px-3 py-1.5 hover:bg-[#3574E2] transition-colors rounded-sm"
        >
          <Reply className="h-4 w-4" />
          Reply
        </DialogClose>
      </div>
    </div>
  );
}
