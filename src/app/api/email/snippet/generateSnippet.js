export const GenerateSnippet = async ({
  snippet_html,
  snippet_subject,
  access,
}) => {
  try {
    const API_BASE =
      process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
    const response = await fetch(`${API_BASE}/snippets/insert-snippet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({
        snippet_html,
        snippet_subject,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return { success: true, snippetId: data.snippetId };
    } else {
      return {
        message: "Server Error",
        success: false,
      };
    }
  } catch {
    return { message: "Internal Server Error", success: false };
  }
};
