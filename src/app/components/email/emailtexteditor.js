"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

import Publications from "./publications";
import EmailSideBar from "./emailsidebar";

import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/shadcomponents/ui/toggle-group";

import { Skeleton } from "@/shadcomponents/ui/skeleton";

import { usePublicationStore } from "@/app/data/usePublicationStore";
import { Button } from "@/shadcomponents/ui/button";
import { Badge } from "@/shadcomponents/ui/badge";
import Email from "./email";

export default function EmailTextEditor({ content }) {
  const { selectedPublication, clearPublication } = usePublicationStore();
  const [aiTyping, setAiTyping] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Highlight.configure({ multicolor: true })],
    content,
    editorProps: {
      attributes: {
        class: "min-h-[30rem] font-light text-sm py-2 px-3 font-sans",
      },
    },
  });

  useEffect(() => {
    console.log(selectedPublication);
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const handleAIRewrite = async () => {
    const selection = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(
      selection.from,
      selection.to
    );
    if (!selectedText) return;
    setAiTyping(true);
    const response = await fetch("http://localhost:8000/ai-edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: selectedText,
        style: "write hi",
      }),
    });

    const data = await response.json();
    const aiText = data.result;
    if (!aiText) {
      setAiTyping(false);
      return;
    }

    editor
      .chain()
      .focus()
      .deleteRange({ from: selection.from, to: selection.to })
      .run();

    let typed = "";
    for (let i = 0; i < aiText.length; i++) {
      typed += aiText[i];
      editor
        .chain()
        .focus()
        .deleteRange({
          from: selection.from,
          to: selection.from + typed.length,
        })
        .insertContentAt(
          selection.from,
          `<mark class="bg-yellow-100">${typed}</mark>`
        )
        .run();

      await new Promise((res) => setTimeout(res, 10));
    }

    setAiTyping(false);
  };
  if (!editor) {
    return (
      <div className="min-h-[30rem] w-full p-4">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-2 font-sans">
        <div className="">
          {/*
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <ToggleGroup type="multiple" className="bg-gray-200">
                    <ToggleGroupItem
                    value="ai"
                    aria-label="AI Rewrite"
                    onClick={handleAIRewrite}
                    className="py-1 text-xs transition bg-green-100 hover:bg-green-200"
                    >
                    ✨ AI Rewrite
                    </ToggleGroupItem>

                    <ToggleGroupItem
                    value="bold"
                    aria-label="Toggle bold"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`py-1 text-xs transition ${
                        editor.isActive("bold")
                        ? "bg-gray-200 text-white"
                        : "bg-gray-200 text-black border-gray-300 hover:bg-gray-100"
                    }`}
                    >
                    <Bold />
                    </ToggleGroupItem>

                    <ToggleGroupItem
                    value="italic"
                    aria-label="Toggle italic"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`py-1 text-xs transition ${
                        editor.isActive("italic")
                        ? "bg-gray-200 text-white"
                        : "bg-gray-200 text-black border-gray-300 hover:bg-gray-100"
                    }`}
                    >
                    <Italic />
                    </ToggleGroupItem>

                    <ToggleGroupItem
                    value="underline"
                    aria-label="Toggle underline"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`py-1 text-xs transition ${
                        editor.isActive("bold")
                        ? "bg-gray-200 text-white"
                        : "bg-gray-200 text-black border-gray-300 hover:bg-gray-100"
                    }`}
                    >
                    <Underline />
                    </ToggleGroupItem>
                </ToggleGroup>
                </BubbleMenu>
                */}
        </div>

        {/*The Built In Toolbar*/}
        <div className="mt-2 w-2/3">
          <ToggleGroup type="multiple" className="border-1 w-full">
            <ToggleGroupItem
              value="bold"
              aria-label="Toggle bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`py-1 text-xs transition ${
                editor.isActive("bold")
                  ? "bg-gray-200 text-white"
                  : "bg-gray-200 text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              <Bold />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="italic"
              aria-label="Toggle italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`py-1 text-xs transition ${
                editor.isActive("italic")
                  ? "bg-gray-200 text-white"
                  : "bg-gray-200 text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              <Italic />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="underline"
              aria-label="Toggle underline"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`py-1 text-xs transition ${
                editor.isActive("bold")
                  ? "bg-gray-200 text-white"
                  : "bg-gray-200 text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              <Underline />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="ai"
              aria-label="AI Rewrite"
              onClick={handleAIRewrite}
              className="py-1 text-xs min-w-fit"
            >
              <Badge className="bg-blue-300 text-black"> ✨ Fix Grammar</Badge>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="ai"
              aria-label="AI Rewrite"
              onClick={handleAIRewrite}
              className="py-1 text-xs min-w-fit"
            >
              <Badge className="bg-green-300 text-black"> ✏️ Reword</Badge>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="ai"
              aria-label="AI Rewrite"
              onClick={handleAIRewrite}
              className="py-1 text-xs min-w-fit"
            >
              <Popover>
                <PopoverTrigger asChild>
                  <button>
                    <Badge className="bg-pink-300 text-black cursor-pointer">
                      🔬 Add Research
                    </Badge>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="max-w-full w-[95%] sm:w-[32rem] z-50 p-2">
                  <Publications />
                </PopoverContent>
              </Popover>
            </ToggleGroupItem>
          </ToggleGroup>
          <EditorContent className="mt-2" editor={editor} />
        </div>
        <EmailSideBar className="max-w-1/3" />
      </div>

      {aiTyping && (
        <div className="text-sm text-gray-500 px-10 flex items-center gap-1 font-sans">
          AI is typing
          <span className="animate-bounce">.</span>
          <span className="animate-bounce [animation-delay:.2s]">.</span>
          <span className="animate-bounce [animation-delay:.4s]">.</span>
        </div>
      )}
    </>
  );
}
