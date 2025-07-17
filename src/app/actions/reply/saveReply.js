"use server";

export async function SaveReply(data, userId, professorId, threadId) {
  try {
    const response = await fetch(
      `http://localhost:8080/draft/update-follow-up-draft/${userId}/${professorId}/${threadId}`,
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
