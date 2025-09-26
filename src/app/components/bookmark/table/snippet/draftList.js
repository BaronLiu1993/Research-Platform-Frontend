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
  draftData,
  setDraftData, // 🔑 parent setter passed in
  parsedUserProfile,
  access,
}) {
  const [selected, setSelected] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  // 🔹 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const draftsPerPage = 10;
  const indexOfLastDraft = currentPage * draftsPerPage;
  const indexOfFirstDraft = indexOfLastDraft - draftsPerPage;
  const currentDrafts = draftData.slice(indexOfFirstDraft, indexOfLastDraft);
  const totalPages = Math.ceil(draftData.length / draftsPerPage);

  const handleSubmit = async () => {
    if (selected.length === 0) {
      toast("No Drafts Selected to Send");
      return;
    }

    const prevDrafts = [...draftData];

    setDraftData((prev) =>
      prev.filter((d) => !selected.some((sel) => sel.id === d.id))
    );
    setSelected([]);

    try {
      await ExecuteMassSend({
        userName: parsedUserProfile.student_name,
        userEmail: parsedUserProfile.student_email,
        professorData: selected,
        access,
      });
      toast("Drafts Sent");
    } catch {
      setDraftData(prevDrafts); 
      toast("Drafts Failed to Send");
    }
  };

  const handleSubmitWithAttachments = async () => {
    if (selected.length === 0) {
      toast("No Drafts Selected to Send");
      return;
    }

    const prevDrafts = [...draftData];

    setDraftData((prev) =>
      prev.filter((d) => !selected.some((sel) => sel.id === d.id))
    );
    setSelected([]);

    try {
      await ExecuteMassSendWithAttachments({
        userName: parsedUserProfile.student_name,
        userEmail: parsedUserProfile.student_email,
        professorData: selected,
        access,
      });
      toast("Drafts Sent With Attachments!");
    } catch {
      setDraftData(prevDrafts);
      toast("Drafts Failed to Send");
    }
  };

  const handleDeleteDraft = async (draftId, userId, professorId) => {
    const prevDrafts = [...draftData];

    setDraftData((prev) => prev.filter((d) => d.draftId !== draftId));
    setSelected((prev) => prev.filter((item) => item.id !== professorId));

    try {
      await DeleteDrafts(draftId, userId, professorId, access);
      toast("Successfully Deleted");
    } catch {
      setDraftData(prevDrafts); 
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
    if (selected.length === draftData.length) {
      setSelected([]);
      setCheckAll(false);
    } else {
      setSelected(draftData.map(({ id, name, email }) => ({ id, name, email })));
      setCheckAll(true);
    }
  };

  return (
    <div className="w-[50rem] max-w-screen-2xl mx-auto">
      <div className="flex flex-col gap-4">
        <div className="rounded-xs border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50/80 border-b">
            <Checkbox
              checked={selected.length === draftData.length && draftData.length > 0}
              onCheckedChange={handleCheckAll}
            />
            <span className="text-sm font-semibold text-slate-800">Select all</span>
            <span className="text-xs text-slate-500">
              ({selected.length}/{draftData.length})
            </span>
          </div>

          <div className="max-h-full overflow-y-auto divide-y">
            {currentDrafts.length > 0 ? (
              currentDrafts.map((data) => (
                <Dialog key={data.id}>
                  <DialogTrigger className="px-3 py-2 cursor-pointer w-full flex items-center gap-3 hover:bg-slate-50 transition-colors">
                    <Checkbox
                      checked={selected.some((item) => item.id === data.id)}
                      onCheckedChange={() => handleCheck(data.id, data.name, data.email)}
                      onClick={(e) => e.stopPropagation()}
                    />

                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-semibold text-zinc-800 truncate">
                        {data.name}
                      </span>
                      <span className="text-sm font-light text-zinc-500 truncate">
                        {data.email}
                      </span>

                      <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-white bg-[#448361]">
                        <MousePointer className="h-3.5 w-3.5" />
                        <span className="text-[11px]">Editable Draft</span>
                      </span>
                    </div>

                    <div className="flex-1" />

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
                      className="h-7 w-7 p-1 text-zinc-500 hover:bg-red-50 hover:text-red-500 rounded-md"
                      aria-label="Delete draft"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogTitle></DialogTitle>
                    <div className="p-1">
                      <DraftEditor
                        fromName={parsedUserProfile.student_name}
                        fromEmail={parsedUserProfile.student_email}
                        draftId={data.draftId}
                        to={data.email}
                        body={data.body}
                        initialSubject={data.subject}
                        access={access}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ))
            ) : (
              <div className="py-6 px-4">
                <p className="text-sm text-slate-600">No drafts found.</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 py-3 border-t">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                variant="outline"
                size="sm"
              >
                Prev
              </Button>

              <span className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                variant="outline"
                size="sm"
              >
                Next
              </Button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#529CCA] hover:bg-[#4179B8] px-3 py-1.5 rounded-md"
            onClick={handleSubmit}
          >
            <Send className="w-4 h-4" />
            Send Selected
          </Button>

          <Button
            className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#C14C8A] hover:bg-[#A73B75] px-3 py-1.5 rounded-md"
            onClick={handleSubmitWithAttachments}
          >
            <FileSymlink className="w-4 h-4" />
            Send With Attachments
          </Button>
        </div>
      </div>
    </div>
  );
}
