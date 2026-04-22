"use client";

import React, { useState, useMemo } from 'react';
import Hero from '@/components/hero'; 
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FAQPage() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null); 

  // Gunakan useMemo agar data FAQ diupdate otomatis saat bahasa (t) berubah
  const faqData = useMemo(() => [
    {
      question: t.faqQ1,
      answer: t.faqA1,
    },
    {
      question: t.faqQ2,
      answer: t.faqA2,
    },
    {
      question: t.faqQ3,
      answer: t.faqA3,
    },
    {
      question: t.faqQ4,
      answer: t.faqA4,
    },
    {
      question: t.faqQ5,
      answer: t.faqA5,
    },
    {
      question: t.faqQ6,
      answer: t.faqA6,
    },
    {
      question: t.faqQ7,
      answer: t.faqA7,
    },
    {
      question: t.faqQ8,
      answer: t.faqA8,
    }
  ], [t]);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="bg-[#F8FAFC] min-h-screen font-sans">
      <Hero />

      <section className="container mx-auto px-4 py-16">
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
                  <span className={`font-bold font-poppins text-lg ${isOpen ? 'text-[#004a87]' : 'text-gray-700'}`}>
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