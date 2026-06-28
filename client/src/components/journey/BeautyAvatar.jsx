import { motion } from "framer-motion";

const has = (cosmetics, id) => cosmetics?.includes(id);

export default function BeautyAvatar({ level = 1, title = "Fresh Beauty", cosmetics = [], className = "" }) {
  const showCrown = has(cosmetics, "princess_crown") || has(cosmetics, "queen_crown") || level >= 5;
  const showQueenCrown = has(cosmetics, "queen_crown") || level >= 10;
  const showWings = has(cosmetics, "wings") || level >= 35;
  const showAura = has(cosmetics, "goddess_aura") || level >= 50;
  const showSparkle = has(cosmetics, "sparkle_bg") || has(cosmetics, "diamond_sparkle") || level >= 2;
  const styledHair = has(cosmetics, "styled_hair") || level >= 3;
  const elegantDress = has(cosmetics, "elegant_dress") || level >= 5;
  const makeupGlow = has(cosmetics, "makeup_glow") || level >= 8;

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {title && (
        <div className="mb-3 px-4 py-1 rounded-full bg-gradient-to-r from-[var(--color-rose-500)]/15 to-purple-500/15 border border-[var(--color-rose-500)]/25">
          <p className="text-xs font-bold text-[var(--color-rose-500)] tracking-wide">{title}</p>
        </div>
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="relative w-44 h-52 md:w-52 md:h-60"
      >
        {showAura && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[var(--color-rose-500)]/20 via-purple-400/10 to-transparent blur-xl animate-pulse" />
        )}

        {showSparkle && (
          <>
            <span className="absolute top-2 left-6 text-yellow-300 text-xs animate-pulse">✦</span>
            <span className="absolute top-8 right-4 text-pink-300 text-sm animate-pulse delay-150">✦</span>
            <span className="absolute bottom-16 left-2 text-rose-200 text-xs animate-pulse delay-300">✦</span>
          </>
        )}

        {showWings && (
          <>
            <div className="absolute top-16 -left-4 w-10 h-20 bg-gradient-to-br from-white/80 to-pink-100/60 rounded-full blur-[1px] rotate-[-25deg] border border-pink-200/50" />
            <div className="absolute top-16 -right-4 w-10 h-20 bg-gradient-to-bl from-white/80 to-pink-100/60 rounded-full blur-[1px] rotate-[25deg] border border-pink-200/50" />
          </>
        )}

        <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-lg" aria-hidden>
          <ellipse cx="100" cy="220" rx="55" ry="10" fill="#f9a8d4" opacity="0.35" />
          <ellipse cx="100" cy="200" rx="42" ry="38" fill={elegantDress ? "#f472b6" : "#fbcfe8"} />
          <path d="M58 200 Q100 170 142 200 L130 230 Q100 220 70 230 Z" fill={elegantDress ? "#ec4899" : "#f9a8d4"} />
          {elegantDress && <path d="M70 195 Q100 185 130 195" stroke="#fff" strokeWidth="2" fill="none" opacity="0.5" />}
          <rect x="88" y="130" width="24" height="40" rx="10" fill="#fde68a" opacity="0.9" />
          <ellipse cx="100" cy="95" rx="34" ry="38" fill="#fde68a" />
          {makeupGlow && <ellipse cx="100" cy="98" rx="30" ry="34" fill="#fecdd3" opacity="0.25" />}
          <ellipse cx="88" cy="92" rx="4" ry="5" fill="#4a3728" />
          <ellipse cx="112" cy="92" rx="4" ry="5" fill="#4a3728" />
          <path d="M94 104 Q100 108 106 104" stroke="#e11d48" strokeWidth="2" fill="none" strokeLinecap="round" />
          {styledHair ? (
            <>
              <path d="M66 88 C60 50 80 30 100 28 C120 30 140 50 134 88 C130 70 115 55 100 55 C85 55 70 70 66 88 Z" fill="#5c3d2e" />
              <path d="M62 95 C55 120 58 140 70 150 C75 130 72 110 62 95 Z" fill="#5c3d2e" />
              <path d="M138 95 C145 120 142 140 130 150 C125 130 128 110 138 95 Z" fill="#5c3d2e" />
            </>
          ) : (
            <path d="M68 90 C65 60 82 42 100 40 C118 42 135 60 132 90 C128 72 115 58 100 58 C85 58 72 72 68 90 Z" fill="#6b4423" />
          )}
          {showCrown && (
            <g transform="translate(100,32)">
              <path d="M-22 8 L-14 -12 L0 0 L14 -12 L22 8 Z" fill={showQueenCrown ? "#fbbf24" : "#f472b6"} stroke="#fff" strokeWidth="1" />
              <circle cx="-14" cy="-12" r="3" fill="#fff" />
              <circle cx="0" cy="0" r="3" fill="#fff" />
              <circle cx="14" cy="-12" r="3" fill="#fff" />
            </g>
          )}
        </svg>

        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/90 border border-[var(--color-rose-200)] shadow-sm">
          <span className="text-xs font-bold text-[var(--color-rose-600)]">Lv. {level}</span>
        </div>
      </motion.div>
    </div>
  );
}
