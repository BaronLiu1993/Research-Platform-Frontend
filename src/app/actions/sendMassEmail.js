export const SendMassEmail = async (data) => {
    const response = await fetch(`http://localhost:8080/gmail/snippet-send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        snippetId: "c1dc9ce7-cf68-4b82-8ea6-f1e3bae335ec",
        dynamicFields: {
          professorName: "Dr. Smith",
          studentName: "Baron",
          School: "University of Toronto"
        },
        to: "jiexuan.liu@mail.utoronto.ca",
        fromName: "Baron Liu",
        fromEmail: "baronliu1993@gmail.com"
      }),
    });
  
    const result = await response.json();
    return result;
  };
  