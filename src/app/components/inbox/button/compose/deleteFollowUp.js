import { DeleteReply } from "@/app/actions/reply/deleteReply";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteFollowUp({ userId, draftId }) {
  const handleDeleteFollowUp = async () => {
    try {
      await DeleteReply(userId, draftId);
      toast("Deleted Draft Successfully");
    } catch {
      toast("Failed To Delete");
    }
  };

  return (
    <button onClick={handleDeleteFollowUp}>
      <Trash2 className="cursor-pointer" />
    </button>
  );
}
