import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Eye, EyeOff, Lock, Mail, Phone, ShieldCheck, Sparkles, User } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useGoogleLogin, useRegister } from "../../hooks/useAuth";

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
  const { mutate: googleLoginMutation } = useGoogleLogin();
  const navigate = useNavigate();
  const { register: reg, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    register(data, { onSuccess: () => navigate("/login") });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    googleLoginMutation(
      { token: credentialResponse.credential },
      {
        onSuccess: (res) => {
          navigate(res?.data?.user?.role === "admin" || res?.data?.role === "admin" ? "/admin" : "/", { replace: true });
        },
      },
    );
  };

  const fields = [
    { name: "firstName", label: "First Name", icon: User, placeholder: "Nishad", type: "text", col: 1 },
    { name: "lastName", label: "Last Name", icon: User, placeholder: "Damale", type: "text", col: 1 },
    { name: "email", label: "Email", icon: Mail, placeholder: "you@email.com", type: "email", col: 2 },
    { name: "phone", label: "Phone", icon: Phone, placeholder: "+91 98765 43210", type: "tel", col: 2 },
  ];

  const benefits = [
    "Easy appointment booking",
    "Track stitching and beauty visits",
    "Save measurements for repeat orders",
    "Get updates and special offers",
  ];

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000&auto=format&fit=crop" 
          alt="Register Background" 
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary-dark)]/95 via-[var(--color-primary-dark)]/80 to-[var(--color-primary-dark)]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-center p-4 lg:p-0 gap-8 lg:gap-16"
      >
        <div className="hidden lg:flex flex-col flex-1 px-8 text-white">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md mb-6 border border-white/20">
              <Sparkles className="w-10 h-10 text-[var(--color-accent)]" />
            </div>
            <h1 className="font-display text-5xl xl:text-7xl font-black mb-6 leading-tight drop-shadow-sm text-white">
              Book fashion <br /><span className="text-[var(--color-accent)]">and beauty visits.</span>
            </h1>

            <div className="mt-8 space-y-4">
              {benefits.map((text, idx) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (idx * 0.1) }}
                  className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3.5 shadow-sm w-max"
                >
                  <CheckCircle className="w-5 h-5 text-[var(--color-accent)]" />
                  <span className="text-white/90 font-bold tracking-wide">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl md:rounded-[2.5rem] p-5 sm:p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-bl from-[var(--color-accent)]/0 to-[var(--color-accent)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10">
            <div className="mb-6 sm:mb-8 text-center">
              <h2 className="font-display text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-white/60 text-sm">Start your Kalashri booking profile today</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {fields.filter((f) => f.col === 1).map(({ name, label, icon: Icon, placeholder, type }) => (
                  <div key={name}>
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">{label}</label>
                    <div className="relative">
                      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input {...reg(name)} type={type} placeholder={placeholder}
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--color-accent)] focus:bg-white/10 focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all text-sm shadow-sm"
                      />
                    </div>
                    {errors[name] && <p className="text-xs text-red-500 mt-1.5 ml-1">{errors[name].message}</p>}
                  </div>
                ))}
              </div>

              {fields.filter((f) => f.col === 2).map(({ name, label, icon: Icon, placeholder, type }) => (
                <div key={name}>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input {...reg(name)} type={type} placeholder={placeholder}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--color-accent)] focus:bg-white/10 focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all shadow-sm"
                    />
                  </div>
                  {errors[name] && <p className="text-xs text-red-500 mt-1.5 ml-1">{errors[name].message}</p>}
                </div>
              ))}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input {...reg("password")} type={showPass ? "text" : "password"} placeholder="Min 6 chars"
                      className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--color-accent)] focus:bg-white/10 focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all text-sm shadow-sm"
                    />
                    <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1">
                      {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.password.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2">Confirm</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input {...reg("confirmPassword")} type={showConfirmPass ? "text" : "password"} placeholder="Confirm"
                      className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--color-accent)] focus:bg-white/10 focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all text-sm shadow-sm"
                    />
                    <button type="button" onClick={() => setShowConfirmPass((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1">
                      {showConfirmPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-red-500 mt-1.5 ml-1">{errors.confirmPassword.message}</p>}
                </div>
              </div>

              <button type="submit" disabled={isPending}
                className="w-full py-4 btn-luxury-primary flex items-center justify-center gap-2 mt-4"
              >
                {isPending ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Create My Free Account"}
              </button>

              <div className="flex justify-center mt-3 gap-3 text-[11px] text-white/60 font-medium">
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-[var(--color-accent)]" /> Free Registration</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-[var(--color-accent)]" /> No Card Needed</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[var(--color-accent)]" /> 100% Secure</span>
              </div>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-white/20" />
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Or</span>
                <div className="flex-1 h-px bg-white/20" />
              </div>

              <div className="flex justify-center [&>div]:w-full">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google registration failed")}
                  useOneTap
                  theme="outline"
                  shape="pill"
                  size="large"
                  text="signup_with"
                  width="320"
                />
              </div>
            </form>

            <p className="text-center text-sm text-white/60 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-[var(--color-accent)] hover:text-[var(--color-accent-light)] font-bold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
