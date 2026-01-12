"use client";

import React, { useMemo } from 'react';
import { DUMMY_RESULTS } from '@/data/consultantData';
import DataStatsCards from '@/components/DataStatsCards';
import Hero from '@/components/hero';
import Separator from '@/components/ui/separator';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';

const StatistikPage = () => {

  const stats = useMemo(() => {
    // Data Status untuk Pie Chart
    const statusData = [
      { name: 'Aktif', value: DUMMY_RESULTS.filter(d => d.status.toLowerCase() === 'aktif').length },
      { name: 'Tidak Aktif', value: DUMMY_RESULTS.filter(d => d.status.toLowerCase() !== 'aktif').length },
    ];

    // Data Gender untuk Pie Chart
    const genderData = [
      { name: 'Pria', value: DUMMY_RESULTS.filter(d => d.gender === 'Laki-laki').length },
      { name: 'Wanita', value: DUMMY_RESULTS.filter(d => d.gender === 'Perempuan').length },
    ];

    // Data Provinsi untuk Bar Chart
    const provinceMap: Record<string, { name: string; aktif: number; tidakAktif: number; total: number }> = {};

    DUMMY_RESULTS.forEach(k => {
      const prov = k.address.split(',').pop()?.trim() || 'Lainnya';
      if (!provinceMap[prov]) {
        provinceMap[prov] = { name: prov, aktif: 0, tidakAktif: 0, total: 0 };
      }

      if (k.status.toLowerCase() === 'aktif') {
        provinceMap[prov].aktif += 1;
      } else {
        provinceMap[prov].tidakAktif += 1;
      }
      provinceMap[prov].total += 1;
    });

    // 10 provinsi dengan total konsultan terbanyak
    const barData = Object.values(provinceMap)
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    return { statusData, genderData, barData };
  }, []);

  const COLORS = {
    aktif: '#22C55E',
    tidakAktif: '#EF4444',
    pria: '#2E4ABE',     
    wanita: '#F59E0B'     
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Hero />

      <Separator />

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <DataStatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          {/* Chart Status Konsultan */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 font-poppins">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              Status Konsultan
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.statusData}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill={COLORS.aktif} />
                    <Cell fill={COLORS.tidakAktif} />
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px'}} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart Jenis Kelamin */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 font-poppins">
              <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
              Jenis Kelamin
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.genderData}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill={COLORS.pria} />
                    <Cell fill={COLORS.wanita} />
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Chart 10 Provinsi Terbanyak */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mt-8">
          <h3 className="text-lg font-bold text-gray-700 mb-8 flex items-center gap-2 font-poppins">
            <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
            10 Provinsi dengan Konsultan Terbanyak
          </h3>
          <div className="h-[550px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={stats.barData} 
                layout="vertical" 
                margin={{ left: 30, right: 40, top: 20 }}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={150} 
                  tick={{ fontSize: 12, fontWeight: 500, fill: '#4B5563' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: '30px', fontSize: '12px' }}
                />
                
                {/* Bar Konsultan Aktif */}
                <Bar 
                  dataKey="aktif" 
                  name="Aktif"
                  fill={COLORS.aktif} 
                  radius={[0, 4, 4, 0]} 
                  barSize={15} 
                />

                {/* Bar Konsultan Tidak Aktif */}
                <Bar 
                  dataKey="tidakAktif" 
                  name="Tidak Aktif"
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