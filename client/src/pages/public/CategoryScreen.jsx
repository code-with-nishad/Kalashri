import React from "react";
import MobileHeader from "../../components/layout/MobileHeader";
import { Link } from "react-router-dom";

export default function CategoryScreen() {
  return (
    <div className="min-h-screen bg-[var(--color-primary-dark)]">
      <MobileHeader title="Our Categories" showBack />
      
      <div className="px-5 py-6 space-y-4">
        {/* Fashion */}
        <Link to="/fashion" className="block relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#5a1b3f] to-[#2b0a2f] shadow-lg min-h-[160px] flex items-center">
           <div className="w-1/2 relative z-10 pl-6">
             <h2 className="text-white text-xl font-bold font-display mb-1">Fashion</h2>
             <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">View All</span>
           </div>
           <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&fit=crop" alt="Fashion" className="absolute right-0 top-0 bottom-0 h-full w-1/2 object-cover mask-image-gradient-left" />
        </Link>

        {/* Beauty */}
        <Link to="/beauty" className="block relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#3d0c34] to-[#1a0515] shadow-lg min-h-[160px] flex items-center">
           <div className="w-1/2 relative z-10 pl-6">
             <h2 className="text-white text-xl font-bold font-display mb-1">Beauty Parlour</h2>
             <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">View All</span>
           </div>
           <img src="https://images.unsplash.com/photo-1516975080661-460d3fcb6215?w=300&fit=crop" alt="Beauty" className="absolute right-0 top-0 bottom-0 h-full w-1/2 object-cover mask-image-gradient-left" />
        </Link>
      </div>
    </div>
  );
}
