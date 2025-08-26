import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function AuthMiddleware(req) {
  const url = req.nextUrl;
  //Integrate profile middleware make it so under different conditions,
  // various redirects happen, if they are not done registering, then make it
  const cookieStore = await cookies();
  const access = cookieStore.get("access_token");
  const refresh = cookieStore.get("refresh_token")

  try {
    if (!access || !refresh) {
      const res = NextResponse.redirect(new URL(redirectTo, req.url));

    }

    if (data?.access_token && data?.refresh_token) {
      const isProd = process.env.NODE_ENV === "production";
      const redirectTo = "/login";
      const res = NextResponse.redirect(new URL(redirectTo, req.url));

      const response = await fetch("http://localhost:8080/auth/refresh-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
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
  } catch (error) {}

  return NextResponse.next();
}
