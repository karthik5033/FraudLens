// content.js
// Runs on every page. Extract page text, UPI-like patterns and links,
// then save them into chrome.storage.local for popup / analyze page to read.

(function () {
  try {
    const pageText = document.body ? document.body.innerText || "" : "";
    // Simple UPI-id regex: something@bank-style (won't catch all but it's ok for demo)
    const upiRegex = /\b[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}\b/g;
    const upiMatches = pageText.match(upiRegex) || [];

    // Grab anchor URLs (dedupe)
    const anchors = Array.from(document.querySelectorAll("a[href]")).map(
      (a) => a.href
    );
    const linkList = [...new Set(anchors)].slice(0, 200); // limit to 200 links to save space

    // small metadata
    const meta = {
      title: document.title || "",
      url: location.href,
      domain: location.hostname,
    };

    chrome.storage.local.set(
      {
        pageText: pageText.slice(0, 20000), // limit saved text
        upiList: upiMatches,
        linkList,
        pageMeta: meta,
        contentScrapeTs: Date.now(),
      },
      () => {
        // optional: debug
        // console.log("content.js: saved page context", meta, upiMatches?.length || 0);
      }
    );
  } catch (err) {
    console.error("content.js error:", err);
  }
})();
