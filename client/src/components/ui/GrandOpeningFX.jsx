import { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export default function GrandOpeningFX() {
  useEffect(() => {
    // Fireworks effect from the bottom corners
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const balloons = [
    { id: 1, color: "bg-red-500", left: "10%", delay: 0 },
    { id: 2, color: "bg-yellow-400", left: "30%", delay: 1 },
    { id: 3, color: "bg-emerald-500", left: "50%", delay: 0.5 },
    { id: 4, color: "bg-purple-500", left: "70%", delay: 2 },
    { id: 5, color: "bg-[var(--color-rose-500)]", left: "85%", delay: 1.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: "110vh", opacity: 1 }}
          animate={{ y: "-20vh", opacity: 0 }}
          transition={{ duration: 10, delay: b.delay, ease: "linear", repeat: Infinity }}
          className={`absolute w-12 h-16 rounded-[50%] ${b.color} shadow-lg opacity-80`}
          style={{ left: b.left }}
        >
          {/* Balloon string */}
          <div className="absolute top-[100%] left-1/2 w-0.5 h-12 bg-white/50 -translate-x-1/2" />
        </motion.div>
      ))}
    </div>
  );
}
