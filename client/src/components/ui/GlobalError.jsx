import { useRouteError, useNavigate } from "react-router-dom";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function GlobalError() {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error("Global Error Caught:", error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)] p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-[var(--color-surface-2)] p-8 rounded-3xl border border-[var(--color-border)] shadow-xl relative overflow-hidden">
        {/* Soft background effects */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-rose-500)]/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />

        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>

          <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)] mb-2">
            Oops! Something went wrong.
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-8">
            We've encountered an unexpected glitch in the matrix. Don't worry, our team has been notified.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-surface-3)] hover:bg-[var(--color-border)] text-[var(--color-text-primary)] font-medium rounded-xl transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Refresh Page
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-rose-400)] to-[var(--color-rose-600)] text-white font-medium rounded-xl shadow-[var(--shadow-glow-rose)] hover:-translate-y-0.5 transition-all"
            >
              <Home className="w-4 h-4" /> Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
