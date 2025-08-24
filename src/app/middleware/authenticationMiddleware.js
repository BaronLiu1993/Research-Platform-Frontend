import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function authMiddleware(req) {
    const cookieStore = await cookies();
    const access = cookieStore.get("access_token")
    const url = req.nextUrl;
    try {
        const response = await fetch("http://localhost:8080/auth/check-profile-completed", {
            method: "GET",
            headers: { "Authorization": {acce} },
            body: JSON.stringify({ code }),
          });

        const data = await response.json()

        if (data.isCompleted) {
            const res = NextResponse.redirect(new URL(redirectTo, req.url));
        } else {

        }
    } catch {

    }
    return NextResponse.next()
}