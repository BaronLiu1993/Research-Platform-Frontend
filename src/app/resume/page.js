'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from "next/image";
import File from '../../../public/file.png'
import RAGSocket from '../components/RAGsocket';
import ParseResume from '../api/parseresume';
import Editor from '../components/editorresume'
import removeSingleQuoteOrJson from '../api/fixjson';
import getProfessorData from '../api/getprofessordata';
import { parseAppSegmentConfig } from 'next/dist/build/segment-config/app/app-segment-config';
//Scans current resume for all keywords and then builds new resume with latex and the format given

export default function resume () {
    const searchParams = useSearchParams()
    const search = searchParams.get('url')
    const [data, setData] = useState({}); 
    const [researchInterests, setResearchInterests] = useState({})
    const [feedback, setFeedback] = useState("")
    const [resumeFile, setResumeFile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const professor_url = search;
                const response = await getProfessorData({ url: professor_url });
                const fixedResponse = removeSingleQuoteOrJson(response.result);
                const professorDataObject = JSON.parse(fixedResponse);
                console.log(professorDataObject)
                setData(professorDataObject);
                setResearchInterests(professorDataObject.research_interests)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [search]);

    const handleSubmit = async () => {
        if (!resumeFile) {
            console.warn("No file selected!");
            return;
        }
        const file = resumeFile
        try {
            const interests = researchInterests
            const response = await ParseResume(file, interests);
            console.log(response.result)
            setFeedback(response.result);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    return (
        <>
                    <div className = "flex items-start justify-center space-x-10 p-10 select-none">
                        <div className = 'flex flex-col'>
                            
                            <div className = "mt-2">
                                <div className = "flex flex-col justify-center items-center">
                                    <Image src={File} alt="Placeholder" width={40} height={40}/>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setResumeFile(e.target.files[0])}
                                    />
                                    <h1 className = "font-sans font-medium ">Browse Files to Upload</h1>
                                    <p className = "font-extralight text-sm">Supports PDF, JPG, PNG</p>
                                </div>
                                <h1 className = "text-sm font-bold border-b-2 p-1 font-sans">
                                    PROFESSOR INFORMATION
                                </h1>

                                <div className = "rounded-2xl">
                                    <div className = "font-sans font-semibold my-2 items-center space-x-2 flex items bg-blue-200 w-fit rounded-2xl p-1 border-gray-200">
                                        <div className = "bg-blue-500 h-2 w-2 rounded-full"></div>
                                        <p className = "text-xs font-sans font-medium">Professor Information</p>
                                    </div>
                                    <div className = "border-gray-200 w-fit h-fit p-2 font-sans text-md rounded-md border-1">
                                        <p>{data.name}</p>
                                        <p>{data.email}</p>
                                        <p>{data.phone}</p>
                                    </div>
                                </div>

                                <div className = "rounded-2xl">
                                    <div className = "font-sans font-semibold my-2 items-center space-x-2 flex items bg-purple-200 w-fit rounded-2xl p-1 border-gray-200">
                                        <div className = "bg-purple-500 h-2 w-2 rounded-full"></div>
                                        <p className = "text-xs font-sans font-medium">Research Interests</p>
                                    </div>
                                    <div className = "border-gray-200 w-fit h-fit p-2 font-sans text-md rounded-md border-1">
                                        {data.research_interests?.map((keyword, index) => (
                                                <p key={index}>{keyword}</p>  
                                        ))}
                                    </div>
                                </div>
        
                                <div className = "text-lg my-2 font-sans font-semibold items-center space-x-2 flex items bg-red-200 w-fit rounded-2xl p-1 border-gray-200">
                                        <div className = "bg-red-500 h-2 w-2 rounded-full"></div>
                                        <p className = "text-xs font-sans font-medium">Feedback</p>
                                    </div>
                                    <div className = "border-gray-200 p-2 font-sans text-md h-20 w-40 rounded-md border-1">
                                        {feedback?.result?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No feedback yet"}
                                    </div>
                                </div>
                                
                        <div>
                            <button
                                className="mt-5 font-extralight cursor-pointer text-white bg-blue-500 rounded-sm text-xs px-2 font-sans"
                                onClick={() => handleSubmit(resumeFile)}
                                >
                                Change with AI
                            </button>
                            </div>
                        </div>
        
                        <div className = "w-full h-full border-1 rounded-md flex flex-col">
                            <Editor className = "w-full h-full"/>
                        </div>
                    </div>
                    
                </>
    )
}



