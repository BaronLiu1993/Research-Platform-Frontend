export const CreateReply = async (
  data,
  professorId,
  threadId,
  access
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/draft/create-follow-up-draft/${professorId}/${threadId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {

    }
  } catch {

  }
};
