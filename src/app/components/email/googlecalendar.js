"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Switch } from "@/shadcomponents/ui/switch";
import { Label } from "@/shadcomponents/ui/label";

export default function GoogleCaledar() {
  return (
    <div className="w-fit border font-san bg-white rounded-md shadow-none p-4 flex flex-col justify-start items-start space-y-2">
      <div className="text-sm flex justify-start items-start font-sans">
        <div>
          <h1 className="font-semibold">Google Calendar Sync</h1>
          <h2 className="text-xs font-light">
            Automatically Schedule to Send Emails Later and Find the Next
            Available Time In Your Calendar. Remember to Import your
            ICS Calendar File From Canvas
          </h2>
        </div>
        <div className="flex space-x-2">
          <Switch id="airplane-mode" />
        </div>
      </div>
    </div>
  );
}
