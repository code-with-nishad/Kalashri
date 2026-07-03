import React from "react";
import MobileHeader from "../../components/layout/MobileHeader";
import { Link, useNavigate } from "react-router-dom";

const services = [
  { name: "Bridal Makeup", icon: "👰", to: "/beauty/details" },
  { name: "Party Makeup", icon: "💄", to: "/beauty/details" },
  { name: "Hair Styling", icon: "💇‍♀️", to: "/beauty/details" },
  { name: "Facial", icon: "🧖‍♀️", to: "/beauty/details" },
  { name: "Mehendi", icon: "🌿", to: "/beauty/details" },
  { name: "Skin Care", icon: "🧴", to: "/beauty/details" },
];

export default function Beauty() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--color-surface)] pb-24 relative">
      <MobileHeader title="Beauty Parlour" showBack />

      {/* Hero */}
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1516975080661-460d3fcb6215?w=800&auto=format&fit=crop" 
          alt="Beauty Hero" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12080a]/90 to-transparent flex flex-col justify-center px-6">
          <h2 className="text-2xl font-display font-bold text-white mb-2 leading-tight">
            Enhance Your<br/>Beauty With Us
          </h2>
          <p className="text-[var(--color-accent)] text-[10px] uppercase tracking-widest font-semibold max-w-[120px]">
            Because You<br/>Deserve the Best
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="px-6 py-8">
        <h3 className="text-lg font-bold text-white font-display mb-4">Our Services</h3>
        <div className="grid grid-cols-3 gap-4">
          {services.map((svc, i) => (
            <Link key={i} to={svc.to} className="flex flex-col items-center text-center gap-2">
              <div className="w-16 h-16 rounded-full bg-[var(--color-surface-3)] flex items-center justify-center text-2xl shadow-sm border border-[var(--color-border)]">
                {svc.icon}
              </div>
              <span className="text-[10px] font-semibold text-white leading-tight">{svc.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-20 left-0 right-0 px-6 max-w-md mx-auto z-40">
        <button 
          onClick={() => navigate("/book")}
          className="w-full py-4 btn-luxury-primary shadow-lg shadow-[var(--color-accent)]/30 text-center"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}