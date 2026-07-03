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
    <div className="min-h-screen bg-white flex flex-col pt-16 px-6">
      <div className="flex flex-col items-center mb-10">
        <div className="w-16 h-16 rounded-full border border-[var(--color-primary-dark)] flex items-center justify-center mb-4">
          <span className="text-3xl font-display text-[var(--color-primary-dark)]">K</span>
        </div>
        <h1 className="text-3xl font-display font-semibold text-[var(--color-primary-dark)] tracking-wider">KALASHRI</h1>
        <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Fashion • Beauty</p>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-xl font-bold text-gray-900">Welcome Back!</h2>
        <p className="text-sm text-gray-500">Sign in to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            required
            placeholder="Enter Mobile Number"
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
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
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-gray-500 hover:text-[var(--color-accent)]">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-4 bg-[var(--color-accent)] text-white rounded-full font-bold text-lg hover:bg-[var(--color-accent-light)] transition-colors shadow-lg shadow-pink-500/30"
        >
          {isPending ? "Signing in..." : "Login"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400 mb-4 relative">
          <span className="bg-white px-2 relative z-10">or login with</span>
          <span className="absolute top-1/2 left-1/4 right-1/4 h-px bg-gray-200 -z-0"></span>
        </p>

        <div className="flex justify-center gap-4">
          <button 
            type="button"
            onClick={() => handleGoogleLogin()}
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
          </button>
          <button 
            type="button"
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <img src="https://www.svgrepo.com/show/452133/whatsapp.svg" className="w-5 h-5" alt="WhatsApp" />
          </button>
        </div>
      </div>

      <div className="mt-auto pb-8 text-center pt-8">
        <p className="text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="text-[var(--color-accent)] font-semibold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
