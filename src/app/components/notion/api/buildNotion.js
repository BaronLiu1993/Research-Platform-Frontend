export async function BuildNotion (parsedResume, userId) {
    const resumeObj = {
        resume: parsedResume
    }
    try {
        const response = await fetch(`http://localhost:8080/notion/create-page/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resumeObj)
        })
        const responseMessage = await response.json()
        console.log(responseMessage)

        return responseMessage
    } catch (err) {
        console.log(err)
    }
}