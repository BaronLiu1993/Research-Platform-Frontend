'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import File from '../../../public/file.png'
import Image from "next/image";

import Email from '../components/email/email';
import Navbar from '../components/navbar';
import Publications from '../components/email/publications';

export default function email({ data }) {
    const searchParams = useSearchParams()
    const professor_interests_url = searchParams.get('professor_interests')
    const professor_information_url = searchParams.get('professor_information')

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
    const [subjectWordContent, setSubjectWordContent] = useState("")
    const [bodyWordContent, setBodyWordContent] = useState("")

    useEffect(() => {
        console.log(professor_information_url)
        console.log(professor_interests_url)
        setProfessorData({
            professor_email: professor_information_url,
            professor_interests: professor_interests_url,
        });
        console.log(professorData)
    }, [])

    // Create Personalised Email and Send Also Automate the Sending Here
    // Attach Transcript and Resume Here
    return (
        <>
            <Navbar />
            <Email />
            
        </>
    )
}