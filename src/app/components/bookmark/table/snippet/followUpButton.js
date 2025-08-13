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
          className="text-sm cursor-pointer font-main text-[#f6f6f7] font-medium flex items-center gap-1  bg-[#4584F3] px-3 py-1.5 hover:bg-[#3574E2] transition-colors rounded-sm"
        >
          <Send />
          <span>Send Email</span>
        </Button>
        <Button
          onClick={sendFollowUpWithAttachments}
          className="
        text-sm cursor-pointer font-main font-medium 
        flex items-center gap-1 
        text-[#f6f6f7] 
        bg-[#e49a1b] 
        px-3 py-1.5 
        hover:bg-[#D97706] 
        transition-colors 
        rounded-sm
      "
        >
          <File />
          <span> Send With Attachments</span>
        </Button>
        
      </div>
    </>
  );
}
