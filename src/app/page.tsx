// src/app/page.tsx

import React from 'react';
import Hero from '@/components/hero'; 
import LinkBox from '@/components/LinkBox'; 
import DataStatusCards from '@/components/DataStatusCards'; 



export default function Home() {
    return (
        <main>
            <Hero />

            <div className="h-8 md:h-12 lg:h-16"></div>

            <DataStatusCards /> 

            {/*KOTAK LINK*/}
             <div className='container mx-auto px-4 mt-6 md:mt-8 relative z-30'>
                <div className='flex justify-center'>
                    <LinkBox 
                        title="Apakah data Anda sudah benar?" 
                        href="/lapor-perubahan"
                    />
                </div>
            </div>

             <div className="h-8 md:h-12 lg:h-16"></div>

        </main>
    )
}