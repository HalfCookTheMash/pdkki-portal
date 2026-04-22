"use client";

import React, { useState, useEffect, Suspense } from "react";
import Hero from "@/components/hero";
import SearchBar from "@/components/SearchBar";
import Separator from "@/components/ui/separator";
import SearchResultCard from "@/components/SearchResultCard";
import ConsultantDetailModal from "@/components/ConsultantDetailModal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const itemsPerPageOptions = [10, 20, 50];

const PencarianContent = () => {
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  const [results, setResults] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedConsultant, setSelectedConsultant] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchConsultants(1);
  }, [searchParams, itemsPerPage]);

  async function fetchConsultants(page: number) {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();

      const q = searchParams.get("q") || "";
      const wilayah = searchParams.get("wilayah") || "";
      const status = searchParams.get("status") || "";
      const gender = searchParams.get("gender") || "";

      if (q) params.set("search", q);
      if (wilayah) params.set("province", wilayah);
      if (status) params.set("status", status);
      if (gender) params.set("gender", gender);

      params.set("page", String(page));
      params.set("per_page", String(itemsPerPage));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/consultants?${params.toString()}`,
      );
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      // Laravel pagination response
      setResults(data.data);
      setTotalResults(data.total);
      setTotalPages(data.last_page);
      setCurrentPage(data.current_page);
    } catch (error) {
      console.error("Error fetching consultants:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
    fetchConsultants(page);
  }

  const handleOpenModal = (konsultan: any) => {
    setSelectedConsultant(konsultan);
    setIsModalOpen(true);
  };

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
              {t.resultTitle}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {totalResults} {t.resultDesc}
            </p>
          </div>
          <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-lg border border-gray-100">
            <span className="text-gray-600 text-sm font-medium ml-2">
              {t.resultShow}
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-gray-200 rounded-md py-1 px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {[...Array(itemsPerPage > 4 ? 4 : itemsPerPage)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-gray-100 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {results.length > 0 ? (
              results.map((konsultan) => (
                <SearchResultCard
                  key={konsultan.id}
                  name={konsultan.name}
                  firm={konsultan.law_firm ?? "-"}
                  address={konsultan.law_firm_address ?? "-"}
                  phone={konsultan.law_firm_phone ?? "-"}
                  email={konsultan.email ?? "-"}
                  status={konsultan.status === "active" ? "aktif" : "non aktif"}
                  gender={
                    konsultan.gender === "male" ? "Laki-laki" : "Perempuan"
                  }
                  imageUrl={
                    konsultan.face_photo
                      ? `http://pdkki-backend.test/storage/${konsultan.face_photo}`
                      : undefined
                  }
                  onClick={() => handleOpenModal(konsultan)}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-xl text-gray-400 font-medium">
                  Tidak ada konsultan yang ditemukan.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {results.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 overflow-x-auto py-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-3 h-10 flex items-center justify-center border border-gray-300 rounded text-sm font-bold text-primary hover:bg-gray-50 disabled:opacity-30 transition-all whitespace-nowrap"
            >
              {t.firstPage}
            </button>

            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded text-primary hover:bg-gray-50 disabled:opacity-30 transition-all shrink-0"
            >
              <ChevronLeft size={18} />
            </button>

            {getPaginationNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 flex items-center justify-center rounded border text-sm font-bold transition-all shrink-0 ${
                  pageNum === currentPage
                    ? "bg-primary text-white border-[#002B7F]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#002B7F]"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded text-primary hover:bg-gray-50 disabled:opacity-30 transition-all shrink-0"
            >
              <ChevronRight size={18} />
            </button>

            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 h-10 flex items-center justify-center border border-gray-300 rounded text-sm font-bold text-primary hover:bg-gray-50 disabled:opacity-30 transition-all whitespace-nowrap"
            >
              {t.lastPage}
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
      <Separator />
      <SearchBar />
      <Suspense
        fallback={
          <div className="text-center py-20 font-medium text-gray-500">
            Memuat data konsultan...
          </div>
        }
      >
        <PencarianContent />
      </Suspense>
    </div>
  );
};

export default PencarianPage;
