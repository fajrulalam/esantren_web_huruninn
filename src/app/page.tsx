"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/firebase/auth";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // ===== Redirect Logic (unchanged) =====
  useEffect(() => {
    if (!loading && user) {
      if (user.role === "waliSantri") {
        router.push("/payment-history");
      } else {
        router.push("/rekapitulasi");
      }
    }
  }, [user, loading, router]);

  // ===== Loading State (unchanged) =====
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F5F0E6] dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1E4FDE] dark:border-[#D100A3]" />
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#F5F0E6] dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans overflow-x-hidden">
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                            */}
      {/* ============================================================ */}
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

        {/* Hero Image */}
        <div className="absolute z-0 right-[-15%] md:right-[-5%] top-0 bottom-0 w-full md:w-3/4 flex items-center justify-center pointer-events-none md:pointer-events-auto">
          <Image
            src="/hero image placeholder.png" // TODO: replace with actual transparent PNG of Kyai
            alt="Kyia profile"
            width={1200}
            height={1200}
            priority
            className="w-full h-full object-contain -scale-x-100 drop-shadow-xl opacity-70 md:opacity-100"
          />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. PROGRAM ASRAMA SECTION                                   */}
      {/* ============================================================ */}
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
          {[
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
          ].map((p) => (
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

      {/* ============================================================ */}
      {/* 3. SAPA ALUMNI SECTION                                      */}
      {/* ============================================================ */}
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

      {/* ============================================================ */}
      {/* FOOTER                                                      */}
      {/* ============================================================ */}
      <footer className="bg-[#E9E2D5] dark:bg-gray-800 pt-12 pb-6 px-6 md:px-20 text-gray-700 dark:text-gray-300">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1 */}
          <div>
            <h3
              className="text-2xl font-bold mb-3"
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
              Asrama Hurun Inn
            </h3>
            <p>
              Pondok pesantren modern dengan visi membangun generasi Qur'ani.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-lg font-semibold text-[#D100A3] mb-2">
              Navigasi
            </h4>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="hover:text-[#1E4FDE]">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:text-[#1E4FDE]">
                  Program
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-[#1E4FDE]">
                  Galeri
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-lg font-semibold text-[#D100A3] mb-2">
              Kontak
            </h4>
            <ul className="space-y-1">
              <li>Rejoso, Jombang, Jawa Timur</li>
              <li>Telp: (0321) 866686</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/40 mt-10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} puskomNet Unipdu. Hak Cipta Dilindungi.
        </div>
      </footer>
    </main>
  );
}
