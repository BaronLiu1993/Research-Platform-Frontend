export const SendReply = async ({ draftId, trackingId, access }) => {
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
  } catch (err) {
    console.error("[SEND] Error occurred while sending follow-up:", err);
  }
};
