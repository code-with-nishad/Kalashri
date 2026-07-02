import React from "react";
import MobileHeader from "../../components/layout/MobileHeader";

const types = [
  { name: "Anarkali", img: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop" },
  { name: "One Piece", img: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=400&fit=crop" },
  { name: "Gowns", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop" },
  { name: "Dhoti", img: "https://images.unsplash.com/photo-1585468274952-66591eb14165?w=400&fit=crop" },
];

export default function Dresses() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-20 flex flex-col">
      <MobileHeader title="Dresses" showBack />
      
      {/* Filters */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-100">
        <span className="px-4 py-1.5 rounded-full bg-[var(--color-primary-dark)] text-white text-xs font-semibold whitespace-nowrap">All</span>
        <span className="px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 text-xs font-medium whitespace-nowrap">Anarkali</span>
        <span className="px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 text-xs font-medium whitespace-nowrap">One Piece</span>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4 flex-1">
        {types.map((type, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--color-border)] pb-3 text-center">
            <img src={type.img} alt={type.name} className="w-full h-40 object-cover mb-2" />
            <span className="text-xs font-semibold text-gray-800">{type.name}</span>
          </div>
        ))}
      </div>

      <div className="p-6">
        <button className="w-full py-4 bg-[var(--color-accent)] text-white rounded-full font-bold text-sm hover:bg-[var(--color-accent-light)] transition-colors shadow-lg shadow-pink-500/30">
          View All Collections
        </button>
      </div>
    </div>
  );
}
