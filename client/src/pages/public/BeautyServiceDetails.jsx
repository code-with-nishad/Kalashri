import React from "react";
import MobileHeader from "../../components/layout/MobileHeader";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function BeautyServiceDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex flex-col pb-24">
      <div className="relative">
        <MobileHeader className="absolute top-0 w-full bg-transparent shadow-none" showBack />
        <img 
          src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&auto=format&fit=crop" 
          alt="Bridal Makeup" 
          className="w-full h-80 object-cover rounded-b-[2rem]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 rounded-b-[2rem]" />
      </div>

      <div className="px-6 py-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold font-display text-gray-900">Bridal Makeup</h1>
          <span className="text-xl font-bold text-[var(--color-accent)]">₹ 6,999</span>
        </div>

        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Complete bridal makeup package with the best products and experienced professionals.
        </p>

        <h3 className="font-bold text-gray-800 mb-3 text-sm">Includes</h3>
        <div className="space-y-3">
          {["HD Makeup", "Hair Styling", "False Lashes", "Saree Draping"].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 max-w-md mx-auto z-50">
        <button 
          onClick={() => navigate("/book")}
          className="w-full py-4 bg-[var(--color-primary-dark)] text-white rounded-full font-bold text-sm hover:bg-[var(--color-primary)] transition-colors shadow-lg"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
