// src/components/ConsultantDetailModal.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Mail, Phone, MapPin, Building2, Eye } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ConsultantDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultant: {
    // Field dari Laravel
    id: number;
    name: string;
    consultant_id: string; // nomor konsultan
    law_firm: string;
    law_firm_address: string;
    law_firm_phone: string;
    email: string;
    status: "active" | "inactive";
    gender: "male" | "female";
    face_photo?: string;
  } | null;
}

const ConsultantDetailModal: React.FC<ConsultantDetailModalProps> = ({
  isOpen,
  onClose,
  consultant,
}) => {
  if (!isOpen || !consultant) return null;

  const { t } = useLanguage();

  // Foto dari Laravel storage, fallback ke placeholder
  const photoUrl = consultant.face_photo
    ? `http://pdkki-backend.test/storage/${consultant.face_photo}`
    : consultant.gender === "male"
      ? "/assets/profile-placeholder-male.png"
      : "/assets/profile-placeholder-female.png";

  const isActive = consultant.status === "active";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-500 hover:text-black transition-colors z-10"
        >
          <X size={32} strokeWidth={3} />
        </button>

        <div className="p-12">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">
            {t.condetailTitle}
          </h2>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Foto */}
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden bg-gray-100 mb-4 border border-gray-200">
                <Image
                  src={photoUrl}
                  alt={consultant.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-3xl font-extrabold text-gray-900">
                    {consultant.name}
                  </h3>
                  <p className="text-gray-500 font-medium">
                    {t.connumTitle} : {consultant.consultant_id}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-6 py-1 rounded-full text-white font-bold uppercase text-sm ${
                      isActive ? "bg-green-500" : "bg-red-600"
                    }`}
                  >
                    {isActive ? t.active : t.inactive}
                  </span>
                  
                  <Link href={`/konsultan/${consultant.id}`}>
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors group">
                      <Eye
                        size={24}
                        className="text-gray-600 group-hover:text-blue-600"
                      />
                    </button>
                  </Link>
                </div>
              </div>

              <hr className="my-6 border-gray-300" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div className="flex gap-4">
                  <Building2
                    className="text-blue-700 mt-1 flex-shrink-0"
                    size={24}
                  />
                  <div>
                    <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
                      {t.conoffTitle}
                    </p>
                    <p className="text-gray-800 font-bold leading-tight">
                      {consultant.law_firm ?? "-"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone
                    className="text-blue-700 mt-1 flex-shrink-0"
                    size={24}
                  />
                  <div>
                    <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
                      {t.phoTitle}
                    </p>
                    <p className="text-gray-800 font-bold">
                      {consultant.law_firm_phone ?? "-"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin
                    className="text-blue-700 mt-1 flex-shrink-0"
                    size={24}
                  />
                  <div>
                    <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
                      {t.conoffaddTitle}
                    </p>
                    <p className="text-gray-800 font-bold leading-tight text-sm">
                      {consultant.law_firm_address ?? "-"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail
                    className="text-blue-700 mt-1 flex-shrink-0"
                    size={24}
                  />
                  <div>
                    <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-gray-800 font-bold break-all">
                      {consultant.email ?? "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantDetailModal;
