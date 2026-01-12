// src/components/Footer.tsx
"use client"

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-gray-200 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] font-poppins mt-20">
      <div className="container mx-auto px-6 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8 lg:gap-x-16">
          
          {/* LOGO */}
          <div className="md:col-span-3">
            <div className="flex justify-start items-start">
              <Image
                src="/assets/logo-pdkki-footer.png" 
                alt="Logo DJKI"
                width={150} 
                height={50}
                className="h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* MENU */}
          <div className="md:col-span-2">
            <h4 className="text-[#0056b3] font-bold text-lg mb-6">Menu</h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: "Beranda", href: "/" },
                { name: "Tentang", href: "/tentang" },
                { name: "Konsultan Aktif", href: "/pencarian?status=aktif" },
                { name: "Konsultan Non Aktif", href: "/pencarian?status=non%20aktif" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-600 hover:text-[#0056b3] text-sm transition-colors font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* TAUTAN RESMI */}
          <div className="md:col-span-2">
            <h4 className="text-[#0056b3] font-bold text-lg mb-6">Tautan Resmi</h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: "DJKI", href: "https://www.dgip.go.id" },
                { name: "AKHKI", href: "https://www.akhki.or.id" },
                { name: "MPKKI", href: "https://dgip.go.id/konsultan?kategori=Tentang%20Konsultan%20KI" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    target="_blank" 
                    className="text-gray-600 hover:text-[#0056b3] text-sm flex items-center gap-2 transition-colors whitespace-nowrap font-medium"
                  >
                    {item.name}
                    <ExternalLink size={14} className="shrink-0 text-[#0056b3]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KONTAK */}
          <div className="md:col-span-5">
            <h4 className="text-[#0056b3] font-bold text-lg mb-6">Kontak Kami</h4>
            <div className="flex flex-col gap-6">

              <div className="flex items-start gap-4">
                <div className="bg-[#0056b3] p-2 rounded-full text-white shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-800">Kementerian Hukum RI</span><br />
                  Jl. HR. Rasuna Said Kav. 8-9, Jakarta Selatan, Jakarta, Indonesia
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#0056b3] p-2 rounded-full text-white shrink-0">
                  <Phone size={18} />
                </div>
                <p className="text-sm text-gray-600 font-medium">(021) 57905517</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#0056b3] p-2 rounded-full text-white shrink-0">
                  <Mail size={18} />
                </div>
                <p className="text-sm text-gray-600 font-medium">halodjki@dgip.go.id</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT BAR */}
      <div className="bg-[#0042a3] py-4">
        <div className="container mx-auto px-6">
          <p className="text-white text-center text-xs md:text-sm font-medium tracking-wide">
            Copyright ©Direktorat Jenderal Kekayaan Intelektual - Kementerian Hukum R.I.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;