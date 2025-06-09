export const handleCreateDraft = async (to, from, subject, body, professor_id, student_id) => {
    const dataJSON = {
      to: "jiexuan.liu@mail.utoronto.ca",
      fromEmail: "baronliu1993@gmail.com",
      fromName: "Jie Xuan Liu",
      subject: subject,
      message: body,
    };
  
    try {
      const response = await fetch(
        `http://localhost:8080/gmail/create-draft/${student_id}/${professor_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataJSON),
        }
      );
  
      if (!response.ok) {
        // Try to parse backend error message
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to create draft:", errorData.message || response.statusText);
        throw new Error(errorData.message || "Failed to create draft.");
      }
  
      const result = await response.json();
      console.log("Draft created successfully:", result.draftId);
      return result.draftId;
  
    } catch (error) {
      console.error("Error creating draft:", error.message || error);
      return null; 
    }
  };
  