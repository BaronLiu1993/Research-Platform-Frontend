import { cookies } from "next/headers";

import Navbar from "../components/navbar";
import Kanban from "../components/bookmark/kanban";
import UserProfile from "../components/bookmark/userprofile";

export default async function Bookmark() {
  const cookieStore = await cookies();
  const access = cookieStore.get("accesstoken");
  const serverData = await fetch("http://localhost:8080/auth/get-user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access.value}`,
      "Content-Type": "application/json",
    },
  });
  const responses = await serverData.json();
  const finalResponse = responses.profile;
  return (
    <>
      <Navbar />
      <UserProfile studentData={finalResponse}/>
      <Kanban userID = {finalResponse.user_id} />
    </>
  );
}
