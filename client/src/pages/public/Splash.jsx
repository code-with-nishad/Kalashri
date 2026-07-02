import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-primary-dark)] text-[var(--color-gold)]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center"
      >
        <div className="w-24 h-24 rounded-full border-2 border-[var(--color-gold)] flex items-center justify-center mb-6">
          <span className="text-5xl font-display">K</span>
        </div>
        <h1 className="text-4xl font-display font-semibold tracking-widest mb-2">KALASHRI</h1>
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-white/80">Fashion • Beauty • Insurance</p>
        
        <div className="mt-20">
          <p className="text-sm text-[var(--color-gold-light)]/70">Everything You Need,</p>
          <p className="text-sm text-[var(--color-gold-light)]/70">All In One Place</p>
          <div className="flex justify-center gap-2 mt-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] opacity-50" />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] opacity-50" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
