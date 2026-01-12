"use client";

import React, { Suspense } from 'react'; 
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Download, ChevronLeft } from 'lucide-react';
import Hero from '@/components/hero';

const DetailContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get('name') || 'Konsultan';

  const docs = [
    { 
      id: 1, 
      img: "/assets/placeholder-kiri.png", 
      file: "/assets/placeholder-dokumen-kiri.pdf",
      alt: "Dokumen Riwayat" 
    },
    { 
      id: 2, 
      img: "/assets/placeholder-kanan.png", 
      file: "/assets/placeholder-dokumen-kanan.pdf",
      alt: "Surat Keterangan" 
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-12 py-16">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-[#001678] transition-all mb-8 group"
      >
        <div className="p-2 rounded-full group-hover:bg-blue-50">
          <ChevronLeft size={20} />
        </div>
        <span className="font-medium">Kembali</span>
      </button>

      <div className="mb-12">
        <h2 
          style={{ color: '#001678', fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 600 }}
          className="inline-block border-b-4 border-yellow-400 pb-1"
        >
          Detail Non Aktif
        </h2>
        <p className="mt-8 text-xl font-medium text-gray-700">
          Keterangan: <span className="font-bold">{name}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-10 md:gap-16 justify-start">
        {docs.map((doc) => (
          <div key={doc.id} className="flex flex-col items-center">
            <div 
              style={{ width: '16.75rem', height: '23.6875rem', border: '1px solid #000', position: 'relative', overflow: 'hidden' }}
              className="shadow-lg mb-6 hover:shadow-2xl transition-all duration-300 bg-gray-200"
            >
              <Image src={doc.img} alt={doc.alt} fill className="object-cover" />
            </div>
            <a href={doc.file} download className="flex items-center gap-2 text-gray-600 hover:text-[#001678] transition-colors font-semibold group">
              <div className="p-2 rounded-full group-hover:bg-blue-50">
                <Download size={24} />
              </div>
              <span>Download Dokumen</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const DetailNonAktifPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Suspense fallback={<div className="container mx-auto px-4 py-16">Memuat Data...</div>}>
        <DetailContent />
      </Suspense>
    </div>
  );
};

export default DetailNonAktifPage;