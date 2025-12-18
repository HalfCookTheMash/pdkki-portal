// src/components/LinkBox.tsx

import React from 'react';
import Link from 'next/link';

interface LinkBoxProps {
    title: string;
    href: string;
}

const LinkBox: React.FC<LinkBoxProps> = ({ title, href }) => {
    return (
        <Link 
            href={href}
            // max-w-xl membatasi lebar agar terlihat rapi di tengah.
            className="w-full max-w-xl flex items-center justify-between p-4 bg-white border-2 border-accent text-blue-900 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
            <span className="text-base md:text-lg">
                {title}
            </span>
            
            {/* Ikon Panah Kanan (untuk visual tautan) */}
            <svg className="w-6 h-6 ml-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </Link>
    );
};

export default LinkBox;