// popup/popup.js
const CAPTURE_TARGET = "https://yourfrauddashboard.com/analyze"; // change to your analyze URL (or http://localhost:3000/analyze)

document.getElementById("captureBtn").addEventListener("click", async () => {
  try {
    // 1) Capture visible tab as dataURL (png)
    chrome.tabs.captureVisibleTab({ format: "png" }, async (dataUrl) => {
      if (chrome.runtime.lastError) {
        console.error("captureVisibleTab error:", chrome.runtime.lastError);
        alert("Capture failed: " + chrome.runtime.lastError.message);
        return;
      }

      // 2) Write image to system clipboard (user gesture present)
      try {
        // convert dataURL -> blob
        const res = await fetch(dataUrl);
        const blob = await res.blob();

        // write to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob }),
        ]);
      } catch (err) {
        // Clipboard write may still fail in some environments; warn but continue.
        console.warn("clipboard write failed:", err);
      }

      // 3) Open analyzer page in new tab
      chrome.tabs.create({ url: CAPTURE_TARGET }, (tab) => {
        if (!tab || !tab.id) {
          console.warn("Tab creation failed");
          return;
        }

        const tabId = tab.id;

        // 4) When tab finishes loading, inject a small script to store the image into sessionStorage
        const onUpdated = (updatedId, changeInfo, updatedTab) => {
          if (updatedId !== tabId) return;
          // Wait until tab is at least 'complete' or URL matches
          if (
            changeInfo.status === "complete" ||
            (updatedTab &&
              updatedTab.url &&
              updatedTab.url.startsWith(CAPTURE_TARGET))
          ) {
            chrome.tabs.onUpdated.removeListener(onUpdated);

            // Script to run in the target page to set sessionStorage and dispatch event
            const payload = dataUrl;
            const code = `
              try {
                sessionStorage.setItem('fraudshield_image', ${JSON.stringify(
                  payload
                )});
                // dispatch event signaling image ready
                window.dispatchEvent(new CustomEvent('fraudshield:image_ready', { detail: { source: 'extension' }}));
              } catch(e) {
                console.error('inject failed', e);
              }
            `;

            chrome.scripting.executeScript(
              {
                target: { tabId },
                func: () => {},
                args: [],
                world: "MAIN",
                files: [], // use `code` instead via `func` trick below
              },
              () => {
                // executeScript doesn't accept raw code string in MV3, use the alternative via `scripting.executeScript` with `func`
                chrome.scripting.executeScript({
                  target: { tabId },
                  func: (p) => {
                    try {
                      sessionStorage.setItem("fraudshield_image", p);
                      window.dispatchEvent(
                        new CustomEvent("fraudshield:image_ready", {
                          detail: { source: "extension" },
                        })
                      );
                    } catch (e) {
                      console.error("sessionStorage injection failed", e);
                    }
                  },
                  args: [payload],
                });
              }
            );
          }
        };

        chrome.tabs.onUpdated.addListener(onUpdated);
      });
    });
  } catch (err) {
    console.error("Capture flow error:", err);
    alert("Capture flow failed: " + err.message);
  }
});
