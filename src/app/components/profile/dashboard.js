"use client";

import { getFile } from "@/app/api/storage/getFile";
import { uploadFile } from "@/app/api/storage/uploadFile";
import { Button } from "@/shadcomponents/ui/button";
import { LeafyGreen, Newspaper } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Dashboard({ access, fileExists }) {
  const [resume, setResume] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [resumeStatus, setResumeStatus] = useState(
    fileExists?.resumeExists ? "Uploaded" : "Not Uploaded"
  );
  const [transcriptStatus, setTranscriptStatus] = useState(
    fileExists?.transcriptExists ? "Uploaded" : "Not Uploaded"
  );

  const handleUploadResume = async () => {
    if (!resume) return;

    try {
      await uploadFile({
        file: resume,
        fileType: "resume",
        fileName: resume.name,
        access,
      });
      setResumeStatus("Uploaded");
    } catch {
      toast.error("Failed to upload resume");
    }
  };

  const handleUploadTranscript = async () => {
    if (!transcript) return;

    try {
      await uploadFile({
        file: transcript,
        fileType: "transcript",
        fileName: transcript.name,
        access,
      });
      setTranscriptStatus("Uploaded");
    } catch {
      toast.error("Failed to upload transcript");
    }
  };

  const handleSubmission = async () => {
    if (!resume && !transcript) {
      toast.error("Change something first.");
      return;
    }

    setIsSubmitting(true);
    try {
      const promises = [];

      if (resume) promises.push(handleUploadResume());
      if (transcript) promises.push(handleUploadTranscript());

      await Promise.all(promises);
      toast.success("Saved changes");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetFile = async ({ access, fileName, fileType }) => {
    try {
      const urlRes = await getFile({ access, fileName, fileType });
      console.log(urlRes)
      if (urlRes) {
        window.open(urlRes.urlData.url.signedUrl, "_blank", "noopener,noreferrer");
      } else {
        toast.error("No file URL returned");
      }
    } catch (err) {
      toast.error("Failed To Retrieve");
    }
  };
  

  const resumeStatusClasses =
    resumeStatus === "Uploaded"
      ? "bg-[#E6F4EA] text-[#1E8E3E]"
      : resumeStatus === "New file"
        ? "bg-[#E8F0FE] text-[#1A73E8]"
        : "bg-[#FDEBEC] text-[#D44C47]";

  const transcriptStatusClasses =
    transcriptStatus === "Uploaded"
      ? "bg-[#E6F4EA] text-[#1E8E3E]"
      : transcriptStatus === "New file"
        ? "bg-[#E8F0FE] text-[#1A73E8]"
        : "bg-[#FDEBEC] text-[#D44C47]";

  return (
    <div className="flex flex-col gap-4 m-10 w-fit">
      <div className="flex font-main gap-4">
        <div className="relative w-[10rem] h-[11rem]">
          <input
            id="resume-upload"
            type="file"
            accept=".pdf"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setResume(file);
              if (file) {
                setResumeStatus("New file");
              } else if (!file && !fileExists?.resumeExists) {
                setResumeStatus("Not Uploaded");
              }
            }}
          />

          <label
            htmlFor="resume-upload"
            className="cursor-pointer rounded-sm hover:bg-gray-50 border-[1px] w-[10rem] h-[11rem] inline-block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="bg-gray-100 w-full h-[6rem]" />
            <div>
              <div className="flex items-center p-2 gap-2">
                <Newspaper className="fill-blue-800 text-white h-4 w-4" />
                <span className="font-main text-[13px] font-medium">
                  Resume
                </span>
              </div>
              <div
                className={`mx-2 w-fit rounded-xs p-1 text-[11px] font-main font-medium ${resumeStatusClasses}`}
              >
                <span>{resumeStatus}</span>
              </div>
            </div>
          </label>
          <button
            type="button"
            className="absolute top-1 right-1 rounded-md font-medium cursor-pointer bg-white/90 border px-1.5 py-0.5 text-[12px] font-main hover:bg-gray-50"
            onClick={async (e) => {
              e.stopPropagation();
              await handleGetFile({
                access,
                fileType: "resume",
                fileName: fileExists.resumeName,
              });
            }}
          >
            Preview
          </button>
        </div>

        <div className="relative w-[10rem] h-[11rem]">
          <input
            id="transcript-upload"
            type="file"
            accept=".pdf"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setTranscript(file);
              if (file) {
                setTranscriptStatus("New file");
              } else if (!file && !fileExists?.transcriptExists) {
                setTranscriptStatus("Not Uploaded");
              }
            }}
          />

          <label
            htmlFor="transcript-upload"
            className="cursor-pointer rounded-sm hover:bg-gray-50 border-[1px] w-full h-full inline-block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="bg-gray-100 w-full h-[6rem]" />
            <div>
              <div className="flex items-center p-2 gap-2">
                <LeafyGreen className="fill-blue-800 text-white h-4 w-4" />
                <span className="font-main text-[13px] font-medium">
                  Transcript
                </span>
              </div>
              <div
                className={`mx-2 w-fit rounded-xs p-1 text-[11px] font-main font-medium ${transcriptStatusClasses}`}
              >
                <span>{transcriptStatus}</span>
              </div>
            </div>
          </label>

          <button
            type="button"
            className="absolute top-1 right-1 rounded-md font-medium cursor-pointer bg-white/90 border px-1.5 py-0.5 text-[12px] font-main hover:bg-gray-50"
            onClick={async (e) => {
              e.stopPropagation();
              await handleGetFile({
                access,
                fileType: "transcript",
                fileName: fileExists.transcriptName,
              });
            }}
          >
            Preview
          </button>
        </div>
      </div>

      <div>
        <Button
          onClick={handleSubmission}
          className="text-xs cursor-pointer font-medium text-white px-2 py-1 rounded-sm bg-none transition-colors bg-[#4584F3] hover:bg-[#3574E2]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Uploading..." : "Update"}
        </Button>
      </div>
    </div>
  );
}
