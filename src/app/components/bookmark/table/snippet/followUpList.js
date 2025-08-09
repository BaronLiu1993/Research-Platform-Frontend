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
  const [totalSelected, setTotalSelected] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const handleCheck = ({ professor_id, name, email }) => {
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
      return [...prev, { professor_id, name, email }];
    });
  };

  const handleCheckAll = () => {
    if (checkAll) {
      setSelected([]);
      setTotalSelected([]);
    } else {
      setSelected(parsedCompletedData.map((prof) => prof.professor_id));
      setTotalSelected(
        parsedCompletedData.map(({ professor_id, name, email }) => ({
          professor_id,
          name,
          email,
        }))
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
        <div className = "border-1">
        {parsedCompletedData.length > 0 ? (
          parsedCompletedData.map((data) => (
            <div key={data.id} className="flex items-center gap-2 p-2 ">
              <Checkbox
                checked={selected.includes(data.professor_id)}
                onCheckedChange={() =>
                  handleCheck({
                    professor_id: data.professor_id,
                    name: data.name,
                    email: data.email,
                  })
                }
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex gap-2">
                <span className="text-sm font-semibold">{data.name}</span>
                <span className="text-sm font-light">{data.email}</span>
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
        <Dialog>
          <DialogTrigger>
            <Button className="rounded-sm cursor-pointer text-[#337EA9] bg-[#E7F3F8] hover:bg-[#d4eaf5] hover:text-[#2c6f95] transition-colors duration-200 font-medium px-4 py-2 flex items-center gap-2">
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
                totalProfessorData={totalSelected}
              />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
