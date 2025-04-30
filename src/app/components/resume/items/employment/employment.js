"use client"

import { useState } from "react"
import EmploymentForm from "./employmentform"

export default function employment ({experience_data}) {
    console.log(experience_data)
    const [employmentForms, setEmploymentForms] = useState([])
    const addEmploymentForm = () => {
        setEmploymentForms(prevForms => [
            ...prevForms,
            { id: prevForms.length + 1}
        ]);
    };
    //Pass prop here and the amount of boxes is the amount of experience
    return (
        <>
            <div className = "border-1 rounded-md border-gray-400 p-8 space-y-5">
                <div>
                    <h1 className = "font-sans text-md font-semibold">Employment History</h1>
                    <p className = "text-gray-400 font-sans text-sm font-light">Show employers your past experience and what you have accomplished. Include simple, <br />clear examples with action verbs to demonstrate your skills.</p>
                </div>
                <div>
                    {employmentForms.map((form, index) => (
                        <EmploymentForm key = {form.id}/>
                    ))}
                </div>
                <div>
                    <button 
                    onClick = {addEmploymentForm}
                    className = "rounded-md w-full bg-blue-500 p-2 text-white font-sans font-extralight">Add More +</button>
                </div>
            </div>
        </>
    )
}