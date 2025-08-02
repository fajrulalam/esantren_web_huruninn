"use client";

import Image from "next/image";
import Link from "next/link";
import { pengasuhProfiles } from "@/data/pengasuh";

export const ProfilPengasuhSection = () => {
  // Get the main profile for the family image (first in the list)
  const mainProfile = pengasuhProfiles[0];

  return (
    <section className="py-24 px-6 md:px-20 bg-[#F5F0E6] dark:bg-gray-900">
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
        Profil Pengasuh
      </h2>

      <div className="max-w-full mx-auto bg-white/30 dark:bg-white/5 rounded-3xl p-6 md:p-10 shadow-lg backdrop-blur-lg ring-1 ring-white/40 dark:ring-white/10">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
          {/* Left Side - Family Picture */}
          <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl shadow-lg">
            <div className="w-full aspect-[21/9] relative rounded-2xl overflow-hidden group">
              <Image
                src={mainProfile.familyImage || "/samudeqo family.png"}
                alt="Keluarga Pengasuh Pesantren"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <p className="text-white/90 text-lg font-medium">
                  Keluarga {mainProfile.name}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Family Tree */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col justify-between py-4">
              {/* Parents Row */}
              <div className="flex justify-center gap-8 mb-6">
                {pengasuhProfiles
                  .filter(
                    (p) =>
                      p.relationship === "father" || p.relationship === "mother"
                  )
                  .map((profile) => (
                    <Link
                      key={profile.id}
                      href={`/profil-pengasuh#${profile.id}`}
                      className="flex-1 max-w-[280px]"
                    >
                      <div className="relative overflow-hidden bg-gradient-to-br from-white/30 to-white/10 dark:from-white/10 dark:to-white/5 aspect-[4/5] rounded-xl shadow-md group transition-all duration-300 hover:shadow-lg hover:ring-2 ring-[#1E4FDE] cursor-pointer">
                        <Image
                          src={profile.portraitImage}
                          alt={profile.name}
                          fill
                          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4">
                          <p className="text-white text-base font-medium truncate">
                            {profile.namaPanggilan}
                          </p>
                          <p className="text-white/80 text-sm truncate">
                            {profile.relationship === "father" ? "Ayah" : "Ibu"}
                          </p>
                        </div>
                        {profile.relationship === "father" && (
                          <div className="absolute top-2 right-2 bg-[#D100A3] text-white text-xs px-2 py-1 rounded-full shadow-md">
                            Pengasuh Utama
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
              </div>

              {/* Connection Line */}
              <div className="flex justify-center mb-6">
                <div className="w-40 h-1 bg-gradient-to-r from-[#1E4FDE] to-[#5179FF] rounded-full"></div>
              </div>

              {/* Children Row */}
              <div className="flex justify-center gap-4 mb-6">
                {pengasuhProfiles
                  .filter((p) => p.relationship === "child")
                  .map((profile) => (
                    <Link
                      key={profile.id}
                      href={`/profil-pengasuh#${profile.id}`}
                      className="flex-1 max-w-[200px]"
                    >
                      <div className="relative overflow-hidden bg-gradient-to-br from-white/30 to-white/10 dark:from-white/10 dark:to-white/5 aspect-[4/5] rounded-lg shadow-md group transition-all duration-300 hover:shadow-lg hover:ring-2 ring-[#1E4FDE] cursor-pointer">
                        <Image
                          src={profile.portraitImage}
                          alt={profile.name}
                          fill
                          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-3">
                          <p className="text-white text-sm font-medium truncate">
                            {profile.namaPanggilan}
                          </p>
                          <p className="text-white/80 text-xs truncate">Anak</p>
                        </div>
                        {profile.isMarried && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                            ♥
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
              </div>

              {/* Marriage Connections and Spouses */}
              <div className="relative">
                {/* Dotted lines for married children */}
                <div className="absolute top-0 left-0 w-full h-full">
                  {pengasuhProfiles
                    .filter((p) => p.relationship === "child" && p.isMarried)
                    .map((child) => {
                      const childIndex = pengasuhProfiles
                        .filter((p) => p.relationship === "child")
                        .findIndex((p) => p.id === child.id);
                      const leftPosition = childIndex * 25 + 8; // Percentage positioning
                      return (
                        <div
                          key={child.id}
                          className="absolute"
                          style={{ left: `${leftPosition}%` }}
                        >
                          <div className="w-0.5 h-12 border-l-2 border-dashed border-green-500 opacity-70"></div>
                        </div>
                      );
                    })}
                </div>

                {/* Spouses Row */}
                <div className="flex justify-center gap-4 pt-12 mb-6">
                  {pengasuhProfiles
                    .filter((p) => p.relationship === "child")
                    .map((child) => {
                      const spouse = pengasuhProfiles.find(
                        (p) => p.id === child.spouseId
                      );
                      return (
                        <div key={child.id} className="flex-1 max-w-[200px]">
                          {spouse ? (
                            <Link href={`/profil-pengasuh#${spouse.id}`}>
                              <div className="relative overflow-hidden bg-gradient-to-br from-green-100/40 to-green-50/20 dark:from-green-900/30 dark:to-green-800/20 aspect-[4/5] rounded-lg shadow-md group transition-all duration-300 hover:shadow-lg hover:ring-2 ring-green-500 cursor-pointer">
                                <Image
                                  src={spouse.portraitImage}
                                  alt={spouse.name}
                                  fill
                                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-3">
                                  <p className="text-white text-sm font-medium truncate">
                                    {spouse.namaPanggilan}
                                  </p>
                                  <p className="text-white/80 text-xs truncate">
                                    Menantu
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ) : (
                            <div className="aspect-[4/5]"></div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Read more button */}
              <div className="flex justify-end">
                <Link
                  href="/profil-pengasuh"
                  className="px-8 py-3 bg-white dark:bg-gray-800 text-[#1E4FDE] dark:text-white hover:bg-[#1E4FDE] hover:text-white dark:hover:bg-[#1E4FDE] rounded-full shadow-md transition-all duration-300 font-medium ring-1 ring-[#1E4FDE]/30 hover:ring-[#1E4FDE]"
                >
                  Baca lebih lanjut
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
