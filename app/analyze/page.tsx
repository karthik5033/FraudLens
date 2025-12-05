"use client";

import { useState } from "react";
import PasteBox from "@/components/PasteBox";
import Preview from "@/components/Preview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, ScanSearch } from "lucide-react";

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <Card className="w-full max-w-2xl shadow-xl border border-gray-200 rounded-2xl bg-white/70 backdrop-blur-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-semibold flex items-center justify-center gap-2">
            <ScanSearch className="w-8 h-8 text-primary" />
            Paste Screenshot — FraudShield Scanner
          </CardTitle>
          <p className="text-gray-500 text-sm">
            Upload or paste any suspicious UPI page, message, QR code, or form.
            Our AI will analyze it for scams in real-time.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Upload Zone */}
          {!previewUrl && (
            <div className="rounded-xl border border-dashed border-gray-400 bg-gray-50/50 p-10 transition hover:bg-gray-100/70">
              <PasteBox
                onPaste={(base64: string) => {
                  // Convert base64 to Blob and File
                  const arr = base64.split(',');
                  const mime = arr[0].match(/:(.*?);/)?.[1] || '';
                  const bstr = atob(arr[1]);
                  let n = bstr.length;
                  const u8arr = new Uint8Array(n);
                  while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                  }
                  const file = new File([u8arr], "pasted-image.png", { type: mime });
                  setFile(file);
                  setPreviewUrl(base64);
                }}
              />
            </div>
          )}

          {/* Preview Area */}
          {previewUrl && (
            <div className="space-y-4">
              <Preview img={previewUrl} />

              <p className="text-center text-gray-500 text-sm flex items-center justify-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Screenshot detected — ready to analyze.
              </p>
            </div>
          )}

          {/* Result Placeholder */}
          <div className="bg-muted/30 border rounded-xl p-6 text-center text-gray-400 text-sm">
            AI result will appear here after processing...
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
