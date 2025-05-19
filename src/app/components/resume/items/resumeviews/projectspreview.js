"use client";

import React, { useEffect, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function ProjectsPreview({ projects }) {
  const content = useMemo(() => {
    const doc = { type: "doc", content: [] };

    if (projects?.length) {
      doc.content.push({
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "PROJECTS" }],
      });

      doc.content.push({ type: "horizontalRule" });

      projects.forEach((p) => {
        const projectName = p.project_name || p.name || "Untitled Project";
        doc.content.push({
          type: "paragraph",
          content: [
            {
              type: "text",
              text: projectName,
              marks: [{ type: "bold" }],
            },
          ],
        });

        if (p.achievements) {
          doc.content.push({
            type: "paragraph",
            content: [{ type: "text", text: p.achievements }],
          });
        }

        // Bullet list (from bullets or description)
        const bullets = p.bullets?.length ? p.bullets : p.description;
        if (Array.isArray(bullets) && bullets.length) {
          doc.content.push({
            type: "bulletList",
            content: bullets
              .filter((b) => b?.trim?.())
              .map((b) => ({
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: b }],
                  },
                ],
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
