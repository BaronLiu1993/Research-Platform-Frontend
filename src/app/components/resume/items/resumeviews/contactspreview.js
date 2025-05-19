"use client";

import React, { useEffect, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function ContactPreview({ contact }) {
  const content = useMemo(() => {
    const doc = { type: "doc", content: [] };

    if (contact) {
      doc.content.push({
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "CONTACT" }],
      });

      doc.content.push({ type: "horizontalRule" });

      const fields = [
        { label: "Email", value: contact.email },
        { label: "Phone", value: contact.phone },
        { label: "Location", value: contact.location },
        { label: "Website", value: contact.website },
        { label: "LinkedIn", value: contact.linkedin },
        { label: "GitHub", value: contact.github },
      ];

      fields.forEach(({ label, value }) => {
        if (value?.trim()) {
          doc.content.push({
            type: "paragraph",
            content: [
              { type: "text", text: `${label}: `, marks: [{ type: "bold" }] },
              { type: "text", text: value },
            ],
          });
        }
      });
    }

    return doc;
  }, [contact]);

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
  });

  useEffect(() => {
    if (editor) {
      const current = JSON.stringify(editor.getJSON());
      const incoming = JSON.stringify(content);
      if (current !== incoming) {
        editor.commands.setContent(content, false);
      }
    }
  }, [content, editor]);

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}
