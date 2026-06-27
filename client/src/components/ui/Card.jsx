import { cn } from "../../utils";
import { motion } from "framer-motion";

export function Card({ children, className, hover = false, glow = false, ...props }) {
  const base = "rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)]";
  const hoverClass = hover ? "card-glow cursor-pointer" : "";
  const glowClass = glow ? "shadow-[var(--shadow-glow-rose)]" : "";

  return (
    <div className={cn(base, hoverClass, glowClass, className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn("px-6 pt-6 pb-4 border-b border-[var(--color-border)]", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h3 className={cn("font-semibold text-[var(--color-text-primary)] font-display text-lg", className)}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className }) {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn("px-6 pb-6 pt-4 border-t border-[var(--color-border)]", className)}>
      {children}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, sub, color = "rose", trend, className }) {
  const colors = {
    rose: { icon: "text-[var(--color-rose-400)]", bg: "bg-[var(--color-rose-500)]/10" },
    gold: { icon: "text-yellow-400", bg: "bg-yellow-400/10" },
    emerald: { icon: "text-emerald-400", bg: "bg-emerald-400/10" },
    blue: { icon: "text-blue-400", bg: "bg-blue-400/10" },
    purple: { icon: "text-purple-400", bg: "bg-purple-400/10" },
  };
  const c = colors[color] || colors.rose;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-5 flex gap-4 items-start card-glow",
        className
      )}
    >
      <div className={cn("p-3 rounded-xl flex-shrink-0", c.bg)}>
        {Icon && <Icon className={cn("w-5 h-5", c.icon)} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[var(--color-text-secondary)] truncate">{label}</p>
        <p className="text-2xl font-bold text-[var(--color-text-primary)] font-display mt-0.5">{value}</p>
        {sub && <p className="text-xs text-[var(--color-text-muted)] mt-1">{sub}</p>}
        {trend !== undefined && (
          <p className={cn("text-xs font-medium mt-1", trend >= 0 ? "text-emerald-400" : "text-red-400")}>
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </p>
        )}
      </div>
    </motion.div>
  );
}
