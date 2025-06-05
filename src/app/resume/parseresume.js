export default async function ParseResume(pdfFile) {
  try {
    const formData = new FormData();
    formData.append('file', pdfFile);

    const response = await fetch('http://127.0.0.1:8000/resume/analyse', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message || 'Something went wrong' };
  }
}
