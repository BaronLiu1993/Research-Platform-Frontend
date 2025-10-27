"use server";

export async function RemoveFromSaved({ id, access }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  try {
    const response = await fetch(`${API_BASE}/saved/kanban/remove-saved/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    return "Internal Server Error"
  }
}
