import React, { Suspense, lazy, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcomponents/ui/accordion";
import { Badge } from "@/shadcomponents/ui/badge";
import { Input } from "@/shadcomponents/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shadcomponents/ui/publicationDialog";
import { Button } from "@/shadcomponents/ui/button";

import { useSelectedVariablesStore } from "@/app/store/useSelectedRowsStore";
import { SyncSnippetData } from "@/app/actions/syncSnippetData";
import { createMassDrafts } from "@/app/actions/queue/createMassDrafts";
import { FolderSync, Hammer } from "lucide-react";

const Publications = lazy(() => import("./publications"));

export default function DataPreview({
  rowData,
  userId,
  parsedUserProfile,
  snippetId,
  generateView,
  access
}) {

  const selectedVariables = useSelectedVariablesStore(
    (s) => s.selectedVariables
  );

  const [synced, setSynced] = useState(false);
  const [syncedData, setSyncedData] = useState(null);
  const [selectedPublications, setSelectedPublications] = useState({});
  const [activeProfessorId, setActiveProfessorId] = useState(null);

  const professorIDArray = rowData.map((data) => data.original.professor_id);

  const handleSelectTitle = (professorId, title) => {
    setSelectedPublications((prev) => ({
      ...prev,
      [professorId]: title,
    }));
    handleFieldChange(professorId, "publications", title);
  };
  const handleFieldChange = (professorId, key, newValue) => {
    setSyncedData((prev) => {
      if (!prev?.result) return prev;
      const newResult = prev.result.map((prof) =>
        prof.id !== professorId
          ? prof
          : {
              ...prof,
              dynamicFields: {
                ...prof.dynamicFields,
                [key]: newValue,
              },
            }
      );
      return { ...prev, result: newResult };
    });
  };

  const handleSyncSnippet = async () => {
    const response = await SyncSnippetData(
      professorIDArray,
      selectedVariables,
      access
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

    if (response?.status === "synced") setSynced(true);
    setSyncedData(response);
  };

  const handleDraftGeneration = async (dynamicFields) => {
    await createMassDrafts(
      userId,
      snippetId,
      parsedUserProfile.student_name,
      parsedUserProfile.student_email,
      dynamicFields,
      access
    );
  };

  return (
    <div className="font-main antialiased">
      <div className="text-xs font-semibold px-6 flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <h1 className="text-lg text-black font-medium">Preview Recipients</h1>
          <Badge
            className={`text-xs rounded-xs ${
              synced
                ? "text-[#448361] bg-[#EDF3EC]"
                : "text-[#D44C47] bg-[#FDEBEC]"
            }`}
          >
            {synced ? "Synced Data" : "No Synced Data"}
          </Badge>
        </div>
        <div className="font-medium text-xs text-muted-foreground">
          Get a dedicated view of the variables for each professor.
        </div>
      </div>
      <div className = "flex items-center justify-center py-10">
        {rowData.length > 0 ? (
          <Accordion type="single" collapsible className="w-full p-4">
            {rowData.map((row) => (
              <AccordionItem
                value={row.original.id}
                key={row.original.id}
                className="border-none"
              >
                <AccordionTrigger className="flex items-center gap-2 p-3 text-xs hover:no-underline rounded-xs font-medium text-[#37352F] hover:bg-[#F1F1EF] transition-colors duration-200 cursor-pointer group">
                  <div className="flex flex-col gap-1.5 flex-grow">
                    <div className="flex gap-2 items-center">
                      <div className="text-gray-900">{row.original.name}</div>
                      <div className="h-1 w-1 bg-gray-400 rounded-full" />
                      <div className="text-gray-500">{row.original.email}</div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-2 pt-0 px-3 text-xs border-t border-gray-100">
                  {syncedData?.result?.length > 0 ? (
                    syncedData.result
                      .filter((prof) => prof.id === row.original.professor_id)
                      .map((prof) => (
                        <div key={prof.id} className="p-2">
                          {prof.dynamicFields &&
                          Object.entries(prof.dynamicFields).length > 0 ? (
                            Object.entries(prof.dynamicFields).map(
                              ([key, value]) => (
                                <div key={key} className="mb-4">
                                  {key === "publications" ? (
                                    <div className="flex flex-col gap-2">
                                      <strong>{key}:</strong>
                                      <Input
                                        value={
                                          selectedPublications[prof.id] || ""
                                        }
                                        className="text-xs rounded-xs h-[2rem]"
                                        onChange={(e) =>
                                          handleSelectTitle(
                                            prof.id,
                                            e.target.value
                                          )
                                        }
                                      />
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button
                                            onClick={() =>
                                              setActiveProfessorId(prof.id)
                                            }
                                            className="font-main text-xs rounded-xs text-white bg-blue-500 h-[1.7rem] w-fit hover:bg-blue-400 px-2"
                                          >
                                            Find New Publications
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent className="rounded-xs max-h-[30rem] w-[40rem] overflow-y-auto">
                                          <DialogTitle></DialogTitle>
                                          <DialogDescription>
                                            <Suspense
                                              fallback={
                                                <div>
                                                  Loading Publications...
                                                </div>
                                              }
                                            >
                                              <Publications
                                                key={activeProfessorId}
                                                professorId={activeProfessorId}
                                                onSelectTitle={(title) =>
                                                  handleSelectTitle(
                                                    activeProfessorId,
                                                    title
                                                  )
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
                                        <strong>{key}:</strong>{" "}
                                        {value ?? "No data"}
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
                    <div className="p-4 font-light">No variables set</div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-black">No Professors Selected</div>
        )}
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        {generateView &&
          (synced ? (
            <button
              onClick={() => handleDraftGeneration(syncedData)}
              className="rounded-sm cursor-pointer text-[#337EA9] bg-[#E7F3F8] hover:bg-[#d4eaf5] hover:text-[#2c6f95] transition-colors duration-200 font-medium px-4 py-2 flex items-center gap-2"
            >
              <Hammer className="h-4 w-4" />
              Finalise Drafts
            </button>
          ) : (
            <button
              onClick={handleSyncSnippet}
              className="rounded-sm cursor-pointer text-[#337EA9] bg-[#E7F3F8] hover:bg-[#d4eaf5] hover:text-[#2c6f95] transition-colors duration-200 font-medium px-4 py-2 flex items-center gap-2 shadow-md"
            >
              <FolderSync className="h-4 w-4" />
              Sync Data
            </button>
          ))}
      </div>
    </div>
  );
}
