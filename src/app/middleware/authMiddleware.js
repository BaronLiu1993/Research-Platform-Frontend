import { NextResponse } from "next/server";
import { attemptRefresh } from "./attemptRefresh";

function ensureRepositoryDefaults(url) {
  if (url.pathname === "/repository" && url.searchParams.size === 0) {
    url.searchParams.set("page", "1");
    url.searchParams.set("search", "");
    return true;
  }
  return false;
}

export async function AuthMiddleware(req) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  const access = req.cookies.get("access_token")?.value;
  const refresh = req.cookies.get("refresh_token")?.value;
  const isProd = process.env.NODE_ENV === "production";

  const url = req.nextUrl.clone();
  const { pathname } = url;

  const publicPaths = ["/auth/signin", "/auth/signup"];

  if (publicPaths.some((p) => pathname.startsWith(p))) {
    if (access || refresh) {
      url.pathname = "/repository";
      url.searchParams.set("page", "1");
      url.searchParams.set("filter", "");
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (!access && !refresh) {
    url.pathname = "/auth/signin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (!access && refresh) {
    const refreshed = await attemptRefresh(refresh, isProd);
    if (!refreshed) {
      const signIn = req.nextUrl.clone();
      signIn.pathname = "/auth/signin";
      signIn.search = "";
      return NextResponse.redirect(signIn);
    }
    const nextUrl = refreshed.headers.get("Location");
    if (nextUrl) {
      const redirected = new URL(nextUrl);
      if (ensureRepositoryDefaults(redirected)) {
        return NextResponse.redirect(redirected);
      }
    }
    return refreshed;
  }

  try {
    const authRes = await fetch(`${API_BASE}/auth/is-authenticated`, {
      method: "GET",
      headers: { Authorization: `Bearer ${access}` },
    });
    const successStatus = await authRes.json();

    if (!successStatus?.success) {
      const refreshed = await attemptRefresh(refresh, req.url, isProd);
      if (!refreshed) {
        const signIn = req.nextUrl.clone();
        signIn.pathname = "/auth/signin";
        signIn.search = "";
        return NextResponse.redirect(signIn);
      }
      const nextUrl = refreshed.headers.get("Location");
      if (nextUrl) {
        const redirected = new URL(nextUrl);
        if (ensureRepositoryDefaults(redirected)) {
          return NextResponse.redirect(redirected);
        }
      }
      return refreshed;
    }

    const profileCheck = await fetch(
      `${API_BASE}/auth/check-profile-completed`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${access}` },
      }
    );
    const profile = await profileCheck.json();

    if (!profile?.isComplete && pathname !== "/register") {
      url.pathname = "/register";
      url.search = "";
      return NextResponse.redirect(url);
    }

    if (profile?.isComplete && pathname === "/register") {
      url.pathname = "/repository";
      url.searchParams.set("page", "1");
      url.searchParams.set("search", "");
      return NextResponse.redirect(url);
    }

    if (ensureRepositoryDefaults(url)) {
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch {
    const signIn = req.nextUrl.clone();
    signIn.pathname = "/auth/signin";
    signIn.search = "";
    return NextResponse.redirect(signIn);
  }
}

export const config = {
  matcher: ["/((?!_next/|static/|favicons/|images/|favicon.ico).*)"],
};
