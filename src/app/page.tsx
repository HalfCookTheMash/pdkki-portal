// src/app/page.tsx
"use client"; 

import dynamic from 'next/dynamic';
import Hero from '@/components/hero'; 
import DataStatsCards from '@/components/DataStatsCards';
import SearchForm from '@/components/SearchForm';
import Separator from '@/components/ui/separator';
import LinkBox from '@/components/LinkBox';

const MapCard = dynamic(() => import('@/components/MapCard'), { 
    ssr: false,
    loading: () => (
        <div className="h-[500px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center border border-gray-200">
            <p className="text-gray-400 font-medium">Memuat Peta Sebaran...</p>
        </div>
    )
});

export default function Home() {
    return (
        <main className="bg-white min-h-screen pb-20">
            <Hero />
            
            <Separator />

            <div className="container mx-auto px-4 -mt-12 relative z-20">
                <DataStatsCards />
            </div>
            
            <Separator />

            <section className="container mx-auto px-4 pb-20 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Peta Sebaran */}
                    <div className="lg:col-span-8 h-full">
                        {/* 3. MapCard sekarang dipanggil secara aman */}
                        <MapCard />
                    </div>

                    {/* Panel Pencarian & LinkBox */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <div className="p-6 bg-white rounded-[8px] border border-[#D0B4B4] shadow-sm">
                            <SearchForm />
                        </div>

                        <LinkBox />
                    </div>

                </div>
            </section>
        </main>
    );
}