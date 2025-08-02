"use client";

import { useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { pengasuhProfiles } from "@/data/pengasuh";

export default function ProfilPengasuhPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F0E6] dark:bg-gray-900 pt-24 pb-20 flex items-center justify-center">
      <div className="animate-pulse text-2xl text-gray-700 dark:text-gray-300">Loading...</div>
    </div>}>
      <ProfilPengasuhContent />
    </Suspense>
  );
}

function ProfilPengasuhContent() {
  const searchParams = useSearchParams();
  
  // Scroll to section when component mounts or if hash changes
  useEffect(() => {
    // Check if we have a hash in the URL
    const hash = window.location.hash;
    if (hash) {
      // Remove the # symbol
      const id = hash.substring(1);
      
      // Find the element and scroll to it with a slight delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          // Scroll with offset for header
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          
          // Add a highlight effect
          element.classList.add("highlight-section");
          setTimeout(() => {
            element.classList.remove("highlight-section");
          }, 2000);
        }
      }, 300);
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-[#F5F0E6] dark:bg-gray-900 pt-24 pb-20">
      {/* Header */}
      <div className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/hexagon.svg')] bg-cover opacity-5 dark:opacity-5 pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-10 py-12 relative z-10">
          <Link href="/" className="inline-flex items-center text-[#1E4FDE] dark:text-[#5179FF] mb-6 hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Kembali ke Beranda
          </Link>
          
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              background: "linear-gradient(135deg, #1E4FDE 20%, #5179FF 50%, #1E4FDE 80%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              animation: "shine 4s linear infinite",
            }}
          >
            Profil Pengasuh
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl">
            Mengenal lebih dekat figur-figur inspiratif yang membimbing dan mendidik santri
            di Asrama X Hurun Inn.
          </p>
        </div>
      </div>
      
      {/* Quick Navigation */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-3 overflow-x-auto">
          <ul className="flex space-x-6 whitespace-nowrap">
            {pengasuhProfiles.map((profile) => (
              <li key={`nav-${profile.id}`}>
                <a 
                  href={`#${profile.id}`}
                  className="text-[#1E4FDE] dark:text-[#5179FF] hover:text-[#D100A3] dark:hover:text-[#D100A3] font-medium transition-colors"
                >
                  {profile.name.split(",")[0]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-10 py-16">
        {/* Profile Sections */}
        {pengasuhProfiles.map((profile, index) => (
          <section 
            key={profile.id}
            id={profile.id}
            className={`flex flex-col lg:flex-row gap-8 items-start ${
              index !== 0 ? "mt-24 pt-24 border-t border-gray-200 dark:border-gray-700" : ""
            } transition-all duration-500`}
          >
            {/* Profile Image (Left) */}
            <div className="w-full lg:w-2/5">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={profile.portraitImage}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw" 
                  className="object-cover"
                  priority={index < 2} // Prioritize loading the first two images
                />
                
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                
                {/* Role badge */}
                <div className="absolute top-4 right-4 bg-[#D100A3]/90 text-white text-sm px-3 py-1 rounded-full shadow-lg">
                  {profile.role}
                </div>
              </div>
            </div>
            
            {/* Profile Content (Right) */}
            <div className="w-full lg:w-3/5 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {profile.name}
              </h2>
              
              <h3 className="text-xl font-medium text-[#1E4FDE] dark:text-[#5179FF]">
                {profile.role}
              </h3>
              
              {profile.quote && (
                <blockquote className="pl-4 border-l-4 border-[#D100A3] italic text-lg text-gray-700 dark:text-gray-300">
                  "{profile.quote}"
                </blockquote>
              )}
              
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                <p>{profile.bio}</p>
                
                {/* Additional content could be structured here */}
                <p className="mt-4">
                  Sebagai pengajar yang berdedikasi, beliau terus mengembangkan metode 
                  pengajaran yang inovatif dan sesuai dengan kebutuhan santri di era modern.
                  Kontribusi beliau dalam membangun karakter dan kemampuan santri telah 
                  dirasakan oleh banyak lulusan yang kini berhasil di berbagai bidang.
                </p>
              </div>
              
              {/* Social Media Icons (optional) */}
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[#1E4FDE] dark:text-[#5179FF] hover:bg-[#1E4FDE] hover:text-white dark:hover:bg-[#5179FF] transition-colors"
                  aria-label="Facebook profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[#1E4FDE] dark:text-[#5179FF] hover:bg-[#1E4FDE] hover:text-white dark:hover:bg-[#5179FF] transition-colors"
                  aria-label="Instagram profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8c0 4.41-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm4-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm5 2c.83 0 1.5-.67 1.5-1.5S16.83 8 16 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z"/></svg>
                </a>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
