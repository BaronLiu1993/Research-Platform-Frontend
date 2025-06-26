export const saveDraft = async (data, student_id, professor_id) => {
  console.log(data.body)
  console.log(data.subject)
  try {
    const response = await fetch(`http://localhost:8080/gmail/update-draft/${student_id}/${professor_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "jiexuan.liu@mail.utoronto.ca",
        fromName: "Jie Xuan Liu",
        fromEmail: "baronliu1993@gmail.com",
        subject: data.subject,
        body: data.body
      })
    });
  } catch (error) {
    console.log(error)
  }
};