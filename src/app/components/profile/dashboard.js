"use client";

import { Button } from "@/shadcomponents/ui/button";
import { LeafyGreen, Newspaper } from "lucide-react";
import { useState } from "react";

function UploadCard({ id, icon: Icon, title, status, accept, onChange }) {
  return (
    <>
      <input
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={onChange}
      />

      <label
        htmlFor={id}
        className="cursor-pointer rounded-sm border-[1px] w-[10rem] h-[11rem] inline-block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <div className="bg-gray-100 w-full h-[6rem]" />
        <div>
          <div className="flex items-center p-2 gap-2">
            <Icon className="fill-blue-800 text-white h-4 w-4" />
            <span className="font-main text-[13px] font-medium">{title}</span>
          </div>
          <div className="mx-2 w-fit rounded-xs bg-[#FDEBEC] p-1 text-[11px] font-main font-medium text-[#D44C47]">
            <span>{status}</span>
          </div>
        </div>
      </label>
    </>
  );
}

export default function Dashboard() {
  const [resumeStatus, setResumeStatus] = useState("Not Uploaded");
  const [transcriptStatus, setTranscriptStatus] = useState("Not Uploaded");
  const [resume, setResume] = useState(null);
  const [transcript, setTranscript] = useState(null);

  const handleUploadFiles = async () => {};

  return (
    <div className="flex flex-col gap-4 w-fit">
      <div className="flex font-main gap-4">
        <UploadCard
          id="resume-upload"
          icon={Newspaper}
          title="Resume"
          status={resumeStatus}
          accept=".pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setResume(file);
            if (file) setResumeStatus(`Selected!`);
          }}
        />

        <UploadCard
          id="transcript-upload"
          icon={LeafyGreen}
          title="Transcript"
          status={transcriptStatus}
          accept=".pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setTranscript(file);
            if (file) setTranscriptStatus(`Selected!`);
          }}
        />
      </div>
      <div>
        <Button className="text-xs cursor-pointer font-medium text-white px-2 py-1 rounded-sm bg-none transition-colors bg-[#4584F3] hover:bg-[#3574E2]">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
