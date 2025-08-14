import { Button } from "@/shadcomponents/ui/button";
import { File, Send } from "lucide-react";

export default function FollowUpButton({
  sendFollowUp,
  sendFollowUpWithAttachments,
}) {
  return (
    <>
      <div className="flex gap-4 font-main">
        <Button
          onClick={sendFollowUp}
          className="text-sm cursor-pointer font-medium text-white bg-[#529CCA] px-3 py-1.5 hover:bg-[#4179B8] transition-colors rounded-xs"
        >
          <Send />
          <span>Send Follow Up</span>
        </Button>
        <Button
          onClick={sendFollowUpWithAttachments}
          className="text-sm cursor-pointer font-medium flex items-center gap-1 text-[#f6f6f7] bg-[#C14C8A] px-3 py-1.5 hover:bg-[#A73B75] transition-colors rounded-xs"
        >
          <File />
          <span> Send With Attachments</span>
        </Button>
      </div>
    </>
  );
}
