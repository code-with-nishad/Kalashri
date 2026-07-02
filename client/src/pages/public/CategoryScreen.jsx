import React from "react";
import MobileHeader from "../../components/layout/MobileHeader";
import { Link } from "react-router-dom";

export default function CategoryScreen() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <MobileHeader title="Our Categories" showBack />
      
      <div className="px-6 py-6 space-y-5">
        <Link to="/fashion" className="block bg-[var(--color-primary-dark)] text-[var(--color-gold)] rounded-3xl p-5 shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold font-display mb-2">Fashion</h2>
            <span className="text-[10px] font-bold text-[var(--color-gold-light)] uppercase tracking-wider">View All →</span>
          </div>
          <img src="https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&auto=format&fit=crop" alt="Fashion" className="w-20 h-28 object-cover rounded-xl" />
        </Link>

        <Link to="/beauty" className="block bg-[#1a0a1a] text-[var(--color-accent)] rounded-3xl p-5 shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold font-display mb-2">Beauty Parlour</h2>
            <span className="text-[10px] font-bold text-[var(--color-accent-light)] uppercase tracking-wider">View All →</span>
          </div>
          <img src="https://images.unsplash.com/photo-1516975080661-460d3fcb6215?w=400&auto=format&fit=crop" alt="Beauty" className="w-20 h-28 object-cover rounded-xl" />
        </Link>
      </div>
    </div>
  );
}
