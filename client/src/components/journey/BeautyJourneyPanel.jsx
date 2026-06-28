import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles, Flame, Award, Gift, ChevronRight, Flower2, Trophy, Calendar, HelpCircle,
} from "lucide-react";
import BeautyAvatar from "./BeautyAvatar";
import { Skeleton } from "../ui/Skeleton";

function ProgressBar({ value, className = "" }) {
  return (
    <div className={`h-2.5 rounded-full bg-[var(--color-surface-3)] overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, value)}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-full bg-gradient-to-r from-[var(--color-rose-400)] to-purple-500"
      />
    </div>
  );
}

function SectionCard({ title, icon: Icon, action, children }) {
  return (
    <div className="rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-border)] p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-[var(--color-rose-400)]" />}
          {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}

export default function BeautyJourneyPanel({ journey, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-72 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    );
  }

  if (!journey) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--color-border)] p-12 text-center text-[var(--color-text-muted)]">
        <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p>Your beauty journey will begin after your first completed visit.</p>
        <Link to="/book" className="inline-block mt-4 text-[var(--color-rose-500)] font-medium hover:underline">
          Book a service
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <SectionCard
        title="My Beauty Journey"
        icon={Sparkles}
        action={
          <button type="button" className="text-xs text-[var(--color-text-muted)] flex items-center gap-1 hover:text-[var(--color-rose-500)]">
            <HelpCircle className="w-3.5 h-3.5" /> How it works
          </button>
        }
      >
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <BeautyAvatar
            level={journey.level}
            title={journey.activeTitle}
            cosmetics={journey.unlockedCosmetics}
          />
          <div className="flex-1 w-full space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-[var(--color-text-primary)]">Level {journey.level}</span>
                <span className="text-[var(--color-text-muted)]">
                  {journey.currentLevelXp} / {journey.xpForNextLevel} XP
                </span>
              </div>
              <ProgressBar value={journey.levelProgress} />
              <p className="text-xs text-[var(--color-rose-500)] mt-2 font-medium">
                {journey.xpRemaining} XP to next level
              </p>
            </div>
            {journey.nextRewards?.length > 0 && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--color-rose-500)]/5 to-purple-500/5 border border-[var(--color-rose-500)]/15">
                <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-2">Next Level Rewards</p>
                <div className="flex flex-wrap gap-2">
                  {journey.nextRewards.map((r, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-white/80 border border-[var(--color-rose-200)] text-[var(--color-rose-600)] font-medium">
                      {r.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Beauty Skills" icon={Flower2}>
        <div className="space-y-4">
          {journey.skills?.map((skill) => (
            <div key={skill.category}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-[var(--color-text-primary)]">{skill.category}</span>
                <span className="text-[var(--color-text-muted)] text-xs">
                  Level {skill.level} · {skill.percent}%
                </span>
              </div>
              <ProgressBar value={skill.percent} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Recent Achievements"
        icon={Award}
        action={<span className="text-xs text-[var(--color-rose-500)]">View All</span>}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {journey.badges?.filter((b) => b.unlocked).slice(0, 4).map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ y: -2 }}
              className="p-3 rounded-xl bg-gradient-to-br from-[var(--color-rose-500)]/5 to-purple-500/5 border border-[var(--color-rose-500)]/15 text-center"
            >
              <span className="text-2xl">{badge.emoji}</span>
              <p className="text-[10px] font-bold text-[var(--color-text-primary)] mt-1 leading-tight">{badge.title}</p>
            </motion.div>
          ))}
          {journey.badges?.filter((b) => b.unlocked).length === 0 && (
            <p className="col-span-full text-sm text-[var(--color-text-muted)] text-center py-4">
              Complete services to unlock your first badge
            </p>
          )}
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Glow Streak" icon={Flame}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">{journey.streak?.weeks || 0} Weeks</p>
              <p className="text-xs text-[var(--color-text-muted)]">Consecutive visit streak</p>
            </div>
          </div>
          <div className="flex justify-between gap-1">
            {journey.streak?.calendar?.map((day, i) => (
              <div key={i} className="flex-1 text-center">
                <div className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold mb-1 ${
                  day.active ? "bg-[var(--color-rose-500)] text-white" : "bg-[var(--color-surface-3)] text-[var(--color-text-muted)]"
                }`}>
                  {day.active ? "✓" : ""}
                </div>
                <span className="text-[10px] text-[var(--color-text-muted)]">{day.label}</span>
              </div>
            ))}
          </div>
          {journey.streak?.nextReward && (
            <p className="text-xs text-[var(--color-rose-500)] mt-3 font-medium">
              Next: {journey.streak.nextReward.weeks}-week streak reward
            </p>
          )}
        </SectionCard>

        <SectionCard title="Beauty Badges" icon={Trophy}>
          <div className="flex flex-wrap gap-3">
            {journey.badges?.slice(0, 8).map((badge) => (
              <div
                key={badge.id}
                title={badge.description}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-xl border-2 transition-all ${
                  badge.unlocked
                    ? "bg-gradient-to-br from-[var(--color-rose-500)]/10 to-purple-500/10 border-[var(--color-rose-400)] shadow-sm"
                    : "bg-[var(--color-surface-3)] border-[var(--color-border)] opacity-40 grayscale"
                }`}
              >
                {badge.emoji}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {journey.collections?.map((col) => (
        <SectionCard key={col.id} title={`Beauty Passport — ${col.title}`} icon={Gift}>
          <p className="text-xs text-[var(--color-text-muted)] mb-4">{col.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {col.items.map((item) => (
              <div
                key={item.key}
                className={`px-3 py-2 rounded-xl text-xs font-medium border ${
                  item.completed
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600"
                    : "bg-[var(--color-surface-3)] border-[var(--color-border)] text-[var(--color-text-muted)]"
                }`}
              >
                {item.completed ? "✓ " : ""}{item.label}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <ProgressBar value={col.percent} className="flex-1 mr-4" />
            <span className="text-sm font-bold text-[var(--color-rose-500)]">{col.percent}%</span>
          </div>
        </SectionCard>
      ))}

      <SectionCard title="Beauty Journey Timeline" icon={Calendar}>
        <div className="space-y-3">
          {journey.timeline?.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${step.done ? "bg-[var(--color-rose-500)]" : "bg-[var(--color-border)]"}`} />
              <span className={`text-sm ${step.done ? "text-[var(--color-text-primary)] font-medium" : "text-[var(--color-text-muted)]"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

      {journey.xpRemaining > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-r from-[var(--color-rose-500)] to-purple-600 p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm font-medium">
            You're only <strong>{journey.xpRemaining} XP</strong> away from Level {journey.level + 1}. Book any service this week!
          </p>
          <Link
            to="/book"
            className="px-5 py-2.5 bg-white text-[var(--color-rose-600)] font-bold rounded-xl text-sm whitespace-nowrap flex items-center gap-1 hover:shadow-lg transition-all"
          >
            Book a Service <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}
