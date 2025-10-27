"use server";

export const changeStatus = async ({ access, status, id }) => {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  try {
    const response = await fetch(
      `${API_BASE}/saved/kanban/change-status/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    return "Internal Server Error";
  }
};
