import React from "react";
import MobileHeader from "../../components/layout/MobileHeader";

const types = [
  { name: "Princess Cut", img: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop" },
  { name: "Katori", img: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=400&fit=crop" },
  { name: "1 Tax", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop" },
  { name: "4 Tax", img: "https://images.unsplash.com/photo-1585468274952-66591eb14165?w=400&fit=crop" },
  { name: "Designer Blouse", img: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=400&fit=crop" },
  { name: "Bridal Blouse", img: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop" },
  { name: "Padded Blouse", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop" },
  { name: "All Types", img: "https://images.unsplash.com/photo-1585468274952-66591eb14165?w=400&fit=crop" },
];

export default function BlouseStitching() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <MobileHeader title="Blouse Stitching" showBack />
      
      {/* Filters */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-100 bg-white">
        <span className="px-5 py-1.5 rounded-full bg-[var(--color-accent)] text-white text-xs font-semibold whitespace-nowrap shadow-sm">All Types</span>
        <span className="px-5 py-1.5 rounded-full border border-gray-200 text-gray-600 text-xs font-medium whitespace-nowrap">4 Tax</span>
        <span className="px-5 py-1.5 rounded-full border border-gray-200 text-gray-600 text-xs font-medium whitespace-nowrap">1 Tax</span>
        <span className="px-5 py-1.5 rounded-full border border-gray-200 text-gray-600 text-xs font-medium whitespace-nowrap">Princess Cut</span>
        <span className="px-5 py-1.5 rounded-full border border-gray-200 text-gray-600 text-xs font-medium whitespace-nowrap">Katori</span>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {types.map((type, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-rose-100 pb-3 text-center flex flex-col">
            <img src={type.img} alt={type.name} className="w-full h-36 object-cover mb-2" />
            <span className="text-xs font-bold text-[var(--color-accent)] tracking-wide">{type.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
