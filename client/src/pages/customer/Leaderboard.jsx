import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { adminService } from "../../services";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { useAuthStore } from "../../store/authStore";
import { Trophy, Sparkles, Crown } from "lucide-react";
import { getMembershipColor, getInitials } from "../../utils";

function PodiumItem({ rank, entry }) {
  const colors = {
    1: "from-yellow-400 to-amber-600",
    2: "from-slate-300 to-slate-500",
    3: "from-amber-700 to-amber-900",
  };
  const sizes = {
    1: "w-20 h-20 text-2xl",
    2: "w-16 h-16 text-xl",
    3: "w-14 h-14 text-lg",
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`rounded-full bg-gradient-to-br ${colors[rank]} flex items-center justify-center text-black font-bold ${sizes[rank]} border-4 ${rank === 1 ? "border-yellow-400/50" : "border-transparent"} relative`}>
        {getInitials(entry?.firstName, entry?.lastName)}
        {rank === 1 && <Crown className="w-5 h-5 absolute -top-3 text-yellow-400" />}
      </div>
      <p className="text-[var(--color-text-primary)] font-semibold text-sm">{entry?.firstName}</p>
      <p className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
        <Sparkles className="w-3.5 h-3.5" />
        {entry?.monthlyGlowPoints || entry?.lifetimeGlowPoints || 0}
      </p>
      <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${rank === 1 ? "bg-yellow-500/20 text-yellow-400" : rank === 2 ? "bg-slate-500/20 text-slate-300" : "bg-amber-800/20 text-amber-600"}`}>
        #{rank}
      </div>
    </div>
  );
}

export default function Leaderboard() {
  const user = useAuthStore((s) => s.user);
  const [tab, setTab] = useState("monthly");
  const { data, isLoading } = useQuery({ queryKey: QUERY_KEYS.LEADERBOARD, queryFn: adminService.getLeaderboard });
  const leaderboard = data?.data;
  const list = tab === "monthly" ? (leaderboard?.monthly || []) : (leaderboard?.lifetime || []);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">Glow Leaderboard 🏆</h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">Compete for the top spot!</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-[var(--color-surface-2)] rounded-xl">
        {["monthly", "lifetime"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${tab === t ? "bg-[var(--color-surface-card)] text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-[var(--color-text-muted)]">Loading...</div>
      ) : (
        <>
          {/* Podium */}
          {list.length >= 3 && (
            <div className="flex items-end justify-center gap-6 py-8 rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)]">
              <PodiumItem rank={2} entry={list[1]} />
              <PodiumItem rank={1} entry={list[0]} />
              <PodiumItem rank={3} entry={list[2]} />
            </div>
          )}

          {/* Remaining List */}
          <div className="space-y-2">
            {list.slice(3).map((entry, i) => {
              const rank = i + 4;
              const isMe = entry._id === user?._id;
              return (
                <motion.div
                  key={entry._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${isMe ? "bg-[var(--color-rose-500)]/5 border-[var(--color-rose-500)]/30" : "bg-[var(--color-surface-card)] border-[var(--color-border)]"}`}
                >
                  <span className="w-8 text-center font-bold text-[var(--color-text-muted)] text-sm">#{rank}</span>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-rose-600)] to-purple-700 flex items-center justify-center text-[var(--color-text-primary)] text-xs font-bold">
                    {getInitials(entry.firstName, entry.lastName)}
                  </div>
                  <div className="flex-1">
                    <span className="text-[var(--color-text-primary)] font-medium text-sm">{entry.firstName} {entry.lastName}</span>
                    <p className="text-xs" style={{ color: getMembershipColor(entry.membership) }}>{entry.membership}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    {tab === "monthly" ? entry.monthlyGlowPoints : entry.lifetimeGlowPoints}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
