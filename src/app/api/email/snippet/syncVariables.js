"use server";

export const SyncVariables = async ({
  professorIdArray,
  variableArray,
  access,
}) => {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
    const response = await fetch(
      `${API_BASE}/snippets/sync-variables`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          professorIdArray,
          variableArray,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { data, success: true };
    } else {
      return { message: "Internal Server Error", success: false };
    }
  } catch (err) {
    return { message: "Internal Server Error", success: false };
  }
};
