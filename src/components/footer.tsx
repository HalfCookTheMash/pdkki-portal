// src/components/Footer.tsx

"use client" // Karena menggunakan Link Next.js

import Link from 'next/link';
import Image from 'next/image';

const FooterLinks = {
    Navigasi: [
        { name: "Beranda", href: "/" },
        { name: "Tentang", href: "/tentang" },
        { name: "Konsultan Aktif", href: "/pencarian?status=aktif" },
        { name: "Konsultan Non Aktif", href: "/pencarian?status=non%20aktif" },
    ],
    TautanCepat: [
        { name: "DJKI", href: "https://www.dgip.go.id" },
        { name: "AKHKI", href: "https://www.akhki.or.id" },
        { name: "MPKKI", href: "https://dgip.go.id/konsultan?kategori=Tentang%20Majelis%20Pengawas%20Konsultan%20KI" },
    ]
};

const Footer = () => {
  return (
    <footer className='bg-[#FAFAFA] border-t-2'>
        <div className="container mx-auto px-8 py-12 lg:py-16 flex flex-wrap justify-between">
            
<div className="w-full md:w-1/3 mb-8 md:mb-0 flex">
        
        {/* BAGIAN KIRI: Logo DJKI */}
        <div className="flex-shrink-0 mr-8">
            <Image
                src="/assets/logo-pdkki-footer.png" 
                alt="Logo DJKI"
                width={180} 
                height={40}
                className="h-auto w-1000"
            />
        </div>

            {/* BAGIAN KANAN: Aksen Kuning dan Link List */}
            <div className="flex-1">
                <div className="bg-[#FFD700] h-[2px] w-40 mb-0"></div>
                <div className="bg-[#FFD700] h-[3px] w-24 mb-[49px]"></div>
            
                <ul className="flex flex-col space-y-2">
               
                 {FooterLinks.Navigasi.map((item) => (
                        <li key={item.name} className="text-sm text-gray-700 font-normal hover:text-blue-700 transition">
                          <Link href={item.href} className="flex items-center">
                                <span className="mr-2 text-blue-900 font-bold">&gt;</span> 
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>


            {/* KOLOM 2: Tautan Cepat (W: 1/3) */}
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <div className="bg-[#FFD700] h-[2px] w-40 mb-0"></div>
            <div className="bg-[#FFD700] h-[3px] w-24 mb-[49px]"></div>
                <ul className="flex flex-col space-y-2 ">
                    {FooterLinks.TautanCepat.map((item) => (
                        <li key={item.name} className="text-sm text-gray-700 font-normal hover:text-blue-700 transition">
                            <Link href={item.href} className="flex items-center" target="_blank" rel="noopener noreferrer">
                                <span className="mr-2 text-blue-900 font-bold">&gt;</span>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* KOLOM 3: Kontak Kami (W: 1/3) */}
            <div className="w-full md:w-1/4">
                <h4 className="text-lg font-semibold text-blue-900 mb-4">Kontak Kami</h4>
                <div className="flex flex-col space-y-3">
                    
                    {/* Alamat */}
                    <div className="flex items-start text-sm text-gray-700">
                        {/* Ikon Lokasi - Ganti dengan SVG yang rapi */}
                        <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-blue-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
                        <span>Kementerian Hukum RI<br/>Jl. HR. Rasuna Said Kav. 8-9, Jakarta Selatan, Jakarta, Indonesia</span>
                    </div>

                    {/* Telepon */}
                    <div className="flex items-center text-sm text-gray-700">
                        {/* Ikon Telepon */}
                        <svg className="w-5 h-5 mr-3 flex-shrink-0 text-blue-900" fill="currentColor" viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-1.99.9-1.99 2v18c0 1.1.89 2 1.99 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>
                        <span>152</span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center text-sm text-gray-700">
                        {/* Ikon Email */}
                        <svg className="w-5 h-5 mr-3 flex-shrink-0 text-blue-900" fill="currentColor" viewBox="0 0 24 24"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8.5l8 5 8-5V18z"/></svg>
                        <span>halodjki@dgip.go.id</span>
                    </div>

                </div>
            </div>
        </div>
        
        {/* BARIS COPYRIGHT (Sesuai Desain: Background Biru Gelap) */}
        <div className='bg-[#023297] py-3'>
            <div className='container mx-auto px-8'>
                <p className='text-xs text-white text-center'>
                    Copyright ©Direktorat Jenderal Kekayaan Intelektual - Kementerian Hukum R.I.
                </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer;