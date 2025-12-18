import React from 'react';
import SearchForm from './SearchForm';

const Hero = () => {
    return (
        <section 
            className="relative pt-24 pb-12 md:pt-28 md:pb-8 lg:pt-32 lg:pb-1"
            style={{
                background: 'linear-gradient(114deg, #FFCD02 -8.15%, #023297 55.13%)'
            }}
        >
            <div className="container mx-auto px-4 text-center relative z-10">
                
                <div className="mb-10 md:mb-12">
                    <h1 
                        className="font-semibold leading-tight mb-2"
                        style={{
                            color: '#EEE',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '3.125rem',
                            fontWeight: 600,
                            lineHeight: 'normal'
                        }}
                    >
                        Pangkalan Data Konsultan
                    </h1>
                    <h2 
                        className="font-semibold leading-tight"
                        style={{
                            color: '#EEE',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '3.125rem',
                            fontWeight: 600,
                            lineHeight: 'normal'
                        }}
                    >
                        Kekayaan Intelektual
                    </h2>
                </div>

                {/* Form Pencarian */}
                <div className="max-w-5xl mx-auto mb-8 md:mb-10 lg:mb-12">
                    <SearchForm />
                </div>
            </div>
        </section>
    );
};

export default Hero;