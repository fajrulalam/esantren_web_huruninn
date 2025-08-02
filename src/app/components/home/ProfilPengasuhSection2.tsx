"use client";

import Image from "next/image";
import Link from "next/link";
import { pengasuhProfiles } from "@/data/pengasuh";

export const ProfilPengasuhSection2 = () => {
  const mainProfile = pengasuhProfiles[0];
  const parents = pengasuhProfiles.filter(
    (p) => p.relationship === "father" || p.relationship === "mother"
  );
  const children = pengasuhProfiles.filter((p) => p.relationship === "child");

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
        <div className="flex flex-col lg:flex-row gap-8 lg:items-stretch">
          {/* Left Side - Family Picture */}
          <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="relative w-full h-64 lg:h-full rounded-2xl overflow-hidden shadow-lg group">
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

          {/* Right Side - Family Profiles */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="flex flex-col gap-6 py-4">
              {/* Parents Row */}
              <div className="flex justify-center gap-6">
                {parents.map((profile) => (
                  <Link
                    key={profile.id}
                    href={`/profil-pengasuh#${profile.id}`}
                    className="flex-1 max-w-[240px]"
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
              <div className="flex justify-center">
                <div className="w-40 h-1 bg-gradient-to-r from-[#1E4FDE] to-[#5179FF] rounded-full"></div>
              </div>

              {/* Children Row */}
              <div className="flex justify-center gap-4">
                {children.map((profile) => (
                  <Link
                    key={profile.id}
                    href={`/profil-pengasuh#${profile.id}`}
                    className="flex-1 max-w-[120px]"
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
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
