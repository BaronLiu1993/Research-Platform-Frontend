"use client";

import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

// Component imports
import EmailTextEditor from "./emailtexteditor";

// Shad CN
import { Badge } from "@/shadcomponents/ui/badge";
import { Input } from "@/shadcomponents/ui/input";
import { Label } from "@/shadcomponents/ui/label"; 
import { Button } from "@/shadcomponents/ui/button";


// Lucide Icons
import {
  Trash2,
  Paperclip,
  Clock2,
  FileText,
  AirplayIcon, 
  XIcon, 
  MailPlus,
} from "lucide-react";

export default function Email({student_information}) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Recipient Name";
  const email = searchParams.get("email") || "recipient@example.com";
  const interestsString = searchParams.get("professor_interests") || "Topic A, Topic B, Topic C, Topic D, Topic E, Topic F";
  const interests = interestsString.split(",").map(i => i.trim()).filter(i => i);
  
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

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

  const initialContent = `<p>Dear Professor ${name || 'Name'},</p><p><br></p><p>I am writing to express my interest in your research on [mention specific area from their interests below, e.g., ${interests[0] || 'their primary research area'}].</p><p><br></p><p>I am particularly interested in...</p><p><br></p><p>My own background is in...</p><p><br></p><p>Would you be open to a brief virtual meeting to discuss potential opportunities or your work further?</p><p><br></p><p>Thank you for your time and consideration.</p><p><br></p><p>Sincerely,</p><p>[Your Name]</p>`;


  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 font-sans bg-white text-gray-800">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center text-2xl font-semibold text-gray-700">
          <MailPlus className="h-7 w-7 mr-3 text-blue-500" />
          <h1>New Message</h1>
        </div>
      </div>

      {/* Email Meta Section */}
      <div className="space-y-4 mb-6">
        {/* Interests */}
        {interests && interests.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-start justify-center items-center">
            <Label className="w-full sm:w-24 text-sm font-bold shrink-0">Interests</Label>
            <div className="flex-grow">
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {interests.map((interest, index) => {
                    return (
                      <Badge
                        key={index}
                        className={`px-2 py-0.5 text-xs rounded-full font-medium`}
                      >
                        {interest}
                      </Badge>
                    );
                  })}
                  
                </div>
                
              </div>
            </div>
          </div>
        )}

        {/* To Field */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <Label htmlFor="to-email" className="w-full sm:w-24 text-sm font-bold mb-1 sm:mb-0 shrink-0 flex items-center">
             Send To...
          </Label>
          <div className="flex-grow flex items-center space-x-2 border border-gray-300 rounded-md px-3 py-1.5 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            {name && (
              <span className="text-sm font-medium bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md whitespace-nowrap">
                {name}
              </span>
            )}
            <Input
              id="to-email"
              className="w-full p-0 m-0 border-none shadow-none focus-visible:ring-0 text-sm text-gray-700 bg-transparent"
              defaultValue={email}
              placeholder="recipient@example.com"
            />
          </div>
        </div>

        {/* From Field */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <Label htmlFor="from-email" className="w-full sm:w-24 text-sm font-bold mb-1 sm:mb-0 shrink-0 flex items-center">
            From...
          </Label>
          <Input
            id="from-email"
            className="flex-grow border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
            placeholder="your-email@example.com"
          />
        </div>
        
        {/* Subject Field */}
        <div className="flex flex-col sm:flex-row sm:items-center py-2">
          <Label htmlFor="subject" className="w-full sm:w-24 text-sm font-bold mb-1 sm:mb-0 shrink-0">Subject</Label>
          <Input
            id="subject"
            className="flex-grow border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm font-medium"
            defaultValue={`Research Inquiry: ${name} - [Your Name/Topic]`}
            placeholder="Email Subject"
          />
        </div>
      </div>

      <div className="mb-6">
        <EmailTextEditor content={initialContent} research_interests={interestsString} />
      </div>

      {uploadedFile && (
        <div className="mb-6 p-3 flex items-center space-x-3 border border-gray-200 bg-gray-50 rounded-md w-fit">
          <FileText className="h-5 w-5 text-red-500 shrink-0" />
          <div className="text-sm">
            <div className="text-gray-800 font-medium">
              {uploadedFile.name}
            </div>
            <div className="text-xs text-gray-500">
              {(uploadedFile.size / 1024).toFixed(1)} KB
            </div>
          </div>
          <button onClick={deleteFile} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200">
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
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md" aria-label="Schedule send">
            <Clock2 className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md" aria-label="Discard email">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="text-sm text-gray-700 border-gray-300 hover:bg-gray-50">
            Remind me
          </Button>
          <Button variant="ghost" className="text-sm text-gray-700 hover:bg-gray-100">
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