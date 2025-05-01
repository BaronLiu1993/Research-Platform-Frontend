"use client"

import { useState, useRef } from "react"; 

// Component imports
import EmailTextEditor from "./emailtexteditor";

//Shad CN 

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcomponents/ui/card"


import { Input } from "@/shadcomponents/ui/input";

import { Label } from "@/shadcomponents/ui/label";

import { Button } from "@/shadcomponents/ui/button";

// Lucide Icon

import { Sparkle } from 'lucide-react';

import { Trash2 } from 'lucide-react';

import { Paperclip } from 'lucide-react';

import { Clock2 } from 'lucide-react';

import { FileText } from 'lucide-react';

export default function Email () {
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const deleteFile = (event) => {
    setUploadedFile(null)
  }
    return (
        <>
            <Card className = "m-10">
                <CardTitle className = "font-sans text-xl flex space-x-2 mx-6">
                    <Sparkle className = "fill-black" />
                    <h1>New Message</h1> 
                </CardTitle>
                <CardContent className = "space-y-2 font-sans">
                    <div className = "flex">
                        <Label className ="mr-10 text-slate-400 font-semibold font-sans ">From:</Label>
                        <div className="flex items-center text-sm space-x-1 w-full">
                            <div className="text-sm flex items-center space-x-0 border-1 rounded-md w-full px-3">
                                <span className="pr-1 font-bold">Olivia Rhye</span>
                                <Input
                                    className="w-auto p-0 m-0 border-none shadow-none underline focus-visible:ring-0 focus:outline-none"
                                    defaultValue="hello@olivahye.com"
                                />
                            </div>
                        </div>
                    </div>
                    <div className = "flex">
                        <Label className ="mr-14 text-slate-400 font-semibold font-sans ">To:</Label>
                        <Input />
                    </div>
                </CardContent>
                <div>
                    <Input className = "p-2 border- rounded-none font-sans text-sm text-black" defaultValue = "University of Toronto Resarch Inquiry"/>
                    <EmailTextEditor />
                    {uploadedFile && (
                        <div className="w-fit p-3 flex justify-center items-center space-x-4 ml-6 text-sm text-gray-500 border-1 bg-gray-50 font-sans rounded-md">
                            <FileText className = "h-6 w-6 text-red-600"/>
                            <div>
                                <div className = "text-black font-sans font-semibold">
                                    {uploadedFile.name} 
                                </div>
                                <div>
                                    {(uploadedFile.size / 1024).toFixed(1)} KB
                                </div>
                            </div>
                            <button 
                            onClick={deleteFile}
                            className = "cursor-pointer text-lg">X</button>
                        </div>
                        )}
                </div>
                <CardFooter className = "flex justify-between">
                    <div className = "flex space-x-4">
                        <Trash2 className = "text-gray-400 hover:text-gray-700 h-5 w-5 cursor-pointer"/>
                        <Paperclip
                            className="text-gray-400 h-5 w-5 cursor-pointer hover:text-gray-700"
                            onClick={() => fileInputRef.current?.click()}
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <Clock2 className = "text-gray-400 hover:text-gray-700 h-5 w-5 cursor-pointer"/>
                    </div>
                    <div className = "space-x-2">
                        <Button className = "bg-white border border-gray-300 shadow-sm text-black hover:bg-white hover:text-black hover:shadow-md hover:border-gray-300 cursor-pointer">
                            Remind me
                        </Button>
                        <Button className = "bg-white border border-gray-300 shadow-sm text-black hover:bg-white hover:text-black hover:shadow-md hover:border-gray-300 cursor-pointer">
                            Send Later
                        </Button>
                        <Button className = "hover:shadow-md cursor-pointer">
                            Send
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

