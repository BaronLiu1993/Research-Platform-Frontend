'use client'

import { useState } from 'react';
import File from '../../../public/file.png'
import Image from "next/image";


export default function resume () {
    const [pdfFile, setPdfFile] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            const fileURL = URL.createObjectURL(file);
            setPdfFile(fileURL);
        } else {
            alert('Please upload a valid PDF file');
        }
    };
    //Fix Resume With AI RAG Model and the Keywords and Data from the Description 
    return (
        <>
            <div className = "flex items-start justify-center space-x-10">
                <div className = 'flex flex-col justify-center items-center'>
                    <h1 className = "font-sans text-2xl font-medium">Upload Your Resume</h1>
                    <p className = "font-sans text-sm">Fix Your Resume and Match Keywords</p>
                    <label className="h-[10rem] w-[20rem] flex flex-col justify-center items-center border-2 border-gray-300 cursor-pointer border-dashed rounded-md">
                        <Image src= {File} alt="Placeholder" width={40} height={40} />
                        <h1 className="font-sans font-medium">Browse Files to Upload</h1>
                        <p className="font-extralight text-sm">Supports PDF, JPG, PNG</p>

                        <input 
                            type="file" 
                            className="hidden"
                            accept=".pdf, .jpg, .png"
                            onClick = {handleFileUpload}
                        />
                    </label>
                    
                    <p className = "bg-blue-200 text-sm font-sans h-[2rem] w-[20rem] flex items-center pl-4 rounded-md mt-5">
                        No Files Uploaded
                    </p>
                    <div className = "mt-10">
                        <h1 className = "text-2xl font-sans">Professor Research Interests</h1>
                        <div>
                            <p className = "text-sm">Machine Learning</p>
                            <p className = "text-sm">Operations Research</p>
                            <p className = "text-sm">Mechanical and Industrial Engineering</p>
                        </div>

                        <h1 className = "text-2xl font-sans">Resume Feedback</h1>
                        <div>
                            <p className = "text-sm">Reformat</p>
                            <p className = "text-sm">Apply Machine Learning</p>
                            <p className = "text-sm">Operations Research</p>
                            <p className = "text-sm">Mechanical and Industrial Engineering</p>
                        </div>
                        <button className = "mt-5 font-extralight cursor-pointer text-white bg-blue-500 rounded-sm px-2 font-sans">
                            Apply Changes
                        </button>
                    </div>
                </div>

                <div className = "h-[40rem] border-1 w-[30rem] rounded-md">

                </div>
            </div>
            <button className = "flex justify-center items-center font-extralight cursor-pointer w-[20rem] h-[3rem] text-white bg-blue-500 rounded-sm px-2 font-sans">
                Preview Email
            </button>
        </>
    )
}