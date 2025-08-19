export const GenerateSnippet = async (
  userId,
  snippet_html,
  snippet_subject,
  access
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/snippets/insert/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          snippet_html,
          snippet_subject,
        }),
      }
    );
    if (response.ok) {
      const snippetId = await response.json()
      return { success: true, snippetId: snippetId };
    } else {
      return {
        success: false,
      };
    }
  } catch {
    return { success: false };
  }
};
