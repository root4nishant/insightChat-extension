chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "store_session_id") {
    const sessionId = request.sessionId;
    chrome.storage.local.set({ clerkSessionId: sessionId }, () => {
      console.log("Clerk sessionId saved in chrome.storage.local");
    });
    return;
  }

  if (request.action === "send_chat") {
    chrome.storage.local.get(["clerkSessionId"], (result) => {
      const sessionId = result.clerkSessionId;
      if (!sessionId) {
        console.error("Clerk sessionId not found in storage.");
        return;
      }

      fetch("https://insightchat-root.onrender.com/process_chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Clerk-Session-Id": sessionId, // Backend expects this
        },
        body: JSON.stringify({ messages: request.data }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("AI Response:", data);
          chrome.storage.local.set({ chatAnalysis: data });
          sendResponse({ success: true, data });
        })
        .catch((err) => {
          console.error("Error:", err);
          sendResponse({ success: false, error: err });
        });
    });

    // Keep connection open for sendResponse
    return true;
  }
});
