import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Users, AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { notificationService } from "../../services";
import { toast } from "sonner";

export default function BroadcastAlertModal({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("all");

  const { mutate: broadcast, isPending } = useMutation({
    mutationFn: notificationService.broadcast,
    onSuccess: (res) => {
      toast.success(res.data.message || "Alert broadcasted successfully!");
      setTitle("");
      setBody("");
      onClose();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to broadcast alert");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    broadcast({ title, body, audience, route: "/" });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative"
        >
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--color-border)]">
            <h2 className="text-xl font-display font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[var(--color-rose-500)]" /> Broadcast Alert
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                Target Audience
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-rose-500)] transition-all"
              >
                <option value="all">All Customers</option>
                <option value="high_points">VIPs (High Points {">"} 100)</option>
                <option value="inactive">Inactive (30+ Days)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                Alert Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. ⚡ Flash Sale Today!"
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-rose-500)] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                Message Body
              </label>
              <textarea
                required
                rows={3}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Message to send to users' phones..."
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-rose-500)] transition-all resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3.5 bg-[var(--color-rose-500)] hover:bg-[var(--color-rose-600)] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPending ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Broadcast
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
