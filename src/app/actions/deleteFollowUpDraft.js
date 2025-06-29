export const DeleteFollowUpDraft = async (draftId) => {
  try {
    const response = await fetch(`http://localhost:8080/gmail/delete-reply-draft/${draftId}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err)
  }
};
