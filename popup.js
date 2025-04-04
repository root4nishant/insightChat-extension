document.getElementById("analyze").addEventListener("click", () => {
  console.log("Analyze button clicked! Injecting content script...");

  // 🔥 Inject content.js dynamically
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs.length) {
      console.error("No active tab found!");
      return;
    }

    // Inject the content script into the active tab
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ["content.js"],
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error(
            "Error injecting content script:",
            chrome.runtime.lastError
          );
        } else {
          console.log("Content script injected successfully!");

          // Wait 2s, then check storage for AI analysis
          setTimeout(() => {
            console.log(" stored AI analysis...");
            chrome.storage.local.get("chatAnalysis", (data) => {
              console.log("Stored Data:", data);
              if (data && data.chatAnalysis) {
                document.getElementById(
                  "result"
                ).innerHTML = `<pre>Your Data is ready visit </br> <a href="https://insightchat.rootnishant.in/dashboard" target="_blank">insightchat.rootnishant.in</a> </pre>`;
              } else {
                console.warn("No AI analysis found in storage!");
                document.getElementById("result").innerText =
                  "No data available.";
              }
            });
          }, 2000);
        }
      }
    );
  });
});
