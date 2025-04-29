import { useState } from 'react'
import ParseResume from '@/app/api/parseresume';
import { removeSingleQuoteOrJson } from '@/app/api/fixjson';

export default function Builder ({researchInterests}) {
    const [resumeFile, setResumeFile] = useState(null);
    const handleParseResume = async () => {
            if (!resumeFile) {
                console.warn("No file selected!");
                return;
            }
            const file = resumeFile
            try {
                const interests = researchInterests
                const resumeDataHTML = await ParseResume(file, interests);
                console.log(resumeDataHTML.result)
                const cleanedData = removeSingleQuoteOrJson(resumeDataHTML.result)
                const response = JSON.parse(cleanedData)
                console.log(response)
                setEditorContent(response)
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
    
    
    return (
        <>
            <div>
                <h1 className = "p-4 text-2xl font-sans font-semibold">Build Your New Resume!</h1>
                <div>
                    <label className = "flex space-x-2 cursor-pointer shadow-md items-center m-4 border-2 p-4 rounded-md border-gray-300 w-full">
                        <svg className = "p-1 bg-purple-400 text-white rounded-md" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 12v6"/><path d="m15 15-3-3-3 3"/></svg>
                        <input
                            type="file"
                            accept=".pdf"
                            className = "font-sans font-medium font hidden"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setResumeFile(e.target.files[0]);
                                }
                            }}
                        />
                
                        <div>
                            <p className = "font-semibold text-xl font-sans">I Already Have a Resume</p>
                            <p className = "font-extralight text-sm font-sans">Supports PDF, JPG, PNG</p>
                        </div>
                    </label>
                </div>
                <div>
                    <label className = "flex space-x-2 shadow-md items-center m-4 border-2 p-4 rounded-md border-gray-300 w-full">
                    <svg className = "p-1 bg-blue-400 text-white rounded-md"xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/></svg>
                        <input
                            type="file"
                            accept=".pdf"
                            className = "font-sans font-medium font hidden"
                        />
                
                        <div>
                            <p className = "font-semibold font-sans text-xl">Build Your Own Resume</p>
                            <p className = "font-extralight font-sans text-sm">Supports PDF, JPG, PNG</p>
                        </div>  
                    </label>


                    <div className = "mx-5 space-x-4">
                    {resumeFile && (
                            <button
                                className="mt-5 font-light cursor-pointer text-white bg-blue-500 rounded-sm text-sm px-2 font-sans"
                                onClick={() => handleParseResume(resumeFile)}
                            >
                                Parse Resume
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}