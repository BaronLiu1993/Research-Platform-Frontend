"use server";

export async function AIEditDraft(userId, professorId, command, sentence) {
  try {
    const response = await fetch(`http://localhost:8000/ai-edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        professorId,
        command, 
        sentence
      }),
    });
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error);
  }
}
