export const BuildSnippet = async (userId) => {
    const response = await fetch("http://localhost:8000/ai-edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        text: "/{{studentName}}, /{{professorName}}",
        style: "engineering"
      }),
    });
  
    if (!response.ok) {
      console.error("Failed to fetch snippet");
      return;
    }
  
    const data = await response.json();
    return data
  };
  