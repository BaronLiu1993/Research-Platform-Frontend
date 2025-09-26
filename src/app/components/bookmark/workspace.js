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
  initialDraftData,
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
      <SavedDataTable
        access={access}
        parsedTranscriptData={parsedTranscriptData}
        parsedResumeData={parsedResumeData}
        parsedUserProfile={parsedUserProfile}
        data={columnsData[0].data}
        columns={SavedColumns}
        initialDraftData={initialDraftData}
        parsedCompletedData={parsedCompletedData}
        userId={userId}
        parsedInProgressData={parsedInProgressData}
      />
    </div>
  );
}
