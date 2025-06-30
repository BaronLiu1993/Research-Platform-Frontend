"use server";

export const executeSendFollowUp = async (userId, draftId, trackingId) => {
  try {
    console.log("[SEND] Sending follow-up with:");
    console.log("  userId:", userId);
    console.log("  draftId:", draftId);
    console.log("  trackingId:", trackingId);

    if (!userId || !draftId || !trackingId) {
      console.error("[ERROR] One or more required parameters are missing.");
      return;
    }

    const response = await fetch(
      `http://localhost:8080/gmail/send-follow-up/${userId}/${draftId}/${trackingId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("[SEND] Failed to send draft. Response:", response.status, errText);
    } else {
      console.log("[SEND] Follow-up sent successfully.");
    }
  } catch (err) {
    console.error("[SEND] Error occurred while sending follow-up:", err);
  }
};
