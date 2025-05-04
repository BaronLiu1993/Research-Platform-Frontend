import KanbanCard from "../components/kanbancard"; 
import { cookies } from 'next/headers';
import Navbar from "../components/navbar";
import UserProfile from "../components/bookmark/userprofile";

export default async function Bookmark() {
  const cookieStore = await cookies()
  const access = cookieStore.get('accesstoken')
  console.log(access.value)
  const serverData = await fetch(
    'http://localhost:8080/auth/get-user',
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access.value}`,
        'Content-Type': 'application/json' 
      },
    },
  );
  const responses = await serverData.json()
  const studentData = responses.profile

  console.log(responses);

  return (
    <>
      <Navbar />
      <div className= "w-full h-full">
        <UserProfile profile_data = {studentData}/>
      </div>
    </>
  );
}