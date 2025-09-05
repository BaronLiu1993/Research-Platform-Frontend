"use client";

import { useState } from "react";
import { Checkbox } from "@/shadcomponents/ui/checkbox";
import { FileSymlink, MousePointer, Send, Trash2 } from "lucide-react";
import { ExecuteMassSend } from "@/app/actions/queue/executeMassSend";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/shadcomponents/ui/composedialog";
import DraftEditor from "./drafteditor";
import { Button } from "@/shadcomponents/ui/button";
import { DeleteDrafts } from "@/app/actions/delete/deleteDrafts";
import { ExecuteMassSendWithAttachments } from "@/app/actions/queue/executeMassSendWithAttachments";
import { toast } from "sonner";

export default function DraftList({
  draftData: initialData,
  parsedUserProfile,
  access,
}) {
  console.log(parsedUserProfile)
  const [draftData, setDraftData] = useState(initialData);
  const [selected, setSelected] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  const handleSubmit = async () => {
    if (selected.length === 0) {
      toast("No Drafts Selected to Send");
    } else {
      try {
        await ExecuteMassSend(
          parsedUserProfile.user_id,
          parsedUserProfile.student_name,
          parsedUserProfile.student_email,
          selected,
          access
        );
        toast("Drafts Sent");
      } catch {
        toast("Drafts Failed to Send");
      }
    }
  };

  const handleSubmitWithAttachments = async () => {
    if (selected.length === 0) {
      toast("No Drafts Selected to Send");
    } else {
      try {
        await ExecuteMassSendWithAttachments(
          parsedUserProfile.user_id,
          parsedUserProfile.student_name,
          parsedUserProfile.student_email,
          selected,
          access
        );
        toast("Drafts Sent With Attachments!");
      } catch {
        toast("Drafts Failed to Send");
      }
    }
  };

  const handleDeleteDraft = async (draftId, userId, professorId) => {
    try {
      await DeleteDrafts(draftId, userId, professorId, access);
      setDraftData((prev) => prev.filter((d) => d.draftId !== draftId));
      setSelected((prev) => prev.filter((item) => item.id !== professorId));
      toast("Successfully Deleted");
    } catch {
      toast("Failed to Delete");
    }
  };

  const handleCheck = (id, name, email) => {
    setSelected((prev) => {
      const exists = prev.some((item) => item.id === id);
      return exists
        ? prev.filter((item) => item.id !== id)
        : [...prev, { id, name, email }];
    });
  };

  const handleCheckAll = () => {
    if (checkAll) {
      setSelected([]);
    } else {
      setSelected(
        draftData.map(({ id, name, email }) => ({ id, name, email }))
      );
    }
    setCheckAll(!checkAll);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center gap-2 p-2 border-1">
          <Checkbox checked={checkAll} onCheckedChange={handleCheckAll} />
          <span className="text-sm font-semibold">Select All</span>
        </div>
        <div className="border-1">
          {draftData.length > 0 ? (
            draftData.map((data) => (
              <Dialog key={data.id}>
                <DialogTrigger
                  className="p-2 cursor-pointer border-b w-full flex items-center justify-between gap-2 
                             hover:bg-zinc-50 transition-colors duration-150"
                >
                  <Checkbox
                    checked={selected.some((item) => item.id === data.id)}
                    onCheckedChange={() =>
                      handleCheck(data.id, data.name, data.email)
                    }
                    onClick={(e) => e.stopPropagation()}
                  />

                  <div className="flex gap-2 items-center">
                    <span className="text-sm font-semibold text-zinc-800">
                      {data.name}
                    </span>
                    <span className="text-sm font-light text-zinc-500">
                      {data.email}
                    </span>
                    <div className="bg-[#448361] flex gap-1 items-center px-2 py-0.5 rounded-xs text-white">
                      <MousePointer className="h-3.5 w-3.5" />
                      <span className="text-xs">Editable Draft</span>
                    </div>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDraft(
                        data.draftId,
                        parsedUserProfile.user_id,
                        data.id,
                        access
                      );
                    }}
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-6 w-6 p-1 text-zinc-500 hover:bg-red-50 hover:text-red-500 rounded-xs transition-colors duration-150 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogTitle></DialogTitle>
                  <DraftEditor
                    fromName={parsedUserProfile.student_name}
                    fromEmail={parsedUserProfile.student_email}
                    draftId={data.draftId}
                    to={data.email}
                    body={data.body}
                    initialSubject={data.subject}
                    access={access}
                  />
                </DialogContent>
              </Dialog>
            ))
          ) : (
            <div className="font-sans text-sm p-4 font-light">
              No Drafts Found
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          className="text-sm cursor-pointer font-medium text-white bg-[#529CCA] px-3 py-1.5 hover:bg-[#4179B8] transition-colors rounded-xs"
          onClick={handleSubmit}
        >
          <Send className="w-4 h-4" />
          Send Selected
        </Button>

        <Button
          className="text-sm cursor-pointer font-medium flex items-center gap-1 text-[#f6f6f7] bg-[#C14C8A] px-3 py-1.5 hover:bg-[#A73B75] transition-colors rounded-xs"
          onClick={handleSubmitWithAttachments}
        >
          <FileSymlink />
          Send With Attachments
        </Button>
      </div>
    </div>
  );
}
