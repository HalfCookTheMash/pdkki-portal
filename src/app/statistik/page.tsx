"use client";

import React, { useState, useEffect } from "react";
import DataStatsCards from "@/components/DataStatsCards";
import Hero from "@/components/hero";
import Separator from "@/components/ui/separator";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useLanguage } from "@/context/LanguageContext";

const StatistikPage = () => {
  const { t, lang } = useLanguage();

  const [statusData, setStatusData] = useState<
    { name: string; value: number }[]
  >([]);
  const [genderData, setGenderData] = useState<
    { name: string; value: number }[]
  >([]);
  const [barData, setBarData] = useState<
    { name: string; aktif: number; tidakAktif: number; total: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const COLORS = {
    aktif: "#22C55E",
    tidakAktif: "#EF4444",
    pria: "#2E4ABE",
    wanita: "#F59E0B",
  };

  useEffect(() => {
    async function fetchAll() {
      setIsLoading(true);
      try {
        const [statsRes, provinceRes, genderRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/statistics`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/statistics/provinces`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/statistics/gender`),
        ]);

        const stats = await statsRes.json();
        const provinces = await provinceRes.json();
        const gender = await genderRes.json();

        // Status pie chart
        setStatusData([
          { name: t.active, value: stats.active },
          { name: t.inactive, value: stats.inactive },
        ]);

        // Gender pie chart
        setGenderData([
          { name: t.male, value: gender.male },
          { name: t.female, value: gender.female },
        ]);

        // Bar chart per provinsi — ambil 10 terbanyak
        const barFormatted = provinces
          .map((p: any) => ({
            name: p.province ?? "Lainnya",
            aktif: p.active,
            tidakAktif: p.inactive,
            total: p.total,
          }))
          .sort((a: any, b: any) => b.total - a.total)
          .slice(0, 10);

        setBarData(barFormatted);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAll();
  }, [t, lang]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Hero />
        <div className="relative z-10">
          <Separator />
        </div>
        <div className="container mx-auto px-4 -mt-10 relative z-10">
          <DataStatsCards />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <div className="h-[380px] bg-white rounded-xl animate-pulse" />
            <div className="h-[380px] bg-white rounded-xl animate-pulse" />
          </div>
          <div className="h-[620px] bg-white rounded-xl animate-pulse mt-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Hero />
      <div className="relative z-10">
        <Separator />
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <DataStatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          {/* Chart Status Konsultan */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 font-poppins">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              {t.activeconTitle}
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart key={`status-${lang}`}>
                  <Pie
                    data={statusData}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill={COLORS.aktif} />
                    <Cell fill={COLORS.tidakAktif} />
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "8px" }} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart Jenis Kelamin */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 font-poppins">
              <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
              {t.srcformGTitle}
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart key={`gender-${lang}`}>
                  <Pie
                    data={genderData}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill={COLORS.pria} />
                    <Cell fill={COLORS.wanita} />
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "8px" }} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bar Chart 10 Provinsi Terbanyak */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mt-8">
          <h3 className="text-lg font-bold text-gray-700 mb-8 flex items-center gap-2 font-poppins">
            <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
            {t.mapTitle}
          </h3>
          <div className="h-[550px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                key={`bar-${lang}`}
                data={barData}
                layout="vertical"
                margin={{ left: 30, right: 40, top: 20 }}
                barGap={8}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={150}
                  tick={{ fontSize: 12, fontWeight: 500, fill: "#4B5563" }}
                />
                <Tooltip
                  cursor={{ fill: "#f9fafb" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ paddingBottom: "30px", fontSize: "12px" }}
                />
                <Bar
                  dataKey="aktif"
                  name={t.active}
                  fill={COLORS.aktif}
                  radius={[0, 4, 4, 0]}
                  barSize={15}
                />
                <Bar
                  dataKey="tidakAktif"
                  name={t.inactive}
                  fill={COLORS.tidakAktif}
                  radius={[0, 4, 4, 0]}
                  barSize={15}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistikPage;
