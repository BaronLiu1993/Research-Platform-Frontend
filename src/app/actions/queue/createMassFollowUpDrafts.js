import { MassAddApplied } from "./massAddApplied";

export const createMassFollowUpDrafts = async (
  userId,
  snippetId,
  fromName,
  fromEmail,
  dynamicFields
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/send/snippet-create-followup-draft`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          professorData: dynamicFields.result,
          baseBody: {
            snippetId,
            fromName,
            fromEmail,
          },
        }),
      }
    );

    await MassAddApplied(dynamicFields.result);
    const result = await response.json();
    if (!response.ok) {
      return { success: false, message: "Queue Failed" };
    } else {
      return { success: true, message: "Successfully Queued" };
    }
  } catch {
    return "Error";
  }
};
