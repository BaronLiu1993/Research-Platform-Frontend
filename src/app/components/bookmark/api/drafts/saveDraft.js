export const saveDraft = async (data, draftId, access) => {
  try {
    const response = await fetch(
      `http://localhost:8080/draft/update-draft/${draftId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          to: data.to,
          fromName: data.fromName,
          fromEmail: data.fromEmail,
          subject: data.subject,
          body: data.body,
        }),
      }
    );
    const updatedState = response.json();
    return updatedState;
  } catch (error) {
    console.log(error);
  }
};
