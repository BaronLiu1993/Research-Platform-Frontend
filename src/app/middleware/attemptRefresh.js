import { NextResponse } from "next/server";

export async function attemptRefresh(refreshToken, url, isProd) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  if (!refreshToken) return null;

  const refreshResponse = await fetch(`${API_BASE}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!refreshResponse.ok) return null;

  const data = await refreshResponse.json();
  const res = NextResponse.next();

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

  return res;
}
