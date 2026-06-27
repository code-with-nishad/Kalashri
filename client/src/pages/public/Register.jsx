import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Eye, EyeOff, User, Mail, Lock, Phone } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useRegister, useGoogleLogin } from "../../hooks/useAuth";
import { toast } from "sonner";
import { SALON_NAME } from "../../constants";

const schema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
  password: z.string().min(6, "At least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const { mutate: register, isPending } = useRegister();
  const navigate = useNavigate();

  const { register: reg, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    register(data, { onSuccess: () => navigate("/login") });
  };

  const { mutate: googleLoginMutation } = useGoogleLogin();

  const handleGoogleSuccess = (credentialResponse) => {
    googleLoginMutation({ token: credentialResponse.credential }, {
      onSuccess: (res) => {
        navigate(res?.data?.user?.role === "admin" || res?.data?.role === "admin" ? "/admin" : "/dashboard", { replace: true });
      }
    });
  };

  const fields = [
    { name: "firstName", label: "First Name", icon: User, placeholder: "Nishad", type: "text", col: 1 },
    { name: "lastName", label: "Last Name", icon: User, placeholder: "Damale", type: "text", col: 1 },
    { name: "email", label: "Email", icon: Mail, placeholder: "you@email.com", type: "email", col: 2 },
    { name: "phone", label: "Phone", icon: Phone, placeholder: "+91 98765 43210", type: "tel", col: 2 },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left – decorative */}
      <div className="hidden lg:flex lg:w-2/5 relative bg-[var(--color-surface-2)] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-[var(--color-rose-900)]/30" />
        <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-[var(--color-rose-600)]/15 blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full bg-purple-600/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="relative z-10 text-center px-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--color-rose-500)] to-purple-700 flex items-center justify-center mx-auto mb-6 shadow-[var(--shadow-glow-rose)]">
            <Sparkles className="w-10 h-10 text-[var(--color-text-primary)]" />
          </div>
          <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)] mb-3">Join the Glow Club</h2>
          <p className="text-[var(--color-text-muted)] text-base">Earn Glow Points on every visit</p>
          <div className="mt-8 space-y-3">
            {[
              "✨ Earn 1 Glow Point per ₹100",
              "🎁 Redeem points for free services",
              "🏆 Compete on the Leaderboard",
              "📅 Easy appointment booking",
            ].map((text) => (
              <div key={text} className="glass rounded-xl px-4 py-3 text-sm text-[var(--color-text-secondary)] text-left">
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right – form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[var(--color-surface)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-rose-500)] to-[var(--color-rose-700)] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[var(--color-text-primary)]" />
              </div>
              <span className="font-display font-bold text-[var(--color-text-primary)]">{SALON_NAME}</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">Create Account</h2>
            <p className="text-[var(--color-text-muted)] mt-2">Start your beauty journey today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {fields.filter(f => f.col === 1).map(({ name, label, icon: Icon, placeholder, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                    <input {...reg(name)} type={type} placeholder={placeholder}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-rose-500)] focus:ring-1 focus:ring-[var(--color-rose-500)]/30 transition-all text-sm"
                    />
                  </div>
                  {errors[name] && <p className="text-xs text-red-400 mt-1">{errors[name].message}</p>}
                </div>
              ))}
            </div>

            {fields.filter(f => f.col === 2).map(({ name, label, icon: Icon, placeholder, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                  <input {...reg(name)} type={type} placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-rose-500)] focus:ring-1 focus:ring-[var(--color-rose-500)]/30 transition-all"
                  />
                </div>
                {errors[name] && <p className="text-xs text-red-400 mt-1">{errors[name].message}</p>}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                <input {...reg("password")} type={showPass ? "text" : "password"} placeholder="Min. 6 characters"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-rose-500)] focus:ring-1 focus:ring-[var(--color-rose-500)]/30 transition-all"
                />
                <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                <input {...reg("confirmPassword")} type={showConfirmPass ? "text" : "password"} placeholder="Confirm your password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-rose-500)] focus:ring-1 focus:ring-[var(--color-rose-500)]/30 transition-all"
                />
                <button type="button" onClick={() => setShowConfirmPass(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                  {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-400 mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" disabled={isPending}
              className="w-full py-3.5 -white font-semibold rounded-xl transition-all hover:shadow-[var(--shadow-glow-rose)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {isPending ? <span className="w-5 h-5 border-2 border-[var(--color-rose-500)]/30 border-t-white rounded-full animate-spin" /> : "Create Account ✨"}
            </button>

            <p className="text-center text-sm text-[var(--color-text-muted)] my-4">OR</p>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google registration failed")}
                useOneTap
                theme="outline"
                shape="pill"
                text="signup_with"
              />
            </div>
          </form>

          <p className="text-center text-sm text-[var(--color-text-muted)] mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[var(--color-rose-400)] hover:text-[var(--color-rose-300)] font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
