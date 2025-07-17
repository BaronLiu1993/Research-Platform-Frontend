export const DeleteReply = async (userId, draftId) => {
  try {
    const response = await fetch(`http://localhost:8080/gmail/delete-follow-up-draft/${userId}/${draftId}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err)
  }
};
