import { Button } from "@/shadcomponents/ui/button";
import { File, Send, Loader2 } from "lucide-react";

export default function FollowUpButton({
  sendFollowUp,
  sendFollowUpWithAttachments,
  isDisabled,
  isDisabledAttachments,
}) {
  return (
    <div className="flex gap-4 font-main">
      {!isDisabledAttachments && (
        <Button
          onClick={sendFollowUp}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-busy={isDisabled}
          className="text-sm cursor-pointer font-medium text-white bg-[#529CCA] px-3 py-1.5 hover:bg-[#4179B8] transition-colors rounded-md"
        >
          {isDisabled ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send />
              <span>Send Follow Up</span>
            </span>
          )}
        </Button>
      )}

      {!isDisabled && (
        <Button
          onClick={sendFollowUpWithAttachments}
          disabled={isDisabledAttachments}
          aria-disabled={isDisabledAttachments}
          aria-busy={isDisabledAttachments}
          className="text-sm cursor-pointer font-medium flex items-center gap-2 text-[#f6f6f7] bg-[#C14C8A] px-3 py-1.5 hover:bg-[#A73B75] transition-colors rounded-md"
        >
          {isDisabledAttachments ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending...
            </span>
          ) : (
            <>
              <File />
              <span>Send With Attachments</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
}
