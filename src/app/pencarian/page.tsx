"use client";

import React, { useState, useEffect } from 'react';
import Hero from '@/components/hero'; 
import SearchResultCard from '@/components/SearchResultCard';
import ConsultantDetailModal from '@/components/ConsultantDetailModal'; // Import Modal
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { DUMMY_RESULTS, Consultant } from '@/data/consultantData'; 

const itemsPerPageOptions = [10, 20, 50];

const PencarianPage = () => {
    const searchParams = useSearchParams();
    const [filteredResults, setFilteredResults] = useState<Consultant[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
    // --- STATE UNTUK MODAL ---
    const [selectedConsultant, setSelectedConsultant] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

    useEffect(() => {
        const q = searchParams.get('q')?.toLowerCase() || '';
        const wilayah = searchParams.get('wilayah') || '';
        const status = searchParams.get('status') || '';
        const gender = searchParams.get('gender') || '';

        const results = DUMMY_RESULTS.filter(konsultan => {
            const matchesQuery = q === '' || 
                                 konsultan.name.toLowerCase().includes(q) || 
                                 konsultan.firm.toLowerCase().includes(q);

            const matchesWilayah = wilayah === '' || 
                                   konsultan.address.toLowerCase().includes(wilayah);

            const matchesStatus = status === '' || 
                                  konsultan.status.replace(/\s/g, '-').toLowerCase() === status.replace(/\s/g, '-').toLowerCase();

            const matchesGender = gender === '' || 
                                  konsultan.gender.replace(/\s/g, '-').toLowerCase() === gender.replace(/\s/g, '-').toLowerCase();

            return matchesQuery && matchesWilayah && matchesStatus && matchesGender;
        });

        setFilteredResults(results);
        setCurrentPage(1); 
    }, [searchParams]);

    // --- FUNGSI UNTUK MEMBUKA MODAL ---
    const handleOpenModal = (konsultan: Consultant) => {
        setSelectedConsultant({
            ...konsultan,
            consultantNumber: "0002-2006" // Contoh nomor, bisa diambil dari data asli jika ada
        });
        setIsModalOpen(true);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentResults = filteredResults.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    
    const goToPreviousPage = () => handlePageChange(currentPage - 1);
    const goToNextPage = () => handlePageChange(currentPage + 1);

    const renderPageButtons = () => {
        const buttons = [];
        const maxButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        i === currentPage 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="min-h-screen">
            <Hero />

            <main className="container mx-auto px-4 py-10 md:py-16">
                
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-2xl font-semibold text-gray-700">
                        Hasil Pencarian ({filteredResults.length} data ditemukan)
                    </h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Menampilkan</span>
                        <select 
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="border border-gray-300 rounded-md p-1.5 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {itemsPerPageOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <span className="text-gray-600">Data</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center mb-10">
                    {currentResults.length > 0 ? (
                        currentResults.map((konsultan, index) => (
                            <SearchResultCard 
                                key={index}
                                {...konsultan}
                                onClick={() => handleOpenModal(konsultan)} // Trigger modal saat diklik
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-xl text-gray-500 p-10">
                            Tidak ada konsultan yang ditemukan.
                        </p>
                    )}
                </div>

                {currentResults.length > 0 && (
                    <div className="flex justify-center items-center space-x-2">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="p-2 border rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        {renderPageButtons()}
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="p-2 border rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </main>

            {/* KOMPONEN MODAL */}
            <ConsultantDetailModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                consultant={selectedConsultant}
            />
        </div>
    );
};

export default PencarianPage;