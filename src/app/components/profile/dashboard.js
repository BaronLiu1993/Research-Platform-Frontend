"use client";

import { getFile } from "@/app/api/storage/getFile";
import { uploadFile } from "@/app/api/storage/uploadFile";
import { Button } from "@/shadcomponents/ui/button";
import { AlertCircle, Leaf, Newspaper } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import DropdownInterests from "../dropdowns/dropdowninterests";
import DropdownMajor from "../dropdowns/dropdownmajor";
import DropdownYear from "../dropdowns/dropdownyear";

export default function Dashboard({ access, fileExists, profileData }) {
  const fullProfile = profileData.profile;
  const [resume, setResume] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [attempted, setAttempted] = useState(false);

  const [formData, setFormData] = useState({
    student_major: fullProfile.student_major ?? "",
    student_year: fullProfile.student_year ?? "",
    student_interests: fullProfile.student_interests ?? [],
  });

  const [errors, setErrors] = useState({});

  const [resumeStatus, setResumeStatus] = useState(
    fileExists?.resumeExists ? "Uploaded" : "Not Uploaded"
  );
  const [transcriptStatus, setTranscriptStatus] = useState(
    fileExists?.transcriptExists ? "Uploaded" : "Not Uploaded"
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.student_year) {
      newErrors.student_year = "Select your year of study.";
    }
    if (!formData.student_major) {
      newErrors.student_major = "Select your major.";
    }
    if (
      !formData.student_interests ||
      formData.student_interests.length === 0
    ) {
      newErrors.student_interests = "Choose at least one research interest.";
    } else if (formData.student_interests.length > 3) {
      newErrors.student_interests = "Maximum 3 research interests.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    } catch (error) {
      toast.error("Failed to upload resume");
      throw error;
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
    } catch (error) {
      toast.error("Failed to upload transcript");
      throw error;
    }
  };

  const handleSubmission = async (e) => {
    e?.preventDefault();
    setAttempted(true);
    setSubmitError("");

    const isValid = validateForm();
    if (!isValid) {
      toast.error("Please fix the errors above.");
      return;
    }

    const payload = {
      student_year: formData.student_year,
      student_major: formData.student_major,
      student_interests: formData.student_interests,
    };

    setIsSubmitting(true);
    try {
      const promises = [];

      /**
       * const profilePromise = fetch(`${API_BASE}/auth/update-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(payload),
      }).then(async (res) => {
        if (!res.ok) {
          let msg = "Update failed.";
          try {
            const data = await res.json();
            if (data?.message) msg = data.message;
          } catch {
            // telemetry
          }
          throw new Error(msg);
        }
      });
             promises.push(profilePromise);

       */

      if (resume) promises.push(handleUploadResume());
      if (transcript) promises.push(handleUploadTranscript());

      await Promise.all(promises);
      toast.success("Saved changes.");
    } catch (err) {
      const msg = err?.message || "Internal server error. Please try again.";
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetFile = async ({ access, fileName, fileType }) => {
    if (!fileName) {
      toast.error(`No ${fileType} on file to preview.`);
      return;
    }

    try {
      const urlRes = await getFile({ access, fileName, fileType });
      if (urlRes?.urlData?.url?.signedUrl) {
        window.open(
          urlRes.urlData.url.signedUrl,
          "_blank",
          "noopener,noreferrer"
        );
      } else {
        toast.error("No file URL returned");
      }
    } catch (err) {
      toast.error("Failed to retrieve file.");
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

  const handleAddInterests = (val) => {
    if (val.length > 3) {
      setSubmitError("Maximum Research Interests Reached!");
      setErrors((prev) => ({
        ...prev,
        student_interests: "Maximum 3 research interests.",
      }));
      return;
    }
    setSubmitError("");
    setErrors((prev) => ({ ...prev, student_interests: undefined }));
    setFormData((p) => ({ ...p, student_interests: val }));
  };

  return (
    <form
      onSubmit={handleSubmission}
      className="flex flex-col gap-4 mx-6 w-fit"
    >
      <div className="flex flex-col gap-5">
        <FieldGroup
          label="Year of study"
          error={attempted ? errors.student_year : undefined}
        >
          <DropdownYear
            name="student_year"
            value={formData.student_year}
            onChange={(val) =>
              setFormData((p) => ({ ...p, student_year: val }))
            }
          />
        </FieldGroup>

        <FieldGroup
          label="Major"
          error={attempted ? errors.student_major : undefined}
        >
          <DropdownMajor
            name="student_major"
            value={formData.student_major}
            onChange={(val) =>
              setFormData((p) => ({ ...p, student_major: val }))
            }
          />
        </FieldGroup>

        <FieldGroup
          label="Research interests"
          hint="Choose at most 3 topics."
          error={attempted ? errors.student_interests : undefined}
        >
          <div className="w-[20rem] sm:w-[24rem]">
            <DropdownInterests
              name="student_interests"
              value={formData.student_interests}
              onChange={handleAddInterests}
            />
          </div>
        </FieldGroup>
      </div>

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
                fileName: fileExists?.resumeName,
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
                <Leaf className="fill-blue-800 text-white h-4 w-4" />
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
                fileName: fileExists?.transcriptName,
              });
            }}
          >
            Preview
          </button>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          onClick={handleSubmission}
          className="text-xs cursor-pointer font-medium text-white px-2 py-1 rounded-sm bg-none transition-colors bg-[#4584F3] hover:bg-[#3574E2]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Update"}
        </Button>
        {submitError && (
          <p className="mt-2 text-xs text-red-500 font-main">{submitError}</p>
        )}
      </div>
    </form>
  );
}

function FieldGroup({ label, hint, error, children }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-800">{label}</label>
        {hint ? <span className="text-xs text-gray-500">{hint}</span> : null}
      </div>
      <div className="rounded-md">{children}</div>
      {error ? (
        <div className="flex items-center gap-1 text-red-500 text-xs">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  );
}
