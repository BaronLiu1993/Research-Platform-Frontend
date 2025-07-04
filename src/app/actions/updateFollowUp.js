"use server";

export async function saveDraftToServer(data, userId, professorId, threadId) {
  console.log(data);
  try {
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
    
    return { status: "ok" };
  } catch (err) {
    console.log(err)
  }
}
