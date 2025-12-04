// background.js
// Minimal service worker. Keep for future background tasks (analytics, auth, messaging).
// Using chrome.runtime.onInstalled for simple initialization demo.

chrome.runtime.onInstalled.addListener(() => {
  console.log("FraudShield extension installed");
});
