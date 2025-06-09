"use server";

export async function removeFromSaved(professor_id, user_id) {
  try {
    const response = await fetch(
      `http://localhost:8080/kanban/remove-saved/${user_id}/${professor_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to post professor data:", error);
  }
}
