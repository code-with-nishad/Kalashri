import React from "react";
import MobileHeader from "../../components/layout/MobileHeader";
import { Link } from "react-router-dom";
import { Sparkles, CheckCircle2 } from "lucide-react";

const aariItems = [
  "Blouses",
  "Dresses",
  "Sarees",
  "Bridal Wear",
  "Customized Designs"
];

export default function AariWork() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-24 font-sans">
      <MobileHeader title="Aari Work" showBack />
      
      {/* Hero Section */}
      <div className="relative">
        <img 
          src="/images/bharti-hero.jpg" 
          alt="Premium Aari Work" 
          className="w-full h-64 object-cover object-top"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://plus.unsplash.com/premium_photo-1682089872205-dbbb4af4bf52?w=800&fit=crop"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12080a]/90 via-[#12080a]/60 to-transparent flex flex-col justify-center px-6">
          <span className="text-[var(--color-accent)] text-xs uppercase tracking-[0.2em] font-bold mb-2">Artisan Crafted</span>
          <h2 className="text-3xl font-display font-bold text-white mb-2 leading-tight">
            Premium<br/>Aari Work
          </h2>
          <p className="text-white/80 text-sm max-w-[200px] leading-relaxed">
            Intricate hand-embroidery to elevate your traditional wear.
          </p>
        </div>
      </div>

      <div className="px-5 py-8">
        <div className="card-luxury p-6 mb-8 relative overflow-hidden border border-[var(--color-border)] shadow-lg">
          <Sparkles className="absolute -top-6 -right-6 w-24 h-24 text-[var(--color-accent)] opacity-5" />
          
          <h3 className="font-display font-bold text-xl text-white mb-4">Available For</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {aariItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[var(--color-surface-2)] rounded-xl border border-[var(--color-border)]/50">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)]" />
                <span className="text-sm font-medium text-white/90">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-[var(--color-primary-dark)] p-4 rounded-xl border border-[var(--color-accent)]/20 mb-6 text-center">
            <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Pricing</p>
            <p className="text-2xl font-bold text-[var(--color-accent)] font-display mb-1">Starting from ₹1200</p>
            <p className="text-[10px] text-white/50">* Final price depends on the selected design and embroidery work.</p>
          </div>

          <Link to="/book?category=Aari" className="btn-luxury-primary w-full py-4 text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Customize Your Design
          </Link>
        </div>

        {/* Info text */}
        <p className="text-center text-sm text-[var(--color-text-secondary)] max-w-sm mx-auto leading-relaxed">
          Our expert artisans bring your vision to life with precision and creativity. Book a consultation today to discuss your dream design!
        </p>
      </div>
    </div>
  );
}
