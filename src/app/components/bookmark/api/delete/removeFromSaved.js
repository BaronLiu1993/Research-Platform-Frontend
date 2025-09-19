"use server";

export async function RemoveFromSaved({professor_id, access}) {
  try {
    const response = await fetch(
      `http://localhost:8080/saved/kanban/remove-saved/${professor_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access}`
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
