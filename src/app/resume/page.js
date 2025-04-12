'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from "next/image";
import RAGSocket from '../components/RAGsocket';
import Editor from '../components/editorresume'
import removeSingleQuoteOrJson from '../api/fixjson';
import getProfessorData from '../api/getprofessordata';
//Scans current resume for all keywords and then builds new resume with latex and the format given

export default function resume () {
    const searchParams = useSearchParams()
    const search = searchParams.get('url')
    const [data, setData] = useState({}); 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const professor_url = search;
                const response = await getProfessorData({ url: professor_url });
                const fixedResponse = removeSingleQuoteOrJson(response.result);
                const professorDataObject = JSON.parse(fixedResponse);
                setData(professorDataObject);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [search]);
    return (
        <>
                    <div className = "flex items-start justify-center space-x-10 p-10 select-none">
                        <div className = 'flex flex-col'>
                            
                            <div className = "mt-2">
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
                                    
                                    </div>
                                </div>
                                
                        <div>
                                <button className = "mt-5 font-extralight cursor-pointer text-white bg-blue-500 rounded-sm text-xs px-2 font-sans">
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



