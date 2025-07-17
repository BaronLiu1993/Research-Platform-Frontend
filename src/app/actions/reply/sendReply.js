"use server";

export const SendReply = async (userId, draftId, trackingId) => {
  try {
    if (!userId || !draftId || !trackingId) {
      return;
    }
    const response = await fetch(
      `http://localhost:8080/draft/send-follow-up/${userId}/${draftId}/${trackingId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error(
        "[SEND] Failed to send draft. Response:",
        response.status,
        errText
      );
    } else {
      console.log("[SEND] Follow-up sent successfully.");
    }
  } catch (err) {
    console.error("[SEND] Error occurred while sending follow-up:", err);
  }
};
