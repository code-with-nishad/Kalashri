import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ products, onViewDetails, title, icon: Icon }) {
  const sliderRef = useRef(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const maxIndex = Math.max(0, products.length - 1);

  const scrollToIndex = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(idx, maxIndex));
    setSliderIndex(clamped);
    if (sliderRef.current) {
      const card = sliderRef.current.children[clamped];
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [maxIndex]);

  // Touch/drag swipe support
  const touchStart = useRef(null);
  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      scrollToIndex(diff > 0 ? sliderIndex + 1 : sliderIndex - 1);
    }
    touchStart.current = null;
  };

  if (!products || products.length === 0) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)] flex items-center gap-3">
          {Icon && <Icon className="w-6 h-6 text-[var(--color-rose-400)]" />}
          {title}
        </h2>
        
        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => scrollToIndex(sliderIndex - 1)} 
            disabled={sliderIndex === 0}
            className="w-10 h-10 rounded-full bg-[var(--color-surface-card)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-rose-500)] hover:border-[var(--color-rose-500)]/30 transition-all shadow-sm disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollToIndex(sliderIndex + 1)} 
            disabled={sliderIndex >= maxIndex}
            className="w-10 h-10 rounded-full bg-[var(--color-surface-card)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-rose-500)] hover:border-[var(--color-rose-500)]/30 transition-all shadow-sm disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div 
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 px-2 -mx-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product, i) => (
          <div key={product._id} className="snap-center flex-shrink-0 w-[260px] sm:w-[280px]">
            <ProductCard product={product} onViewDetails={onViewDetails} />
          </div>
        ))}
      </div>

      {/* Progress Bar Alternative to Dots (looks more premium) */}
      {products.length > 1 && (
        <div className="w-full max-w-md mx-auto h-1 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[var(--color-rose-400)] to-[var(--color-rose-600)] transition-all duration-300 ease-out"
            style={{ width: `${((sliderIndex + 1) / products.length) * 100}%` }}
          />
        </div>
      )}
    </motion.div>
  );
}
