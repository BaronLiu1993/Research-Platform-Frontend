import { NextResponse } from "next/server";

export async function authCallbackMiddleware(req) {
  const url = req.nextUrl;

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_code", req.url));
  }

  const resp = await fetch("http://localhost:8080/auth/oauth2callback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, state }),
    cache: "no-store",
  });

  if (!resp.ok) {
    return NextResponse.redirect(new URL("/login?error=exchange_failed", req.url));
  }

  const data = await resp.json();
  const redirectTo = data.redirectURL ?? "/";
  const isProd = process.env.NODE_ENV === "production";

  const res = NextResponse.redirect(new URL(redirectTo, req.url));

  if (data.access_token) {
    res.cookies.set("access_token", data.access_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });
  }

  if (data.refresh_token) {
    res.cookies.set("refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  if (data.user_id) {
    res.cookies.set("user_id", data.user_id, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return res;
}