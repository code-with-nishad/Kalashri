import React from "react";
import MobileHeader from "../../components/layout/MobileHeader";

const sarees = [
  { name: "Brahmani", img: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop" },
  { name: "Peshawai", img: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=400&fit=crop" },
  { name: "Mestani", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop" },
  { name: "Rajlaxmi", img: "https://images.unsplash.com/photo-1585468274952-66591eb14165?w=400&fit=crop" },
  { name: "Lavani", img: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=400&fit=crop" },
  { name: "Jijau", img: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop" },
];

export default function NauvariSarees() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-20">
      <MobileHeader title="Nauvari Saree Stitching" showBack />
      
      <div className="p-4 grid grid-cols-2 gap-4">
        {sarees.map((saree, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--color-border)]">
            <img src={saree.img} alt={saree.name} className="w-full h-40 object-cover" />
            <div className="p-3 text-center bg-[var(--color-primary-dark)]">
              <span className="text-xs font-semibold text-[var(--color-gold)] uppercase tracking-wider">{saree.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
