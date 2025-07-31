import { Button } from "@/shadcomponents/ui/button";
import { File, Send } from "lucide-react";

export default function FollowUpButton({sendFollowUp, sendFollowUpWithAttachments}) {
  return (
    <>
      <div className = "flex gap-4">
        <Button onClick = {sendFollowUpWithAttachments} className="text-[#448361] bg-[#EDF3EC] rounded-xs cursor-pointer hover:bg-[#D3E6D8]">
          <File />
          <span> Send Email With Attachments</span>
        </Button>
        <Button onClick = {sendFollowUp} className="text-[#D9730D] bg-[#FAEBDD] rounded-xs cursor-pointer hover:bg-orange-200">
          <Send />
          <span>Send Email</span>
        </Button>
      </div>
    </>
  );
}
