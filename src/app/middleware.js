// middleware.js
import { NextResponse } from "next/server";
import { authCallbackMiddleware } from "./middleware/cookiesMiddleware";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname === "/auth/callback") {
    return authCallbackMiddleware(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*"], 
};
