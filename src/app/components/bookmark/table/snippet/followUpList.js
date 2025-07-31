"use client";

import { useState } from "react";
import { Checkbox } from "@/shadcomponents/ui/checkbox";
import { Send, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/shadcomponents/ui/composedialog";

import { Button } from "@/shadcomponents/ui/button";
import FollowUpEditor from "./followUpEditor";

export default function FollowUpList({
  parsedCompletedData,
  parsedUserProfile,
}) {
  const [selected, setSelected] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  console.log(selected);
  const handleCheck = (professor_id) => {
    setSelected((prev) =>
      prev.includes(professor_id)
        ? prev.filter((id) => id !== professor_id)
        : [...prev, professor_id]
    );
  };

  const handleCheckAll = () => {
    if (checkAll) {
      setSelected([]);
    } else {
      setSelected(parsedCompletedData.map((prof) => prof.professor_id));
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
        {parsedCompletedData.map((data) => (
          <div key={data.id} className="flex items-center gap-2">
            <Checkbox
              checked={selected.includes(data.professor_id)}
              onCheckedChange={() => handleCheck(data.professor_id)}
              onClick={(e) => e.stopPropagation()}
            />

            <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            <div className="flex gap-2">
              <span className="text-sm font-semibold">{data.name}</span>
              <span className="text-sm font-light">{data.email}</span>
            </div>
            <Trash2 className="ml-auto h-6 w-6 p-1 hover:bg-red-200 rounded-xs cursor-pointer" />
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <Dialog>
          <DialogTrigger>
            <Button className="rounded-xs text-[#337EA9] bg-[#E7F3F8] hover:bg-[#E7F3F8] cursor-pointer">
              <Send />
              Send Follow Up
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <FollowUpEditor
                userId={parsedUserProfile.user_id}
                fromName={`${parsedUserProfile.student_firstname} ${parsedUserProfile.student_lastname}`}
                fromEmail={parsedUserProfile.student_email}
                professorIDArray={selected}
              />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
