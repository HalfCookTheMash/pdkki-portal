"use client";

import React, { useState } from 'react';
import Hero from '@/components/hero'; 
import { ChevronDown, ChevronUp, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

// Data FAQ
const faqData = [
  {
    question: "Apa itu Konsultan Kekayaan Intelektual (KKI)?",
    answer: "Konsultan Kekayaan Intelektual adalah profesional yang terdaftar dan memiliki lisensi untuk memberikan jasa konsultasi, pendampingan, dan pengurusan permohonan hak kekayaan intelektual seperti Paten, Merek, Hak Cipta, Desain Industri, dan Rahasia Dagang."
  },
  {
    question: "Bagaimana cara mencari Konsultan KI di PDKKI?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    question: "Apa perbedaan status Aktif dan Tidak Aktif?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
  },
  {
    question: "Bagaimana cara memverifikasi kebenaran Konsultan KI?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae erat ex. Nam elementum ligo ac elit pretium, eget tincidunt nisl convallis."
  },
  {
    question: "Apa saja bidang keahlian yang dilayani Konsultan KI?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed id semper nisl, vel tincidunt magna."
  },
  {
    question: "Apakah data di PDKKI selalu diperbarui?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed lectus et sem elementum laoreet."
  },
  {
    question: "Bagaimana jika saya menemukan data yang tidak akurat?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet magna vel metus varius tincidunt."
  },
  {
    question: "Apakah ada biaya untuk menggunakan layanan PDKKI?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus feugiat, lacus vitae tincidunt condimentum, nisl masea rhoncus sem, in varius purus nisal id eros."
  }
];

export default function FAQPage() {

  const [openIndex, setOpenIndex] = useState<number | null>(null); 

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="bg-[#F8FAFC] min-h-screen font-sans">
      <Hero />

      <section className="container mx-auto px-4 py-16">
        {/* Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  type="button"
                >
                  <span className={`font-bold font-poppins text-lg ${isOpen ? 'text-primary' : 'text-gray-700'}`}>
                    {item.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-6 h-6 text-blue-500" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[500px] border-t border-gray-100' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 text-gray-600 leading-relaxed bg-white">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
