export const DeleteReply = async (userId, draftId, access) => {
  try {
    const response = await fetch(
      `http://localhost:8080/draft/delete-follow-up-draft/${userId}/${draftId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
