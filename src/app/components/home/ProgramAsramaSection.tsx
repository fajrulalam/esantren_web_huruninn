"use client";

import Image from "next/image";

const programs = [
  {
    title: "Tahfidz",
    desc: "Program intensif menghafal Al-Qur'an dengan metode mutqin.",
    img: "/hurun inn tadarus.webp",
  },
  {
    title: "Hafal Qur'an 30 Juz",
    desc: "Pendampingan khusus hingga santri menyelesaikan 30 juz hafalan.",
    img: "/hurun inn tadarus.webp",
  },
  {
    title: "Unggul Akademik",
    desc: "Pembinaan akademik terintegrasi untuk meraih prestasi.",
    img: "/hurun inn tadarus.webp",
  },
];

export const ProgramAsramaSection = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-[#E9E2D5] dark:bg-gray-800">
      <h2
        className="text-center text-4xl font-bold mb-14"
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
        Program Asrama
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {programs.map((p) => (
          <div
            key={p.title}
            className="relative group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl backdrop-blur-lg bg-white/30 dark:bg-white/5 ring-1 ring-white/40 dark:ring-white/10 hover:ring-[#D100A3] dark:hover:ring-[#D100A3] hover:ring-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <Image
              src={p.img}
              alt={p.title}
              width={500}
              height={400}
              className="h-56 w-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Overlay Glass Card */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E6]/70 to-white/20 dark:from-gray-900/70 dark:to-gray-800/20" />
            <div className="absolute bottom-0 left-0 p-6 z-10">
              <h3 className="text-2xl font-semibold text-[#1E4FDE] mb-2 drop-shadow-sm">
                {p.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 max-w-xs">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
