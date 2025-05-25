"use server";

export async function removeFromKanban(professor_id, user_id) {
  try {
    const response = await fetch(
      `http://localhost:8080/kanban/remove-in-complete/${user_id.value}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ professor_id }),
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
