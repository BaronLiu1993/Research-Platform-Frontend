export const SetSeen = async ({ threadId, access }) => {
  try {
    const API_BASE =
      process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
    await fetch(`${API_BASE}/inbox/seen?threadId=${threadId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    return;
  } catch {
    return { success: false, message: "Internal Server Error" };
  }
};
