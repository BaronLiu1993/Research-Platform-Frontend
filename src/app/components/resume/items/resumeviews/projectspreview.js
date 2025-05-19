"use client";

import React, { useEffect, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function ProjectsPreview({ projects }) {
  console.log(projects);
  
  const content = useMemo(() => {
    const doc = { type: "doc", content: [] };
    
    if (projects.length) {
      doc.content.push({
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "PROJECTS" }]
      });
      
      doc.content.push({ type: "horizontalRule" });
      
      projects.forEach((p) => {
        const projectName = p.project_name || p.name || "Untitled Project";
        
        doc.content.push({
          type: "paragraph",
          content: [{ type: "text", text: projectName, marks: [{ type: "bold" }] }],
        });
        
        if (p.achievements) {
          doc.content.push({
            type: "paragraph",
            attrs: { class: "project-achievements" },
            content: [{ type: "text", text: p.achievements }],
          });
        }
        
        if (p.bullets?.length || p.description?.length) {
          const bullets = p.bullets || p.description || [];
          doc.content.push({
            type: "bulletList",
            content: bullets
              .filter(bullet => bullet.trim()) 
              .map((pt) => ({
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