export const handleAutoSave = async (subject, body, student_id, professor_id) => {
  try {
    const response = await fetch(`http://localhost:8080/gmail/update-draft/${student_id}/${professor_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: subject,
        body: body
      })
    });
  } catch (error) {}
};
