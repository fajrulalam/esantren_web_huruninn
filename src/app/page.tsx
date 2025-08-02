"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/firebase/auth";

// Import refactored components
import {
  HeroSection,
  ProgramAsramaSection,
  ProfilPengasuhSection2,
  PrestasiSantriSection,
  SapaAlumniSection,
  Footer
} from "./components/home";

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
      {/* 1. HERO SECTION with carousel                               */}
      {/* ============================================================ */}
      <HeroSection />

      {/* ============================================================ */}
      {/* 2. PROGRAM ASRAMA SECTION                                   */}
      {/* ============================================================ */}
      <ProgramAsramaSection />

      {/* ============================================================ */}
      {/* 3. PROFIL PENGASUH SECTION                                  */}
      {/* ============================================================ */}
      <ProfilPengasuhSection2 />

      {/* ============================================================ */}
      {/* 4. PRESTASI SANTRI SECTION                                  */}
      {/* ============================================================ */}
      <PrestasiSantriSection />
      
      {/* ============================================================ */}
      {/* 5. SAPA ALUMNI SECTION                                      */}
      {/* ============================================================ */}
      <SapaAlumniSection />

      {/* ============================================================ */}
      {/* FOOTER                                                      */}
      {/* ============================================================ */}
      <Footer />
    </main>
  );
}
