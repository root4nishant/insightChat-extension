function extractMessages() {
  console.log("ExtractMessages Function Called!");

  let chatMessages = [];
  let messages = document.querySelectorAll("div.message-in, div.message-out");

  console.log("Found Messages:", messages);

  messages.forEach((msg) => {
    let textElement = msg.querySelector("span.copyable-text");

    // --- Timestamp logic ---
    let timestamp = null;

    // 1. Try data-pre-plain-text
    const prePlain = msg.getAttribute("data-pre-plain-text");
    if (prePlain) {
      timestamp = prePlain.match(/\[(.*?)\]/)?.[1];
    }

    // 2. Try aria-label
    if (!timestamp) {
      const aria = msg.getAttribute("aria-label");
      if (aria) timestamp = aria;
    }

    // 3. Fallback: current time
    if (!timestamp) {
      timestamp = new Date().toLocaleString();
    }

    // --- Extract message text ---
    const messageText = textElement ? textElement.innerText : null;

    if (messageText) {
      chatMessages.push({
        text: messageText,
        time: timestamp,
      });
      console.log("Message Text", messageText, "| Timestamp", timestamp);
    }
  });

  if (chatMessages.length > 0) {
    console.log("Sending Messages to Background:", chatMessages);
    const onlyTexts = chatMessages.map((m) => m.text);

    chrome.runtime.sendMessage(
      { action: "send_chat", data: onlyTexts },
      function (response) {
        if (chrome.runtime.lastError) {
          console.error("Message sending failed:", chrome.runtime.lastError);
        } else {
          console.log("Message sent successfully!", response);
        }
      }
    );
  } else {
    console.warn("No messages extracted!");
  }
}

// ✅ Auto-run extractMessages() when content.js is injected
extractMessages();
