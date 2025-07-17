"use server";

export async function RemoveFromApply(user_id, professor_id) {
  try {
    const response = await fetch(
      `http://localhost:8080/inprogress/kanban/delete-in-progress/${user_id}/${professor_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error)
  }
}
