export const DeleteDrafts = async (draftId, userId, professorId) => {
  try {
    await Promise.all([
      fetch(`http://localhost:8080/draft/delete-draft/${draftId}`, {
        method: "DELETE",
      }),
      fetch(
        `http://localhost:8080/inprogress/kanban/delete-in-progress/${userId}/${professorId}`,
        {
          method: "DELETE",
        }
      ),
    ]);
  } catch {
    return;
  }
};
