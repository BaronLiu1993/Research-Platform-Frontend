import axios from "axios";

export async function fetchRepositoryData() {
    try {
        const response = await axios.get('http://localhost:8080/Taishan/');
        return response.data
    } catch (error) {
        console.error(error)
    } 
}