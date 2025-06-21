import KanbanCardCompleted from "./cards/kanbancardcompleted";
import KanbanCardFollowUp from "./cards/kanbancardfollowup";
import KanbanCardInComplete from "./cards/kanbancardincomplete";
import KanbanCardInProgress from "./cards/kanbancardinprogress";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcomponents/ui/tabs";

import { Plus, MoreHorizontal, Columns, Leaf, Grid2X2, SquareKanban } from "lucide-react";

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
  follow_up: {
    title: "Follow Up",
    dotColor: "bg-purple-500",
    textColor: "text-purple-700",
    bgColor: "bg-purple-100",
  },
};

export default async function Kanban({ userId, parsedSavedData, parsedInProgressData}) {
  //Client Wrapper
  //Improve server handling to redirect to an error page

  const inProgressResponses = parsedInProgressData || [];
  const inCompleteResponses = parsedSavedData || [];
  const completedResponses = [];
  const followUpResponses = [];

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
    {
      id: "followup",
      statusKey: "follow_up",
      data: followUpResponses,
      cardComponent: KanbanCardFollowUp,
    },
  ];



  return (
    <div className="flex flex-col h-fit font-main overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="px-4 pt-3 bg-white justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Columns className="h-5 w-5 text-gray-500" />
            <h1 className="text-xl font-semibold text-[]">
              Applications Tracker
            </h1>
          </div>
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
        <h2 className="px-4 py-3 text-sm font-light text-[#37352F]">
          Forget the chaos of your research job hunt. With a Kanban board, you
          can discover, track, and land the perfect research role, faster than
          ever. This visual, intuitive tool transforms your search into a
          streamlined process,
        </h2>
      </div>
      <Tabs defaultValue="table">
        <TabsList className = "bg-white px-4 mt-4">
          <TabsTrigger value="kanban">
            <SquareKanban />
            Kanban
          </TabsTrigger>
          <TabsTrigger value="table">
            <Grid2X2 />
            Table
          </TabsTrigger>
        </TabsList>
        <TabsContent value="table">
          <SavedDataTable data = {columnsData[0].data} columns = {SavedColumns} userId = {userId}/>
        </TabsContent>
        <TabsContent value="kanban">
          <div className="flex-grow p-3 sm:p-4 overflow-x-auto">
            <div className="grid grid-flow-col auto-cols-max md:auto-cols-fr gap-4 h-full">
              {columnsData.map((col) => {
                const config = statusConfig[col.statusKey];
                const CardComponent = col.cardComponent;
                return (
                  <div
                    key={col.id}
                    className="bg-slate-100 rounded-md flex flex-col h-full w-[300px] sm:w-auto"
                  >
                    <div className="p-3 flex items-center justify-between shrink-0 border-b border-gray-200/80">
                      <div className="flex items-center gap-2">
                        <Badge className={`${config.bgColor} border-2 `}>
                          <span
                            className={`h-2 w-2 rounded-full ${config.dotColor}`}
                          ></span>
                          <h2
                            className={`text-sm font-medium ${config.textColor}`}
                          >
                            {config.title}
                          </h2>
                        </Badge>
                        <span className="text-xs font-medium text-gray-500 bg-gray-200/70 px-1.5 py-0.5 rounded-md">
                          {col.data.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <button className="p-1.5 text-gray-500 hover:text-gray-600 hover:bg-gray-200/70 rounded-md">
                          <Plus className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-gray-600 hover:bg-gray-200/70 rounded-md">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-2 space-y-3 overflow-y-auto flex-grow">
                      {col.data.length > 0 ? (
                        col.data.map((item, index) => (
                          <CardComponent
                            key={item.id || index}
                            prof_id={item.id || index}
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
                        <div className="text-center py-6">
                          <p className="text-xs text-gray-400">
                            No applications in this stage.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
