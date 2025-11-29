import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from "@tiptap/extension-hard-break";
import DOMPurify from "dompurify";

export function EmailBodyViewer({ html, text }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        hardBreak: false,
        heading: { levels: [1, 2, 3] },
        blockquote: true,
        code: true,
      }),
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => this.editor.commands.setHardBreak(),
            "Mod-Enter": () => this.editor.commands.splitBlock(),
          };
        },
      }),
    ],
    editable: false,
    editorProps: {
      attributes: {
        class: [
          "w-full min-h-[300px] p-3",
          "text-[13px] leading-[1.35] font-sans text-[#202124]",
          "outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-200",
          "[&p]:m-0",
          "[&p+p]:mt-1",
          "[&p]:leading-[1.35]",
          "[&h1]:m-0 [&h1]:text-[15px] [&h1]:leading-[1.3] [&h1+p]:mt-1",
          "[&h2]:m-0 [&h2]:text-[14px] [&h2]:leading-[1.3] [&h2+p]:mt-1",
          "[&h3]:m-0 [&h3]:text-[13px] [&h3]:leading-[1.3] [&h3+p]:mt-1",
          "[&ul]:m-0 [&ol]:m-0 [&ul]:pl-4 [&ol]:pl-4",
          "[&li]:my-0 [&li>p]:m-0",
          "[&li+li]:mt-1",
          "[&blockquote]:m-0 [&blockquote]:pl-3 [&blockquote]:border-l [&blockquote]:border-slate-200 [&blockquote+p]:mt-1",
          "[&code]:text-[12px] [&code]:bg-slate-100 [&code]:px-1 [&code]:py-0.5 [&code]:rounded",
          "[&img]:my-1 [&table]:my-1",
        ].join(" "),
      },
    },
    content: "",
  });

  useEffect(() => {
    if (!editor) return;

    if (html) {
      const safeHtml = DOMPurify.sanitize(html);
      editor.commands.setContent(safeHtml);
    } else if (text) {
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
