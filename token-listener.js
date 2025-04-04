window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data.type === "CLERK_SESSION_ID") {
    console.log(
      "📥 Content script received session ID from page:",
      event.data.sessionId
    );

    // Relay to background
    chrome.runtime.sendMessage({
      action: "store_session_id",
      sessionId: event.data.sessionId,
    });
  }
  console.log("📥 Content script received message:", event.data);
});
