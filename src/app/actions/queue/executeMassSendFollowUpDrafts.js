"use server";

export const ExecuteMassSendFollowUpDrafts = async (
  userId,
  userName,
  userEmail,
  professorData
) => {
  try {
    const response = await fetch("http://localhost:8080/send/mass-send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        userName,
        userEmail: "jiexuan.liu@mail.utoronto.ca",
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
