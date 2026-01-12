// src/components/DataStatsCards.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { DUMMY_RESULTS, INDONESIA_PROVINCES } from '@/data/consultantData';

const DataStatsCards = () => {
    const [statsData, setStatsData] = useState({
        total: 0,
        aktif: 0,
        tidakAktif: 0,
        wilayah: 0
    });

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const normalizeStatus = (s: string) => s.toLowerCase().replace(/\s/g, '');

        const total = DUMMY_RESULTS.length;

        const aktif = DUMMY_RESULTS.filter(
            k => normalizeStatus(k.status) === 'aktif'
        ).length;

        const tidakAktif = DUMMY_RESULTS.filter(
            k => normalizeStatus(k.status) === 'nonaktif' || normalizeStatus(k.status) === 'tidakaktif'
        ).length;

        const totalWilayahIndonesia = INDONESIA_PROVINCES.length;

        setStatsData({
            total,
            aktif,
            tidakAktif,
            wilayah: totalWilayahIndonesia
        });
        
        setIsMounted(true);
    }, []);

    const stats = [
        { label: "Total Konsultan", value: statsData.total, color: "#2E4ABE" }, 
        { label: "Konsultan Aktif", value: statsData.aktif, color: "#22C55E" }, 
        { label: "Konsultan Tidak Aktif", value: statsData.tidakAktif, color: "#EF4444" }, 
        { label: "Wilayah", value: statsData.wilayah, color: "#F59E0B" } 
    ];

    if (!isMounted) {
        return <div className="container mx-auto px-4 min-h-[140px]"></div>;
    }

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
                {stats.map((stat, index) => (
                    <div 
                        key={index}
                        className="flex flex-col items-center justify-center p-6 transition-all hover:shadow-md bg-white h-full"
                        style={{ 
                            minHeight: '140px',
                            borderRadius: '8px',
                            border: '1px solid #D0B4B4',
                        }}
                    >
                        <span 
                            className="text-4xl md:text-5xl font-bold mb-2 font-poppins"
                            style={{ color: stat.color }}
                        >
                            {stat.value}
                        </span>
                        <span className="text-gray-500 text-sm md:text-base font-medium text-center font-poppins">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataStatsCards;