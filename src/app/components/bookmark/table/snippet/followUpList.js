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
  console.log(parsedCompletedData);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [totalSelected, setTotalSelected] = useState([]);
  const [checkAll, setCheckAll] = useState(false);

  const handleCheck = ({
    professor_id,
    professor_name,
    professor_email,
    thread_id,
    message_id,
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
        {
          professor_id,
          professor_name,
          professor_email,
          thread_id,
          message_id,
        },
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
          ({
            professor_id,
            professor_name,
            professor_email,
            thread_id,
            message_id,
          }) => ({
            professor_id,
            professor_name,
            professor_email,
            thread_id,
            message_id,
          })
        )
      );
    }
    setCheckAll(!checkAll);
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto">
      <div className="flex flex-col gap-4">
        {/* Card */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Sticky select-all header */}
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50/80 backdrop-blur supports-[backdrop-filter]:bg-slate-50/60 border-b">
            <Checkbox checked={checkAll} onCheckedChange={handleCheckAll} />
            <span className="text-sm font-semibold text-slate-800">
              Select all
            </span>
            <span className="text-xs text-slate-500">
              ({selected.length}/{parsedCompletedData.length})
            </span>
          </div>

          <div className="max-h-[60vh] overflow-y-auto divide-y">
            {parsedCompletedData.length > 0 ? (
              parsedCompletedData.map((data) => (
                <div
                  key={data.professor_id}
                  className="px-3 py-2 cursor-pointer w-full flex items-center gap-3 hover:bg-slate-50 transition-colors"
                >
                  <Checkbox
                    checked={selected.includes(data.professor_id)}
                    onCheckedChange={() =>
                      handleCheck({
                        professor_id: data.professor_id,
                        professor_name: data.professor_name,
                        professor_email: data.professor_email,
                        thread_id: data.thread_id,
                        message_id: data.message_id,
                      })
                    }
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Select ${data.professor_name}`}
                  />

                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-semibold text-zinc-800 truncate">
                      {data.professor_name}
                    </span>
                    <span className="text-sm font-light text-zinc-500 truncate">
                      {data.professor_email}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 px-4">
                <div className="mx-auto w-full">
                  <p className="text-sm text-slate-600">No drafts found.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
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
              <Button className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#529CCA] hover:bg-[#4179B8] px-3 py-1.5 rounded-md transition-colors">
                <Pen className="w-4 h-4" />
                Compose Follow Up
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogTitle></DialogTitle>
              <div className="p-1">
                <FollowUpEditor
                  access={access}
                  userId={parsedUserProfile.user_id}
                  fromName={parsedUserProfile.student_name}
                  fromEmail={parsedUserProfile.student_email}
                  professorIDArray={selected}
                  totalProfessorData={totalSelected}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
