"use server"

export const GenerateSnippet = async (userId, snippet_html, snippet_subject) => {
    const response = await fetch(`http://localhost:8080/snippets/insert/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snippet_html,
        snippet_subject
      }),
    });
  
    if (!response.ok) {
      console.error("Failed to fetch snippet");
      return;
    }
  
    const data = await response.json();
    return data
  };
  