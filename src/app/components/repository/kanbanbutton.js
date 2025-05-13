'use client';

import { Button } from "@/shadcomponents/ui/button";
import { Bookmark } from "lucide-react";
import { saveToKanban } from "@/app/repository/savetokanban";

export default function KanbanButton({
  professor_name,
  professor_url,
  professor_research_interests,
  professor_school,
  professor_faculty,
  professor_department,
}) {
  const handleClick = async () => {
    await saveToKanban(
      professor_name,
      professor_url,
      professor_research_interests,
      professor_school,
      professor_faculty,
      professor_department,
      "" // comments
    );
  };

  return (
    <Button
      className="bg-gray-50 text-gray-500 border cursor-pointer"
      variant="outline"
      size="sm"
      onClick={handleClick}
    >
      <span className="text-xs mr-1">Save To Kanban</span>
      <Bookmark className="w-3 h-3" />
    </Button>
  );
}