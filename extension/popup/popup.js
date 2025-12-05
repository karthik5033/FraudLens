// popup.js
// 1) capture visible tab as PNG (dataURL)
// 2) save it to chrome.storage.local with page context (content.js already saved)
// 3) try to write image to clipboard (so user can Ctrl+V); this may require user gesture
// 4) open a new tab to your /analyze page

const ANALYZE_URL = "https://yourdomain.com/analyze"; // <- change to your site (or localhost during dev)

const statusEl = document.getElementById("status");
const scanBtn = document.getElementById("scanBtn");
const openBtn = document.getElementById("openAnalyzer");

function setStatus(txt) {
  statusEl.textContent = txt;
}

async function captureAndSend() {
  setStatus("Taking a quick snapshot... 📸");

  // captureVisibleTab requires permission "activeTab" or "<all_urls>"
  chrome.tabs.captureVisibleTab(null, { format: "png" }, async (dataUrl) => {
    if (chrome.runtime.lastError || !dataUrl) {
      setStatus(
        "Oops! Couldn't capture the screenshot: " + (chrome.runtime.lastError?.message || "Please try again")
      );
      return;
    }

    setStatus("Got it! Saving your screenshot... 💾");
    // Save screenshot into chrome.storage for the analyze page to pick up
    chrome.storage.local.set(
      { screenshotDataUrl: dataUrl, screenshotTs: Date.now() },
      () => {
        setStatus("Preparing to analyze... 🔍");

        // Try to copy to clipboard (works inside popup if allowed)
        try {
          // Convert dataURL to blob
          fetch(dataUrl)
            .then((res) => res.blob())
            .then(async (blob) => {
              try {
                // ClipboardItem is supported in modern browsers
                const clipboardItemInput = new ClipboardItem({
                  [blob.type]: blob,
                });
                await navigator.clipboard.write([clipboardItemInput]);
                setStatus("Screenshot ready! Opening analyzer... ✨");
              } catch (err) {
                // Copy to clipboard might fail in some contexts; continue anyway
                console.warn("clipboard write failed:", err);
                setStatus("All set! Opening analyzer... 🚀");
              } finally {
                // Open the analysis page in a new tab. The page will read chrome.storage.local
                setTimeout(() => {
                  chrome.tabs.create({ url: ANALYZE_URL });
                }, 500);
              }
            })
            .catch((err) => {
              console.error("fetch(blob) failed:", err);
              setStatus(
                "Had a small hiccup, but opening analyzer anyway... 😊"
              );
              chrome.tabs.create({ url: ANALYZE_URL });
            });
        } catch (err) {
          console.warn("clipboard flow failed:", err);
          setStatus("Opening analyzer for you... 👍");
          chrome.tabs.create({ url: ANALYZE_URL });
        }
      }
    );
  });
}

scanBtn.addEventListener("click", () => {
  // user gesture exists, allowed to write to clipboard
  captureAndSend();
});

// manual open if user wants to paste an image themselves
openBtn.addEventListener("click", () => {
  chrome.tabs.create({ url: ANALYZE_URL });
});
