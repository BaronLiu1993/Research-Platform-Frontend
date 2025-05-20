"use server"

import { cookies } from "next/headers";

export async function getUserId() {
    try {
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
        return responses
    } catch (err) {
        console.log(err)
    }
}