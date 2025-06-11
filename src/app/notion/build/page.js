"use client"

import { useState } from "react";
import { File } from "lucide-react";
import ParseResume from "@/app/resume/parseresume";

export default function Build() {
  const [resumeFile, setResumeFile] = useState(null)
  const [parsedResume, setParsedResume] = useState(false)
  const [jsonResume, setJSONResume] = useState(null)

  const handleParseResume = async () => {
      if (!resumeFile) {
        console.warn("No file selected!");
        return;
      }
  
      const file = resumeFile;
  
      try {
        const rawJSONObject = await ParseResume(file);
        const response = rawJSONObject.result; 
        setJSONResume(response)      
        setParsedResume(true);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    
    console.log(jsonResume)
    
    const deleteFile = () => {
      setResumeFile(null);
    };
  return (
    <>
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
                <span className="text-purple-700"> Choose the File</span> to
                Upload
              </p>
            </div>
            <div className="mx-5 space-x-4"></div>
            {resumeFile && (
              <button
                className="mt-5 font-light cursor-pointer text-white bg-blue-500 rounded-sm text-sm px-2 "
                onClick={() => handleParseResume(resumeFile)}
              >
                Parse Resume
              </button>
            )}
          </div>
        </label>
      </div>
    </>
  );
}
