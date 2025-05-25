"use server";

import KanbanCardInComplete from "./kanbancardincomplete";
import KanbanCardInProgress from "./kanbancardinprogress";
import KanbanCardCompleted from "./kanbancardcompleted";
import KanbanCardFollowUp from "./kanbancardfollowup";

import {
  Plus,
  MoreHorizontal,
  Filter as FilterIcon,
  ArrowUpDown,
  Search as SearchIcon,
  LayoutGrid,
  ListChecks,
  Settings2,
  Columns,
  Tag,
  CalendarDays,
  Users,
} from "lucide-react";

import { Badge } from "@/shadcomponents/ui/badge";

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

export default async function Kanban({ user_id }) {
  const serverData = await fetch(
    `http://localhost:8080/kanban/get-all-or-create/${user_id.value}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    }
  );

  console.log(serverData);
  if (!serverData.ok) {
    return (
      <div className="p-8 text-center text-gray-500 font-sans">
        <p className="text-xl mb-2">Oops!</p>
        <p>Could not load application data. Please try again later.</p>
      </div>
    );
  }

  const responses = await serverData.json();
  const finalResponse = responses.data;

  if (!finalResponse) {
    return (
      <div className="p-8 text-center text-gray-500 font-sans">
        <p>No application data found.</p>
      </div>
    );
  }

  const inProgressResponses = finalResponse.in_progress || [];
  const inCompleteResponses = finalResponse.in_complete || [];
  const completedResponses = finalResponse.completed || [];
  const followUpResponses = finalResponse.follow_up || [];

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
    <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="px-4 pt-3 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Columns className="h-5 w-5 text-gray-500" />
            <h1 className="text-xl font-semibold text-gray-700">
              Applications Tracker
            </h1>
          </div>
        </div>
        <h2 className="px-4 py-3 text-sm font-sans font-light text-gray-400">
          Discover, track, and land the perfect research role, faster than ever.
        </h2>
      </div>
      <div className="px-4 py-2 border-b border-gray-200 bg-white flex items-center justify-between gap-2 flex-wrap shrink-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center border border-gray-300 rounded-md text-sm">
            <button className="px-2.5 py-1 flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs rounded-l-md border-r border-gray-300">
              <LayoutGrid className="h-4 w-4" />
              Board
            </button>
            <button className="px-2.5 py-1 text-xs flex items-center gap-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-md">
              <ListChecks className="h-4 w-4" />
              Table
            </button>
          </div>
          <div className="h-5 w-px bg-gray-300 mx-1"></div>
          <Badge
            variant="outline"
            className="cursor-pointer px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-100 flex items-center gap-1.5 border-gray-300"
          >
            <FilterIcon className="h-4 w-4" /> Filter
          </Badge>
          <Badge
            variant="outline"
            className="cursor-pointer px-2.5 py-1 text-sm text-gray-600 hover:bg-gray-100 flex items-center gap-1.5 border-gray-300"
          >
            <ArrowUpDown className="h-4 w-4" /> Sort
          </Badge>
          <Badge
            variant="outline"
            className="cursor-pointer px-2.5 py-1 text-sm text-gray-600 hover:bg-gray-100 flex items-center gap-1.5 border-gray-300"
          >
            <Tag className="h-4 w-4" /> Group by: Status
          </Badge>
          <div className="h-5 w-px bg-gray-300 mx-1"></div> {/* Separator */}
          <span className="text-sm text-gray-500">Quick Filters:</span>
          <Badge
            variant="outline"
            className="cursor-pointer px-2 py-0.5 text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-600 border-gray-300"
          >
            <CalendarDays className="h-3.5 w-3.5 mr-1" /> This Month
          </Badge>
          <Badge
            variant="outline"
            className="cursor-pointer px-2 py-0.5 text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-600 border-gray-300"
          >
            <Users className="h-3.5 w-3.5 mr-1" /> My Applications
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              className="pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-40 sm:w-56"
            />
          </div>
          <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md">
            <Settings2 className="h-5 w-5" />
          </button>
        </div>
      </div>
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
                      <h2 className={`text-sm font-medium ${config.textColor}`}>
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
                        title={item.name}
                        url={item.url}
                        school={item.school}
                        faculty={item.faculty}
                        email={item.email}
                        department={item.department}
                        research_interests={item.research_interests}
                        date={item.added_at}
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
    </div>
  );
}
