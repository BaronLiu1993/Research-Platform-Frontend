export const ScheduleFollowUp = async (
  userId,
  userName,
  userEmail,
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
        userName,
        userEmail,
        professorData,
      }),
    });
    if (!response.ok) {
      return { success: false };
    }

    return { success: true };
  } catch {
    return { success: false };
  }
};
