"use server"

export const CreateReply = async ({
  professorName,
  professorEmail,
  professorId,
  threadId,
  access
}) => {
  try {
    const response = await fetch(
      `http://localhost:8080/draft/create-follow-up-draft/${professorId}/${threadId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          professorName,
          professorEmail,
        }),
      }
    );

    if (response.ok) {
      
    }
  } catch {}
};
