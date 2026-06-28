import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Gift } from "lucide-react";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";

export default function LaunchModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenLaunch = localStorage.getItem("hasSeenGrandLaunch");
    if (!hasSeenLaunch) {
      // Small delay so they see the dashboard first
      const timer = setTimeout(() => {
        setIsOpen(true);
        triggerConfetti();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenGrandLaunch", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative pointer-events-auto">
              
              {/* Decorative Header */}
              <div className="h-32 bg-gradient-to-br from-[var(--color-rose-500)] to-pink-600 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                  <Gift className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 text-center space-y-4">
                <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
                  Grand Launch! 🎉
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  Welcome to the brand new <span className="font-semibold text-[var(--color-text-primary)]">Gayatri Beauty Studio</span> App! We are thrilled to have you here.
                </p>
                <div className="bg-[var(--color-rose-500)]/10 rounded-2xl p-4 border border-[var(--color-rose-500)]/20 my-6">
                  <p className="text-[var(--color-rose-400)] font-semibold flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" /> Grand Launch Offer
                  </p>
                  <p className="text-[var(--color-text-primary)] font-bold text-lg mt-1">
                    Get 10 Bonus Glow Points & "Founding Queen" Title!
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1 font-medium">
                    Strictly limited to the <span className="text-[var(--color-rose-500)] font-bold">First 50 Customers</span> who register!
                  </p>
                </div>

                <Link
                  to="/book"
                  onClick={handleClose}
                  className="block w-full py-3.5 bg-[var(--color-rose-500)] hover:bg-[var(--color-rose-600)] text-white font-semibold rounded-xl transition-all shadow-[var(--shadow-glow-rose)] hover:-translate-y-0.5"
                >
                  Claim Offer & Book Now
                </Link>
                
                <button
                  onClick={handleClose}
                  className="w-full py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
