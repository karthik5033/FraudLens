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
  setStatus("Capturing screenshot...");

  // captureVisibleTab requires permission "activeTab" or "<all_urls>"
  chrome.tabs.captureVisibleTab(null, { format: "png" }, async (dataUrl) => {
    if (chrome.runtime.lastError || !dataUrl) {
      setStatus(
        "Screenshot failed: " + (chrome.runtime.lastError?.message || "unknown")
      );
      return;
    }

    setStatus("Saving screenshot locally...");
    // Save screenshot into chrome.storage for the analyze page to pick up
    chrome.storage.local.set(
      { screenshotDataUrl: dataUrl, screenshotTs: Date.now() },
      () => {
        setStatus("Screenshot saved. Copying to clipboard...");

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
                setStatus("Screenshot copied to clipboard.");
              } catch (err) {
                // Copy to clipboard might fail in some contexts; continue anyway
                console.warn("clipboard write failed:", err);
                setStatus("Could not copy to clipboard — continuing.");
              } finally {
                // Open the analysis page in a new tab. The page will read chrome.storage.local
                setStatus("Opening analyzer...");
                chrome.tabs.create({ url: ANALYZE_URL });
              }
            })
            .catch((err) => {
              console.error("fetch(blob) failed:", err);
              setStatus(
                "Failed to process screenshot, opening analyzer anyway."
              );
              chrome.tabs.create({ url: ANALYZE_URL });
            });
        } catch (err) {
          console.warn("clipboard flow failed:", err);
          setStatus("Clipboard API not available; opening analyzer.");
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
