"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

// Component imports
import EmailTextEditor from "./emailtexteditor";

// Shad CN
import { Badge } from "@/shadcomponents/ui/badge";
import { Input } from "@/shadcomponents/ui/input";
import { Button } from "@/shadcomponents/ui/button";

// Lucide Icons
import {
  Trash2,
  Paperclip,
  Clock2,
  FileText,
  AirplayIcon,
  XIcon,
} from "lucide-react";

export default function Email({ student_data, timeZone }) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Recipient Name";
  const email = searchParams.get("email") || "recipient@example.com";
  const interestsString =
    searchParams.get("professor_interests") || "Topic A, Topic B, Topic C";
  const professor_id = searchParams.get("id") || null;
  const interests = interestsString.split(",");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("")
  const fileInputRef = useRef(null);
  const handleSendSubject = (data) => {
    setSubject(data);
  };
  
  const handleSendBody = (data) => {
    setBody(data)
  }

  

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const deleteFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className=" p-4 sm:p-6 md:p-8 font-main bg-white">
      <div className="mb-6 space-y-2">
        {interests && interests.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <Badge
                  key={index}
                  className="px-2.5 py-1 text-xs font-medium rounded-md text-[#37352F] bg-[#EAEAEA]"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center space-x-3">
          {name && (
            <>
              <span className="text-sm font-semibold text-[#37352F]">
                {name}
              </span>
              <span className="text-sm text-[#9B9A97]">{email}</span>
            </>
          )}
        </div>
        <div className="text-sm text-[#9B9A97]">
          {student_data.student_email}
        </div>

        <div>
          <Input
            id="subject"
            className="w-full h-8 px-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-[#9B9A97] focus:border-blue-500 focus:ring-0"
            placeholder={`e.g. Research Inquiry: Professor ${name} - Your Name`}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <EmailTextEditor
          student_data={student_data}
          research_interests={interestsString}
          sendSubject={handleSendSubject}
          professor_id={professor_id}
        />
      </div>

      {uploadedFile && (
        <div className="mb-6 p-3 flex items-center space-x-3 border border-gray-200 bg-gray-50 rounded-md w-fit">
          <FileText className="h-5 w-5 text-red-500 shrink-0" />
          <div className="text-sm">
            <div className="text-gray-800 font-medium">{uploadedFile.name}</div>
            <div className="text-xs text-gray-500">
              {(uploadedFile.size / 1024).toFixed(1)} KB
            </div>
          </div>
          <button
            onClick={deleteFile}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-200 gap-3">
        <div className="flex space-x-2 items-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
            aria-label="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
            aria-label="Schedule send"
          >
            <Clock2 className="h-5 w-5" />
          </button>
          <button
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md"
            aria-label="Discard email"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="text-sm text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            Remind me
          </Button>
          <Button
            variant="ghost"
            className="text-sm text-gray-700 hover:bg-gray-100"
          >
            Save Draft
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-1.5">
            Send <AirplayIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
