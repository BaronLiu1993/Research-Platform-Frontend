"use server";


export async function AddToSaved({ professorData, access }) {
  const data = {
    name: professorData.professor_name || "",
    url: professorData.professor_url || "",
    email: professorData.professor_email || "",
    research_interests: professorData.professor_research_interests || [""],
    school: professorData.professor_school || "",
    faculty: professorData.professor_faculty || "",
    department: professorData.professor_department || "",
    labs: professorData.professor_labs || "",
    lab_url: professorData.professor_lab_url || "",
  };
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  try {
    const response = await fetch(
      `${API_BASE}/${professor_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch {
    throw new Error();
  }
}
