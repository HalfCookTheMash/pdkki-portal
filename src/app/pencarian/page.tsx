"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Hero from '@/components/hero'; 
import SearchBar from '@/components/SearchBar';
import Separator from '@/components/ui/separator';
import SearchResultCard from '@/components/SearchResultCard';
import ConsultantDetailModal from '@/components/ConsultantDetailModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { DUMMY_RESULTS, Consultant } from '@/data/consultantData'; 

const itemsPerPageOptions = [10, 20, 50];

const PencarianContent = () => {
    const searchParams = useSearchParams();
    const [filteredResults, setFilteredResults] = useState<Consultant[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedConsultant, setSelectedConsultant] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const q = searchParams.get('q')?.toLowerCase() || '';
        const wilayah = searchParams.get('wilayah')?.toLowerCase() || '';
        const status = searchParams.get('status')?.toLowerCase() || '';
        const gender = searchParams.get('gender')?.toLowerCase() || '';

        const results = DUMMY_RESULTS.filter(konsultan => {
            const matchesQuery = q === '' || 
                                 konsultan.name.toLowerCase().includes(q) || 
                                 konsultan.firm.toLowerCase().includes(q);

            const matchesWilayah = wilayah === '' || 
                                   konsultan.address.toLowerCase().includes(wilayah);

            const matchesStatus = status === '' || 
                                  konsultan.status.replace(/\s/g, '').toLowerCase() === status.replace(/\s/g, '').toLowerCase();

            const matchesGender = gender === '' || 
                                  konsultan.gender.replace(/\s/g, '').toLowerCase() === gender.replace(/\s/g, '').toLowerCase();

            return matchesQuery && matchesWilayah && matchesStatus && matchesGender;
        });

        setFilteredResults(results);
        setCurrentPage(1); 
    }, [searchParams]);

    const handleOpenModal = (konsultan: Consultant) => {
        setSelectedConsultant({ ...konsultan, consultantNumber: "0002-2006" });
        setIsModalOpen(true);
    };

    const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentResults = filteredResults.slice(startIndex, startIndex + itemsPerPage);

    // LOGIKA PAGINATION: Menampilkan maksimal 5 nomor saja
    const getPaginationNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = startPage + maxPagesToShow - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <>
            <main className="container mx-auto px-4 py-16 md:py-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b pb-6 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-[#1E1E1E] font-poppins">
                            Hasil Pencarian
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">{filteredResults.length} data ditemukan berdasarkan filter Anda</p>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-lg border border-gray-100">
                        <span className="text-gray-600 text-sm font-medium ml-2">Tampilkan</span>
                        <select 
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="bg-white border border-gray-200 rounded-md py-1 px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            {itemsPerPageOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {currentResults.length > 0 ? (
                        currentResults.map((konsultan, index) => (
                            <SearchResultCard 
                                key={index}
                                {...konsultan}
                                onClick={() => handleOpenModal(konsultan)}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-xl text-gray-400 font-medium">Tidak ada konsultan yang ditemukan.</p>
                        </div>
                    )}
                </div>

                {/* PAGINATION */}
                {currentResults.length > 0 && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12 overflow-x-auto py-2">
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="px-3 h-10 flex items-center justify-center border border-gray-300 rounded text-sm font-bold text-primary hover:bg-gray-50 disabled:opacity-30 transition-all whitespace-nowrap"
                        >
                            Awal
                        </button>

                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded text-primary hover:bg-gray-50 disabled:opacity-30 transition-all shrink-0"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        
                        {getPaginationNumbers().map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-10 h-10 flex items-center justify-center rounded border text-sm font-bold transition-all shrink-0 ${
                                    pageNum === currentPage 
                                        ? 'bg-primary text-white border-[#002B7F]' 
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#002B7F]'
                                }`}
                            >
                                {pageNum}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded text-primary hover:bg-gray-50 disabled:opacity-30 transition-all shrink-0"
                        >
                            <ChevronRight size={18} />
                        </button>

                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="px-3 h-10 flex items-center justify-center border border-gray-300 rounded text-sm font-bold text-primary hover:bg-gray-50 disabled:opacity-30 transition-all whitespace-nowrap"
                        >
                            Akhir
                        </button>
                    </div>
                )}
            </main>

            <ConsultantDetailModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                consultant={selectedConsultant}
            />
        </>
    );
};

const PencarianPage = () => {
    return (
        <div className="min-h-screen bg-white font-poppins">
            <Hero />
            <Separator/>
            <SearchBar /> 
            <Suspense fallback={<div className="text-center py-20 font-medium text-gray-500">Memuat data konsultan...</div>}>
                <PencarianContent />
            </Suspense>
        </div>
    );
};

export default PencarianPage;