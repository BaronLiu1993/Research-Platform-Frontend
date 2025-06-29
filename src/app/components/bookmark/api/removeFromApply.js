"use server";

export async function removeFromApply(user_id, professor_id) {
  try {
    const response = await fetch(
      `http://localhost:8080/kanban/delete-in-progress/${user_id}/${professor_id}`,
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
