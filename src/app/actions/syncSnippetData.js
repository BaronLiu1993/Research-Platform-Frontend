"use server";

export const SyncSnippetData = async (
  professorIdArray,
  variableArray,
  access
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/snippets/sync-fetchable-variables`,
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

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    return data;
  } catch {
    throw new Error("Failed")
  }
};
