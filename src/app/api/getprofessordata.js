export default async function getProfessorData({ url }) {
    if (!url) {
        console.error('URL is required');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/professor/get-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: url }),  
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error('Error details:', errorDetails);  
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;  

    } catch (error) {
        console.error('Error fetching professor data:', error);
        throw error; 
    }
}
