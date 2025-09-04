"use server";

export const SyncFollowUpSnippetData = async (
  userId,
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
        variableArray, // check if the totalprofessorData is the right stuff and then i will keep going and trying to get the threadIds integrated into it
      }),
    }
  );

  if (!response.ok) {
    return;
  }

  const data = await response.json();
  return data;
};
