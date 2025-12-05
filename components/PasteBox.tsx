"use client";

import React, { useCallback, useEffect, useState } from "react";

export default function PasteBox({
  onPaste,
}: {
  onPaste: (base64: string) => void;
}) {
  const [dragActive, setDragActive] = useState(false);

  // 👉 Handle pasted image (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const item = e.clipboardData?.items[0];
      if (!item) return;

      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            onPaste(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [onPaste]);

  // 👉 Listen for image injected by Chrome extension
  useEffect(() => {
    // 1) Image already in sessionStorage (fast path)
    const stored = sessionStorage.getItem("fraudshield_image");
    if (stored) {
      onPaste(stored);
      sessionStorage.removeItem("fraudshield_image");
    }

    // 2) Wait for extension event
    const handleInjected = () => {
      const img = sessionStorage.getItem("fraudshield_image");
      if (img) {
        onPaste(img);
        sessionStorage.removeItem("fraudshield_image");
      }
    };

    window.addEventListener(
      "fraudshield:image_ready",
      handleInjected as EventListener
    );

    return () => {
      window.removeEventListener(
        "fraudshield:image_ready",
        handleInjected as EventListener
      );
    };
  }, [onPaste]);

  // 👉 Drag & Drop handler
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const file = e.dataTransfer.files[0];
      if (!file || !file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onPaste(reader.result);
        }
      };
      reader.readAsDataURL(file);
    },
    [onPaste]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      className={`
        w-full max-w-lg h-64 rounded-xl border-2 border-dashed 
        flex items-center justify-center text-center transition
        bg-white shadow
        ${dragActive ? "border-green-500 bg-green-50" : "border-gray-300"}
      `}
    >
      <div className="p-6">
        <p className="text-xl font-medium">Paste Screenshot (Ctrl + V)</p>
        <p className="text-sm text-gray-500 mt-1">
          or drag & drop an image here
        </p>
      </div>
    </div>
  );
}
