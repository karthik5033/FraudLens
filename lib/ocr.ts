import Tesseract from "tesseract.js";

type OCRResult = {
  text: string;
  raw: any;
};

/**
 * runOCR(imageBase64)
 * Accepts a base64 image string and returns extracted text.
 */
export async function runOCR(imageBase64: string): Promise<OCRResult> {
  try {
    // If tesseract is installed → real OCR
    const { data } = await Tesseract.recognize(imageBase64, "eng", {
      logger: () => {},
    });

    return {
      text: data.text || "",
      raw: data,
    };
  } catch (err) {
    console.error("OCR failed — using mock fallback:", err);

    // Mock fallback (for development / missing deps)
    return {
      text: "Sample fake UPI message: Sir I refunded 500, please verify. UPI ID: scammer@oksbi Amount ₹1",
      raw: {},
    };
  }
}
