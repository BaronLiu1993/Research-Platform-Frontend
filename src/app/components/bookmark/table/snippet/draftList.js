"use client";

import { useState } from "react";
import { Checkbox } from "@/shadcomponents/ui/checkbox";
import { Calendar, Send, Trash2 } from "lucide-react";

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

export default function DraftList({ draftData, parsedUserProfile }) {
  const [selected, setSelected] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  console.log(draftData);

  const handleSubmit = async () => {
    const response = await ExecuteMassSend(
      parsedUserProfile.user_id,
      `${parsedUserProfile.student_firstname} ${parsedUserProfile.student_lastname}`,
      parsedUserProfile.student_email,
      selected
    );
  };

  const handleSendFollowUp = async () => {
    const response = await ScheduleFollowUp(
      parsedUserProfile.user_id,
      `${parsedUserProfile.student_firstname} ${parsedUserProfile.student_lastname}`,
      parsedUserProfile.student_email,
      selected
    );
  };

  const handleDeleteDraft = async (draftId, userId, professorId) => {
    await DeleteDrafts(draftId, userId, professorId);
  };

  const handleCheck = (id, name, email) => {
    setSelected((prev) => {
      const exists = prev.some((item) => item.id === id);
      if (exists) {
        return prev.filter((item) => item.id !== id);
      }
      return [...prev, { id, name, email }];
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
        <div className="flex items-center gap-2 p-2 border-b">
          <Checkbox checked={checkAll} onCheckedChange={handleCheckAll} />
          <span className="text-sm font-semibold">Select All</span>
        </div>
        {draftData.map((data) => (
          <Dialog key={data.id}>
            <DialogTrigger className="p-2 border-b w-full flex items-center justify-between gap-2 hover:bg-[#F1F1EF]">
              <Checkbox
                checked={selected.some((item) => item.id === data.id)}
                onCheckedChange={() =>
                  handleCheck(data.id, data.name, data.email)
                }
                onClick={(e) => e.stopPropagation()}
              />
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <div className="flex gap-2">
                <span className="text-sm font-semibold">{data.name}</span>
                <span className="text-sm font-light">{data.email}</span>
              </div>
              <Button
                onClick={() =>
                  handleDeleteDraft(
                    data.draftId,
                    parsedUserProfile.user_id,
                    data.id
                  )
                }
                className="ml-auto bg-gray-50 text-black h-6 w-6 p-1 hover:bg-red-200 rounded-xs cursor-pointer"
              >
                <Trash2 />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle></DialogTitle>
              <DraftEditor
                userId={parsedUserProfile.user_id}
                professorId={data.id}
                fromName={`${parsedUserProfile.student_firstname}${parsedUserProfile.student_lastname}`}
                fromEmail={parsedUserProfile.student_email}
                draftId={data.draftId}
                to={data.email}
                body={data.body}
                initialSubject={data.subject}
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>
      <div className="flex gap-4">
        <Button
          className="rounded-xs text-[#337EA9] bg-[#E7F3F8] hover:bg-[#E7F3F8] cursor-pointer"
          onClick={() => handleSubmit()}
        >
          <Send />
          Send Selected
        </Button>
      </div>
    </div>
  );
}
