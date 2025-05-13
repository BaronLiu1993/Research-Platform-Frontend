export async function saveToKanban(
    professor_id,
    professor_name,
    professor_url,
    professor_research_interests,
    professor_school,
    professor_faculty,
    professor_department,
    user_id,
    comments 
  ) {
    
    const data = {
      professor_data: {
        id: professor_id || null,
        name: professor_name || "",
        url: professor_url || "",
        research_interests: professor_research_interests || [""],
        school: professor_school || "",
        faculty: professor_faculty || "",
        department: professor_department || "",
        comments: comments || "", 
      },
    };  
    try {
      const response = await fetch(
        `http://localhost:8080/kanban/add-in-progress/${user_id.value}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Failed to post professor data:", error);
    }
  }
  
