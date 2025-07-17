export const CreateReply = async (data, userId, professorId, threadId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/draft/create-follow-up-draft/${userId}/${professorId}/${threadId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
  } catch {}
};
