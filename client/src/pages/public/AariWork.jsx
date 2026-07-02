import React from "react";
import MobileHeader from "../../components/layout/MobileHeader";

const items = [
  "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop",
  "https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=400&fit=crop",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop",
  "https://images.unsplash.com/photo-1585468274952-66591eb14165?w=400&fit=crop",
  "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop",
  "https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=400&fit=crop",
];

export default function AariWork() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-20">
      <MobileHeader title="Aari Work Gallery" showBack />
      
      {/* Tabs */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-100">
        <span className="px-5 py-1.5 rounded-full bg-white text-[var(--color-primary-dark)] shadow-sm border border-gray-200 text-xs font-bold whitespace-nowrap">Blouse</span>
        <span className="px-5 py-1.5 rounded-full bg-transparent text-gray-500 text-xs font-semibold whitespace-nowrap">Saree</span>
        <span className="px-5 py-1.5 rounded-full bg-transparent text-gray-500 text-xs font-semibold whitespace-nowrap">Dress</span>
        <span className="px-5 py-1.5 rounded-full bg-transparent text-gray-500 text-xs font-semibold whitespace-nowrap">All</span>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3">
        {items.map((img, i) => (
          <div key={i} className="rounded-xl overflow-hidden shadow-sm">
            <img src={img} alt="Aari Work" className="w-full h-32 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
