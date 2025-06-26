"use server";

export const SyncSnippetData = async (
  userId,
  professorIdArray,
  variableArray
) => {
  const response = await fetch(
    `http://localhost:8080/sync-fetchable-variables/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
