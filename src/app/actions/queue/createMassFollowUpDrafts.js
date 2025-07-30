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

    await MassAddApplied(dynamicFields.result)
    const result = await response.json();
    return result;
  } catch {
    return "Error";
  }
};
