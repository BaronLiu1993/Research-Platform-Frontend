"use client";

import React, { useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function ContactPreview({ contact }) {
  const content = useMemo(() => ({
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "CONTACT" }],
      },
      { type: "horizontalRule" },
      {
        type: "paragraph",
        content: [
          { type: "text", text: contact.email },
          { type: "text", text: " | " },
          { type: "text", text: contact.phone },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: contact.linkedin },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: contact.github },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: contact.website },
        ],
      },
    ],
  }), [contact]);

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
    editorProps: {
      attributes: {
        class: "font-sans text-sm leading-relaxed",
      },
    },
  });

  if (!editor) return null;
  return <EditorContent editor={editor} />;
}
