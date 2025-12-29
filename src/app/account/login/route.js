import { NextResponse } from "next/server";

export const runtime = "nodejs"; 

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
      },
      credentials: "include",
      body: JSON.stringify({ code }),
      redirect: "manual",
    });

    if (!backendRes.ok) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    const res = NextResponse.redirect(new URL("/repository", req.url));

    const setCookie = backendRes.headers.get("set-cookie");
    if (setCookie) {
      res.headers.append("set-cookie", setCookie);
    }

    return res;
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}
