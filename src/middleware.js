import { LoginMiddleware } from "./app/middleware/loginMiddleware";
import { RegisterMiddleware } from "./app/middleware/registerMiddleware";
import { AuthMiddleware } from "./app/middleware/authMiddleware";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  // Handle register page

  if (pathname === "/account/register") {
    const registerResult = await RegisterMiddleware(req);
    if (registerResult?.headers.get("location")) {
      return registerResult;
    }
    return NextResponse.next();
  }

  // Handle login page
  if (pathname === "/account/login") {
    const loginResult = await LoginMiddleware(req);
    if (loginResult?.headers.get("location")) {
      return loginResult;
    }

    return NextResponse.next();
  }

  if ((pathname === "/drafts" || pathname === "/inbox") &&
      process.env.NEXT_PUBLIC_FEATURE_EMAIL_FLOW !== "true") {
    return NextResponse.redirect(new URL("/repository", req.url));
  }

  const authResult = await AuthMiddleware(req);
  if (authResult) {
    return authResult;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/login",
    "/account/register",
    "/register",
    "/drafts",
    "/repository",
    "/workspace",
    "/inbox",
    "/inbox/thread",
    "/profile",
  ],
};
