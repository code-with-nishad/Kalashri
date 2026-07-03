import React from "react";
import MobileHeader from "../../components/layout/MobileHeader";
import { Link } from "react-router-dom";

const dresses = [
  { name: "Anarkali", price: "₹650", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop", desc: "Beautiful Anarkali dress stitching." },
  { name: "One Piece", price: "₹700 - ₹1000", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop", desc: "Custom One Piece dress stitching." },
  { name: "Cigar Pant Dress", price: "₹400 - ₹600", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop", desc: "Modern Cigar Pant dress stitching." },
  { name: "Patiyala Dress", price: "₹400 - ₹600", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop", desc: "Traditional Patiyala dress stitching." },
  { name: "Dhoti Dress", price: "₹400 - ₹600", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop", desc: "Stylish Dhoti dress stitching." },
];

export default function Dresses() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-24 font-sans">
      <MobileHeader title="Dress Stitching" showBack />
      
      {/* Hero Section */}
      <div className="relative">
        <img 
          src="/images/bharti-hero.jpg" 
          alt="Custom Dress Stitching" 
          className="w-full h-64 object-cover object-top"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&fit=crop"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12080a]/90 via-[#12080a]/60 to-transparent flex flex-col justify-center px-6">
          <span className="text-[var(--color-accent)] text-xs uppercase tracking-[0.2em] font-bold mb-2">Tailored For You</span>
          <h2 className="text-3xl font-display font-bold text-white mb-2 leading-tight">
            Custom Dress<br/>Stitching
          </h2>
          <p className="text-white/80 text-sm max-w-[200px] leading-relaxed">
            From traditional to modern, get the perfect fit for any occasion.
          </p>
        </div>
      </div>

      <div className="px-5 py-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-display font-bold text-white mb-2">Popular Styles</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {dresses.map((dress, i) => (
            <div key={i} className="card-luxury p-4 flex gap-4 items-center relative overflow-hidden group">
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-[var(--color-border)] shadow-sm">
                <img src={dress.img} alt={dress.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-white font-display text-lg">{dress.name}</h4>
                  <span className="text-[var(--color-accent)] font-bold text-sm">{dress.price}</span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] mb-4">{dress.desc}</p>
                <Link to={`/book?category=Dress`} className="text-xs font-semibold uppercase tracking-wider text-white bg-[var(--color-surface-3)] hover:bg-[var(--color-accent)] hover:text-[var(--color-primary-dark)] px-4 py-2 rounded-lg transition-colors border border-[var(--color-border)]">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="card-luxury p-5 text-center border-dashed border-[var(--color-border)]">
          <p className="text-white font-medium mb-1">And many more dress stitching options are available!</p>
          <p className="text-xs text-[var(--color-text-secondary)]">Contact us to discuss your unique design.</p>
        </div>
      </div>
    </div>
  );
}
