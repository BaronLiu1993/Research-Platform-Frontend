import { useEffect, useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  IconBold,
  IconCode,
  IconItalic,
  IconStrikethrough,
  IconUnderline,
} from "@tabler/icons-react";



export default function wordprocessor () {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 font-sans"
      },
    },
  })



  return (
    <>  
    
    <div>
      {editor && <BubbleMenu editor = {editor} tippyOptions = {{ duration: 100 }}>
        <div className = " bg-gray-50 border-1">
          <button
            onClick = {() => editor.chain().focus().toggleBold().run()}
            className = {editor.isActive('bold') ? 'is-active' : ''}
          >
            <IconBold className="flex w-fit rounded-[2px] dark:border-gray-700 dark:text-gray-500"
            />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
              <IconItalic className="flex w-fit rounded-[2px] dark:border-gray-700 dark:text-gray-500"/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            Strike
          </button>
          
          
        </div>
      </BubbleMenu>
      
      }
    </div>
    <EditorContent editor={editor} />      
    </>
  )
}

