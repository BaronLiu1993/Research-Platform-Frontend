"use client";

import { getFile } from "@/app/api/storage/getFile";
import { uploadFile } from "@/app/api/storage/uploadFile";
import { Button } from "@/shadcomponents/ui/button";
import {
  AlertCircle,
  File,
  Leaf,
  Newspaper,
  PersonStandingIcon,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import DropdownInterests from "../dropdowns/dropdowninterests";
import DropdownMajor from "../dropdowns/dropdownmajor";
import DropdownYear from "../dropdowns/dropdownyear";
import { DeleteFile } from "@/app/api/storage/deleteFile";

export default function Dashboard({ access, fileExists, profileData }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";

  const fullProfile = profileData.profile;
  const [resume, setResume] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [isSubmittingFile, setIsSubmittingFile] = useState(false);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);

  const [submitError, setSubmitError] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [resumeExists, setResumeExists] = useState(fileExists.resumeExists);
  const [transcriptExists, setTranscriptExists] = useState(
    fileExists.transcriptExists
  );

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

  const handleDeleteResume = async () => {
    try {
      await DeleteFile({
        fileType: "resume",
        fileName: fileExists.resumeName,
        access,
      });
      setResumeExists(false);
      setResumeStatus("Not Uploaded");
      toast.success("Deleted Resume");
    } catch (error) {
      toast.error("Failed to upload resume");
      throw error;
    }
  };

  const handleDeleteTranscript = async () => {
    try {
      await DeleteFile({
        fileType: "transcript",
        fileName: fileExists.transcriptName,
        access,
      });
      setTranscriptExists(false);
      setTranscriptStatus("Not Uploaded");
      toast.success("Deleted Transcript");
    } catch (error) {
      toast.error("Failed to Delete Transcript");
      throw error;
    }
  };

  const handleProfileUpdate = async (e) => {
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

    setIsSubmittingProfile(true);
    try {
      const res = await fetch(`${API_BASE}/auth/update-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = "Update failed.";
        try {
          const data = await res.json();
          if (data?.message) msg = data.message;
        } catch {
          msg = "Internal Server Error";
        }
        throw new Error(msg);
      }

      toast.success("Profile updated.");
    } catch (err) {
      const msg = err?.message || "Internal server error. Please try again.";
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const handleFileUpdate = async (e) => {
    e?.preventDefault();
    setSubmitError("");

    setIsSubmittingFile(true);

    try {
      const promises = [];

      if (resume) promises.push(handleUploadResume());
      if (transcript) promises.push(handleUploadTranscript());

      if (promises.length === 0) {
        toast.info("No files to upload.");
        setIsSubmittingFile(false);
        return;
      }

      await Promise.all(promises);

      if (resume) setResumeExists(true);
      if (transcript) setTranscriptExists(true);

      toast.success("Files saved.");
    } catch (err) {
      const msg = err?.message || "Internal server error. Please try again.";
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setIsSubmittingFile(false);
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

  const handleSubmission = (e) => {
    e?.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmission}
      className="flex flex-col gap-4 mx-6 w-fit min-h-screen"
    >
      <div className="flex flex-col gap-5">
        <div className="flex justify-center items-center gap-5">
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
              label="Research interests (3 Max)"
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
            <div className="relative w-[12.5rem] h-[13rem]">
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
                className="cursor-pointer rounded-sm hover:bg-gray-50 border-[1px] w-full h-full inline-block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <img
                  src="/luncheon.svg"
                  alt="resume upload background image"
                  width={200}
                  height={128}
                  loading="eager"
                  decoding="async"
                  className="w-full h-[8rem]"
                />

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

              <div>
                {resumeExists ? (
                  <div>
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
                    <button
                      type="button"
                      className="absolute top-1 left-1 rounded-md font-medium cursor-pointer px-1.5 py-0.5 text-[12px] font-main"
                      onClick={async (e) => {
                        e.stopPropagation();
                        await handleDeleteResume();
                      }}
                    >
                      <Trash2 className="stroke-2 h-5 w-5 text-white hover:text-red-500" />
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            <div className="relative w-[12.5rem] h-[13rem]">
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
                <img
                  src="/walk.svg"
                  alt="transcript upload background image"
                  width={200}
                  height={128}
                  loading="eager"
                  decoding="async"
                  className="w-full h-[8rem]"
                />

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

              <div>
                {transcriptExists ? (
                  <div>
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
                    <button
                      type="button"
                      className="absolute top-1 left-1 rounded-md font-medium cursor-pointer px-1.5 py-0.5 text-[12px] font-main"
                      onClick={async (e) => {
                        e.stopPropagation();
                        await handleDeleteTranscript();
                      }}
                    >
                      <Trash2 className="stroke-2 h-5 w-5 hover:text-red-500 text-black" />
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {submitError && (
        <p className="mt-2 text-xs text-red-500 font-main">{submitError}</p>
      )}
      <div className="flex gap-4">
        <Button
          type="submit"
          onClick={handleProfileUpdate}
          className="text-xs cursor-pointer font-medium text-white px-2 py-1 rounded-sm bg-none transition-colors bg-[#4584F3] hover:bg-[#3574E2]"
          disabled={isSubmittingProfile}
        >
          <PersonStandingIcon className="stroke-1" />
          {isSubmittingProfile ? "Saving..." : "Update Profile"}
        </Button>
        <Button
          type="submit"
          onClick={handleFileUpdate}
          className="text-xs cursor-pointer font-medium text-white px-2 py-1 rounded-sm bg-none transition-colors bg-[#9065B0] hover:bg-[#9A6EC0]"
          disabled={isSubmittingFile}
        >
          <File className="stroke-1" />
          {isSubmittingFile ? "Saving..." : "Apply File Changes"}
        </Button>
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
