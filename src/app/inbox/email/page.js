"use server"

import { cookies } from "next/headers"

export default async function InboxEmail () {
    const cookieStore = await cookies()
    const userId = cookieStore.get("user_id")
    console.log(userId)
    const emailResponse = await fetch(`http://localhost:8080/gmail/emails/${userId.value}`, {
        method: "GET",
    })
    console.log(emailResponse)
    const parsedEmailResponse = await emailResponse.json()
    console.log(parsedEmailResponse)

    return (
        <>
            <div>
                {parsedEmailResponse.emails.map((email) => (
                    <div key = {email.id}>
                        <h1>{email.subject}</h1>
                        
                    </div>
                ))}
            </div>
        </>
    )
}