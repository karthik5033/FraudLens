"use client";

import HeroSection from "@/components/hero-section";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  ScanLine,
  QrCode,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen">
      {/* ------------------ HERO SECTION ------------------ */}
      <HeroSection />

      {/* ------------------ FEATURES SECTION ------------------ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-6">
            How FraudShield Protects You
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            4 specialized AI models work together to detect scams from
            screenshots, QR codes, fake merchant portals, and suspicious refund
            messages.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {/* OCR */}
            <Feature
              icon={<ScanLine className="size-8 text-blue-600" />}
              title="OCR + Extraction"
              desc="Reads text, UPI IDs, amounts, URLs, and QR data directly from the screenshot."
            />

            {/* NLP */}
            <Feature
              icon={<BrainCircuit className="size-8 text-purple-600" />}
              title="NLP Fraud Detection"
              desc="Detects refund scams, impersonation, fake KYC, and phishing patterns."
            />

            {/* Transaction Model */}
            <Feature
              icon={<QrCode className="size-8 text-green-600" />}
              title="Transaction Risk Model"
              desc="Identifies ₹1 verification scams, mismatch payments, fake merchant names."
            />

            {/* Graph Model */}
            <Feature
              icon={<ShieldCheck className="size-8 text-red-600" />}
              title="Graph Fraud Network"
              desc="Checks if UPI ID or domain belongs to a known fraud cluster."
            />
          </div>
        </div>
      </section>

      {/* ------------------ CTA SECTION ------------------ */}
      <section className="py-28 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-4xl font-semibold mb-4">
            Ready to Scan Your First Screenshot?
          </h2>

          <p className="text-gray-600 mb-10">
            Click below and paste any UPI page or scam message. FraudShield will
            analyze it instantly.
          </p>

          <Link href="/analyze">
            <Button size="lg" className="h-14 text-lg px-10 flex gap-2">
              <Sparkles className="size-5" />
              Start Scanning
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  );
}
