// src/components/DataStatsCards.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const DataStatsCards = () => {
  const { t } = useLanguage();
  const [statsData, setStatsData] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    provinces: 0,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/statistics`,
        );
        if (!res.ok) throw new Error("Failed to fetch statistics");
        const data = await res.json();

        setStatsData({
          total: data.total,
          active: data.active,
          inactive: data.inactive,
          provinces: data.provinces,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setIsLoading(false);
        setIsMounted(true);
      }
    }

    fetchStatistics();
  }, []);

  const stats = [
    { label: t.totalconTitle, value: statsData.total, color: "#2E4ABE" },
    { label: t.activeconTitle, value: statsData.active, color: "#22C55E" },
    { label: t.inactiveconTitle, value: statsData.inactive, color: "#EF4444" },
    { label: t.regionTitle, value: statsData.provinces, color: "#F59E0B" },
  ];

  if (!isMounted || isLoading) {
    return (
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-6 bg-white animate-pulse"
              style={{
                minHeight: "140px",
                borderRadius: "8px",
                border: "1px solid #D0B4B4",
              }}
            >
              <div className="h-12 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-6 transition-all hover:shadow-md bg-white h-full"
            style={{
              minHeight: "140px",
              borderRadius: "8px",
              border: "1px solid #D0B4B4",
            }}
          >
            <span
              className="text-4xl md:text-5xl font-bold mb-2 font-poppins"
              style={{ color: stat.color }}
            >
              {stat.value}
            </span>
            <span className="text-gray-500 text-sm md:text-base font-medium text-center font-poppins">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataStatsCards;
