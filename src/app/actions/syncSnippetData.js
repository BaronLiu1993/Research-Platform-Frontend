"use server";

export const SyncSnippetData = async (
  userId,
  professorIdArray,
  variableArray,
  access
) => {
  const response = await fetch(
    `http://localhost:8080/snippets/sync-fetchable-variables`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access}`
      },
      body: JSON.stringify({
        professorIdArray,
        variableArray,
      }),
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch snippet");
    return;
  }

  const data = await response.json();
  return data;
};
