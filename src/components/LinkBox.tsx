// src/components/LinkBox.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

const LinkBox = () => {
  return (
    <Link href="/validasi-data" className="block group">
      <div className="bg-[#FFD700] p-4 rounded-md border border-yellow-600 flex items-start gap-3 shadow-sm transition-all hover:brightness-95 hover:shadow-md cursor-pointer">

        <div className="bg-orange-500 text-white rounded-sm p-1 mt-0.5 flex items-center justify-center">
          <AlertTriangle size={14} strokeWidth={3} />
        </div>

        <div className="flex-1">
          <p className="text-[11px] font-bold text-gray-800 font-poppins group-hover:underline">
            Apakah data Anda sudah benar?
          </p>
          <p className="text-[10px] text-gray-700 leading-tight font-poppins mt-0.5">
            Jika Anda menemukan kesalahan pada data Anda, silakan ajukan permintaan koreksi.
          </p>
        </div>

        <div className="self-center text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default LinkBox;