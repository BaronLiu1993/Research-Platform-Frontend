"use client";


import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { convertExperienceToTiptapJSON } from "./utils/convertExperienceToTiptap";

import { Button } from "@/shadcomponents/ui/button";
import { Bold, Italic } from "lucide-react";
import { ExperienceBlock } from "./custom-tiptap/experienceblock";

export default function EditorInteractive({
  student_experience,
  student_projects,
  student_contact,
  student_personal_information,
}) {
  const initialExperienceContent =
    convertExperienceToTiptapJSON(student_experience);
 
  console.log(initialExperienceContent)
  

  const editor = useEditor({
    extensions: [StarterKit, ExperienceBlock, SlashCommand],
    content: initialExperienceContent,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      console.log("Editor content updated:", json);
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert min-w-full focus:outline-none border p-4 rounded-xs",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex border-1">
      <div className="w-full overflow-hidden">
        <div className="w-full flex-shrink-0 px-4 font-sans">
          {editor && (
            <BubbleMenu
              className="flex bg-neutral-800 p-1 rounded-md shadow-lg space-x-1"
              tippyOptions={{ duration: 100 }}
              editor={editor}
            >
              <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`p-1 rounded ${
                  editor.isActive("bold") ? "bg-blue-600" : "bg-neutral-700"
                } text-white hover:bg-neutral-600`}
                size="icon"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`p-1 rounded ${
                  editor.isActive("italic") ? "bg-blue-600" : "bg-neutral-700"
                } text-white hover:bg-neutral-600`}
                size="icon"
              >
                <Italic className="h-4 w-4" />
              </Button>
            </BubbleMenu>
          )}
          <EditorContent className = "font-main" editor={editor} />
        </div>
      </div>
    </div>
  );
}
