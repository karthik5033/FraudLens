export const LogoCloud = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm text-gray-500 mb-8">Trusted AI Stack</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 opacity-80">
          <img src="/next.svg" className="h-10 mx-auto" alt="Next.js" />
          <img src="/vercel.svg" className="h-10 mx-auto" alt="Vercel" />
          <img src="/python.svg" className="h-10 mx-auto" alt="Python" />
          <img src="/onnx.svg" className="h-10 mx-auto" alt="ONNX" />
          <img src="/tailwind.svg" className="h-10 mx-auto" alt="Tailwind" />
        </div>
      </div>
    </div>
  );
};
