"use server";

export const ExecuteMassFollowUpDraftsWithAttachments = async (
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
        userEmail: "baronliu1993@gmail.com",
        professorData,
      }),
    });
    const data = await response.json();
    console.log(data)
    return data;
  } catch {
    return "Error";
  }
};
