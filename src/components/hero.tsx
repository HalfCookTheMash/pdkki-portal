// src/components/hero.tsx
import React from 'react';

const Hero = () => {
    return (
        <section className="bg-white pt-24 pb-8 md:pt-32 md:pb-10 lg:pt-40">
            <div className="container mx-auto px-4 text-center">
                {/* Judul Utama */}
                <div className="mb-6">
                    <h1 
                        style={{
                            color: '#1E1E1E',
                            textAlign: 'center',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '48px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: 'normal'
                        }}
                    >
                        Pangkalan Data Konsultan
                    </h1>
                    <h2 
                        style={{
                            color: 'primary',
                            textAlign: 'center',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '48px',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: 'normal',
                            marginTop: '8px' 
                        }}
                    >
                        Kekayaan Intelektual Indonesia
                    </h2>
                </div>

                {/* Sub-deskripsi */}
                <p 
                    className="max-w-3xl mx-auto text-gray-500"
                    style={{ 
                        fontFamily: 'Poppins, sans-serif', 
                        fontSize: '18px',
                        lineHeight: 'normal',
                        marginTop: '20px'
                    }}
                >
                    Menampilkan sebaran nasional dan jaringan kantor Konsultan Kekayaan Intelektual
                </p>
            </div>
        </section>
    );
};

export default Hero;