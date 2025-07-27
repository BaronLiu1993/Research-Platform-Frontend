export const UploadTranscript = async (file, userId) => {
    try {
        const formData = new FormData();
        formData.append("file", file)
        const response = await fetch(`http://localhost:8080/storage/upload-transcript-links/${userId}`, {
            method: "POST",
            body: formData
        })
        const data = await response.json()
        return data
    } catch {
        return { success: false}
    }
}