"use server";

export async function removeFromSaved(user_id, professor_id) {
  try {
    const response = await fetch(
      `http://localhost:8080/kanban/delete-in-complete/${user_id}/${professor_id}`,
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
