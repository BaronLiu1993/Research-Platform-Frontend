"use server";

export const ExecuteMassSendWithAttachments = async (
  userName,
  userEmail,
  professorData,
  access
) => {
  try {
    const response = await fetch(
      "http://localhost:8080/send/mass-send-with-attachments",
      {
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
      }
    );
    const data = await response.json();
    return data;
  } catch {
    return "Error";
  }
};
