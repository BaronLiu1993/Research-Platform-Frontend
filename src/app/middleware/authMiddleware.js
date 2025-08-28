import { NextResponse } from "next/server";
import { attemptRefresh } from "./attemptRefresh";

export async function AuthMiddleware(req) {
  const access = req.cookies.get("access_token")?.value;
  const refresh = req.cookies.get("refresh_token")?.value;
  const isProd = process.env.NODE_ENV === "production";
  const { pathname } = req.nextUrl;

  console.log("[AuthMiddleware] Starting");
  console.log("[AuthMiddleware] Access:", !!access, "Refresh:", !!refresh);

  if ((access || refresh) && pathname.startsWith("/auth/signin")) {
    console.log("[AuthMiddleware] No access token, redirecting from", pathname);
    return NextResponse.redirect(new URL("/repository", req.url));
  }

  if ((access || refresh) && pathname.startsWith("/auth/signup")) {
    console.log("[AuthMiddleware] No access token, redirecting from", pathname);
    return NextResponse.redirect(new URL("/repository", req.url));
  }

  // Case 1: No tokens at all
  if (!access && !refresh) {
    console.log(
      "[AuthMiddleware] No access or refresh token → redirect /auth/signin"
    );
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Case 2: No access token but we have a refresh token
  if (!access && refresh) {
    console.log(
      "[AuthMiddleware] Missing access, found refresh → attempting refresh"
    );
    const refreshed = await attemptRefresh(refresh, req.url, isProd);

    if (!refreshed) {
      console.log("[AuthMiddleware] Refresh failed → redirect /auth/signin");
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    console.log(
      "[AuthMiddleware] Refresh succeeded → continuing with new tokens"
    );
    return refreshed;
  }

  // Case 3: Have an access token
  try {
    console.log(
      "[AuthMiddleware] Found access token → validating with backend"
    );
    const response = await fetch(
      "http://localhost:8080/auth/is-authenticated",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${access}` },
      }
    );

    const successStatus = await response.json();
    console.log("[AuthMiddleware] /is-authenticated response:", successStatus);

    if (!successStatus.success) {
      console.log("[AuthMiddleware] Access token invalid → attempting refresh");
      const refreshed = await attemptRefresh(refresh, req.url, isProd);

      if (!refreshed) {
        console.log("[AuthMiddleware] Refresh failed → redirect /auth/signin");
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }

      console.log(
        "[AuthMiddleware] Refresh succeeded → continuing with new tokens"
      );
      return refreshed;
    }

    // Check profile completion
    console.log(
      "[AuthMiddleware] Access token valid → checking profile completion"
    );
    const profileCheck = await fetch(
      "http://localhost:8080/auth/check-profile-completed",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${access}` },
      }
    );

    const profile = await profileCheck.json();
    console.log("[AuthMiddleware] /check-profile-completed response:", profile);

    if (!profile.isComplete) {
      if (req.nextUrl.pathname !== "/register") {
        console.log("[AuthMiddleware] Profile incomplete → redirect /register");
        return NextResponse.redirect(new URL("/register", req.url));
      } else {
        console.log(
          "[AuthMiddleware] Profile incomplete → already on /register, allowing access"
        );
      }
    }

    console.log("[AuthMiddleware] Auth + profile OK → allowing request");
    return NextResponse.next();
  } catch (err) {
    console.error("[AuthMiddleware] Error during validation:", err);
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}
