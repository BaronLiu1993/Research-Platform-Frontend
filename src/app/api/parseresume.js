import axios from 'axios'

export default async function parseresume (pdfFile) {
    try {
        const response = await axios.post('localhost:3000/resume/get-parse/')
        return response.data
    } catch (error) {
        return console.error(error)
    }
}