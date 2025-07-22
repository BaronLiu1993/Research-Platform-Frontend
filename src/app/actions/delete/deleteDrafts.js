export const DeleteDrafts = async () => {
    try {
        const response = await fetch("/delete-draft/:userId/:professorId", {
            method: "DELETE"
        })
    } catch {
        
    }
}