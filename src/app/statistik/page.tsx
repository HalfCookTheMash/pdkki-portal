// src/app/statistik/page.tsx

"use client"; 

import React, { useState } from 'react';
import StatCardWide from '@/components/StatCardWide';
import Hero from '@/components/hero';
import { DUMMY_RESULTS } from '@/data/consultantData'; 

// --- DEFINISI TIPE UNTUK KONSISTENSI ---
const genderOptions = ["Laki-laki", "Perempuan"] as const;
const statusOptions = ["Aktif", "Nonaktif"] as const;
const wilayahOptions = ["Semua Wilayah", "Jakarta", "Bandung", "Medan", "Surabaya", "Yogyakarta"] as const;

type Gender = (typeof genderOptions)[number];
type Status = (typeof statusOptions)[number];
type Wilayah = (typeof wilayahOptions)[number];

const StatistikPage = () => {
    
    // --- STATE UNTUK FILTER DROPDOWN ---
    const [selectedGender, setSelectedGender] = useState<Gender>('Laki-laki');
    const [selectedStatus, setSelectedStatus] = useState<Status>('Aktif');
    const [selectedWilayah, setSelectedWilayah] = useState<Wilayah>('Semua Wilayah'); 

    // Total Konsultan Seluruhnya (Ini HARUS 100)
    const totalAll = DUMMY_RESULTS.length;

    // --- LOGIKA PENGHITUNGAN DENGAN FILTER ISOLASI ---
    
    // UTILITY: Menormalisasi status agar sesuai dengan data dummy ('aktif' vs 'Aktif')
    const normalizeStatus = (s: string) => s.toLowerCase().replace(/\s/g, '');


    // 1. KARTU WILAYAH (Hanya filter berdasarkan wilayah yang dipilih)
    const wilayahCount = DUMMY_RESULTS.filter(k => {
        // Jika "Semua Wilayah" dipilih, hitung totalAll (100)
        if (selectedWilayah === 'Semua Wilayah') return true;
        
        // Jika Wilayah spesifik dipilih, cari nama kota di alamat
        return k.address.includes(selectedWilayah); 
    }).length;


    // 2. KARTU GENDER (Hanya filter berdasarkan gender yang dipilih)
    const genderCount = DUMMY_RESULTS.filter(k => {
        // Filter berdasarkan Gender yang dipilih
        return k.gender === selectedGender;
    }).length;


    // 3. KARTU STATUS (Hanya filter berdasarkan status yang dipilih)
    const statusCount = DUMMY_RESULTS.filter(k => {
        // Filter berdasarkan Status yang dipilih (setelah normalisasi)
        return normalizeStatus(k.status) === normalizeStatus(selectedStatus);
    }).length;


    // --- DEFINISI KARTU UTAMA (Urutan: Wilayah, Gender, Status) ---
    const cardsData = [
        // 1. WILAYAH
        { 
            id: 'wilayah', 
            title: "Wilayah", 
            mainValue: selectedWilayah, 
            // Ketika "Semua Wilayah" dipilih, count harusnya 100
            count: wilayahCount, 
            iconType: 'wilayah',
            options: wilayahOptions as readonly string[],
            currentOption: selectedWilayah,
            onSelect: (value: string) => setSelectedWilayah(value as Wilayah)
        },
        // 2. GENDER
        { 
            id: 'gender', 
            title: "Gender", 
            mainValue: selectedGender, 
            // Jika Anda memilih 'Laki-laki', count menunjukkan semua laki-laki (sekitar 50)
            count: genderCount, 
            iconType: 'gender',
            options: genderOptions as readonly string[],
            currentOption: selectedGender,
            onSelect: (value: string) => setSelectedGender(value as Gender)
        },
        // 3. STATUS
        { 
            id: 'status', 
            title: "Status", 
            mainValue: selectedStatus, 
            // Jika Anda memilih 'Aktif', count menunjukkan semua yang aktif (sekitar 80)
            count: statusCount, 
            iconType: 'status',
            options: statusOptions as readonly string[],
            currentOption: selectedStatus,
            onSelect: (value: string) => setSelectedStatus(value as Status)
        },
    ];

    return (
        <div className="min-h-screen">
            
            <Hero />

            <main className="container mx-auto px-4 py-10 md:py-16">

                {/* GRID untuk menampilkan kartu statistik */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {cardsData.map(stat => (
                        <StatCardWide
                            key={stat.id}
                            title={stat.title}
                            mainValue={stat.mainValue}
                            count={stat.count}
                            iconType={stat.iconType as 'gender' | 'wilayah' | 'status'}
                            options={stat.options}
                            currentOption={stat.currentOption}
                            onSelect={stat.onSelect}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default StatistikPage;