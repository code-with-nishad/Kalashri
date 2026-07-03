import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLogin, useGoogleLogin as useKalashriGoogleLogin } from "../../hooks/useAuth";
import { Lock, Mail, Phone } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { mutate: login, isPending } = useLogin();
  const { mutate: googleLogin } = useKalashriGoogleLogin();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => googleLogin(tokenResponse.access_token),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen relative flex flex-col pt-16 px-6 overflow-hidden">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop" 
          alt="Login Background" 
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary-dark)]/90 via-[var(--color-primary-dark)]/80 to-[var(--color-primary-dark)]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center mb-10">
        <div className="w-16 h-16 rounded-full border border-[var(--color-accent)] flex items-center justify-center mb-4 bg-white/10 backdrop-blur-sm shadow-lg">
          <span className="text-3xl font-display text-[var(--color-accent)]">K</span>
        </div>
        <h1 className="text-3xl font-display font-semibold text-[var(--color-accent)] tracking-wider">KALASHRI</h1>
        <p className="text-[10px] uppercase tracking-widest text-white/60 mt-1">Fashion • Beauty</p>
      </div>

      <div className="relative z-10 text-center mb-10">
        <h2 className="text-xl font-bold text-white">Welcome Back!</h2>
        <p className="text-sm text-white/60">Sign in to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            required
            placeholder="Enter Email Address"
            className="w-full pl-11 pr-4 py-3 bg-[var(--color-surface-3)]/60 backdrop-blur-md border border-[var(--color-border)] rounded-xl text-white placeholder-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all shadow-lg"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="password"
            required
            placeholder="Enter Password"
            className="w-full pl-11 pr-4 py-3 bg-[var(--color-surface-3)]/60 backdrop-blur-md border border-[var(--color-border)] rounded-xl text-white placeholder-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all shadow-lg"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-4 btn-luxury-primary text-lg mt-2"
        >
          {isPending ? "Signing in..." : "Login"}
        </button>
      </form>

      <div className="mt-8 text-center relative z-10">
        <p className="text-xs text-white/40 mb-4 relative">
          <span className="px-2 relative z-10 text-white">or login with</span>
          <span className="absolute top-1/2 left-1/4 right-1/4 h-px bg-white/20 -z-0"></span>
        </p>

        <div className="flex justify-center gap-4">
          <button 
            type="button"
            onClick={() => handleGoogleLogin()}
            className="w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <span className="text-xl">G</span>
          </button>
        </div>
      </div>

      <div className="mt-auto pb-8 text-center pt-8 relative z-10">
        <p className="text-sm text-white/60">
          Don't have an account? <Link to="/register" className="text-[var(--color-accent)] hover:text-[var(--color-accent-light)] font-semibold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
