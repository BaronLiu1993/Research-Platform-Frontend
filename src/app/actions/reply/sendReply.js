export const SendReply = async (draftId, trackingId, access) => {
  try {
    const response = await fetch(
      `http://localhost:8080/draft/send-follow-up/${draftId}/${trackingId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
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
