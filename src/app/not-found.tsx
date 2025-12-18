// src/app/not-found.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="relative w-full max-w-lg aspect-video mb-8">
        <Image 
          src="/assets/404.svg" 
          alt="404 - Halaman Tidak Ditemukan"
          fill
          priority
          className="object-contain"
        />
      </div>

      <h1 
        style={{
          color: '#313E5E',
          fontFamily: 'Inter, sans-serif',
          fontSize: '2.5rem',
          fontWeight: 800,
        }}
        className="mb-4"
      >
        Oopps! Halaman Tidak Ditemukan
      </h1>

      <p 
        style={{
          color: '#6B7280',
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.125rem',
          maxWidth: '32rem'
        }}
        className="mb-10 leading-relaxed"
      >
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan. 
        Silakan periksa kembali URL Anda atau kembali ke halaman utama.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-all font-semibold"
        >
          <ArrowLeft size={20} />
          Kembali
        </button>

        <Link href="/">
          <button className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#001678] text-white hover:bg-blue-900 shadow-lg shadow-blue-900/20 transition-all font-semibold">
            <Home size={20} />
            Beranda Utama
          </button>
        </Link>
      </div>
    </div>
  );
}