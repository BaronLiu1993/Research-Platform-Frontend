'use client'

import { useState } from 'react'
import File from '../../../public/file.png'
import Image from "next/image";
import Navbar from '../components/navbar';
import WordProcessor from '../api/wordprocessor';
import SubjectWordProcessor from '../api/subjectwordprocessor';


export default function email() {
    const [resumeAttached, setResumeAttached] = useState("")
    const [userData, setUserData] = useState({
        student_email: "",
        student_major: "",
        student_research_interests: []
    })

    const [professorData, setProfessorData] = useState({
        professor_email: "",
        professor_interests: []
    })


    // Create Personalised Email and Send Also Automate the Sending Here
    // Attach Transcript and Resume Here
    return (
        <>
            <Navbar />
            
            <div className = "h-fit justify-center items-center border-2 border-gray-200 rounded-md m-10">
                <div className = "font-sans m-10">
                    <div className = "flex justify-evenly">
                        <div>
                            <h1 className = "font-sans font-bold text-blue-500">Your Information</h1>
                            <h2 className = "font-sans font-medium">Email: Jiexuan.liu@mail.utoronto.ca</h2>
                            <h2 className = "font-sans font-medium">Major: Industrial Engineering</h2>
                            <h2 className = "font-sans font-medium">Research Interests: Molecular Biology <span></span></h2>
                        </div>
                        <div>
                            <h1 className = "font-sans font-bold text-green-500">Professor Information</h1>
                            <h1 className = "font-sans font-medium">Email: something@utoronto.ca</h1>
                            <h1 className = "font-sans font-medium">Research Interests: Oncology</h1>
                        </div>
                    </div>

                    <div>
                        <div className = "my-5 space-y-4">
                            <h1 className = "bg-green-200 p-1 rounded-md">Subject Line: </h1> 
                            <SubjectWordProcessor />
                        </div>
                        <div className = "mt-5 space-y-4">
                            <h1 className = "bg-green-200 p-1 rounded-md">Email Body </h1> 
                            <WordProcessor />
                        </div>
                    </div>
                </div>
            <label className = "flex justify-center items-center m-10 border-2 p-4 rounded-md border-dashed border-red-300">
                <Image src={File} alt="Placeholder" width={40} height={40}/>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setResumeFile(e.target.files[0])}
                    className = "font-sans font-medium font hidden"
                />

                <p className = "font-bold  text-sm">Upload Your Transcript <span className = "text-red-300">Optional</span></p>
                <p className = "font-extralight text-sm">Supports PDF, JPG, PNG</p>
            </label>

            <button type = "submit" className = "bg-blue-500 mt-10 text-white w-[20rem] rounded-md m-10 font-sans font-light py-2">
            Continue
            </button>
            </div>
        </>
    )
}