import { authCallbackMiddleware } from "./app/middleware/cookiesMiddleware";
import { AuthMiddleware } from "./app/middleware/authMiddleware";
import { NextResponse } from "next/server";

export async function middleware(req) {
  if (req.nextUrl.pathname === "/account") {
    const authResult = await authCallbackMiddleware(req);
    if (authResult.headers.get("location")) {
      return authResult;
    }
    return NextResponse.next();
  }

  return AuthMiddleware(req);
}

export const config = {
  matcher: [
    "/account",
    "/account/:path*",
    "/repository/:path*",
    "/bookmark/:path*",
    "/inbox/:path*",
    "/grants/:path*",
  ],
};
