type OCRResult = {
  text: string;
  raw?: any;
};

export type ExtractedFeatures = {
  text: string;
  upi: string | null;
  amount: number | null;
  domain: string | null;
  qr: string | null;
  name: string | null;

  // Extra flags for AI models
  scam_keywords: string[];
  behavior?: any;
};

export function extractFeatures(ocr: OCRResult): ExtractedFeatures {
  const text = ocr.text || "";

  // ------------------------------
  // 1️⃣ Extract UPI IDs
  // ------------------------------
  const upiRegex = /\b[a-zA-Z0-9.\-_]+@[a-zA-Z]+\b/g;
  const upiMatches = text.match(upiRegex);
  const upi = upiMatches ? upiMatches[0] : null;

  // ------------------------------
  // 2️⃣ Extract Amounts (₹500, Rs 1, INR 50)
  // ------------------------------
  const amountRegex = /(₹|Rs\.?|INR)\s?([0-9,.]+)/i;
  const amtMatch = text.match(amountRegex);
  const amount = amtMatch ? parseFloat(amtMatch[2].replace(/,/g, "")) : null;

  // ------------------------------
  // 3️⃣ Extract Domain
  // ------------------------------
  const domainRegex = /\b[a-zA-Z0-9-]+\.(com|in|co|net|app|shop|online)\b/gi;
  const domainMatches = text.match(domainRegex);
  const domain = domainMatches ? domainMatches[0].toLowerCase() : null;

  // ------------------------------
  // 4️⃣ QR payload (if OCR picked it up)
  // ------------------------------
  const qrRegex = /(upi:\/\/pay\?[^ \n]+)/i;
  const qrMatch = text.match(qrRegex);
  const qr = qrMatch ? qrMatch[1] : null;

  // ------------------------------
  // 5️⃣ Extract Name (pn=... or merchant name)
  // ------------------------------
  const nameRegex = /pn=([^&\n]+)/i;
  const nameMatch = text.match(nameRegex);
  const name = nameMatch ? decodeURIComponent(nameMatch[1]) : null;

  // ------------------------------
  // 6️⃣ Scam Keyword Detection
  // ------------------------------
  const scamKeywords = [
    "refund",
    "mistake payment",
    "kyc",
    "verification",
    "urgent",
    "reactivate",
    "fastag",
    "update",
    "agent",
    "amazon",
    "flipkart",
    "upi pin",
    "verify ₹1",
    "test transaction",
  ];

  const foundKeywords = scamKeywords.filter((k) =>
    text.toLowerCase().includes(k.toLowerCase())
  );

  return {
    text,
    upi,
    amount,
    domain,
    qr,
    name,
    scam_keywords: foundKeywords,
    behavior: {}, // filled later
  };
}
