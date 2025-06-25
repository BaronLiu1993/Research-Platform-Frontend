"use client";

import { useState } from "react";
import { Checkbox } from "@/shadcomponents/ui/checkbox";
import { Trash2 } from "lucide-react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/shadcomponents/ui/composedialog";

import DraftEditor from "./drafteditor";
import { Button } from "@/shadcomponents/ui/button";

export default function DraftList({ draftData }) {
  const [selected, setSelected] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  console.log(selected);
  const handleCheck = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCheckAll = () => {
    if (checkAll) {
      setSelected([]);
    } else {
      setSelected(draftData.map((item) => item.id));
    }
    setCheckAll(!checkAll);
  };

  console.log(draftData);
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
                checked={selected.includes(data.id)}
                onCheckedChange={() => handleCheck(data.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <div className="flex gap-2">
                <span className="text-sm font-semibold">{data.name}</span>
                <span className="text-sm font-light">{data.email}</span>
              </div>
              <Trash2 className="ml-auto h-6 w-6 p-1 hover:bg-red-200 rounded-xs cursor-pointer" />
            </DialogTrigger>

            <DialogContent>
              <DialogTitle></DialogTitle>
              <DraftEditor body={data.body} initialSubject={data.subject} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
      <div>
        <Button className="rounded-xs text-[#337EA9] bg-[#E7F3F8] hover:bg-[#E7F3F8] cursor-pointer">
          Send Selected
        </Button>
      </div>
    </div>
  );
}
