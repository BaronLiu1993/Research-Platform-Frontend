import { cookies } from "next/headers";

export default async function Recommendations() {
    const cookieStore = await cookies();
    const user_id = cookieStore.get("user_id");
    console.log(user_id)
    const data = await fetch("http://localhost:8080/match-professors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        
        body: JSON.stringify({student_id: user_id.value}) 
    })
    const responses = await data.json()
    console.log(responses)
    return (
      <div>
        
      </div>
    );
  }