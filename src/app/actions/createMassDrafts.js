export const createMassDrafts = async (userId, snippetId, fromName, fromEmail, dynamicFields) => {
  const response = await fetch(
    `http://localhost:8080/gmail/snippet-create-draft`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        dynamicFields,
        baseBody: {
          snippetId,
          fromName,
          fromEmail
        },
      }),
    }
  );

  const result = await response.json();
  console.log(result)
  return result;
};
