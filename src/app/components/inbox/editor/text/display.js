"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Display({ emailContent }) {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "max-w-[35.9rem] w-full h-full min-h-[300px] p-1 text-[13px]",
      },
    },
    content: emailContent,
  });

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
}
