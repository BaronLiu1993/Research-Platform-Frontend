"use server";

export const SendDrafts = async ({
  userName,
  userEmail,
  professorData,
  access,
  labelId,
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
        labelId,
      }),
    });
    if (response.ok) {
      return { success: true, message: "Sent Draft" };
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
