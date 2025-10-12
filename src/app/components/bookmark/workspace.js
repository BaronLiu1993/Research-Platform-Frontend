"use server";

import { SavedDataTable } from "./table/saved-data-table";
import { SavedColumns } from "./table/savedcolumns";


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
  const inProgressResponses = Array.isArray(parsedInProgressData) ? parsedInProgressData : [];
  const inCompleteResponses = Array.isArray(parsedSavedData) ? parsedSavedData : [];
  const completedResponses = Array.isArray(parsedCompletedData) ? parsedCompletedData : [];

  const columnsData = [
    { id: "todo", statusKey: "in_complete", data: inCompleteResponses },
    { id: "inprogress", statusKey: "in_progress", data: inProgressResponses },
    { id: "completed", statusKey: "completed", data: completedResponses },
  ];

  return (
    <div className="flex flex-col font-main min-h-0">
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
