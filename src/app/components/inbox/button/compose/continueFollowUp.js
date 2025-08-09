"use client";

import { Button } from "@/shadcomponents/ui/button";
import { ArrowRight } from "lucide-react";

export default function ContinueFollowUp() {
  return (
    <>
      <Button
        className="rounded-sm bg-[#EDF3EC] text-[#448361] cursor-pointer hover:bg-[#D6E6D4]"
      >
        <ArrowRight />
        Continue Reply
      </Button>
    </>
  );
}
