"use server";

export const ExecuteMassSend = async (
  userId,
  userEmail,
  userName,
  professorData
) => {
  try {
    const response = await fetch("http://localhost:8080/gmail/mass-send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        userEmail,
        userName,
        professorData,
      }),
    });
    const data = await response.json();
    return data;
  } catch {
    return "Error";
  }
};
