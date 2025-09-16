// Kanban.tsx
// Server component

import KanbanCardCompleted from "./cards/kanbancardcompleted";
import KanbanCardInComplete from "./cards/kanbancardincomplete";
import KanbanCardInProgress from "./cards/kanbancardinprogress";
import { Badge } from "@/shadcomponents/ui/badge";
import { Leaf, MoreHorizontal, Plus } from "lucide-react";

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

export default async function Kanban({
  userId,
  parsedSavedData,
  parsedInProgressData,
  parsedCompletedData,
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
    <div className="flex flex-col font-main min-h-[60vh]">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 py-3">
          <h1 className="text-xl sm:text-2xl text-[#37352F] font-semibold">Workspace</h1>
          <div className="flex items-center py-2 gap-2">
            <Badge className="bg-[#F1F1EF] text-[#37352F] rounded-md text-[11px]">
              <Leaf className="w-3.5 h-3.5 mr-1" /> Consistency
            </Badge>
            <span className="rounded-full h-1 w-1 bg-[#37352F]" />
            <span className="text-[11px] font-medium text-[#37352F]">By Jie Xuan Liu</span>
          </div>
          <p className="text-sm text-[#37352F]/80 max-w-4xl">
            Organize your research outreach with a simple Kanban: discover, track, and
            follow up—without the chaos.
          </p>
        </div>
      </div>

      {/* Columns */}
      <div className="flex-1 w-full max-w-screen-2xl mx-auto px-3 sm:px-4 py-3 overflow-x-auto">
        <div
          className="grid grid-flow-col auto-cols-[minmax(280px,320px)] md:auto-cols-[minmax(300px,1fr)] gap-4"
          role="list"
        >
          {columnsData.map((col) => {
            const config = statusConfig[col.statusKey];
            const CardComponent = col.cardComponent;
            return (
              <section
                key={col.id}
                aria-label={config.title}
                className="bg-slate-50 border border-slate-200 rounded-xl flex flex-col shadow-sm h-[70vh]"
                role="listitem"
              >
                {/* Column header */}
                <div className="p-3 flex items-center justify-between shrink-0 border-b border-gray-200/80 sticky top-0 bg-slate-50/95 backdrop-blur rounded-t-xl">
                  <div className="flex items-center gap-2 min-w-0">
                    <Badge className={`${config.bgColor} border text-xs font-medium rounded-md`}> 
                      <span className={`h-2 w-2 rounded-full ${config.dotColor} mr-1`} />
                      <span className={`${config.textColor}`}>{config.title}</span>
                    </Badge>
                    <span className="text-xs font-medium text-gray-600 bg-gray-200/70 px-1.5 py-0.5 rounded-md">
                      {col.data.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200/70 rounded-md" aria-label="Add">
                      <Plus className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200/70 rounded-md" aria-label="More options">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Cards */}
                <div className="p-3 space-y-3 overflow-y-auto">
                  {col.data?.length ? (
                    col.data.map((item) => (
                      <CardComponent
                        key={item.id}
                        prof_id={item.id}
                        title={item.name}
                        url={item.url}
                        school={item.school}
                        faculty={item.faculty}
                        email={item.email}
                        department={item.department}
                        labs={item.labs}
                        lab_url={item.lab_url}
                        research_interests={item.research_interests}
                        date={item.added_at}
                        user_id={userId}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-xs text-gray-400">No applications in this stage.</p>
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

