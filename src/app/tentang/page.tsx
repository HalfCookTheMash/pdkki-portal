"use client";

import React, { useState } from 'react';
import Hero from '@/components/hero';
import { ChevronRight, ArrowRightCircle } from 'lucide-react';

const TentangPage = () => {
  const [activeTab, setActiveTab] = useState<'tentang' | 'informasi'>('tentang');


  const toggleTextStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '1.125rem',
    fontWeight: 500,  
    lineHeight: 'normal',
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <main className="container mx-auto px-4 md:px-12 py-12">

        <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
          <span>Beranda</span>
          <ChevronRight size={14} />
          <span className="text-[#001678] font-semibold">Tentang</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 1. Sidebar Menu (Kiri) */}
          <div className="w-full lg:w-1/4">
            <div className="border border-gray-300 rounded-[1.5rem] p-6 space-y-4">
              {/* Menu Tentang */}
              <button 
                onClick={() => setActiveTab('tentang')}
                className={`w-full flex justify-between items-center pb-2 border-b transition-colors ${
                  activeTab === 'tentang' ? 'text-[#001678] border-[#001678]' : 'text-gray-500 border-gray-200'
                }`}
              >
                <span className="text-xl font-bold">Tentang</span>
                <ArrowRightCircle 
                  size={24} 
                  fill={activeTab === 'tentang' ? "#001678" : "none"} 
                  className={activeTab === 'tentang' ? "text-white" : "text-gray-400"}
                />
              </button>

              {/* Menu Informasi */}
              <button 
                onClick={() => setActiveTab('informasi')}
                className={`w-full flex justify-between items-center pb-2 border-b transition-colors ${
                  activeTab === 'informasi' ? 'text-[#001678] border-[#001678]' : 'text-gray-500 border-gray-200'
                }`}
              >
                <span className="text-xl font-bold">Informasi</span>
                <ArrowRightCircle 
                  size={24} 
                  fill={activeTab === 'informasi' ? "#001678" : "none"} 
                  className={activeTab === 'informasi' ? "text-white" : "text-gray-400"}
                />
              </button>
            </div>
          </div>

          {/* 2. Konten Utama */}
          <div className="flex justify-center lg:justify-start w-full lg:w-3/4">
            <div 
              style={{
                width: '42.875rem',
                height: '63.1875rem',
                borderRadius: '1.25rem',
                border: '2px solid #969191',
                background: '#FFF',
              }}
              className="relative shadow-sm flex flex-col overflow-hidden"
            >
              {/* Header Tab */}
              <div 
                className="relative flex items-center z-10"
                style={{
                  paddingTop: '60px', 
                  paddingLeft: '40.1px',
                }}
              >
                <div className="w-24 h-24 bg-[#FFC700] rounded-full flex items-center absolute" />
                <h1 
                  style={{
                    color: '#313E5E',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '2rem',
                    fontWeight: 800,
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                    marginLeft: '2.5rem',
                  }}
                  className="relative z-20 capitalize"
                >
                  {activeTab}
                </h1>
              </div>

              {/* Teks Penjelasan */}
              <div 
                className="relative z-10 text-justify px-10"
                style={{ 
                    marginTop: '2.5rem',
                    paddingBottom: '104px',
                    color: '#000000',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1rem', 
                    fontWeight: 400,
                    lineHeight: '1.6',
                }}
              >
                {activeTab === 'tentang' ? (
                  <div className="space-y-6">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    </p>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                      Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat, turpis quis pellentesque semper, nisi diam vulputate elit, ac varius ex magna sit amet ex. 
                    </p>
                    <p>
                      Phasellus vulputate, tortor ac finibus semper, ipsum ipsum finibus lectus, ac dapibus sem enim ac nisl. In egestas, risus eu egestas tincidunt, turpis diam porttitor ipsum, a porta sem arcu ut diam.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default TentangPage;