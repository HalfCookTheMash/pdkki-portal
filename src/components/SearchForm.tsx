// src/components/SearchForm.tsx

"use client"; // Diperlukan untuk menggunakan hooks React dan Next.js

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Gunakan 'next/navigation' untuk App Router

const SearchForm = () => {
    const router = useRouter();
    
    // --- STATE UNTUK SEMUA INPUT ---
    const [searchTerm, setSearchTerm] = useState('');
    const [wilayah, setWilayah] = useState('');
    const [status, setStatus] = useState('');
    const [gender, setGender] = useState('');

    const ChevronDownIcon = () => (
        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
    );

    const SearchIcon = () => (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );

    // --- HANDLER SUBMIT FORM ---
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Membangun Query String
        const params = new URLSearchParams();
        
        // Hanya tambahkan parameter yang memiliki nilai
        if (searchTerm) params.set('q', searchTerm);
        if (wilayah) params.set('wilayah', wilayah);
        if (status) params.set('status', status);
        if (gender) params.set('gender', gender);

        // Arahkan pengguna ke halaman pencarian dengan parameter query
        router.push(`/pencarian?${params.toString()}`);
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col md:flex-row gap-4 p-6 bg-white/20 backdrop-blur-sm rounded-2xl shadow-2xl"
        >
            
            {/* Input Cari */}
            <div className="relative flex-grow md:flex-grow-[1.5] min-w-[180px]">
                <input
                    type="text"
                    placeholder="Cari Konsultan KI (Nama/Firma)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-14 px-5 text-lg text-gray-800 placeholder-gray-600 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-yellow-400 focus:border-yellow-400 shadow-lg"
                    aria-label="Cari Konsultan"
                />
            </div>

            {/* Dropdown 1: Semua Wilayah */}
            <div className="relative flex-grow min-w-[160px]">
                <select 
                    value={wilayah}
                    onChange={(e) => setWilayah(e.target.value)}
                    className="appearance-none w-full h-14 px-5 pr-10 text-lg text-gray-800 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-yellow-400 focus:border-yellow-400 cursor-pointer shadow-lg"
                >
                    <option value="">Semua Wilayah</option>
                    <option value="jakarta">Jakarta</option>
                    <option value="bandung">Bandung</option>
                    <option value="surabaya">Surabaya</option>
                    <option value="medan">Medan</option>
                    <option value="yogyakarta">Yogyakarta</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
                    <ChevronDownIcon />
                </div>
            </div>

            {/* Dropdown 2: Semua Status */}
            <div className="relative flex-grow min-w-[160px]">
                <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="appearance-none w-full h-14 px-5 pr-10 text-lg text-gray-800 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-yellow-400 focus:border-yellow-400 cursor-pointer shadow-lg"
                >
                    <option value="">Semua Status</option>
                    <option value="aktif">Aktif</option>
                    <option value="non aktif">Non Aktif</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
                    <ChevronDownIcon />
                </div>
            </div>

            {/* Dropdown 3: Gender */}
            <div className="relative flex-grow min-w-[160px]">
                <select 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="appearance-none w-full h-14 px-5 pr-10 text-lg text-gray-800 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-yellow-400 focus:border-yellow-400 cursor-pointer shadow-lg"
                >
                    <option value="">Gender</option>
                    <option value="laki-laki">Laki-laki</option>
                    <option value="perempuan">Perempuan</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
                    <ChevronDownIcon />
                </div>
            </div>

            {/* Tombol Search */}
            <button 
                type="submit"
                className="flex-shrink-0 w-16 h-14 bg-yellow-400 hover:bg-yellow-500 text-blue-900 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                aria-label="Cari Data"
            >
                <SearchIcon />
            </button>
        </form>
    );
};

export default SearchForm;