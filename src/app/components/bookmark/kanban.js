import KanbanCardInComplete from "./kanbancardincomplete";
import KanbanCardInProgress from "./kanbancardinrprogress";
import KanbanCardCompleted from "./kanbancardcompleted";

import { Plus } from "lucide-react";

import { Badge } from "@/shadcomponents/ui/badge";

import { EllipsisVertical } from "lucide-react";

export default function Kanban() {
  return (
    <>
      <div className="m-10">
        
        <div className="border-1 rounded-md border-gray-300 select-none">
          <div className = "border-b-1 mx-[2rem]">
            <h1>Applications</h1>

          </div>



          <div className="flex justify-center space-x-2.5 p-2">
            {/*First Kanban Starts Here*/}
            <div className = "bg-gray-100 rounded-md">
              <div >
                  <div className = "flex items-center justify-between">
                    <div className = "flex items-center">
                        <Badge className = "bg-red-200 m-2" >
                            <div className="bg-red-600 text-red-200 h-2 w-2 rounded-full"></div>
                            <h1 className="text-xs font-sans font-medium text-red-800">Not Started</h1>
                        </Badge>
                        <div className = "font-sans bg-gray-200 p-1 font-semibold rounded-sm text-xs">
                            2
                        </div>
                    </div>
                    <div className = "flex px-2">
                        <Plus className = "h-5 w-5 text-gray-500 hover:bg-gray-200 rounded-md cursor-pointer"/>
                        <EllipsisVertical className = "h-5 w-5 text-gray-500 hover:bg-gray-200 rounded-md cursor-pointer"/>
                    </div>

                  </div>
                <div className="space-y-2">
                  <KanbanCardInComplete
                    title={"Irene Park"}
                    description={"Material Science Engineering"}
                  />
                  <KanbanCardInComplete
                    title={"Jung Che"}
                    description={"Molecular Biology"}
                  />
                  <KanbanCardInComplete title={"Kairu Liu"} description={"Philosophy"} />
                  <KanbanCardInComplete
                    title={"Jay Patel"}
                    description={"Engineering Science"}
                  />
                  <KanbanCardInComplete title={"Jerry Liu"} description={"Consulting"} />
                </div>
              </div>
            </div>
            <div>
              {/*Second KanbanCard Starts Here*/}
              <div className = "bg-gray-100 p-2 rounded-md">
              <Badge className = "bg-yellow-200" >
                    <div className="bg-yellow-800 text-yellow-200 h-2 w-2 rounded-full"></div>
                    <h1 className="text-xs font-sans font-medium text-yellow-800">In Progress</h1>
                  </Badge>
                <div className="space-y-2 ">
                  <KanbanCardInProgress title={"Ethan Teh"} description={"Medicine"} />
                  <KanbanCardInProgress
                    title={"Jaiden Parthenon"}
                    description={"Management"}
                  />
                  <KanbanCardInProgress
                    title={"Deng Yang Qing"}
                    description={"User Experience"}
                  />
                </div>
              </div>
            </div>
            <div>
              {/*Third KanbanCard starts here*/}
              <div className="flex items-center space-x-2 my-2  bg-green-200 w-fit p-1 rounded-4xl">
                <div className="bg-green-500 h-2 w-2 rounded-full"></div>
                <h1 className="text-xs font-sans font-medium">Completed!</h1>
              </div>
              <div className="space-y-2">
                <KanbanCardCompleted
                  title={"Chen Jie Yong"}
                  description={"Material Science Engineering"}
                />
              </div>
            </div>
            <div>
              {/*Third KanbanCard starts here*/}
              <div className="flex items-center space-x-2 my-2  bg-purple-200 w-fit p-1 rounded-4xl">
                <div className="bg-purple-500 h-2 w-2 rounded-full"></div>
                <h1 className="text-xs font-sans font-medium">Follow Up?</h1>
              </div>
              <div className="space-y-2">
                <KanbanCardCompleted
                  title={"Ammy Hirano"}
                  description={"Financial Management"}
                />
                <KanbanCardCompleted
                  title={"Rijaaze Sasikumar"}
                  description={"Hardware Engineering"}
                />
                <KanbanCardCompleted
                  title={"Jack Chai"}
                  description={"Investment Banking"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
