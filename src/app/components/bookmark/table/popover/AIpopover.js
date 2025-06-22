"use client";

import { useState } from "react";

import { Badge } from "@/shadcomponents/ui/badge";
import {
  ArrowDownWideNarrow,
  ArrowUp,
  Code,
  Heart,
  Settings,
  Wand2,
} from "lucide-react";
import { BuildSnippet } from "@/app/actions/aiSnippet";
import { Button } from "@/shadcomponents/ui/button";
import { Separator } from "@/shadcomponents/ui/separator";

import { usePointStore } from "@/app/store/usePointStore";
import { useSelectedVariablesStore } from "@/app/store/useSelectedRowsStore";

export default function AIPopover({ onSnippetGenerated, userId }) {
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
          <button className="cursor-pointer">
            <ArrowUp className="bg-[#787774] h-5 w-5 p-1 text-white rounded-full" />
          </button>
        </div>
        <div className="flex flex-col gap-2 pt-5">
          <div className="text-xs flex items-centerfont-medium px-2 text-[#787774] gap-2">
            Hi 👋! What email are we building today?
            <Badge className="rounded-xs text-[#448361] bg-[#EDF3EC]">
              <div className="rounded-full bg-[#448361] h-2 w-2"></div>
              Student Context
            </Badge>
          </div>
          <Separator className="my-2" />
          <div className="space-x-2">
            <Button
              onClick={() =>
                handleSnippet(userId, "Engineering Student", resumePoints)
              }
              className="cursor-pointer text-xs rounded-xs text-[#337EA9] bg-[#E7F3F8] hover:bg-[#E7F3F8] h-[1.3rem]"
            >
              <Settings />
              Engineering Snippet
            </Button>
            <Button
              onClick={() =>
                handleSnippet(userId, "Computer Science", resumePoints)
              }
              className="cursor-pointer text-xs rounded-xs text-[#337EA9] bg-[#E7F3F8] hover:bg-[#E7F3F8] h-[1.3rem]"
            >
              <Code />
              Computer Science Snippet
            </Button>
            <Button
              onClick={() => handleSnippet(userId, "Medicine", resumePoints)}
              className="cursor-pointer text-xs rounded-xs text-[#CB912F] bg-[#FBF3DB] hover:bg-[#FBF3DB] h-[1.3rem]"
            >
              <Heart />
              Medicine Snippet
            </Button>
            <Button
              onClick={() =>
                handleSnippet(userId, "Health Science Student", resumePoints)
              }
              className="cursor-pointer text-xs rounded-xs text-[#D44C47] bg-[#FDEBEC] hover:bg-[#FDEBEC] h-[1.3rem]"
            >
              <Settings />
              Health Science Snippet
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
