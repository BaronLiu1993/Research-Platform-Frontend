import { NextResponse } from "next/server";
import { attemptRefresh } from "./attemptRefresh";

export async function AuthMiddleware(req) {
  const access = req.cookies.get("access_token")?.value;
  const refresh = req.cookies.get("refresh_token")?.value;
  const isProd = process.env.NODE_ENV === "production";

  if (!access && !refresh) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (!access && refresh) {
    const refreshed = await attemptRefresh(refresh, req.url, isProd);
    if (!refreshed) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    return refreshed;
  }

  try {
    const response = await fetch("http://localhost:8080/auth/is-authenticated", {
      method: "GET",
      headers: { Authorization: `Bearer ${access}` },
    });

    const successStatus = await response.json();

    if (!successStatus.success) {
      const refreshed = await attemptRefresh(refresh, req.url, isProd);
      if (!refreshed) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
      return refreshed;
    }

    // Check profile completion
    const profileCheck = await fetch(
      "http://localhost:8080/auth/check-profile-completed",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${access}` },
      }
    );

    const profile = await profileCheck.json();

    if (!profile.isComplete) {
      return NextResponse.redirect(new URL("/auth/signup", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}