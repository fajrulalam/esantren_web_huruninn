"use client";

import Image from "next/image";

export const SapaAlumniSection = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-[#F5F0E6] dark:bg-gray-900">
      <h2
        className="text-center text-4xl font-bold mb-12"
        style={{
          background:
            "linear-gradient(135deg, #1E4FDE 20%, #5179FF 50%, #1E4FDE 80%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          animation: "shine 4s linear infinite",
        }}
      >
        Sapa Alumni
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="relative group animate-shimmer-border flex flex-col items-center text-center space-y-4 p-6 rounded-3xl shadow-lg hover:shadow-pink-500/30 backdrop-blur-lg bg-white/30 dark:bg-white/5 ring-1 ring-white/40 dark:ring-white/10 transition-all duration-300"
          >
            <Image
              src={"/placeholder alumni.png"}
              alt={`Alumni ${i + 1}`}
              width={160}
              height={200}
              className="w-40 h-50 object-cover rounded-2xl shadow-md"
            />
            <div>
              <h4 className="text-lg font-semibold text-[#D100A3]">
                Alumni {i + 1}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Lulusan unggulan, kini berkiprah di bidangnya.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
