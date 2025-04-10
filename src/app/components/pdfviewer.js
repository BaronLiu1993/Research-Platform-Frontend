
export default function handleFileUpload (e) {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
        const fileURL = URL.createObjectURL(file);
    } else {
        alert('Please upload a valid PDF file');
    };
};