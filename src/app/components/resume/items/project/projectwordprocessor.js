'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Highlight from '@tiptap/extension-highlight';

import { ToggleGroup, ToggleGroupItem } from '@/shadcomponents/ui/toggle-group';
import { Skeleton } from '@/shadcomponents/ui/skeleton';
import { Bold, Italic, Underline, List, CheckSquare } from 'lucide-react';

export default function ProjectWordProcessor({ value, onChange }) {
  const [aiTyping, setAiTyping] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        listItem: false,
      }),
      BulletList,
      ListItem,
      TaskList,
      TaskItem,
      Highlight.configure({ multicolor: true }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class:
          'font-sans font-light text-sm leading-snug max-h-[156px] overflow-y-auto whitespace-pre-line p-2',
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value]);

  const handleAIRewrite = async () => {
    const selection = editor?.state.selection;
    const selectedText = editor?.state.doc.textBetween(
      selection.from,
      selection.to
    );
    if (!selectedText) return;

    setAiTyping(true);

    const response = await fetch('http://localhost:8000/ai-edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: selectedText,
        style: 'Rewrite this text clearly and concisely in bullet-point format.',
      }),
    });

    const data = await response.json();
    const aiText = data.result || selectedText;

    editor
      ?.chain()
      .focus()
      .deleteRange({ from: selection.from, to: selection.to })
      .insertContentAt(selection.from, aiText)
      .run();

    setAiTyping(false);
  };

  if (!editor) {
    return (
      <div className="min-h-[156px] min-w-full p-4">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="font-sans">
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <ToggleGroup type="multiple" className="bg-gray-200 rounded-md p-1">
          <ToggleGroupItem
            value="ai"
            aria-label="AI Rewrite"
            onClick={handleAIRewrite}
            className="py-1 px-2 text-xs bg-green-100 hover:bg-green-200 rounded"
          >
            ✨ AI Rewrite
          </ToggleGroupItem>
          <ToggleGroupItem
            value="bold"
            aria-label="Toggle bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`py-1 px-2 text-xs ${
              editor.isActive('bold')
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            <Bold size={14} />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            aria-label="Toggle italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`py-1 px-2 text-xs ${
              editor.isActive('italic')
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            <Italic size={14} />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="underline"
            aria-label="Toggle underline"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`py-1 px-2 text-xs ${
              editor.isActive('strike')
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            <Underline size={14} />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="bulletList"
            aria-label="Toggle bullet list"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`py-1 px-2 text-xs ${
              editor.isActive('bulletList')
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            <List size={14} />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="taskList"
            aria-label="Toggle task list"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={`py-1 px-2 text-xs ${
              editor.isActive('taskList')
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            <CheckSquare size={14} />
          </ToggleGroupItem>
        </ToggleGroup>
      </BubbleMenu>

      <EditorContent
        className="border rounded-md mt-2 font-sans font-light text-sm leading-snug max-h-[156px] overflow-y-auto"
        editor={editor}
      />

      {aiTyping && (
        <div className="text-sm text-gray-500 mt-2 flex items-center gap-1">
          AI is typing
          <span className="animate-bounce">.</span>
          <span className="animate-bounce [animation-delay:.2s]">.</span>
          <span className="animate-bounce [animation-delay:.4s]">.</span>
        </div>
      )}
    </div>
  );
}
