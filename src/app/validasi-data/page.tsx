"use client";

import React, { useState } from 'react';
import Hero from '@/components/hero';
import { Upload } from 'lucide-react';

const ValidasiDataPage = () => {
  
  const [gender, setGender] = useState<string | null>(null);

  return (
    <main className="bg-white min-h-screen pb-20">
      <Hero />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Judul Formulir */}
          <div className="text-center mb-12">
            <h2 className="text-[#CC0000] text-xl md:text-2xl font-bold font-poppins uppercase tracking-wide">
              Formulir Validasi Data & Alamat
            </h2>
            <h2 className="text-[#CC0000] text-xl md:text-2xl font-bold font-poppins uppercase tracking-wide">
              Konsultan Kekayaan Intelektual 2026
            </h2>
          </div>

          <form className="space-y-4 text-sm md:text-base font-poppins">
            {/* Data Pribadi */}
            {[
              { label: "Nama Lengkap", name: "nama" },
              { label: "Nomor Konsultan", name: "no_konsultan" },
              { label: "Tempat, Tanggal Lahir", name: "ttl" },
              { label: "Agama", name: "agama" },
            ].map((field) => (
              <div key={field.name} className="grid grid-cols-1 md:grid-cols-12 items-center gap-2">
                <label className="md:col-span-3 font-medium text-gray-700">{field.label}</label>
                <div className="md:col-span-9 flex items-center gap-4">
                  <span className="hidden md:inline">:</span>
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
            ))}

            {/* Gender Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-2">
              <label className="md:col-span-3 font-medium text-gray-700">Jenis Kelamin</label>
              <div className="md:col-span-9 flex items-center gap-4">
                <span className="hidden md:inline">:</span>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span>Laki-laki</span>
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 border-gray-300 rounded" 
                      checked={gender === 'Laki-laki'}
                      onChange={() => setGender('Laki-laki')}
                    />
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span>Perempuan</span>
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 border-gray-300 rounded" 
                      checked={gender === 'Perempuan'}
                      onChange={() => setGender('Perempuan')}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Kantor & Rumah */}
            {[
              { label: "Nama Kantor/Perusahaan", name: "kantor" },
              { label: "Alamat Kantor", name: "alamat_kantor", isTextArea: true },
              { label: "No. Telp/Fax Kantor", name: "telp_kantor" },
              { label: "Alamat Rumah", name: "alamat_rumah" },
              { label: "No Telp/Fax Rumah", name: "telp_rumah" },
              { label: "Handphone", name: "hp" },
            ].map((field) => (
              <div key={field.name} className="grid grid-cols-1 md:grid-cols-12 items-start gap-2 pt-1">
                <label className="md:col-span-3 font-medium text-gray-700 mt-1.5">{field.label}</label>
                <div className="md:col-span-9 flex items-start gap-4">
                  <span className="mt-1.5 hidden md:inline">:</span>
                  <div className="w-full space-y-2">
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    {field.isTextArea && (
                        <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Alamat Korespondensi */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-2 pt-2">
              <label className="md:col-span-3 font-medium text-gray-700">Alamat Korespondensi</label>
              <div className="md:col-span-9 flex items-start gap-4">
                <span className="hidden md:inline">:</span>
                <div className="w-full space-y-3">
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  {["Kabupaten/Kota", "Provinsi", "Kode pos", "Telp", "E-mail"].map((sub) => (
                    <div key={sub} className="grid grid-cols-12 items-center gap-2">
                      <div className="col-span-4 flex items-center gap-2">
                         <span className="text-xl leading-none">•</span>
                         <label className="text-sm">{sub}</label>
                      </div>
                      <div className="col-span-8">
                        <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pernyataan */}
            <div className="pt-8 space-y-4 text-sm text-gray-800">
              <p>Dengan ini saya menyatakan bahwa:</p>
              <ol className="list-decimal ml-5 space-y-2">
                <li>Data-data tersebut di atas adalah benar dan sesuai dengan keadaan yang sesungguhnya.</li>
                <li>Alamat korespondensi (termasuk alamat email) untuk keperluan surat menyurat sebagaimana tersebut di atas adalah alamat yang benar dan mudah dijangkau atau dihubungi sebagaimana mestinya oleh DJKI.</li>
              </ol>
            </div>

            {/* Upload Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10">
              {/* Pas Foto */}
              <div className="flex flex-col items-center gap-3">
                <p className="font-bold text-sm">Upload File</p>
                <p className="text-xs -mt-2">Pas foto</p>
                <div 
                  style={{ width: '251px', height: '216px' }}
                  className="border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Upload className="text-gray-400 mb-2" size={32} />
                  <p className="text-[10px] text-red-500 leading-tight">latar belakang merah (ukuran 4x6 cm)</p>
                  <p className="text-[10px] text-red-500 leading-tight mt-1">(Untuk file foto berbentuk softcopy min. resolution: 300dpi)</p>
                </div>
              </div>

              {/* Tanda Tangan */}
              <div className="flex flex-col items-center gap-3">
                <p className="font-bold text-sm">Upload File</p>
                <p className="text-xs -mt-2">Tanda Tangan</p>
                <div 
                  style={{ width: '251px', height: '216px' }}
                  className="border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Upload className="text-gray-400 mb-2" size={32} />
                  <p className="text-[10px] text-red-500 leading-tight mt-4">(Untuk file foto berbentuk softcopy min. resolution: 300dpi)</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-10">
              <button type="submit" className="px-10 py-2 bg-[#4CAF50] text-white rounded font-medium hover:bg-green-600 transition-shadow shadow-sm active:scale-95">
                Proses
              </button>
              <button type="button" className="px-10 py-2 bg-white border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-shadow shadow-sm active:scale-95">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ValidasiDataPage;