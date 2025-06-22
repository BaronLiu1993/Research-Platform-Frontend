import React, { Suspense, lazy } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";
import { Badge } from "@/shadcomponents/ui/badge";

import { useSelectedVariablesStore } from "@/app/store/useSelectedRowsStore";

import { SyncSnippetData } from "@/app/actions/syncSnippetData";
import { useState } from "react";
import { Input } from "@/shadcomponents/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shadcomponents/ui/publicationDialog";
import { Button } from "@/shadcomponents/ui/button";
import { createMassDrafts } from "@/app/actions/createMassDrafts";

// Dynamically import the component
const Publications = lazy(() => import("./publications"));

//Sync Data Here
export default function DataPreview({ rowData, userId, parsedUserProfile, snippetId }) {
  console.log(rowData);
  const selectedVariables = useSelectedVariablesStore(
    (s) => s.selectedVariables
  );
  const [synced, setSynced] = useState(false);
  console.log(selectedVariables);
  const professorIDArray = rowData.map((data) => data.original.professor_id);
  console.log(professorIDArray);
  const [syncedData, setSyncedData] = useState(null);

  const [selectedPublications, setSelectedPublications] = useState({});
  const handleSelectTitle = (professorId, title) => {
    setSelectedPublications((prev) => ({
      ...prev,
      [professorId]: title,
    }));
  };


  //Handle Field Changes and Edits the User Wants to Make
  const handleFieldChange = (professorId, key, newValue) => {
    setSyncedData((prev) => {
      if (!prev?.result) return prev;

      const newResult = prev.result.map((prof) => {
        if (prof.id !== professorId) return prof;

        return {
          ...prof,
          dynamicFields: {
            ...prof.dynamicFields,
            [key]: newValue,
          },
        };
      });

      return { ...prev, result: newResult };
    });
  };

  const handleSyncSnippet = async () => {
    const response = await SyncSnippetData(
      userId,
      professorIDArray,
      selectedVariables
    );

    if (response?.result && Array.isArray(response.result)) {
      const initialPublications = {};
      for (const prof of response.result) {
        if (
          prof.dynamicFields &&
          typeof prof.dynamicFields === "object" &&
          "publications" in prof.dynamicFields
        ) {
          initialPublications[prof.id] = prof.dynamicFields.publications;
        }
      }
      setSelectedPublications(initialPublications);
    }
    if (response?.status === "synced") {
      setSynced(true);
    }
    setSyncedData(response);
  };
  console.log(snippetId)

  const handleDraftGeneration = async (dynamicFields) => {
    console.log("Fired");
    console.log(dynamicFields)
    await createMassDrafts(
      userId,
      snippetId,
      `${parsedUserProfile?.student_firstname ?? ""} ${
        parsedUserProfile?.student_lastname ?? ""
      }`.trim(),
      parsedUserProfile.student_email,
      dynamicFields
    );
  };

  console.log(syncedData);
  return (
    <div className="font-main antialiased">
      <div className="text-xs font-semibold px-6">
        <div className="flex gap-2 items-center">
          <h1>Preview Recipients</h1>
          {synced ? (
            <Badge className="text-xs rounded-xs text-[#448361] bg-[#EDF3EC]">
              Synced
            </Badge>
          ) : (
            <Badge className="text-xs rounded-xs text-[#D44C47] bg-[#FDEBEC]">
              Not Synced
            </Badge>
          )}
        </div>
        <div className="font-mdium text-xs">
          Get a dedicated view of the variables for each professor{" "}
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full p-4">
        {rowData.map((row) => (
          <AccordionItem
            value={row.original.id}
            key={row.original.id}
            className=" border-gray-200 border-none"
          >
            <AccordionTrigger className="flex items-center gap-2 p-3 text-xs hover:no-underline rounded-xs font-medium text-[#37352F] hover:bg-[#F1F1EF] transition-colors duration-200 cursor-pointer group border-none">
              <div className="flex flex-col gap-1.5 flex-grow">
                <div className="flex gap-2 items-center">
                  <div className="text-gray-900">{row.original.name}</div>
                  <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
                  <div className="text-gray-500">{row.original.email}</div>
                </div>
                <div className="flex gap-2">
                  <Badge className="text-xs rounded-xs text-[#D44C47] bg-[#FDEBEC]">
                    Preview Not Ready
                  </Badge>
                  <Badge className="text-xs rounded-xs text-[#D9730D] bg-[#FAEBDD]">
                    Missing Data
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-2 pt-0 px-3 text-xs border-t border-gray-100">
              {syncedData?.result && syncedData?.result?.length > 0 ? (
                syncedData?.result
                  .filter((prof) => prof.id === row.original.professor_id)
                  .map((prof) => (
                    <div key={prof.id} className="p-2">
                      {prof.dynamicFields &&
                      Object.entries(prof.dynamicFields).length > 0 ? (
                        Object.entries(prof.dynamicFields).map(
                          ([key, value]) => (
                            <div key={key}>
                              {key == "publications" ? (
                                <div className="flex flex-col gap-1">
                                  <strong>{key}:</strong>
                                  <Input
                                    value={selectedPublications[prof.id] || ""}
                                    className="text-xs rounded-xs h-[2rem]"
                                    onChange={(e) =>
                                      handleSelectTitle(prof.id, e.target.value)
                                    }
                                  />
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button className=" font-main text-xs rounded-xs text-white bg-blue-500 h-[1.7rem] w-fit hover:bg-blue-400 px-1 cursor-pointer">
                                        Find New Publications
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="rounded-xs max-h-[30rem] w-[40rem] overflow-x-clip overflow-y-auto">
                                      <DialogTitle></DialogTitle>
                                      <DialogDescription>
                                        <Suspense
                                          fallback={
                                            <div>Loading Publications...</div>
                                          }
                                        >
                                          <Publications
                                            professorId={prof.id}
                                            onSelectTitle={(title) =>
                                              handleSelectTitle(prof.id, title)
                                            }
                                          />
                                        </Suspense>
                                      </DialogDescription>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              ) : (
                                <div className="flex flex-col gap-1">
                                  <div>
                                    {" "}
                                    <strong>{key}:</strong> {value ?? "No data"}
                                  </div>
                                  <Input
                                    className="text-xs rounded-xs h-[2rem]"
                                    value={value || ""}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        prof.id,
                                        key,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )}
                            </div>
                          )
                        )
                      ) : (
                        <div>N/A</div>
                      )}
                    </div>
                  ))
              ) : (
                <div>No variables set</div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <button
        onClick={handleSyncSnippet}
        className="mx-6 font-main text-xs rounded-xs text-white bg-blue-500 h-[1.7rem] px-1"
      >
        Sync Data
      </button>
      <button
        onClick={() => handleDraftGeneration(syncedData)}
        className="mx-6 font-main text-xs rounded-xs text-white bg-blue-500 h-[1.7rem] px-1"
      >
        Generate Drafts
      </button>
    </div>
  );
}
