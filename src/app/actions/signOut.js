"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SignOut = async () => {
  const cookieStore = cookies();
  const refresh = (await cookieStore).get("refresh_token");
  try {
    const signOutStatus = await fetch("http://localhost:8080/auth/sign-out", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: refresh,
      }),
    });
    if (!signOutStatus.ok) {
      redirect("/repository");
    } else {
      (await cookieStore)
        .delete("access_token")(await cookieStore)
        .delete("refresh_token");
      (await cookieStore).delete("user_id");
    }
  } catch {
    redirect("/repository");
  }
};
