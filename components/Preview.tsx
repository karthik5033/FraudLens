"use client";

export default function Preview({ src }: { src: string }) {
  return (
    <div className="w-full flex justify-center mt-4">
      <img
        src={src}
        alt="Uploaded preview"
        className="rounded-xl shadow-lg max-h-96 border"
      />
    </div>
  );
}
