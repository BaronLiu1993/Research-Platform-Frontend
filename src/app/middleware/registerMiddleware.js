import { NextResponse } from "next/server";

export async function RegisterMiddleware(req) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const url = req instanceof Request ? new URL(req.url) : req.nextUrl;
  const path = url.pathname;

  if (!url.searchParams.has("code")) {
    return NextResponse.redirect(new URL("/auth/signin", url));
  }

  if (path === "/account/register") {
    const code = url.searchParams.get("code") || "";

    try {
      const response = await fetch(
        `${API_BASE}/auth/oauth2callback/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        }
      );

      const data = await response.json();

      if (data?.accessToken && data?.refreshToken && data?.user_id) {
        const isProd = process.env.NODE_ENV === "production";
        const redirectTo = "/repository";
        const res = NextResponse.redirect(new URL(redirectTo, url));
        res.cookies.set("access_token", data.accessToken, {
          httpOnly: true,
          secure: isProd,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60,
        });

        res.cookies.set("refresh_token", data.refreshToken, {
          httpOnly: true,
          secure: isProd,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, 
        });

        res.cookies.set("user_id", data.user_id, {
          httpOnly: true,
          secure: isProd,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });

        return res;
      }

      return NextResponse.redirect(new URL("/auth/signup", url));
    } catch (err) {
      return NextResponse.redirect(new URL("/auth/signup", url));
    }
  }

  return NextResponse.next();
}
