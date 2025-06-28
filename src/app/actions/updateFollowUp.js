"use server";

export async function saveDraftToServer(data, userId, professorId, threadId) {
  console.log(data);
  const response = await fetch(
    `http://localhost:8080/gmail/update-follow-up-draft/${userId}/${professorId}/${threadId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) throw new Error("Failed to save draft");

  return { status: "ok" };
}
