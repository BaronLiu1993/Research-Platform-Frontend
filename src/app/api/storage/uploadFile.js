"use server";

//Filetype is either resume or transcript
export async function uploadFile({ file, access, fileName, fileType }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  // put in the file and upload
  try {
    const response = await fetch(
      `${API_BASE}/storage/generate-upload-url/${fileType}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: fileName, 
          fileType: fileType, 
        }),
      }
    );
    const urlRes = await response.json();
    if (response.ok) {
      const uploadRes = await fetch(`${urlRes.urlData.signedUrl}`, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (uploadRes.ok) {
        return { message: "Added Successfully", success: true };
      }
    }
  } catch {
    return { message: "Internal Server Error", success: false };
  }
}
