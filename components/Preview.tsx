"use client";

export default function Preview({ img }: { img: string }) {
  return (
    <div className="w-full max-w-lg">
      <p className="text-sm text-gray-600 mb-2">Preview</p>

      <div className="rounded-xl overflow-hidden border shadow bg-white">
        <img
          src={img}
          alt="uploaded"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
