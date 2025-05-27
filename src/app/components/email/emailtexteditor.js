"use client";

import { useEffect, useState, useRef } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

import Publications from "./publications";
import GoogleCaledar from "./googlecalendar";
import EmailSideBar from "./emailsidebar";

import {
  Bold,
  Italic,
  UnderlineIcon,
  Sparkles,
  Wand2,
  Microscope,
  Pencil,
  CheckSquare,
  Calendar,
  Atom,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/shadcomponents/ui/toggle-group";
import { Skeleton } from "@/shadcomponents/ui/skeleton";
import { prompts } from "./AIwriters";
import DeepThink from "./deepthink";
import { Template } from "./template";

export default function EmailTextEditor({ student_data, research_interests, sendSubject, professor_id }) {
  const [aiTyping, setAiTyping] = useState(false);
  const [publications, setPublications] = useState([]);
  const [content, setContent] = useState(null);
  const [sentData, setSentData] = useState(false);
  const [typedContent, setTypedContent] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleSetPublications = (data) => {
    setPublications(data);
  };

  const handleSetEmail = (data) => {
    setContent(data.body);
    sendSubject(data.subject);
    setSentData(true);
  };

  const editor = useEditor({
    extensions: [StarterKit, Highlight.configure({ multicolor: true })],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl text-sm font-light focus:outline-none min-h-[30rem] w-full font-sans text-gray-800 py-3 px-4 bg-white rounded-b-md border border-gray-200",
      },
    },
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content && sentData) {
      setTypedContent("");
      let i = 0;
      const typeCharacter = () => {
        if (i < content.length) {
          setTypedContent((prev) => prev + content.charAt(i));
          i++;
          typingTimeoutRef.current = setTimeout(typeCharacter, 10); 
        } else {
          editor.commands.setContent(content);
        }
      };
      typeCharacter();
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [content, editor, sentData]);

  useEffect(() => {
    if (editor && typedContent && sentData) {
      editor.commands.setContent(typedContent, false);
    }
  }, [editor, typedContent, sentData]);

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

      const markId = `ai-highlight-${Date.now()}`;
      let currentPos = selection.from;

      for (let i = 0; i < aiText.length; i++) {
        const char = aiText[i];
        editor
          .chain()
          .focus()
          .insertContentAt(
            currentPos + i,
            `<mark data-mark-id="${markId}" class="bg-blue-100 text-blue-700 rounded px-0.5">${char}</mark>`
          )
          .run();
        await new Promise((res) => setTimeout(res, 10));
      }

      editor
        .chain()
        .focus()
        .deleteRange({
          from: selection.from,
          to: selection.from + aiText.length,
        })
        .insertContentAt(selection.from, aiText)
        .setTextSelection({
          from: selection.from,
          to: selection.from + aiText.length,
        })
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

  //For Toggling CSS with Tailwind
  const toggleItemClasses = (isActive) =>
    `p-1.5 data-[state=on]:bg-gray-200 data-[state=on]:text-gray-800 hover:bg-gray-100 text-gray-600 rounded-sm transition-colors`;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 font-sans w-full">
        <div className="w-full md:w-2/3">
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
                value="strike"
                aria-label="Toggle strikethrough"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={toggleItemClasses(editor.isActive("strike"))}
                disabled={!editor.can().toggleStrike()}
              >
                <UnderlineIcon className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="h-5 w-px bg-gray-300 mx-1"></div>

            <Popover className="max-w-[5rem]">
              <PopoverTrigger asChild>
                <button
                  className={`${toggleItemClasses(
                    false
                  )} flex items-center gap-1.5 bg-gray-100 rounded-4xl border-2 text-sm px-2 font-semibold`}
                >
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span> Extra Revisions</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="bg-white shadow-lg border border-gray-200 rounded-md p-2 w-64 z-50 space-y-1">
                <button
                  onClick={() => handleAIRewrite(prompts[0])}
                  className="w-full text-left text-xs p-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
                  disabled={aiTyping || !editor.state.selection.content().size}
                >
                  <CheckSquare className="h-4 w-4 text-blue-500" /> Fix Grammar
                </button>
                <button
                  onClick={() => handleAIRewrite(prompts[1])}
                  className="w-full text-left text-xs p-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
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
                  className="w-full text-left text-xs p-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
                  disabled={aiTyping || !editor.state.selection.content().size}
                >
                  <Wand2 className="h-4 w-4 text-indigo-500" /> Personalise
                </button>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={`${toggleItemClasses(
                    false
                  )} flex items-center gap-1.5 text-sm px-2 bg-gray-100 rounded-full border-2 font-semibold`}
                >
                  <Microscope className="h-4 w-4 text-pink-500" /> Publication
                  Mode
                </button>
              </PopoverTrigger>
              <PopoverContent className="bg-white shadow-lg border border-gray-200 rounded-md p-0 max-w-[20rem] w-[95vw] sm:w-[32rem] z-50">
                <Publications />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={`${toggleItemClasses(
                    false
                  )} flex items-center gap-1.5 text-sm px-2 bg-gray-100 rounded-4xl border-2 font-semibold`}
                >
                  <Calendar className="h-4 w-4 text-green-500" /> Google
                  Calendar
                </button>
              </PopoverTrigger>
              <PopoverContent className="bg-white shadow-lg border border-gray-200 rounded-md p-0 max-w-[20rem] w-[95vw] sm:w-[32rem] z-50">
                <GoogleCaledar />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={`${toggleItemClasses(
                    false
                  )} flex items-center gap-1.5 text-sm px-2 bg-gray-100 rounded-4xl border-2 font-semibold`}
                >
                  <Atom className="h-4 w-4 text-blue-500" /> Deep Think
                </button>
              </PopoverTrigger>
              <PopoverContent className="bg-white shadow-lg border border-gray-200 rounded-md p-0 max-w-[20rem] w-[95vw] sm:w-[32rem] z-50">
                <DeepThink />
              </PopoverContent>
            </Popover>
          </div>

          <div className="max-w-full border-1">
            {sentData ? (
              <EditorContent editor={editor} />
            ) : (
              <Template
                onUpdate={handleSetPublications}
                sendEmail={handleSetEmail}
                student_data={student_data}
                professor_id = {professor_id}
                className="p-10"
              />
            )}
          </div>
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
          <EmailSideBar publications={publications} />
        </div>
      </div>
    </>
  );
}
