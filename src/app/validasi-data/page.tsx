"use client";

import React, { useState, useRef } from "react";
import Hero from "@/components/hero";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown } from "lucide-react";

const INDONESIA_PROVINCES = [
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Bengkulu",
  "Sumatera Selatan",
  "Kepulauan Bangka Belitung",
  "Lampung",
  "DKI Jakarta",
  "Banten",
  "Jawa Barat",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Gorontalo",
  "Sulawesi Tengah",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
  "Papua Tengah",
  "Papua Pegunungan",
  "Papua Selatan",
  "Papua Barat Daya",
];

const ValidasiDataPage = () => {
  const { t } = useLanguage();
  const [gender, setGender] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fotoRef = useRef<HTMLInputElement>(null);
  const ttdRef = useRef<HTMLInputElement>(null);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [ttdFile, setTtdFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    consultant_name: "",
    consultant_number: "",
    birth_place: "",
    birth_date: "",
    religion: "",
    law_firm: "",
    law_firm_address: "",
    law_firm_address2: "",
    law_firm_province: "",
    law_firm_city: "",
    law_firm_phone: "",
    home_address: "",
    home_phone: "",
    personal_phone: "",
    correspondence_address: "",
    correspondence_city: "",
    correspondence_province: "",
    correspondence_postal_code: "",
    correspondence_phone: "",
    email: "",
    changes_description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      consultant_name: "",
      consultant_number: "",
      birth_place: "",
      birth_date: "",
      religion: "",
      law_firm: "",
      law_firm_address: "",
      law_firm_address2: "",
      law_firm_province: "",
      law_firm_city: "",
      law_firm_phone: "",
      home_address: "",
      home_phone: "",
      personal_phone: "",
      correspondence_address: "",
      correspondence_city: "",
      correspondence_province: "",
      correspondence_postal_code: "",
      correspondence_phone: "",
      email: "",
      changes_description: "",
    });
    setGender("");
    setFotoFile(null);
    setTtdFile(null);
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "law_firm_address2") {
          payload.append(key, value);
        }
      });

      const fullAddress = formData.law_firm_address2
        ? `${formData.law_firm_address}\n${formData.law_firm_address2}`
        : formData.law_firm_address;
      payload.set("law_firm_address", fullAddress);

      // Gender
      payload.append("gender", gender === "Laki-laki" ? "male" : "female");

      // File
      if (fotoFile) payload.append("face_photo", fotoFile);
      if (ttdFile) payload.append("signature", ttdFile);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/data-changes`,
        {
          method: "POST",
          body: payload,
        },
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Terjadi kesalahan.");
      }

      setSuccessMsg(
        "Pengajuan berhasil dikirim! Tim kami akan segera memproses perubahan data Anda.",
      );
      handleReset();
    } catch (error: any) {
      setErrorMsg(error.message || "Gagal mengirim pengajuan. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-white min-h-screen pb-20">
      <Hero />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#CC0000] text-xl md:text-2xl font-bold font-poppins uppercase tracking-wide">
              {t.valTitle}
            </h2>
            <h2 className="text-[#CC0000] text-xl md:text-2xl font-bold font-poppins uppercase tracking-wide">
              {t.valSubtitle}
            </h2>
          </div>

          {/* Success Message */}
          {successMsg && (
            <div className="flex items-center gap-3 p-4 mb-6 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <CheckCircle size={20} className="shrink-0" />
              <p className="text-sm font-medium">{successMsg}</p>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle size={20} className="shrink-0" />
              <p className="text-sm font-medium">{errorMsg}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4 text-sm md:text-base font-poppins"
          >
            {/* Data Pribadi */}
            {[
              { label: t.valQ1, name: "consultant_name" },
              { label: t.valQ2, name: "consultant_number" },
              { label: t.valQ3, name: "birth_place" },
            ].map((field) => (
              <div
                key={field.name}
                className="grid grid-cols-1 md:grid-cols-12 items-center gap-2"
              >
                <label className="md:col-span-3 font-medium text-gray-700">
                  {field.label}
                </label>
                <div className="md:col-span-9 flex items-center gap-4">
                  <span className="hidden md:inline">:</span>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-2">
              <label className="md:col-span-3 font-medium text-gray-700">
                {t.valQ17} {/* Label untuk Tanggal Lahir */}
              </label>
              <div className="md:col-span-9 flex items-center gap-4">
                <span className="hidden md:inline">:</span>
                <input
                  type="date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>
            
            {[
              { label: t.valQ4, name: "religion" },
            ].map((field) => (
              <div
                key={field.name}
                className="grid grid-cols-1 md:grid-cols-12 items-center gap-2"
              >
                <label className="md:col-span-3 font-medium text-gray-700">
                  {field.label}
                </label>
                <div className="md:col-span-9 flex items-center gap-4">
                  <span className="hidden md:inline">:</span>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}

            {/* Gender */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-2">
              <label className="md:col-span-3 font-medium text-gray-700">
                {t.valQ5}
              </label>
              <div className="md:col-span-9 flex items-center gap-4">
                <span className="hidden md:inline">:</span>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span>{t.male}</span>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={gender === "Laki-laki"}
                      onChange={() => setGender("Laki-laki")}
                    />
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span>{t.female}</span>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={gender === "Perempuan"}
                      onChange={() => setGender("Perempuan")}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Nama Kantor */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-2">
              <label className="md:col-span-3 font-medium text-gray-700">
                {t.valQ6}
              </label>
              <div className="md:col-span-9 flex items-center gap-4">
                <span className="hidden md:inline">:</span>
                <input
                  type="text"
                  name="law_firm"
                  value={formData.law_firm}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Alamat Kantor */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-2 pt-1">
              <label className="md:col-span-3 font-medium text-gray-700 mt-1.5">
                {t.valQ7}
              </label>
              <div className="md:col-span-9 flex items-start gap-4">
                <span className="mt-1.5 hidden md:inline">:</span>
                <div className="w-full space-y-2">
                  <input
                    type="text"
                    name="law_firm_address"
                    value={formData.law_firm_address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="law_firm_address2"
                    value={formData.law_firm_address2}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="space-y-2 pt-1">
                    <div className="grid grid-cols-12 items-center gap-2">
                      <div className="col-span-4 flex items-center gap-2">
                        <span className="text-xl leading-none">•</span>
                        <label className="text-sm">Provinsi</label>
                      </div>
                      <div className="col-span-8 relative">
                        <select
                          name="law_firm_province"
                          value={formData.law_firm_province}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded px-3 py-1.5 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-sm"
                        >
                          <option value="">-- Pilih Provinsi --</option>
                          {INDONESIA_PROVINCES.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          size={14}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-12 items-center gap-2">
                      <div className="col-span-4 flex items-center gap-2">
                        <span className="text-xl leading-none">•</span>
                        <label className="text-sm">Kota</label>
                      </div>
                      <div className="col-span-8">
                        <input
                          type="text"
                          name="law_firm_city"
                          value={formData.law_firm_city}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Telepon Kantor, Alamat Rumah, dll */}
            {[
              { label: t.valQ8, name: "law_firm_phone" },
              { label: t.valQ9, name: "home_address" },
              { label: t.valQ10, name: "home_phone" },
              { label: t.valQ11, name: "personal_phone" },
            ].map((field) => (
              <div
                key={field.name}
                className="grid grid-cols-1 md:grid-cols-12 items-center gap-2"
              >
                <label className="md:col-span-3 font-medium text-gray-700">
                  {field.label}
                </label>
                <div className="md:col-span-9 flex items-center gap-4">
                  <span className="hidden md:inline">:</span>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}

            {/* Alamat Korespondensi */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-2 pt-2">
              <label className="md:col-span-3 font-medium text-gray-700">
                {t.valQ12}
              </label>
              <div className="md:col-span-9 flex items-start gap-4">
                <span className="hidden md:inline">:</span>
                <div className="w-full space-y-3">
                  <input
                    type="text"
                    name="correspondence_address"
                    value={formData.correspondence_address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {[
                    { sub: t.valQ13, name: "correspondence_city" },
                    { sub: t.valQ15, name: "correspondence_postal_code" },
                    { sub: t.valQ16, name: "correspondence_phone" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="grid grid-cols-12 items-center gap-2"
                    >
                      <div className="col-span-4 flex items-center gap-2">
                        <span className="text-xl leading-none">•</span>
                        <label className="text-sm">{item.sub}</label>
                      </div>
                      <div className="col-span-8">
                        <input
                          type="text"
                          name={item.name}
                          value={formData[item.name as keyof typeof formData]}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                  {/* Provinsi */}
                  <div className="grid grid-cols-12 items-center gap-2">
                    <div className="col-span-4 flex items-center gap-2">
                      <span className="text-xl leading-none">•</span>
                      <label className="text-sm">Provinsi</label>
                    </div>
                    <div className="col-span-8 relative">
                      <select
                        name="correspondence_province"
                        value={formData.correspondence_province}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-1.5 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-sm"
                      >
                        <option value="">-- Pilih Provinsi --</option>
                        {INDONESIA_PROVINCES.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        size={14}
                      />
                    </div>
                  </div>
                  {/* Email */}
                  <div className="grid grid-cols-12 items-center gap-2">
                    <div className="col-span-4 flex items-center gap-2">
                      <span className="text-xl leading-none">•</span>
                      <label className="text-sm">E-mail</label>
                    </div>
                    <div className="col-span-8">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pernyataan */}
            <div className="pt-8 space-y-4 text-sm text-gray-800">
              <p>{t.valstatTitle}</p>
              <ol className="list-decimal ml-5 space-y-2">
                <li>{t.valS1}</li>
                <li>{t.valS2}</li>
              </ol>
            </div>

            {/* Upload */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10">
              {/* Pas Foto */}
              <div className="flex flex-col items-center gap-3">
                <p className="font-bold text-sm">{t.fileuploadTitle}</p>
                <p className="text-xs -mt-2">{t.fileObl1}</p>
                <input
                  ref={fotoRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFotoFile(e.target.files?.[0] || null)}
                />
                <div
                  onClick={() => fotoRef.current?.click()}
                  style={{ width: "251px", height: "216px" }}
                  className="border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {fotoFile ? (
                    <p className="text-green-600 text-xs font-semibold">
                      {fotoFile.name}
                    </p>
                  ) : (
                    <>
                      <Upload className="text-gray-400 mb-2" size={32} />
                      <p className="text-[10px] text-red-500 leading-tight">
                        {t.fileDesc1}
                      </p>
                      <p className="text-[10px] text-red-500 leading-tight mt-1">
                        {t.fileDesc2}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Tanda Tangan */}
              <div className="flex flex-col items-center gap-3">
                <p className="font-bold text-sm">{t.fileuploadTitle}</p>
                <p className="text-xs -mt-2">{t.fileObl2}</p>
                <input
                  ref={ttdRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setTtdFile(e.target.files?.[0] || null)}
                />
                <div
                  onClick={() => ttdRef.current?.click()}
                  style={{ width: "251px", height: "216px" }}
                  className="border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {ttdFile ? (
                    <p className="text-green-600 text-xs font-semibold">
                      {ttdFile.name}
                    </p>
                  ) : (
                    <>
                      <Upload className="text-gray-400 mb-2" size={32} />
                      <p className="text-[10px] text-red-500 leading-tight mt-4">
                        {t.fileDesc2}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-10">
              <button
                type="submit"
                disabled={isLoading}
                className="px-10 py-2 bg-[#4CAF50] text-white rounded font-medium hover:bg-green-600 transition-shadow shadow-sm active:scale-95 disabled:opacity-60"
              >
                {isLoading ? "Mengirim..." : t.valupBtn}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-10 py-2 bg-white border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-shadow shadow-sm active:scale-95"
              >
                {t.valcnBtn}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ValidasiDataPage;
