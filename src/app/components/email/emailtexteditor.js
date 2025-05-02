
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
        class: "min-h-[30rem] font-light text-sm py-2 px-3 font-sans",
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
          <ToggleGroup type = "multiple" className = "bg-gray-200">
            <ToggleGroupItem
                value="bold"
                aria-label="Toggle bold"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`py-1 text-xs transition 
                    ${editor.isActive('bold') 
                    ? 'bg-gray-200 text-white ' 
                    : 'bg-gray-200 text-black border-gray-300 hover:bg-gray-100'}`}
                >
                <Bold />
            </ToggleGroupItem>
            <ToggleGroupItem
              value = "italic"
              aria-label="Toggle italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`py-1 text-xs transition 
                    ${editor.isActive('italic') 
                    ? 'bg-gray-200 text-white ' 
                    : 'bg-gray-200 text-black border-gray-300 hover:bg-gray-100'}`}
            >
              <Italic />
            </ToggleGroupItem>
            <ToggleGroupItem
              value = "underline"
              aria-label="Toggle underline"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`py-1 text-xs transition 
                ${editor.isActive('bold') 
                ? 'bg-gray-200 text-white' 
                : 'bg-gray-200 text-black border-gray-300 hover:bg-gray-100'}`}
            >
              <Underline />
            </ToggleGroupItem>
          </ToggleGroup>
        </BubbleMenu>
      </div>

      <EditorContent className ="mt-10" editor={editor} />
    </>
  );
}
