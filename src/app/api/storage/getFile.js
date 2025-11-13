"use server";

//Filetype is either resume or transcript
export async function getFile({ access, fileName, fileType }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  // put in the file and upload
  try {
    const response = await fetch(
      `${API_BASE}/storage/get-file-url?fileType=${fileType}&fileName=${fileName}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    const urlRes = await response.json();
    if (response.ok) {
      return { urlData: urlRes, success: true };
    }
  } catch {
    return { message: "Internal Server Error", success: false };
  }
}
