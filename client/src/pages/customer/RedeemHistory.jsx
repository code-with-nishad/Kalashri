import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { rewardService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { formatDate } from "../../utils";
import { Badge } from "../../components/ui/Badge";
import { Gift } from "lucide-react";

export default function RedeemHistory() {
  const { data, isLoading } = useQuery({ queryKey: QUERY_KEYS.MY_REDEMPTIONS, queryFn: rewardService.getMyRedemptions });
  const redemptions = data?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">Redeem History</h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">Track your reward redemptions</p>
      </div>
      <div className="space-y-3">
        {!isLoading && redemptions.length === 0 && (
          <div className="text-center py-16 text-[var(--color-text-muted)]"><Gift className="w-10 h-10 mx-auto mb-2 opacity-30" /><p>No redemptions yet</p></div>
        )}
        {redemptions.map((r, i) => (
          <motion.div key={r._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="flex items-center justify-between p-5 rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)]"
          >
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0"><Gift className="w-5 h-5 text-purple-400" /></div>
              <div>
                <p className="font-medium text-[var(--color-text-primary)]">{r.reward?.title || "Reward"}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Redeemed {formatDate(r.redeemedAt)}</p>
              </div>
            </div>
            <Badge variant={r.status === "Success" ? "success" : r.status === "Rejected" ? "error" : "warning"}>{r.status}</Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
