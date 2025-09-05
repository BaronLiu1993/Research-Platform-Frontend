import { MassAddApplied } from "./massAddApplied";

export const createMassFollowUpDrafts = async (
  snippetId,
  fromName,
  fromEmail,
  dynamicFields,
  access
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/send/snippet-create-followup-draft`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
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
    if (!response.ok) {
      return { success: false, message: "Queue Failed" };
    } else {
      return { success: true, message: "Successfully Queued" };
    }
  } catch {
    return { success: false, message: "Internal Server Error" };
  }
};
