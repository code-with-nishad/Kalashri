import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Welcome to\nKalashri",
    desc: "Your One-Stop Destination\nfor Fashion, Beauty\n& Insurance Solutions.",
    img: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?q=80&w=1000&auto=format&fit=crop", // placeholder
    features: [
      { icon: "👑", text: "Premium Quality Services" },
      { icon: "👩‍💼", text: "Expert Professionals" },
      { icon: "💖", text: "Customer Satisfaction" }
    ]
  }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-primary-dark)]">
      <div className="flex-1 relative rounded-b-[3rem] overflow-hidden bg-white">
        <img 
          src={slides[current].img} 
          alt="Onboarding" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/90 to-transparent" />
        
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <h1 className="text-4xl font-display font-bold whitespace-pre-line mb-4">
            {slides[current].title}
          </h1>
          <p className="text-sm text-white/80 whitespace-pre-line leading-relaxed">
            {slides[current].desc}
          </p>
        </div>
      </div>

      <div className="bg-[var(--color-primary-dark)] px-8 pt-8 pb-12 flex-shrink-0">
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-8 -mt-20 relative z-10">
          <div className="space-y-4">
            {slides[current].features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-2xl">{feat.icon}</span>
                <span className="text-sm font-semibold text-gray-800">{feat.text}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-2 mt-8">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            <span className="w-2 h-2 rounded-full bg-gray-200" />
            <span className="w-2 h-2 rounded-full bg-gray-200" />
            <span className="w-2 h-2 rounded-full bg-gray-200" />
          </div>
        </div>

        <button 
          onClick={() => navigate("/login")}
          className="w-full py-4 bg-[var(--color-accent)] text-white rounded-xl font-bold text-lg hover:bg-[var(--color-accent-light)] transition-colors mb-4"
        >
          Get Started
        </button>
        <button 
          onClick={() => navigate("/login")}
          className="w-full py-2 text-white/80 font-medium text-sm hover:text-white transition-colors"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
