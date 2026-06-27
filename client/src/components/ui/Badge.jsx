import { cn } from "../../utils";

export function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-[var(--color-rose-500)]/15 text-[var(--color-rose-400)] border border-[var(--color-rose-500)]/30",
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    warning: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
    error: "bg-red-500/15 text-red-400 border border-red-500/30",
    info: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
    gold: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
    ghost: "bg-[var(--color-rose-500)]/5 text-[var(--color-text-secondary)] border border-[var(--color-rose-500)]/10",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
