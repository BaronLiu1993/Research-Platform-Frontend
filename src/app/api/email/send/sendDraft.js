"use server";

export const SendDrafts = async ({
  userName,
  userEmail,
  professorData,
  access,
}) => {
  try {
    const response = await fetch("http://localhost:8080/send/send-draft", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({
        userName,
        userEmail,
        professorData,
      }),
    });
    console.log(response.ok)
    if (response.ok) {
      return { sucess: true };
    } else {
      return {
        message: "Server Error",
        sucess: false,
      };
    }
  } catch {
    return { sucess: false, message: "Internal Server Error" };
  }
};
