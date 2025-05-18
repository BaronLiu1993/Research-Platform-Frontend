"use client";

import React, { useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

export function NameHeader({ name, contact }) {
  const content = useMemo(() => ({
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 1, textAlign: "center" },
        content: [{ type: "text", text: name }],
      },
      {
        type: "paragraph",
        attrs: { textAlign: "center", class: "contact-info" },
        content: [
          {
            type: "text",
            text: [
              contact.email,
              contact.phone,
              contact.linkedin && `linkedin: ${contact.linkedin}`,
              contact.github && `github: ${contact.github}`,
              contact.website,
            ]
              .filter(Boolean)
              .join("  |  "),
          },
        ],
      },
    ],
  }), [name, contact]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1] } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) return null;
  return <EditorContent editor={editor} />;
}
