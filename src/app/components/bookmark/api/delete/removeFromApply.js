"use server";

export async function RemoveFromApply({professor_id, access}) {
  try {
    const response = await fetch(
      `http://localhost:8080/inprogress/kanban/delete-in-progress/${user_id}/${professor_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access}`
        },
      }
    );
  } catch (error) {
    console.log(error)
  }
}
