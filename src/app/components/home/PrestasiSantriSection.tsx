"use client";

import Image from "next/image";

const achievements = [
  {
    title: "Juara Musabaqah Hifdzil Quran",
    subtext: "Tingkat Nasional 2024",
    image: "/placeholder alumni.png"
  },
  {
    title: "Juara Olimpiade Matematika",
    subtext: "Tingkat Provinsi 2024",
    image: "/placeholder alumni.png"
  },
  {
    title: "Juara Festival Seni Islam",
    subtext: "Tingkat Kabupaten 2023",
    image: "/placeholder alumni.png"
  },
  {
    title: "Kompetisi Robotik",
    subtext: "Finalis Tingkat Nasional 2024",
    image: "/placeholder alumni.png"
  }
];

export const PrestasiSantriSection = () => {
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
        Prestasi Santri
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {achievements.map((item, index) => (
          <div 
            key={index}
            className="flex flex-col group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Image container with overflow hidden for smooth scaling */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80" />
            </div>
            
            {/* Content area */}
            <div className="relative z-10 -mt-16 px-5 pb-5">
              <div className="bg-white/95 dark:bg-gray-800/95 p-5 rounded-xl shadow-lg backdrop-blur-sm ring-1 ring-white/20 dark:ring-white/10">
                <h3 className="font-bold text-lg text-[#1E4FDE] dark:text-[#5179FF] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[#D100A3] dark:text-pink-400">
                  {item.subtext}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <a 
          href="#" 
          className="inline-block px-8 py-3 rounded-full border-2 border-[#1E4FDE] text-[#1E4FDE] hover:bg-[#1E4FDE] hover:text-white dark:border-[#5179FF] dark:text-[#5179FF] dark:hover:bg-[#5179FF] dark:hover:text-white font-medium transition-all duration-300"
        >
          Lihat Semua Prestasi
        </a>
      </div>
    </section>
  );
};
