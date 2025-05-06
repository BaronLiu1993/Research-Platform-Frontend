import KanbanCardInComplete from "./kanbancardincomplete";
import KanbanCardInProgress from "./kanbancardinprogress";
import KanbanCardCompleted from "./kanbancardcompleted";
import UserProfile from "./userprofile";

import { Plus } from "lucide-react";

import { Badge } from "@/shadcomponents/ui/badge";

import { EllipsisVertical } from "lucide-react";

export default async function Kanban({ userID }) {
  const serverData = await fetch(
    `http://localhost:8080/kanban/get-all-or-create/${userID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responses = await serverData.json();
  const finalResponse = responses.data;
  const inProgressResponses = finalResponse.in_progress;
  const inProgressResponsesLength = inProgressResponses.length;

  const inCompleteResponses = finalResponse.in_complete;
  const inCompleteResponsesLength = inCompleteResponses.length;

  const completedResponses = finalResponse.completed;
  const completedResponsesLength = completedResponses.length;

  const followUpResponses = finalResponse.follow_up;
  const followUpResponsesLength = followUpResponses.length;
  console.log(inProgressResponses);

  return (
    <>
      <div className="mx-10">
        <div className="select-auto">
          <div className = "p-2 border-b-1 mb-4 pb-4 border-gray-300">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                Applications
            </h1>
            <div className="flex gap-2 p-1 rounded-md">
                <Badge className="cursor-pointer px-4 py-1">Filter</Badge>
                <Badge className="cursor-pointer px-4 py-1">Sort</Badge>
            </div>
          </div>
          <div className="flex space-x-2.5 p-2">
            {/*First Kanban Starts Here*/}
            <div className="bg-gray-100 rounded-md">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge className="bg-red-200 m-2">
                      <div className="bg-red-600 text-red-200 h-2 w-2 rounded-full"></div>
                      <h1 className="text-xs font-sans font-medium text-red-800">
                        Not Started
                      </h1>
                    </Badge>
                    <div className="font-sans bg-gray-200 p-1 font-semibold rounded-sm text-xs">
                      {inCompleteResponsesLength}
                    </div>
                  </div>
                  <div className="flex px-2">
                    <Plus className="h-5 w-5 text-gray-500 hover:bg-gray-200 rounded-md cursor-pointer" />
                    <EllipsisVertical className="h-5 w-5 text-gray-500 hover:bg-gray-200 rounded-md cursor-pointer" />
                  </div>
                </div>
                <div className="space-y-2">
                  {inCompleteResponses.map((data, index) => (
                    <div key={index}>
                      <KanbanCardInComplete
                        title={data.name}
                        url={data.url}
                        school={data.school}
                        faculty={data.faculty}
                        department={data.department}
                        research_interests={data.research_interests}
                        date={data.added_at}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              {/*Second KanbanCard Starts Here*/}
              <div className="bg-gray-100 rounded-md">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Badge className="bg-yellow-200 m-2">
                      <div className="bg-yellow-600 text-yellow-200 h-2 w-2 rounded-full"></div>
                      <h1 className="text-xs font-sans font-medium text-red-800">
                        In Progress
                      </h1>
                    </Badge>
                    <div className="font-sans bg-gray-200 p-1 font-semibold rounded-md text-xs">
                      {inProgressResponsesLength}
                    </div>
                  </div>
                  <div className="flex px-2">
                    <Plus className="h-5 w-5 text-gray-500 hover:bg-gray-200 rounded-md cursor-pointer" />
                    <EllipsisVertical className="h-5 w-5 text-gray-500 hover:bg-gray-200 rounded-md cursor-pointer" />
                  </div>
                </div>
                {inProgressResponses.map((data, index) => (
                  <div key={index}>
                    <KanbanCardInProgress
                      title={data.name}
                      url={data.url}
                      school={data.school}
                      faculty={data.faculty}
                      department={data.department}
                      research_interests={data.research_interests}
                      date={data.added_at}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 rounded-md">
              <div className="flex items-center">
                <Badge className="bg-green-200 m-2">
                  <div className="bg-green-600 text-green-200 h-2 w-2 rounded-full"></div>
                  <h1 className="text-xs font-sans font-medium text-green-800">
                    Completed
                  </h1>
                </Badge>
                <div className="font-sans bg-gray-200 p-1 font-semibold rounded-sm text-xs">
                  {completedResponsesLength}
                </div>
                <div className="flex px-2">
                  <Plus className="h-5 w-5 text-gray-500 hover:bg-gray-200 rounded-md cursor-pointer" />
                  <EllipsisVertical className="h-5 w-5 text-gray-500 hover:bg-gray-200 rounded-md cursor-pointer" />
                </div>
              </div>
              {/*Third KanbanCard starts here*/}
              <div className="space-y-2">
                {completedResponses.map((data, index) => (
                  <div key={index}>
                    <KanbanCardCompleted
                      title={data.name}
                      url={data.url}
                      school={data.school}
                      faculty={data.faculty}
                      department={data.department}
                      research_interests={data.research_interests}
                      date={data.added_at}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 rounded-md">
              {/*Fourth KanbanCard starts here*/}
              <div className="flex items-center">
                <Badge className="bg-purple-200 m-2">
                  <div className="bg-purple-600 text-purple-200 h-2 w-2 rounded-full"></div>
                  <h1 className="text-xs font-sans font-medium text-purple-800">
                    Not Started
                  </h1>
                </Badge>
                <div className="font-sans bg-gray-200 p-1 font-semibold rounded-sm text-xs">
                  {followUpResponsesLength}
                </div>
                <div className="flex px-2">
                  <Plus className="h-5 w-5 text-gray-500 hover:bg-gray-200 rounded-md cursor-pointer" />
                  <EllipsisVertical className="h-5 w-5 text-gray-500 hover:bg-gray-200 rounded-md cursor-pointer" />
                </div>
              </div>
              <div className="space-y-2">
                {completedResponses.map((data, index) => (
                  <div key={index}>
                    <KanbanCardCompleted
                      title={data.name}
                      url={data.url}
                      school={data.school}
                      faculty={data.faculty}
                      department={data.department}
                      research_interests={data.research_interests}
                      date={data.added_at}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
