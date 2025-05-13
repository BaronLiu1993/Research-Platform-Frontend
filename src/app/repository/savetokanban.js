export async function saveToKanban(
    professor_name,
    professor_url,
    professor_research_interests,
    professor_school,
    professor_faculty,
    professor_department,
    comments 
  ) {
    const data = {
      professor_data: {
        name: professor_name || "",
        url: professor_url || "",
        research_interests: professor_research_interests || [""],
        school: professor_school || "",
        faculty: professor_faculty || "",
        department: professor_department || "",
        comments: "", 
      },
    };
  
    try {
      const response = await fetch(
        "http://localhost:8080/kanban/add-in-progress",
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
      console.log("Success:", result);
      return result;
    } catch (error) {
      console.error("Failed to post professor data:", error);
    }
  }
  
