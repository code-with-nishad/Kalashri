import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, X, Sparkles, Loader2 } from "lucide-react";

export default function UpdateToast({ needRefresh, isUpdating, onUpdate, onDismiss }) {
  const handleUpdate = async () => {
    if (isUpdating) return;
    await onUpdate();
  };

  return (
    <AnimatePresence>
      {needRefresh && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          className="fixed top-4 left-4 right-4 md:top-auto md:bottom-6 md:left-auto md:right-4 md:w-96 z-[100]"
        >
          <div className="glass border border-[var(--color-rose-500)]/40 p-5 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-surface-card)] to-purple-950/20">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-[var(--color-rose-500)]/20 rounded-full blur-xl pointer-events-none" />

            <button
              onClick={onDismiss}
              disabled={isUpdating}
              className="absolute top-3 right-3 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors p-1 disabled:opacity-40"
              aria-label="Close update prompt"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-4 items-start pr-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-rose-500)] to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-[var(--color-text-primary)]">
                  Update Available
                </h4>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  A newer version is ready. Tap update to refresh and get the latest improvements.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="flex-1 py-2.5 bg-gradient-to-r from-[var(--color-rose-500)] to-purple-600 text-white font-bold rounded-xl text-sm transition-all hover:shadow-[0_0_15px_rgba(244,63,94,0.4)] flex items-center justify-center gap-1.5 disabled:opacity-70"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Update Now
                  </>
                )}
              </button>
              <button
                onClick={onDismiss}
                disabled={isUpdating}
                className="px-4 py-2.5 bg-[var(--color-surface-2)] text-[var(--color-text-primary)] font-semibold rounded-xl text-sm border border-[var(--color-border)] hover:bg-[var(--color-surface-card)] transition-colors disabled:opacity-40"
              >
                Later
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
