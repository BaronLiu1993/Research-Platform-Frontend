"use server";

export async function AddToSaved({ professorData, access, id }) {
  const data = {
    name: professorData.name || "",
    url: professorData.url || "",
    email: professorData.email || "",
    research_interests: professorData.research_interests || [""],
    school: professorData.school || "",
    faculty: professorData.faculty || "",
    department: professorData.department || "",
    labs: professorData.labs || "",
    lab_url: professorData.lab_url || "",
  };
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  try {
    const response = await fetch(`${API_BASE}/saved/kanban/add-saved/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch {
    return { success: false, message: "Internal Server Error" };
  }
}
