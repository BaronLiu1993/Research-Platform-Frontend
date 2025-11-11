export const GenerateVariablelessDrafts = async ({
  snippetId,
  fromName,
  fromEmail,
  emailContents,
  access,
}) => {
  try {
    const API_BASE =
      process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";

    const response = await fetch(
      `${API_BASE}/email/create-variableless-draft`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          emailContents: emailContents,
          baseBody: {
            snippetId,
            fromName,
            fromEmail,
          },
        }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      return { data: result, success: true };
    } else {
      return {
        message: "Server Error",
        success: false,
      };
    }
  } catch {
    return { success: false, message: "Internal Server Error" };
  }
};
