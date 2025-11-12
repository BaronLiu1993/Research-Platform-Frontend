"use server";

//Filetype is either resume or transcript
export async function uploadFile({ file, access, fileName, fileType }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";

  try {
    const response = await fetch(`${API_BASE}/storage/generate-upload-url`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: fileName,
        fileType: fileType, //Either resume or transcript
      }),
    });
    const urlData = await response.json();
    if (response.ok) {
      const uploadRes = await fetch(urlData.url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
    }
  } catch {
    return "Internal Server Error";
  }
}
