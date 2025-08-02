export interface PengasuhProfile {
  id: string;
  name: string;
  namaPanggilan: string;
  role: string;
  quote?: string;
  bio: string;
  portraitImage: string;
  familyImage?: string;
  relationship?: "father" | "mother" | "child" | "spouse";
  isMarried?: boolean;
  spouseId?: string;
  parentIds?: string[];
}

export const pengasuhProfiles: PengasuhProfile[] = [
  // Parents
  {
    id: "kyai-ahmad",
    name: "KH. Ahmad Khoiruddin, M.Pd.I",
    namaPanggilan: "KH Ahmad",
    role: "Ayah & Pengasuh Utama",
    quote:
      "Santri harus memiliki karakter islami dan mampu bersaing di era global",
    bio: "KH. Ahmad Khoiruddin merupakan pengasuh utama Asrama Hurun Inn yang telah berdedikasi selama lebih dari 20 tahun dalam pendidikan Islam. Beliau menyelesaikan pendidikan S2 di bidang Pendidikan Islam dan aktif dalam berbagai organisasi keagamaan nasional.",
    portraitImage: "/placeholder alumni.png",
    // familyImage: "/placeholder alumni.png",
    relationship: "father",
    isMarried: true,
    spouseId: "nyai-siti",
  },
  {
    id: "nyai-siti",
    name: "Nyai Hj. Siti Munawaroh, M.Pd.",
    namaPanggilan: "Nyai Siti",
    role: "Ibu & Pengasuh Santri Putri",
    quote: "Pendidikan akhlak dan ilmu adalah fondasi masa depan santri",
    bio: "Nyai Hj. Siti Munawaroh fokus pada pendidikan santri putri dengan penekanan pada pengembangan akhlak dan kemampuan akademik. Beliau adalah lulusan Magister Pendidikan dan telah menulis beberapa buku tentang pendidikan karakter berbasis pesantren.",
    portraitImage: "/placeholder alumni.png",
    relationship: "mother",
    isMarried: true,
    spouseId: "kyai-ahmad",
  },
  // Children
  {
    id: "ustadz-farhan",
    name: "KH. Farhan Abdillah, Lc.",
    namaPanggilan: "Farhan",
    role: "Anak Pertama & Pengajar Al-Qur'an",
    quote: "Menghafal Al-Qur'an adalah jalan menuju keberkahan hidup",
    bio: "KH. Farhan Abdillah adalah lulusan Al-Azhar Kairo yang telah menjadi pengajar tahfidz selama 15 tahun. Metode pengajaran beliau telah melahirkan banyak penghafal Al-Qur'an yang kini tersebar di berbagai daerah.",
    portraitImage: "/placeholder alumni.png",
    relationship: "child",
    isMarried: false,
    parentIds: ["kyai-ahmad", "nyai-siti"],
  },
  {
    id: "ustadz-hasan",
    name: "Ustadz Hasan Ahmad, S.Pd.I",
    namaPanggilan: "Hasan",
    role: "Anak Kedua & Koordinator Santri",
    quote: "Disiplin adalah kunci keberhasilan santri di pesantren",
    bio: "Ustadz Hasan mengkoordinasikan seluruh kegiatan ekstrakurikuler santri dan memastikan kedisiplinan dalam keseharian. Beliau juga aktif dalam pengembangan bakat olahraga dan seni para santri.",
    portraitImage: "/placeholder alumni.png",
    relationship: "child",
    isMarried: false,
    parentIds: ["kyai-ahmad", "nyai-siti"],
  },
  {
    id: "ustadzah-fatimah",
    name: "Ustadzah Fatimah Khoiruddin, S.Pd.",
    namaPanggilan: "Fatimah",
    role: "Anak Ketiga & Pengajar Bahasa",
    quote: "Bahasa adalah jembatan untuk memahami dunia",
    bio: "Ustadzah Fatimah adalah anak ketiga yang fokus pada pengajaran bahasa Arab dan Inggris. Beliau lulusan Pendidikan Bahasa dan aktif dalam mengembangkan metode pembelajaran bahasa yang inovatif.",
    portraitImage: "/placeholder alumni.png",
    relationship: "child",
    isMarried: false,
    parentIds: ["kyai-ahmad", "nyai-siti"],
  },
  {
    id: "ustadz-ibrahim",
    name: "Ustadz Ibrahim Ahmad, S.Kom.",
    namaPanggilan: "Ibrahim",
    role: "Anak Keempat & Koordinator IT",
    quote: "Teknologi adalah sarana untuk mempermudah dakwah",
    bio: "Ustadz Ibrahim adalah anak bungsu yang mengelola sistem IT pesantren dan mengembangkan platform digital untuk pembelajaran. Beliau lulusan Teknik Informatika dan berpengalaman dalam pengembangan aplikasi pendidikan.",
    portraitImage: "/placeholder alumni.png",
    relationship: "child",
    isMarried: false,
    parentIds: ["kyai-ahmad", "nyai-siti"],
  },
];
