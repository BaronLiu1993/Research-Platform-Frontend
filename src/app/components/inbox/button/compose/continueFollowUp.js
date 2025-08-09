"use client";

import { Button } from "@/shadcomponents/ui/button";
import { ArrowRight } from "lucide-react";

export default function ContinueFollowUp() {
  return (
    <>
      <Button
        className="rounded-sm bg-[#FAEBDD] text-[#CB912F] cursor-pointer hover:bg-[#F5D7B5]"
      >
        <ArrowRight />
        Continue Follow Up

      </Button>
    </>
  );
}
