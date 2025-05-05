import KanbanCardInComplete from "./kanbancardincomplete";
import KanbanCardInProgress from "./kanbancardinrprogress";
import KanbanCardCompleted from "./kanbancardcompleted";

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

  console.log(inProgressResponses);

  return (
    <>
      <div className="m-10">
        <div className="border-1 rounded-md border-gray-300 select-none">
          <div className="border-b-1">
            <h1 className="text-xl font-sans font-semibold m-4">
              Applications
            </h1>
            <div className="space-x-2 flex m-4 items-center">
              <Badge>Filter</Badge>
              <Badge>Sort</Badge>
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
                      {inCompleteResponsesLength} <span>Saved</span>
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
                    <Badge className="bg-red-200 m-2">
                      <div className="bg-red-600 text-red-200 h-2 w-2 rounded-full"></div>
                      <h1 className="text-xs font-sans font-medium text-red-800">
                        Not Started
                      </h1>
                    </Badge>
                    <div className="font-sans bg-gray-200 p-1 font-semibold rounded-sm text-xs">
                      {inProgressResponsesLength}
                      <span> Saved</span>
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
                <Badge className="bg-red-200 m-2">
                  <div className="bg-red-600 text-red-200 h-2 w-2 rounded-full"></div>
                  <h1 className="text-xs font-sans font-medium text-red-800">
                    Not Started
                  </h1>
                </Badge>
                <div className="font-sans bg-gray-200 p-1 font-semibold rounded-sm text-xs">
                  {inProgressResponsesLength}
                  <span> Saved</span>
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
            <div>
              {/*Third KanbanCard starts here*/}
              <div className="flex items-center space-x-2 my-2  bg-purple-200 w-fit p-1 rounded-4xl">
                <div className="bg-purple-500 h-2 w-2 rounded-full"></div>
                <h1 className="text-xs font-sans font-medium">Follow Up?</h1>
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
