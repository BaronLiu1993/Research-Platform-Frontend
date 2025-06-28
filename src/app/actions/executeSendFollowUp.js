"use server"

export const executeSendFollowUp = async (userId, draftId, trackingId) => {
    try {
        const response = await fetch(`http://localhost:8080/gmail/send-follow-up/${userId}/${draftId}/${trackingId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (err) {
        console.log(err)
    }
}