"use client";

import React, { useState } from 'react';
import Hero from '@/components/hero';
import { ChevronRight, Plus, Minus } from 'lucide-react';

const FAQ_DATA = [
  { id: 1, question: "Berapa lama masa berlaku Kode Billing yang telah dibayarkan?", answer: "Masa berlaku kode billing biasanya bervariasi tergantung pada jenis permohonan, namun umumnya aktif selama beberapa jam hingga hari sebelum kedaluwarsa jika tidak segera dibayarkan." },
  { id: 2, question: "Bagaimana cara mengubah data profil konsultan?", answer: "Perubahan data dapat dilakukan melalui dashboard akun dengan melampirkan dokumen pendukung yang sah." },

];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header Hero */}
      <Hero />

      <main className="container mx-auto px-4 md:px-12 py-12">

        <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
          <span>Beranda</span>
          <ChevronRight size={14} />
          <span className="text-blue-900 font-semibold">Frequently Asked Question</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 2. Sidebar Kategori (Kiri) */}
          <div className="w-full lg:w-1/4">
            <div className="border border-gray-300 rounded-2xl p-6 flex justify-between items-center cursor-pointer hover:border-blue-900 transition-all group">
              <span className="text-xl font-bold text-[#001678]">Umum</span>
              <div className="bg-blue-900 rounded-full p-2 text-white group-hover:scale-110 transition-transform">
                <ChevronRight size={20} />
              </div>
            </div>
          </div>

          {/* 3. Accordion List (Kanan) */}
          <div className="w-full lg:w-3/4">
            <div className="border border-yellow-200 bg-[#FFFBEB] rounded-[2rem] overflow-hidden">
              {FAQ_DATA.map((faq, index) => (
                <div key={faq.id} className="border-b border-gray-200 last:border-none">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-yellow-100/50 transition-colors"
                  >
                    <span className="font-bold text-gray-700">
                      {index + 1}. {faq.question}
                    </span>
                    {openIndex === index ? (
                      <Minus size={20} className="text-gray-500 flex-shrink-0" />
                    ) : (
                      <Plus size={20} className="text-gray-500 flex-shrink-0" />
                    )}
                  </button>


                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-8 pb-8 text-gray-600 leading-relaxed border-t border-yellow-100 pt-4 bg-white/50">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Placeholder Row untuk baris kosong sesuai gambar (7-12) */}
              {[...Array(8)].map((_, i) => (
                <div key={i + 5} className="px-8 py-6 border-b border-gray-200 last:border-none h-[72px]">
                   <span className="font-bold text-gray-400 opacity-50">{FAQ_DATA.length + i + 1}.</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default FAQPage;