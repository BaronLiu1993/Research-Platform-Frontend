"use client"

import { useState, useRef } from "react"; 

import { useSearchParams } from "next/navigation";

// Component imports
import EmailTextEditor from "./emailtexteditor";

import Publications from "./publications";

import { colours } from "@/app/data/colours";

//Shad CN 

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcomponents/ui/card"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/shadcomponents/ui/collapsible"


import { Input } from "@/shadcomponents/ui/input";

import { Label } from "@/shadcomponents/ui/label";

import { Button } from "@/shadcomponents/ui/button";


// Lucide Icon

import { Sparkle } from 'lucide-react';

import { Trash2 } from 'lucide-react';

import { Paperclip } from 'lucide-react';

import { Clock2 } from 'lucide-react';

import { FileText } from 'lucide-react';

import { Send } from "lucide-react";

import { Mails } from "lucide-react"


export default function Email () {
  const searchParams = useSearchParams()
  const name = searchParams.get("name")
  const email = searchParams.get("email")
  const interests = searchParams.get("professor_interests")
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
                <div className="flex">
                    <Label className="mr-10 text-slate-400 font-sans">Interests</Label>
                    <Collapsible>
                        <CollapsibleTrigger className="flex gap-2 flex-wrap font-sans text-sm">
                            {interests.split(',').slice(0, 5).map((interest, index) => {
                            const colour = colours[index % colours.length];
                            return (
                                <span key={index} className={`px-2 rounded-md ${colour.bg} ${colour.text}`}>
                                {interest.trim()}
                                </span>
                            );
                            })}
                        </CollapsibleTrigger>

                        <CollapsibleContent className="flex gap-2 flex-wrap mt-2 font-sans text-sm">
                            {interests.split(',').slice(3).map((interest, index) => {
                            const actualIndex = index + 3; 
                            const colour = colours[actualIndex % colours.length];
                            return (
                                <span key={actualIndex} className={`px-2 rounded-md ${colour.bg} ${colour.text}`}>
                                {interest.trim()}
                                </span>
                            );
                            })}
                        </CollapsibleContent>
                    </Collapsible>
                    </div>
                    <div className = "flex">
                        <Label className ="mr-10 text-slate-400 font-sans ">
                            <Send className = "h-7 w-7 border-1 p-1 rounded-md "/>
                            <span>To</span>
                        </Label>
                        <div className="flex items-center text-sm space-x-1 w-full">
                            <div className="text-sm flex items-center space-x-2 border-1 rounded-md w-full px-3">
                                <span className="pr-1 font-semibold bg-purple-200 text-purple-800 px-1 rounded-2xl">{name}</span>
                                <Input
                                    className="w-auto p-0 m-0 border-none shadow-none underline focus-visible:ring-0 focus:outline-none"
                                    defaultValue={email}
                                />
                            </div>
                        </div>
                    </div>
                    <div className = "flex">
                        <Label className ="mr-5 text-slate-400 font-sans ">
                            <Mails className ="border-1 rounded-md h-7 w-7 p-1"/>
                            <span>From</span>
                        </Label>
                        <Input />
                    </div>
                </CardContent>
                <div>
                    <Input className = "p-2 border- rounded-none font-sans text-sm text-black" defaultValue = "University of Toronto Resarch Inquiry"/>
                    <EmailTextEditor/>
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
                <CardFooter className = "flex justify-between ml-5">
                    <div className = "flex space-x-4 items-center">
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
                        <Button className = "bg-white border font-sans border-gray-300 shadow-sm text-black hover:bg-white hover:text-black hover:shadow-md hover:border-gray-300 cursor-pointer">
                            Remind me
                        </Button>
                        <Button className = "bg-white border font-sans border-gray-300 shadow-sm text-black hover:bg-white hover:text-black hover:shadow-md hover:border-gray-300 cursor-pointer">
                            Send Later
                        </Button>
                        <Button className = "font-sans hover:shadow-md cursor-pointer">
                            Send
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

