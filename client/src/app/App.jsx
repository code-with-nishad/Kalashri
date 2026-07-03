import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import AppRouter from "../routes";
import UpdateToast from "../components/pwa/UpdateToast";
import InstallBanner from "../components/pwa/InstallBanner";
import OfflinePage from "../components/pwa/OfflinePage";
import { usePwaUpdate } from "../hooks/usePwaUpdate";

const PING_TIMEOUT = 1200; // ms to wait before showing the splash screen

const pingServer = async () => {
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const url = isLocal
    ? (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api$/, "")
    : (import.meta.env.VITE_API_URL || "https://kalashri.onrender.com").replace(/\/api$/, "");
  
  try {
    const res = await fetch(url);
    if (res.ok) return true;
  } catch (error) {
    // Network or other error, assume it's waking
  }
  return false;
};

const ServerWakeLoader = () => (
  <div className="min-h-screen bg-[var(--color-surface)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
    <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-50 via-white to-rose-50" />
    <motion.div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[var(--color-rose-300)]/20 blur-[80px] animate-float pointer-events-none z-0" />
    <motion.div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-200/30 blur-[100px] animate-float pointer-events-none z-0" style={{ animationDelay: "2s" }} />

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 flex flex-col items-center text-center max-w-md"
    >
      <div className="w-20 h-20 rounded-3xl bg-white mb-8 shadow-[0_20px_40px_rgba(244,63,94,0.15)] border border-[var(--color-rose-100)] flex items-center justify-center relative">
        <Sparkles className="w-10 h-10 text-[var(--color-rose-500)]" />
        <div className="absolute -bottom-2 -right-2">
          <div className="w-8 h-8 bg-white rounded-full shadow border border-gray-100 flex items-center justify-center">
            <Loader2 className="w-4 h-4 text-[var(--color-rose-500)] animate-spin" />
          </div>
        </div>
      </div>
      
      <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">Starting our salon servers...</h2>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Preparing your luxury beauty experience. This usually takes less than a minute. We appreciate your patience!
      </p>

      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4 overflow-hidden relative">
        <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[var(--color-rose-400)] to-purple-500 w-1/2 rounded-full animate-[shimmer_1.5s_infinite]" />
      </div>
      <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">Automatically retrying in background</p>
    </motion.div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

export default function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [serverReady, setServerReady] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    let retryTimer;

    const checkServer = async () => {
      // Race the ping against a timeout
      const pingPromise = pingServer();
      const timeoutPromise = new Promise(resolve => setTimeout(() => resolve('timeout'), PING_TIMEOUT));
      
      const result = await Promise.race([pingPromise, timeoutPromise]);
      
      if (result === true) {
        if (mounted) setServerReady(true);
      } else if (result === 'timeout') {
        if (mounted) setShowSplash(true);
        // Wait for the actual ping to finish
        const finalResult = await pingPromise;
        if (finalResult === true) {
          if (mounted) setServerReady(true);
        } else {
          // If the actual ping failed after timeout, retry after delay
          retryTimer = setTimeout(checkServer, 3000);
        }
      } else {
         // It failed fast, show splash and retry
         if (mounted) setShowSplash(true);
         retryTimer = setTimeout(checkServer, 3000);
      }
    };

    checkServer();

    return () => {
      mounted = false;
      clearTimeout(retryTimer);
    };
  }, []);

  const { needRefresh, isUpdating, applyUpdate, dismissUpdate } = usePwaUpdate();

  if (!isOnline) {
    return <OfflinePage />;
  }

  // Show splash if server isn't ready and timeout passed
  if (!serverReady && showSplash) {
    return <ServerWakeLoader />;
  }

  // If server is ready or hasn't timed out yet, render the app silently loading
  // The app won't hang visually if it's less than PING_TIMEOUT
  return (
    <div className={`mobile-frame ${!serverReady ? "opacity-0" : "opacity-100 transition-opacity duration-700 ease-in-out"}`}>
      <QueryClientProvider client={queryClient}>
        {serverReady && <AppRouter />}
        <Toaster
          position="top-right"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-primary)",
            },
          }}
        />
        
        {/* PWA Elements */}
        <InstallBanner />
        <UpdateToast
          needRefresh={needRefresh}
          isUpdating={isUpdating}
          onUpdate={applyUpdate}
          onDismiss={dismissUpdate}
        />

        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </div>
  );
}
