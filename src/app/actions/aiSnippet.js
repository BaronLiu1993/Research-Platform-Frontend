"use server"

export const BuildSnippet = async (userId, style, resumePoints) => {
    const response = await fetch("http://localhost:8000/ai-edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        text: ["{{publication}}, {{labs}}, {{professorLastName}}"],
        style,
        resumePoints
      }),
    });
  
    if (!response.ok) {
      console.error("Failed to fetch snippet");
      return;
    }
  
    const data = await response.json();
    return data
  };
  