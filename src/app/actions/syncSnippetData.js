"use server";

export const SyncSnippetData = async ({
  professorIdArray,
  variableArray,
  access,
}) => {
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

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Failed");
  }
};
