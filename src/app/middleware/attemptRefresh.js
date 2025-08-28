export async function attemptRefresh(refreshToken, url, isProd) {
    if (!refreshToken) return null;
  
    const refreshResponse = await fetch(
      "http://localhost:8080/auth/refresh-token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );
  
    if (!refreshResponse.ok) return null;
  
    const data = await refreshResponse.json();
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