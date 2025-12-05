import React from "react";

export default async function DashboardPage() {
  // Later: fetch from your DB / logs / API
  const fakeData = [
    {
      id: "1",
      type: "Refund Scam",
      score: 0.91,
      upi: "scammer@oksbi",
      timestamp: "2025-01-15 10:42",
    },
    {
      id: "2",
      type: "KYC Phishing",
      score: 0.84,
      upi: "verify-fastag@okicici",
      timestamp: "2025-01-15 10:10",
    },
    {
      id: "3",
      type: "Fake Merchant",
      score: 0.73,
      upi: "randomshop@okaxis",
      timestamp: "2025-01-14 22:30",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">FraudShield Dashboard</h1>

      <div className="bg-white border rounded-xl shadow-sm p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-3">Fraud Type</th>
              <th className="py-3">Risk Score</th>
              <th className="py-3">UPI ID</th>
              <th className="py-3">Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {fakeData.map((item) => (
              <tr key={item.id} className="border-b last:border-none">
                <td className="py-3">{item.type}</td>
                <td className="py-3 font-semibold text-red-600">
                  {(item.score * 100).toFixed(0)}%
                </td>
                <td className="py-3 text-gray-600">{item.upi}</td>
                <td className="py-3 text-gray-500">{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Placeholder for upcoming charts */}
      <div className="mt-10 text-gray-400 text-sm">
        Charts & analytics coming soon…
      </div>
    </div>
  );
}
