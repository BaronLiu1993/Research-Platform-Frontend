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
import EmailSideBar from "./emailsidebar"; // Assuming this component will also be styled

import { Bold, Italic, UnderlineIcon, Sparkles, Wand2, FileText, Microscope, Pencil, CheckSquare } from "lucide-react"; // Added UnderlineIcon, Sparkles, Wand2
import { ToggleGroup, ToggleGroupItem } from "@/shadcomponents/ui/toggle-group";
import { Skeleton } from "@/shadcomponents/ui/skeleton";
import { Badge } from "@/shadcomponents/ui/badge";
import { prompts } from "./AIwriters";

export default function EmailTextEditor({
  content,
  research_interests
}) {
  const [aiTyping, setAiTyping] = useState(false);
  const [publicationData, setPublicationData] = useState([]);

  const handlePublicationData = (data) => {
    setPublicationData(data);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({ multicolor: true }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[30rem] w-full font-sans text-gray-800 py-3 px-4 bg-white rounded-b-md border border-gray-200", // Notion-like editor area
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) { // Only update if content actually changed
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const handleAIRewrite = async (prompt) => {
    if (!editor) return;
    const selection = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(
      selection.from,
      selection.to
    );
    if (!selectedText) return;

    setAiTyping(true);
    try {
      const response = await fetch("http://localhost:8000/ai-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: selectedText,
          style: prompt,
        }),
      });

      if (!response.ok) {
        // Handle HTTP errors
        console.error("AI edit request failed:", response.status);
        setAiTyping(false);
        return;
      }

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

      // Improved typing effect with proper mark removal
      const markId = `ai-highlight-${Date.now()}`;
      let currentPos = selection.from;

      for (let i = 0; i < aiText.length; i++) {
        const char = aiText[i];
        editor
          .chain()
          .focus()
          .insertContentAt(currentPos + i, `<mark data-mark-id="${markId}" class="bg-blue-100 text-blue-700 rounded px-0.5">${char}</mark>`)
          .run();
        await new Promise((res) => setTimeout(res, 10)); // Adjust speed as needed
      }
      // Once typing is done, remove the per-character highlights and insert final text
      // This is a bit complex with Tiptap's mark system if we want to remove them cleanly without leaving empty marks.
      // A simpler approach is to replace the whole highlighted segment once after "typing".
      editor
        .chain()
        .focus()
        .deleteRange({ from: selection.from, to: selection.from + aiText.length })
        .insertContentAt(selection.from, aiText)
        .setTextSelection({from: selection.from, to: selection.from + aiText.length}) // Select the newly inserted text
        .run();

    } catch (error) {
      console.error("Error during AI rewrite:", error);
    } finally {
      setAiTyping(false);
    }
  };

  if (!editor) {
    return (
      <div className="min-h-[30rem] w-full p-4 bg-gray-50 rounded-md">
        <Skeleton className="w-full h-20 mb-3 rounded-md bg-gray-200" />
        <Skeleton className="w-full h-64 rounded-md bg-gray-200" />
      </div>
    );
  }

  // Common class for ToggleGroupItem for Notion feel
  const toggleItemClasses = (isActive) =>
    `p-1.5 data-[state=on]:bg-gray-200 data-[state=on]:text-gray-800 hover:bg-gray-100 text-gray-600 rounded-sm transition-colors`;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 font-sans w-full">
        <div className="w-full md:w-2/3">
          {/* Toolbar */}
          <div className="p-1.5 bg-gray-50 border border-gray-200 rounded-t-md flex flex-wrap items-center gap-1">
            <ToggleGroup type="multiple">
              <ToggleGroupItem
                value="bold"
                aria-label="Toggle bold"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={toggleItemClasses(editor.isActive("bold"))}
                disabled={!editor.can().toggleBold()}
              >
                <Bold className="h-4 w-4" />
              </ToggleGroupItem>

              <ToggleGroupItem
                value="italic"
                aria-label="Toggle italic"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={toggleItemClasses(editor.isActive("italic"))}
                disabled={!editor.can().toggleItalic()}
              >
                <Italic className="h-4 w-4" />
              </ToggleGroupItem>

              <ToggleGroupItem
                value="strike" // Corrected to strike for Underline icon behavior
                aria-label="Toggle strikethrough"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={toggleItemClasses(editor.isActive("strike"))}
                disabled={!editor.can().toggleStrike()}
              >
                <UnderlineIcon className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="h-5 w-px bg-gray-300 mx-1"></div> {/* Separator */}
            
            {/* AI Tools Group */}
            <Popover>
              <PopoverTrigger asChild>
                <button className={`${toggleItemClasses(false)} flex items-center gap-1.5 text-sm px-2`}>
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  AI Tools
                </button>
              </PopoverTrigger>
              <PopoverContent className="bg-white shadow-lg border border-gray-200 rounded-md p-2 w-64 z-50 space-y-1">
                <button
                  onClick={() => handleAIRewrite(prompts[0])}
                  className="w-full text-left text-sm p-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
                  disabled={aiTyping || !editor.state.selection.content().size}
                >
                  <CheckSquare className="h-4 w-4 text-blue-500" /> Fix Grammar
                </button>
                <button
                  onClick={() => handleAIRewrite(prompts[1])}
                  className="w-full text-left text-sm p-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
                  disabled={aiTyping || !editor.state.selection.content().size}
                >
                  <Pencil className="h-4 w-4 text-green-500" /> Reword
                </button>
                <button
                  onClick={() =>
                    handleAIRewrite(
                      `${prompts[2]}. These are the professors interests ${research_interests}. Return ONLY the TEXT.`
                    )
                  }
                  className="w-full text-left text-sm p-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
                  disabled={aiTyping || !editor.state.selection.content().size}
                >
                  <Wand2 className="h-4 w-4 text-indigo-500" /> Personalise
                </button>
              </PopoverContent>
            </Popover>


            <Popover>
              <PopoverTrigger asChild>
                <button className={`${toggleItemClasses(false)} flex items-center gap-1.5 text-sm px-2`}>
                    <Microscope className="h-4 w-4 text-pink-500" /> Add Research
                </button>
              </PopoverTrigger>
              <PopoverContent className="bg-white shadow-lg border border-gray-200 rounded-md p-0 max-w-[20rem] w-[95vw] sm:w-[32rem] z-50">
                <Publications/>
              </PopoverContent>
            </Popover>
          </div>

          {/* Editor Content Area */}
          <EditorContent editor={editor} />

          {aiTyping && (
            <div className="text-xs text-gray-500 px-4 py-1.5 flex items-center gap-1.5 font-sans border-t border-gray-200">
              <Wand2 className="h-3.5 w-3.5 text-purple-500 animate-pulse" />
              AI is thinking
              <span className="animate-pulse">.</span>
              <span className="animate-pulse [animation-delay:.2s]">.</span>
              <span className="animate-pulse [animation-delay:.4s]">.</span>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/3">
             <EmailSideBar publications={publicationData} /> 
        </div>
      </div>
    </>
  );
}