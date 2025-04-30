import { useEffect, useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import {
  IconBold,
  IconItalic,
  IconStrike,
  IconCircle,
  IconSquare,
  IconTextHeight,
} from "@tabler/icons-react";

export default function EmploymentWordProcessor({ content }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({ multicolor: true })
    ],
    content, 
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 font-sans",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content); 
    }
  }, [content, editor]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <>
      <div>
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bg-gray-50 border-1 flex items-center space-x-2 p-2 rounded-md">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              Strike
            </button>
            <button
              onClick={() => editor.chain().focus().setTextColor('red').run()}
              className={editor.isActive('textStyle') ? 'is-active' : ''}
            >
              Red BG
            </button>
            <button
              onClick={() => editor.chain().focus().setTextColor('green').run()}
              className={editor.isActive('textStyle') ? 'is-active' : ''}
            >
              Green BG
            </button>
            <button
              onClick={() => editor.chain().focus().setTextColor('blue').run()}
              className={editor.isActive('textStyle') ? 'is-active' : ''}
            >
              Blue BG
            </button>
          </div>
        </BubbleMenu>
      </div>

      <EditorContent editor={editor} />
    </>
  );
}
