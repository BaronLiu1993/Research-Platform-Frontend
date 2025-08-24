import { NextResponse } from "next/server";

export async function authCallbackMiddleware(req) {
  const url = req.nextUrl;

  if (url.pathname === "/account" && url.searchParams.has("code")) {
    const code = url.searchParams.get("code");

    try {
      const response = await fetch("http://localhost:8080/auth/oauth2callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data?.access_token && data?.refresh_token && data?.user_id) {
        const isProd = process.env.NODE_ENV === "production";

        const redirectTo = data.redirectURL || "/";

        const res = NextResponse.redirect(new URL(redirectTo, req.url));

        res.cookies.set("access_token", data.access_token, {
          httpOnly: true,
          secure: isProd,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60, // 1h
        });

        res.cookies.set("refresh_token", data.refresh_token, {
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
    } catch (error) {
      console.error("OAuth callback error:", error);
    }
  }

  return NextResponse.next();
}
