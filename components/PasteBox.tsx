"use client";

import { useState, useCallback } from "react";

interface PasteBoxProps {
  onImageReady: (file: File, previewUrl: string) => void;
}

export default function PasteBox({ onImageReady }: PasteBoxProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      const previewUrl = URL.createObjectURL(file);
      onImageReady(file, previewUrl);
    },
    [onImageReady]
  );

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const item = [...e.clipboardData.items].find((i) =>
      i.type.startsWith("image")
    );

    if (!item) return;

    const file = item.getAsFile();
    if (file) handleFile(file);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className={`
        w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center
        transition cursor-pointer 
        ${
          isDragging
            ? "border-primary bg-primary/10"
            : "border-gray-400 bg-gray-50"
        }
      `}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onPaste={onPaste}
      onClick={() => document.getElementById("hiddenFileInput")?.click()}
    >
      <p className="text-center text-gray-600 font-medium">
        Paste Screenshot (Ctrl + V)
      </p>
      <p className="text-sm text-gray-400 mt-1">or drag & drop an image here</p>

      <input
        id="hiddenFileInput"
        type="file"
        accept="image/*"
        hidden
        onChange={onChange}
      />
    </div>
  );
}
