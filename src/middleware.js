import { AuthMiddleware } from "./app/middleware/authMiddleware";
import { NextResponse } from "next/server";

export async function middleware(req) {
  

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
    "/profile"
  ],
};
