"use client";

import { useState } from "react";
import { Checkbox } from "@/shadcomponents/ui/checkbox";
import { Pen } from "lucide-react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/shadcomponents/ui/composedialog";

import { Button } from "@/shadcomponents/ui/button";
import FollowUpEditor from "./followUpEditor";
import { toast } from "sonner";

export default function FollowUpList({
  parsedCompletedData,
  parsedUserProfile,
  access,
}) {
  console.log(parsedCompletedData)
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [totalSelected, setTotalSelected] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  const handleCheck = ({
    professor_id,
    professor_name,
    professor_email,
    thread_id,
    message_id
  }) => {
    setSelected((prev) =>
      prev.includes(professor_id)
        ? prev.filter((id) => id !== professor_id)
        : [...prev, professor_id]
    );
    setTotalSelected((prev) => {
      const exists = prev.some((item) => item.professor_id === professor_id);
      if (exists) {
        return prev.filter((item) => item.professor_id !== professor_id);
      }
      return [
        ...prev,
        { professor_id, professor_name, professor_email, thread_id, message_id },
      ];
    });
  };

  const handleCheckAll = () => {
    if (checkAll) {
      setSelected([]);
      setTotalSelected([]);
    } else {
      setSelected(parsedCompletedData.map((prof) => prof.professor_id));
      setTotalSelected(
        parsedCompletedData.map(
          ({ professor_id, professor_name, professor_email, thread_id, message_id }) => ({
            professor_id,
            professor_name,
            professor_email,
            thread_id,
            message_id
          })
        )
      );
    }
    setCheckAll(!checkAll);
  };

  console.log(totalSelected);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center gap-2 p-2 border-1">
          <Checkbox checked={checkAll} onCheckedChange={handleCheckAll} />
          <span className="text-sm font-semibold">Select All</span>
        </div>
        <div className="border-1">
          {parsedCompletedData.length > 0 ? (
            parsedCompletedData.map((data) => (
              <div
                key={data.professor_id}
                className="flex items-center gap-2 p-2 "
              >
                <Checkbox
                  checked={selected.includes(data.professor_id)}
                  onCheckedChange={() =>
                    handleCheck({
                      professor_id: data.professor_id,
                      professor_name: data.professor_name,
                      professor_email: data.professor_email,
                      thread_id: data.thread_id,
                      message_id: data.message_id
                    })
                  }
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex gap-2">
                  <span className="text-sm font-semibold">
                    {data.professor_name}
                  </span>
                  <span className="text-sm font-light">
                    {data.professor_email}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="font-sans text-sm p-4 font-light">
              No Drafts Found
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            if (totalSelected.length === 0) {
              toast("No Professor Selected");
            } else {
              setIsOpen(open);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="text-sm cursor-pointer font-medium text-white bg-[#529CCA] px-3 py-1.5 hover:bg-[#4179B8] transition-colors rounded-xs">
              <Pen />
              Compose Follow Up
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <FollowUpEditor
                access={access}
                userId={parsedUserProfile.user_id}
                fromName={parsedUserProfile.student_name}
                fromEmail={parsedUserProfile.student_email}
                professorIDArray={selected}
                totalProfessorData={totalSelected}
              />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
