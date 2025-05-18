"use client";

import React, { useEffect, useMemo } from "react";
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
        content: [{ type: "text", text: JSON.stringify(contact, null, 2) }],
      },
    ],
  }), [contact]);

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) return null;
  return <EditorContent editor={editor} />;
}
