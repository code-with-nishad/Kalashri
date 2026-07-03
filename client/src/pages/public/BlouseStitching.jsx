import React from "react";
import MobileHeader from "../../components/layout/MobileHeader";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const blouses = [
  { name: "4 Tuck Blouse", price: "₹300 - ₹500", img: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop", desc: "Classic 4 Tuck blouse stitching with perfect fit." },
  { name: "1 Tuck Blouse", price: "₹300 - ₹500", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop", desc: "Sleek 1 Tuck blouse stitching." },
  { name: "Princess Cut", price: "₹400 - ₹1000", img: "https://plus.unsplash.com/premium_photo-1682089872205-dbbb4af4bf52?w=400&fit=crop", desc: "Elegant Princess Cut blouse for a modern look." },
  { name: "Katori Blouse", price: "₹300 - ₹500", img: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=400&fit=crop", desc: "Traditional Katori blouse stitching." },
];

export default function BlouseStitching() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-24 font-sans">
      <MobileHeader title="Blouse Stitching" showBack />
      
      {/* Hero Section */}
      <div className="relative">
        <img 
          src="/images/bharti-hero.jpg" 
          alt="Designer Blouse Stitching" 
          className="w-full h-64 object-cover object-top"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=800&fit=crop"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12080a]/90 via-[#12080a]/60 to-transparent flex flex-col justify-center px-6">
          <span className="text-[var(--color-accent)] text-xs uppercase tracking-[0.2em] font-bold mb-2">Perfect Fit</span>
          <h2 className="text-3xl font-display font-bold text-white mb-2 leading-tight">
            Designer Blouse<br/>Stitching
          </h2>
          <p className="text-white/80 text-sm max-w-[220px] leading-relaxed">
            We stitch all types of fashionable, designer and customized blouses.
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-[var(--color-surface-2)] py-4 border-y border-[var(--color-border)]">
        <div className="flex flex-wrap gap-4 justify-center px-4">
          {["Perfect Fit", "Custom Measurements", "Premium Finish", "Designer Patterns"].map((badge, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs font-semibold text-white/90">
              <Check className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              {badge}
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-display font-bold text-white mb-2">Our Stitching Styles</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {blouses.map((blouse, i) => (
            <div key={i} className="card-luxury p-4 flex gap-4 items-center relative overflow-hidden group">
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-[var(--color-border)] shadow-sm">
                <img src={blouse.img} alt={blouse.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-white font-display text-lg">{blouse.name}</h4>
                  <span className="text-[var(--color-accent)] font-bold text-sm">{blouse.price}</span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] mb-4">{blouse.desc}</p>
                <Link to={`/book?category=Blouse`} className="text-xs font-semibold uppercase tracking-wider text-white bg-[var(--color-surface-3)] hover:bg-[var(--color-accent)] hover:text-[var(--color-primary-dark)] px-4 py-2 rounded-lg transition-colors border border-[var(--color-border)]">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Designer Blouse CTA */}
        <div className="card-luxury p-6 text-center border border-[var(--color-accent)]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/5 to-transparent pointer-events-none" />
          <h3 className="font-display font-bold text-xl text-white mb-2">Looking for a Designer Blouse?</h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6 max-w-md mx-auto">
            Price depends on design complexity and customization. Bring your own design or let us create something unique for you!
          </p>
          <Link to="/book?category=Blouse" className="btn-luxury-primary px-8 py-3 text-sm inline-block">
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
