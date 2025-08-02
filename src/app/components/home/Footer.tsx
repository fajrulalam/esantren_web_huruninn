"use client";

import Link from "next/link";

export const Footer = () => {
  return (
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
  );
};
