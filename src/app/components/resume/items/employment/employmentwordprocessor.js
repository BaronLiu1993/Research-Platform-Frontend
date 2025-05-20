// EmploymentWordProcessor.jsx or .tsx
"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";

import { Bold, Italic, Underline, Wand, Brain, Sparkle } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/shadcomponents/ui/toggle-group";

import { Skeleton } from "@/shadcomponents/ui/skeleton";

export default function EmploymentWordProcessor({ value, onChange, id }) {
  const [aiTyping, setAiTyping] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Highlight.configure({ multicolor: true })],
    content: value || "",
    editorProps: {
      attributes: {
        class: "min-h-[156px] font-light text-sm py-2 px-3 font-sans",
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value]);

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
        style: "Make this more professional and fix grammar",
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
      .insertContent(aiText)
      .run();
    setAiTyping(false);
  };

  if (!editor) {
    return (
      <div className="min-h-[156px] w-full p-4">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>
    );
  }

  return (
    <>
      <div>
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="font-sans w-[30rem]"
        >
          <ToggleGroup type="multiple" className="bg-gray-100 rounded-sm p-1">
            <div>
              <ToggleGroupItem
                value="ai"
                aria-label="AI Rewrite"
                onClick={handleAIRewrite}
                className="py-1 px-2 text-xs hover:bg-gray-200 rounded-md"
              >
                <Wand />
                Improve Wording
              </ToggleGroupItem>
              <ToggleGroupItem
                value="ai"
                aria-label="AI Rewrite"
                onClick={handleAIRewrite}
                className="py-1 px-2 text-xs hover:bg-gray-200 rounded-md"
              >
                <Sparkle />
                Grammar
              </ToggleGroupItem>
              <ToggleGroupItem
                value="ai"
                aria-label="AI Rewrite"
                onClick={handleAIRewrite}
                className="py-1 px-2 text-xs hover:bg-gray-200 rounded-md"
              >
                <Brain />
                Generate Ideas
              </ToggleGroupItem>
            </div>

            <div className="border-l-1">
              <ToggleGroupItem
                value="bold"
                aria-label="Toggle bold"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`py-1 px-2 text-xs hover:bg-gray-200 rounded-md`}
              >
                <Bold size={8} className="font-bold" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="italic"
                aria-label="Toggle italic"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`py-1 px-2 text-xs hover:bg-gray-200 rounded-md`}
              >
                <Italic size={8} />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="underline"
                aria-label="Toggle underline"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`py-1 px-2 text-xs hover:bg-gray-200 rounded-md`}
              >
                <Underline size={8} />
              </ToggleGroupItem>
            </div>
          </ToggleGroup>
        </BubbleMenu>
      </div>

      <EditorContent className="border rounded-md mt-2 font-sans font-light text-sm leading-snug min-w-[27rem] overflow-auto" editor={editor} />

      {aiTyping && (
        <div className="text-sm text-gray-500 mt-2 flex items-center gap-1">
          AI is typing
          <span className="animate-bounce">.</span>
          <span className="animate-bounce [animation-delay:.2s]">.</span>
          <span className="animate-bounce [animation-delay:.4s]">.</span>
        </div>
      )}
    </>
  );
}
