import { DeleteFollowUpDraft } from "@/app/actions/deleteFollowUpDraft";
import { Trash2 } from "lucide-react";

export default function DeleteFollowUp({ userId, draftId }) {
  const handleDeleteFollowUp = async () => {
    const response = await DeleteFollowUpDraft(userId, draftId)
  };

  return (
    <>
      <button onClick = {handleDeleteFollowUp} >
        <Trash2 className="h-4 w-4 hover:text-red-500 cursor-pointer" />
      </button>
    </>
  );
}
