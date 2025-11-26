import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import DOMPurify from "dompurify";

export function EmailBodyViewer({ html, text }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Link.configure({
        openOnClick: true,
      }),
    ],
    editable: false, 
    content: "",
  });

  useEffect(() => {
    if (!editor) return;

    if (html) {
      const safeHtml = DOMPurify.sanitize(html);
      editor.commands.setContent(safeHtml);
    } else if (text) {
      // simple safe text → paragraphs
      const safeTextHtml = DOMPurify.sanitize(
        text
          .split("\n")
          .map((line) => `<p>${line}</p>`)
          .join("")
      );
      editor.commands.setContent(safeTextHtml);
    } else {
      editor.commands.clearContent();
    }
  }, [editor, html, text]);

  if (!editor) return null;

  return (
    <EditorContent
      editor={editor}
      className="prose prose-sm max-w-none text-xs text-neutral-800"
    />
  );
}
