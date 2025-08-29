"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SignOut = async () => {
  const cookieStore = cookies();
  const refresh = cookieStore.get("refresh_token");

  try {
    const signOutStatus = await fetch("http://localhost:8080/auth/sign-out", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: refresh?.value,
      }),
    });

    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    cookieStore.delete("user_id");

    if (!signOutStatus.ok) {
      redirect("/repository");
    } else {
      redirect("/account/login"); 
    }
  } catch {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    cookieStore.delete("user_id");
    redirect("/repository");
  }
};
