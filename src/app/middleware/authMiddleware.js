import { NextResponse } from "next/server";

export async function AuthMiddleware(req) {
  const access = req.cookies.get("access_token")?.value;
  const refresh = req.cookies.get("refresh_token")?.value;
  const isProd = process.env.NODE_ENV === "production";

  console.log("[AuthMiddleware] Checking tokens for:", req.url);

  if (!access || !refresh) {
    console.log("[AuthMiddleware] Missing tokens → redirect to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Validate access token
    const response = await fetch(
      "http://localhost:8080/auth/is-authenticated",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${access}` },
      }
    );

    const successStatus = await response.json();
    console.log("[AuthMiddleware] is-authenticated:", successStatus);

    if (!successStatus.success) {
      // Try refresh if access token invalid
      console.log("[AuthMiddleware] Access invalid → refreshing...");

      const refreshResponse = await fetch(
        "http://localhost:8080/auth/refresh-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            refreshToken: refresh,
          },
        }
      );

      if (!refreshResponse.ok) {
        console.log("[AuthMiddleware] Refresh failed → redirecting to /login");
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const data = await refreshResponse.json();
      console.log("[AuthMiddleware] Refresh succeeded, new tokens:", data);

      const res = NextResponse.next();

      res.cookies.set("access_token", data.access_token, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      });

      res.cookies.set("refresh_token", data.refresh_token, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return res;
    }

    console.log("test");
    const profileCheck = await fetch(
      "http://localhost:8080/auth/check-profile-completed",
      {
        method: "GET",
        headers: { "Authorization": `Bearer ${access}` },
      }
    );

    const profile = await profileCheck.json();
    console.log("[AuthMiddleware] Profile response:", profile);

    if (!profile.isComplete) {
      console.log(
        "[AuthMiddleware] Incomplete profile → redirecting /register"
      );
      return NextResponse.redirect(new URL("/register", req.url));
    }

    console.log("[AuthMiddleware] Auth + profile valid → continuing");
    return NextResponse.next();
  } catch (err) {
    console.error("[AuthMiddleware] ERROR:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
