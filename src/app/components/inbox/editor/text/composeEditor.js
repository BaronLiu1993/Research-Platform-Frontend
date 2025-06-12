import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { Button } from "@/shadcomponents/ui/button";
import { Brackets, CurlyBraces, Trash2, Wand, Wand2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcomponents/ui/tooltip";

export default function ComposeEditor() {
  const editor = useEditor({
    extensions: [StarterKit, Highlight.configure({ multicolor: true })],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm prose-base prose-slate max-w-none w-full h-full min-h-[300px] leading-tight focus:outline-none font-main text-black px-6 py-4 bg-white border border-gray-200",
      },
    },
    content: "",
  });
  return (
    <>
      <div>
        <EditorContent editor={editor} />
        <div className = "font-main p-4 flex justify-between items-center">
            <button className = "font-main text-xs rounded-xs text-white font-semibold bg-blue-500 h-[1.7rem] w-[3rem]">
                Send
            </button>
            <div className ="flex gap-2">
                <Tooltip>
                    <TooltipTrigger className = "hover:bg-[#F4EEEE] p-1 rounded-xs cursor-pointer">
                        <Wand2 className = "h-4 w-4"/>
                    </TooltipTrigger>
                    <TooltipContent className = "font-main font-semibold rounded-xs text-[12px] leading-4">
                        Write With AI
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger className = "hover:bg-[#F4EEEE] p-1 rounded-xs cursor-pointer">
                        <CurlyBraces className = "h-4 w-4"/>
                    </TooltipTrigger>
                    <TooltipContent className = "font-main font-semibold rounded-xs text-[12px] leading-4">
                        Integrate
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger className = "hover:bg-red-100 p-1 rounded-xs cursor-pointer">
                        <Trash2 className = "h-4 w-4"/>
                    </TooltipTrigger>
                    <TooltipContent className = "font-main font-semibold rounded-xs text-[12px] leading-4">
                        Delete
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
      </div>
    </>
  );
}
