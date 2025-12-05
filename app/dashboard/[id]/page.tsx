import React from "react";

// Temporary fake lookup
const fakeDB: any = {
  "1": {
    id: "1",
    type: "Refund Scam",
    score: 0.91,
    upi: "scammer@oksbi",
    domain: "amazon-refund-help.in",
    cluster: "Cluster_17",
    extractedText: "Sir refund my amount...",
    timestamp: "2025-01-15 10:42",
  },
  "2": {
    id: "2",
    type: "KYC Phishing",
    score: 0.84,
    upi: "verify-fastag@okicici",
    domain: "fastag-verifymycard.in",
    cluster: "Cluster_05",
    extractedText: "Your FASTag KYC expired. Pay ₹1 to verify...",
    timestamp: "2025-01-15 10:10",
  },
};

export default async function ResultDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = fakeDB[params.id];

  if (!data) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Result Not Found</h1>
        <p className="text-gray-500">No analysis exists for this ID.</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Analysis Details</h1>

      {/* Summary Card */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-3">{data.type}</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Risk Score</p>
            <p className="text-red-600 font-semibold text-lg">
              {(data.score * 100).toFixed(0)}%
            </p>
          </div>

          <div>
            <p className="text-gray-500">UPI ID</p>
            <p className="font-medium">{data.upi}</p>
          </div>

          <div>
            <p className="text-gray-500">Domain</p>
            <p className="font-medium">{data.domain}</p>
          </div>

          <div>
            <p className="text-gray-500">Fraud Cluster</p>
            <p className="font-medium">{data.cluster}</p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-500">Timestamp</p>
            <p className="font-medium">{data.timestamp}</p>
          </div>
        </div>
      </div>

      {/* Extracted Text */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-2">Extracted Text</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {data.extractedText}
        </p>
      </div>

      {/* Placeholder for Future Visuals */}
      <div className="bg-gray-50 border rounded-xl shadow-sm p-6 text-gray-500 text-sm">
        Graphs, OCR image, GNN cluster map, and model breakdown will appear
        here.
      </div>
    </div>
  );
}
