"use client";

import { useState } from "react";

import ParseResume from "@/app/resume/parseresume";
import Editor from "./editor";

import { FileText } from "lucide-react";
import { Hammer } from "lucide-react";
import { File } from "lucide-react";
import { X } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";
import EditorInteractive from "../interactiveresume/editorinteractive";

export default function Builder() {
  const [resumeFile, setResumeFile] = useState(null);
  const [experience, setExperience] = useState({});
  const [contact, setContact] = useState({});
  const [projects, setProjects] = useState({});
  const [personalInformation, setPersonalInformation] = useState({});
  const [parsedResume, setParsedResume] = useState(false);

  const handleParseResume = async () => {
    if (!resumeFile) {
      console.warn("No file selected!");
      return;
    }

    const file = resumeFile;

    try {
      const rawJSONObject = await ParseResume(file);
      const response = rawJSONObject.result;
      setExperience(response.experience);
      setContact(response.contact_information);
      setProjects(response.projects);
      console.log(response.personal_information);
      setPersonalInformation(response.personal_information);
      setParsedResume(true);
      console.log(parsedResume);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const deleteFile = () => {
    setResumeFile(null);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-md flex justify-center font-main">
        {!parsedResume ? (
          <div className="flex flex-col mt-20">
            <h1 className="p-4 text-4xl font-semibold">
              Build Your New Resume!
            </h1>
            <div className="space-y-4 rounded-md">
              <Accordion
                type="single"
                collapsible
                className="shadow-sm rounded-md bg-white"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex items-center w-[32rem] p-4 rounded-2xl hover:no-underline hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex space-x-10 justify-center items-center cursor-pointer">
                      <File className="p-2 bg-purple-400 h-15 w-15 shadow-md text-white rounded-md" />
                      <div>
                        <p className="font-semibold text-xl text-purple-500">
                          I Have a Resume
                        </p>
                        <p className="font-semibold text-gray-500 text-sm ">
                          Supports PDF, JPG, PNG
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>

                  {resumeFile ? (
                    <AccordionContent>
                      <div className="w-fit p-3 flex justify-center items-center space-x-4 ml-6 text-sm text-gray-500 border-1 bg-gray-50  rounded-md">
                        <FileText className="h-6 w-6 text-red-600" />
                        <div>
                          <div className="text-black  font-semibold">
                            {resumeFile.name}
                          </div>
                          <div>{(resumeFile.size / 1024).toFixed(1)} KB</div>
                        </div>
                        <button
                          onClick={deleteFile}
                          className="cursor-pointer text-lg"
                        >
                          <X />
                        </button>
                      </div>
                      <button
                        className="mt-5 font-light cursor-pointer mx-8 text-white bg-blue-500 rounded-sm text-sm px-2 "
                        onClick={() => handleParseResume(resumeFile)}
                      >
                        Parse Resume
                      </button>
                    </AccordionContent>
                  ) : (
                    <AccordionContent className="p-4 w-[32rem]">
                      <div className="bg-white">
                        <label className="flex space-x-2 border-dashed border-2 items-center justify-center p-4 py-10 rounded-md w-[30rem] ">
                          <input
                            type="file"
                            accept=".pdf"
                            className=" font-medium font hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setResumeFile(e.target.files[0]);
                              }
                            }}
                          />
                          <div className="flex flex-col justify-center items-center space-y-3">
                            <File className="text-purple-400 h-15 w-15" />
                            <div className="">
                              <p className=" font-semibold text-gray-500 text-md">
                                Drag and Drop Your Resume Here or <br />
                                <span className="text-purple-700">
                                  {" "}
                                  Choose the File
                                </span>{" "}
                                to Upload
                              </p>
                            </div>
                            <div className="mx-5 space-x-4"></div>
                          </div>
                        </label>
                      </div>
                    </AccordionContent>
                  )}
                </AccordionItem>
              </Accordion>
              <Accordion
                type="single"
                collapsible
                className="shadow-sm rounded-md bg-white"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex items-center w-[30rem] p-4 rounded-2xl hover:no-underline hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex space-x-10 justify-center items-center cursor-pointer">
                      <Hammer className="p-2 bg-blue-400 h-15 w-15 shadow-md text-white rounded-md" />
                      <div>
                        <p className="font-semibold text-xl text-blue-500 ">
                          Email
                        </p>
                        <p className="font-semibold text-gray-500 text-sm ">
                          Supports PDF, JPG, PNG
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 w-[32rem]">
                    <div className="bg-white">
                      <label className="flex space-x-2 border-dashed border-2 items-center justify-center p-4 py-10 rounded-md w-[30rem]">
                        <input
                          type="file"
                          accept=".pdf"
                          className=" font-medium font hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setResumeFile(e.target.files[0]);
                            }
                          }}
                        />
                        <div className="flex flex-col justify-center items-center">
                          <File className="text-purple-400 h-15 w-15" />
                          <div className="">
                            <p className=" font-semibold text-gray-500 text-md">
                              Drag and Drop Your Resume Here or <br />
                              <span className="text-purple-700">
                                {" "}
                                Choose the File
                              </span>{" "}
                              to Upload
                            </p>
                          </div>
                          <div className="mx-5 space-x-4"></div>
                          {resumeFile && (
                            <button
                              className="mt-5 font-light cursor-pointer animate-spin text-white bg-blue-500 rounded-sm text-sm px-2 "
                              onClick={() => handleParseResume(resumeFile)}
                            >
                              <svg
                                class="mr-3 size-5 animate-spin"
                                viewBox="0 0 24 24"
                              ></svg>
                              Parse Resume
                            </button>
                          )}
                        </div>
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        ) : (
          <div className="flex items-start space-x-6">
            <div className="w-screen">
              {/*<EditorInteractive
                student_experience={experience}
                student_projects={projects}
                student_contact={contact}
                student_personal_information={personalInformation}
              />*/}
              <Editor
                student_experience={experience}
                student_projects={projects}
                student_contact={contact}
                student_personal_information={personalInformation}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
