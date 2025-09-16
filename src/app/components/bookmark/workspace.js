import KanbanCardCompleted from "./cards/kanbancardcompleted";
import KanbanCardInComplete from "./cards/kanbancardincomplete";
import KanbanCardInProgress from "./cards/kanbancardinprogress";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcomponents/ui/tabs";

import {
  Plus,
  MoreHorizontal,
  Columns,
  Leaf,
  Grid2X2,
  SquareKanban,
} from "lucide-react";

import { Badge } from "@/shadcomponents/ui/badge";
import { SavedDataTable } from "./table/saved-data-table";
import { SavedColumns } from "./table/savedcolumns";
const statusConfig = {
  in_complete: {
    title: "To Do",
    dotColor: "bg-red-500",
    textColor: "text-red-700",
    bgColor: "bg-red-100",
  },
  in_progress: {
    title: "In Progress",
    dotColor: "bg-yellow-500",
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-100",
  },
  completed: {
    title: "Completed",
    dotColor: "bg-green-500",
    textColor: "text-green-700",
    bgColor: "bg-green-100",
  },
};

export default async function Workspace({
  userId,
  access,
  parsedSavedData,
  parsedInProgressData,
  parsedCompletedData,
  draftData,
  parsedUserProfile,
  parsedResumeData,
  parsedTranscriptData,
}) {
  const inProgressResponses = parsedInProgressData || [];
  const inCompleteResponses = parsedSavedData || [];
  const completedResponses = parsedCompletedData || [];

  const columnsData = [
    {
      id: "todo",
      statusKey: "in_complete",
      data: inCompleteResponses,
      cardComponent: KanbanCardInComplete,
    },
    {
      id: "inprogress",
      statusKey: "in_progress",
      data: inProgressResponses,
      cardComponent: KanbanCardInProgress,
    },
    {
      id: "completed",
      statusKey: "completed",
      data: completedResponses,
      cardComponent: KanbanCardCompleted,
    },
  ];
  return (
    <div className="flex flex-col h-fit font-main overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="px-4 pt-3 bg-white justify-between shrink-0">
          <h1 className="text-2xl text-[#787774] font-semibold h-fit">
            Workspace
          </h1>
          <div className="flex items-center py-2 space-x-2">
            <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-xs text-[10px]">
              <Leaf />
              Consistency
            </Badge>
            <div className="rounded-full h-1 w-1 bg-[#37352F]"></div>
            <h2 className="text-xs font-semibold text-[10px] text-[#37352F]">
              By Jie Xuan Liu
            </h2>
          </div>
        </div>
      </div>
      <SavedDataTable
        access={access}
        parsedTranscriptData={parsedTranscriptData}
        parsedResumeData={parsedResumeData}
        parsedUserProfile={parsedUserProfile}
        data={columnsData[0].data}
        columns={SavedColumns}
        draftData={draftData}
        parsedCompletedData={parsedCompletedData}
        userId={userId}
        parsedInProgressData={parsedInProgressData}
      />
    </div>
  );
}
