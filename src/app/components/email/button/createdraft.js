export const handleCreateDraft = async (to, from, subject, body, professor_id, student_id) => {
    const dataJSON = {
        to: to,
        from: from,
        subject: subject,
        body: body,
        professor_id: professor_id,
        student_id: student_id
    }
    try {
        const response = await fetch("", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataJSON)
        })
    } catch {
        
    }
}