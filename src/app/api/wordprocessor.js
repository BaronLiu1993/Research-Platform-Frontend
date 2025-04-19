import { useEffect, useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  IconBold,
  IconItalic,
  IconStrike,
} from "@tabler/icons-react";

export default function WordProcessor({ content }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content, 
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 font-sans"
      },
    },
  });

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
          </div>
        </BubbleMenu>
      </div>

      <EditorContent editor={editor} />
    </>
  );
}
