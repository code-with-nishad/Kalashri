import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Scissors, Sparkles } from "lucide-react";

const slides = [
  {
    title: "Welcome to\nKalashri",
    desc: "Your destination\nfor fashion, beauty\nand custom services.",
    img: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?q=80&w=1000&auto=format&fit=crop",
    features: [
      { icon: Scissors, text: "Custom Stitching" },
      { icon: Sparkles, text: "Beauty Appointments" },
      { icon: Heart, text: "Customer Care" },
    ],
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [current] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 relative bg-[var(--color-primary-dark)]">
        <img
          src={slides[current].img}
          alt="Kalashri fashion and beauty"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-16 left-6 right-6 text-white z-10">
          <h1 className="text-[32px] font-display font-bold leading-tight mb-3">
            {slides[current].title.split("\n").map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h1>
          <p className="text-xs text-white/90 leading-relaxed font-medium">
            {slides[current].desc.split("\n").map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-t-[2.5rem] px-8 pt-8 pb-10 flex-shrink-0 -mt-10 relative z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
        <div className="space-y-5 mb-8">
          {slides[current].features.map((feat) => (
            <div key={feat.text} className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100">
                <feat.icon className="w-5 h-5 text-[var(--color-accent)]" />
              </span>
              <span className="text-sm font-bold text-gray-800">{feat.text}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-gray-300" />
          <span className="w-2 h-2 rounded-full bg-gray-300" />
          <span className="w-2 h-2 rounded-full bg-gray-300" />
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
        </div>

        <button
          onClick={() => navigate("/login")}
          className="w-full py-3.5 bg-[var(--color-accent)] text-white rounded-full font-bold text-sm tracking-wide shadow-md hover:bg-[var(--color-accent-light)] transition-colors mb-3"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/login")}
          className="w-full py-2 text-gray-500 font-bold text-xs hover:text-gray-800 transition-colors"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
