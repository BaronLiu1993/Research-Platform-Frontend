"use server";

//Filetype is either resume or transcript
export async function DeleteFile({ access, fileName, fileType }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";
  // put in the file and upload
  console.log(fileType)
  console.log(fileName)
  const encodedFileName = encodeURIComponent(fileName);

  try {
    const response = await fetch(
      `${API_BASE}/storage/delete-file/${fileType}/${encodedFileName}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    
    if (response.ok) {
      return { success: true };
    }
  } catch {
    return { message: "Internal Server Error", success: false };
  }
}
