"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// Kamus Bahasa
export const translations = {
  id: {
    // General
    cons: "Konsultan",
    male: "Laki-Laki",
    female: "Perempuan",
    active: "Aktif",
    inactive: "Tidak Aktif",
    reset: "Ulang",
    
    //navbar
    navHome: "Beranda",
    navAbout: "Tentang",
    navStatistik : "Statistik",
    navFaq: "F.A.Q",

    // hero
    heroTitle: "Pangkalan Data Konsultan",
    heroSubtitle: "Direktorat Jenderal Kekayaan Intelektual",
    heroDesc: "Menampilkan sebaran nasional dan jaringan kantor Konsultan Kekayaan Intelektual",
    
    // Accessibility Menu
    accMenu: "Menu Aksesibilitas",
    audioTitle: "Kontrol Audio",
    audioOptA:"Putar",
    audioOptB:"Jeda",
    audioOptC:"Berhenti",
    fontTitle: "Kontrol Font",
    fontOptA:"Perbesar",
    fontOptB: "Perkecil",
    contrastTitle:"Kontrol Kontras",
    contrast:"Kontras Tinggi",
    textTilte: "Penyesuaian Text",
    dysFont: "Font Disleksia",
    cursor: "Kursor Besar",
    spaceTitle: "Kontrol Spasi",
    spaceOptA: "Tambah Jarak",
    spaceOptB: "Kurangi Jarak",
    zoomTitle: "Kontrol Zoom",
    resetBtn: "Reset semua pengaturan",
    resetDesc: "Kembali ke pengaturan awal",

    // Stat Cards
    totalconTitle: "Total Konsultan",
    activeconTitle: "Konsultan Aktif",
    inactiveconTitle: "Konsultan Tidak Aktif",
    regionTitle: "Wilayah",

    // footer
    contactTitle: "Kontak Kami",
    linkTitle: "Tautan Resmi",

    // Map Card
    mapTitle: "Peta Sebaran Konsultan KI",
    mapDesc: "Klik wilayah untuk melihat detail data",
    numconTitle: "Jumlah Konsultan",

    // Search Form
    srcformTitle: "Panel Pencarian",
    srcformnamePlaceholder: "Cari nama konsultan atau nomor registrasi...",
    srcformCSTitle: "Status Konsultan",
    srcformCSOptA: "Semua Konsultan",
    srcformGTitle: "Jenis Kelamin",
    srcformGOptA: "Semua Jenis Kelamin",
    srcRoptA: "Semua Wilayah",
    searchBtn:"Cari",

    // Link Box
    linkboxTitle: "Apakah data Anda sudah benar",
    linkboxDesc: "Jika Anda menemukan kesalahan pada data Anda, silakan ajukan permintaan koreksi",

    // About Page    
    objTitle: "Tujuan",
    objDesc: "Menyediakan platform yang transparan dan mudah diakses bagi publik untuk memverifikasi legalitas dan kompetensi para konsultan KI di seluruh wilayah Indonesia.",
    targetuserTitle: "Sasaran Pengguna",
    targetuserDesc: "Masyarakat umum yang membutuhkan jasa konsultan KI, pelaku usaha, akademisi, dan konsultan KI yang terdaftar.",
    datavalTitle: "Validitas Data",
    datavalDesc: "Data yang ditampilkan diperbarui secara berkala dan bersumber langsung dari sistem informasi Direktorat Jenderal Kekayaan Intelektual (DJKI).",
    defTitle: "Apa itu Konsultan Kekayaan Intelektual?",
    defDescP1: "Konsultan Kekayaan Intelektual (KKI) adalah profesional yang memiliki izin resmi untuk memberikan jasa konsultasi di bidang kekayaan intelektual.",
    defDescP2: "Konsultan KI harus memenuhi persyaratan tertentu dan lulus ujian sertifikasi yang diselenggarakan oleh Direktorat Jenderal Kekayaan Intelektual (DJKI).",
    defDescP3: "Dengan menggunakan jasa Konsultan KI terdaftar, Anda dapat memastikan bahwa proses pendaftaran kekayaan intelektual Anda ditangani oleh profesional yang kompeten dan terpercaya.",
    benTitle: "Manfaat Pangkalan Data Ini",
    benDescP1: "Verifikasi status konsultan KI secara online",
    benDescP2: "Informasi lengkap tentang bidang keahlian konsultan",       
    benDescP3: "Akses ke data wilayah praktik konsultan",
    benDescP4: "Transparansi informasi untuk masyarakat",
    benDescP5: "Kemudahan dalam mencari konsultan terpercaya",
    noteTitle: "Catatan",
    noteDesc: "Pastikan selalu memverifikasi status konsultan sebelum menggunakan jasanya untuk memastikan konsultan tersebut masih aktif dan terdaftar resmi.",
    
    // Statistics Page
    constatusTitle: "Status Konsultan",
    conhighestTitle: "10 Provinsi dengan Konsultan Terbanyak",

    // FAQ Page 
    faqQ1: "Apa itu Konsultan Kekayaan Intelektual (KKI)?",
    faqA1: "Konsultan Kekayaan Intelektual adalah profesional yang terdaftar dan memiliki lisensi untuk memberikan jasa konsultasi, pendampingan, dan pengurusan permohonan hak kekayaan intelektual seperti Paten, Merek, Hak Cipta, Desain Industri, dan Rahasia Dagang.",
    faqQ2: "Bagaimana cara mencari Konsultan KI di PDKKI?",
    faqA2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    faqQ3: "Apa perbedaan status Aktif dan Tidak Aktif?",
    faqA3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    faqQ4: "Bagaimana cara memverifikasi kebenaran Konsultan KI?",
    faqA4: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    faqQ5: "Apa saja bidang keahlian yang dilayani Konsultan KI?",
    faqA5: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    faqQ6: "Apakah data di PDKKI selalu diperbarui?",
    faqA6: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    faqQ7: "Bagaimana jika saya menemukan data yang tidak akurat?",
    faqA7: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    faqQ8: "Apakah ada biaya untuk menggunakan layanan PDKKI?",
    faqA8: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",  

    // Search Page
    resultTitle: "Hasil Pencarian",
    resultDesc: "Data ditemukan berdasarkan filter",
    resultShow: "Tampilkan",
    firstPage: "Awal",
    lastPage: "Akhir",
    firmTitle: "Firma Hukum",
    condetailTitle: "Detail Konsultan",
    connumTitle: "Nomor Konsultan",
    conoffTitle: "Kantor",
    conoffaddTitle: "Alamat Kantor",
    phoTitle: "Kontak",

    // Validation Page
    valTitle: "Formulir Validasi Data & Alamat",
    valSubtitle: "Konsultan Kekayaan Intelektual",
    valQ1: "Nama Lengkap",
    valQ2: "Nomor Konsultan",
    valQ3: "Tempat Lahir",
    valQ4: "Agama",
    valQ5: "Jenis Kelamin",
    valQ6: "Nama Kantor/Perusahaan",
    valQ7: "Alamat Kantor",
    valQ8: "no. Telp/Fax Kantor",
    valQ9: "Alamat Rumah",
    valQ10: "no. Telp/Fax Rumah",
    valQ11: "no. Telp Pribadi",
    valQ12: "Alamat Korespondensi",
    valQ13: "Kabupaten/Kota",
    valQ14: "Provinsi",
    valQ15: "Kode Pos",
    valQ16: "Nomor Telepon",
    valQ17: "Tanggal Lahir",
    valstatTitle: "Dengan ini saya menyatakan bahwa:",
    valS1: "Data-data tersebut di atas adalah benar dan sesuai dengan keadaan yang sesungguhnya.",
    valS2: "Alamat korespondensi (termasuk alamat email) untuk keperluan surat menyurat sebagaimana tersebut di atas adalah alamat yang benar dan mudah dijangkau atau dihubungi sebagaimana mestinya oleh DJKI.",
    fileuploadTitle: "Unggah File",
    fileObl1: "Pas Foto",
    fileDesc1: "latar belakang merah (ukuran 4x6 cm)",
    fileDesc2: "(Untuk file foto berbentuk softcopy min. resolution: 300dpi)",
    fileObl2: "Tanda Tangan",
    valupBtn: "Unggah",
    valcnBtn: "Batalkan",

    // Inactive Detail Page
    returnBtn: "Kembali",
    inactiveTitle: "Detail Tidak Aktif",
    inactiveDesc: "Keterangan:",
    downloadBtn: "Unduh Dokumen",


  },
  en: {
    // General
    cons: "Conusultants",
    male: "Male",
    female: "Female",
    active: "Active",
    inactive: "Inactive",
    reset: "Reset",
    
    // navbar
    navHome: "Home",
    navAbout: "About",
    navStatistik : "Statistics",
    navFaq: "F.A.Q",

    // hero
    heroTitle: "Indonesian Intellectual Property ",
    heroSubtitle: "Consultant Database",
    heroDesc: "Providing the national distribution and network of IP Consultant offices",
    
    // Accessibility Menu
    accMenu: "Accessibility Menu",
    audioTitle: "Audio Controls",
    audioOptA:"Play",
    audioOptB:"Pause",
    audioOptC:"Stop",
    fontTitle: "Font Controls",
    fontOptA:"Enlarge",
    fontOptB: "Reduce",
    contrastTitle:"Contrast Controls",
    contrast:"High Contrast",
    textTilte: "Text Adjusments",
    dysFont: "Dyslexic Font",
    cursor: "Big Cursor",
    spaceTitle: "Space Controls",
    spaceOptA: "Add Space",
    spaceOptB: "Reduce Space",
    zoomTitle: "Zoom Controls",
    resetBtn: "Reset all settings",
    resetDesc: "Return to default settings",

    // Stat Cards
    totalconTitle: "Total Consultants",
    activeconTitle: "Active Consultants",
    inactiveconTitle: "Inactive Consultants",
    regionTitle: "Region",

    // Footer
    contactTitle: "Our Contacts",
    linkTitle: "Official Links",

    // Map Card
    mapTitle: "IP Consultants Disribution Map",
    mapDesc: "Click on a region to view detailed data",
    numconTitle: "Amount of Consultants",

    // Search Form
    srcformTitle: "Search Form",
    srcformnamePlaceholder: "Find the consultants name or registration numbers",
    srcformCSTitle: "Consultant Status",
    srcformCSOptA: "All Consultants",
    srcformGTitle: "Gender",
    srcformGOptA: "All Genders",
    srcRoptA: "All Regions",
    searchBtn:"Search",

    // Link Box
    linkboxTitle: "Is your personal data correct",
    linkboxDesc: "If you find any errors in your data, please submit a correction request",

    // About Page
    objTitle: "Objective",
    objDesc: "To provide a transparent and easily accessible platform for the public to verify the legality and competence of IP consultants throughout Indonesia.",
    targetuserTitle: "Target Users",
    targetuserDesc: "The general public who need IP consulting services, business people, academics, and registered IP consultants.",
    datavalTitle: "Data Validity",
    datavalDesc: "The data displayed is updated regularly and sourced directly from the Directorate General of Intellectual Property (DGIP) information system.",
    defTitle: "What is an Intellectual Property Consultant?",
    defDescP1: "An Intellectual Property Consultant is a professional who has an official license to provide consulting services in the field of intellectual property.",
    defDescP2: "IP consultants must meet certain requirements and pass a certification exam administered by the Directorate General of Intellectual Property (DGIP).",
    defDescP3: "By using the services of a registered IP consultant, you can ensure that your intellectual property registration process is handled by a competent and trusted professional.",
    benTitle: "Benefits of This Database",
    benDescP1: "Online verification of IP consultant status",
    benDescP2: "Complete information about the consultant's area of expertise",       
    benDescP3: "Access to data on the consultant's practice area",
    benDescP4: "Transparency of information for the public",
    benDescP5: "Ease of finding a trusted consultant",
    noteTitle: "Note",
    noteDesc: "Always verify the consultant's status before using their services to ensure that they are still active and officially registered.",
 
    // Statistics Page
    constatusTitle: "Consultant Status",
    conhighestTitle: "10 Region with the Most Consultants",

    // FAQ Page 
    faqQ1: "What is an Intellectual Property Consultant?",
    faqA1: "An Intellectual Property Consultant is a registered professional licensed to provide consulting, assistance, and management services for intellectual property rights applications such as patents, trademarks, copyrights, industrial designs, and trade secrets.",
    faqQ2: "How do I find an IP Consultant on PDKKI?",
    faqA2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    faqQ3: "What is the difference between Active and Inactive status?",
    faqA3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    faqQ4: "How do I verify the authenticity of an IP Consultant?",
    faqA4: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    faqQ5: "What areas of expertise does the IP Consultant cover?",
    faqA5: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    faqQ6: "Is the data in PDKKI always up to date?",
    faqA6: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    faqQ7: "What if I find inaccurate data?",
    faqA7: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    faqQ8: "Is there a fee for using PDKKI services?",
    faqA8: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",  
  
    // Search Page
    resultTitle: "Search Result",
    resultDesc: "Results found based on filter",
    resultShow: "Show",
    firstPage: "First",
    lastPage: "Last",
    firmTitle: "Law Firm",
    condetailTitle: "Consultant Details",
    connumTitle: "Consultant ID Number",
    conoffTitle: "Office",
    conoffaddTitle: "Office Address",
    phoTitle: "Contacs",

    // Validation Page
    valTitle: "Intellectual Property Consultant",
    valSubtitle: "Data & Address Validation Form",
    valQ1: "Full Name",
    valQ2: "Consultant ID Number",
    valQ3: "Birth Place",
    valQ4: "Religion",
    valQ5: "Gender",
    valQ6: "Office/Company Name",
    valQ7: "Office Address",
    valQ8: "Office Tel/Fax Number",
    valQ9: "Home Address",
    valQ10: "Home Phone/Fax Number",
    valQ11: "Personal Phone Number",
    valQ12: "Correspondence Address",
    valQ13: "District/City",
    valQ14: "Province",
    valQ15: "Postcode",
    valQ16: "Phone Number",
    valQ17: "Birth Date",
    valstatTitle: "I hereby declare that:",
    valS1: "The above data is true and in accordance with the actual situation.",
    valS2: "The correspondence address (including email address) for correspondence purposes as mentioned above is the correct address and is easily accessible or contacted properly by DGIP.",
    fileuploadTitle: "Upload File",
    fileObl1: "Photo",
    fileDesc1: "Red background (size 4x6 cm)",
    fileDesc2: "(For softcopy photo files min. resolution: 300dpi)",
    fileObl2: "Signature",
    valupBtn: "Upload",
    valcnBtn: "Cancel",

    // Inactive Detail Page
    returnBtn: "Return",
    inactiveTitle: "Inactive Details",
    inactiveDesc: "Information:",
    downloadBtn: "Download Documents",

  }
};

type Language = 'id' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.id;
  isAudioEnabled: boolean;           
  setIsAudioEnabled: (val: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('id');
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('app-lang') as Language;
    if (savedLang) setLang(savedLang);
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('app-lang', newLang);
  };

  const value = {
    lang,
    setLang: handleSetLang,
    t: translations[lang],
    isAudioEnabled,
    setIsAudioEnabled
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}