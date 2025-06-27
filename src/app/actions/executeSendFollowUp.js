"use server"

export const executeSendFollowUp = async (draftId) => {
    const response = await fetch(`http://localhost:8080/gmail/resume-follow-up-draft/${draftId}`)
}