"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const LogOut = async () => {
  const cookieStore = cookies();
  const refresh = cookieStore.get("refresh_token")?.value;

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";

  const delOpts = { path: "/" };

  try {
    if (refresh) {
      await fetch(`${API_BASE}/auth/sign-out`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: refresh }),
      });
    }
  } catch {
    
  } finally {
    cookieStore.delete("access_token", delOpts);
    cookieStore.delete("refresh_token", delOpts);
    cookieStore.delete("user_id", delOpts);
  }
  redirect("/");
};
