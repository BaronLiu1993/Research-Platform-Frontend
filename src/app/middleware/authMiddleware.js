import { NextResponse } from "next/server";

export async function AuthMiddleware(req) {
  const access = req.cookies.get("access_token")?.value;
  const refresh = req.cookies.get("refresh_token")?.value;
  const isProd = process.env.NODE_ENV === "production";

  if (!access || !refresh) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const response = await fetch("http://localhost:8080/auth/is-authenticated", {
      method: "GET",
      headers: { Authorization: `Bearer ${access}` },
    });

    const successStatus = await response.json();

    // If access token invalid → try refresh
    if (!successStatus.success) {
      const refreshResponse = await fetch("http://localhost:8080/auth/refresh-token", {
        method: "POST",
        credentials: "include", // send cookies automatically
      });

      if (!refreshResponse.ok) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const data = await refreshResponse.json();
      const res = NextResponse.next();

      res.cookies.set("access_token", data.access_token, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60, 
      });

      res.cookies.set("refresh_token", data.refresh_token, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, 
      });

      return res;
    }

    const profileCheck = await fetch("http://localhost:8080/auth/check-profile-completed", {
      method: "GET",
      headers: { Authorization: `Bearer ${access}` },
    });

    const profile = await profileCheck.json();

    if (!profile.isComplete) {
      return NextResponse.redirect(new URL("/register", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("AuthMiddleware error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
