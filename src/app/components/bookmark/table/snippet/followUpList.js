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

  const handleCheck = (professor_id, name, email) => {
    setSelected((prev) => {
      const exists = prev.some((item) => item.professor_id === professor_id);
      if (exists) {
        return prev.filter((item) => item.professor_id !== professor_id);
      }
      return [...prev, { professor_id, name, email }];
    });
  };

  const handleCheckAll = () => {
    if (checkAll) {
      setSelected([]);
    } else {
      setSelected(
        parsedCompletedData.map(({ professor_id, name, email }) => ({ professor_id, name, email }))
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
        {parsedCompletedData.map((data) => (
          <div key={data.id} className="flex items-center gap-2">
            <Checkbox
              checked={selected.some((item) => item.professor_id === data.professor_id)}
              onCheckedChange={() =>
                handleCheck(data.professor_id, data.name, data.email)
              }
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
              />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
