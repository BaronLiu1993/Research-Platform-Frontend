"use server";

export const SyncFollowUpSnippetData = async (
  totalProfessorData,
  variableArray,
  access
) => {
  const response = await fetch(
    `http://localhost:8080/snippets/sync-fetchable-variables/follow-up`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({
        professorIdArray: totalProfessorData,
        variableArray,
      }),
    }
  );

  if (!response.ok) {
    return;
  }

  const data = await response.json();
  return data;
};
