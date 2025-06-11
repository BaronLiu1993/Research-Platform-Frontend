"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shadcomponents/ui/breadcrumb";
import {
  MoveLeft,
  MoveRight,
  Plus,
  Laptop,
  Blocks,
  BookOpenText,
  Book,
  PlusCircle,
} from "lucide-react";

import { useState } from "react";
import { File } from "lucide-react";
import ParseResume from "@/app/resume/parseresume";
import { BuildNotion } from "@/app/components/notion/api/buildNotion";
import { Input } from "@/shadcomponents/ui/input";
import { Label } from "@/shadcomponents/ui/label";
import { Badge } from "@/shadcomponents/ui/badge";

import OpenEdit from "@/app/components/notion/docs/openEdit";
import Publish from "@/app/components/notion/docs/publish";

export default function Build() {
  const [resumeFile, setResumeFile] = useState(null);
  const [parsedResume, setParsedResume] = useState(false);
  const [notionUrl, setNotionUrl] = useState("");

  const handleParseResume = async () => {
    if (!resumeFile) {
      console.warn("No file selected!");
      return;
    }
    const file = resumeFile;

    try {
      const rawJSONObject = await ParseResume(file);
      const response = rawJSONObject.result;
      const status = await BuildNotion(
        response,
        "ea2f9981-e2b5-4b26-a4d4-e63572b9a26c"
      );
      setNotionUrl(status.notionPageUrl);
      setParsedResume(true);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const deleteFile = () => {
    setResumeFile(null);
  };
  return (
    <>
      <Breadcrumb className="font-main font-semibold mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <MoveLeft className="w-5 text-[#787774] cursor-pointer rounded-xs hover:bg-gray-100 p-0.5" />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <MoveRight className="w-5 text-[#787774] cursor-pointer rounded-xs hover:bg-gray-100 p-0.5" />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Plus className="w-5 text-[#787774] cursor-pointer rounded-xs hover:bg-gray-100 p-0.5" />
          </BreadcrumbItem>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink
              href="/"
              className="flex items-center font-medium text-[#37352F] gap-2"
            >
              <Laptop className="rounded-xs text-white fill-blue-700 h-5 w-5" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <div className="text-gray-300">/</div>
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-main flex items-center gap-2 font-medium text-[#37352F]">
              Notion
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <div className="text-gray-300">/</div>
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-main flex items-center gap-2 font-medium text-[#37352F]">
              <Blocks className="text-blue-700 h-4 w-4" />
              Build
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="min-h-screen w-full flex flex-col justify-center items-center font-main">
        <div className="bg-white space-y-10">
          <div className="flex justify-center items-center flex-col space-y-5">
            <Blocks className="h-20 w-20 " />
            <div>
              <h1 className="font-semibold text-2xl">
                Build Your Personal Portfolio
              </h1>
              <h2 className="font-semibold text-md">
                Connect with jiexuan.liu@mail.utoronto.ca
              </h2>
            </div>
          </div>

          {parsedResume ? (
            <div>
              <div className="space-y-2 w-full">
                <div className="space-y-2 w-full">
                  <Label className="font-medium">
                    Internal Notion Portfolio Link
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={notionUrl}
                      readOnly
                      className="bg-white shadow-sm border font-mono rounded-xs w-full"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(notionUrl);
                      }}
                      className="text-sm px-2 py-1 bg-blue-500 text-white rounded-xs hover:bg-blue-600 transition"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
              <div className="rounded-xs mt-2">
                <div className="flex gap-2 pt-6 items-center">
                  <BookOpenText className="text-[#787774]" />
                  <h1 className="text-2xl text-[#787774] font-semibold h-fit">
                    Publish Your Notion Website
                  </h1>
                </div>
                <div className="flex items-center py-2 space-x-2">
                  <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-xs text-[10px]">
                    <Book />
                    Documentation
                  </Badge>
                  <div className="rounded-full h-1 w-1 bg-[#37352F]"></div>
                  <h2 className="text-xs font-semibold text-[10px] text-[#37352F]">
                    By Jie Xuan Liu
                  </h2>
                </div>

                <div className="space-y-1 pt-6 pb-3">
                  <p className="text-[#37352F] text-[13px] w-[55rem] font-light">
                    Now that you have built your website let's publish and
                    deploy it for professors to see{" "}
                    <span className="font-bold text-blue-700 font-mono">
                      personalized suggestions
                    </span>{" "}
                    that align closely with your current research interests.
                    Your{" "}
                    <span className="text-blue-700 font-bold font-mono">
                      research interests
                    </span>{" "}
                    are converted into vector representations, which are then
                    matched against each professor’s own{" "}
                    <span className="text-blue-700 font-bold font-mono">
                      research interests
                    </span>{" "}
                    using{" "}
                    <span className="underline text-blue-700 font-mono cursor-pointer">
                      cosine similarity scoring
                    </span>{" "}
                    [1].
                  </p>
                </div>
              </div>{" "}
              <OpenEdit />
              <Publish />
            </div>
          ) : (
            <label className="flex space-x-2 border-dashed border-4 items-center justify-center p-4 py-10 rounded-md w-[20rem]">
              <input
                type="file"
                accept=".pdf"
                className="font-medium font hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setResumeFile(e.target.files[0]);
                  }
                }}
              />
              <div className="flex flex-col justify-center items-center space-y-5">
                <PlusCircle className="text-gray-300 h-12 w-12" />
                <div className="">
                  <p className="font-semibold text-gray-500 text-sm text-center">
                    Drag and Drop Your Resume Here or <br />
                    <span className="text-blue-700">Choose the File</span> to
                    Upload
                  </p>
                </div>
                {resumeFile && (
                  <button
                    className="mt-5 font-light cursor-pointer text-white bg-blue-500 rounded-sm text-sm px-2"
                    onClick={() => handleParseResume(resumeFile)}
                  >
                    Parse Resume
                  </button>
                )}
              </div>
            </label>
          )}
        </div>
      </div>
    </>
  );
}
