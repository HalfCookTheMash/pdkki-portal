"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DUMMY_RESULTS } from '@/data/consultantData';

export default function MapCard() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const [geoData, setGeoData] = useState<any>(null);

  const normalizeName = (name: string) => {
    if (!name) return "";
    let n = name.toUpperCase().replace(/\s+/g, '');
    
    if (n.includes("DKIJAKARTA") || n === "JAKARTA") return "JAKARTARAYA";
    if (n.includes("KEPULAUANBANGKABELITUNG")) return "BANGKABELITUNG";
    if (n.includes("YOGYAKARTA")) return "YOGYAKARTA";
    
    if (n === "PAPUABARATDAYA") return "PAPUABARAT";
    if (["PAPUATENGAH", "PAPUAPEGUNUNGAN", "PAPUASELATAN"].includes(n)) return "PAPUA";
    
    return n;
  };

  const stats = useMemo(() => {
    const s: Record<string, number> = {};
    DUMMY_RESULTS.forEach(c => {
      const parts = c.address.split(', ');
      const rawProvince = parts[parts.length - 1];
      const cleanName = normalizeName(rawProvince);
      if (cleanName) {
        s[cleanName] = (s[cleanName] || 0) + 1;
      }
    });
    return s;
  }, []);

  useEffect(() => {
    fetch("/gadm41_IDN_1.json")
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Gagal memuat GeoJSON:", err));
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const southWest = L.latLng(-12.0, 94.0);
    const northEast = L.latLng(8.0, 142.0);
    const bounds = L.latLngBounds(southWest, northEast);

    mapInstanceRef.current = L.map(mapContainerRef.current, {
      center: [-2.2, 118.0],
      zoom: 5,
      minZoom: 5,               
      maxBounds: bounds,        
      maxBoundsViscosity: 1.0,  
      scrollWheelZoom: false,
      zoomControl: false,       
      attributionControl: false 
    });

    L.control.zoom({
      position: 'topleft'
    }).addTo(mapInstanceRef.current);

    L.control.attribution({
      position: 'bottomright',
    }).addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors').addTo(mapInstanceRef.current);

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!geoData || !mapInstanceRef.current) return;

    if (geoJsonLayerRef.current) {
      mapInstanceRef.current.removeLayer(geoJsonLayerRef.current);
    }

    const getColor = (d: number) => {
      return d > 80 ? '#E91E63' : 
             d > 30 ? '#FF5722' : 
             d > 10 ? '#FF9800' : 
             d > 0  ? '#FFEB3B' : '#F5F5F5';   
    };

    geoJsonLayerRef.current = L.geoJSON(geoData, {
      style: (feature: any) => {
        const nameInGeo = normalizeName(feature.properties.NAME_1);
        const count = stats[nameInGeo] || 0;
        
        return {
          fillColor: getColor(count),
          weight: 1,
          opacity: 1,
          color: '#666',
          fillOpacity: 0.9
        };
      },
      onEachFeature: (feature, layer) => {
        const nameInGeo = normalizeName(feature.properties.NAME_1);
        const count = stats[nameInGeo] || 0;

        layer.bindTooltip(`
          <div style="font-family: 'Poppins', sans-serif;">
            <strong>${feature.properties.NAME_1}</strong><br/>
            ${count} Konsultan Terdaftar
          </div>
        `, { sticky: true });

        layer.on({
          mouseover: (e) => {
            const l = e.target;
            l.setStyle({ weight: 2, color: '#333', fillOpacity: 1 });
            l.bringToFront();
          },
          mouseout: (e) => {
            geoJsonLayerRef.current?.resetStyle(e.target);
          }
        });
      }
    }).addTo(mapInstanceRef.current);

  }, [geoData, stats]);

  return (
    <div className="w-full bg-white rounded-[8px] border border-[#D0B4B4] overflow-hidden flex flex-col shadow-sm h-full font-poppins">
      {/* Header */}
      <div className="p-6 pb-2">
        <h3 className="text-[18px] font-semibold text-[#1E1E1E]">Peta Sebaran Konsultan KI</h3>
        <p className="text-[11px] text-gray-400">Klik wilayah untuk melihat detail data.</p>
      </div>

      {/* Area Peta */}
      <div className="flex-grow relative m-4 mt-2 bg-[#F0F7FF] rounded-lg border border-blue-50 overflow-hidden min-h-[450px]">
        {/* Kontainer Leaflet */}
        <div ref={mapContainerRef} className="h-full w-full bg-transparent z-0" />
        
        {/* Legend */}
        <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-gray-100 min-w-[120px]">
          <h4 className="text-[9px] font-bold text-gray-500 uppercase mb-2">Status Konsultan</h4>
          <div className="space-y-1.5">
            <LegendItem color="#E91E63" label="> 80 Konsultan" />
            <LegendItem color="#FF5722" label="30-80 Konsultan" />
            <LegendItem color="#FF9800" label="10-30 Konsultan" />
            <LegendItem color="#FFEB3B" label="< 10 Konsultan" />
          </div>
        </div>
      </div>
    </div>
  );
}

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
    <span className="text-[9px] font-medium text-gray-600">{label}</span>
  </div>
);