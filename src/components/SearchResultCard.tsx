// src/components/SearchResultCard.tsx

import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

type ConsultantGender = 'Laki-laki' | 'Perempuan'; 

interface SearchResultCardProps {
    name: string;
    firm: string;
    address: string;
    phone: string;
    email: string;
    status: 'aktif' | 'non aktif';
    gender: ConsultantGender;
    imageUrl?: string; 
    onClick?: () => void;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
    name, firm, address, phone, email, status, gender, onClick
}) => {
    
    const defaultImageUrl = gender === 'Laki-laki' 
        ? '/assets/profile-placeholder-male.png'
        : '/assets/profile-placeholder-female.png';

    const statusClass = status === 'aktif' 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white';

    return (
        <div 
            onClick={onClick}
            className="flex p-6 shadow-md transition-all hover:shadow-xl hover:scale-[1.01] cursor-pointer bg-white border border-black rounded-[0.9375rem]" 
            style={{ width: '34.0625rem', height: '17.8125rem' }}
        >
            {/* Bagian Foto & Status */}
            <div className="flex-shrink-0 relative w-44 h-full mr-6">
                <div className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-200">
                    <Image 
                        src={defaultImageUrl} 
                        alt={`Foto ${name}`} 
                        layout="fill" 
                        objectFit="cover"
                        className='p-4' 
                    />
                </div>
                <span className={`absolute top-0 right-0 px-3 py-1 text-xs font-semibold uppercase rounded-full ${statusClass} transform translate-x-1/4 -translate-y-1/4`}>
                    {status}
                </span>
            </div>

            {/* Detail Konsultan */}
            <div className="flex flex-col justify-center space-y-3 flex-grow overflow-hidden">
                <h3 className="text-xl font-bold text-gray-800 truncate">{name}</h3>
                <p className="text-sm font-semibold text-gray-600 border-b pb-2 truncate">
                    Firma Hukum: {firm}
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start">
                        <MapPin size={16} className="text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{address}</span>
                    </div>
                    <div className="flex items-center">
                        <Phone size={16} className="text-blue-600 mr-2" />
                        <span>{phone}</span>
                    </div>
                    <div className="flex items-center">
                        <Mail size={16} className="text-blue-600 mr-2" />
                        <span className="truncate">{email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultCard;