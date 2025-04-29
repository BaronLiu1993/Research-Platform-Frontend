'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from "next/image";
import { useRouter } from 'next/navigation'
import Navbar from '../components/navbar';
import WordProcessor from '../api/wordprocessor';

import Editor from '../components/resume/editor';
import Builder from '../components/resume/builder';

import { removeSingleQuoteOrJson, removeSingleQuoteOrString } from '../api/fixjson';
import { getProfessorData } from '../api/getProfessorData.js';
//Scans current resume for all keywords and then builds new resume with latex and the format given

export default function resume ({}) {
    const searchParams = useSearchParams()
    const search = searchParams.get('url')
    const router = useRouter()

    const [data, setData] = useState({}); 


    const [researchInterests, setResearchInterests] = useState({})
    const [professorInformation, setProfessorInformation] = useState({})
    const [feedback, setFeedback] = useState("")
    const [editorContent, setEditorContent] = useState(null)

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const professor_url = search;
                const response = await getProfessorData({ url: professor_url });
                const fixedResponse = removeSingleQuoteOrJson(response.result);
                const professorDataObject = JSON.parse(fixedResponse);
                console.log(professorDataObject);
                setData(professorDataObject);
                setProfessorInformation(professorDataObject.email)
                setResearchInterests(professorDataObject.research_interests);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [search]);

    /*
    const handleSendDataToEmail = (url) => {
        if (!researchInterests || !professorInformation) {
          console.warn("No Data Attached")  
        } 
        router.push(`/resume/?url=${encodeURIComponent(url)}/email/?professor_interests=${encodeURIComponent(researchInterests)}?professor_information=${encodeURIComponent(professorInformation)}`);
    }
    */

    return (
        <>
                <Navbar />
                    <div className = "flex items-start space-x-10 p-10 select-none">
                        <div className = 'flex flex-col w-[20rem]'>
                            <div className = "mt-2">
                                <h1 className = "text-sm font-bold border-b-2 p-1 font-sans w-[20rem]">
                                    PROFESSOR INFORMATION
                                </h1>

                                <div className = "rounded-2xl">
                                    <div className = "font-sans font-semibold my-2 items-center space-x-2 flex items bg-blue-200 w-fit rounded-2xl p-1 border-gray-200">
                                        <div className = "bg-blue-500 h-2 w-2 rounded-full"></div>
                                        <p className = "text-xs font-sans font-medium">Professor Information</p>
                                    </div>
                                    <div className = "border-gray-200 w-[20rem] h-fit p-2 font-sans text-md rounded-md border-1">
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
                                    <div className = "border-gray-200 w-[20rem] h-fit p-2 font-sans text-md rounded-md border-1">
                                        {data.research_interests?.map((keyword, index) => (
                                                <p key={index}>{keyword}</p>  
                                        ))}
                                    </div>
                                </div>
        
                                <div className = "text-lg my-2 font-sans font-semibold items-center space-x-2 flex items bg-red-200 w-fit rounded-2xl p-1 border-gray-200">
                                        <div className = "bg-red-500 h-2 w-2 rounded-full"></div>
                                        <p className = "text-xs font-sans font-medium">Feedback</p>
                                    </div>
                                    <div className = "border-gray-200 w-[20rem] p-2 font-sans text-md h-20 rounded-md border-1">
                                        {feedback?.result?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No feedback yet"}
                                    </div>
                                </div>
                        </div>
                        <Builder researchInterests = {data.research_interests}/>
                    </div>
                    
                </>
    )
}



