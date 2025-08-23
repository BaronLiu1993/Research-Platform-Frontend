import { authCallbackMiddleware } from "./app/middleware/cookiesMiddleware";
import { NextResponse } from "next/server";

export async function middleware(req) {
  if (req.nextUrl.pathname === "/account") {
    const authResult = await authCallbackMiddleware(req);
    if (authResult.headers.get("location")) {
      return authResult;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account",
    "/account/:path*" 
  ],
};