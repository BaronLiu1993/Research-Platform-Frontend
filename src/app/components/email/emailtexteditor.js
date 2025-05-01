
import { 
    ToggleGroup,
    ToggleGroupItem,

} from "@/shadcomponents/ui/toggle-group";
import { useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import { Bold, Italic, Underline } from "lucide-react";

export default function EmailTextEditor({ content }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({ multicolor: true })
    ],
    content, 
    editorProps: {
      attributes: {
        class: "min-h-[10rem] font-light text-sm py-2 px-3 font-sans",
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
          <ToggleGroup type = "multiple" className = "bg-gray-300">
            <ToggleGroupItem
              value = "bold"
              aria-label="Toggle bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              <Bold />
            </ToggleGroupItem>
            <ToggleGroupItem
              value = "italic"
              aria-label="Toggle italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              <Italic />
            </ToggleGroupItem>
            <ToggleGroupItem
              value = "underline"
              aria-label="Toggle underline"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              <Underline />
            </ToggleGroupItem>
          </ToggleGroup>
        </BubbleMenu>
      </div>

      <EditorContent editor={editor} />
    </>
  );
}
