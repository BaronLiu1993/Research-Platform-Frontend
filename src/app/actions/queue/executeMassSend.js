"use server";

export const ExecuteMassSend = async (
  userId,
  userName,
  userEmail,
  professorData,
  access,
) => {
  try {
    const response = await fetch("http://localhost:8080/send/mass-send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access}`
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
