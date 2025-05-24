'use client';

import { Button } from "@/shadcomponents/ui/button";
import { Bookmark } from "lucide-react";
import { saveToKanban } from "@/app/repository/savetokanban";

export default function KanbanButton({
  professor_id,
  professor_name,
  professor_url,
  professor_research_interests,
  professor_school,
  professor_faculty,
  professor_department,
  user_id
}) {
  const handleClick = async () => {
    await saveToKanban(
      professor_id,
      professor_name,
      professor_url,
      professor_research_interests,
      professor_school,
      professor_faculty,
      professor_department,
      user_id,
      "" 
    );
  };

  return (
    <Button
      className="bg-gray-50 text-gray-400 border cursor-pointer max-h-[1.5rem]"
      variant="outline"
      size="sm"
      onClick={handleClick}
    >
      <span className="text-xs ">Save</span>
      <Bookmark className="w-3 h-3" />
    </Button>
  );
}