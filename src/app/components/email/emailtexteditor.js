"use client";

//TipTap Components
import { useState, useRef, useEffect, Suspense, lazy } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

//Shad CN Styling Components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ToggleGroup, ToggleGroupItem } from "@/shadcomponents/ui/toggle-group";
import { Skeleton } from "@/shadcomponents/ui/skeleton";

//Draft Components
import { handleCreateDraft } from "./button/createdraft";
import { handleAutoSave } from "./button/autosave";

//Option Components
const Publications = lazy(() => import("./publications"));
const GoogleCalendar = lazy(() => import("./productivity/googlecalendar"));

//Popover loading fallback
const PopoverLoading = () => (
  <Skeleton className="w-full h-full mb-3 rounded-md bg-gray-200" />
);

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shadcomponents/ui/sheet";

//Icons
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
  Cloud,
  RefreshCcw,
  List,
  ListEnd,
  ListStart,
} from "lucide-react";

//Prompts and Template Components
import { prompts } from "./AIwriters";
import { Template } from "./template";
import { Input } from "@/shadcomponents/ui/input";
import SendEmail from "./button/sendemail";
import { Button } from "@/shadcomponents/ui/button";

export default function EmailTextEditor({
  student_email,
  research_interests,
  professor_email,
  professor_id,
  professor_name,
  student_id,
  draft_data,
}) {
  //Handles changing the body only here

  //useStates
  const [aiTyping, setAiTyping] = useState(false);
  const [publications, setPublications] = useState([]);
  const [subject, setSubject] = useState("");
  const [sentData, setSentData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  //useRefs for determining if it is initialContent that is being set or AI Content Being Set
  const typingTimeoutRef = useRef(null);
  const hasSetInitialContent = useRef(false);
  const hasSetAIContent = useRef(false);
  const saveTimeout = useRef(null);
  console.log(publications)
  //Fix the editor state later
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      StarterKit,
      Highlight.configure({ multicolor: true }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm prose-base prose-slate max-w-none w-full h-full min-h-[300px] leading-tight focus:outline-none font-main text-black px-6 py-4 bg-white rounded-md border border-gray-200",
      },
    },
    content: "",
    onUpdate({ editor }) {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }

      setIsSaving(true);

      saveTimeout.current = setTimeout(() => {
        requestIdleCallback(() => {
          setIsSaving(false);
          handleAutoSave(subject, editor.getHTML(), student_id, professor_id);
        });
      }, 3000);
    },
  });

  //Listens Only Once
  useEffect(() => {
    if (!editor || !draft_data?.draftExists || hasSetInitialContent.current)
      return;
    editor.commands.setContent(draft_data.body);
    setSubject(draft_data.subject);
    setSentData(true);
    hasSetInitialContent.current = true;
  }, [editor, draft_data]);

  const submitCreateDraft = (subject) => {
    const body = editor?.getText();
    handleCreateDraft(
      professor_email,
      student_email,
      subject,
      body,
      professor_id,
      student_id
    );
  };

  const handleSetPublications = (data) => {
    setPublications(data);
  };

  const handleUpdateSubject = (data) => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    setIsSaving(true);

    saveTimeout.current = setTimeout(() => {
      requestIdleCallback(() => {
        setIsSaving(false);
        handleAutoSave(data, editor.getHTML(), student_id, professor_id);
      });
    }, 3000);
  };

  const handleSetEmail = (data) => {
    if (editor && !hasSetAIContent.current) {
      editor.commands.setContent(data.body);
      setSubject(data.subject);
      setSentData(true);
      hasSetAIContent.current = true;
      submitCreateDraft(data.subject);
    }
  };

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
    } finally {
      setAiTyping(false);
    }
  };

  if (!editor) {
    return (
      <div className="min-h-[40rem] w-full p-4 bg-gray-50 rounded-md">
        <Skeleton className="w-full h-20 mb-3 rounded-md bg-gray-200" />
        <Skeleton className="w-full h-64 rounded-md bg-gray-200" />
      </div>
    );
  }

  const toggleItemClasses = (isActive) =>
    `p-1.5 data-[state=on]:bg-gray-200 data-[state=on]:text-gray-800 hover:bg-gray-100 text-gray-600 rounded-sm transition-colors`;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 font-main w-full">
        <div className="w-full">
          <Input
            id="subject"
            className="w-full my-2 h-8 px-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-[#9B9A97] focus:border-blue-500 focus:ring-0"
            placeholder={`e.g. Research Inquiry: Professor ${professor_name} - Your Name`}
            value={subject}
            onChange={(e) => handleUpdateSubject(e.target.value)}
          />
          <div className="p-1.5 bg-gray-50 border justify-between border-gray-200 rounded-t-md flex flex-wrap items-center gap-1">
            <div className="flex items-center flex-wrap">
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
              <ToggleGroup type="multiple" className="flex items-center gap-1">
                <ToggleGroupItem
                  value="bulletList"
                  aria-label="Toggle bullet list"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={toggleItemClasses(editor.isActive("bulletList"))}
                >
                  <List className="h-4 w-4" />
                </ToggleGroupItem>

                <ToggleGroupItem
                  value="splitListItem"
                  aria-label="Split list item"
                  onClick={() =>
                    editor.chain().focus().splitListItem("listItem").run()
                  }
                  disabled={!editor.can().splitListItem("listItem")}
                  className={toggleItemClasses(false)} // Not toggleable
                >
                  <ListStart className="h-4 w-4" />
                </ToggleGroupItem>

                <ToggleGroupItem
                  value="liftListItem"
                  aria-label="Lift list item"
                  onClick={() =>
                    editor.chain().focus().liftListItem("listItem").run()
                  }
                  disabled={!editor.can().liftListItem("listItem")}
                  className={toggleItemClasses(false)}
                >
                  <ListEnd className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>

              <Popover className="max-w-[5rem]">
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`${toggleItemClasses(
                      false
                    )} flex items-center rounded-md h-[2rem] font-medium text-xs`}
                  >
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span> AI Revise</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-white shadow-lg border border-gray-200 rounded-md p-2 w-64 z-50 space-y-1">
                  <button
                    onClick={() => handleAIRewrite(prompts[0])}
                    className="w-full text-left text-xs p-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
                    disabled={
                      aiTyping || !editor.state.selection.content().size
                    }
                  >
                    <CheckSquare className="h-4 w-4 text-blue-500" /> Fix
                    Grammar
                  </button>
                  <button
                    onClick={() => handleAIRewrite(prompts[1])}
                    className="w-full text-left text-xs p-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
                    disabled={
                      aiTyping || !editor.state.selection.content().size
                    }
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
                    disabled={
                      aiTyping || !editor.state.selection.content().size
                    }
                  >
                    <Wand2 className="h-4 w-4 text-indigo-500" /> Personalise
                  </button>
                </PopoverContent>
              </Popover>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className={`${toggleItemClasses(
                      false
                    )} flex items-center rounded-md h-[2rem] font-medium text-xs`}
                  >
                    <Microscope className="h-4 w-4 text-pink-500" />{" "}
                    Publications
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-white shadow-lg border border-gray-200 rounded-md p-0 max-w-[20rem] w-[95vw] sm:w-[32rem] z-50">
                  <SheetTitle></SheetTitle>
                  <SheetDescription>
                    <Suspense fallback={<PopoverLoading />}>
                      <Publications />
                    </Suspense>
                  </SheetDescription>
                </SheetContent>
              </Sheet>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`${toggleItemClasses(
                      false
                    )} flex items-center rounded-md h-[2rem] font-medium text-xs`}
                  >
                    <Calendar className="h-4 w-4 text-green-500" /> Availability
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-white shadow-lg font-main border border-gray-200 rounded-md p-0 w-[30rem] z-50">
                  <Suspense fallback={<PopoverLoading />}>
                    <h1>Find Availability</h1>
                    <GoogleCalendar userId = {student_id}/>
                  </Suspense>
                </PopoverContent>
              </Popover>
            </div>
            <div className="px-4">
              {isSaving ? (
                <div className="font-main text-xs flex items-center gap-1">
                  <RefreshCcw className="h-4 w-4 text-green-500" />
                  <span>Saving Draft...</span>
                </div>
              ) : (
                <div className="font-main text-xs flex items-center gap-1">
                  <Cloud className="h-5 w-5 fill-blue-500 text-gray-50" />
                  <span>Saved to Cloud!</span>
                </div>
              )}
            </div>
          </div>

          <div className="max-w-full border-1">
            {sentData ? (
              <EditorContent editor={editor} />
            ) : (
              <Template
                onUpdate={handleSetPublications}
                sendEmail={handleSetEmail}
                student_data={student_id}
                professor_id={professor_id}
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
        <SendEmail
          eventName={`Follow Up With ${professor_name}`}
          description={`Send a follow-up email to Professor ${professor_name} regarding your research interest and initial outreach.`}
          student_id={student_id}
          professor_id={professor_id}
        />
      </div>
    </>
  );
}
