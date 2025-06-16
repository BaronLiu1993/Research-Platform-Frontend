"use client"

import { useState } from "react";

import { Badge } from "@/shadcomponents/ui/badge";
import {
  ArrowDownWideNarrow,
  ArrowUp,
  Heart,
  Settings,
  Wand2,
} from "lucide-react";
import { BuildSnippet } from "@/app/actions/aiSnippet";
import { Button } from "@/shadcomponents/ui/button";

export default function AIPopover({ onSnippetGenerated }) {
  const handleSnippet = async (userId) => {
    const response = await BuildSnippet(userId)
    onSnippetGenerated(response)
  }


  return (
    <>
      <div>
        <div className="flex items-center gap-2">
          <Wand2 className="text-[#787774] h-5 w-5" />
          <input
            className="font-main text-xs p-2 border-1 my-2 rounded-xs w-full"
            placeholder="Build Snippets with AI"
          />
          <button className = "cursor-pointer">
            <ArrowUp className="bg-[#787774] h-5 w-5 p-1 text-white rounded-full" />
          </button>
        </div>
        <div className="flex flex-col gap-2 pt-5">
          <h1 className="text-xs font-light px-2 text-[#787774]">
            Hi! What are we building today?
          </h1>
          <div className="space-x-2">
            <Button onClick = {() => handleSnippet("ea2f9981-e2b5-4b26-a4d4-e63572b9a26c")}className="cursor-pointer text-xs rounded-xs text-[#337EA9] bg-[#E7F3F8]">
              <Settings />
              Engineering Snippet
            </Button>
            <Badge className="cursor-pointer text-xs rounded-xs text-[#D44C47] bg-[#FDEBEC]">
              <Heart />
              Medical Snippet
            </Badge>
            <Badge className="cursor-pointer text-xs rounded-xs text-[#CB912F] bg-[#FBF3DB]">
              <ArrowDownWideNarrow />
              Shorten
            </Badge>
            <Badge className="cursor-pointer text-xs rounded-xs text-[#CB912F] bg-[#FBF3DB]">
              <ArrowDownWideNarrow />
              Write Follow Up
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
}
