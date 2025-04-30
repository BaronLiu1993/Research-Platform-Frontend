import axios from 'axios';

export default async function ParseResume(pdfFile, keywordsObj) {
  try {
    console.log("Received keywords:", keywordsObj);
    const keywords_str = keywordsObj.join(", ")
    console.log(keywords_str)
    const formData = new FormData();
    formData.append('file', pdfFile); 
    formData.append('keywords', keywords_str); 
    const response = await axios.post('http://127.0.0.1:8000/resume/analyse', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
