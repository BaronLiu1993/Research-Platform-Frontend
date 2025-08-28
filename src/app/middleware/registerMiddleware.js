import { NextResponse } from "next/server";

export async function RegisterMiddleware(req) {
  const url = req.nextUrl;

  if (!url.searchParams.has("code")) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (url.pathname === "/account/register" && url.searchParams.has("code")) {
    const code = url.searchParams.get("code");
    try {
      const response = await fetch(
        "http://localhost:8080/auth/oauth2callback/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        }
      );

      const data = await response.json();

      if (data?.accessToken && data?.refreshToken && data?.user_id) {
        const isProd = process.env.NODE_ENV === "production";
        const redirectTo = "/register";

        const res = NextResponse.redirect(new URL(redirectTo, req.url));

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
      } else {
        return NextResponse.redirect(new URL("/auth/signup", req.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/auth/signup", req.url));
    }
  }
  return NextResponse.next();
}
