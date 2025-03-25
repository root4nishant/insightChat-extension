function extractMessages() {
  console.log("🚀 ExtractMessages Function Called!");

  let chatMessages = [];
  let messages = document.querySelectorAll("div.message-in, div.message-out");

  console.log("✅ Found Messages:", messages);

  messages.forEach((msg) => {
    let textElement = msg.querySelector("span.copyable-text");
    console.log(
      "📩 Extracted Message:",
      textElement ? textElement.innerText : "No text found"
    );

    if (textElement && textElement.innerText) {
      chatMessages.push(textElement.innerText);
    }
  });

  if (chatMessages.length > 0) {
    console.log("📨 Sending Messages to Background:", chatMessages);
    chrome.runtime.sendMessage(
      { action: "send_chat", data: chatMessages },
      function (response) {
        if (chrome.runtime.lastError) {
          console.error("❌ Message sending failed:", chrome.runtime.lastError);
        } else {
          console.log("✅ Message sent successfully!", response);
        }
      }
    );
  } else {
    console.warn("⚠️ No messages extracted!");
  }
}

// ✅ Auto-run extractMessages() when content.js is injected
extractMessages();
