export const UploadTranscript = async (file, userId, access) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(
      `http://localhost:8080/storage/upload-transcript-links/${userId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
        },
        body: formData,
      }
    );
    if (response.ok) {
      return { success: true };
    }
  } catch {
    return { success: false };
  }
};
