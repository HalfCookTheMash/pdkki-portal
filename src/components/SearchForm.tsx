// src/components/SearchForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Filter, RotateCcw, Search, ChevronDown } from "lucide-react";
import { INDONESIA_PROVINCES } from "@/data/consultantData";
import { useLanguage } from "@/context/LanguageContext";

const SearchForm = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [wilayah, setWilayah] = useState("");

  const handleReset = () => {
    setName("");
    setStatus("");
    setGender("");
    setWilayah("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (name) params.set("q", name);
    if (status) params.set("status", status);
    if (gender) params.set("gender", gender);
    if (wilayah) params.set("wilayah", wilayah);

    router.push(`/pencarian?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-[#2E4ABE]">
          <Filter size={18} />
          <span className="font-poppins font-semibold text-[16px]">
            {t.srcformTitle}
          </span>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors text-sm font-medium"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      {/* Input Nama */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
          <Search size={16} />
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.srcformnamePlaceholder}
          className="w-full pl-10 pr-4 py-2.5 rounded-md border border-[#D0B4B4] focus:outline-none focus:ring-1 focus:ring-[#2E4ABE] text-sm font-poppins bg-[#F8FAFC]"
        />
      </div>

      {/* Dropdown Status */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#4B5563] text-[13px] font-medium font-poppins">
          {t.srcformCSTitle}
        </label>
        <div className="relative">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-[#D0B4B4] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2E4ABE] text-sm font-poppins bg-[#F8FAFC]"
          >
            <option value="">{t.srcformCSOptA}</option>
            {/* Value harus cocok dengan enum di Laravel: active/inactive */}
            <option value="active">{t.active}</option>
            <option value="inactive">{t.inactive}</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
        </div>
      </div>

      {/* Dropdown Jenis Kelamin */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#4B5563] text-[13px] font-medium font-poppins">
          {t.srcformGTitle}
        </label>
        <div className="relative">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-[#D0B4B4] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2E4ABE] text-sm font-poppins bg-[#F8FAFC]"
          >
            <option value="">{t.srcformGOptA}</option>
            {/* Value harus cocok dengan enum di Laravel: male/female */}
            <option value="male">{t.male}</option>
            <option value="female">{t.female}</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
        </div>
      </div>

      {/* Dropdown Wilayah */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#4B5563] text-[13px] font-medium font-poppins">
          {t.regionTitle}
        </label>
        <div className="relative">
          <select
            value={wilayah}
            onChange={(e) => setWilayah(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-[#D0B4B4] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2E4ABE] text-sm font-poppins bg-[#F8FAFC]"
          >
            <option value="">{t.srcRoptA}</option>
            {INDONESIA_PROVINCES.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
        </div>
      </div>

      {/* Tombol Cari */}
      <button
        type="submit"
        className="w-full py-2.5 mt-2 rounded-md text-white bg-[#2E4ABE] hover:bg-blue-700 transition-all font-semibold font-poppins flex items-center justify-center gap-2 shadow-sm"
      >
        <Search size={18} />
        <span>{t.searchBtn}</span>
      </button>
    </form>
  );
};

export default SearchForm;
