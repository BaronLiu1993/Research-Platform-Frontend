"use client";

import React, { useEffect, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function ProjectsPreview({ projects }) {
    const content = useMemo(() => {
    const doc = { type: "doc", content: [] };
    if (projects.length) {
      doc.content.push({ type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "PROJECTS" }] });
      doc.content.push({ type: "horizontalRule" });
      projects.forEach((p) => {
        doc.content.push({
          type: "paragraph",
          content: [{ type: "text", text: p.name }],
          marks: [{ type: "bold" }],
        });
        if (p.link) {
          doc.content.push({
            type: "paragraph",
            attrs: { class: "project-link" },
            content: [{ type: "text", text: p.link }],
          });
        }
        if (p.description?.length) {
          doc.content.push({
            type: "bulletList",
            content: p.description.map((pt) => ({
              type: "listItem",
              content: [{ type: "paragraph", content: [{ type: "text", text: pt }] }],
            })),
          });
        }
      });
    }
    return doc;
  }, [projects]);

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && JSON.stringify(editor.getJSON()) !== JSON.stringify(content)) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  if (!editor) return null;
  return <EditorContent editor={editor} />;
}
