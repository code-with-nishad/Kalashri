import React from "react";
import MobileHeader from "../../components/layout/MobileHeader";
import { Link } from "react-router-dom";

const sarees = [
  { name: "Brahmani", price: "₹1100", img: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop", desc: "Authentic traditional Brahmani Nauvari." },
  { name: "Peshawai", price: "₹1500", img: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=400&fit=crop", desc: "Royal Peshawai style Nauvari." },
  { name: "Mastani", price: "₹1500", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop", desc: "Elegant Mastani Nauvari." },
  { name: "Rajlaxmi", price: "₹1700", img: "https://images.unsplash.com/photo-1585468274952-66591eb14165?w=400&fit=crop", desc: "Premium Rajlaxmi Nauvari." },
  { name: "Lavanichi", price: "₹1100", img: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=400&fit=crop", desc: "Traditional Lavanichi Nauvari." },
  { name: "Jijau", price: "₹1000", img: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop", desc: "Classic Jijau Nauvari." },
  { name: "Mhalasa", price: "₹1100", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop", desc: "Graceful Mhalasa Nauvari." },
  { name: "Gent's Sovale", price: "₹300", img: "https://images.unsplash.com/photo-1585468274952-66591eb14165?w=400&fit=crop", desc: "Traditional Gent's Sovale." },
];

export default function NauvariSarees() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-24 font-sans">
      <MobileHeader title="Nauvari Saree Stitching" showBack />
      
      {/* Hero Section */}
      <div className="relative">
        <img 
          src="/images/bharti-hero.jpg" 
          alt="Nauvari Saree Specialist" 
          className="w-full h-64 object-cover object-top"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=800&fit=crop"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12080a]/90 via-[#12080a]/60 to-transparent flex flex-col justify-center px-6">
          <span className="text-[var(--color-accent)] text-xs uppercase tracking-[0.2em] font-bold mb-2">Kalashri Exclusive</span>
          <h2 className="text-3xl font-display font-bold text-white mb-2 leading-tight">
            Nauvari Saree<br/>Specialist
          </h2>
          <p className="text-white/80 text-sm max-w-[200px] leading-relaxed">
            Perfect fit, authentic styles, and premium stitching for your special day.
          </p>
        </div>
      </div>

      <div className="px-5 py-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-display font-bold text-white mb-2">Our Stitching Styles</h3>
          <p className="text-sm text-[var(--color-text-secondary)]">Choose from our wide range of authentic Nauvari styles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sarees.map((saree, i) => (
            <div key={i} className="card-luxury p-4 flex gap-4 items-center relative overflow-hidden group">
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-[var(--color-border)] shadow-sm">
                <img src={saree.img} alt={saree.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-white font-display text-lg">{saree.name}</h4>
                  <span className="text-[var(--color-accent)] font-bold">{saree.price}</span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] mb-4">{saree.desc}</p>
                <Link to={`/book?category=Nauvari`} className="text-xs font-semibold uppercase tracking-wider text-white bg-[var(--color-surface-3)] hover:bg-[var(--color-accent)] hover:text-[var(--color-primary-dark)] px-4 py-2 rounded-lg transition-colors border border-[var(--color-border)]">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
