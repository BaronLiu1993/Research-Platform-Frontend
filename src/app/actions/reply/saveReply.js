"use server";

export async function SaveReply(data, professorId, threadId, access) {
  console.log(threadId, professorId)
  try {
    const response = await fetch(
      `http://localhost:8080/draft/update-follow-up-draft/${professorId}/${threadId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(data),
      }
    );

    
  } catch (err) {
    console.log(err);
  }
}
