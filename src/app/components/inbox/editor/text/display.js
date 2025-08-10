"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Display({ emailContent }) {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "max-w-[35.9rem] w-full h-full min-h-[300px] p-1 text-[13px] " +
          "select-none pointer-events-none filter-blur",
      },
    },
    content: emailContent,
  });

  return (
    <div>
      <EditorContent editor={editor} />
      <style jsx>{`
        .filter-blur {
          filter: blur(4px);
          user-select: none; /* no selection */
          pointer-events: none; /* disables clicking */
        }
      `}</style>
    </div>
  );
}
