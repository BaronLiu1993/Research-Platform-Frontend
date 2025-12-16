export const SetSeen = async ({threadId}) => {
    try {
      const API_BASE =
        process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  
      const response = await fetch(
        `${API_BASE}/inbox/seen?threadId=${threadId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          }
        }
      );
  
      if (response.ok) {
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
  