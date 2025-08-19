"use server";

export const ExecuteMassSendWithAttachments = async (
  userId,
  userName,
  userEmail,
  professorData
) => {
  try {
    const response = await fetch("http://localhost:8080/send/mass-send-with-attachments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        userName,
        userEmail,
        professorData,
      }),
    });
    const data = await response.json();
    return data;
  } catch {
    return "Error";
  }
};
