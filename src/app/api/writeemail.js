import axios from "axios"

export default async function WriteEmail ({ formData}) {
    if (!formData) {
        console.log("Please Input Valid Formdata")
    }
    try {
        const response = await axios.post("http://127.0.0.1:8000/email/write", formData)
        return response
    } catch (e) {
        console.error(`Error Message: ${e}`)
    }
}