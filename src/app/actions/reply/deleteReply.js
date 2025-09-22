export const DeleteReply = async (draftId, access) => {
  try {
    const response = await fetch(
      `http://localhost:8080/draft/delete-follow-up-draft/${draftId}`,
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
