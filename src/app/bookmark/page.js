import { cookies } from "next/headers";

import Navbar from "../components/navbar";
import Kanban from "../components/bookmark/kanban";
import UserProfile from "../components/bookmark/userprofile";

import { Badge } from "@/shadcomponents/ui/badge";

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
      <div className="p-4 font-sans">
        <div className="flex items-center justify-between gap-2 ml-12">
        </div>
        <div className = "flex">
          <UserProfile studentData={finalResponse}/>
          <Kanban userID={finalResponse.user_id} />
        </div>
      </div>

    </>
  );
}
