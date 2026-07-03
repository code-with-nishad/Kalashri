import React from "react";
import MobileHeader from "../../components/layout/MobileHeader";
import { Link } from "react-router-dom";
import { Scissors, Shirt, Sparkles, UserCheck } from "lucide-react";

const services = [
  { name: "Nauvari Saree Stitching", icon: "🥻", to: "/fashion/nauvari" },
  { name: "Blouse Stitching", icon: "👚", to: "/fashion/blouse" },
  { name: "Dresses", icon: "👗", to: "/fashion/dresses" },
  { name: "Aari Work", icon: "✨", to: "/fashion/aari" },
  { name: "Mens Wear", icon: "👔", to: "/fashion/mens" },
  { name: "Fabric & More", icon: "🧵", to: "/fashion/fabric" },
];

export default function FashionHome() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-20">
      <MobileHeader title="Fashion" showBack showSearch />

      {/* Hero */}
      <div className="relative">
        <img 
          src="/images/bharti-hero.jpg" 
          alt="Fashion Hero" 
          className="w-full h-64 object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12080a]/90 to-transparent flex flex-col justify-center px-6">
          <h2 className="text-3xl font-display font-bold text-white mb-2 leading-tight">
            Customized<br/>Just For You
          </h2>
          <p className="text-[var(--color-accent)] text-xs uppercase tracking-widest font-medium">
            Premium Stitching<br/>Perfect Fit
          </p>
        </div>
      </div>

      {/* Services */}
      {/* Services */}
      <div className="bg-[var(--color-surface)] rounded-t-3xl -mt-6 relative z-10 px-6 py-8 shadow-[0_-8px_20px_rgba(0,0,0,0.5)] border-t border-[var(--color-border)] pb-24">
        <h3 className="text-lg font-bold text-white font-display mb-4">Our Services</h3>
        <div className="grid grid-cols-2 gap-4">
          {services.map((svc, i) => (
            <Link key={i} to={svc.to} className="card-luxury p-4 flex flex-col items-center justify-center text-center">
              <span className="text-3xl mb-3">{svc.icon}</span>
              <span className="text-xs font-semibold text-white">{svc.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
