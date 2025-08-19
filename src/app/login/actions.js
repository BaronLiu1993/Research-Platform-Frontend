"use server";

import { cookies } from "next/headers";

export async function handleLogin(prevState, formData) {
  const cookieStore = await cookies();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { message: "Please enter both email and password" };
  }

  try {
    const loginResponse = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!loginResponse.ok) {
      let errorBody = { message: `Backend Error: ${loginResponse.status}` };
      try {
        const responseText = await loginResponse.text();
        errorBody = JSON.parse(responseText);
      } catch {}
      return {
        message: errorBody.message || `Wrong Email or Password`,
        savedProfessors: [],
        appliedProfessors: [],
        success: false,
      };
    }

    const loginResponseData = await loginResponse.json();
    const userId = loginResponseData.userId;
    const accessToken = loginResponseData.access_token;
    const refreshToken = loginResponseData.refresh_token;

    if (!userId || !accessToken || !refreshToken) {
      return {
        message:
          "Login successful, but necessary credentials could not be retrieved. Please try again.",
        savedProfessors: [],
        success: false,
      };
    }

    cookieStore.set("user_id", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    const [savedProfessorResponse, appliedProfessorResponse] =
      await Promise.all([
        fetch(
          `http://localhost:8080/saved/repository/get-all-savedId/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ),
        fetch(
          `http://localhost:8080/inprogress/repository/get-all-appliedId/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ),
      ]);

    const [savedProfessorData, appliedProfessorData] = await Promise.all([
      savedProfessorResponse.json(),
      appliedProfessorResponse.json(),
    ]);

    const savedProfessorUI = savedProfessorData.data;
    const appliedProfessorsUI = appliedProfessorData.data;

    return {
      message: "Sucessfully, Redirecting...",
      savedProfessors: savedProfessorUI,
      appliedProfessors: appliedProfessorsUI,
      success: true,
    };
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") throw error;
    if (error.cause && error.cause.code === "ECONNREFUSED") {
      return {
        message: "Could not connect to the authentication server",
        savedProfessors: [],
        appliedProfessors: [],
        success: false,
      };
    }
    return {
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again later.",
      savedProfessors: [],
      appliedProfessors: [],
      success: false,
    };
  }
}
