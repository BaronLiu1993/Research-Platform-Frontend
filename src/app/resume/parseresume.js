import axios from 'axios';

export default async function ParseResume(pdfFile) {
  try {
    const formData = new FormData();
    formData.append('file', pdfFile); 
    const response = await axios.post('http://127.0.0.1:8000/resume/analyse', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    return error
  }
}
