"use client";

import { useState } from "react";

import {
  ArrowUp,
  Wand2,
} from "lucide-react";
import { BuildSnippet } from "@/app/actions/aiSnippet";
import { Separator } from "@/shadcomponents/ui/separator";

import { usePointStore } from "@/app/store/usePointStore";
import { useSelectedVariablesStore } from "@/app/store/useSelectedRowsStore";

export default function AIPopover({ onSnippetGenerated, userId }) {
  const [prompt, setPrompt] = useState("")
  const handleSnippet = async (userId, style, resumePoints) => {
    const response = await BuildSnippet(userId, style, resumePoints);
    onSnippetGenerated(response);
  };
  const resumePoints = usePointStore((state) => state.loadedResumePoints);
  const selectedVariables = useSelectedVariablesStore(
    (state) => state.selectedVariables
  );
  return (
    <>
      <div>
        <div className="flex items-center gap-2">
          <Wand2 className="text-[#787774] h-5 w-5" />
          <input
            className="font-main text-xs p-2 border-1 my-2 rounded-xs w-full"
            placeholder="Build Snippets with AI"
          />
          <button
            onClick={() => handleSnippet(userId, prompt, resumePoints)}
            onChange={(e) => setPrompt(e.target.value)}
            className="cursor-pointer"
          >
            <ArrowUp className="bg-[#787774] h-5 w-5 p-1 text-white rounded-full" />
          </button>
        </div>
        <div className="flex flex-col gap-2 pt-5">
          <div className="text-xs flex items-centerfont-medium px-2 text-[#787774] gap-2">
            Hi 👋! What kind of email are we building today?
          </div>
          <Separator className="my-2" />
        </div>
      </div>
    </>
  );
}
