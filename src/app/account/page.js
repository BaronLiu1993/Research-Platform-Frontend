import { cookies } from "next/headers";

export default async function Account({searchParams}) {
    const cookieStore = await cookies()
    
    const code = searchParams?.code;
    const loginResponse = await fetch("http://localhost:8080/auth/oauth2callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code }),
      });
    const loginResponseJson = await loginResponse.json()
    console.log(loginResponseJson)
    
    return (
        <>
        
        </>
    )
}