"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const carouselImages = [
  {
    src: "/hero image placeholder.png",
    alt: "Kyai profile",
  },
  {
    src: "/hurun inn tadarus.webp",
    alt: "Santri mengaji",
  },
  {
    src: "/placeholder alumni.png", 
    alt: "Aktivitas santri",
  }
];

export const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % carouselImages.length
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 px-6 md:px-16 pt-28 pb-32 overflow-hidden">
      {/* Decorative Hexagon background */}
      <div className="absolute inset-0 bg-[url('/hexagon.svg')] bg-cover opacity-10 dark:opacity-5 pointer-events-none" />

      {/* Textual Content */}
      <div className="relative z-20 md:max-w-[1000px] space-y-6">
        <h1
          className="text-4xl md:text-[3.8rem] font-extrabold leading-tight md:leading-none md:whitespace-nowrap"
          style={{
            background:
              "linear-gradient(135deg, #1E4FDE 0%, #5179FF 40%, #1E4FDE 60%, #5179FF 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            animation: "shine 3s linear infinite",
          }}
        >
          Asrama X Hurun Inn, PP Darul Ulum
        </h1>
        <p className="text-lg md:text-xl font-medium text-[#D100A3] backdrop-blur-sm bg-white/30 dark:bg-white/5 rounded-xl px-4 py-3 shadow-lg ring-1 ring-white/40 dark:ring-white/10">
          Menjadi pesantren yang mampu melahirkan santri berakhlaq mulia
          dengan penguasaan di segala bidang
        </p>
        <Link
          href="/registration"
          className="inline-block mt-4 px-8 py-4 rounded-full bg-[#1E4FDE] hover:bg-[#163db5] text-white font-semibold shadow-lg backdrop-blur-md ring-2 ring-white/30 dark:ring-white/10 transition-transform hover:scale-105"
        >
          Daftar Sekarang
        </Link>
      </div>

      {/* Carousel and Hero Image */}
      <div className="absolute z-0 right-[-15%] md:right-[-5%] top-0 bottom-0 w-full md:w-3/4 flex items-center justify-center pointer-events-none md:pointer-events-auto">
        <div className="relative w-full h-full">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={1200}
                priority={index === 0}
                className="w-full h-full object-contain -scale-x-100 drop-shadow-xl"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute z-20 bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
              index === currentImageIndex
                ? "bg-[#1E4FDE] w-6"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
