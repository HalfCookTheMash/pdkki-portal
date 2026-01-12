// src/components/SearchBar.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown } from 'lucide-react';
import { INDONESIA_PROVINCES } from '@/data/consultantData'
import { DUMMY_RESULTS } from '@/data/consultantData';

const SearchBar = () => {
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [wilayah, setWilayah] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');

  const provinceList = Array.from(
    new Set(
      DUMMY_RESULTS.map(k => {
        const parts = k.address.split(',');
        return parts[parts.length - 1].trim();
      })
    )
  ).sort();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (wilayah) params.set('wilayah', wilayah);
    if (status) params.set('status', status);
    if (gender) params.set('gender', gender);

    router.push(`/pencarian?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 -mt-10 relative z-20 flex justify-center">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col lg:flex-row gap-2 w-full max-w-5xl border border-gray-100 transition-all focus-within:ring-4 focus-within:ring-blue-500/10"
      >
        {/* Input Cari */}
        <div className="flex-[1.8] flex items-center px-4 py-2 border-b lg:border-b-0 lg:border-r border-gray-100">
          <Search className="text-gray-400 mr-3" size={20} />
          <input 
            type="text" 
            placeholder="Cari nama konsultan..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full focus:outline-none text-gray-700 font-medium text-base placeholder-gray-400 font-poppins"
          />
        </div>

        {/* Grouping Filters */}
        <div className="flex-[3] grid grid-cols-1 md:grid-cols-3 gap-1">
          {/* Dropdown Wilayah */}
          <div className="relative">
            <select 
              value={wilayah}
              onChange={(e) => setWilayah(e.target.value)}
              className="appearance-none w-full h-full py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl cursor-pointer focus:outline-none transition-colors text-sm font-medium border-none font-poppins"
            >
              <option value="">Wilayah</option>
                {INDONESIA_PROVINCES.map((prov) => (
                <option key={prov} value={prov}>
                    {prov}
                </option>
                ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Dropdown Status */}
          <div className="relative">
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="appearance-none w-full h-full py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl cursor-pointer focus:outline-none transition-colors text-sm font-medium border-none font-poppins"
            >
              <option value="">Status</option>
              <option value="aktif">Aktif</option>
              <option value="non aktif">Non Aktif</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Dropdown Gender */}
          <div className="relative">
            <select 
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="appearance-none w-full h-full py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl cursor-pointer focus:outline-none transition-colors text-sm font-medium border-none font-poppins"
            >
              <option value="">Gender</option>
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        <button 
          type="submit"
          className="bg-primary hover:opacity-90 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-blue-200 font-poppins"
        >
          <Search size={18} strokeWidth={3} />
          <span>Cari</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;