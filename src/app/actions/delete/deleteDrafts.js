export const DeleteDrafts = async (draftId, userId, professorId, access) => {
  try {
    await Promise.all([
      fetch(`http://localhost:8080/draft/delete-draft/${draftId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${access}`
        }
      }),
      fetch(
        `http://localhost:8080/inprogress/kanban/delete-in-progress/${userId}/${professorId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${access}`
          }
        }
      ),
    ]);
    return;
  } catch {
    return;
  }
};
