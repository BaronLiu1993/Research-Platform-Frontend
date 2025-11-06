"use server";

export const SendReply = async ({
  userName,
  userEmail,
  professorEmail,
  professorName,
  body,
  subject,
  messageId,
  access,
  threadId,
}) => {
  try {
    const API_BASE =
      process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
    const response = await fetch(
      `${API_BASE}/reply/send-reply?messageId=${messageId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          userEmail,
          userName,
          professorEmail,
          professorName,
          body,
          subject,
          threadId,
        }),
      }
    );
    if (response.ok) {
      return { message: "Success", success: true };
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
