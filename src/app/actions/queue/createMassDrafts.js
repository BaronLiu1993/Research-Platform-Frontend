import { MassAddApplied } from "./massAddApplied";

export const createMassDrafts = async ({
  snippetId,
  fromName,
  fromEmail,
  dynamicFields,
  access,
}) => {
  try {
    const response = await fetch(
      `http://localhost:8080/send/snippet-create-draft`,
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
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch {
    return { message: "Internal Server Error" };
  }
};
