import { NextResponse } from "next/server";
import { attemptRefresh } from "./attemptRefresh";

export async function AuthMiddleware(req) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  const access = req.cookies.get("access_token")?.value;
  const refresh = req.cookies.get("refresh_token")?.value;
  const isProd = process.env.NODE_ENV === "production";
  const { pathname } = req.nextUrl;

  const publicPaths = ["/auth/signin", "/auth/signup"];
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    if (access || refresh) {
      return NextResponse.redirect(new URL("/repository", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/register") && refresh) {
    return NextResponse.next();
  }

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
    const response = await fetch(`${API_BASE}/auth/is-authenticated`, {
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

    const profileCheck = await fetch(`${API_BASE}/auth/check-profile-completed`, {
      method: "GET",
      headers: { Authorization: `Bearer ${access}` },
    });
    const profile = await profileCheck.json();

    if (!profile.isComplete && pathname !== "/register") {
      return NextResponse.redirect(new URL("/register", req.url));
    }
    if (profile.isComplete && pathname.startsWith("/register")) {
      return NextResponse.redirect(new URL("/repository", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}
