import { useState, useEffect } from "react"
import Message from "./message"

export default function EmailSidebar ({threadId, userId, email}) {
    const [threadData, setThreadData] = useState([])
    useEffect(() => {
        const fetchResponseThread = async () => {
            const mailData = await fetch(`http://localhost:8080/gmail/get-full-email-chain/${userId}/${threadId}`, {
                method: "GET",
                "Content-Type": "application/json"
            })
            const responseData = await mailData.json()
            setThreadData(responseData)
        } 

        if (threadId && userId) fetchResponseThread()
        
    }, [threadId, userId])
    return (
        <>
            <div>
                <h1 className = "font-main font-medium text-xl text-center"></h1>
                <div>
                    {threadData?.messageArray?.map((message, idx) => (
                        <div key = {idx}>
                            <Message data = {message} email = {email}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}