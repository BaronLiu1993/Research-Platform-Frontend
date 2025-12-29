import { NextResponse } from "next/server";

export async function GET(req) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  try {
    const backendRes = await fetch(`${API_BASE}/auth/oauth2callback/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get("cookie") ?? "",
      },
      body: JSON.stringify({ code }),
    });

    if (!backendRes.ok) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    const res = NextResponse.redirect(new URL("/repository", req.url));

    const all = backendRes.headers.getSetCookie?.() ?? [];
    for (const c of all) res.headers.append("set-cookie", c);

    return res;
  } catch {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}
