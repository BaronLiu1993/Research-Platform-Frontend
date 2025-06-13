import { Trash2 } from "lucide-react";

export default function DeleteFollowUp({ userId, professorId }) {
  const handleDeleteFollowUp = async () => {
    try {
      const response = await fetch(`http://localhost:8080/gmail/delete-follow-up-draft/${userId}/${professorId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch {}
  };
  return (
    <>
      <div onClick = {handleDeleteFollowUp}>
        <Trash2 className="h-4 w-4 hover:text-red-500" />
      </div>
    </>
  );
}
