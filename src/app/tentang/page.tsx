"use client";

import React from 'react';
import Hero from '@/components/hero';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const TentangPage = () => {
  const {t}= useLanguage();
  
  return (
    <main className="bg-white min-h-screen pb-20 font-poppins">
      <Hero />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">

          {/* Info Utama */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="border border-gray-200 rounded-xl p-8 shadow-sm min-h-[250px]">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t.objTitle}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t.objDesc}
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-8 shadow-sm min-h-[250px]">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t.targetuserTitle}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t.targetuserDesc}
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-8 shadow-sm min-h-[250px]">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t.datavalTitle}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t.datavalDesc}
              </p>
            </div>
          </div>

          {/* Penjelasan Detail & Manfaat */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {t.defTitle}
              </h3>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  {t.defDescP1}
                </p>
                <p>
                  {t.defDescP2}
                </p>
                <p>
                  {t.defDescP3}
                </p>
              </div>
            </div>

            {/* Bagian Catatan */}
            <div className="border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {t.benTitle}
              </h3>
              <ul className="space-y-4 mb-8">
                {[
                  t.benDescP1,
                  t.benDescP2,
                  t.benDescP3,
                  t.benDescP4,
                  t.benDescP5,
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-[#FFF9E6] border border-[#F6E4C1] rounded-lg p-5">
                <p className="text-sm text-gray-800 leading-relaxed">
                  <span className="font-bold">{`${t.noteTitle}:`}</span> {t.noteDesc}
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