// background.js
// Minimal service worker — kept for future features or permissions checks.
// No heavy logic here; popup handles main flow.
self.addEventListener("install", () => {
  console.log("FraudShield extension installed");
});
