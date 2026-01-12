"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MapLogic({ geoData, stats }: { geoData: any; stats: any }) {
  const map = useMap();
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    if (!map || !geoData) return;

    const getColor = (d: number) => {
      return d > 50  ? '#800026' :
             d > 20  ? '#BD0026' :
             d > 10  ? '#E31A1C' :
             d > 5   ? '#FC4E2A' :
             d > 0   ? '#FD8D3C' : '#FFEDA0';
    };

    const getStyle = (feature: any) => {
      const name = (feature.properties.name || feature.properties.propinsi || "").toUpperCase();
      const count = stats[name] || 0;
      return {
        fillColor: getColor(count),
        weight: 1.5,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      };
    };

    geoJsonLayerRef.current = L.geoJSON(geoData, {
      style: getStyle,
      onEachFeature: (feature, layer) => {
        const name = (feature.properties.name || feature.properties.propinsi || "").toUpperCase();
        const count = stats[name] || 0;

        layer.bindTooltip(`<strong>${name}</strong><br/>${count} Konsultan`, { sticky: true });

        layer.on({
          mouseover: (e) => {
            const l = e.target;
            l.setStyle({ weight: 3, color: '#666', fillOpacity: 0.9 });
            l.bringToFront();
          },
          mouseout: (e) => {
            geoJsonLayerRef.current?.resetStyle(e.target);
          }
        });
      }
    }).addTo(map);

    return () => {
      if (geoJsonLayerRef.current) {
        map.removeLayer(geoJsonLayerRef.current);
      }
    };
  }, [map, geoData, stats]);

  return null;
}

export default function IndonesiaMap({ geoData, stats }: { geoData: any; stats: any }) {
  return (
    <MapContainer
      center={[-2.5489, 118.0149]}
      zoom={5}
      className="h-full w-full"
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapLogic geoData={geoData} stats={stats} />
    </MapContainer>
  );
}