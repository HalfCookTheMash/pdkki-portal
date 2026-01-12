"use client";

import React from 'react';
import Hero from '@/components/hero';
import { CheckCircle2 } from 'lucide-react';

const TentangPage = () => {
  return (
    <main className="bg-white min-h-screen pb-20 font-poppins">
      <Hero />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">

          {/* Info Utama */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="border border-gray-200 rounded-xl p-8 shadow-sm min-h-[250px]">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Tujuan</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Menyediakan platform yang transparan dan mudah diakses bagi publik untuk memverifikasi legalitas dan kompetensi para konsultan KI di seluruh wilayah Indonesia.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-8 shadow-sm min-h-[250px]">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Sasaran Pengguna</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Masyarakat umum yang membutuhkan jasa konsultan KI, pelaku usaha, akademisi, dan konsultan KI yang terdaftar.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-8 shadow-sm min-h-[250px]">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Validitas Data</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Data yang ditampilkan diperbarui secara berkala dan bersumber langsung dari sistem informasi Direktorat Jenderal Kekayaan Intelektual (DJKI).
              </p>
            </div>
          </div>

          {/* Penjelasan Detail & Manfaat */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Apa itu Konsultan Kekayaan Intelektual?
              </h3>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  Konsultan Kekayaan Intelektual (KKI) adalah profesional yang memiliki izin resmi untuk memberikan jasa konsultasi di bidang kekayaan intelektual.
                </p>
                <p>
                  Konsultan KI harus memenuhi persyaratan tertentu dan lulus ujian sertifikasi yang diselenggarakan oleh Direktorat Jenderal Kekayaan Intelektual (DJKI).
                </p>
                <p>
                Dengan menggunakan jasa Konsultan KI terdaftar, Anda dapat memastikan bahwa proses pendaftaran kekayaan intelektual Anda ditangani oleh profesional yang kompeten dan terpercaya.
                </p>
              </div>
            </div>

            {/* Bagian Catatan */}
            <div className="border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Manfaat Pangkalan Data Ini
              </h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Verifikasi status konsultan KI secara online",
                  "Informasi lengkap tentang bidang keahlian konsultan",
                  "Akses ke data wilayah praktik konsultan",
                  "Transparansi informasi untuk masyarakat",
                  "Kemudahan dalam mencari konsultan terpercaya"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-[#FFF9E6] border border-[#F6E4C1] rounded-lg p-5">
                <p className="text-sm text-gray-800 leading-relaxed">
                  <span className="font-bold">Catatan:</span> Pastikan selalu memverifikasi status konsultan sebelum menggunakan jasanya untuk memastikan konsultan tersebut masih aktif dan terdaftar resmi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TentangPage;