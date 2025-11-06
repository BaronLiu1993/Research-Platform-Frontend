"use server";

export const SendDrafts = async ({
  userName,
  userEmail,
  professorData,
  access,
}) => {
  try {
    const API_BASE =
      process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
    const response = await fetch(`${API_BASE}/email/send-draft`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({
        userName,
        userEmail,
        professorData,
      }),
    });
    if (response.ok) {
      return { success: true };
    } else {
      return {
        message: "Server Error",
        success: false,
      };
    }
  } catch {
    return { success: false, message: "Internal Server Error" };
  }
};
