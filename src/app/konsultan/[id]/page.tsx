// src/app/konsultan/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { MapPin, Phone, Mail, Building2, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ConsultantDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { t } = useLanguage();

  const [consultant, setConsultant] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    "akademik" | "prestasi" | "pelanggaran" | "status"
  >("akademik");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchConsultant() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/consultants/${id}`,
        );
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setConsultant(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) fetchConsultant();
  }, [id]);

  const photoUrl = consultant?.face_photo
    ? `http://pdkki-backend.test/storage/${consultant.face_photo}`
    : consultant?.gender === "male"
      ? "/assets/profile-placeholder-male.png"
      : "/assets/profile-placeholder-female.png";

  const isActive = consultant?.status === "active";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 pt-32 py-20">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="h-64 bg-gray-200 rounded" />
            <div className="h-48 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!consultant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 pt-32 py-20 text-center">
          <p className="text-gray-500 text-xl">Konsultan tidak ditemukan.</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-blue-600 underline"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <div className="container mx-auto px-4 pt-32 py-10 max-w-5xl">
        {/* Tombol Kembali */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Kembali
        </button>

        {/* Card Utama */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Header merah */}
          <div className="bg-[#16294b] px-8 py-5">
            <h1 className="text-white text-xl font-bold truncate">
              {consultant.name}
            </h1>
          </div>

          <div className="p-8 flex flex-col md:flex-row gap-8">
            {/* Foto */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="relative w-40 h-40 rounded-lg overflow-hidden bg-gray-200 border border-gray-300">
                <Image
                  src={photoUrl}
                  alt={consultant.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <span
                className={`px-4 py-1 rounded-full text-white text-sm font-bold uppercase ${isActive ? "bg-green-500" : "bg-red-500"}`}
              >
                {isActive ? t.active : t.inactive}
              </span>
            </div>

            {/* Biodata */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <InfoRow label="No Konsultan" value={consultant.consultant_id} />
              <InfoRow
                label="Tanggal Terdaftar"
                value={
                  consultant.registered_date
                    ? new Date(consultant.registered_date).toLocaleDateString(
                        "id-ID",
                      )
                    : "-"
                }
              />
              <InfoRow
                label="Tempat dan Tanggal Lahir"
                value={
                  consultant.birth_place && consultant.birth_date
                    ? `${consultant.birth_place}, ${new Date(consultant.birth_date).toLocaleDateString("id-ID")}`
                    : "-"
                }
              />
              <InfoRow
                label="Jenis Kelamin"
                value={consultant.gender === "male" ? "Laki-Laki" : "Perempuan"}
              />
              <InfoRow label="Agama" value={consultant.religion ?? "-"} />
              <InfoRow
                label="Status Konsultan"
                value={isActive ? "Aktif" : "Tidak Aktif"}
              />
              <InfoRow label="Email" value={consultant.email ?? "-"} />

              {/* Firma Hukum */}
              <div className="md:col-span-2 mt-2 pt-4 border-t border-gray-100">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  Firma Hukum
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <Building2
                      size={18}
                      className="text-blue-600 shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-gray-400 text-xs">Nama</p>
                      <p className="font-semibold text-gray-800">
                        {consultant.law_firm ?? "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone
                      size={18}
                      className="text-blue-600 shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-gray-400 text-xs">Telepon</p>
                      <p className="font-semibold text-gray-800">
                        {consultant.law_firm_phone ?? "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 md:col-span-2">
                    <MapPin
                      size={18}
                      className="text-blue-600 shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-gray-400 text-xs">Alamat</p>
                      <p className="font-semibold text-gray-800">
                        {consultant.law_firm_address ?? "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail size={18} className="text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-400 text-xs">Email</p>
                      <p className="font-semibold text-gray-800">
                        {consultant.email ?? "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex gap-0 px-8 pt-4">
              {(["akademik", "prestasi", "pelanggaran", "status"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 text-sm font-semibold capitalize transition-colors border-b-2 ${
                      activeTab === tab
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab === "akademik"
                      ? "Akademik"
                      : tab === "prestasi"
                        ? "Prestasi"
                        : tab === "pelanggaran"
                          ? "Pelanggaran"
                          : "Status Konsultan"}
                  </button>
                ),
              )}
            </div>

            <div className="p-8">
              {/* Tab Akademik */}
              {activeTab === "akademik" && (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b">
                      <th className="pb-3 font-semibold">Pendidikan</th>
                      <th className="pb-3 font-semibold">Jurusan</th>
                      <th className="pb-3 font-semibold">Universitas</th>
                      <th className="pb-3 font-semibold">Tgl Ijazah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consultant.education?.length > 0 ? (
                      consultant.education.map((edu: any) => (
                        <tr key={edu.id} className="border-b last:border-0">
                          <td className="py-3 font-medium">{edu.degree}</td>
                          <td className="py-3">{edu.major}</td>
                          <td className="py-3">{edu.university}</td>
                          <td className="py-3">
                            {edu.graduation_date
                              ? new Date(
                                  edu.graduation_date,
                                ).toLocaleDateString("id-ID")
                              : "-"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-6 text-center text-gray-400"
                        >
                          Tidak ada data pendidikan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {/* Tab Prestasi */}
              {activeTab === "prestasi" && (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b">
                      <th className="pb-3 font-semibold">Nama Prestasi</th>
                      <th className="pb-3 font-semibold">Penyelenggara</th>
                      <th className="pb-3 font-semibold">Tanggal</th>
                      <th className="pb-3 font-semibold">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consultant.achievements?.length > 0 ? (
                      consultant.achievements.map((item: any) => (
                        <tr key={item.id} className="border-b last:border-0">
                          <td className="py-3 font-medium">{item.title}</td>
                          <td className="py-3">{item.organizer ?? "-"}</td>
                          <td className="py-3">
                            {item.date
                              ? new Date(item.date).toLocaleDateString("id-ID")
                              : "-"}
                          </td>
                          <td className="py-3">{item.description ?? "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-6 text-center text-gray-400"
                        >
                          Tidak ada data prestasi.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {/* Tab Pelanggaran */}
              {activeTab === "pelanggaran" && (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b">
                      <th className="pb-3 font-semibold">Jenis Pelanggaran</th>
                      <th className="pb-3 font-semibold">Tanggal</th>
                      <th className="pb-3 font-semibold">Sanksi</th>
                      <th className="pb-3 font-semibold">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consultant.violations?.length > 0 ? (
                      consultant.violations.map((item: any) => (
                        <tr key={item.id} className="border-b last:border-0">
                          <td className="py-3 font-medium">{item.type}</td>
                          <td className="py-3">
                            {item.date
                              ? new Date(item.date).toLocaleDateString("id-ID")
                              : "-"}
                          </td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                item.sanction === "warning"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : item.sanction === "suspension"
                                    ? "bg-orange-100 text-orange-700"
                                    : item.sanction === "revocation"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {item.sanction === "warning"
                                ? "Peringatan"
                                : item.sanction === "suspension"
                                  ? "Skorsing"
                                  : item.sanction === "revocation"
                                    ? "Pencabutan"
                                    : "-"}
                            </span>
                          </td>
                          <td className="py-3">{item.description ?? "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-6 text-center text-gray-400"
                        >
                          Tidak ada data pelanggaran.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {/* Tab Status Konsultan */}
              {activeTab === "status" && (
                <div className="space-y-4">
                  {/* Status badge */}
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <span
                      className={`px-4 py-2 rounded-full text-white font-bold text-sm uppercase ${
                        isActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {isActive ? "Aktif" : "Tidak Aktif"}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Status saat ini
                      </p>
                      <p className="text-gray-500 text-sm">
                        Terdaftar sejak{" "}
                        {consultant.registered_date
                          ? new Date(
                              consultant.registered_date,
                            ).toLocaleDateString("id-ID")
                          : "-"}
                      </p>
                    </div>
                  </div>

                  {/* Dokumen pendukung — hanya muncul jika tidak aktif */}
                  {!isActive && (
                    <div className="mt-4 space-y-4">
                      {/* Alasan */}
                      {consultant.inactive_reason && (
                        <div className="p-4 rounded-xl border border-red-100 bg-red-50">
                          <p className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">
                            Alasan Tidak Aktif
                          </p>
                          <p className="text-gray-800 text-sm leading-relaxed">
                            {consultant.inactive_reason}
                          </p>
                        </div>
                      )}

                      {/* Dokumen */}
                      {consultant.inactive_document && (
                        <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                            Dokumen Pendukung
                          </p>

                          {/* PERBAIKAN DI SINI: Menambahkan tag <a> yang hilang */}
                          <a
                            href={`http://pdkki-backend.test/storage/${consultant.inactive_document}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-sm transition-all group"
                          >
                            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                Lihat Dokumen
                              </p>
                              <p className="text-xs text-gray-400">
                                Klik untuk membuka dokumen
                              </p>
                            </div>
                          </a>
                        </div>
                      )}

                      {/* Kalau tidak ada dokumen maupun alasan */}
                      {!consultant.inactive_reason &&
                        !consultant.inactive_document && (
                          <p className="text-center text-gray-400 text-sm py-4">
                            Tidak ada dokumen pendukung tersedia.
                          </p>
                        )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen helper
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
        {label}
      </p>
      <p className="text-gray-800 font-semibold mt-0.5">{value}</p>
    </div>
  );
}
