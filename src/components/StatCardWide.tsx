// src/components/StatCardWide.tsx
"use client";

import React from 'react';
import Image from 'next/image'; // Import Image component
import { Users, MapPin, Clock } from 'lucide-react'; 

interface StatCardWideProps {
    title: string;
    mainValue: string;
    count: number;
    iconType: 'gender' | 'wilayah' | 'status'; 
    options?: readonly string[]; // Menggunakan readonly string[] untuk konsistensi tipe
    currentOption?: string;
    onSelect?: (value: string) => void;
}

const StatCardWide: React.FC<StatCardWideProps> = ({ 
    title, 
    mainValue, 
    count, 
    iconType, 
    options, 
    currentOption, 
    onSelect 
}) => {
    
    // Logika Ikon
    const IconComponent = () => {
        const iconSize = 64;
        const iconColor = 'text-yellow-400';
        if (iconType === 'gender') return <Users size={iconSize} className={iconColor} strokeWidth={1.5} />;
        if (iconType === 'wilayah') return <MapPin size={iconSize} className={iconColor} strokeWidth={1.5} />;
        if (iconType === 'status') return <Clock size={iconSize} className={iconColor} strokeWidth={1.5} />;
        return null;
    };

    return (
        <div 
            className="relative text-white shadow-2xl min-h-[24.75rem] overflow-hidden"
            style={{
                width: '22.4375rem',
                height: '24.75rem',
                borderRadius: '0.9375rem'
            }}
        >
            {/* Background Image */}
            <Image
                src="/assets/rectangle_33.png"
                alt="Card background"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 384px"
            />
            
            {/* Overlay dengan background biru transparan */}
            <div 
                className="absolute inset-0"
                style={{
                    background: 'rgba(2, 50, 151, 0.85)', // #023297 dengan opacity 85%
                    borderRadius: '0.9375rem'
                }}
            >
                <div className="h-full p-6 md:p-8 flex flex-col justify-between">
                    {/* --- Area Judul & Dropdown --- */}
                    <div className="flex justify-between items-start mb-4">
                        {/* Judul Utama Kartu */}
                        <h3 className="text-lg font-semibold uppercase tracking-wider opacity-80">
                            {title}
                        </h3>
                        
                        {/* Dropdown hanya tampil jika options dan handler tersedia */}
                        {options && onSelect && currentOption && (
                            <div className="relative">
                                <select
                                    value={currentOption}
                                    onChange={(e) => onSelect(e.target.value)}
                                    className="appearance-none border-0 text-white text-sm py-1 px-3 pr-8 rounded-md cursor-pointer focus:ring-1 focus:ring-yellow-400 focus:outline-none"
                                        style={{
                                            backgroundColor: 'rgba(2, 50, 151, 0.95)', // SAMA DENGAN BACKGROUND KARTU
                                        }}
                                >
                                    {options.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* --- Area Konten Utama (Ikon + Nilai) --- */}
                    <div className="flex flex-col items-center justify-center flex-grow text-center">
                        <div className="mb-6">
                            <IconComponent />
                        </div>
                        
                        <p className="text-4xl md:text-5xl font-extrabold mb-3">
                            {mainValue}
                        </p>
                        
                        <p className="text-base uppercase tracking-widest opacity-80">
                            {count} Konsultan KI Terdaftar
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatCardWide;